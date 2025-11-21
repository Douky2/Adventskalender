<script lang="ts">
  let chainName = '';
  let chainDays: Array<{
    dayNumber: number;
    type: 'color' | 'theme' | 'text' | 'element' | 'design' | 'result';
    title: string;
    options?: Array<{value: string, label: string, preview?: string}>;
  }> = [];
  
  let newDayNumber = 1;
  let newDayType: 'color' | 'theme' | 'text' | 'element' | 'design' | 'result' = 'text';
  let newDayTitle = '';
  
  // Vordefinierte Beispiele
  const examples = {
    'build-story': {
      name: 'our-love-story',
      days: [
        { dayNumber: 1, type: 'color' as const, title: 'Wähle die Farbe unserer Geschichte' },
        { dayNumber: 3, type: 'text' as const, title: 'Schreibe den Anfang' },
        { dayNumber: 5, type: 'text' as const, title: 'Was passiert als nächstes?' },
        { dayNumber: 7, type: 'element' as const, title: 'Wähle ein Symbol' },
        { dayNumber: 10, type: 'result' as const, title: 'Das Ergebnis!' }
      ]
    },
    'design-builder': {
      name: 'build-your-design',
      days: [
        { dayNumber: 2, type: 'color' as const, title: 'Hauptfarbe wählen' },
        { dayNumber: 5, type: 'theme' as const, title: 'Thema auswählen' },
        { dayNumber: 8, type: 'element' as const, title: 'Element hinzufügen' },
        { dayNumber: 12, type: 'result' as const, title: 'Dein Design!' }
      ]
    },
    'poem-together': {
      name: 'our-poem',
      days: [
        { dayNumber: 1, type: 'text' as const, title: 'Erste Zeile' },
        { dayNumber: 4, type: 'text' as const, title: 'Zweite Zeile' },
        { dayNumber: 7, type: 'text' as const, title: 'Dritte Zeile' },
        { dayNumber: 10, type: 'text' as const, title: 'Vierte Zeile' },
        { dayNumber: 13, type: 'result' as const, title: 'Unser Gedicht' }
      ]
    }
  };
  
  function loadExample(exampleKey: string) {
    const example = examples[exampleKey as keyof typeof examples];
    chainName = example.name;
    chainDays = [...example.days];
  }
  
  function addDay() {
    if (newDayNumber && newDayTitle) {
      chainDays = [...chainDays, {
        dayNumber: newDayNumber,
        type: newDayType,
        title: newDayTitle,
        options: newDayType === 'text' || newDayType === 'result' ? undefined : []
      }];
      
      // Sort by day number
      chainDays.sort((a, b) => a.dayNumber - b.dayNumber);
      
      // Reset form
      newDayNumber = Math.max(...chainDays.map(d => d.dayNumber)) + 1;
      newDayTitle = '';
    }
  }
  
  function removeDay(index: number) {
    chainDays = chainDays.filter((_, i) => i !== index);
  }
  
  function generateCode() {
    let code = `<!-- Story-Chain: ${chainName} -->\n\n`;
    
    chainDays.forEach(day => {
      if (day.type === 'result') {
        code += `<!-- Tag ${day.dayNumber}: ${day.title} -->\n`;
        code += `<script lang="ts">\n`;
        code += `  import StoryChainResult from '$lib/components/StoryChainResult.svelte';\n`;
        code += `<\/script>\n\n`;
        code += `<div class="final-result">\n`;
        code += `  <h1>🎉 ${day.title}</h1>\n`;
        code += `  <StoryChainResult\n`;
        code += `    chainId="${chainName}"\n`;
        code += `    finalDayNumber={${day.dayNumber}}\n`;
        code += `    templateType="story"\n`;
        code += `  />\n`;
        code += `</div>\n\n`;
      } else {
        code += `<!-- Tag ${day.dayNumber}: ${day.title} -->\n`;
        code += `<script lang="ts">\n`;
        code += `  import StoryChainInteractive from '$lib/components/StoryChainInteractive.svelte';\n`;
        code += `<\/script>\n\n`;
        code += `<div class="chain-day">\n`;
        code += `  <h2>${day.title}</h2>\n`;
        code += `  <StoryChainInteractive\n`;
        code += `    chainId="${chainName}"\n`;
        code += `    dayNumber={${day.dayNumber}}\n`;
        code += `    type="${day.type}"\n`;
        code += `    title="${day.title}"\n`;
        
        if (day.type === 'color') {
          code += `    options={[\n`;
          code += `      { value: '#ff6b9d', label: 'Rosa' },\n`;
          code += `      { value: '#4ecdc4', label: 'Türkis' },\n`;
          code += `      { value: '#ffd93d', label: 'Gelb' },\n`;
          code += `      { value: '#95e1d3', label: 'Mint' }\n`;
          code += `    ]}\n`;
        } else if (day.type === 'theme') {
          code += `    options={[\n`;
          code += `      { value: 'romantic', label: 'Romantisch', preview: '#ff6b9d' },\n`;
          code += `      { value: 'adventure', label: 'Abenteuer', preview: '#ffd93d' },\n`;
          code += `      { value: 'cozy', label: 'Gemütlich', preview: '#95e1d3' }\n`;
          code += `    ]}\n`;
        } else if (day.type === 'element') {
          code += `    options={[\n`;
          code += `      { value: 'heart', label: '❤️ Herz', preview: '#ff6b9d' },\n`;
          code += `      { value: 'star', label: '⭐ Stern', preview: '#ffd93d' },\n`;
          code += `      { value: 'moon', label: '🌙 Mond', preview: '#95e1d3' }\n`;
          code += `    ]}\n`;
        }
        
        code += `  />\n`;
        code += `</div>\n\n`;
      }
    });
    
    return code;
  }
  
  function generateInstructions() {
    let instructions = `# Story-Chain Setup: ${chainName}\n\n`;
    instructions += `## Schritt 1: Türchen im Admin vorbereiten\n\n`;
    
    chainDays.forEach(day => {
      instructions += `### Tag ${day.dayNumber}: ${day.title}\n`;
      instructions += `1. Öffne Tag ${day.dayNumber} im Admin-Panel\n`;
      instructions += `2. Gehe zum Tab "🔗 Story-Verknüpfung"\n`;
      instructions += `3. Trage ein:\n`;
      instructions += `   - **Story-Chain ID**: \`${chainName}\`\n`;
      instructions += `   - ☑️ **Fortsetzung vom vorherigen Tag** ${day.dayNumber > chainDays[0].dayNumber ? '(aktivieren)' : '(nicht aktivieren)'}\n`;
      instructions += `   - ☑️ **Wird am nächsten Tag fortgesetzt** ${day.dayNumber < chainDays[chainDays.length - 1].dayNumber ? '(aktivieren)' : '(nicht aktivieren)'}\n`;
      instructions += `4. Content-Type: Wähle passenden Typ (z.B. TEXT)\n`;
      instructions += `5. Füge den generierten Code in das Inhalt-Feld ein\n\n`;
    });
    
    instructions += `## Schritt 2: Code verwenden\n\n`;
    instructions += `Siehe "Generierter Code" Tab für den fertigen Code!\n\n`;
    instructions += `## Schritt 3: Testen\n\n`;
    instructions += `1. Aktiviere den Simulation-Modus\n`;
    instructions += `2. Öffne die Türchen nacheinander\n`;
    instructions += `3. Prüfe ob die Eingaben gespeichert werden\n`;
    instructions += `4. Am letzten Tag sollte das Ergebnis sichtbar sein\n`;
    
    return instructions;
  }
  
  let activeTab: 'builder' | 'code' | 'instructions' = 'builder';
  let copiedCode = false;
  
  function copyCode() {
    navigator.clipboard.writeText(generateCode());
    copiedCode = true;
    setTimeout(() => copiedCode = false, 2000);
  }
