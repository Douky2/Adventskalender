<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  let selectedIds: Set<number> = new Set();
  let selectAll = false;
  let bulkAction = '';
  let categoryValue = 'Romantisch';
  let tagsValue = '';
  let searchQuery = '';
  
  const categories = [
    'Romantisch', 'Spiele', 'Kreativ', 'Fragen', 'Aktivitäten',
    'Geschichten', 'Überraschungen', 'Gutscheine', 'Challenges', 'Allgemein'
  ];
  
  $: filteredTiles = data.tiles.filter(tile =>
    tile.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  $: if (selectAll) {
    selectedIds = new Set(filteredTiles.map(t => t.id));
  } else if (selectedIds.size === filteredTiles.length) {
    selectedIds = new Set();
  }
  
  function toggleSelect(id: number) {
    if (selectedIds.has(id)) {
      selectedIds.delete(id);
    } else {
      selectedIds.add(id);
    }
    selectedIds = selectedIds;
  }
  
  function toggleSelectAll() {
    selectAll = !selectAll;
  }
  
  async function executeBulkAction() {
    if (selectedIds.size === 0) {
      alert('Keine Tiles ausgewählt!');
      return;
    }
    
    if (!bulkAction) {
      alert('Keine Aktion ausgewählt!');
      return;
    }
    
    const ids = Array.from(selectedIds);
    const formData = new FormData();
    formData.append('ids', JSON.stringify(ids));
    
    let action = '';
    let confirmMsg = '';
    
    switch (bulkAction) {
      case 'delete':
        action = '?/bulkDelete';
        confirmMsg = `${ids.length} Tiles wirklich löschen?`;
        break;
      case 'updateCategory':
        if (!categoryValue) {
          alert('Bitte Kategorie wählen!');
          return;
        }
        action = '?/bulkUpdateCategory';
        formData.append('category', categoryValue);
        confirmMsg = `Kategorie von ${ids.length} Tiles auf "${categoryValue}" ändern?`;
        break;
      case 'addTags':
        if (!tagsValue) {
          alert('Bitte Tags eingeben!');
          return;
        }
        action = '?/bulkAddTags';
        formData.append('tags', tagsValue);
        confirmMsg = `Tags "${tagsValue}" zu ${ids.length} Tiles hinzufügen?`;
        break;
      case 'favorite':
        action = '?/bulkFavorite';
        formData.append('favorite', 'true');
        confirmMsg = `${ids.length} Tiles als Favoriten markieren?`;
        break;
      case 'unfavorite':
        action = '?/bulkFavorite';
        formData.append('favorite', 'false');
        confirmMsg = `${ids.length} Tiles von Favoriten entfernen?`;
        break;
      case 'unassign':
        action = '?/bulkUnassign';
        confirmMsg = `${ids.length} Tiles von Tagen entfernen?`;
        break;
    }
    
    if (!confirm(confirmMsg)) return;
    
    const response = await fetch(`/admin/tiles/bulk${action}`, {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      alert('Bulk-Aktion erfolgreich!');
      window.location.reload();
    } else {
      alert('Fehler bei Bulk-Aktion!');
    }
  }
  
  function getContentTypeIcon(contentType: string): string {
    const icons: Record<string, string> = {
      'TEXT': '📝', 'STORY': '📖', 'POEM': '✍️', 'LETTER': '💌',
      'QUOTE': '💭', 'GAME_QUESTION': '❓', 'RIDDLE': '🧩',
      'TASK': '✅', 'CHALLENGE': '🎯', 'RECIPE': '🍪',
      'MOVIE_DATE': '🎬', 'PLAYLIST': '🎵', 'PHOTO': '📷',
      'VIDEO': '🎥', 'COUPON': '🎫', 'SURPRISE': '🎁',
      'MEMORY': '💫', 'WISH': '⭐'
    };
    return icons[contentType] || '📄';
  }
</script>

<div class="bulk-operations">
  <div class="header">
    <div class="header-content">
      <a href="/admin/tiles" class="back-link">← Zurück zur Library</a>
      <h1>🔧 Bulk-Operationen</h1>
      <p class="subtitle">Mehrere Tiles gleichzeitig bearbeiten</p>
    </div>
  </div>
  
  <div class="selection-bar">
    <div class="selection-info">
      <span class="selection-count">{selectedIds.size}</span>
      <span class="selection-label">Tiles ausgewählt</span>
    </div>
    
    <div class="bulk-controls">
      <select bind:value={bulkAction} class="action-select">
        <option value="">Aktion wählen...</option>
        <option value="delete">🗑️ Löschen</option>
        <option value="updateCategory">📂 Kategorie ändern</option>
        <option value="addTags">🏷️ Tags hinzufügen</option>
        <option value="favorite">⭐ Als Favorit markieren</option>
        <option value="unfavorite">☆ Favorit entfernen</option>
        <option value="unassign">📦 Von Tagen entfernen</option>
      </select>
      
      {#if bulkAction === 'updateCategory'}
        <select bind:value={categoryValue} class="param-input">
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      {/if}
      
      {#if bulkAction === 'addTags'}
        <input
          type="text"
          bind:value={tagsValue}
          placeholder="Tags (kommagetrennt)"
          class="param-input"
        />
      {/if}
      
      <button
        class="btn-execute"
        on:click={executeBulkAction}
        disabled={selectedIds.size === 0 || !bulkAction}
      >
        ✓ Ausführen
      </button>
    </div>
  </div>
  
  <div class="content">
    <div class="toolbar">
      <input
        type="text"
        placeholder="🔍 Tiles durchsuchen..."
        bind:value={searchQuery}
        class="search-input"
      />
      
      <label class="select-all">
        <input type="checkbox" bind:checked={selectAll} on:change={toggleSelectAll} />
        Alle auswählen ({filteredTiles.length})
      </label>
    </div>
    
    <div class="tiles-table">
      <table>
        <thead>
          <tr>
            <th class="col-select">Wählen</th>
            <th class="col-icon">Icon</th>
            <th class="col-title">Titel</th>
            <th class="col-category">Kategorie</th>
            <th class="col-type">Typ</th>
            <th class="col-tags">Tags</th>
            <th class="col-status">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredTiles as tile (tile.id)}
            <tr class:selected={selectedIds.has(tile.id)}>
              <td class="col-select">
                <input
                  type="checkbox"
                  checked={selectedIds.has(tile.id)}
                  on:change={() => toggleSelect(tile.id)}
                />
              </td>
              <td class="col-icon">
                {getContentTypeIcon(tile.contentType)}
              </td>
              <td class="col-title">
                <div class="title-cell">
                  {tile.title}
                  {#if tile.isFavorite}
                    <span class="favorite-badge">⭐</span>
                  {/if}
                </div>
              </td>
              <td class="col-category">
                <span class="category-badge">{tile.category}</span>
              </td>
              <td class="col-type">
                <span class="type-badge">{tile.contentType}</span>
              </td>
              <td class="col-tags">
                {#if tile.tags}
                  <div class="tags-cell">
                    {#each tile.tags.split(',').slice(0, 2) as tag}
                      <span class="tag">{tag.trim()}</span>
                    {/each}
                    {#if tile.tags.split(',').length > 2}
                      <span class="tag-more">+{tile.tags.split(',').length - 2}</span>
                    {/if}
                  </div>
                {/if}
              </td>
              <td class="col-status">
                {#if tile.assignedToDayNumber}
                  <span class="status-badge assigned">📅 Tag {tile.assignedToDayNumber}</span>
                {:else}
                  <span class="status-badge available">📦 Verfügbar</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .bulk-operations {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }
  
  .header {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .back-link {
    display: block;
    color: #6b7280;
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }
  
  .back-link:hover {
    color: #10b981;
  }
  
  .header-content h1 {
    margin: 0;
    font-size: 2rem;
    color: #1f2937;
  }
  
  .subtitle {
    margin: 0.5rem 0 0;
    color: #6b7280;
  }
  
  .selection-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 12px;
    margin-bottom: 2rem;
    color: white;
  }
  
  .selection-info {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  
  .selection-count {
    font-size: 2.5rem;
    font-weight: 700;
  }
  
  .selection-label {
    font-size: 1.1rem;
  }
  
  .bulk-controls {
    display: flex;
    gap: 0.75rem;
  }
  
  .action-select,
  .param-input {
    padding: 0.75rem 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }
  
  .action-select option,
  .param-input {
    color: #1f2937;
  }
  
  .btn-execute {
    padding: 0.75rem 1.5rem;
    background: white;
    color: #059669;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-execute:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  .btn-execute:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .content {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .search-input {
    flex: 1;
    max-width: 400px;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #10b981;
  }
  
  .select-all {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    color: #374151;
  }
  
  .tiles-table {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background: #f9fafb;
  }
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
  }
  
  td {
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;
  }
  
  tr:hover {
    background: #f9fafb;
  }
  
  tr.selected {
    background: #ecfdf5;
  }
  
  .col-select {
    width: 50px;
    text-align: center;
  }
  
  .col-icon {
    width: 60px;
    font-size: 1.5rem;
    text-align: center;
  }
  
  .col-title {
    min-width: 250px;
  }
  
  .col-category,
  .col-type {
    width: 150px;
  }
  
  .col-tags {
    width: 200px;
  }
  
  .col-status {
    width: 150px;
  }
  
  .title-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #1f2937;
  }
  
  .favorite-badge {
    font-size: 1rem;
  }
  
  .category-badge,
  .type-badge {
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    border-radius: 6px;
    font-size: 0.85rem;
    color: #6b7280;
    font-weight: 500;
  }
  
  .tags-cell {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
  
  .tag {
    padding: 0.25rem 0.5rem;
    background: #fef3c7;
    color: #92400e;
    border-radius: 4px;
    font-size: 0.75rem;
  }
  
  .tag-more {
    padding: 0.25rem 0.5rem;
    background: #e5e7eb;
    color: #6b7280;
    border-radius: 4px;
    font-size: 0.75rem;
  }
  
  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
  }
  
  .status-badge.assigned {
    background: #d1fae5;
    color: #065f46;
  }
  
  .status-badge.available {
    background: #dbeafe;
    color: #1e40af;
  }
</style>
