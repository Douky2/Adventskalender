import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  // Neue Tiles werden in der +page.svelte erstellt
  return {
    tile: null
  };
};