</script>

<svelte:head>
  <title>Story-Chain Builder - Admin</title>
</svelte:head>

<div class="container">
  <header class="page-header">
    <h1>🔗 Story-Chain Builder</h1>
    <p>Erstelle interaktive Story-Chains ohne Code!</p>
    <a href="/admin" class="btn-back">← Zurück zum Admin</a>
  </header>
  
  <div class="quick-start">
    <h2>🚀 Schnellstart mit Beispielen</h2>
    <div class="examples-grid">
      <button class="example-card" on:click={() => loadExample('build-story')}>
        <h3>📖 Geschichte schreiben</h3>
        <p>5 Tage Story mit Farbe, Text und Ergebnis</p>
      </button>
      <button class="example-card" on:click={() => loadExample('design-builder')}>
        <h3>🎨 Design zusammenstellen</h3>
        <p>4 Tage mit Farben, Thema und Elementen</p>
      </button>
      <button class="example-card" on:click={() => loadExample('poem-together')}>
        <h3>✍️ Gedicht schreiben</h3>
        <p>5 Tage Gedicht Zeile für Zeile</p>
      </button>
    </div>
  </div>
  
  <div class="tabs">
    <button 
      class="tab" 
      class:active={activeTab === 'builder'}
      on:click={() => activeTab = 'builder'}
    >
      🛠️ Builder
    </button>
    <button 
      class="tab" 
      class:active={activeTab === 'code'}
      on:click={() => activeTab = 'code'}
    >
      💻 Generierter Code
    </button>
    <button 
      class="tab" 
      class:active={activeTab === 'instructions'}
      on:click={() => activeTab = 'instructions'}
    >
      📋 Anleitung
    </button>
  </div>
  
  {#if activeTab === 'builder'}
    <div class="builder-section">
      <div class="chain-config">
        <h2>Chain-Konfiguration</h2>
        <div class="form-group">
          <label for="chainName">
            Story-Chain ID
            <span class="info-tooltip" title="Ein eindeutiger Name für diese Story-Chain. Keine Leerzeichen!">ℹ️</span>
          </label>
          <input 
            type="text" 
            id="chainName"
            bind:value={chainName} 
            placeholder="z.B. our-love-story"
          />
          <small class="hint">Verwende Kleinbuchstaben und Bindestriche (z.B. "my-story")</small>
        </div>
      </div>
      
      <div class="days-config">
        <h2>Tage hinzufügen</h2>
        <div class="add-day-form">
          <div class="form-row">
            <div class="form-group">
              <label for="dayNumber">Tag Nummer</label>
              <input 
                type="number" 
                id="dayNumber"
                bind:value={newDayNumber} 
                min="1" 
                max="24"
              />
            </div>
            
            <div class="form-group">
              <label for="dayType">Typ</label>
              <select id="dayType" bind:value={newDayType}>
                <option value="text">📝 Text eingeben</option>
                <option value="color">🎨 Farbe wählen</option>
                <option value="theme">🎭 Thema wählen</option>
                <option value="element">✨ Element wählen</option>
                <option value="design">💎 Design wählen</option>
                <option value="result">🎉 Ergebnis anzeigen</option>
              </select>
            </div>
            
            <div class="form-group flex-grow">
              <label for="dayTitle">Titel</label>
              <input 
                type="text" 
                id="dayTitle"
                bind:value={newDayTitle} 
                placeholder="z.B. Wähle deine Farbe"
              />
            </div>
            
            <button class="btn-add" on:click={addDay}>
              ➕ Hinzufügen
            </button>
          </div>
        </div>
        
        {#if chainDays.length > 0}
          <div class="chain-timeline">
            <h3>Timeline ({chainDays.length} Tage)</h3>
            <div class="timeline">
              {#each chainDays as day, i}
                <div class="timeline-item">
                  <div class="timeline-day-card">
                    <div class="day-header">
                      <span class="day-num">Tag {day.dayNumber}</span>
                      <span class="day-type-badge type-{day.type}">
                        {#if day.type === 'text'}📝
                        {:else if day.type === 'color'}🎨
                        {:else if day.type === 'theme'}🎭
                        {:else if day.type === 'element'}✨
                        {:else if day.type === 'design'}💎
                        {:else}🎉{/if}
                        {day.type}
                      </span>
                    </div>
                    <div class="day-title">{day.title}</div>
                    <button class="btn-remove" on:click={() => removeDay(i)}>
                      🗑️ Entfernen
                    </button>
                  </div>
                  {#if i < chainDays.length - 1}
                    <div class="timeline-arrow">→</div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  
  {:else if activeTab === 'code'}
    <div class="code-section">
      <div class="code-header">
        <h2>💻 Generierter Code</h2>
        <button class="btn-copy" on:click={copyCode}>
          {#if copiedCode}
            ✅ Kopiert!
          {:else}
            📋 Code kopieren
          {/if}
        </button>
      </div>
      
      {#if chainName && chainDays.length > 0}
        <pre class="code-block">{generateCode()}</pre>
        
        <div class="help-box info">
          <strong>📌 So verwendest du den Code:</strong>
          <ol>
            <li>Kopiere den Code oben</li>
            <li>Gehe zum entsprechenden Türchen im Admin</li>
            <li>Wähle passenden Content-Type (z.B. TEXT)</li>
            <li>Füge den Code in das Inhalt-Feld ein</li>
            <li>Stelle sicher, dass die Story-Chain ID überall gleich ist!</li>
          </ol>
        </div>
      {:else}
        <div class="empty-state">
          <p>👈 Erstelle zuerst eine Chain im Builder-Tab!</p>
        </div>
      {/if}
    </div>
  
  {:else if activeTab === 'instructions'}
    <div class="instructions-section">
      {#if chainName && chainDays.length > 0}
        <pre class="instructions-content">{generateInstructions()}</pre>
      {:else}
        <div class="empty-state">
          <p>👈 Erstelle zuerst eine Chain im Builder-Tab!</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .page-header {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .page-header h1 {
    margin: 0 0 0.5rem 0;
    color: #c0392b;
    font-size: 2.5rem;
  }
  
  .page-header p {
    color: #7f8c8d;
    margin: 0 0 1rem 0;
  }
  
  .btn-back {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #ecf0f1;
    color: #2c3e50;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .btn-back:hover {
    background: #bdc3c7;
    transform: translateY(-2px);
  }
  
  .quick-start {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }
  
  .quick-start h2 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
  }
  
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .example-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }
  
  .example-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  .example-card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }
  
  .example-card p {
    margin: 0;
    opacity: 0.9;
  }
  
  .tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .tab {
    flex: 1;
    padding: 1rem 2rem;
    background: white;
    border: 2px solid #ddd;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tab:hover {
    border-color: #c0392b;
  }
  
  .tab.active {
    background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
    color: white;
    border-color: #c0392b;
  }
  
  .builder-section {
    display: grid;
    gap: 2rem;
  }
  
  .chain-config, .days-config {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .chain-config h2, .days-config h2 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group.flex-grow {
    flex: 1;
  }
  
  .form-group label {
    display: block;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #c0392b;
  }
  
  .info-tooltip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: bold;
    cursor: help;
    margin-left: 0.5rem;
  }
  
  .hint {
    display: block;
    font-size: 0.85rem;
    color: #7f8c8d;
    font-style: italic;
    margin-top: 0.25rem;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }
  
  .btn-add {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease;
  }
  
  .btn-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
  }
  
  .chain-timeline {
    margin-top: 2rem;
  }
  
  .chain-timeline h3 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }
  
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .timeline-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .timeline-day-card {
    flex: 1;
    background: linear-gradient(135deg, #fff9e6 0%, #ffedd5 100%);
    padding: 1.5rem;
    border-radius: 12px;
    border: 2px solid #ff9800;
  }
  
  .day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .day-num {
    font-weight: 700;
    color: #c0392b;
    font-size: 1.1rem;
  }
  
  .day-type-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
  }
  
  .type-text { background: #3498db; }
  .type-color { background: #e74c3c; }
  .type-theme { background: #9b59b6; }
  .type-element { background: #f39c12; }
  .type-design { background: #1abc9c; }
  .type-result { background: #27ae60; }
  
  .day-title {
    color: #2c3e50;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .btn-remove {
    padding: 0.5rem 1rem;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
  }
  
  .btn-remove:hover {
    background: #c0392b;
  }
  
  .timeline-arrow {
    font-size: 2rem;
    color: #c0392b;
    font-weight: bold;
  }
  
  .code-section, .instructions-section {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .code-header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .btn-copy {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-copy:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .code-block {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .help-box {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 2px solid #2196f3;
    border-radius: 12px;
    padding: 1.25rem;
    margin: 1rem 0;
  }
  
  .help-box.info strong {
    color: #1976d2;
    display: block;
    margin-bottom: 0.75rem;
  }
  
  .help-box ol {
    margin: 0.5rem 0 0 0;
    padding-left: 1.5rem;
  }
  
  .help-box li {
    margin: 0.5rem 0;
    color: #2c3e50;
  }
  
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #7f8c8d;
    font-size: 1.2rem;
  }
  
  .instructions-content {
    line-height: 1.8;
    white-space: pre-wrap;
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
