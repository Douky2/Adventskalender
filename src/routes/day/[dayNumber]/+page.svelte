<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { getContentComponent } from '$lib/components/content-types';
  
  export let data;
  export let form;
  
  let showResponseForm = false;
  
  // Get the appropriate component for each content type
  $: componentA = getContentComponent(data.content?.contentTypeA || 'TEXT');
  $: componentB = data.content?.contentTypeB ? getContentComponent(data.content.contentTypeB) : null;
</script>

<svelte:head>
  <title>{data.isLocked ? `Tür ${data.dayNumber} - Verschlossen` : (data.content ? data.content.title : 'Adventskalender')}</title>
</svelte:head>

<div class="container">
  {#if data.isLocked}
    <div class="locked" in:fade={{ duration: 300 }}>
      <div class="lock" in:fly={{ y: -50, duration: 600, delay: 200, easing: cubicOut }}>🔒</div>
      <h1 in:fade={{ duration: 600, delay: 400 }}>Tür {data.dayNumber} ist noch verschlossen!</h1>
      <p in:fade={{ duration: 600, delay: 600 }}>Komm am {data.unlockDate} wieder ✨</p>
      <a href="/" in:fade={{ duration: 600, delay: 800 }}>← Zurück</a>
    </div>
  {:else}
    <article in:fade={{ duration: 400 }}>
      <header in:fly={{ y: -30, duration: 500, easing: cubicOut }}>
        <div class="badge-day">Tag {data.dayNumber}</div>
        <h1>{data.content.title}</h1>
        
        {#if data.content.linkedToPrevious || data.content.linkedToNext || data.content.storyChainId}
          <div class="story-chain-badge">
            {#if data.content.linkedToPrevious}📖{/if}
            {#if data.content.storyChainId}
              🔗 Story: {data.content.storyChainId}
            {/if}
            {#if data.content.linkedToNext}⏭️{/if}
          </div>
        {/if}
      </header>
      
      <!-- Story Chain Navigation -->
      {#if data.storyChainDays && data.storyChainDays.length > 1}
        <div class="story-chain-nav" in:fade={{ duration: 400, delay: 100 }}>
          <h4>📚 Zusammenhängende Geschichte:</h4>
          <div class="chain-days">
            {#each data.storyChainDays as chainDay}
              <a 
                href="/day/{chainDay.dayNumber}" 
                class="chain-day"
                class:current={chainDay.dayNumber === data.dayNumber}
                class:completed={chainDay.hasContentB}
              >
                Tag {chainDay.dayNumber}
                {#if chainDay.hasContentB}✅{/if}
              </a>
            {/each}
          </div>
        </div>
      {/if}
      
      <!-- Person A (Locdoc) -->
      <div class="box box-a" in:fly={{ x: -50, duration: 600, delay: 200, easing: cubicOut }}>
        <span class="badge">{data.content.authorA} 💝</span>
        
        {#if data.content.contentTypeA === 'TEXT'}
          {#each data.content.contentA.split('\n') as p}
            {#if p.trim()}<p>{p}</p>{/if}
          {/each}
        
        {:else if data.content.contentTypeA === 'IMAGE_URL'}
          <img src={data.content.contentA} alt="Bild von {data.content.authorA}" class="content-image" />
        
        {:else if data.content.contentTypeA === 'RECIPE'}
          <div class="recipe">
            <h3>🍳 Rezept</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'MEMORY'}
          <div class="memory">
            <h3>💭 Erinnerung</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'POLL'}
          <div class="poll">
            <h3>📊 Umfrage</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'BUCKET_LIST'}
          <div class="bucket-list">
            <h3>🎯 Bucket List Item</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'PHOTO_CHALLENGE'}
          <div class="photo-challenge">
            <h3>📸 Foto-Challenge</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'LOVE_LETTER'}
          <div class="love-letter">
            <h3>💌 Liebesbrief</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'RIDDLE'}
          <div class="riddle">
            <h3>🤔 Rätsel</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'INTERACTIVE_CHOICE'}
          <div class="interactive-choice">
            <h3>🎮 Interaktive Wahl</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}
                {#if line.startsWith('Option:')}
                  <button class="choice-btn">{line.replace('Option:', '').trim()}</button>
                {:else}
                  <p>{line}</p>
                {/if}
              {/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'SHARED_GOAL'}
          <div class="shared-goal">
            <h3>🎯 Gemeinsames Ziel</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'GRATITUDE'}
          <div class="gratitude">
            <h3>🙏 Dankbarkeit</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'COUNTDOWN'}
          <div class="countdown">
            <h3>⏰ Countdown</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'DREAM_BOARD'}
          <div class="dream-board">
            <h3>🌟 Traumboard</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'TIME_CAPSULE'}
          <div class="time-capsule">
            <h3>⏳ Zeitkapsel</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'SPOTIFY_SONG'}
          <div class="spotify-song">
            <h3>🎵 Song des Tages</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'DRAWING'}
          <div class="drawing">
            <h3>🎨 Zeichnung/Skizze</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'VIRTUAL_DATE'}
          <div class="virtual-date">
            <h3>🎬 Virtuelles Date</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'MOVIE_NIGHT'}
          <div class="movie-night">
            <h3>🍿 Film-Abend</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'GAME_CHALLENGE'}
          <div class="game-challenge">
            <h3>🎮 Gaming-Challenge</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'COOKING_TOGETHER'}
          <div class="cooking-together">
            <h3>👨‍🍳 Virtuelles Kochen</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'PLAYLIST_COLLAB'}
          <div class="playlist-collab">
            <h3>🎵 Gemeinsame Playlist</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'WOULD_YOU_RATHER'}
          <div class="would-you-rather">
            <h3>🤔 Würdest du lieber...?</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'THIS_OR_THAT'}
          <div class="this-or-that">
            <h3>⚡ Dies oder Das</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'TRUTH_OR_DARE'}
          <div class="truth-or-dare">
            <h3>🎪 Wahrheit oder Pflicht</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'APPRECIATION'}
          <div class="appreciation">
            <h3>💖 Wertschätzung</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'LIFE_GOALS'}
          <div class="life-goals">
            <h3>🎯 Lebensziele</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'FIRST_IMPRESSION'}
          <div class="first-impression">
            <h3>💑 Erster Eindruck</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'INSIDE_JOKE'}
          <div class="inside-joke">
            <h3>🤫 Inside Joke</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'CHILDHOOD_STORY'}
          <div class="childhood-story">
            <h3>👶 Kindheitsgeschichte</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'LETTER_TO_FUTURE'}
          <div class="letter-to-future">
            <h3>📝 Brief an die Zukunft</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'ART_CHALLENGE'}
          <div class="art-challenge">
            <h3>🎨 Kunst-Challenge</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'SUNRISE_SUNSET'}
          <div class="sunrise-sunset">
            <h3>🌅 Sonnenauf/untergang</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'VOICE_MESSAGE'}
          <div class="voice-message">
            <h3>🎙️ Sprachnachricht</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'SCREENSHOT_TOUR'}
          <div class="screenshot-tour">
            <h3>📱 Screenshot-Tour</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'MEME_COLLECTION'}
          <div class="meme-collection">
            <h3>😂 Meme-Sammlung</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'WORKOUT_CHALLENGE'}
          <div class="workout-challenge">
            <h3>💪 Sport-Challenge</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'PODCAST_SHARE'}
          <div class="podcast-share">
            <h3>🎧 Podcast-Empfehlung</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'ADVENTURE_PLAN'}
          <div class="adventure-plan">
            <h3>🗺️ Abenteuer-Planung</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'WISH_LIST'}
          <div class="wish-list">
            <h3>🎁 Wunschliste</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'EMBARRASSING_MOMENT'}
          <div class="embarrassing-moment">
            <h3>😳 Peinlicher Moment</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'FAVORITE_THINGS'}
          <div class="favorite-things">
            <h3>❤️ Lieblingssachen</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'PET_PHOTOS'}
          <div class="pet-photos">
            <h3>🐾 Haustier-Fotos</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'BOOK_RECOMMENDATION'}
          <div class="book-recommendation">
            <h3>📚 Buch-Empfehlung</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'TWO_TRUTHS_ONE_LIE'}
          <div class="two-truths-one-lie">
            <h3>🎭 Zwei Wahrheiten & Eine Lüge</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'COUPLE_CHALLENGE'}
          <div class="couple-challenge">
            <h3>💑 Paar-Challenge</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'STORY_TOGETHER'}
          <div class="story-together">
            <h3>📖 Geschichte zusammen schreiben</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'BINGO_CHALLENGE'}
          <div class="bingo-challenge">
            <h3>🎯 Paar-Bingo</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'DEBATE_FUN'}
          <div class="debate-fun">
            <h3>🎤 Lustiges Debate</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'ROLEPLAY_SCENARIO'}
          <div class="roleplay-scenario">
            <h3>🎭 Roleplay-Szenario</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'COMPLIMENT_BATTLE'}
          <div class="compliment-battle">
            <h3>💝 Kompliment-Battle</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'PREDICTION_GAME'}
          <div class="prediction-game">
            <h3>🔮 Vorhersage-Spiel</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'SCAVENGER_HUNT'}
          <div class="scavenger-hunt">
            <h3>🔍 Virtuelle Schnitzeljagd</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'PARALLEL_CHALLENGE'}
          <div class="parallel-challenge">
            <h3>⏱️ Parallel-Challenge</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'QUESTION_EXCHANGE'}
          <div class="question-exchange">
            <h3>💬 Fragen-Austausch</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'GRATITUDE_EXCHANGE'}
          <div class="gratitude-exchange">
            <h3>🙏 Dankbarkeits-Austausch</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'COLLABORATIVE_PLAYLIST'}
          <div class="collaborative-playlist">
            <h3>🎵 Story-Playlist</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {:else if data.content.contentTypeA === 'DREAM_DATE_PLANNING'}
          <div class="dream-date-planning">
            <h3>🌟 Traumdate planen</h3>
            {#each data.content.contentA.split('\n') as line}
              {#if line.trim()}<p>{line}</p>{/if}
            {/each}
          </div>
        
        {/if}
        
        {#if data.content.taskForB && data.content.responseMode !== 'DISABLED'}
          <div class="task" in:fade={{ duration: 600, delay: 400 }}>
            <h3>📋 Aufgabe für {data.content.authorB}:</h3>
            <p>{data.content.taskForB}</p>
            {#if data.content.responseMode === 'COLLABORATIVE'}
              <span class="mode-badge collaborative">🤝 Zusammenarbeit</span>
            {:else if data.content.responseMode === 'OPEN'}
              <span class="mode-badge open">💬 Offen</span>
            {/if}
          </div>
        {/if}
      </div>
      
      <!-- Person B (Miss Chaos) -->
      {#if data.content.responseMode !== 'DISABLED'}
        <div class="box box-b" in:fly={{ x: 50, duration: 600, delay: 400, easing: cubicOut }}>
          <span class="badge">{data.content.authorB} 💖</span>
          {#if data.content.contentB}
            {#each data.content.contentB.split('\n') as p}
              {#if p.trim()}<p>{p}</p>{/if}
            {/each}
          {:else if data.content.responseMode === 'OPEN' || data.content.responseMode === 'COLLABORATIVE'}
            <div class="empty">
              <p>💭 Noch keine Antwort von {data.content.authorB}...</p>
              {#if !showResponseForm}
                <button on:click={() => showResponseForm = true}>
                  ✍️ Deine Nachricht hinzufügen
                </button>
              {/if}
            </div>
            
            {#if showResponseForm}
              <form method="POST" action="?/addResponse" use:enhance in:fade={{ duration: 400 }}>
                <input name="author" value={data.content.authorB} type="hidden" />
                <textarea name="content" rows="6" placeholder="Schreib deine Nachricht..." required></textarea>
                {#if form?.error}
                  <div class="error">{form.error}</div>
                {/if}
                <div class="actions">
                  <button type="submit">💾 Speichern</button>
                  <button type="button" on:click={() => showResponseForm = false}>Abbrechen</button>
                </div>
              </form>
            {/if}
          {/if}
        </div>
      {/if}
      
      <!-- Combined Result -->
      {#if data.content.resultGenerated && data.content.combinedResult}
        <div class="box box-combined" in:fly={{ y: 50, duration: 600, delay: 600, easing: cubicOut }}>
          <span class="badge">✨ Gemeinsames Ergebnis 🎨</span>
          {#each data.content.combinedResult.split('\n') as p}
            {#if p.trim()}<p>{p}</p>{/if}
          {/each}
        </div>
      {/if}
      
      <div class="nav">
        <a href="/">← Zurück</a>
        {#if data.dayNumber < 24}
          <a href="/day/{data.dayNumber + 1}">Weiter →</a>
        {/if}
      </div>
    </article>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    min-height: 100vh;
    position: relative;
  }
  
  :global(body)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255, 152, 0, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 77, 148, 0.05) 0%, transparent 50%);
    pointer-events: none;
    animation: backgroundFloat 15s ease-in-out infinite;
  }
  
  @keyframes backgroundFloat {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }
  
  article { 
    background: white; 
    border-radius: 24px; 
    padding: 3.5rem 2.5rem; 
    box-shadow: 
      0 24px 60px rgba(0,0,0,0.25),
      0 12px 24px rgba(0,0,0,0.15),
      0 0 0 1px rgba(255,255,255,0.1);
  }
  
  header { 
    text-align: center; 
    margin-bottom: 3.5rem; 
    padding-bottom: 2.5rem; 
    border-bottom: 3px solid transparent;
    background: linear-gradient(white, white) padding-box,
                linear-gradient(135deg, #ff9800 0%, #ff4d94 100%) border-box;
    border-image: linear-gradient(135deg, #ff9800 0%, #ff4d94 100%) 1;
  }
  
  .badge-day { 
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 50%, #ff4d94 100%); 
    color: white; 
    padding: 0.7rem 2rem; 
    border-radius: 50px; 
    display: inline-block; 
    margin-bottom: 1.5rem; 
    font-weight: 700;
    font-size: 1.1rem;
    box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    animation: badgePulse 3s ease-in-out infinite;
  }
  
  @keyframes badgePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  h1 { 
    font-size: 2.8rem; 
    background: linear-gradient(135deg, #ff9800 0%, #ff4d94 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    font-weight: 800;
    letter-spacing: 1px;
  }
  
  .story-chain-badge { 
    margin-top: 1.2rem; 
    padding: 0.6rem 1.5rem; 
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); 
    border-radius: 12px; 
    display: inline-block; 
    color: #2e7d32; 
    font-weight: 700;
    border: 2px solid #66bb6a;
    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15);
  }
  
  .story-chain-nav { 
    background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); 
    padding: 2rem; 
    border-radius: 16px; 
    margin-bottom: 2.5rem; 
    border: 3px solid #ffa726;
    box-shadow: 0 8px 24px rgba(255, 167, 38, 0.2);
  }
  
  .story-chain-nav h4 { 
    margin: 0 0 1.2rem 0; 
    color: #e65100;
    font-size: 1.3rem;
    font-weight: 700;
  }
  .chain-days { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .chain-day { padding: 0.5rem 1rem; background: white; border: 2px solid #ddd; border-radius: 8px; text-decoration: none; color: #2c3e50; font-weight: 600; transition: all 0.3s; }
  .chain-day:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
  .chain-day.current { background: #667eea; color: white; border-color: #667eea; }
  .chain-day.completed { background: #e8f5e9; border-color: #27ae60; }
  
  .box { 
    margin: 2rem 0; 
    padding: 2.5rem; 
    border-radius: 20px; 
    border: 3px solid; 
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .box::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .box:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.18);
  }
  
  /* Locdoc - Orange */
  .box-a { 
    background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 50%, #fff 100%); 
    border-color: #ff9800;
  }
  
  .box-a::before {
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  }
  
  .box-a:hover::before {
    opacity: 0.1;
  }
  
  /* Miss Chaos - Pink */
  .box-b { 
    background: linear-gradient(135deg, #fff0f6 0%, #ffe4f0 50%, #fff 100%); 
    border-color: #ff4d94;
  }
  
  .box-b::before {
    background: linear-gradient(135deg, #ff4d94 0%, #e91e63 100%);
  }
  
  .box-b:hover::before {
    opacity: 0.1;
  }
  
  /* Gemeinsames Ergebnis */
  .box-combined { 
    background: linear-gradient(135deg, #fff9e6 0%, #ffedcc 50%, #fff 100%); 
    border-color: #ffd700; 
    border-width: 4px; 
    animation: resultGlow 3s ease-in-out infinite;
  }
  
  @keyframes resultGlow {
    0%, 100% { 
      box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 0 0 rgba(255, 215, 0, 0);
    }
    50% { 
      box-shadow: 0 12px 32px rgba(0,0,0,0.18), 0 0 40px rgba(255, 215, 0, 0.5);
    }
  }
  
  /* Badges */
  .badge { 
    display: inline-block; 
    padding: 0.6rem 1.8rem; 
    border-radius: 50px; 
    font-weight: 700; 
    font-size: 1.1rem; 
    margin-bottom: 1.2rem; 
    color: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .box-a .badge { 
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  }
  
  .box-b .badge { 
    background: linear-gradient(135deg, #ff4d94 0%, #e91e63 100%);
  }
  
  .box-combined .badge {
    background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
    color: #1a1a1a;
  }
  p { line-height: 1.8; margin: 1rem 0; color: #2c3e50; }
  .task { margin-top: 1.5rem; padding: 1.5rem; background: #fff9e6; border: 2px solid #ffd700; border-radius: 12px; animation: taskGlow 2s ease-in-out infinite; }
  @keyframes taskGlow {
    0%, 100% { box-shadow: 0 0 0 rgba(255, 215, 0, 0); }
    50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
  }
  .task h3 { margin: 0 0 0.5rem 0; color: #d4af37; }
  .task p { margin: 0 0 0.5rem 0; }
  
  .mode-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-top: 0.5rem; }
  .mode-badge.collaborative { background: #e8f5e9; color: #27ae60; }
  .mode-badge.open { background: #e3f2fd; color: #1976d2; }
  
  .empty { text-align: center; padding: 2rem; color: #95a5a6; }
  button { padding: 0.75rem 1.5rem; background: #667eea; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
  button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102,126,234,0.4); }
  form { margin-top: 1.5rem; }
  input, textarea { width: 100%; padding: 0.75rem; margin: 0.5rem 0; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1rem; box-sizing: border-box; }
  input:focus, textarea:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
  .error { background: #fadbd8; color: #c0392b; padding: 1rem; border-radius: 8px; margin: 0.5rem 0; }
  .actions { display: flex; gap: 1rem; margin-top: 1rem; }
  .actions button { flex: 1; }
  .actions button:last-child { background: #95a5a6; }
  .nav { display: flex; justify-content: space-between; margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #ecf0f1; }
  .nav a { padding: 0.8rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; background: #95a5a6; color: white; transition: all 0.3s; }
  .nav a:last-child { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .nav a:hover { transform: translateY(-2px); }
  .locked { background: white; border-radius: 20px; padding: 4rem 2rem; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  .lock { font-size: 5rem; margin-bottom: 1rem; animation: lockShake 3s ease-in-out infinite; }
  @keyframes lockShake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
  .locked h1 { color: #2c3e50; margin-bottom: 1rem; }
  .locked a { display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: #95a5a6; color: white; text-decoration: none; border-radius: 8px; }
  
  /* Content Type Styles */
  .content-image { 
    width: 100%; 
    max-width: 600px; 
    border-radius: 16px; 
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    margin: 1rem 0;
  }
  
  .recipe { 
    background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ffa726;
    margin: 1rem 0;
  }
  .recipe h3 { color: #e65100; margin-top: 0; }
  
  .memory { 
    background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #29b6f6;
    margin: 1rem 0;
    font-style: italic;
  }
  .memory h3 { color: #01579b; margin-top: 0; }
  
  .poll { 
    background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ab47bc;
    margin: 1rem 0;
  }
  .poll h3 { color: #6a1b9a; margin-top: 0; }
  
  .bucket-list { 
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #66bb6a;
    margin: 1rem 0;
  }
  .bucket-list h3 { color: #2e7d32; margin-top: 0; }
  
  .photo-challenge { 
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ec407a;
    margin: 1rem 0;
  }
  .photo-challenge h3 { color: #ad1457; margin-top: 0; }
  
  .love-letter { 
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); 
    padding: 2rem; 
    border-radius: 12px; 
    border: 3px solid #ef5350;
    margin: 1rem 0;
    font-family: 'Courier New', monospace;
    box-shadow: 0 8px 24px rgba(239, 83, 80, 0.2);
  }
  .love-letter h3 { color: #c62828; margin-top: 0; text-align: center; }
  
  .riddle { 
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ff9800;
    margin: 1rem 0;
  }
  .riddle h3 { color: #e65100; margin-top: 0; }
  
  .interactive-choice { 
    background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #5c6bc0;
    margin: 1rem 0;
  }
  .interactive-choice h3 { color: #283593; margin-top: 0; }
  .choice-btn {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
    padding: 1rem;
    background: white;
    color: #283593;
    border: 2px solid #5c6bc0;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  .choice-btn:hover {
    background: #5c6bc0;
    color: white;
    transform: translateX(10px);
  }
  
  .shared-goal { 
    background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #fdd835;
    margin: 1rem 0;
  }
  .shared-goal h3 { color: #f57f17; margin-top: 0; }
  
  .gratitude { 
    background: linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #9ccc65;
    margin: 1rem 0;
  }
  .gratitude h3 { color: #558b2f; margin-top: 0; }
  
  .countdown { 
    background: linear-gradient(135deg, #fbe9e7 0%, #ffccbc 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ff7043;
    margin: 1rem 0;
    text-align: center;
  }
  .countdown h3 { color: #d84315; margin-top: 0; font-size: 2rem; }
  
  .dream-board { 
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #26a69a;
    margin: 1rem 0;
  }
  .dream-board h3 { color: #00695c; margin-top: 0; }
  
  .time-capsule { 
    background: linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #8d6e63;
    margin: 1rem 0;
  }
  .time-capsule h3 { color: #4e342e; margin-top: 0; }
  
  .spotify-song { 
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #1db954;
    margin: 1rem 0;
  }
  .spotify-song h3 { color: #1db954; margin-top: 0; }
  
  .drawing { 
    background: linear-gradient(135deg, #fafafa 0%, #eeeeee 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #757575;
    margin: 1rem 0;
  }
  .drawing h3 { color: #424242; margin-top: 0; }
  
  /* New Content Types */
  .virtual-date { 
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #2196f3;
    margin: 1rem 0;
  }
  .virtual-date h3 { color: #0d47a1; margin-top: 0; }
  
  .movie-night { 
    background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #9c27b0;
    margin: 1rem 0;
  }
  .movie-night h3 { color: #4a148c; margin-top: 0; }
  
  .game-challenge { 
    background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #673ab7;
    margin: 1rem 0;
  }
  .game-challenge h3 { color: #311b92; margin-top: 0; }
  
  .cooking-together { 
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ff9800;
    margin: 1rem 0;
  }
  .cooking-together h3 { color: #e65100; margin-top: 0; }
  
  .playlist-collab { 
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #1db954;
    margin: 1rem 0;
  }
  .playlist-collab h3 { color: #1db954; margin-top: 0; }
  
  .would-you-rather { 
    background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #fbc02d;
    margin: 1rem 0;
  }
  .would-you-rather h3 { color: #f57f17; margin-top: 0; }
  
  .this-or-that { 
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ec407a;
    margin: 1rem 0;
  }
  .this-or-that h3 { color: #ad1457; margin-top: 0; }
  
  .truth-or-dare { 
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ef5350;
    margin: 1rem 0;
  }
  .truth-or-dare h3 { color: #c62828; margin-top: 0; }
  
  .appreciation { 
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); 
    padding: 2rem; 
    border-radius: 12px; 
    border: 3px solid #ff4d94;
    margin: 1rem 0;
    box-shadow: 0 8px 24px rgba(255, 77, 148, 0.2);
  }
  .appreciation h3 { color: #c2185b; margin-top: 0; text-align: center; }
  
  .life-goals { 
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #26a69a;
    margin: 1rem 0;
  }
  .life-goals h3 { color: #004d40; margin-top: 0; }
  
  .first-impression { 
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ec407a;
    margin: 1rem 0;
  }
  .first-impression h3 { color: #ad1457; margin-top: 0; }
  
  .inside-joke { 
    background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #fdd835;
    margin: 1rem 0;
  }
  .inside-joke h3 { color: #f57f17; margin-top: 0; }
  
  .childhood-story { 
    background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #29b6f6;
    margin: 1rem 0;
  }
  .childhood-story h3 { color: #01579b; margin-top: 0; }
  
  .letter-to-future { 
    background: linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #8d6e63;
    margin: 1rem 0;
    font-family: 'Courier New', monospace;
  }
  .letter-to-future h3 { color: #4e342e; margin-top: 0; }
  
  .art-challenge { 
    background: linear-gradient(135deg, #fafafa 0%, #eeeeee 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #9c27b0;
    margin: 1rem 0;
  }
  .art-challenge h3 { color: #6a1b9a; margin-top: 0; }
  
  .sunrise-sunset { 
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ff9800;
    margin: 1rem 0;
  }
  .sunrise-sunset h3 { color: #e65100; margin-top: 0; }
  
  .voice-message { 
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #66bb6a;
    margin: 1rem 0;
  }
  .voice-message h3 { color: #2e7d32; margin-top: 0; }
  
  .screenshot-tour { 
    background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #29b6f6;
    margin: 1rem 0;
  }
  .screenshot-tour h3 { color: #01579b; margin-top: 0; }
  
  .meme-collection { 
    background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #fdd835;
    margin: 1rem 0;
  }
  .meme-collection h3 { color: #f57f17; margin-top: 0; }
  
  .workout-challenge { 
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ef5350;
    margin: 1rem 0;
  }
  .workout-challenge h3 { color: #c62828; margin-top: 0; }
  
  .podcast-share { 
    background: linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #5c6bc0;
    margin: 1rem 0;
  }
  .podcast-share h3 { color: #283593; margin-top: 0; }
  
  .adventure-plan { 
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #26a69a;
    margin: 1rem 0;
  }
  .adventure-plan h3 { color: #004d40; margin-top: 0; }
  
  .wish-list { 
    background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ab47bc;
    margin: 1rem 0;
  }
  .wish-list h3 { color: #6a1b9a; margin-top: 0; }
  
  .embarrassing-moment { 
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ec407a;
    margin: 1rem 0;
  }
  .embarrassing-moment h3 { color: #ad1457; margin-top: 0; }
  
  .favorite-things { 
    background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ef5350;
    margin: 1rem 0;
  }
  .favorite-things h3 { color: #c62828; margin-top: 0; }
  
  .pet-photos { 
    background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ffa726;
    margin: 1rem 0;
  }
  .pet-photos h3 { color: #e65100; margin-top: 0; }
  
  .book-recommendation { 
    background: linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #8d6e63;
    margin: 1rem 0;
  }
  .book-recommendation h3 { color: #4e342e; margin-top: 0; }
  
  .two-truths-one-lie { 
    background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #0288d1;
    margin: 1rem 0;
  }
  .two-truths-one-lie h3 { color: #01579b; margin-top: 0; }
  
  .couple-challenge { 
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #e91e63;
    margin: 1rem 0;
  }
  .couple-challenge h3 { color: #880e4f; margin-top: 0; }
  
  .story-together { 
    background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #9c27b0;
    margin: 1rem 0;
  }
  .story-together h3 { color: #4a148c; margin-top: 0; }
  
  .bingo-challenge { 
    background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #fbc02d;
    margin: 1rem 0;
  }
  .bingo-challenge h3 { color: #f57f17; margin-top: 0; }
  
  .debate-fun { 
    background: linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ff9800;
    margin: 1rem 0;
  }
  .debate-fun h3 { color: #e65100; margin-top: 0; }
  
  .roleplay-scenario { 
    background: linear-gradient(135deg, #d1c4e9 0%, #b39ddb 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #673ab7;
    margin: 1rem 0;
  }
  .roleplay-scenario h3 { color: #311b92; margin-top: 0; }
  
  .compliment-battle { 
    background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #f44336;
    margin: 1rem 0;
  }
  .compliment-battle h3 { color: #b71c1c; margin-top: 0; }
  
  .prediction-game { 
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #009688;
    margin: 1rem 0;
  }
  .prediction-game h3 { color: #004d40; margin-top: 0; }
  
  .scavenger-hunt { 
    background: linear-gradient(135deg, #dcedc8 0%, #c5e1a5 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #8bc34a;
    margin: 1rem 0;
  }
  .scavenger-hunt h3 { color: #33691e; margin-top: 0; }
  
  .parallel-challenge { 
    background: linear-gradient(135deg, #ffecb3 0%, #ffe082 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #ffc107;
    margin: 1rem 0;
  }
  .parallel-challenge h3 { color: #ff6f00; margin-top: 0; }
  
  .question-exchange { 
    background: linear-gradient(135deg, #c5cae9 0%, #9fa8da 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #3f51b5;
    margin: 1rem 0;
  }
  .question-exchange h3 { color: #1a237e; margin-top: 0; }
  
  .gratitude-exchange { 
    background: linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #e91e63;
    margin: 1rem 0;
  }
  .gratitude-exchange h3 { color: #880e4f; margin-top: 0; }
  
  .collaborative-playlist { 
    background: linear-gradient(135deg, #b2ebf2 0%, #80deea 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #00bcd4;
    margin: 1rem 0;
  }
  .collaborative-playlist h3 { color: #006064; margin-top: 0; }
  
  .dream-date-planning { 
    background: linear-gradient(135deg, #f0f4c3 0%, #e6ee9c 100%); 
    padding: 1.5rem; 
    border-radius: 12px; 
    border-left: 4px solid #cddc39;
    margin: 1rem 0;
  }
  .dream-date-planning h3 { color: #827717; margin-top: 0; }
  
  @media (max-width: 768px) {
    article { padding: 2rem 1.5rem; }
    h1 { font-size: 1.8rem; }
    .nav { flex-direction: column; gap: 1rem; }
    .nav a { text-align: center; }
  }
</style>
