<script lang="ts">
  import { fade } from 'svelte/transition';
  
  export let text: string;
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  
  let showTooltip = false;
</script>

<div class="tooltip-wrapper">
  <button
    type="button"
    class="tooltip-trigger"
    on:mouseenter={() => showTooltip = true}
    on:mouseleave={() => showTooltip = false}
    on:focus={() => showTooltip = true}
    on:blur={() => showTooltip = false}
  >
    <span class="help-icon">?</span>
  </button>
  
  {#if showTooltip}
    <div class="tooltip tooltip-{position}" transition:fade={{ duration: 150 }}>
      {@html text}
    </div>
  {/if}
</div>

<style>
  .tooltip-wrapper {
    display: inline-block;
    position: relative;
    margin-left: 0.5rem;
  }
  
  .tooltip-trigger {
    background: #8b0000;
    color: white;
    border: 1px solid #8b0000;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: help;
    font-size: 0.8rem;
    font-weight: bold;
    transition: all 0.2s ease;
    padding: 0;
    font-family: 'Georgia', serif;
  }
  
  .tooltip-trigger:hover {
    transform: scale(1.1);
    background: #a50000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
  
  .tooltip {
    position: absolute;
    background: #fff;
    color: #2c1810;
    padding: 0.8rem 1rem;
    border-radius: 2px;
    font-size: 0.9rem;
    line-height: 1.4;
    width: max-content;
    max-width: 250px;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    pointer-events: none;
    border: 1px solid #d4af37;
    font-family: 'Georgia', serif;
  }
  
  .tooltip-top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0.5rem;
  }
  
  .tooltip-bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
  }
  
  .tooltip-left {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 0.5rem;
  }
  
  .tooltip-right {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 0.5rem;
  }
  
  /* Arrows */
  .tooltip::after {
    content: '';
    position: absolute;
    border: 6px solid transparent;
  }
  
  .tooltip-top::after {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: #d4af37;
  }
  
  .tooltip-bottom::after {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: #d4af37;
  }
  
  .tooltip-left::after {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: #d4af37;
  }
  
  .tooltip-right::after {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: #d4af37;
  }
  
  .tooltip :global(strong) {
    color: #3498db;
    font-weight: 600;
  }
  
  .tooltip :global(em) {
    color: #e74c3c;
    font-style: normal;
  }
  
  .tooltip :global(ul) {
    margin: 0.5rem 0;
    padding-left: 1.2rem;
  }
  
  .tooltip :global(li) {
    margin: 0.25rem 0;
  }
</style>
