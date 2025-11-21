import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/storage';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const tiles = await db.tiles.getAll();
  // Sort by favorite desc, then updatedAt desc
  tiles.sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
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
      await db.tiles.delete(id);
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
      await db.tiles.update(id, { isFavorite: !isFavorite });
      return { success: true };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Aktualisieren' });
    }
  },
  
  duplicate: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get('id') as string);
    
    try {
      const tiles = await db.tiles.getAll();
      const original = tiles.find(t => t.id === id);
      
      if (!original) {
        return fail(404, { error: 'Tile nicht gefunden' });
      }
      
      const duplicate = await db.tiles.create({
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
        tags: original.tags,
        isFavorite: false,
        usageCount: 0,
        assignedToDayNumber: null
      });
      
      throw redirect(303, `/admin/tiles/${duplicate.id}/edit`);
    } catch (error) {
      if (error instanceof Response) throw error;
      return fail(400, { error: 'Fehler beim Duplizieren' });
    }
  }
};
