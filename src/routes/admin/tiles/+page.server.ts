import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const tiles = await prisma.tile.findMany({
    orderBy: [
      { isFavorite: 'desc' },
      { updatedAt: 'desc' }
    ]
  });
  
  return {
    tiles
  };
};

export const actions: Actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);
    
    try {
      await prisma.tile.delete({
        where: { id }
      });
      return { success: true };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Löschen' });
    }
  },
  
  toggleFavorite: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);
    const isFavorite = data.get('isFavorite') === 'true';
    
    try {
      await prisma.tile.update({
        where: { id },
        data: { isFavorite: !isFavorite }
      });
      return { success: true };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Aktualisieren' });
    }
  },
  
  duplicate: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);
    
    try {
      const original = await prisma.tile.findUnique({
        where: { id }
      });
      
      if (!original) {
        return fail(404, { error: 'Tile nicht gefunden' });
      }
      
      const duplicate = await prisma.tile.create({
        data: {
          title: `${original.title} (Kopie)`,
          description: original.description,
          category: original.category,
          contentType: original.contentType,
          content: original.content,
          author: original.author,
          taskForB: original.taskForB,
          responseMode: original.responseMode,
          linkedToPrevious: original.linkedToPrevious,
          linkedToNext: original.linkedToNext,
          storyChainId: original.storyChainId,
          tags: original.tags
        }
      });
      
      throw redirect(303, `/admin/tiles/${duplicate.id}/edit`);
    } catch (error) {
      if (error instanceof Response) throw error;
      return fail(400, { error: 'Fehler beim Duplizieren' });
    }
  }
};
