import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const tileId = params.id;

  const tile = await prisma.tile.findUnique({
    where: { id: tileId }
  });

  if (!tile) {
    throw error(404, 'Vorlage nicht gefunden');
  }

  return {
    tile
  };
};
