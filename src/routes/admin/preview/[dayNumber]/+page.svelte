<script lang="ts">
  import { getContentComponent } from '$lib/components/content-types';
  import type { PageData } from './$types';

  export let data: PageData;

  const day = data.day;
  $: componentA = getContentComponent(day.contentTypeA ?? 'TEXT');
</script>

<svelte:head>
  <title>Admin Vorschau – Tag {day.dayNumber}</title>
</svelte:head>

<main class="preview-page">
  <header class="preview-header">
    <div class="title-area">
      <span class="day-badge">Tag {day.dayNumber}</span>
      <h1>{day.title}</h1>
      {#if day.storyChainId || day.linkedToPrevious || day.linkedToNext}
        <p class="chain-meta">
          {#if day.storyChainId}🔗 Story-ID: {day.storyChainId}{/if}
          {#if day.linkedToPrevious} · 📖 Fortsetzung vom Vortag{/if}
          {#if day.linkedToNext} · ⏭️ Führt am nächsten Tag weiter{/if}
        </p>
      {/if}
    </div>
    <div class="header-actions">
      <a class="btn-secondary" href="/admin" rel="external">← Zurück</a>
      <a
        class="btn-primary"
        href={`/day/${day.dayNumber}?simulation=true`}
        target="_blank"
        rel="noreferrer"
      >
        🔓 Simulation öffnen
      </a>
    </div>
  </header>

  <section class="info-banner">
    <strong>Immer entsperrt:</strong>
    <span>Diese Seite zeigt den Inhalt wie Miss Chaos ihn im offenen Zustand sieht.</span>
  </section>

  <section class="content-box box-a">
    <header>
      <span class="author">{day.authorA} 🧡</span>
      <span class="content-type">{day.contentTypeA}</span>
    </header>
    <svelte:component
      this={componentA}
      content={day.contentA}
      author={day.authorA}
      contentType={day.contentTypeA}
    />

    {#if day.taskForB && day.responseMode !== 'DISABLED'}
      <div class="task-box">
        <h3>📋 Aufgabe für {day.authorB}:</h3>
        <p>{day.taskForB}</p>
        <span class="mode-pill" data-mode={day.responseMode}>
          {#if day.responseMode === 'COLLABORATIVE'}🤝 Zusammenarbeit{:else if day.responseMode === 'OPEN'}💬 Offen{:else if day.responseMode === 'AFTER_A'}1️⃣ ➜ 2️⃣{:else if day.responseMode === 'AFTER_B'}2️⃣ ➜ 1️⃣{:else}🔒 Antworten deaktiviert{/if}
        </span>
      </div>
    {/if}
  </section>

  {#if day.responseMode !== 'DISABLED'}
    <section class="content-box box-b">
      <header>
        <span class="author">{day.authorB} 💖</span>
        <span class="content-type">Antwort</span>
      </header>

      {#if day.contentB}
        <div class="response-content">
          {#each day.contentB.split('\n') as paragraph}
            {#if paragraph.trim()}<p>{paragraph}</p>{/if}
          {/each}
        </div>
      {:else}
        <div class="empty-response">
          <p>💭 Noch keine Antwort gespeichert.</p>
        </div>
      {/if}
    </section>
  {/if}

  {#if day.resultGenerated && day.combinedResult}
    <section class="content-box box-result">
      <header>
        <span class="author">✨ Gemeinsames Ergebnis</span>
      </header>
      {#each day.combinedResult.split('\n') as paragraph}
        {#if paragraph.trim()}<p>{paragraph}</p>{/if}
      {/each}
    </section>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f5f7fa;
  }

  .preview-page {
    max-width: 960px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.5rem;
    background: white;
    padding: 1.75rem;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  }

  .title-area h1 {
    margin: 0.5rem 0 0;
    color: #2c3e50;
    font-size: 2rem;
  }

  .day-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: #eef2ff;
    color: #4c1d95;
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .chain-meta {
    margin: 0.75rem 0 0;
    color: #7f8c8d;
    font-weight: 500;
  }

  .header-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.4rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
  }

  .btn-secondary {
    background: #ecf0f1;
    color: #2c3e50;
    border: none;
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .info-banner {
    background: #eef2ff;
    border: 1px solid rgba(102, 126, 234, 0.35);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: #4c1d95;
    font-weight: 500;
  }

  .content-box {
    background: white;
    border-radius: 18px;
    padding: 2rem;
    box-shadow: 0 12px 28px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border: 1px solid rgba(0,0,0,0.05);
  }

  .content-box header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .author {
    font-weight: 700;
    font-size: 1.1rem;
    color: #2c3e50;
  }

  .content-type {
    font-size: 0.85rem;
    font-weight: 600;
    color: #7f8c8d;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background: #f0f2f5;
  }

  .box-a {
    border-left: 6px solid #ff9800;
  }

  .box-b {
    border-left: 6px solid #ff4d94;
  }

  .box-result {
    border-left: 6px solid #ffd700;
  }

  .task-box {
    border: 1px solid rgba(255, 152, 0, 0.35);
    background: #fff6e9;
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .task-box p {
    margin: 0;
    color: #784212;
    line-height: 1.6;
  }

  .mode-pill {
    align-self: flex-start;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.85rem;
    background: #ecf0f1;
    color: #2c3e50;
  }

  .mode-pill[data-mode='COLLABORATIVE'] {
    background: #e8f5e9;
    color: #1b9448;
  }

  .mode-pill[data-mode='OPEN'] {
    background: #e3f2fd;
    color: #1976d2;
  }

  .mode-pill[data-mode='AFTER_A'],
  .mode-pill[data-mode='AFTER_B'] {
    background: #fef5e7;
    color: #af601a;
  }

  .response-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    line-height: 1.7;
    color: #2c3e50;
  }

  .empty-response {
    border: 2px dashed #ff4d94;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    color: #bd4b72;
    font-weight: 600;
  }

  @media (max-width: 720px) {
    .preview-header {
      flex-direction: column;
    }

    .header-actions {
      width: 100%;
    }

    .content-box {
      padding: 1.5rem;
    }
  }
</style>
