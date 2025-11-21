<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  
  export let chainId: string;
  export let templateType: 'story' | 'design' | 'poem' | 'custom' = 'story';
  
  let states: Record<number, any> = {};
  let loading = true;
  let builtResult = '';
  
  onMount(async () => {
    try {
      const response = await fetch(`/api/chain-state?chainId=${chainId}`);
      const data = await response.json();
      
      if (data.success) {
        states = data.states;
        buildResult();
      }
    } catch (error) {
      console.error('Error loading chain state:', error);
    } finally {
      loading = false;
    }
  });
  
  function buildResult() {
    if (templateType === 'story') {
      buildStory();
    } else if (templateType === 'design') {
      buildDesign();
    } else if (templateType === 'poem') {
      buildPoem();
    }
  }
  
  function buildStory() {
    let story = '';
    const sortedDays = Object.keys(states).sort((a, b) => parseInt(a) - parseInt(b));
    
    for (const day of sortedDays) {
      const state = states[parseInt(day)];
      if (state.textInput) {
        story += state.textInput + '\n\n';
      }
    }
    
    builtResult = story || 'Noch keine Teile gesammelt...';
  }
  
  function buildDesign() {
    // Hier werden visuelle Elemente zusammengebaut
    builtResult = 'Design wird zusammengebaut...';
  }
  
  function buildPoem() {
    // Gedicht aus Zeilen zusammenbauen
    let poem = '';
    const sortedDays = Object.keys(states).sort((a, b) => parseInt(a) - parseInt(b));
    
    for (const day of sortedDays) {
      const state = states[parseInt(day)];
      if (state.textInput) {
        poem += state.textInput + '\n';
      }
    }
    
    builtResult = poem || 'Noch keine Verse geschrieben...';
  }
  
  function getGradient() {
    const colors: string[] = [];
    
    Object.values(states).forEach((state: any) => {
      if (state.chosenColor) {
        colors.push(state.chosenColor);
      }
    });
    
    if (colors.length === 0) {
      return 'linear-gradient(135deg, #fff9e6 0%, #ffedd5 100%)';
    } else if (colors.length === 1) {
      return `linear-gradient(135deg, ${colors[0]} 0%, #fff 100%)`;
    } else {
      const stops = colors.map((color, i) => 
        `${color} ${(i / (colors.length - 1)) * 100}%`
      ).join(', ');
      return `linear-gradient(135deg, ${stops})`;
    }
  }
</script>

<div class="chain-result" style="background: {getGradient()};" in:fade>
  <div class="result-header">
    <h2>🎨 Dein zusammengebautes Ergebnis</h2>
    <p class="result-subtitle">Aus {Object.keys(states).length} Türchen entstanden</p>
  </div>
  
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Lade deine Sammlung...</p>
    </div>
  {:else}
    <div class="result-content" in:scale>
      {#if templateType === 'story' || templateType === 'poem'}
        <div class="text-result">
          {#each builtResult.split('\n') as line}
            {#if line.trim()}
              <p>{line}</p>
            {/if}
          {/each}
        </div>
      {:else if templateType === 'design'}
        <div class="design-preview">
          <div class="design-elements">
            {#each Object.entries(states) as [day, state]}
              {#if state.chosenTheme}
                <div class="element-badge" in:scale={{ delay: parseInt(day) * 100 }}>
                  Tag {day}: {state.chosenTheme}
                </div>
              {/if}
              {#if state.chosenElement}
                <div class="element-badge" in:scale={{ delay: parseInt(day) * 100 + 50 }}>
                  {state.chosenElement}
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
      
      <div class="result-meta">
        <h3>📋 Deine Auswahl im Detail:</h3>
        <div class="meta-grid">
          {#each Object.entries(states) as [day, state]}
            <div class="meta-card" in:scale={{ delay: parseInt(day) * 50 }}>
              <div class="meta-day">Tag {day}</div>
              {#if state.chosenColor}
                <div class="meta-item">
                  <span class="color-dot" style="background: {state.chosenColor}"></span>
                  Farbe gewählt
                </div>
              {/if}
              {#if state.chosenTheme}
                <div class="meta-item">🎭 {state.chosenTheme}</div>
              {/if}
              {#if state.chosenElement}
                <div class="meta-item">✨ {state.chosenElement}</div>
              {/if}
              {#if state.textInput}
                <div class="meta-item">📝 Text hinzugefügt</div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .chain-result {
    padding: 3rem 2rem;
    border-radius: 2px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    margin: 2rem 0;
    position: relative;
    border: 1px solid #e0e0e0;
  }
  
  /* Paper texture overlay */
  .chain-result::before {
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
  
  .result-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    z-index: 1;
  }
  
  h2 {
    color: #8b0000;
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    font-family: 'Georgia', serif;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.1);
  }
  
  .result-subtitle {
    color: #5d4037;
    font-size: 1.2rem;
    font-style: italic;
  }
  
  .loading {
    text-align: center;
    padding: 3rem;
    color: #5d4037;
    font-style: italic;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f0f0f0;
    border-top-color: #d4af37;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .text-result {
    background: #fff;
    padding: 3rem;
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    margin-bottom: 2rem;
    border: 1px solid #e0e0e0;
    position: relative;
    z-index: 1;
  }
  
  .text-result p {
    margin: 1rem 0;
    line-height: 1.8;
    font-size: 1.2rem;
    color: #2c1810;
    font-family: 'Georgia', serif;
  }
  
  .design-preview {
    background: #fff;
    padding: 2rem;
    border-radius: 2px;
    margin-bottom: 2rem;
    border: 1px solid #e0e0e0;
    position: relative;
    z-index: 1;
  }
  
  .design-elements {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  .element-badge {
    background: #2c1810;
    color: #d4af37;
    padding: 0.75rem 1.5rem;
    border-radius: 2px;
    font-weight: 600;
    box-shadow: 2px 2px 0px rgba(0,0,0,0.2);
    font-family: 'Georgia', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .result-meta {
    margin-top: 3rem;
    position: relative;
    z-index: 1;
  }
  
  .result-meta h3 {
    text-align: center;
    color: #8b0000;
    margin-bottom: 1.5rem;
    font-family: 'Georgia', serif;
    border-bottom: 2px dashed #d4af37;
    padding-bottom: 0.5rem;
    display: inline-block;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .meta-card {
    background: #fff;
    padding: 1.5rem;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    border: 1px solid #e0e0e0;
    transition: all 0.3s;
  }
  
  .meta-card:hover {
    transform: translateY(-2px);
    box-shadow: 3px 3px 0px rgba(0,0,0,0.1);
  }
  
  .meta-day {
    font-weight: 700;
    color: #8b0000;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    font-family: 'Georgia', serif;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
    color: #5d4037;
  }
  
  .color-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }
</style>
