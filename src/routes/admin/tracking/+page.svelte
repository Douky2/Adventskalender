<script lang="ts">
  import { browser } from '$app/environment';
  
  let resetSuccess = false;
  let resetMessage = '';
  
  interface TrackingData {
    key: string;
    label: string;
    value: string | null;
    description: string;
  }
  
  let trackingData: TrackingData[] = [];
  
  function loadTrackingData() {
    if (!browser) return;
    
    trackingData = [
      {
        key: 'door9_visited',
        label: '🚂 Platform 9¾ Badge',
        value: localStorage.getItem('door9_visited'),
        description: 'Zeigt ob Türchen 9 besucht wurde und das ¾-Badge sichtbar ist'
      },
      {
        key: 'platform934_completed',
        label: '🎩 Hogwarts Challenge',
        value: localStorage.getItem('platform934_completed'),
        description: 'Zeigt ob die Platform 9¾ Challenge schon geöffnet wurde'
      }
    ];
  }
  
  function resetSingle(key: string) {
    if (!browser) return;
    
    localStorage.removeItem(key);
    resetMessage = `✅ "${trackingData.find(t => t.key === key)?.label}" wurde zurückgesetzt!`;
    resetSuccess = true;
    
    setTimeout(() => {
      resetSuccess = false;
      resetMessage = '';
      loadTrackingData();
    }, 2000);
  }
  
  function resetAll() {
    if (!browser) return;
    
    if (!confirm('Wirklich ALLE Tracking-Daten zurücksetzen? Dies kann nicht rückgängig gemacht werden.')) {
      return;
    }
    
    trackingData.forEach(item => {
      localStorage.removeItem(item.key);
    });
    
    resetMessage = '✅ Alle Tracking-Daten wurden zurückgesetzt!';
    resetSuccess = true;
    
    setTimeout(() => {
      resetSuccess = false;
      resetMessage = '';
      loadTrackingData();
    }, 2000);
  }
  
  // Daten beim Laden abrufen
  if (browser) {
    loadTrackingData();
  }
</script>

<div class="tracking-container">
  <div class="tracking-header">
    <h1>🔄 Tracking-Daten Verwaltung</h1>
    <p class="subtitle">Verwalte gespeicherte Benutzer-Tracking-Daten (localStorage)</p>
  </div>
  
  {#if resetSuccess}
    <div class="success-message">
      {resetMessage}
    </div>
  {/if}
  
  <div class="tracking-grid">
    {#each trackingData as item}
      <div class="tracking-card">
        <div class="card-header">
          <h3>{item.label}</h3>
          <span class="status" class:active={item.value}>
            {item.value ? '✅ Aktiv' : '⭕ Inaktiv'}
          </span>
        </div>
        
        <div class="card-body">
          <p class="description">{item.description}</p>
          <div class="data-display">
            <strong>Key:</strong> <code>{item.key}</code><br>
            <strong>Wert:</strong> <code>{item.value || 'null'}</code>
          </div>
        </div>
        
        <div class="card-actions">
          <button 
            class="btn-reset" 
            on:click={() => resetSingle(item.key)}
            disabled={!item.value}
          >
            🔄 Zurücksetzen
          </button>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="danger-zone">
    <h2>⚠️ Gefahrenzone</h2>
    <p>Alle Tracking-Daten auf einmal zurücksetzen:</p>
    <button class="btn-reset-all" on:click={resetAll}>
      🗑️ ALLE Tracking-Daten löschen
    </button>
  </div>
  
  <div class="info-box">
    <h3>ℹ️ Was sind Tracking-Daten?</h3>
    <ul>
      <li><strong>Platform 9¾ Badge:</strong> Wird aktiviert wenn Türchen 9 besucht wird</li>
      <li><strong>Hogwarts Challenge:</strong> Wird aktiviert wenn das ¾-Badge geklickt wird</li>
      <li><strong>Speicherort:</strong> Browser localStorage (bleibt nach Neuladen erhalten)</li>
      <li><strong>Reset:</strong> Einzeln zurücksetzen um Features erneut zu testen</li>
    </ul>
  </div>
  
  <div class="back-link">
    <a href="/admin">← Zurück zum Admin-Panel</a>
  </div>
</div>

<style>
  .tracking-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }
  
  .tracking-header {
    text-align: center;
    color: white;
    margin-bottom: 3rem;
  }
  
  .tracking-header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .success-message {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .tracking-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .tracking-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .tracking-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
  
  .card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .card-header h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .status {
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.2);
  }
  
  .status.active {
    background: rgba(56, 239, 125, 0.3);
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .description {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .data-display {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.8;
  }
  
  .data-display code {
    background: #e9ecef;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    color: #d63384;
  }
  
  .card-actions {
    padding: 1.5rem;
    border-top: 1px solid #e9ecef;
  }
  
  .btn-reset {
    width: 100%;
    padding: 0.8rem;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-reset:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
  }
  
  .btn-reset:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .danger-zone {
    background: white;
    border: 3px solid #dc3545;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .danger-zone h2 {
    color: #dc3545;
    margin-bottom: 1rem;
  }
  
  .danger-zone p {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .btn-reset-all {
    padding: 1rem 3rem;
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-reset-all:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
  }
  
  .info-box {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  .info-box h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  .info-box ul {
    list-style: none;
    padding: 0;
  }
  
  .info-box li {
    padding: 0.5rem 0;
    color: #555;
    line-height: 1.6;
  }
  
  .info-box li strong {
    color: #333;
  }
  
  .back-link {
    text-align: center;
  }
  
  .back-link a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 0.8rem 2rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    display: inline-block;
    transition: all 0.3s ease;
  }
  
  .back-link a:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .tracking-container {
      padding: 1rem;
    }
    
    .tracking-grid {
      grid-template-columns: 1fr;
    }
    
    .tracking-header h1 {
      font-size: 2rem;
    }
  }
</style>
