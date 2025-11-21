<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  
  export let data: PageData;
  export let form: ActionData;
  
  let activeTab = 'grunddaten';
  let selectedTemplate = '';

  // Content Types Definition (copied from admin/+page.svelte)
  const contentTypes = [
    { value: 'TEXT', label: '📝 Text / Brief', category: 'Basis' },
    { value: 'IMAGE', label: '🖼️ Bild', category: 'Basis' },
    { value: 'VIDEO', label: '🎥 Video', category: 'Basis' },
    { value: 'AUDIO', label: '🎵 Audio / Sprachnachricht', category: 'Basis' },
    { value: 'LINK', label: '🔗 Link', category: 'Basis' },
    
    // Romantisch
    { value: 'LOVE_LETTER', label: '💌 Liebesbrief', category: 'Romantisch' },
    { value: 'POEM', label: '🌹 Gedicht', category: 'Romantisch' },
    { value: 'MEMORY', label: '💭 Gemeinsame Erinnerung', category: 'Romantisch' },
    { value: 'REASON_WHY', label: '❤️ Grund warum ich dich liebe', category: 'Romantisch' },
    { value: 'APPRECIATION', label: '🌟 Wertschätzung', category: 'Romantisch' },
    
    // Virtual Activities
    { value: 'VIRTUAL_DATE', label: '💑 Virtuelles Date', category: 'Virtual' },
    { value: 'MOVIE_NIGHT', label: '🎬 Filmabend-Einladung', category: 'Virtual' },
    { value: 'COOKING_TOGETHER', label: '👨‍🍳 Zusammen Kochen', category: 'Virtual' },
    { value: 'GAME_NIGHT', label: '🎮 Spieleabend', category: 'Virtual' },
    { value: 'COFFEE_DATE', label: '☕ Kaffee-Date', category: 'Virtual' },
    
    // Musik & Audio
    { value: 'SPOTIFY_SONG', label: '🎵 Song des Tages', category: 'Musik' },
    { value: 'PLAYLIST', label: '🎶 Playlist', category: 'Musik' },
    { value: 'PLAYLIST_COLLAB', label: '🎧 Gemeinsame Playlist', category: 'Musik' },
    { value: 'VOICE_MESSAGE', label: '🎤 Sprachnachricht', category: 'Musik' },
    
    // Interaktive Spiele
    { value: 'QUIZ_JSON', label: '❓ Quiz', category: 'Spiele' },
    { value: 'POLL_JSON', label: '📊 Umfrage', category: 'Spiele' },
    { value: 'PUZZLE', label: '🧩 Puzzle', category: 'Spiele' },
    { value: 'CROSSWORD', label: '📝 Kreuzworträtsel', category: 'Spiele' },
    { value: 'SCAVENGER_HUNT', label: '🔍 Schnitzeljagd', category: 'Spiele' },
    { value: 'TRUTH_OR_DARE', label: '🎲 Wahrheit oder Pflicht', category: 'Spiele' },
    { value: 'WOULD_YOU_RATHER', label: '🤔 Würdest du eher...', category: 'Spiele' },
    { value: 'THIS_OR_THAT', label: '⚖️ Dies oder Das', category: 'Spiele' },
    { value: 'TWO_TRUTHS_ONE_LIE', label: '🤥 2 Wahrheiten 1 Lüge', category: 'Spiele' },
    { value: 'BINGO_CHALLENGE', label: '🎯 Bingo', category: 'Spiele' },
    
    // Kreativ & Challenges
    { value: 'PHOTO_CHALLENGE', label: '📸 Foto-Challenge', category: 'Kreativ' },
    { value: 'ART_CHALLENGE', label: '🎨 Kunst-Challenge', category: 'Kreativ' },
    { value: 'STORY_TOGETHER', label: '📖 Geschichte weiterschreiben', category: 'Kreativ' },
    { value: 'ROLEPLAY_SCENARIO', label: '🎭 Roleplay-Szenario', category: 'Kreativ' },
    { value: 'COMPLIMENT_BATTLE', label: '💝 Kompliment-Battle', category: 'Kreativ' },
    { value: 'PARALLEL_CHALLENGE', label: '⏱️ Parallel-Challenge', category: 'Kreativ' },
    
    // Planung & Zukunft
    { value: 'BUCKET_LIST', label: '🎯 Bucket List Item', category: 'Zukunft' },
    { value: 'SHARED_GOAL', label: '🎯 Gemeinsames Ziel', category: 'Zukunft' },
    { value: 'DREAM_BOARD', label: '🌟 Traumboard', category: 'Zukunft' },
    { value: 'LIFE_GOALS', label: '🎯 Lebensziele', category: 'Zukunft' },
    { value: 'DREAM_DATE_PLANNING', label: '🌟 Traumdate planen', category: 'Zukunft' },
    
    // Persönlich & Geschichten
    { value: 'CHILDHOOD_STORY', label: '👶 Kindheitsgeschichte', category: 'Persönlich' },
    { value: 'FIRST_IMPRESSION', label: '💑 Erster Eindruck', category: 'Persönlich' },
    { value: 'INSIDE_JOKE', label: '🤫 Inside Joke', category: 'Persönlich' },
    { value: 'FAVORITE_THINGS', label: '❤️ Lieblingssachen', category: 'Persönlich' },
    
    // Spezial
    { value: 'COUNTDOWN', label: '⏰ Countdown', category: 'Spezial' },
    { value: 'TIME_CAPSULE', label: '⏳ Zeitkapsel', category: 'Spezial' },
    { value: 'LETTER_TO_FUTURE', label: '📝 Brief an die Zukunft', category: 'Spezial' },
    
    // Weitere
    { value: 'RECIPE', label: '🍳 Rezept', category: 'Weiteres' },
    { value: 'BOOK_RECOMMENDATION', label: '📚 Buch-Empfehlung', category: 'Weiteres' },
    { value: 'MAP', label: '🗺️ Karte / Orte', category: 'Weiteres' },
  ];

  // Simplified templates for brevity (user can use Template Builder for more)
  const templates: Record<string, string> = {
    'TEXT': 'Liebe Miss Chaos,\n\n...',
    'QUIZ_JSON': JSON.stringify({ questions: [{ question: "Frage?", options: ["A", "B"], correctAnswer: 0 }] }, null, 2)
  };

  function loadTemplate(type: string) {
    // In a real implementation, we would fetch the full template text
    // For now, we just set a placeholder if available
    if (templates[type]) {
      data.day.contentA = templates[type];
    }
  }

  function getQuizExample() {
    return JSON.stringify({
      questions: [
        {
          question: "Deine Frage hier?",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 0
        }
      ]
    }, null, 2);
  }
