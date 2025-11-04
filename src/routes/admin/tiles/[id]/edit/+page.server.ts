import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  const id = parseInt(params.id);
  
  const tile = await prisma.tile.findUnique({
    where: { id }
  });
  
  if (!tile) {
    throw redirect(303, '/admin/tiles');
  }
  
  return { tile };
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    const id = parseInt(params.id);
    const data = await request.formData();
    
    try {
      await prisma.tile.update({
        where: { id },
        data: {
          title: data.get('title') as string,
          description: data.get('description') as string || null,
          category: data.get('category') as string,
          contentType: data.get('contentType') as string,
          content: data.get('content') as string,
          author: data.get('author') as string || null,
          taskForB: data.get('taskForB') as string || null,
          responseMode: data.get('responseMode') as string,
          linkedToPrevious: data.get('linkedToPrevious') === 'on',
          linkedToNext: data.get('linkedToNext') === 'on',
          storyChainId: data.get('storyChainId') as string || null,
          tags: data.get('tags') as string || null
        }
      });
      
      throw redirect(303, '/admin/tiles');
    } catch (error) {
      if (error instanceof Response) throw error;
      return fail(400, { error: 'Fehler beim Speichern' });
    }
  }
};
