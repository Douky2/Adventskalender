<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { getContentComponent } from '$lib/components/content-types';
  import type { ActionData, PageData } from './$types';
  
  export let data: PageData;
  export let form: ActionData | null = null;
  
  let showResponseForm = false;
  
  // Get the appropriate component for each content type
  $: componentA = getContentComponent(data.content?.contentTypeA ?? 'TEXT');
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
  {:else if data.content}
    {@const content = data.content}
    <article in:fade={{ duration: 400 }}>
      <header in:fly={{ y: -30, duration: 500, easing: cubicOut }}>
        <div class="badge-day">Tag {data.dayNumber}</div>
        <h1>{content.title}</h1>
        
        {#if content.linkedToPrevious || content.linkedToNext || content.storyChainId}
          <div class="story-chain-badge">
            {#if content.linkedToPrevious}📖{/if}
            {#if content.storyChainId}
              🔗 Story: {content.storyChainId}
            {/if}
            {#if content.linkedToNext}⏭️{/if}
          </div>
        {/if}
      </header>
      
      <!-- Story Chain Navigation -->
      {#if data.storyChainDays?.length > 1}
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
        <span class="badge">{content.authorA ?? 'Locdoc'} 🧡</span>
        <svelte:component 
          this={componentA} 
          content={content.contentA} 
          author={content.authorA}
          contentType={content.contentTypeA}
        />
        
        {#if content.taskForB && content.responseMode !== 'DISABLED'}
          <div class="task" in:fade={{ duration: 600, delay: 400 }}>
            <h3>📋 Aufgabe für {content.authorB ?? 'Miss Chaos'}:</h3>
            <p>{content.taskForB}</p>
            {#if content.responseMode === 'COLLABORATIVE'}
              <span class="mode-badge collaborative">🤝 Zusammenarbeit</span>
            {:else if content.responseMode === 'OPEN'}
              <span class="mode-badge open">💬 Offen</span>
            {/if}
          </div>
        {/if}
      </div>
      
      <!-- Person B (Miss Chaos) -->
      {#if content.responseMode !== 'DISABLED'}
        <div class="box box-b" in:fly={{ x: 50, duration: 600, delay: 400, easing: cubicOut }}>
          <span class="badge">{content.authorB ?? 'Miss Chaos'} 💖</span>
          {#if content.contentB}
            {#each content.contentB.split('\n') as p}
              {#if p.trim()}<p>{p}</p>{/if}
            {/each}
          {:else if content.responseMode === 'OPEN' || content.responseMode === 'COLLABORATIVE'}
            <div class="empty">
              <p>💭 Noch keine Antwort von {content.authorB ?? 'Miss Chaos'}...</p>
              {#if !showResponseForm}
                <button on:click={() => showResponseForm = true}>
                  ✍️ Deine Nachricht hinzufügen
                </button>
              {/if}
            </div>
            
            {#if showResponseForm}
              <form method="POST" action="?/addResponse" use:enhance in:fade={{ duration: 400 }}>
                <input name="author" value={content.authorB ?? 'Miss Chaos'} type="hidden" />
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
      {#if content.resultGenerated && content.combinedResult}
        <div class="box box-combined" in:fly={{ y: 50, duration: 600, delay: 600, easing: cubicOut }}>
          <span class="badge">✨ Gemeinsames Ergebnis 🎨</span>
          {#each content.combinedResult.split('\n') as p}
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
  {:else}
    <div class="locked" in:fade={{ duration: 300 }}>
      <div class="lock" in:fly={{ y: -50, duration: 600, delay: 200, easing: cubicOut }}>❔</div>
      <h1 in:fade={{ duration: 600, delay: 400 }}>Kein Inhalt gefunden</h1>
      <p in:fade={{ duration: 600, delay: 600 }}>Bitte versuche es später erneut.</p>
      <a href="/" in:fade={{ duration: 600, delay: 800 }}>← Zurück</a>
    </div>
  {/if}
</div>

<style>
  /* Body styles are inherited from +layout.svelte (Dark Theme) */

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }
  
  article { 
    background: #fff; 
    border-radius: 2px; 
    padding: 3.5rem 2.5rem; 
    box-shadow: 
      0 1px 4px rgba(0,0,0,0.05),
      0 5px 15px rgba(0,0,0,0.1);
    border: 1px solid #e0e0e0;
    position: relative;
    color: #2c1810; /* Ensure text is dark on white paper */
  }
  
  /* Paper stack effect */
  article::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: -5px;
    bottom: -5px;
    background: #fff;
    z-index: -1;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transform: rotate(1deg);
  }

  header { 
    text-align: center; 
    margin-bottom: 3.5rem; 
    padding-bottom: 2.5rem; 
    border-bottom: 2px dashed #d4af37; /* Dashed line separator */
  }
  
  .badge-day { 
    background: #2c1810; 
    color: #d4af37; 
    padding: 0.5rem 1.5rem; 
    border-radius: 2px; 
    display: inline-block; 
    margin-bottom: 1.5rem; 
    font-weight: 800;
    font-size: 1.1rem;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.2);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  h1 { 
    font-size: 2.8rem; 
    color: #8b0000;
    margin: 0;
    font-weight: 800;
    letter-spacing: 1px;
    font-family: 'Georgia', serif;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.1);
  }
  
  .story-chain-badge { 
    margin-top: 1.2rem; 
    padding: 0.6rem 1.5rem; 
    background: #e8f5e9; 
    border-radius: 4px; 
    display: inline-block; 
    color: #2e7d32; 
    font-weight: 700;
    border: 1px dashed #2e7d32;
  }

  .story-chain-nav { 
    background: #fff8e1; 
    padding: 2rem; 
    border-radius: 4px; 
    margin-bottom: 2.5rem; 
    border: 1px solid #ffb74d;
    box-shadow: 3px 3px 0px rgba(255, 183, 77, 0.3);
    position: relative;
  }
  
  /* Tape effect */
  .story-chain-nav::before {
    content: '';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 30px;
    background: rgba(255, 255, 255, 0.4);
    border-left: 1px solid rgba(0,0,0,0.05);
    border-right: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .story-chain-nav h4 { 
    margin: 0 0 1.2rem 0; 
    color: #e65100;
    font-size: 1.3rem;
    font-weight: 700;
  }
  .chain-days { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .chain-day { padding: 0.5rem 1rem; background: #fff; border: 1px solid #ddd; border-radius: 2px; text-decoration: none; color: #5d4037; font-weight: 600; transition: all 0.3s; }
  .chain-day:hover { transform: translateY(-2px); box-shadow: 2px 2px 0px rgba(0,0,0,0.1); }
  .chain-day.current { background: #2c1810; color: #d4af37; border-color: #2c1810; }
  .chain-day.completed { background: #e8f5e9; border-color: #2e7d32; color: #2e7d32; }
  
  .box { 
    margin: 2rem 0; 
    padding: 2.5rem; 
    border-radius: 2px; 
    border: 1px solid; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    position: relative;
    background: #fff;
  }
  
  /* Paper texture for boxes */
  .box::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }
  
  .box:hover {
    transform: translateY(-2px) rotate(0.5deg);
    box-shadow: 3px 3px 15px rgba(0,0,0,0.1);
  }
  
  /* Locdoc - Orange Note */
  .box-a { 
    background: #fff3e0; 
    border-color: #ffb74d;
    color: #3e2723;
    transform: rotate(-1deg);
  }
  
  /* Miss Chaos - Pink Note */
  .box-b { 
    background: #fce4ec; 
    border-color: #f06292;
    color: #3e2723;
    transform: rotate(1deg);
  }
  
  /* Gemeinsames Ergebnis - Gold Note */
  .box-combined { 
    background: #fff8e1; 
    border-color: #ffd54f; 
    border-width: 1px; 
    color: #3e2723;
    box-shadow: 0 4px 20px rgba(255, 213, 79, 0.2);
  }
  
  /* Badges */
  .badge { 
    display: inline-block; 
    padding: 0.4rem 1.2rem; 
    border-radius: 2px; 
    font-weight: 700; 
    font-size: 1rem; 
    margin-bottom: 1.2rem; 
    color: white;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    position: relative;
    z-index: 1;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .box-a .badge { 
    background: #ef6c00;
  }
  
  .box-b .badge { 
    background: #d81b60;
  }
  
  .box-combined .badge {
    background: #fbc02d;
    color: #3e2723;
  }
  
  p { line-height: 1.8; margin: 1rem 0; color: #3e2723; position: relative; z-index: 1; }
  
  .task { 
    margin-top: 1.5rem; 
    padding: 1.5rem; 
    background: #fff; 
    border: 2px dashed #d4af37; 
    border-radius: 4px; 
    position: relative;
    z-index: 1;
  }
  
  .task h3 { margin: 0 0 0.5rem 0; color: #d4af37; }
  .task p { margin: 0 0 0.5rem 0; color: #5d4037; }
  
  .mode-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-top: 0.5rem; }
  .mode-badge.collaborative { background: #e8f5e9; color: #2e7d32; border: 1px solid #2e7d32; }
  .mode-badge.open { background: #e3f2fd; color: #1565c0; border: 1px solid #1565c0; }
  
  .empty { text-align: center; padding: 2rem; color: #90a4ae; font-style: italic; }
  
  button { 
    padding: 0.75rem 1.5rem; 
    background: #2c1810; 
    color: #d4af37; 
    border: none; 
    border-radius: 2px; 
    font-size: 1rem; 
    font-weight: 700; 
    cursor: pointer; 
    transition: all 0.3s; 
    font-family: 'Georgia', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  button:hover { transform: translateY(-2px); box-shadow: 3px 3px 0px rgba(0,0,0,0.2); }
  
  form { margin-top: 1.5rem; position: relative; z-index: 1; }
  
  input, textarea { 
    width: 100%; 
    padding: 0.75rem; 
    margin: 0.5rem 0; 
    border: 1px solid #bdbdbd; 
    border-radius: 2px; 
    font-family: inherit; 
    font-size: 1rem; 
    box-sizing: border-box; 
    background: #fafafa; 
    color: #3e2723; 
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.05);
  }
  
  input:focus, textarea:focus { outline: none; border-color: #d4af37; background: #fff; }
  
  .error { background: #ffebee; color: #c62828; padding: 1rem; border-radius: 2px; margin: 0.5rem 0; border: 1px solid #ef9a9a; }
  
  .actions { display: flex; gap: 1rem; margin-top: 1rem; }
  .actions button { flex: 1; }
  .actions button:last-child { background: #78909c; color: white; }
  
  .nav { display: flex; justify-content: space-between; margin-top: 2rem; padding-top: 2rem; border-top: 2px dashed #e0e0e0; }
  .nav a { padding: 0.8rem 2rem; border-radius: 2px; text-decoration: none; font-weight: 600; background: #f5f5f5; color: #5d4037; transition: all 0.3s; border: 1px solid #e0e0e0; }
  .nav a:last-child { background: #2c1810; color: #d4af37; border: none; }
  .nav a:hover { transform: translateY(-2px); box-shadow: 2px 2px 0px rgba(0,0,0,0.1); }
  
  .locked { 
    background: #fff; 
    border-radius: 2px; 
    padding: 4rem 2rem; 
    text-align: center; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid #e0e0e0;
    position: relative;
    color: #2c1810;
  }
  
  /* Envelope flap effect for locked state */
  .locked::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-top: 70px solid #f5f5f5;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.05));
  }

  .lock { font-size: 5rem; margin-bottom: 1rem; animation: lockShake 3s ease-in-out infinite; color: #5d4037; }
  @keyframes lockShake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
  .locked h1 { color: #8b0000; margin-bottom: 1rem; }
  .locked p { color: #5d4037; font-size: 1.2rem; }
  .locked a { display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: #2c1810; color: #d4af37; text-decoration: none; border-radius: 2px; transition: all 0.3s; }
  .locked a:hover { transform: translateY(-2px); box-shadow: 3px 3px 0px rgba(0,0,0,0.2); }
</style>
