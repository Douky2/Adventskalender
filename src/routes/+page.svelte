<script lang="ts">
  export let data;
  
  import { onMount } from 'svelte';
  import { fade, scale, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import ChristmasDecor from '$lib/components/ChristmasDecor.svelte';
  
  let mounted = false;
  
  // Platform 9¾ Easter Egg
  let showPlatform934 = false;
  let door9Visited = false;
  
  // Prüfe ob Türchen 9 schon besucht wurde (localStorage)
  onMount(() => {
    if (typeof window !== 'undefined') {
      door9Visited = localStorage.getItem('door9_visited') === 'true';
    }
    mounted = true;
  });
  
  function handleThreeQuartersClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    showPlatform934 = true;
  }
  
  function closePlatform934() {
    showPlatform934 = false;
  }
  
  // Markiere Türchen 9 als besucht wenn es geöffnet wird
  function markDoor9Visited() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('door9_visited', 'true');
      door9Visited = true;
    }
  }
</script>

<svelte:head>
  <title>Unser Adventskalender 🎄</title>
</svelte:head>

<!-- Christmas Decorations Component -->
<ChristmasDecor />

<div class="container">
  <header>
    <div class="header-decoration">✨</div>
    <h1>🎄 Unser digitaler Adventskalender 🎄</h1>
    <p class="date-display">
      Heute ist der {data.currentDay}. {data.currentMonth === 12 ? 'Dezember' : 'November'} {data.currentYear}
    </p>
    <p class="subtitle">
      Ein besonderer Ort nur für <span class="highlight-orange">Locdoc</span> und <span class="highlight-pink">Miss Chaos</span> ❤️
    </p>
    
    {#if data.simulationMode}
      <div class="simulation-banner" in:fade>
        🎮 <strong>SIMULATIONSMODUS AKTIV</strong> - Alle Türchen sind geöffnet zum Testen!
      </div>
    {/if}
  </header>
  
  <div class="calendar-grid">
    {#each data.days as day, i}
      {#if mounted}
        <a 
          href="/day/{day.dayNumber}{data.simulationMode ? '?simulation=true' : ''}" 
          class="calendar-door"
          class:locked={day.isLocked}
          class:unlocked={!day.isLocked}
          class:door-9-visited={day.dayNumber === 9 && door9Visited && !day.isLocked}
          on:click={() => {
            if (day.dayNumber === 9 && !day.isLocked) {
              markDoor9Visited();
            }
          }}
          in:scale={{
            duration: 400,
            delay: i * 50,
            easing: cubicOut,
            start: 0.8
          }}
        >
          <div class="door-content">
            <div class="door-number">{day.dayNumber}</div>
            {#if day.isLocked}
              <div class="lock-icon">🔒</div>
            {:else}
              <div class="unlock-icon">✨</div>
            {/if}
            
            <!-- Platform 9¾ Easter Egg (nur wenn Türchen 9 besucht wurde) -->
            {#if day.dayNumber === 9 && door9Visited && !day.isLocked}
              <button 
                class="platform-934-badge" 
                on:click={handleThreeQuartersClick}
                in:scale={{ duration: 500, delay: 300 }}
              >
                <span class="badge-text">¾</span>
                <span class="badge-wand">🪄</span>
              </button>
            {/if}
          </div>
          <div class="door-shine"></div>
        </a>
      {/if}
    {/each}
  </div>
  
  <footer>
    <p>💕 Mit Liebe erstellt für unsere Fernbeziehung 💕</p>
    <p><a href="/admin" class="admin-link">🛠️ Admin-Panel</a></p>
  </footer>
</div>

<!-- Platform 9¾ Modal -->
{#if showPlatform934}
  <div 
    class="platform-overlay" 
    on:click={closePlatform934} 
    on:keydown={(e) => e.key === 'Escape' && closePlatform934()}
    role="button"
    tabindex="0"
    transition:fade={{ duration: 300 }}
  >
    <div 
      class="platform-modal" 
      on:click|stopPropagation 
      on:keydown|stopPropagation
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      transition:fly={{ y: 50, duration: 500, easing: cubicOut }}
    >
      <button class="platform-close" on:click={closePlatform934}>✕</button>
      
      <div class="platform-header">
        <h2>🚂 Platform 9¾ 🪄</h2>
        <div class="platform-subtitle">Hogwarts Express - Weihnachts-Special</div>
      </div>
      
      <div class="platform-content">
        <div class="train-decoration">
          <div class="train">�</div>
          <div class="steam">💨💨�</div>
        </div>
        
        <div class="hogwarts-letter">
          <h3>🦁 Magische Weihnachts-Challenge 🐍</h3>
          
          <p><strong>Liebe Locdoc & Miss Chaos,</strong></p>
          
          <p>Willkommen auf Platform 9¾! Der Hogwarts Express hat eine besondere Weihnachtsmission für euch:</p>
          
          <div class="challenge-box gryffindor">
            <h4>🦁 GRYFFINDOR - Tapferkeit zeigen</h4>
            <p><strong>Locdoc's Aufgabe:</strong> Schreibe einen mutigen Brief über deine Zukunftswünsche mit Miss Chaos. Was möchtest du 2026 gemeinsam erleben?</p>
          </div>
          
          <div class="challenge-box slytherin">
            <h4>🐍 SLYTHERIN - Ehrgeiz & List</h4>
            <p><strong>Miss Chaos' Aufgabe:</strong> Plane eine geheime Überraschung für euer nächstes Treffen. Schreib Hinweise wie ein Rätsel!</p>
          </div>
          
          <div class="challenge-box ravenclaw">
            <h4>🦅 RAVENCLAW - Weisheit teilen</h4>
            <p><strong>Gemeinsam:</strong> Erstellt eine Liste mit 10 Dingen, die ihr aus eurer Fernbeziehung gelernt habt.</p>
          </div>
          
          <div class="challenge-box hufflepuff">
            <h4>🦡 HUFFLEPUFF - Treue beweisen</h4>
            <p><strong>Beide:</strong> Schreibt ein gemeinsames Versprechen für 2025 - etwas, das ihr füreinander tun wollt.</p>
          </div>
          
          <div class="hogwarts-quote">
            <p><em>"After all this time?"</em></p>
            <p><em>"Always." ⚡</em></p>
            <p class="quote-author">- Trotz der Distanz, für immer verbunden -</p>
          </div>
          
          <div class="bonus-idea">
            <h4>🎄 Weihnachts-Bonus-Idee</h4>
            <ul>
              <li><strong>Harry Potter Marathon:</strong> Schaut alle 8 Filme zusammen via Discord Screenshare (mit Pausen & Snacks!)</li>
              <li><strong>Butterbier-Rezept:</strong> Beide machen Butterbier und trinken zeitgleich beim Video-Call</li>
              <li><strong>Hogwarts Mystery:</strong> Spielt das Handy-Spiel zusammen und tauscht Screenshots aus</li>
              <li><strong>Patronus-Quiz:</strong> Macht beide den Pottermore-Test und vergleicht eure Patronus-Tiere</li>
              <li><strong>Zauberstab-Wahl:</strong> Kauft euch gegenseitig symbolische "Zauberstäbe" (z.B. schöne Stifte) als Geschenk</li>
            </ul>
          </div>
        </div>
        
        <div class="platform-footer">
          <p>🎫 Fahrkarte gültig für: Locdoc & Miss Chaos</p>
          <p>🪄 Mischief Managed! 🪄</p>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #1a2332 0%, #1f2d3d 20%, #243848 40%, #1e3240 60%, #192a38 80%, #14222e 100%);
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  
  :global(body)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 15% 40%, rgba(255, 215, 0, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 85% 70%, rgba(220, 120, 120, 0.10) 0%, transparent 45%),
      radial-gradient(circle at 50% 30%, rgba(180, 220, 255, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 70% 50%, rgba(255, 180, 100, 0.09) 0%, transparent 45%),
      radial-gradient(circle at 30% 80%, rgba(200, 150, 255, 0.07) 0%, transparent 40%);
    pointer-events: none;
    animation: backgroundFloat 25s ease-in-out infinite;
  }
  
  @keyframes backgroundFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.02); }
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    position: relative;
    z-index: 1;
  }
  
  header {
    text-align: center;
    color: white;
    margin-bottom: 4rem;
    position: relative;
  }
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.3),
      0 0 30px rgba(255, 255, 255, 0.2),
      2px 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 800;
    letter-spacing: 2px;
    animation: headerGlow 3s ease-in-out infinite;
  }
  
  @keyframes headerGlow {
    0%, 100% { 
      text-shadow: 
        0 0 10px rgba(255, 255, 255, 0.5),
        0 0 20px rgba(255, 255, 255, 0.3),
        0 0 30px rgba(255, 255, 255, 0.2),
        2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    50% { 
      text-shadow: 
        0 0 15px rgba(255, 255, 255, 0.7),
        0 0 30px rgba(255, 255, 255, 0.5),
        0 0 45px rgba(255, 255, 255, 0.3),
        2px 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
  
  .date-display {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    opacity: 0.95;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
    perspective: 1000px;
  }
  
  @media (min-width: 768px) {
    .calendar-grid {
      grid-template-columns: repeat(6, 1fr);
      gap: 2.5rem;
    }
  }
  
  @media (min-width: 1200px) {
    .calendar-grid {
      gap: 3rem;
    }
  }
  
  .calendar-door {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #2c3e50, #34495e);
    border-radius: 20px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.1),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    border: 3px solid rgba(255, 255, 255, 0.5);
  }
  
  .calendar-door::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .calendar-door.unlocked::before {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e063 50%, #7bed9f 100%);
    opacity: 0.15;
  }
  
  .calendar-door::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .calendar-door:hover::before {
    opacity: 0.2;
  }
  
  .calendar-door:hover::after {
    opacity: 1;
    animation: lightPulse 2s ease-in-out infinite;
  }
  
  @keyframes lightPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.6; }
  }
  
  .calendar-door.unlocked:hover {
    transform: translateY(-10px) scale(1.08) rotateZ(2deg);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(126, 237, 159, 0.5);
  }
  
  .calendar-door:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 
      0 16px 32px rgba(0, 0, 0, 0.25),
      0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .calendar-door.locked {
    cursor: not-allowed;
    opacity: 0.6;
    background: linear-gradient(145deg, #1a252f, #2c3e50);
  }
  
  .calendar-door.locked:hover {
    transform: rotate(-2deg) scale(0.98);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .door-content {
    position: relative;
    z-index: 2;
    text-align: center;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }
  
  .door-number {
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .calendar-door.unlocked .door-number {
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: numberGlow 2s ease-in-out infinite;
  }
  
  @keyframes numberGlow {
    0%, 100% { 
      filter: drop-shadow(0 0 2px rgba(46, 204, 113, 0.5));
    }
    50% { 
      filter: drop-shadow(0 0 8px rgba(46, 204, 113, 0.8));
    }
  }
  
  .lock-icon {
    font-size: 2rem;
    animation: lockShake 3s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
  
  @keyframes lockShake {
    0%, 100% { transform: rotate(0deg); }
    10%, 30% { transform: rotate(-3deg); }
    20%, 40% { transform: rotate(3deg); }
  }
  
  .unlock-icon {
    font-size: 2rem;
    animation: sparkle 1.5s ease-in-out infinite;
    filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.8));
  }
  
  @keyframes sparkle {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.2) rotate(-10deg);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.3) rotate(10deg);
      opacity: 1;
    }
    75% {
      transform: scale(1.2) rotate(-10deg);
      opacity: 0.8;
    }
  }
  
  .header-decoration {
    font-size: 3rem;
    animation: float 3s ease-in-out infinite;
    display: inline-block;
    margin-bottom: 1rem;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .highlight-orange {
    color: #ff9800;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(255, 152, 0, 0.5);
  }
  
  .highlight-pink {
    color: #ff4d94;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(255, 77, 148, 0.5);
  }
  
  .simulation-banner {
    background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%);
    color: white;
    padding: 1.2rem 2.5rem;
    border-radius: 16px;
    margin-top: 2rem;
    font-size: 1.2rem;
    box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4);
    animation: pulse 2s ease-in-out infinite;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 8px 24px rgba(255, 107, 107, 0.4);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 12px 32px rgba(255, 107, 107, 0.6);
      transform: scale(1.02);
    }
  }
  
  /* Christmas decorations CSS moved to ChristmasDecor.svelte component */
  
  .door-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.4) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.8s ease;
    z-index: 1;
  }
  
  .calendar-door.unlocked:hover .door-shine {
    transform: translateX(100%);
  }

  footer {
    text-align: center;
    color: white;
    margin-top: 4rem;
    padding: 3rem 0;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }
  
  footer p {
    font-size: 1.2rem;
    opacity: 0.95;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .admin-link {
    color: white;
    text-decoration: none;
    padding: 0.8rem 2rem;
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.3) 0%, rgba(255, 77, 148, 0.3) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    transition: all 0.3s ease;
    display: inline-block;
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .admin-link:hover {
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.5) 0%, rgba(255, 77, 148, 0.5) 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  /* Platform 9¾ Badge (erscheint zwischen Zahl und Sparkles) */
  .platform-934-badge {
    position: relative;
    background: linear-gradient(135deg, #740001 0%, #ae0001 100%);
    border: 2px solid #d4af37;
    color: #ffd700;
    font-size: 0.85rem;
    font-weight: 900;
    padding: 0.2rem 0.6rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 
      0 4px 8px rgba(116, 0, 1, 0.4),
      0 0 15px rgba(212, 175, 55, 0.3),
      inset 0 1px 5px rgba(255, 215, 0, 0.2);
    font-family: Georgia, serif;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    z-index: 10;
    margin-top: 0.15rem;
    margin-bottom: 0.4rem;
    overflow: hidden;
  }
  
  .platform-934-badge::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
    animation: magicPulse 2s ease-in-out infinite;
    z-index: -1;
  }
  
  @keyframes magicPulse {
    0%, 100% { 
      transform: translate(-50%, -50%) scale(1); 
      opacity: 0.3; 
    }
    50% { 
      transform: translate(-50%, -50%) scale(1.3); 
      opacity: 0.6; 
    }
  }
  
  .badge-text {
    position: relative;
    z-index: 2;
    text-shadow: 
      0 0 8px rgba(255, 215, 0, 0.8),
      1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .badge-wand {
    position: relative;
    z-index: 2;
    font-size: 0.75rem;
    animation: wandFloat 1.5s ease-in-out infinite;
  }
  
  @keyframes wandFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-2px) rotate(10deg); }
  }
  
  .platform-934-badge:hover {
    transform: translateY(-2px) scale(1.1);
    box-shadow: 
      0 8px 16px rgba(116, 0, 1, 0.6),
      0 0 25px rgba(255, 215, 0, 0.6),
      inset 0 1px 8px rgba(255, 215, 0, 0.4);
  }
  
  .door-9-visited {
    animation: door9Glow 3s ease-in-out infinite;
  }
  
  @keyframes door9Glow {
    0%, 100% { 
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    50% { 
      box-shadow: 
        0 8px 16px rgba(0, 0, 0, 0.2),
        0 0 30px rgba(255, 215, 0, 0.3);
    }
  }
  
  /* Platform 9¾ Modal */
  .platform-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    backdrop-filter: blur(10px);
  }
  
  .platform-modal {
    background: linear-gradient(135deg, #2c1810 0%, #3d2314 100%);
    border: 4px solid #d4af37;
    border-radius: 20px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 
      0 0 50px rgba(212, 175, 55, 0.5),
      inset 0 0 100px rgba(0, 0, 0, 0.5);
  }
  
  .platform-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(139, 0, 0, 0.8);
    border: 2px solid #d4af37;
    color: white;
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
  }
  
  .platform-close:hover {
    background: #8b0000;
    transform: rotate(90deg);
  }
  
  .platform-header {
    background: linear-gradient(135deg, #740001 0%, #ae0001 100%);
    padding: 2rem;
    text-align: center;
    border-bottom: 3px solid #d4af37;
  }
  
  .platform-header h2 {
    color: #ffd700;
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    text-shadow: 
      0 0 10px rgba(255, 215, 0, 0.8),
      2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: Georgia, serif;
  }
  
  .platform-subtitle {
    color: #f4e4c1;
    font-size: 1.2rem;
    font-style: italic;
  }
  
  .platform-content {
    padding: 2rem;
    color: #f4e4c1;
  }
  
  .train-decoration {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-direction: row-reverse;
    position: relative;
    padding: 2rem 0;
  }
  
  .train-decoration::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 100%;
    background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
    animation: magicGlow 3s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes magicGlow {
    0%, 100% { 
      opacity: 0.3;
      transform: translateX(-50%) scale(1);
    }
    50% { 
      opacity: 0.7;
      transform: translateX(-50%) scale(1.1);
    }
  }
  
  .steam {
    animation: steamMagic 3s ease-in-out infinite;
    opacity: 0.6;
    filter: drop-shadow(0 0 10px rgba(135, 206, 235, 0.5));
  }
  
  @keyframes steamMagic {
    0%, 100% { 
      transform: translateX(0) scale(1) rotate(0deg); 
      opacity: 0.6; 
    }
    25% {
      transform: translateX(-15px) scale(1.3) rotate(-10deg);
      opacity: 0.8;
    }
    50% { 
      transform: translateX(-25px) scale(1.1) rotate(5deg); 
      opacity: 0.3; 
    }
    75% {
      transform: translateX(-10px) scale(1.2) rotate(-5deg);
      opacity: 0.5;
    }
  }
  
  .train {
    animation: trainMagic 4s ease-in-out infinite;
    position: relative;
    z-index: 2;
  }
  
  .train::after {
    content: '✨';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    animation: sparkleFloat 2s ease-in-out infinite;
    opacity: 0;
  }
  
  @keyframes trainMagic {
    0%, 100% { 
      transform: translateY(0) scale(1); 
      filter: drop-shadow(0 5px 10px rgba(116, 0, 1, 0.3));
    }
    25% {
      transform: translateY(-8px) scale(1.05) rotate(2deg);
      filter: drop-shadow(0 8px 15px rgba(116, 0, 1, 0.5));
    }
    50% { 
      transform: translateY(-5px) scale(0.98) rotate(-1deg); 
      filter: drop-shadow(0 10px 20px rgba(116, 0, 1, 0.4));
    }
    75% {
      transform: translateY(-3px) scale(1.02) rotate(1deg);
      filter: drop-shadow(0 7px 12px rgba(116, 0, 1, 0.4));
    }
  }
  
  @keyframes sparkleFloat {
    0%, 100% { 
      opacity: 0;
      transform: translateX(-50%) translateY(0);
    }
    50% { 
      opacity: 1;
      transform: translateX(-50%) translateY(-10px);
    }
  }
  
  .hogwarts-letter {
    background: rgba(244, 228, 193, 0.1);
    border: 2px solid #d4af37;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  .hogwarts-letter h3 {
    color: #ffd700;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-family: Georgia, serif;
  }
  
  .hogwarts-letter p {
    line-height: 1.8;
    margin-bottom: 1rem;
  }
  
  .challenge-box {
    margin: 1.5rem 0;
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 5px solid;
  }
  
  .gryffindor {
    background: linear-gradient(135deg, rgba(116, 0, 1, 0.3) 0%, rgba(174, 0, 1, 0.3) 100%);
    border-color: #d4af37;
  }
  
  .gryffindor h4 {
    color: #ffd700;
    margin-top: 0;
  }
  
  .slytherin {
    background: linear-gradient(135deg, rgba(26, 71, 42, 0.3) 0%, rgba(42, 102, 62, 0.3) 100%);
    border-color: silver;
  }
  
  .slytherin h4 {
    color: silver;
    margin-top: 0;
  }
  
  .ravenclaw {
    background: linear-gradient(135deg, rgba(13, 30, 64, 0.3) 0%, rgba(34, 67, 123, 0.3) 100%);
    border-color: #946b2d;
  }
  
  .ravenclaw h4 {
    color: #946b2d;
    margin-top: 0;
  }
  
  .hufflepuff {
    background: linear-gradient(135deg, rgba(236, 178, 46, 0.2) 0%, rgba(255, 214, 10, 0.2) 100%);
    border-color: #ecb22e;
  }
  
  .hufflepuff h4 {
    color: #ecb22e;
    margin-top: 0;
  }
  
  .hogwarts-quote {
    text-align: center;
    margin: 2rem 0;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    font-family: Georgia, serif;
  }
  
  .hogwarts-quote p {
    font-size: 1.3rem;
    color: #ffd700;
    margin: 0.5rem 0;
    font-style: italic;
  }
  
  .quote-author {
    font-size: 1rem !important;
    color: silver !important;
    margin-top: 1rem !important;
  }
  
  .bonus-idea {
    background: linear-gradient(135deg, rgba(116, 0, 1, 0.2) 0%, rgba(26, 71, 42, 0.2) 100%);
    border: 2px solid #d4af37;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 2rem;
  }
  
  .bonus-idea h4 {
    color: #ffd700;
    font-size: 1.5rem;
    margin-top: 0;
  }
  
  .bonus-idea ul {
    list-style: none;
    padding: 0;
  }
  
  .bonus-idea li {
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  }
  
  .bonus-idea li:last-child {
    border-bottom: none;
  }
  
  .bonus-idea strong {
    color: #ffd700;
  }
  
  .platform-footer {
    background: rgba(0, 0, 0, 0.3);
    padding: 1.5rem;
    text-align: center;
    border-top: 3px solid #d4af37;
    color: #f4e4c1;
  }
  
  .platform-footer p {
    margin: 0.5rem 0;
    font-family: Georgia, serif;
  }
  
  /* All decoration styles moved to ChristmasDecor.svelte component */
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .calendar-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  }
</style>
