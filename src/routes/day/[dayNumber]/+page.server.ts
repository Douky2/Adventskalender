import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getDayContent, addPersonBContent, getMessages, addMessage } from '$lib/server/database';

export const load: PageServerLoad = async ({ params, url }) => {
  const dayNumber = parseInt(params.dayNumber);

  // Validierung
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 24) {
    throw error(404, 'Ungültige Türnummer');
  }

  // 🎮 SIMULATIONSMODUS: ?simulation=true in der URL deaktiviert Sperren
  const simulationMode = url.searchParams.get('simulation') === 'true';

  // Hole das AKTUELLE Datum VOM SERVER
  const serverDate = new Date();
  const currentDay = serverDate.getDate();
  const currentMonth = serverDate.getMonth(); // 0-11, Dezember ist 11
  const currentYear = serverDate.getFullYear();

  // Kalender-Konfiguration
  const CALENDAR_YEAR = parseInt(process.env.CALENDAR_YEAR || '2025');
  const CALENDAR_MONTH = parseInt(process.env.CALENDAR_MONTH || '11'); // Dezember

  // Die serverseitige Prüfung (im Simulationsmodus immer entsperrt)
  const isLocked = simulationMode ? false : (
    currentYear < CALENDAR_YEAR ||
    currentMonth < CALENDAR_MONTH ||
    (currentMonth === CALENDAR_MONTH && currentDay < dayNumber)
  );

  if (isLocked) {
    // Sende "gesperrt"-Status an das Frontend
    return { 
      isLocked: true, 
      dayNumber,
      unlockDate: `${dayNumber}. Dezember ${CALENDAR_YEAR}`
    };
  }

  // Wenn entsperrt, hole den Inhalt aus der DB
  const content = await getDayContent(dayNumber);
  if (!content) {
    throw error(404, 'Inhalt nicht gefunden');
  }

  // Hole alle Nachrichten für diesen Tag
  const messages = await getMessages(dayNumber);
  
  // Prüfe ob dies Teil einer Story-Chain ist
  let storyChainDays = [];
  if (content.storyChainId) {
    const { getStoryChain } = await import('$lib/server/database');
    storyChainDays = await getStoryChain(content.storyChainId);
  }

  return {
    isLocked: false,
    content: {
      title: content.title,
      // Person A (Locdoc)
      contentTypeA: content.contentTypeA,
      contentA: content.contentA,
      authorA: content.authorA || 'Locdoc',
      // Person B (Miss Chaos)
      contentTypeB: content.contentTypeB,
      contentB: content.contentB,
      authorB: content.authorB || 'Miss Chaos',
      // Konfiguration
      taskForB: content.taskForB,
      responseMode: content.responseMode,
      linkedToPrevious: content.linkedToPrevious,
      linkedToNext: content.linkedToNext,
      storyChainId: content.storyChainId,
      combinedResult: content.combinedResult,
      resultGenerated: content.resultGenerated
    },
    messages,
    dayNumber,
    storyChainDays: storyChainDays.map(d => ({
      dayNumber: d.dayNumber,
      title: d.title,
      hasContentB: !!d.contentB
    }))
  };
};

export const actions: Actions = {
  addResponse: async ({ request, params }) => {
    const dayNumber = parseInt(params.dayNumber);
    const data = await request.formData();
    const content = data.get('content') as string;
    const author = data.get('author') as string;

    if (!content || content.trim() === '') {
      return fail(400, { error: 'Bitte gib eine Nachricht ein!' });
    }

    // Prüfe Response-Mode
    const dayContent = await getDayContent(dayNumber);
    if (dayContent && dayContent.responseMode === 'DISABLED') {
      return fail(403, { error: 'Antworten ist für dieses Türchen deaktiviert!' });
    }

    try {
      await addPersonBContent(dayNumber, 'TEXT', content, author || 'Miss Chaos');
      
      // Wenn COLLABORATIVE Mode und beide haben geantwortet, generiere kombiniertes Ergebnis
      if (dayContent && dayContent.responseMode === 'COLLABORATIVE' && dayContent.contentA) {
        const { updateCombinedResult } = await import('$lib/server/database');
        const combined = `=== Locdoc ===\n${dayContent.contentA}\n\n=== Miss Chaos ===\n${content}\n\n✨ Gemeinsam erschaffen!`;
        await updateCombinedResult(dayNumber, combined);
      }
      
      return { success: true };
    } catch (err) {
      return fail(500, { error: 'Fehler beim Speichern!' });
    }
  },

  addMessage: async ({ request, params }) => {
    const dayNumber = parseInt(params.dayNumber);
    const data = await request.formData();
    const message = data.get('message') as string;
    const author = data.get('author') as string;

    if (!message || message.trim() === '') {
      return fail(400, { error: 'Bitte gib eine Nachricht ein!' });
    }

    try {
      await addMessage(dayNumber, author || 'Anonym', message);
      return { success: true };
    } catch (err) {
      return fail(500, { error: 'Fehler beim Speichern!' });
    }
  }
};
