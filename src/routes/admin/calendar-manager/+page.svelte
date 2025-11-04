<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  let draggedTile: any = null;
  let hoveredDay: number | null = null;
  let viewMode: 'grid' | 'timeline' = 'grid';
  let showOnlyUnassigned = false;
  let selectedCategory = 'Alle';
  let searchQuery = '';
  
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
    const matchesSearch = tile.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Alle' || tile.category === selectedCategory;
    const matchesAssignment = !showOnlyUnassigned || tile.assignedToDayNumber === null;
    return matchesSearch && matchesCategory && matchesAssignment;
  });
  
  $: assignedTiles = data.tiles.filter(t => t.assignedToDayNumber !== null);
  $: unassignedTiles = data.tiles.filter(t => t.assignedToDayNumber === null);
  
  // Gruppiere Tiles nach Day
  $: tilesByDay = data.tiles.reduce((acc, tile) => {
    if (tile.assignedToDayNumber) {
      acc[tile.assignedToDayNumber] = tile;
    }
    return acc;
  }, {} as Record<number, typeof data.tiles[0]>);
  
  // Drag & Drop Handlers
  function handleDragStart(event: DragEvent, tile: any) {
    draggedTile = tile;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', tile.id.toString());
    }
  }
  
  function handleDragOver(event: DragEvent, dayNumber: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    hoveredDay = dayNumber;
  }
  
  function handleDragLeave() {
    hoveredDay = null;
  }
  
  async function handleDrop(event: DragEvent, dayNumber: number) {
    event.preventDefault();
    hoveredDay = null;
    
    if (!draggedTile) return;
    
    // Prüfe ob Tag schon eine Tile hat
    if (tilesByDay[dayNumber] && tilesByDay[dayNumber].id !== draggedTile.id) {
      if (!confirm(`Tag ${dayNumber} hat bereits eine Tile. Ersetzen?`)) {
        draggedTile = null;
        return;
      }
      
      // Entferne alte Zuweisung
      await fetch(`/admin/calendar-manager?/unassignTile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ tileId: tilesByDay[dayNumber].id.toString() })
      });
    }
    
    // Weise neue Tile zu
    const formData = new FormData();
    formData.append('tileId', draggedTile.id.toString());
    formData.append('dayNumber', dayNumber.toString());
    
    const response = await fetch('/admin/calendar-manager?/assignTile', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      window.location.reload();
    }
    
    draggedTile = null;
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
  
  function getDayInfo(dayNumber: number) {
    const day = data.days.find(d => d.dayNumber === dayNumber);
    const tile = tilesByDay[dayNumber];
    return { day, tile };
  }
  
  async function handleUnassign(tileId: number) {
    if (!confirm('Tile von Tag entfernen?')) return;
    
    const formData = new FormData();
    formData.append('tileId', tileId.toString());
    
    const response = await fetch('/admin/calendar-manager?/unassignTile', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      window.location.reload();
    }
  }
  
  function openPreview(dayNumber: number) {
    window.open(`/day/${dayNumber}?simulation=true`, '_blank');
  }
  
  // Auto-Fill Vorschlag
  function suggestAutoFill() {
    const emptyDays = [];
    for (let i = 1; i <= 24; i++) {
      if (!tilesByDay[i]) {
        emptyDays.push(i);
      }
    }
    
    if (emptyDays.length === 0) {
      alert('Alle Tage sind bereits gefüllt! 🎉');
      return;
    }
    
    const available = unassignedTiles.slice(0, emptyDays.length);
    
    if (available.length === 0) {
      alert('Keine verfügbaren Tiles mehr!');
      return;
    }
    
    if (confirm(`${available.length} Tiles für ${emptyDays.length} leere Tage vorschlagen?\n\nDies weist automatisch Tiles zu basierend auf Kategorien.`)) {
      const assignments = emptyDays.map((day, idx) => ({
        tileId: available[idx]?.id,
        dayNumber: day
      })).filter(a => a.tileId);
      
      bulkAssign(assignments);
    }
  }
  
  async function bulkAssign(assignments: any[]) {
    const formData = new FormData();
    formData.append('assignments', JSON.stringify(assignments));
    
    const response = await fetch('/admin/calendar-manager?/bulkAssign', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      window.location.reload();
    }
  }
  
  // Export / Import
  function exportCalendar() {
    const exportData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      assignments: data.tiles
        .filter(t => t.assignedToDayNumber)
        .map(t => ({
          dayNumber: t.assignedToDayNumber,
          tileId: t.id,
          title: t.title,
          category: t.category,
          contentType: t.contentType
        }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kalender-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  let fileInput: HTMLInputElement;
  
  function importCalendar() {
    fileInput.click();
  }
  
  async function handleImport(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    const text = await file.text();
    const importData = JSON.parse(text);
    
    if (!importData.assignments) {
      alert('Ungültiges Format!');
      return;
    }
    
    if (confirm(`${importData.assignments.length} Zuweisungen importieren?`)) {
      // Hier würde man die Zuweisungen anwenden
      alert('Import-Feature in Entwicklung!');
    }
  }
</script>

<div class="calendar-manager">
  <div class="header">
    <div class="header-content">
      <a href="/admin" class="back-link">← Zurück zum Admin</a>
      <h1>📅 Calendar Manager</h1>
      <p class="subtitle">Drag & Drop Tiles auf Kalender-Tage</p>
    </div>
    
    <div class="header-actions">
      <button class="btn-action" on:click={suggestAutoFill} title="Automatisch passende Tiles für leere Tage vorschlagen">
        ✨ Auto-Fill Vorschlag
      </button>
      <button class="btn-action" on:click={exportCalendar} title="Kalender-Zuweisungen als Datei exportieren">
        📤 Export
      </button>
      <button class="btn-action" on:click={importCalendar} title="Kalender-Zuweisungen aus Datei importieren">
        📥 Import
      </button>
      <input
        type="file"
        accept=".json"
        bind:this={fileInput}
        on:change={handleImport}
        style="display: none"
      />
    </div>
  </div>
  
  <div class="manager-intro">
    <div class="intro-icon">🎯</div>
    <div class="intro-content">
      <h3>So einfach geht's:</h3>
      <ol>
        <li><strong>Tile schnappen:</strong> Klicke auf eine Tile rechts und halte die Maustaste gedrückt</li>
        <li><strong>Auf Tag ziehen:</strong> Ziehe die Tile auf einen Kalender-Tag links (1-24)</li>
        <li><strong>Loslassen:</strong> Die Tile wird automatisch zugewiesen! ✓</li>
      </ol>
      <div class="intro-tips">
        <div class="tip">
          💡 <strong>Tipp:</strong> Nutze die Filter rechts um schneller Tiles zu finden
        </div>
        <div class="tip">
          ⚡ <strong>Schnell-Funktion:</strong> "Auto-Fill Vorschlag" füllt leere Tage automatisch aus
        </div>
      </div>
    </div>
  </div>
  
  <div class="stats-bar">
    <div class="stat">
      <span class="stat-number">{assignedTiles.length}</span>
      <span class="stat-label">Zugewiesen</span>
      <span class="stat-help" title="Anzahl der Tiles die bereits einem Tag zugewiesen sind">ⓘ</span>
    </div>
    <div class="stat">
      <span class="stat-number">{24 - assignedTiles.length}</span>
      <span class="stat-label">Leer</span>
      <span class="stat-help" title="Anzahl der Tage die noch keine Tile haben">ⓘ</span>
    </div>
    <div class="stat">
      <span class="stat-number">{unassignedTiles.length}</span>
      <span class="stat-label">Verfügbar</span>
      <span class="stat-help" title="Anzahl der Tiles die noch keinem Tag zugewiesen sind">ⓘ</span>
    </div>
    <div class="stat">
      <div class="progress-bar">
        <div class="progress-fill" style="width: {(assignedTiles.length / 24) * 100}%"></div>
      </div>
      <span class="stat-label">{Math.round((assignedTiles.length / 24) * 100)}% Komplett</span>
    </div>
  </div>
  
  <div class="manager-layout">
    <!-- CALENDAR GRID -->
    <div class="calendar-section">
      <div class="section-header">
        <h2>📅 Kalender (1-24)</h2>
        <span class="section-help">Hier landest du die Tiles per Drag & Drop</span>
        <div class="view-toggle">
          <button
            class="toggle-btn"
            class:active={viewMode === 'grid'}
            on:click={() => viewMode = 'grid'}
            title="Kalender als Raster anzeigen (6x4 Grid)"
          >
            ⊞ Grid
          </button>
          <button
            class="toggle-btn"
            class:active={viewMode === 'timeline'}
            on:click={() => viewMode = 'timeline'}
            title="Kalender als vertikale Timeline anzeigen"
          >
            ═ Timeline
          </button>
        </div>
      </div>
      
      {#if viewMode === 'grid'}
        <div class="calendar-grid">
          {#each Array(24) as _, i}
            {@const dayNumber = i + 1}
            {@const { tile, day } = getDayInfo(dayNumber)}
            <div
              class="calendar-day"
              class:has-tile={tile}
              class:hovered={hoveredDay === dayNumber}
              on:dragover={(e) => handleDragOver(e, dayNumber)}
              on:dragleave={handleDragLeave}
              on:drop={(e) => handleDrop(e, dayNumber)}
              role="button"
              tabindex="0"
            >
              <div class="day-number">{dayNumber}</div>
              
              {#if tile}
                <div class="day-tile">
                  <div class="tile-icon">{getContentTypeIcon(tile.contentType)}</div>
                  <div class="tile-name">{tile.title}</div>
                  <div class="tile-category">{tile.category}</div>
                  
                  <div class="tile-actions">
                    <button
                      class="tile-action-btn"
                      on:click={() => openPreview(dayNumber)}
                      title="Vorschau"
                    >
                      👁️
                    </button>
                    <button
                      class="tile-action-btn"
                      on:click={() => handleUnassign(tile.id)}
                      title="Entfernen"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              {:else}
                <div class="day-empty">
                  <div class="empty-icon">📦</div>
                  <div class="empty-text">Leer</div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <div class="calendar-timeline">
          {#each Array(24) as _, i}
            {@const dayNumber = i + 1}
            {@const { tile } = getDayInfo(dayNumber)}
            <div
              class="timeline-day"
              class:has-tile={tile}
              class:hovered={hoveredDay === dayNumber}
              on:dragover={(e) => handleDragOver(e, dayNumber)}
              on:dragleave={handleDragLeave}
              on:drop={(e) => handleDrop(e, dayNumber)}
              role="button"
              tabindex="0"
            >
              <div class="timeline-number">Tag {dayNumber}</div>
              {#if tile}
                <div class="timeline-tile">
                  <span class="timeline-icon">{getContentTypeIcon(tile.contentType)}</span>
                  <span class="timeline-title">{tile.title}</span>
                  <span class="timeline-category">{tile.category}</span>
                  <button
                    class="timeline-remove"
                    on:click={() => handleUnassign(tile.id)}
                  >
                    ✕
                  </button>
                </div>
              {:else}
                <div class="timeline-empty">Drop Tile hier</div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
    
    <!-- TILE LIBRARY SIDEBAR -->
    <div class="tiles-section">
      <div class="section-header">
        <h2>🎨 Tiles</h2>
        <span class="section-help">Ziehe diese auf Kalender-Tage</span>
        <a href="/admin/tiles/new" class="btn-new" title="Neue Tile in der Library erstellen">➕ Neu</a>
      </div>
      
      <div class="filters">
        <input
          type="text"
          placeholder="🔍 Suchen..."
          bind:value={searchQuery}
          class="search-input"
          title="Nach Titel oder Tags suchen"
        />
        
        <select bind:value={selectedCategory} class="category-select" title="Nach Kategorie filtern">
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
        
        <label class="filter-checkbox" title="Nur Tiles anzeigen die noch nicht zugewiesen sind">
          <input type="checkbox" bind:checked={showOnlyUnassigned} />
          Nur Verfügbare
        </label>
      </div>
      
      <div class="tiles-list">
        {#each filteredTiles as tile (tile.id)}
          <div
            class="tile-item"
            class:assigned={tile.assignedToDayNumber}
            draggable="true"
            on:dragstart={(e) => handleDragStart(e, tile)}
            role="button"
            tabindex="0"
          >
            <div class="tile-header">
              <span class="tile-icon">{getContentTypeIcon(tile.contentType)}</span>
              {#if tile.isFavorite}
                <span class="favorite-badge">⭐</span>
              {/if}
            </div>
            
            <div class="tile-title">{tile.title}</div>
            <div class="tile-meta">
              <span class="meta-badge">{tile.category}</span>
              {#if tile.assignedToDayNumber}
                <span class="meta-badge assigned">📅 Tag {tile.assignedToDayNumber}</span>
              {/if}
            </div>
            
            <div class="tile-footer">
              <span class="tile-usage">📊 {tile.usageCount}×</span>
              <a href="/admin/tiles/{tile.id}/edit" class="tile-edit">✏️</a>
            </div>
          </div>
        {/each}
        
        {#if filteredTiles.length === 0}
          <div class="empty-tiles">
            <div class="empty-icon">🔍</div>
            <p>Keine Tiles gefunden</p>
            <a href="/admin/tiles/new" class="btn-create">Erste Tile erstellen</a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .calendar-manager {
    max-width: 1800px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  
  .manager-intro {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
    border: 2px solid #f59e0b;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    animation: slideDown 0.5s ease-out;
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .manager-intro .intro-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }
  
  .manager-intro .intro-content {
    flex: 1;
  }
  
  .manager-intro .intro-content h3 {
    margin: 0 0 0.75rem 0;
    color: #92400e;
    font-size: 1.2rem;
  }
  
  .manager-intro .intro-content ol {
    margin: 0 0 1rem 0;
    padding-left: 1.5rem;
    line-height: 1.6;
  }
  
  .manager-intro .intro-content ol li {
    margin-bottom: 0.5rem;
    color: #78350f;
  }
  
  .manager-intro .intro-content ol li strong {
    color: #92400e;
  }
  
  .intro-tips {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  
  .intro-tips .tip {
    background: white;
    padding: 0.75rem;
    border-radius: 8px;
    border-left: 3px solid #10b981;
    font-size: 0.9rem;
    color: #065f46;
  }
  
  .intro-tips .tip strong {
    color: #047857;
  }
  
  .stat-help {
    display: inline-block;
    margin-left: 0.25rem;
    width: 16px;
    height: 16px;
    background: #e5e7eb;
    border-radius: 50%;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    cursor: help;
    transition: all 0.2s;
  }
  
  .stat-help:hover {
    background: #3b82f6;
    color: white;
    transform: scale(1.2);
  }
  
  .section-help {
    color: #6b7280;
    font-size: 0.9rem;
    font-style: italic;
    margin-left: 0.5rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  
  .header-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .btn-action {
    padding: 0.75rem 1.5rem;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-action:hover {
    border-color: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  }
  
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
    font-size: 2.5rem;
    font-weight: 700;
    color: #10b981;
    margin-bottom: 0.25rem;
  }
  
  .stat-label {
    color: #6b7280;
    font-size: 0.9rem;
  }
  
  .progress-bar {
    width: 100%;
    height: 12px;
    background: #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981, #059669);
    transition: width 0.3s;
  }
  
  .manager-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
  }
  
  .calendar-section,
  .tiles-section {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .section-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #1f2937;
  }
  
  .view-toggle {
    display: flex;
    gap: 0.5rem;
  }
  
  .toggle-btn {
    padding: 0.5rem 1rem;
    background: #f3f4f6;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .toggle-btn.active {
    background: #10b981;
    color: white;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
  }
  
  .calendar-day {
    aspect-ratio: 1;
    background: #f9fafb;
    border: 3px dashed #d1d5db;
    border-radius: 12px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
  }
  
  .calendar-day.has-tile {
    border-style: solid;
    border-color: #10b981;
    background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
  }
  
  .calendar-day.hovered {
    border-color: #3b82f6;
    background: #dbeafe;
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  }
  
  .day-number {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: #9ca3af;
  }
  
  .calendar-day.has-tile .day-number {
    color: #059669;
  }
  
  .day-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }
  
  .tile-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .tile-name {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .tile-category {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .tile-actions {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.5rem;
  }
  
  .tile-action-btn {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  
  .tile-action-btn:hover {
    background: #f3f4f6;
    transform: scale(1.1);
  }
  
  .day-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    opacity: 0.5;
  }
  
  .empty-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .empty-text {
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .calendar-timeline {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .timeline-day {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f9fafb;
    border: 2px dashed #d1d5db;
    border-radius: 12px;
    transition: all 0.2s;
  }
  
  .timeline-day.has-tile {
    border-style: solid;
    border-color: #10b981;
    background: #ecfdf5;
  }
  
  .timeline-day.hovered {
    border-color: #3b82f6;
    background: #dbeafe;
    transform: translateX(8px);
  }
  
  .timeline-number {
    min-width: 80px;
    font-weight: 700;
    color: #6b7280;
  }
  
  .timeline-tile {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .timeline-icon {
    font-size: 1.5rem;
  }
  
  .timeline-title {
    flex: 1;
    font-weight: 600;
    color: #1f2937;
  }
  
  .timeline-category {
    padding: 0.25rem 0.75rem;
    background: white;
    border-radius: 6px;
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .timeline-remove {
    background: #fee2e2;
    border: none;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .timeline-remove:hover {
    background: #fca5a5;
  }
  
  .timeline-empty {
    flex: 1;
    color: #9ca3af;
    font-style: italic;
  }
  
  .filters {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .search-input,
  .category-select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .search-input:focus,
  .category-select:focus {
    outline: none;
    border-color: #10b981;
  }
  
  .filter-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .tiles-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 70vh;
    overflow-y: auto;
  }
  
  .tile-item {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 1rem;
    cursor: grab;
    transition: all 0.2s;
  }
  
  .tile-item:active {
    cursor: grabbing;
  }
  
  .tile-item:hover {
    border-color: #10b981;
    transform: translateX(-4px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  }
  
  .tile-item.assigned {
    opacity: 0.6;
    border-style: dashed;
  }
  
  .tile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .tile-icon {
    font-size: 1.5rem;
  }
  
  .favorite-badge {
    font-size: 1rem;
  }
  
  .tile-title {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  
  .tile-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .meta-badge {
    padding: 0.25rem 0.5rem;
    background: #f3f4f6;
    border-radius: 6px;
    font-size: 0.8rem;
    color: #6b7280;
  }
  
  .meta-badge.assigned {
    background: #d1fae5;
    color: #065f46;
  }
  
  .tile-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.75rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .tile-usage {
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .tile-edit {
    padding: 0.25rem 0.5rem;
    background: #f3f4f6;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s;
  }
  
  .tile-edit:hover {
    background: #e5e7eb;
  }
  
  .btn-new {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s;
  }
  
  .btn-new:hover {
    transform: translateY(-2px);
  }
  
  .empty-tiles {
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .empty-tiles .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .btn-create {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: #10b981;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
  }
  
  @media (max-width: 1400px) {
    .manager-layout {
      grid-template-columns: 1fr;
    }
    
    .calendar-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .calendar-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
