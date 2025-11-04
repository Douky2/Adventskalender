import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  // Lade alle Tiles
  const tiles = await prisma.tile.findMany({
    orderBy: [
      { isFavorite: 'desc' },
      { category: 'asc' },
      { title: 'asc' }
    ]
  });
  
  // Lade alle Days
  const days = await prisma.day.findMany({
    orderBy: { dayNumber: 'asc' }
  });
  
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
      const existingAssignment = await prisma.tile.findFirst({
        where: { assignedToDayNumber: dayNumber }
      });
      
      if (existingAssignment && existingAssignment.id !== tileId) {
        return fail(400, { 
          error: `Tag ${dayNumber} hat bereits eine zugewiesene Tile` 
        });
      }
      
      // Hole die Tile
      const tile = await prisma.tile.findUnique({
        where: { id: tileId }
      });
      
      if (!tile) {
        return fail(404, { error: 'Tile nicht gefunden' });
      }
      
      // Update Tile
      await prisma.tile.update({
        where: { id: tileId },
        data: { 
          assignedToDayNumber: dayNumber,
          usageCount: { increment: 1 }
        }
      });
      
      // Update Day mit Tile-Content
      await prisma.day.update({
        where: { dayNumber },
        data: {
          contentTypeA: tile.contentType,
          contentA: tile.content,
          authorA: tile.author || 'Locdoc',
          taskForB: tile.taskForB,
          responseMode: tile.responseMode,
          linkedToPrevious: tile.linkedToPrevious,
          linkedToNext: tile.linkedToNext,
          storyChainId: tile.storyChainId
        }
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
      await prisma.tile.update({
        where: { id: tileId },
        data: { assignedToDayNumber: null }
      });
      
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
      await prisma.tile.updateMany({
        where: { assignedToDayNumber: dayNumber },
        data: { assignedToDayNumber: null }
      });
      
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
      for (const assignment of assignments) {
        const tile = await prisma.tile.findUnique({
          where: { id: assignment.tileId }
        });
        
        if (tile) {
          await prisma.tile.update({
            where: { id: assignment.tileId },
            data: { 
              assignedToDayNumber: assignment.dayNumber,
              usageCount: { increment: 1 }
            }
          });
          
          await prisma.day.update({
            where: { dayNumber: assignment.dayNumber },
            data: {
              contentTypeA: tile.contentType,
              contentA: tile.content,
              authorA: tile.author || 'Locdoc',
              taskForB: tile.taskForB,
              responseMode: tile.responseMode,
              linkedToPrevious: tile.linkedToPrevious,
              linkedToNext: tile.linkedToNext,
              storyChainId: tile.storyChainId
            }
          });
        }
      }
      
      return { success: true, count: assignments.length };
    } catch (error) {
      return fail(400, { error: 'Fehler bei Bulk-Zuweisung' });
    }
  }
};
