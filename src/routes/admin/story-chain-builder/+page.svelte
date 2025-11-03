<script lang="ts">
  import { fade } from 'svelte/transition';
  
  interface StoryPart {
    dayNumber: number;
    title: string;
    contentTypeA: string;
    contentA: string;
    responseMode: string;
  }
  
  let storyTitle = '';
  let storyChainId = '';
  let numParts = 3;
  let parts: StoryPart[] = [];
  let generatedCode = '';
  let copiedMessage = '';
  
  function initializeParts() {
    parts = Array.from({ length: numParts }, (_, i) => ({
      dayNumber: i + 1,
      title: `${storyTitle} - Teil ${i + 1}`,
      contentTypeA: 'MEMORY',
      contentA: '',
      responseMode: i === 0 ? 'OPEN' : 'AFTER_A'
    }));
  }
  
  function generateSeedCode() {
    if (!storyTitle || !storyChainId || parts.length === 0) {
      return;
    }
    
    const code = parts.map((part, index) => {
      const linkedToPrevious = index > 0;
      const linkedToNext = index < parts.length - 1;
      
      return `  {
    dayNumber: ${part.dayNumber},
    title: '${part.title}',
    contentTypeA: '${part.contentTypeA}',
    contentA: \`${part.contentA || '[Dein Inhalt für Teil ' + (index + 1) + ']'}\`,
    responseMode: '${part.responseMode}',
    linkedToPrevious: ${linkedToPrevious},
    linkedToNext: ${linkedToNext},
    storyChainId: '${storyChainId}'
  }`;
    }).join(',\n\n');
    
    generatedCode = `// Story Chain: ${storyTitle}
// Füge diese Türchen in deine seed.ts ein
const storyChainDays = [
${code}
];`;
  }
  
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(generatedCode);
      copiedMessage = '✅ Code kopiert!';
      setTimeout(() => copiedMessage = '', 3000);
    } catch (err) {
      copiedMessage = '❌ Fehler beim Kopieren';
    }
  }
  
  $: if (storyTitle && storyChainId) {
    initializeParts();
  }
  
  $: if (parts.length > 0) {
    generateSeedCode();
  }
</script>

<svelte:head>
  <title>Story Chain Builder - Admin</title>
</svelte:head>

