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
      
      <!-- Person A (Locdoc) - Dynamic Component Rendering -->
      <div class="box box-a" in:fly={{ x: -50, duration: 600, delay: 200, easing: cubicOut }}>
        <svelte:component 
          this={componentA} 
          content={data.content.contentA} 
          author={data.content.authorA}
          contentType={data.content.contentTypeA}
        />
        
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
  /* LEGACY: All content-type CSS classes removed - now handled by individual components */
  /* After Phase 2 refactoring, all content-type styling moved to individual component files */

  @media (max-width: 768px) {
    article { padding: 2rem 1.5rem; }
    h1 { font-size: 1.8rem; }
    .nav { flex-direction: column; gap: 1rem; }
    .nav a { text-align: center; }
  }
</style>
