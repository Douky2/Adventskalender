<script lang="ts">
  import { enhance } from '$app/forms';
  
  export let data;
  export let form;
  
  let showResponseForm = false;
</script>

<svelte:head>
  <title>{data.isLocked ? `Tür ${data.dayNumber} - Verschlossen` : data.content.title}</title>
</svelte:head>

<div class="container">
  {#if data.isLocked}
    <div class="locked">
      <div class="lock">🔒</div>
      <h1>Tür {data.dayNumber} ist noch verschlossen!</h1>
      <p>Komm am {data.unlockDate} wieder ✨</p>
      <a href="/">← Zurück</a>
    </div>
  {:else}
    <article>
      <header>
        <div class="badge-day">Tag {data.dayNumber}</div>
        <h1>{data.content.title}</h1>
      </header>
      
      <!-- Person A -->
      <div class="box box-a">
        <span class="badge">{data.content.authorA || 'Person A'} 💝</span>
        {#if data.content.contentTypeA === 'TEXT'}
          {#each data.content.contentA.split('\n') as p}
            {#if p.trim()}<p>{p}</p>{/if}
          {/each}
        {/if}
        {#if data.content.taskForB}
          <div class="task">
            <h3>📋 Aufgabe:</h3>
            <p>{data.content.taskForB}</p>
          </div>
        {/if}
      </div>
      
      <!-- Person B -->
      <div class="box box-b">
        <span class="badge">{data.content.authorB || 'Deine Antwort'} 💖</span>
        {#if data.content.contentB}
          {#each data.content.contentB.split('\n') as p}
            {#if p.trim()}<p>{p}</p>{/if}
          {/each}
        {:else}
          <div class="empty">
            <p>💭 Noch keine Antwort...</p>
            {#if !showResponseForm}
              <button on:click={() => showResponseForm = true}>
                ✍️ Deine Nachricht hinzufügen
              </button>
            {/if}
          </div>
          
          {#if showResponseForm}
            <form method="POST" action="?/addResponse" use:enhance>
              <input name="author" placeholder="Dein Name (optional)" />
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }
  .container { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }
  article { background: white; border-radius: 20px; padding: 3rem 2rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  header { text-align: center; margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 2px solid #ecf0f1; }
  .badge-day { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.5rem 1.5rem; border-radius: 50px; display: inline-block; margin-bottom: 1rem; font-weight: 600; }
  h1 { font-size: 2.5rem; color: #2c3e50; margin: 0; }
  .box { margin: 2rem 0; padding: 2rem; border-radius: 16px; border: 2px solid; }
  .box-a { background: linear-gradient(to right, #fff5f7, #fff); border-color: #ff6b9d; }
  .box-b { background: linear-gradient(to right, #f0f4ff, #fff); border-color: #667eea; }
  .badge { display: inline-block; padding: 0.5rem 1.5rem; border-radius: 50px; font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem; background: #667eea; color: white; }
  .box-a .badge { background: #ff6b9d; }
  p { line-height: 1.8; margin: 1rem 0; color: #2c3e50; }
  .task { margin-top: 1.5rem; padding: 1.5rem; background: #fff9e6; border: 2px solid #ffd700; border-radius: 12px; }
  .task h3 { margin: 0 0 0.5rem 0; color: #d4af37; }
  .task p { margin: 0; }
  .empty { text-align: center; padding: 2rem; color: #95a5a6; }
  button { padding: 0.75rem 1.5rem; background: #667eea; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
  button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102,126,234,0.4); }
  form { margin-top: 1.5rem; }
  input, textarea { width: 100%; padding: 0.75rem; margin: 0.5rem 0; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 1rem; box-sizing: border-box; }
  input:focus, textarea:focus { outline: none; border-color: #667eea; }
  .error { background: #fadbd8; color: #c0392b; padding: 1rem; border-radius: 8px; margin: 0.5rem 0; }
  .actions { display: flex; gap: 1rem; margin-top: 1rem; }
  .actions button { flex: 1; }
  .actions button:last-child { background: #95a5a6; }
  .nav { display: flex; justify-content: space-between; margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #ecf0f1; }
  .nav a { padding: 0.8rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; background: #95a5a6; color: white; transition: all 0.3s; }
  .nav a:last-child { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .nav a:hover { transform: translateY(-2px); }
  .locked { background: white; border-radius: 20px; padding: 4rem 2rem; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  .lock { font-size: 5rem; margin-bottom: 1rem; }
  .locked h1 { color: #2c3e50; margin-bottom: 1rem; }
  .locked a { display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: #95a5a6; color: white; text-decoration: none; border-radius: 8px; }
  @media (max-width: 768px) {
    article { padding: 2rem 1.5rem; }
    h1 { font-size: 1.8rem; }
    .nav { flex-direction: column; gap: 1rem; }
    .nav a { text-align: center; }
  }
</style>