</script>

<svelte:head>
  <title>Bearbeite Tag {data.day.dayNumber} - Admin</title>
</svelte:head>

<div class="editor-container">
  <div class="editor-header">
    <div class="header-left">
      <a href="/admin" class="back-link">← Zurück zum Dashboard</a>
      <h1>Tag {data.day.dayNumber} bearbeiten</h1>
    </div>
    <div class="header-actions">
      <a href="/admin/preview/{data.day.dayNumber}" target="_blank" class="btn-preview">
        🚀 Live-Vorschau
      </a>
    </div>
  </div>

  {#if form?.success}
    <div class="alert alert-success">✅ {form.message}</div>
  {/if}
  {#if form?.error}
    <div class="alert alert-error">❌ {form.error}</div>
  {/if}

  <!-- Template Suggestions -->
  {#if data.tiles}
    {@const dayTemplates = data.tiles.filter(t => t.tags && t.tags.includes(`day-${data.day.dayNumber}`))}
    {#if dayTemplates.length > 0}
      <details class="templates-section">
        <summary>✨ Verfügbare Vorlagen für Tag {data.day.dayNumber}</summary>
        <div class="templates-grid">
          {#each dayTemplates as template}
            <button 
              type="button" 
              class="template-card"
              on:click={() => {
                if (!confirm('Möchtest du diese Vorlage übernehmen?')) return;
                data.day.title = template.title.replace(/ \(Var \d+\)/, '');
                data.day.contentTypeA = template.contentType;
                data.day.contentA = template.content;
                data.day.taskForB = template.taskForB || '';
                data.day.responseMode = template.responseMode || 'DISABLED';
              }}
            >
              <span class="template-category">{template.category}</span>
              <span class="template-title">{template.title}</span>
            </button>
          {/each}
        </div>
      </details>
    {/if}
  {/if}

  <div class="editor-card">
    <!-- Tabs -->
    <div class="editor-tabs">
      <button class="tab-btn" class:active={activeTab === 'grunddaten'} on:click={() => activeTab = 'grunddaten'}>📋 Grunddaten</button>
      <button class="tab-btn" class:active={activeTab === 'inhalt'} on:click={() => activeTab = 'inhalt'}>💝 Inhalt A</button>
      <button class="tab-btn" class:active={activeTab === 'antwort'} on:click={() => activeTab = 'antwort'}>✨ Antwort & Aufgabe</button>
      <button class="tab-btn" class:active={activeTab === 'chain'} on:click={() => activeTab = 'chain'}>🔗 Story-Verknüpfung</button>
      <button class="tab-btn" class:active={activeTab === 'ergebnis'} on:click={() => activeTab = 'ergebnis'}>🎨 Gemeinsames Ergebnis</button>
    </div>

    <form method="POST" action="?/update" use:enhance>
      
      <!-- Grunddaten -->
      {#if activeTab === 'grunddaten'}
        <div class="tab-content">
          <div class="form-group">
            <label for="title">Titel</label>
            <input type="text" id="title" name="title" bind:value={data.day.title} required />
          </div>
          <div class="form-group">
            <label for="authorA">Autor</label>
            <input type="text" id="authorA" name="authorA" bind:value={data.day.authorA} />
          </div>
        </div>
      {/if}

      <!-- Inhalt A -->
      {#if activeTab === 'inhalt'}
        <div class="tab-content">
          <div class="form-group">
            <label for="contentTypeA">Inhaltstyp</label>
            <select id="contentTypeA" name="contentTypeA" bind:value={data.day.contentTypeA} required>
              {#each contentTypes as type}
                <option value={type.value}>{type.label}</option>
              {/each}
            </select>
          </div>
          
          <div class="form-group">
            <label for="contentA">
              Inhalt
              {#if data.day.contentTypeA === 'QUIZ_JSON'}
                <button type="button" class="btn-small" on:click={() => data.day.contentA = getQuizExample()}>Beispiel einfügen</button>
              {/if}
            </label>
            <textarea id="contentA" name="contentA" bind:value={data.day.contentA} rows="15" required></textarea>
          </div>
        </div>
      {/if}

      <!-- Antwort -->
      {#if activeTab === 'antwort'}
        <div class="tab-content">
          <div class="form-group">
            <label for="responseMode">Antwort-Modus</label>
            <select id="responseMode" name="responseMode" bind:value={data.day.responseMode}>
              <option value="DISABLED">🔒 Keine Antwort möglich</option>
              <option value="OPEN">💬 Sofort antworten</option>
              <option value="AFTER_A">📝 Nur Locdoc-Inhalt</option>
              <option value="AFTER_B">📝 Nur Miss Chaos-Inhalt</option>
              <option value="COLLABORATIVE">🤝 Zusammenarbeit</option>
            </select>
          </div>
          <div class="form-group">
            <label for="taskForB">Aufgabe für Miss Chaos</label>
            <textarea id="taskForB" name="taskForB" bind:value={data.day.taskForB} rows="5"></textarea>
          </div>
        </div>
      {/if}

      <!-- Chain -->
      {#if activeTab === 'chain'}
        <div class="tab-content">
          <div class="checkbox-group">
            <label>
              <input type="checkbox" name="linkedToPrevious" bind:checked={data.day.linkedToPrevious} />
              Fortsetzung vom vorherigen Tag
            </label>
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" name="linkedToNext" bind:checked={data.day.linkedToNext} />
              Wird am nächsten Tag fortgesetzt
            </label>
          </div>
          <div class="form-group">
            <label for="storyChainId">Story-Chain ID</label>
            <input type="text" id="storyChainId" name="storyChainId" bind:value={data.day.storyChainId} />
          </div>
        </div>
      {/if}

      <!-- Ergebnis -->
      {#if activeTab === 'ergebnis'}
        <div class="tab-content">
          <div class="form-group">
            <label for="combinedResult">Kombiniertes Ergebnis</label>
            <textarea id="combinedResult" name="combinedResult" bind:value={data.day.combinedResult} rows="5"></textarea>
          </div>
          
          {#if data.day.contentB}
            <div class="response-preview">
              <h4>Antwort von {data.day.authorB || 'Miss Chaos'}:</h4>
              <pre>{data.day.contentB}</pre>
              <button type="submit" formaction="?/resetResponse" class="btn-danger">Antwort zurücksetzen</button>
            </div>
          {/if}
        </div>
      {/if}

      <div class="form-actions">
        <button type="submit" class="btn-primary">💾 Speichern</button>
        <a href="/admin" class="btn-secondary">Abbrechen</a>
      </div>
    </form>
  </div>
</div>

<style>
  .editor-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .back-link {
    color: #5d4037;
    text-decoration: none;
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  h1 {
    color: #8b0000;
    margin: 0;
    font-family: 'Georgia', serif;
  }

  .editor-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border: 1px solid #d4af37;
  }

  .editor-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eee;
    flex-wrap: wrap;
  }

  .tab-btn {
    background: none;
    border: none;
    padding: 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #757575;
    border-bottom: 3px solid transparent;
  }

  .tab-btn.active {
    color: #8b0000;
    border-bottom-color: #8b0000;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #2c1810;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus, select:focus, textarea:focus {
    border-color: #d4af37;
    outline: none;
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
  }

  .form-actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
  }

  .btn-primary {
    background: #8b0000;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }

  .btn-secondary {
    background: #eee;
    color: #333;
    text-decoration: none;
    padding: 0.8rem 2rem;
    border-radius: 4px;
    font-weight: bold;
    display: inline-block;
  }

  .btn-preview {
    background: #d4af37;
    color: white;
    text-decoration: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    font-weight: bold;
  }

  .btn-danger {
    background: #c62828;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-small {
    background: #eee;
    border: none;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    margin-left: 0.5rem;
  }

  .alert {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  .alert-success { background: #e8f5e9; color: #2e7d32; }
  .alert-error { background: #ffebee; color: #c62828; }

  .templates-section {
    margin-bottom: 2rem;
    background: #fff8e1;
    padding: 1rem;
    border-radius: 4px;
  }

  .templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .template-card {
    background: white;
    border: 1px solid #ffe082;
    padding: 1rem;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
  }
  
  .template-card:hover {
    background: #fffde7;
  }

  .template-category {
    display: block;
    font-size: 0.8rem;
    color: #f57f17;
    margin-bottom: 0.2rem;
  }

  .template-title {
    font-weight: bold;
    color: #333;
  }
</style>
