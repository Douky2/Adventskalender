import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/storage';

export const load: PageServerLoad = async ({ params }) => {
  const dayNumber = parseInt(params.dayNumber);
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 24) {
    throw redirect(302, '/admin');
  }

  const day = await db.days.getByDayNumber(dayNumber);
  if (!day) {
    // If day doesn't exist, create it or redirect
    // For now, redirect to admin
    throw redirect(302, '/admin');
  }

  const allTiles = await db.tiles.getAll();

  return {
    day,
    tiles: allTiles
  };
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    const dayNumber = parseInt(params.dayNumber);
    const data = await request.formData();
    
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
      await db.days.update(dayNumber, {
        title,
        contentTypeA,
        contentA,
        authorA,
        taskForB: taskForB || null,
        responseMode,
        linkedToPrevious,
        linkedToNext,
        storyChainId: storyChainId || null,
        combinedResult: combinedResult || null,
        updatedAt: new Date().toISOString()
      });

      return { success: true, message: 'Türchen erfolgreich aktualisiert!' };
    } catch (error) {
      console.error(error);
      return fail(500, { error: 'Fehler beim Speichern!' });
    }
  },

  resetResponse: async ({ request, params }) => {
    const dayNumber = parseInt(params.dayNumber);

    try {
      await db.days.update(dayNumber, {
        contentTypeB: null,
        contentB: null,
        authorB: null,
        updatedAt: new Date().toISOString()
      });

      return { success: true, message: 'Antwort von Miss Chaos wurde zurückgesetzt!' };
    } catch (error) {
      return fail(500, { error: 'Fehler beim Zurücksetzen!' });
    }
  }
};
