import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/storage';

export const load: PageServerLoad = async () => {
  let allDays = await db.days.getAll();
  
  // Seed if empty
  if (allDays.length === 0) {
    for (let i = 1; i <= 24; i++) {
      await db.days.update(i, { title: `Türchen ${i}` });
    }
    allDays = await db.days.getAll();
  }

  const allTiles = await db.tiles.getAll();

  return {
    days: allDays.map(day => ({
      id: day.id,
      dayNumber: day.dayNumber,
      title: day.title,
      contentTypeA: day.contentTypeA,
      contentA: day.contentA,
      authorA: day.authorA || 'Locdoc',
      taskForB: day.taskForB || '',
      contentTypeB: day.contentTypeB || '',
      contentB: day.contentB || '',
      authorB: day.authorB || 'Miss Chaos',
      responseMode: day.responseMode || 'DISABLED',
      linkedToPrevious: day.linkedToPrevious,
      linkedToNext: day.linkedToNext,
      storyChainId: day.storyChainId || '',
      combinedResult: day.combinedResult || '',
      resultGenerated: day.resultGenerated
    })),
    tiles: allTiles
  };
};

export const actions: Actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);
    const title = data.get('title') as string;
    const contentTypeA = data.get('contentTypeA') as string;
    const contentA = data.get('contentA') as string;
    const authorA = data.get('authorA') as string || 'Locdoc';
    const taskForB = data.get('taskForB') as string;
    const responseMode = data.get('responseMode') as string || 'DISABLED';
    const linkedToPrevious = data.get('linkedToPrevious') === 'on';
    const linkedToNext = data.get('linkedToNext') === 'on';
    const storyChainId = data.get('storyChainId') as string;
    const combinedResult = data.get('combinedResult') as string;

    try {
      await db.days.updateById(id, {
        title,
        contentTypeA,
        contentA,
        authorA: authorA || 'Locdoc',
        taskForB: taskForB || null,
        responseMode,
        linkedToPrevious,
        linkedToNext,
        storyChainId: storyChainId || null,
        combinedResult: combinedResult || null
      });

      return { success: true, message: 'Türchen erfolgreich aktualisiert!' };
    } catch (error) {
      console.error(error);
      return fail(500, { error: 'Fehler beim Speichern!' });
    }
  },

  resetResponse: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);

    try {
      await db.days.updateById(id, {
        contentTypeB: null,
        contentB: null,
        authorB: null
      });

      return { success: true, message: 'Antwort von Miss Chaos wurde zurückgesetzt!' };
    } catch (error) {
      return fail(500, { error: 'Fehler beim Zurücksetzen!' });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);

    try {
      await db.days.delete(id);
      return { success: true, message: 'Türchen gelöscht!' };
    } catch (error) {
      return fail(500, { error: 'Fehler beim Löschen!' });
    }
  }
};
