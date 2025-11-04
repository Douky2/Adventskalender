<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  let searchQuery = '';
  let selectedCategory = 'Alle';
  let showOnlyFavorites = false;
  let showOnlyUnassigned = false;
  
  const categories = [
    'Alle',
    'Romantisch',
    'Spiele',
    'Kreativ',
    'Fragen',
    'Aktivitäten',
    'Geschichten',
    'Überraschungen',
    'Gutscheine',
    'Challenges',
    'Allgemein'
  ];
  
  $: filteredTiles = data.tiles.filter(tile => {
    const matchesSearch = tile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tile.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tile.tags?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || tile.category === selectedCategory;
    const matchesFavorites = !showOnlyFavorites || tile.isFavorite;
    const matchesUnassigned = !showOnlyUnassigned || tile.assignedToDayNumber === null;
    
    return matchesSearch && matchesCategory && matchesFavorites && matchesUnassigned;
  });
  
  $: groupedTiles = filteredTiles.reduce((acc, tile) => {
    const cat = tile.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tile);
    return acc;
  }, {} as Record<string, typeof filteredTiles>);
  
  function getContentTypeIcon(contentType: string): string {
    const icons: Record<string, string> = {
      'TEXT': '📝',
      'STORY': '📖',
      'POEM': '✍️',
      'LETTER': '💌',
      'QUOTE': '💭',
      'GAME_QUESTION': '❓',
      'RIDDLE': '🧩',
      'TASK': '✅',
      'CHALLENGE': '🎯',
      'RECIPE': '🍪',
      'MOVIE_DATE': '🎬',
      'PLAYLIST': '🎵',
      'PHOTO': '📷',
      'VIDEO': '🎥',
      'COUPON': '🎫',
      'SURPRISE': '🎁',
      'MEMORY': '💫',
      'WISH': '⭐'
    };
    return icons[contentType] || '📄';
  }
  
  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
</script>

