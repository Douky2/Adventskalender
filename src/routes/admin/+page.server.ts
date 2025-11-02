import type { PageServerLoad, Actions } from './$types';
import { getAllDays } from '$lib/server/database';
import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/database';

export const load: PageServerLoad = async () => {
  const allDays = await getAllDays();
  
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
    }))
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
      await prisma.day.update({
        where: { id },
        data: {
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
        }
      });

      return { success: true, message: 'Türchen erfolgreich aktualisiert!' };
    } catch (error) {
      return fail(500, { error: 'Fehler beim Speichern!' });
    }
  },

  resetResponse: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);

    try {
      await prisma.day.update({
        where: { id },
        data: {
          contentTypeB: null,
          contentB: null,
          authorB: null
        }
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
      await prisma.day.delete({
        where: { id }
      });

      return { success: true, message: 'Türchen gelöscht!' };
    } catch (error) {
      return fail(500, { error: 'Fehler beim Löschen!' });
    }
  }
};
