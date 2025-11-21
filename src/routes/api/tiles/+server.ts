import { json } from '@sveltejs/kit';
import { db } from '$lib/server/storage';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  
  try {
    const tile = await db.tiles.create({
      title: data.title,
      description: data.description || null,
      category: data.category,
      contentType: data.contentType,
      content: data.content,
      author: data.author || null,
      taskForB: data.taskForB || null,
      responseMode: data.responseMode,
      linkedToPrevious: data.linkedToPrevious,
      linkedToNext: data.linkedToNext,
      storyChainId: data.storyChainId || null,
      tags: data.tags || null,
      isFavorite: false,
      usageCount: 0,
      assignedToDayNumber: null
    });
    
    return json({ success: true, tile });
  } catch (error) {
    return json({ success: false, error: 'Fehler beim Erstellen' }, { status: 400 });
  }
};

export const PATCH: RequestHandler = async ({ request }) => {
  const data = await request.json();
  
  try {
    const tile = await db.tiles.update(data.id, {
      title: data.title,
      description: data.description || null,
      category: data.category,
      contentType: data.contentType,
      content: data.content,
      author: data.author || null,
      taskForB: data.taskForB || null,
      responseMode: data.responseMode,
      linkedToPrevious: data.linkedToPrevious,
      linkedToNext: data.linkedToNext,
      storyChainId: data.storyChainId || null,
      tags: data.tags || null
    });
    
    return json({ success: true, tile });
  } catch (error) {
    return json({ success: false, error: 'Fehler beim Aktualisieren' }, { status: 400 });
  }
};
