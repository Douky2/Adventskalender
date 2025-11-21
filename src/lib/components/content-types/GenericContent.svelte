<script lang="ts">
  // Generic content component template
  // Props that every component receives
  export let content: string;
  export let author: string | undefined = undefined;
  export let contentType: string = '';
  
  // Icons and colors for different content types
  const typeConfig: Record<string, {icon: string, backgroundColor: string, borderColor: string}> = {
    // Romantic
    'APPRECIATION': { icon: '🥰', backgroundColor: '#fff0f5', borderColor: '#ff6b9d' },
    'MEMORY': { icon: '💭', backgroundColor: '#f0f8ff', borderColor: '#6dd5ed' },
    'GRATITUDE': { icon: '🙏', backgroundColor: '#fffaf0', borderColor: '#f093fb' },
    'COMPLIMENT_BATTLE': { icon: '💖', backgroundColor: '#fff0f5', borderColor: '#ff6b9d' },
    
    // Virtual/Digital
    'SPOTIFY_SONG': { icon: '🎵', backgroundColor: '#f0fff4', borderColor: '#1db954' },
    'PLAYLIST': { icon: '🎶', backgroundColor: '#f0f4ff', borderColor: '#667eea' },
    'PLAYLIST_COLLAB': { icon: '🎧', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'PLAYLIST_BATTLE': { icon: '🎸', backgroundColor: '#fff0f5', borderColor: '#fa709a' },
    'MOVIE_NIGHT': { icon: '🎬', backgroundColor: '#e1f5fe', borderColor: '#4facfe' },
    
    // Games
    'QUIZ_JSON': { icon: '❓', backgroundColor: '#f1f8e9', borderColor: '#56ab2f' },
    'POLL': { icon: '📊', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'WOULD_YOU_RATHER': { icon: '🤔', backgroundColor: '#fff3e0', borderColor: '#fcb69f' },
    'THIS_OR_THAT': { icon: '⚖️', backgroundColor: '#e0f7fa', borderColor: '#a8edea' },
    'TRUTH_OR_DARE': { icon: '🎲', backgroundColor: '#fce4ec', borderColor: '#fa709a' },
    'INTERACTIVE_CHOICE': { icon: '🎯', backgroundColor: '#e0f2f1', borderColor: '#30cfd0' },
    'RIDDLE': { icon: '🧩', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'GAME_CHALLENGE': { icon: '🎮', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'DUOLINGO_CHALLENGE': { icon: '🦉', backgroundColor: '#e8f5e9', borderColor: '#58dc8c' },
    'WORKOUT_CHALLENGE': { icon: '💪', backgroundColor: '#fce4ec', borderColor: '#fa709a' },
    'BINGO_CHALLENGE': { icon: '🎰', backgroundColor: '#fff3e0', borderColor: '#fcb69f' },
    
    // Creative
    'PHOTO_CHALLENGE': { icon: '📸', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'ART_CHALLENGE': { icon: '🎨', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'DRAWING': { icon: '✏️', backgroundColor: '#e0f7fa', borderColor: '#a8edea' },
    'MEME_COLLECTION': { icon: '😂', backgroundColor: '#fff3e0', borderColor: '#fcb69f' },
    'COOKING_TOGETHER': { icon: '👨‍🍳', backgroundColor: '#fff8e1', borderColor: '#fa709a' },
    'COUPLE_CHALLENGE': { icon: '💑', backgroundColor: '#ffebee', borderColor: '#ff9a9e' },
    'STORY_TOGETHER': { icon: '📖', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'SCAVENGER_HUNT': { icon: '🔍', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'PARALLEL_CHALLENGE': { icon: '🔄', backgroundColor: '#e0f2f1', borderColor: '#30cfd0' },
    'ROLEPLAY_SCENARIO': { icon: '🎭', backgroundColor: '#e0f7fa', borderColor: '#a8edea' },
    'MEDITATION_TOGETHER': { icon: '🧘', backgroundColor: '#f1f8e9', borderColor: '#a8e063' },
    'SUNRISE_SUNSET': { icon: '🌅', backgroundColor: '#fff3e0', borderColor: '#fa709a' },
    
    // Future/Planning
    'BUCKET_LIST': { icon: '📝', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'SHARED_GOAL': { icon: '🎯', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'DREAM_BOARD': { icon: '🌟', backgroundColor: '#fff8e1', borderColor: '#ffecd2' },
    'TIME_CAPSULE': { icon: '⏰', backgroundColor: '#e0f2f1', borderColor: '#30cfd0' },
    'WISH_LIST': { icon: '✨', backgroundColor: '#ffebee', borderColor: '#ff9a9e' },
    'LIFE_GOALS': { icon: '🚀', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'ADVENTURE_PLAN': { icon: '🗺️', backgroundColor: '#e0f7fa', borderColor: '#a8edea' },
    
    // Personal
    'CHILDHOOD_STORY': { icon: '👶', backgroundColor: '#fff3e0', borderColor: '#fcb69f' },
    'FIRST_IMPRESSION': { icon: '💫', backgroundColor: '#ffebee', borderColor: '#ff9a9e' },
    'EMBARRASSING_MOMENT': { icon: '😅', backgroundColor: '#fff8e1', borderColor: '#fa709a' },
    'INSIDE_JOKE': { icon: '🤪', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'FAVORITE_THINGS': { icon: '❤️', backgroundColor: '#ffebee', borderColor: '#ff9a9e' },
    
    // Special
    'LETTER_TO_FUTURE': { icon: '✉️', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'PET_PHOTOS': { icon: '🐾', backgroundColor: '#fff3e0', borderColor: '#fcb69f' },
    'DREAM_DATE_PLANNING': { icon: '💝', backgroundColor: '#ffebee', borderColor: '#ff9a9e' },
    'STORY_PART': { icon: '📚', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'VIRTUAL_DATE': { icon: '💻', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    
    // Music/Media
    'VOICE_MESSAGE': { icon: '🎤', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'PODCAST_SHARE': { icon: '🎙️', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'SCREENSHOT_TOUR': { icon: '📱', backgroundColor: '#e0f7fa', borderColor: '#a8edea' },
    'COUNTDOWN': { icon: '⏳', backgroundColor: '#fff3e0', borderColor: '#fcb69f' },
    'VIDEO_CALL_IDEA': { icon: '📹', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    
    // Misc
    'RECIPE': { icon: '🍳', backgroundColor: '#fff8e1', borderColor: '#fa709a' },
    'BOOK_RECOMMENDATION': { icon: '📚', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'MAP': { icon: '🗺️', backgroundColor: '#e0f7fa', borderColor: '#a8edea' },
    'COZY_EVENING': { icon: '🕯️', backgroundColor: '#fff3e0', borderColor: '#fcb69f' },
    'MUSIC_PLAYLIST': { icon: '🎵', backgroundColor: '#e8eaf6', borderColor: '#667eea' },
    'CELEBRATION': { icon: '🎉', backgroundColor: '#fff8e1', borderColor: '#fa709a' },
    'CREATIVE_CHALLENGE': { icon: '💡', backgroundColor: '#f3e5f5', borderColor: '#f093fb' },
    'STARGAZING': { icon: '✨', backgroundColor: '#e0f2f1', borderColor: '#30cfd0' },
  };
  
  $: config = typeConfig[contentType] || { icon: '📝', backgroundColor: '#f5f7fa', borderColor: '#c3cfe2' };
</script>

<div class="content-box" style="background-color: {config.backgroundColor}; border-left-color: {config.borderColor}">
  {#if author}
    <div class="author-badge">{config.icon} {author}</div>
  {/if}
  <div class="content-header">
    <span class="content-icon">{config.icon}</span>
  </div>
  <div class="content-text">
    {content}
  </div>
</div>

<style>
  .content-box {
    padding: 2rem;
    border-radius: 2px;
    border-left: 4px solid;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    border-top: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    font-family: 'Georgia', serif;
  }
  
  .author-badge {
    display: inline-block;
    background: #fff;
    padding: 0.5rem 1rem;
    border-radius: 2px;
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #2c1810;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e0e0e0;
  }
  
  .content-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .content-icon {
    font-size: 3rem;
    display: block;
    filter: sepia(0.5);
  }
  
  .content-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #2c1810;
    white-space: pre-wrap;
  }
</style>