<div class="tile-library">
  <div class="header">
    <div class="header-content">
      <h1>🎨 Tile Library</h1>
      <p class="subtitle">Verwalte wiederverwendbare Content-Bausteine für deinen Adventskalender</p>
    </div>
    
    <div class="header-actions">
      <a href="/admin/tiles/bulk" class="btn-bulk">
        🔧 Bulk-Operationen
      </a>
      <a href="/admin/tiles/new" class="btn-create">
        ➕ Neue Tile erstellen
      </a>
    </div>
  </div>
  
  <div class="filters">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Suche nach Titel, Beschreibung oder Tags..."
        bind:value={searchQuery}
      />
    </div>
    
    <div class="filter-group">
      <select bind:value={selectedCategory}>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
      
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={showOnlyFavorites} />
        ⭐ Nur Favoriten
      </label>
      
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={showOnlyUnassigned} />
        📦 Nur nicht zugewiesen
      </label>
    </div>
  </div>
  
  <div class="stats">
    <div class="stat">
      <span class="stat-number">{data.tiles.length}</span>
      <span class="stat-label">Gesamt</span>
    </div>
    <div class="stat">
      <span class="stat-number">{data.tiles.filter(t => t.isFavorite).length}</span>
      <span class="stat-label">Favoriten</span>
    </div>
    <div class="stat">
      <span class="stat-number">{data.tiles.filter(t => t.assignedToDayNumber === null).length}</span>
      <span class="stat-label">Verfügbar</span>
    </div>
    <div class="stat">
      <span class="stat-number">{data.tiles.filter(t => t.assignedToDayNumber !== null).length}</span>
      <span class="stat-label">Zugewiesen</span>
    </div>
  </div>
  
  {#if filteredTiles.length === 0}
    <div class="empty-state">
      <div class="empty-icon">🔍</div>
      <h3>Keine Tiles gefunden</h3>
      <p>Versuche andere Filter oder erstelle eine neue Tile</p>
      <a href="/admin/tiles/new" class="btn-secondary">Erste Tile erstellen</a>
    </div>
  {:else}
    {#each Object.entries(groupedTiles) as [category, tiles]}
      <div class="category-section">
        <h2 class="category-title">{category} ({tiles.length})</h2>
        
        <div class="tiles-grid">
          {#each tiles as tile (tile.id)}
            <div class="tile-card" class:assigned={tile.assignedToDayNumber !== null}>
              <div class="tile-header">
                <div class="tile-icon">{getContentTypeIcon(tile.contentType)}</div>
                
                <form method="POST" action="?/toggleFavorite" use:enhance>
                  <input type="hidden" name="id" value={tile.id} />
                  <input type="hidden" name="isFavorite" value={tile.isFavorite} />
                  <button
                    type="submit"
                    class="btn-favorite"
                    class:active={tile.isFavorite}
                    title={tile.isFavorite ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
                  >
                    {tile.isFavorite ? '⭐' : '☆'}
                  </button>
                </form>
              </div>
              
              <h3 class="tile-title">{tile.title}</h3>
              
              {#if tile.description}
                <p class="tile-description">{tile.description}</p>
              {/if}
              
              <div class="tile-meta">
                <span class="meta-badge">{tile.contentType}</span>
                {#if tile.linkedToPrevious || tile.linkedToNext}
                  <span class="meta-badge chain">🔗 Story Chain</span>
                {/if}
                {#if tile.assignedToDayNumber}
                  <span class="meta-badge assigned">📅 Tag {tile.assignedToDayNumber}</span>
                {/if}
              </div>
              
              {#if tile.tags}
                <div class="tile-tags">
                  {#each tile.tags.split(',') as tag}
                    <span class="tag">{tag.trim()}</span>
                  {/each}
                </div>
              {/if}
              
              <div class="tile-footer">
                <div class="tile-info">
                  <span class="info-item" title="Verwendungen">📊 {tile.usageCount}×</span>
                  <span class="info-item" title="Zuletzt geändert">🕒 {formatDate(tile.updatedAt)}</span>
                </div>
                
                <div class="tile-actions">
                  <a href="/admin/tiles/{tile.id}/preview" class="btn-action" title="Vorschau">
                    👁️
                  </a>
                  <a href="/admin/tiles/{tile.id}/edit" class="btn-action" title="Bearbeiten">
                    ✏️
                  </a>
                  
                  <form method="POST" action="?/duplicate" use:enhance>
                    <input type="hidden" name="id" value={tile.id} />
                    <button type="submit" class="btn-action" title="Duplizieren">
                      📋
                    </button>
                  </form>
                  
                  <form method="POST" action="?/delete" use:enhance>
                    <input type="hidden" name="id" value={tile.id} />
                    <button
                      type="submit"
                      class="btn-action danger"
                      title="Löschen"
                      onclick="return confirm('Tile wirklich löschen?')"
                    >
                      🗑️
                    </button>
                  </form>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .tile-library {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .header-content h1 {
    margin: 0;
    font-size: 2rem;
    color: #1f2937;
  }
  
  .subtitle {
    margin: 0.5rem 0 0;
    color: #6b7280;
    font-size: 0.95rem;
  }
  
  .header-actions {
    display: flex;
    gap: 0.75rem;
  }
  
  .btn-bulk {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .btn-bulk:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
  }
  
  .btn-create {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .btn-create:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }
  
  .filters {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }
  
  .search-box {
    position: relative;
    margin-bottom: 1rem;
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
  }
  
  .search-box input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  
  .search-box input:focus {
    outline: none;
    border-color: #10b981;
  }
  
  .filter-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .filter-group select {
    padding: 0.5rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.95rem;
    background: white;
    cursor: pointer;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background: #f9fafb;
    border-radius: 8px;
    transition: background 0.2s;
  }
  
  .checkbox-label:hover {
    background: #f3f4f6;
  }
  
  .checkbox-label input {
    cursor: pointer;
  }
  
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .stat {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    text-align: center;
  }
  
  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #10b981;
    margin-bottom: 0.25rem;
  }
  
  .stat-label {
    color: #6b7280;
    font-size: 0.9rem;
  }
  
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .empty-state h3 {
    margin: 0 0 0.5rem;
    color: #1f2937;
  }
  
  .empty-state p {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }
  
  .btn-secondary {
    padding: 0.75rem 1.5rem;
    background: #f3f4f6;
    color: #1f2937;
    border-radius: 8px;
    text-decoration: none;
    display: inline-block;
    font-weight: 600;
    transition: background 0.2s;
  }
  
  .btn-secondary:hover {
    background: #e5e7eb;
  }
  
  .category-section {
    margin-bottom: 3rem;
  }
  
  .category-title {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .tiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  
  .tile-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s, box-shadow 0.2s;
    border: 2px solid transparent;
  }
  
  .tile-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .tile-card.assigned {
    border-color: #10b981;
    background: linear-gradient(to bottom, #ecfdf5, white);
  }
  
  .tile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .tile-icon {
    font-size: 2rem;
  }
  
  .btn-favorite {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s;
    padding: 0;
  }
  
  .btn-favorite:hover {
    transform: scale(1.2);
  }
  
  .btn-favorite.active {
    filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.5));
  }
  
  .tile-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    color: #1f2937;
    font-weight: 600;
  }
  
  .tile-description {
    margin: 0 0 1rem;
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .tile-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .meta-badge {
    padding: 0.25rem 0.75rem;
    background: #f3f4f6;
    color: #6b7280;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  .meta-badge.chain {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .meta-badge.assigned {
    background: #d1fae5;
    color: #065f46;
  }
  
  .tile-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tag {
    padding: 0.25rem 0.5rem;
    background: #fef3c7;
    color: #92400e;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .tile-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .tile-info {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .tile-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .tile-actions form {
    display: inline;
  }
  
  .btn-action {
    background: #f3f4f6;
    border: none;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background 0.2s, transform 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn-action:hover {
    background: #e5e7eb;
    transform: scale(1.1);
  }
  
  .btn-action.danger:hover {
    background: #fee2e2;
  }
</style>
