<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  
  export let data: PageData;
  export let form: ActionData | null = null;
  
  // Status Helper
  function getDayStatus(day: any) {
    if (day.contentB) return 'completed';
    if (day.contentA && day.contentA.length > 10) return 'ready';
    return 'empty';
  }
</script>

<div class="admin-dashboard">
  <header class="dashboard-header">
    <h1>🎄 Adventskalender Control Center</h1>
    <p class="subtitle">Verwalte deinen Kalender in 3 einfachen Schritten</p>
    {#if form?.success}
      <div class="alert success">✅ {form.message}</div>
    {/if}
  </header>

  <!-- MAIN WORKFLOW -->
  <div class="workflow-grid">
    
    <!-- STEP 1: CONTENT -->
    <div class="workflow-card content-card">
      <div class="card-icon">🎨</div>
      <h2>1. Inhalte erstellen</h2>
      <p>Erstelle wiederverwendbare Kacheln für deinen Kalender.</p>
      <a href="/admin/tiles" class="primary-btn">Zur Kachel-Bibliothek</a>
      
      <div class="tools-list">
        <span class="tools-label">Helfer-Tools:</span>
        <div class="tool-links">
          <a href="/admin/quiz-builder" class="tool-link">🎯 Quiz-Baukasten</a>
          <a href="/admin/story-chain-builder" class="tool-link">📖 Geschichten-Planer</a>
          <a href="/admin/template-builder" class="tool-link">📝 Text-Generator</a>
        </div>
      </div>
    </div>

    <!-- STEP 2: PLANNING -->
    <div class="workflow-card planning-card">
      <div class="card-icon">📅</div>
      <h2>2. Kalender planen</h2>
      <p>Ziehe deine Kacheln per Drag & Drop auf die Tage.</p>
      <a href="/admin/calendar-manager" class="primary-btn">Zum Kalender-Manager</a>
      
      <div class="stats-mini">
        <div class="stat">
          <span class="stat-val">{data.days.filter(d => d.contentA).length}</span>
          <span class="stat-label">Gefüllt</span>
        </div>
        <div class="stat">
          <span class="stat-val">{data.days.filter(d => !d.contentA).length}</span>
          <span class="stat-label">Leer</span>
        </div>
      </div>
    </div>

    <!-- STEP 3: SYSTEM -->
    <div class="workflow-card system-card">
      <div class="card-icon">⚙️</div>
      <h2>3. System & Status</h2>
      <p>Einstellungen und Simulation steuern.</p>
      
      <div class="system-links">
        <a href="/admin/settings" class="system-link">⚙️ Einstellungen</a>
        <a href="/?simulation=true" target="_blank" class="system-link">🎮 Simulation starten</a>
        <form method="POST" action="?/resetTracking" use:enhance style="display: inline; width: 100%;">
          <button class="system-link danger">🔄 Tracking Reset</button>
        </form>
      </div>
    </div>
  </div>

  <!-- QUICK STATUS GRID -->
  <section class="status-section">
    <h3>📅 Kalender-Übersicht (Klicken zum Bearbeiten)</h3>
    <div class="status-grid">
      {#each data.days as day}
        <a href="/admin/days/{day.dayNumber}" class="status-day {getDayStatus(day)}">
          <span class="day-num">{day.dayNumber}</span>
          <span class="day-icon">
            {#if getDayStatus(day) === 'empty'}⚪
            {:else if getDayStatus(day) === 'completed'}✅
            {:else}✨{/if}
          </span>
        </a>
      {/each}
    </div>
  </section>
</div>

<style>
  .admin-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: #2c1810;
  }

  .dashboard-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-family: 'Georgia', serif;
    color: #d4af37;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }

  .subtitle {
    color: #f4e4c1;
    font-size: 1.2rem;
  }

  .alert {
    margin-top: 1rem;
    padding: 0.8rem;
    border-radius: 8px;
    font-weight: bold;
    display: inline-block;
  }
  .alert.success {
    background: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #2e7d32;
  }

  /* Workflow Grid */
  .workflow-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .workflow-card {
    background: rgba(244, 228, 193, 0.95);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    border: 2px solid #d4af37;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .workflow-card:hover {
    transform: translateY(-5px);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h2 {
    color: #8b0000;
    margin-bottom: 1rem;
    font-family: 'Georgia', serif;
  }

  p {
    color: #5d4037;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .primary-btn {
    background: linear-gradient(135deg, #d4af37 0%, #b4941f 100%);
    color: #2c1810;
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    transition: all 0.2s ease;
    margin-bottom: 2rem;
    display: inline-block;
    width: 100%;
  }

  .primary-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
  }

  /* Tools List */
  .tools-list {
    width: 100%;
    border-top: 1px dashed #8d6e63;
    padding-top: 1.5rem;
    margin-top: auto;
  }

  .tools-label {
    display: block;
    font-size: 0.9rem;
    color: #8d6e63;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .tool-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .tool-link {
    color: #5d4037;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 8px;
    background: rgba(255,255,255,0.5);
    transition: background 0.2s;
    font-weight: 600;
  }

  .tool-link:hover {
    background: white;
    color: #8b0000;
  }

  /* Stats */
  .stats-mini {
    display: flex;
    gap: 2rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px dashed #8d6e63;
    width: 100%;
    justify-content: center;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-val {
    font-size: 1.5rem;
    font-weight: bold;
    color: #8b0000;
  }

  .stat-label {
    font-size: 0.8rem;
    color: #5d4037;
  }

  /* System Controls */
  .system-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .system-link {
    padding: 0.8rem;
    text-align: center;
    text-decoration: none;
    color: #5d4037;
    background: rgba(255,255,255,0.5);
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    width: 100%;
    font-size: 1rem;
  }

  .system-link:hover {
    background: white;
  }

  .system-link.danger {
    color: #d32f2f;
    background: rgba(211, 47, 47, 0.1);
  }

  .system-link.danger:hover {
    background: rgba(211, 47, 47, 0.2);
  }

  /* Status Grid */
  .status-section {
    background: rgba(0, 0, 0, 0.3);
    padding: 2rem;
    border-radius: 16px;
    backdrop-filter: blur(10px);
  }

  .status-section h3 {
    color: #f4e4c1;
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
    font-family: 'Georgia', serif;
  }

  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 1rem;
  }

  .status-day {
    aspect-ratio: 1;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.2s;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .status-day:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }

  .day-num {
    color: #f4e4c1;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .day-icon {
    font-size: 0.9rem;
    margin-top: 0.2rem;
  }

  .status-day.empty {
    opacity: 0.5;
  }

  .status-day.ready {
    background: rgba(76, 175, 80, 0.2);
    border-color: #4caf50;
  }
  
  .status-day.completed {
    background: rgba(33, 150, 243, 0.2);
    border-color: #2196f3;
  }
</style>
