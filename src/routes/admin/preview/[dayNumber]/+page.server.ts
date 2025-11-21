import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/storage';

export const load: PageServerLoad = async ({ params }) => {
  const dayNumber = Number(params.dayNumber);

  if (!Number.isInteger(dayNumber) || dayNumber < 1) {
    throw error(404, 'Ungültiges Türchen');
  }

  const day = await db.days.getByDayNumber(dayNumber);

  if (!day) {
    throw error(404, 'Türchen nicht gefunden');
  }

  return {
    day: {
      dayNumber: day.dayNumber,
      title: day.title ?? 'Titel fehlt',
      contentTypeA: day.contentTypeA ?? 'TEXT',
      contentA: day.contentA ?? '',
      authorA: day.authorA ?? 'Locdoc',
      taskForB: day.taskForB ?? '',
      responseMode: day.responseMode ?? 'DISABLED',
      authorB: day.authorB ?? 'Miss Chaos',
      contentB: day.contentB ?? '',
      linkedToPrevious: Boolean(day.linkedToPrevious),
      linkedToNext: Boolean(day.linkedToNext),
      storyChainId: day.storyChainId ?? '',
      combinedResult: day.combinedResult ?? '',
      resultGenerated: Boolean(day.resultGenerated)
    }
  };
};
