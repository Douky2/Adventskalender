<script lang="ts">
  import { getContentComponent } from '$lib/components/content-types';
  import { fade } from 'svelte/transition';
  
  export let data;
  
  $: component = getContentComponent(data.tile.contentType);
</script>

<div class="preview-container">
  <header>
    <a href="/admin/tiles" class="back-link">← Zurück zur Übersicht</a>
    <h1>Vorschau: {data.tile.title}</h1>
    <div class="meta">
      <span class="badge category">{data.tile.category}</span>
      <span class="badge type">{data.tile.contentType}</span>
    </div>
  </header>

  <div class="preview-card">
    <div class="card-header">
      <h2>{data.tile.title}</h2>
      <span class="author">Von: {data.tile.author}</span>
    </div>
    
    <div class="card-content">
      <svelte:component 
        this={component} 
        content={data.tile.content} 
        author={data.tile.author}
        contentType={data.tile.contentType}
      />
    </div>

    {#if data.tile.taskForB}
      <div class="card-footer">
        <strong>Aufgabe:</strong> {data.tile.taskForB}
        <span class="mode-badge">{data.tile.responseMode}</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .preview-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  header {
    margin-bottom: 2rem;
  }

  .back-link {
    color: #d4af37;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 1rem;
  }

  h1 {
    color: #f4e4c1;
    margin: 0 0 1rem 0;
  }

  .meta {
    display: flex;
    gap: 0.5rem;
  }

  .badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: bold;
  }

  .category {
    background: #d4af37;
    color: #2c1810;
  }

  .type {
    background: rgba(255, 255, 255, 0.1);
    color: #f4e4c1;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .preview-card {
    background: #f4e4c1;
    color: #2c1810;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  .card-header {
    border-bottom: 2px solid #d4af37;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .card-header h2 {
    margin: 0;
    color: #8b0000;
    font-family: 'Georgia', serif;
  }

  .author {
    font-style: italic;
    color: #5d4037;
  }

  .card-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px dashed #8d6e63;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #5d4037;
  }

  .mode-badge {
    background: #2c1810;
    color: #d4af37;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }
</style>
