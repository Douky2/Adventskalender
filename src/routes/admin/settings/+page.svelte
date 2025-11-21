<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';
  
  export let data: PageData;
  export let form: ActionData;
</script>

<div class="settings-container">
  <header class="settings-header">
    <h1>⚙️ Einstellungen</h1>
    <div class="header-actions">
      <a href="/admin" class="btn-secondary">← Zurück zum Admin</a>
    </div>
  </header>
  
  {#if form?.success}
    <div class="alert alert-success">
      ✅ {form.message}
    </div>
  {/if}
  
  {#if form?.error}
    <div class="alert alert-error">
      ❌ {form.error}
    </div>
  {/if}
  
  <div class="settings-content">
    <form method="POST" action="?/updateSettings" use:enhance>
      
      <div class="settings-section">
        <h2>👤 Personen-Namen</h2>
        <p class="section-description">Diese Namen werden überall im Kalender angezeigt</p>
        
        <div class="form-group">
          <label for="authorA">
            <span class="label-icon">🧡</span>
            Person A (Orange)
          </label>
          <input 
            type="text" 
            id="authorA" 
            name="authorA" 
            value={data.settings.authorA}
            placeholder="z.B. Locdoc"
            required
          />
          <small>Standard-Ersteller der Türchen</small>
        </div>
        
        <div class="form-group">
          <label for="authorB">
            <span class="label-icon">💖</span>
            Person B (Pink)
          </label>
          <input 
            type="text" 
            id="authorB" 
            name="authorB" 
            value={data.settings.authorB}
            placeholder="z.B. Miss Chaos"
            required
          />
          <small>Kann auf Türchen antworten</small>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>📅 Kalender-Konfiguration</h2>
        
        <div class="form-row">
          <div class="form-group">
            <label for="calendarYear">
              Jahr
            </label>
            <input 
              type="number" 
              id="calendarYear" 
              name="calendarYear" 
              value={data.settings.calendarYear}
              min="2024"
              max="2030"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="calendarMonth">
              Monat (11 = Dezember)
            </label>
            <input 
              type="number" 
              id="calendarMonth" 
              name="calendarMonth" 
              value={data.settings.calendarMonth}
              min="0"
              max="11"
              required
            />
            <small>0=Januar, 11=Dezember</small>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>🔒 Sicherheit</h2>
        <p class="section-description">Leer lassen um Passwörter nicht zu ändern</p>
        
        <div class="form-group">
          <label for="calendarPassword">
            <span class="label-icon">🎄</span>
            Kalender-Passwort
          </label>
          <input 
            type="password" 
            id="calendarPassword" 
            name="calendarPassword" 
            placeholder="Leer = keine Änderung"
            autocomplete="new-password"
          />
          <small>Passwort für Zugriff auf den Kalender</small>
        </div>
        
        <div class="form-group">
          <label for="adminPassword">
            <span class="label-icon">🛠️</span>
            Admin-Passwort
          </label>
          <input 
            type="password" 
            id="adminPassword" 
            name="adminPassword" 
            placeholder="Leer = keine Änderung"
            autocomplete="new-password"
          />
          <small>Passwort für den Admin-Bereich</small>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>⚙️ Erweiterte Einstellungen</h2>
        
        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              id="simulationMode" 
              name="simulationMode"
              checked={data.settings.simulationMode}
            />
            <span class="label-icon">🔓</span>
            Simulationsmodus dauerhaft aktivieren
          </label>
          <small>Alle Türchen sind geöffnet, unabhängig vom Datum. Ideal zum Testen.</small>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              id="enableSnow" 
              name="enableSnow"
              checked={data.settings.enableSnow}
            />
            <span class="label-icon">❄️</span>
            Schnee-Effekt aktivieren
          </label>
          <small>Zeigt fallenden Schnee im Hintergrund an.</small>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              id="musicAutoplay" 
              name="musicAutoplay"
              checked={data.settings.musicAutoplay}
            />
            <span class="label-icon">🎵</span>
            Musik Autoplay
          </label>
          <small>Versucht Hintergrundmusik automatisch zu starten (kann von Browsern blockiert werden).</small>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn-primary">
          💾 Einstellungen speichern
        </button>
        <a href="/admin" class="btn-secondary">Abbrechen</a>
      </div>
      
      <div class="info-box">
        <strong>✨ Database-backed Settings:</strong> Änderungen werden in der Datenbank gespeichert und sind sofort aktiv - kein Server-Neustart nötig!
      </div>
    </form>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
  }
  
  .settings-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }
  
  h1 {
    color: white;
    font-size: 2.5rem;
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    gap: 1rem;
  }
  
  .settings-content {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  
  .settings-section {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #f0f0f0;
  }
  
  .settings-section:last-of-type {
    border-bottom: none;
  }
  
  .settings-section h2 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .section-description {
    color: #7f8c8d;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  label {
    display: block;
    color: #34495e;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .label-icon {
    margin-right: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }
  
  input:focus {
    outline: none;
    border-color: #667eea;
  }
  
  small {
    display: block;
    color: #95a5a6;
    margin-top: 0.3rem;
    font-size: 0.85rem;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .btn-secondary {
    background: #95a5a6;
    color: white;
  }
  
  .btn-secondary:hover {
    background: #7f8c8d;
  }
  
  .alert {
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  .alert-success {
    background: #d4edda;
    color: #155724;
    border: 2px solid #c3e6cb;
  }
  
  .alert-error {
    background: #f8d7da;
    color: #721c24;
    border: 2px solid #f5c6cb;
  }
  
  /* .warning-box removed - replaced with .info-box */
  
  .info-box {
    background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
    border: 2px solid #17a2b8;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    margin-top: 2rem;
    color: #0c5460;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 600;
  }
  
  .checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .settings-container {
      padding: 1rem;
    }
    
    .settings-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    h1 {
      font-size: 2rem;
    }
  }
</style>
