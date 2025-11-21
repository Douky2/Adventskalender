import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/storage';

export const load: PageServerLoad = async () => {
  let allDays = await db.days.getAll();
  
  // Seed if empty
  if (allDays.length === 0) {
    for (let i = 1; i <= 24; i++) {
      await db.days.update(i, { title: `Türchen ${i}` });
    }
    allDays = await db.days.getAll();
  }

  return {
    days: allDays,
    simulationMode: false // Placeholder
  };
};

export const actions: Actions = {
  toggleSimulation: async () => {
    return { success: true };
  },
  
  resetTracking: async () => {
    return { success: true, message: 'Tracking reset (Simulation)' };
  }
};
