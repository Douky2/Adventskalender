import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/database';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  
  try {
    const tile = await prisma.tile.create({
      data: {
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
      }
    });
    
    return json({ success: true, tile });
  } catch (error) {
    return json({ success: false, error: 'Fehler beim Erstellen' }, { status: 400 });
  }
};

export const PATCH: RequestHandler = async ({ request }) => {
  const data = await request.json();
  
  try {
    const tile = await prisma.tile.update({
      where: { id: data.id },
      data: {
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
      }
    });
    
    return json({ success: true, tile });
  } catch (error) {
    return json({ success: false, error: 'Fehler beim Aktualisieren' }, { status: 400 });
  }
};
