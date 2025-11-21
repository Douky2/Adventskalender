<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  export let files: string[] = [];
  export let autoplay: boolean = false;
  
  let audio: HTMLAudioElement;
  let currentFile = '';
  let isPlaying = false;
  let isMuted = false;
  let progress = 0;
  let showControls = false;
  
  function pickRandomSong() {
    if (files.length === 0) return;
    // Avoid picking the same song if possible
    let newFile;
    do {
        const index = Math.floor(Math.random() * files.length);
        newFile = files[index];
    } while (files.length > 1 && newFile === currentFile);
    
    currentFile = newFile;
  }
  
  onMount(() => {
    pickRandomSong();
    
    if (audio) {
        audio.volume = 0.3; // Start with lower volume
        if (autoplay) {
            // Try to play immediately
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented by browser policy. Waiting for interaction.");
                    isPlaying = false;
                    
                    // Add one-time click listener to document to start music
                    const startAudio = () => {
                        if (audio && audio.paused) {
                            audio.play().then(() => {
                                isPlaying = true;
                            }).catch(e => console.error("Still failed to play", e));
                        }
                        document.removeEventListener('click', startAudio);
                        document.removeEventListener('keydown', startAudio);
                    };
                    
                    document.addEventListener('click', startAudio);
                    document.addEventListener('keydown', startAudio);
                });
            }
        }
    }
  });
  
  function togglePlay() {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
  
  function toggleMute() {
    if (!audio) return;
    audio.muted = !audio.muted;
    isMuted = audio.muted;
  }
  
  function nextSong() {
    pickRandomSong();
    // Reset progress
    progress = 0;
    // Auto play next song if we were playing
    if (isPlaying) {
        // Svelte updates the src reactive, wait a tick
        setTimeout(() => {
            if (audio) audio.play();
        }, 50);
    }
  }
  
  function handleTimeUpdate() {
    if (!audio || !audio.duration) return;
    progress = (audio.currentTime / audio.duration) * 100;
  }
  
  function handlePlay() { isPlaying = true; }
  function handlePause() { isPlaying = false; }
  
  function formatTime(seconds: number) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
</script>

{#if files.length > 0}
  <div 
    class="music-player" 
    class:expanded={showControls}
    on:mouseenter={() => showControls = true}
    on:mouseleave={() => showControls = false}
  >
    <!-- Hidden Audio Element -->
    <audio
      bind:this={audio}
      src={`/music/${currentFile}`}
      on:timeupdate={handleTimeUpdate}
      on:ended={nextSong}
      on:play={handlePlay}
      on:pause={handlePause}
    ></audio>

    <!-- Progress Bar (Always visible as a thin line at bottom) -->
    <div class="progress-container" on:click={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const p = x / rect.width;
        if (audio && audio.duration) audio.currentTime = p * audio.duration;
    }}>
        <div class="progress-bar" style="width: {progress}%"></div>
    </div>

    <div class="controls">
        <div class="song-info">
            <span class="icon">🎵</span>
            {#if showControls}
                <span class="filename" transition:fade>{currentFile.replace('.mp3', '').replace(/-/g, ' ')}</span>
            {/if}
        </div>

        <div class="buttons">
            <button class="btn-icon" on:click={togglePlay} title={isPlaying ? "Pause" : "Abspielen"}>
                {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <button class="btn-icon" on:click={nextSong} title="Nächstes Lied">
                ⏭️
            </button>
            
            <button class="btn-icon" on:click={toggleMute} title={isMuted ? "Laut" : "Stumm"}>
                {isMuted ? '🔇' : '🔊'}
            </button>
        </div>
    </div>
  </div>
{/if}

<style>
  .music-player {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background: rgba(26, 15, 10, 0.8);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1000;
    transition: all 0.3s ease;
    width: 140px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  }
  
  .music-player.expanded {
    width: 300px;
    background: rgba(26, 15, 10, 0.95);
    border-color: rgba(212, 175, 55, 0.6);
  }
  
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .song-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #d4af37;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  
  .filename {
    font-size: 0.75rem;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem;
    opacity: 0.7;
    transition: opacity 0.2s;
    color: #f4e4c1;
  }
  
  .btn-icon:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  .progress-container {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    margin-top: 2px;
  }
  
  .progress-container:hover {
    height: 5px;
  }
  
  .progress-bar {
    height: 100%;
    background: #d4af37;
    border-radius: 2px;
    transition: width 0.1s linear;
  }
</style>