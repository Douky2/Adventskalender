import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const tiles = await prisma.tile.findMany({
    orderBy: { title: 'asc' }
  });
  
  return { tiles };
};

export const actions: Actions = {
  bulkDelete: async ({ request }) => {
    const data = await request.formData();
    const ids = JSON.parse(data.get('ids') as string);
    
    try {
      await prisma.tile.deleteMany({
        where: { id: { in: ids } }
      });
      
      return { success: true, count: ids.length };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Löschen' });
    }
  },
  
  bulkUpdateCategory: async ({ request }) => {
    const data = await request.formData();
    const ids = JSON.parse(data.get('ids') as string);
    const category = data.get('category') as string;
    
    try {
      await prisma.tile.updateMany({
        where: { id: { in: ids } },
        data: { category }
      });
      
      return { success: true, count: ids.length };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Aktualisieren' });
    }
  },
  
  bulkAddTags: async ({ request }) => {
    const data = await request.formData();
    const ids = JSON.parse(data.get('ids') as string);
    const newTags = data.get('tags') as string;
    
    try {
      for (const id of ids) {
        const tile = await prisma.tile.findUnique({ where: { id } });
        if (tile) {
          const existingTags = tile.tags ? tile.tags.split(',').map(t => t.trim()) : [];
          const tagsToAdd = newTags.split(',').map(t => t.trim());
          const combinedTags = [...new Set([...existingTags, ...tagsToAdd])];
          
          await prisma.tile.update({
            where: { id },
            data: { tags: combinedTags.join(', ') }
          });
        }
      }
      
      return { success: true, count: ids.length };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Tag-Update' });
    }
  },
  
  bulkFavorite: async ({ request }) => {
    const data = await request.formData();
    const ids = JSON.parse(data.get('ids') as string);
    const favorite = data.get('favorite') === 'true';
    
    try {
      await prisma.tile.updateMany({
        where: { id: { in: ids } },
        data: { isFavorite: favorite }
      });
      
      return { success: true, count: ids.length };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Favorisieren' });
    }
  },
  
  bulkUnassign: async ({ request }) => {
    const data = await request.formData();
    const ids = JSON.parse(data.get('ids') as string);
    
    try {
      await prisma.tile.updateMany({
        where: { id: { in: ids } },
        data: { assignedToDayNumber: null }
      });
      
      return { success: true, count: ids.length };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Entfernen' });
    }
  }
};
