import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/storage';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  // Lade alle Tiles
  const tiles = await db.tiles.getAll();
  tiles.sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.title.localeCompare(b.title);
  });
  
  // Lade alle Days
  const days = await db.days.getAll();
  
  return {
    tiles,
    days
  };
};

export const actions: Actions = {
  assignTile: async ({ request }) => {
    const data = await request.formData();
    const tileId = parseInt(data.get('tileId') as string);
    const dayNumber = parseInt(data.get('dayNumber') as string);
    
    try {
      // Prüfe ob Tag schon eine Tile hat
      const tiles = await db.tiles.getAll();
      const existingAssignment = tiles.find(t => t.assignedToDayNumber === dayNumber);
      
      if (existingAssignment && existingAssignment.id !== tileId) {
        return fail(400, { 
          error: `Tag ${dayNumber} hat bereits eine zugewiesene Tile` 
        });
      }
      
      // Hole die Tile
      const tile = tiles.find(t => t.id === tileId);
      
      if (!tile) {
        return fail(404, { error: 'Tile nicht gefunden' });
      }
      
      // Update Tile
      await db.tiles.update(tileId, { 
        assignedToDayNumber: dayNumber,
        usageCount: tile.usageCount + 1
      });
      
      // Update Day mit Tile-Content
      await db.days.update(dayNumber, {
        contentTypeA: tile.contentType,
        contentA: tile.content,
        authorA: tile.author || 'Locdoc',
        taskForB: tile.taskForB,
        responseMode: tile.responseMode,
        linkedToPrevious: tile.linkedToPrevious,
        linkedToNext: tile.linkedToNext,
        storyChainId: tile.storyChainId
      });
      
      return { success: true };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Zuweisen' });
    }
  },
  
  unassignTile: async ({ request }) => {
    const data = await request.formData();
    const tileId = parseInt(data.get('tileId') as string);
    
    try {
      await db.tiles.update(tileId, { assignedToDayNumber: null });
      
      return { success: true };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Entfernen' });
    }
  },
  
  clearDay: async ({ request }) => {
    const data = await request.formData();
    const dayNumber = parseInt(data.get('dayNumber') as string);
    
    try {
      // Entferne Tile-Zuweisung falls vorhanden
      const tiles = await db.tiles.getAll();
      const assignedTiles = tiles.filter(t => t.assignedToDayNumber === dayNumber);
      for (const t of assignedTiles) {
        await db.tiles.update(t.id, { assignedToDayNumber: null });
      }
      
      // Optional: Day-Content löschen (oder beibehalten)
      // Hier nur die Tile-Zuordnung entfernen
      
      return { success: true };
    } catch (error) {
      return fail(400, { error: 'Fehler beim Leeren' });
    }
  },
  
  bulkAssign: async ({ request }) => {
    const data = await request.formData();
    const assignments = JSON.parse(data.get('assignments') as string);
    
    try {
      // assignments: [{ tileId, dayNumber }, ...]
      const tiles = await db.tiles.getAll();
      
      for (const assignment of assignments) {
        const tile = tiles.find(t => t.id === assignment.tileId);
        
        if (tile) {
          await db.tiles.update(assignment.tileId, { 
            assignedToDayNumber: assignment.dayNumber,
            usageCount: tile.usageCount + 1
          });
          
          await db.days.update(assignment.dayNumber, {
            contentTypeA: tile.contentType,
            contentA: tile.content,
            authorA: tile.author || 'Locdoc',
            taskForB: tile.taskForB,
            responseMode: tile.responseMode,
            linkedToPrevious: tile.linkedToPrevious,
            linkedToNext: tile.linkedToNext,
            storyChainId: tile.storyChainId
          });
        }
      }
      
      return { success: true, count: assignments.length };
    } catch (error) {
      return fail(400, { error: 'Fehler bei Bulk-Zuweisung' });
    }
  }
};
