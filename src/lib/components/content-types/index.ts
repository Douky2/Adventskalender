// Import specific components
import TEXT from './basis/TEXT.svelte';
import IMAGE_URL from './basis/IMAGE_URL.svelte';
import VIDEO_EMBED from './basis/VIDEO_EMBED.svelte';
import LOVE_LETTER from './romantic/LOVE_LETTER.svelte';

// Import generic component for all other types
import GenericContent from './GenericContent.svelte';

// Content type to component mapping
// Using 'any' to avoid complex Svelte component typing issues
export const contentTypeComponents: Record<string, any> = {
  // Basis (3)
  'TEXT': TEXT,
  'IMAGE_URL': IMAGE_URL,
  'VIDEO_EMBED': VIDEO_EMBED,
  
  // Romantic (5)
  'LOVE_LETTER': LOVE_LETTER,
  'APPRECIATION': GenericContent,
  'MEMORY': GenericContent,
  'GRATITUDE': GenericContent,
  'COMPLIMENT_BATTLE': GenericContent,
  
  // Virtual/Digital (5)
  'SPOTIFY_SONG': GenericContent,
  'PLAYLIST': GenericContent,
  'PLAYLIST_COLLAB': GenericContent,
  'PLAYLIST_BATTLE': GenericContent,
  'MOVIE_NIGHT': GenericContent,
  
  // Music/Media (5)
  'VOICE_MESSAGE': GenericContent,
  'PODCAST_SHARE': GenericContent,
  'SCREENSHOT_TOUR': GenericContent,
  'COUNTDOWN': GenericContent,
  'VIDEO_CALL_IDEA': GenericContent,
  
  // Games (11)
  'QUIZ_JSON': GenericContent,
  'POLL': GenericContent,
  'WOULD_YOU_RATHER': GenericContent,
  'THIS_OR_THAT': GenericContent,
  'TRUTH_OR_DARE': GenericContent,
  'INTERACTIVE_CHOICE': GenericContent,
  'RIDDLE': GenericContent,
  'GAME_CHALLENGE': GenericContent,
  'DUOLINGO_CHALLENGE': GenericContent,
  'WORKOUT_CHALLENGE': GenericContent,
  'BINGO_CHALLENGE': GenericContent,
  
  // Creative (12)
  'PHOTO_CHALLENGE': GenericContent,
  'ART_CHALLENGE': GenericContent,
  'DRAWING': GenericContent,
  'MEME_COLLECTION': GenericContent,
  'COOKING_TOGETHER': GenericContent,
  'COUPLE_CHALLENGE': GenericContent,
  'STORY_TOGETHER': GenericContent,
  'SCAVENGER_HUNT': GenericContent,
  'PARALLEL_CHALLENGE': GenericContent,
  'ROLEPLAY_SCENARIO': GenericContent,
  'MEDITATION_TOGETHER': GenericContent,
  'SUNRISE_SUNSET': GenericContent,
  
  // Future/Planning (7)
  'BUCKET_LIST': GenericContent,
  'SHARED_GOAL': GenericContent,
  'DREAM_BOARD': GenericContent,
  'TIME_CAPSULE': GenericContent,
  'WISH_LIST': GenericContent,
  'LIFE_GOALS': GenericContent,
  'ADVENTURE_PLAN': GenericContent,
  
  // Personal (5)
  'CHILDHOOD_STORY': GenericContent,
  'FIRST_IMPRESSION': GenericContent,
  'EMBARRASSING_MOMENT': GenericContent,
  'INSIDE_JOKE': GenericContent,
  'FAVORITE_THINGS': GenericContent,
  
  // Special (5)
  'LETTER_TO_FUTURE': GenericContent,
  'PET_PHOTOS': GenericContent,
  'DREAM_DATE_PLANNING': GenericContent,
  'STORY_PART': GenericContent,
  'VIRTUAL_DATE': GenericContent,
  
  // Misc (3)
  'RECIPE': GenericContent,
  'BOOK_RECOMMENDATION': GenericContent,
  'MAP': GenericContent,
};

// Helper function to get component for a content type
export function getContentComponent(contentType: string): any {
  return contentTypeComponents[contentType] || TEXT;
}