<div class="story-builder">
  <div class="header">
    <a href="/admin" class="back-link">← Zurück zum Admin</a>
    <h1>📖 Story Chain Builder</h1>
    <p class="subtitle">Erstelle mehrteilige Geschichten über mehrere Türchen</p>
  </div>
  
  <div class="builder-content">
    <!-- Story Einstellungen -->
    <div class="section">
      <h2>1️⃣ Story Grundeinstellungen</h2>
      
      <div class="form-group">
        <label for="story-title">Story Titel:</label>
        <input 
          type="text"
          id="story-title"
          bind:value={storyTitle}
          placeholder="z.B. 'Unsere Love Story'"
          class="text-input"
        />
      </div>
      
      <div class="form-group">
        <label for="chain-id">Story Chain ID:</label>
        <input 
          type="text"
          id="chain-id"
          bind:value={storyChainId}
          placeholder="z.B. 'our-love-story' (lowercase, mit bindestrichen)"
          class="text-input"
        />
      </div>
      
      <div class="form-group">
        <label for="num-parts">Anzahl Teile:</label>
        <select 
          id="num-parts"
          bind:value={numParts}
          on:change={initializeParts}
          class="select-input"
        >
          <option value={2}>2 Teile</option>
          <option value={3}>3 Teile</option>
          <option value={4}>4 Teile</option>
          <option value={5}>5 Teile</option>
        </select>
      </div>
    </div>
    
    <!-- Story Parts -->
    {#if parts.length > 0}
      <div class="section" transition:fade>
        <h2>2️⃣ Bearbeite Story-Teile</h2>
        
        {#each parts as part, index}
          <div class="part-editor">
            <h3>Teil {index + 1} von {parts.length}</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>Tag Nummer:</label>
                <input 
                  type="number"
                  bind:value={part.dayNumber}
                  min="1"
                  max="24"
                  class="number-input"
                  on:input={generateSeedCode}
                />
              </div>
              
              <div class="form-group">
                <label>Content-Typ:</label>
                <select 
                  bind:value={part.contentTypeA}
                  class="select-input"
                  on:change={generateSeedCode}
                >
                  <option value="MEMORY">MEMORY</option>
                  <option value="LOVE_STORY">LOVE_STORY</option>
                  <option value="LOVE_LETTER">LOVE_LETTER</option>
                  <option value="CHILDHOOD_STORY">CHILDHOOD_STORY</option>
                  <option value="TEXT">TEXT</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Response Mode:</label>
                <select 
                  bind:value={part.responseMode}
                  class="select-input"
                  on:change={generateSeedCode}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="AFTER_A">AFTER_A</option>
                  <option value="COLLABORATIVE">COLLABORATIVE</option>
                  <option value="DISABLED">DISABLED</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label>Titel:</label>
              <input 
                type="text"
                bind:value={part.title}
                class="text-input"
                on:input={generateSeedCode}
              />
            </div>
            
            <div class="form-group">
              <label>Inhalt (optional, kann später im Admin bearbeitet werden):</label>
              <textarea 
                bind:value={part.contentA}
                placeholder="Lasse leer oder schreibe deinen Inhalt hier..."
                class="textarea-input"
                on:input={generateSeedCode}
              ></textarea>
            </div>
            
            <div class="part-info">
              {#if index === 0}
                ⬇️ Erster Teil - wird verlinkt zu Teil 2
              {:else if index === parts.length - 1}
                ⬆️ Letzter Teil - ist verlinkt von Teil {index}
              {:else}
                ⬆️⬇️ Mittelteil - verlinkt von Teil {index} zu Teil {index + 2}
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
    
    <!-- Generated Code -->
    {#if generatedCode}
      <div class="section" transition:fade>
        <h2>3️⃣ Generierter Code</h2>
        
        <pre class="code-block">{generatedCode}</pre>
        
        <div class="actions">
          <button class="copy-btn" on:click={copyCode}>
            📋 Code kopieren
          </button>
          {#if copiedMessage}
            <span class="copied-message" transition:fade>{copiedMessage}</span>
          {/if}
        </div>
        
        <div class="info-box">
          <strong>📝 Anleitung:</strong>
          <ol>
            <li>Kopiere den generierten Code</li>
            <li>Öffne <code>prisma/seed.ts</code></li>
            <li>Füge die Story Chain Days in das <code>daysData</code> Array ein</li>
            <li>Führe <code>npx prisma db seed</code> aus</li>
            <li>Die Türchen sind jetzt miteinander verlinkt! ✨</li>
          </ol>
        </div>
        
        <div class="preview-box">
          <h3>🎨 So sieht es aus:</h3>
          <div class="preview-flow">
            {#each parts as part, index}
              <div class="preview-card">
                <div class="preview-day">Tag {part.dayNumber}</div>
                <div class="preview-title">{part.title}</div>
                <div class="preview-mode">{part.responseMode}</div>
              </div>
              {#if index < parts.length - 1}
                <div class="preview-arrow">➡️</div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .story-builder {
    min-height: 100vh;
    background: linear-gradient(135deg, #1e2837 0%, #243447 50%, #2a4158 100%);
    color: white;
    padding: 2rem;
  }
  
  .header {
    max-width: 1200px;
    margin: 0 auto 3rem;
    text-align: center;
  }
  
  .back-link {
    display: inline-block;
    color: #ffd700;
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  
  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }
  
  .builder-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #ffd700;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
  }
  
  .text-input,
  .number-input,
  .select-input {
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    padding: 0.8rem;
    font-size: 1rem;
  }
  
  .text-input:focus,
  .number-input:focus,
  .select-input:focus {
    outline: none;
    border-color: #ffd700;
  }
  
  .textarea-input {
    width: 100%;
    min-height: 150px;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    padding: 0.8rem;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
  }
  
  .textarea-input:focus {
    outline: none;
    border-color: #ffd700;
  }
  
  .part-editor {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .part-editor h3 {
    color: #ffd700;
    margin-bottom: 1rem;
  }
  
  .part-info {
    background: rgba(33, 150, 243, 0.2);
    border-left: 4px solid #2196F3;
    padding: 0.8rem;
    border-radius: 5px;
    margin-top: 1rem;
  }
  
  .code-block {
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1.5rem;
    overflow-x: auto;
    color: #4CAF50;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .copy-btn {
    background: linear-gradient(135deg, #2196F3, #1976D2);
    border: none;
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  
  .copy-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(33, 150, 243, 0.4);
  }
  
  .copied-message {
    color: #4CAF50;
    font-weight: bold;
  }
  
  .info-box {
    background: rgba(76, 175, 80, 0.2);
    border-left: 4px solid #4CAF50;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1rem;
  }
  
  .info-box code {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    color: #ffd700;
  }
  
  .preview-box {
    background: rgba(255, 215, 0, 0.1);
    border: 2px solid rgba(255, 215, 0, 0.3);
    border-radius: 10px;
    padding: 1.5rem;
    margin-top: 2rem;
  }
  
  .preview-box h3 {
    color: #ffd700;
    margin-bottom: 1rem;
  }
  
  .preview-flow {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .preview-card {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    min-width: 150px;
  }
  
  .preview-day {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffd700;
    margin-bottom: 0.5rem;
  }
  
  .preview-title {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .preview-mode {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .preview-arrow {
    font-size: 2rem;
  }
</style>
