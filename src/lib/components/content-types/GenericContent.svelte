<script lang="ts">
  // Generic content component template
  // Props that every component receives
  export let content: string;
  export let author: string | undefined = undefined;
  export let contentType: string = '';
  
  // Icons and colors for different content types
  const typeConfig: Record<string, {icon: string, gradient: string, borderColor: string}> = {
    // Romantic
    'APPRECIATION': { icon: '🥰', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', borderColor: '#ff6b9d' },
    'MEMORY': { icon: '💭', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderColor: '#6dd5ed' },
    'GRATITUDE': { icon: '🙏', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#f093fb' },
    'COMPLIMENT_BATTLE': { icon: '💖', gradient: 'linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)', borderColor: '#ff6b9d' },
    
    // Virtual/Digital
    'SPOTIFY_SONG': { icon: '🎵', gradient: 'linear-gradient(135deg, #1db954 20%, #191414 100%)', borderColor: '#1db954' },
    'PLAYLIST': { icon: '🎶', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'PLAYLIST_COLLAB': { icon: '🎧', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'PLAYLIST_BATTLE': { icon: '🎸', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    'MOVIE_NIGHT': { icon: '🎬', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', borderColor: '#4facfe' },
    
    // Games
    'QUIZ_JSON': { icon: '❓', gradient: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)', borderColor: '#56ab2f' },
    'POLL': { icon: '📊', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'WOULD_YOU_RATHER': { icon: '🤔', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#fcb69f' },
    'THIS_OR_THAT': { icon: '⚖️', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderColor: '#a8edea' },
    'TRUTH_OR_DARE': { icon: '🎲', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    'INTERACTIVE_CHOICE': { icon: '🎯', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', borderColor: '#30cfd0' },
    'RIDDLE': { icon: '🧩', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'GAME_CHALLENGE': { icon: '🎮', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'DUOLINGO_CHALLENGE': { icon: '🦉', gradient: 'linear-gradient(135deg, #58dc8c 0%, #3cab5f 100%)', borderColor: '#58dc8c' },
    'WORKOUT_CHALLENGE': { icon: '💪', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    'BINGO_CHALLENGE': { icon: '🎰', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#fcb69f' },
    
    // Creative
    'PHOTO_CHALLENGE': { icon: '📸', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'ART_CHALLENGE': { icon: '🎨', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'DRAWING': { icon: '✏️', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderColor: '#a8edea' },
    'MEME_COLLECTION': { icon: '😂', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#fcb69f' },
    'COOKING_TOGETHER': { icon: '👨‍🍳', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    'COUPLE_CHALLENGE': { icon: '💑', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', borderColor: '#ff9a9e' },
    'STORY_TOGETHER': { icon: '📖', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'SCAVENGER_HUNT': { icon: '🔍', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'PARALLEL_CHALLENGE': { icon: '🔄', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', borderColor: '#30cfd0' },
    'ROLEPLAY_SCENARIO': { icon: '🎭', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderColor: '#a8edea' },
    'MEDITATION_TOGETHER': { icon: '🧘', gradient: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)', borderColor: '#a8e063' },
    'SUNRISE_SUNSET': { icon: '🌅', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    
    // Future/Planning
    'BUCKET_LIST': { icon: '📝', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'SHARED_GOAL': { icon: '🎯', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'DREAM_BOARD': { icon: '🌟', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#ffecd2' },
    'TIME_CAPSULE': { icon: '⏰', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', borderColor: '#30cfd0' },
    'WISH_LIST': { icon: '✨', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', borderColor: '#ff9a9e' },
    'LIFE_GOALS': { icon: '🚀', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'ADVENTURE_PLAN': { icon: '🗺️', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderColor: '#a8edea' },
    
    // Personal
    'CHILDHOOD_STORY': { icon: '👶', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#fcb69f' },
    'FIRST_IMPRESSION': { icon: '💫', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', borderColor: '#ff9a9e' },
    'EMBARRASSING_MOMENT': { icon: '😅', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    'INSIDE_JOKE': { icon: '🤪', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'FAVORITE_THINGS': { icon: '❤️', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', borderColor: '#ff9a9e' },
    
    // Special
    'LETTER_TO_FUTURE': { icon: '✉️', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'PET_PHOTOS': { icon: '🐾', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#fcb69f' },
    'DREAM_DATE_PLANNING': { icon: '💝', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', borderColor: '#ff9a9e' },
    'STORY_PART': { icon: '📚', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'VIRTUAL_DATE': { icon: '💻', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    
    // Music/Media
    'VOICE_MESSAGE': { icon: '🎤', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'PODCAST_SHARE': { icon: '🎙️', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'SCREENSHOT_TOUR': { icon: '📱', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderColor: '#a8edea' },
    'COUNTDOWN': { icon: '⏳', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#fcb69f' },
    'VIDEO_CALL_IDEA': { icon: '📹', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    
    // Misc
    'RECIPE': { icon: '🍳', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    'BOOK_RECOMMENDATION': { icon: '📚', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'MAP': { icon: '🗺️', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', borderColor: '#a8edea' },
    'COZY_EVENING': { icon: '🕯️', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', borderColor: '#fcb69f' },
    'MUSIC_PLAYLIST': { icon: '🎵', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea' },
    'CELEBRATION': { icon: '🎉', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderColor: '#fa709a' },
    'CREATIVE_CHALLENGE': { icon: '💡', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderColor: '#f093fb' },
    'STARGAZING': { icon: '✨', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', borderColor: '#30cfd0' },
  };
  
  $: config = typeConfig[contentType] || { icon: '📝', gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', borderColor: '#c3cfe2' };
</script>

<div class="content-box" style="background: {config.gradient}; border-left-color: {config.borderColor}">
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
    border-radius: 15px;
    border-left: 4px solid;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    margin-bottom: 2rem;
  }
  
  .author-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.95);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #2c3e50;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .content-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .content-icon {
    font-size: 3rem;
    display: block;
  }
  
  .content-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #2c3e50;
    white-space: pre-wrap;
  }
</style>
