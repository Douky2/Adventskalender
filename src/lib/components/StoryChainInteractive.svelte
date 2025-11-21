<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  
  export let chainId: string;
  export let dayNumber: number;
  export let type: 'color' | 'theme' | 'text' | 'element' | 'design';
  export let title: string = '';
  export let options: Array<{value: string, label: string, preview?: string}> = [];
  export let currentState: any = {};
  
  let selectedValue: string = '';
  let textInput: string = '';
  let saving = false;
  let saved = false;
  
  // Lade gespeicherten Wert
  $: {
    if (type === 'color' && currentState?.chosenColor) {
      selectedValue = currentState.chosenColor;
    } else if (type === 'theme' && currentState?.chosenTheme) {
      selectedValue = currentState.chosenTheme;
    } else if (type === 'element' && currentState?.chosenElement) {
      selectedValue = currentState.chosenElement;
    } else if (type === 'text' && currentState?.textInput) {
      textInput = currentState.textInput;
    }
  }
  
  async function saveChoice() {
    saving = true;
    
    const data: any = {
      storyChainId: chainId,
      dayNumber,
    };
    
    if (type === 'color') data.chosenColor = selectedValue;
    else if (type === 'theme') data.chosenTheme = selectedValue;
    else if (type === 'element') data.chosenElement = selectedValue;
    else if (type === 'text') data.textInput = textInput;
    
    try {
      const response = await fetch('/api/chain-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        saved = true;
        setTimeout(() => saved = false, 2000);
      }
    } catch (error) {
      console.error('Error saving choice:', error);
    } finally {
      saving = false;
    }
  }
  
  function getPreviewStyle(value: string, option: any) {
    if (type === 'color') {
      return `background: ${value}; border: 3px solid ${selectedValue === value ? '#c0392b' : '#ddd'};`;
    } else if (type === 'design' && option.preview) {
      return `background: ${option.preview}; border: 3px solid ${selectedValue === value ? '#c0392b' : '#ddd'};`;
    }
    return '';
  }
</script>

<div class="chain-interactive" in:fade>
  <h3>{title}</h3>
  
  {#if type === 'color'}
    <div class="color-picker">
      {#each options as option}
        <button
          class="color-option"
          class:selected={selectedValue === option.value}
          style={getPreviewStyle(option.value, option)}
          on:click={() => {
            selectedValue = option.value;
            saveChoice();
          }}
        >
          <span class="color-label">{option.label}</span>
        </button>
      {/each}
    </div>
  
  {:else if type === 'theme' || type === 'element' || type === 'design'}
    <div class="option-grid">
      {#each options as option}
        <button
          class="option-card"
          class:selected={selectedValue === option.value}
          on:click={() => {
            selectedValue = option.value;
            saveChoice();
          }}
        >
          {#if option.preview}
            <div class="option-preview" style="background: {option.preview}"></div>
          {/if}
          <div class="option-label">{option.label}</div>
          {#if selectedValue === option.value}
            <div class="check-icon">✓</div>
          {/if}
        </button>
      {/each}
    </div>
  
  {:else if type === 'text'}
    <div class="text-input-container">
      <textarea
        bind:value={textInput}
        placeholder="Deine Eingabe hier..."
        rows="4"
      ></textarea>
      <button 
        class="save-btn" 
        on:click={saveChoice}
        disabled={saving || !textInput.trim()}
      >
        {#if saving}
          💾 Speichern...
        {:else if saved}
          ✅ Gespeichert!
        {:else}
          💾 Speichern
        {/if}
      </button>
    </div>
  {/if}
  
  {#if saved && type !== 'text'}
    <div class="save-feedback" in:scale>
      ✅ Auswahl gespeichert!
    </div>
  {/if}
</div>

<style>
  .chain-interactive {
    background: #fff;
    padding: 2rem;
    border-radius: 2px;
    border: 1px solid #e0e0e0;
    margin: 2rem 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    position: relative;
  }
  
  /* Paper texture */
  .chain-interactive::before {
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
  
  h3 {
    margin-top: 0;
    color: #8b0000;
    font-family: 'Georgia', serif;
    border-bottom: 2px dashed #d4af37;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  /* Color Picker */
  .color-picker {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  
  .color-option {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .color-option:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  .color-option.selected {
    transform: scale(1.15);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
  }
  
  .color-label {
    background: rgba(255,255,255,0.9);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #333;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .color-option:hover .color-label {
    opacity: 1;
  }
  
  /* Option Grid */
  .option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .option-card {
    background: #fff;
    border: 2px dashed #bdbdbd;
    border-radius: 2px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .option-card:hover {
    border-color: #d4af37;
    transform: translateY(-2px);
    box-shadow: 3px 3px 0px rgba(0,0,0,0.1);
  }
  
  .option-card.selected {
    border-color: #8b0000;
    border-style: solid;
    background: #fff8e1;
    box-shadow: 3px 3px 0px rgba(139, 0, 0, 0.2);
  }
  
  .option-preview {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(0,0,0,0.1);
  }
  
  .option-label {
    font-weight: 600;
    color: #5d4037;
    text-align: center;
    font-family: 'Georgia', serif;
  }
  
  .check-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 24px;
    height: 24px;
    background: #2e7d32;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  /* Text Input */
  .text-input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #bdbdbd;
    border-radius: 2px;
    font-size: 1rem;
    font-family: 'Georgia', serif;
    resize: vertical;
    background: #fafafa;
    color: #3e2723;
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.05);
  }
  
  textarea:focus {
    outline: none;
    border-color: #d4af37;
    background: #fff;
  }
  
  .save-btn {
    padding: 1rem 2rem;
    background: #2c1810;
    color: #d4af37;
    border: none;
    border-radius: 2px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Georgia', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .save-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
    background: #3e2723;
  }
  
  .save-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #9e9e9e;
    color: #e0e0e0;
  }
  
  .save-feedback {
    text-align: center;
    color: #2e7d32;
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 1rem;
    font-family: 'Georgia', serif;
  }
</style>
