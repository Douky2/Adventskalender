<script lang="ts">
  export let data;
  
  import { onMount } from 'svelte';
  import { fade, scale, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { goto } from '$app/navigation';
  
  let mounted = false;
  let openingDoor: number | null = null;
  
  // Platform 9¾ Easter Egg
  let showPlatform934 = false;
  let door9Visited = false;
  let mapRevealed = false;
  
  // Prüfe ob Türchen 9 schon besucht wurde (localStorage)
  onMount(() => {
    if (typeof window !== 'undefined') {
      door9Visited = localStorage.getItem('door9_visited') === 'true';
    }
    mounted = true;
  });
  
  function handleDoorClick(day: any) {
    if (day.isLocked) return;
    
    if (day.dayNumber === 9) {
      markDoor9Visited();
    }

    openingDoor = day.dayNumber;
    
    setTimeout(() => {
      goto(`/day/${day.dayNumber}${data.simulationMode ? '?simulation=true' : ''}`);
    }, 600);
  }

  function handleThreeQuartersClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    showPlatform934 = true;
    mapRevealed = false;
  }
  
  function revealMap() {
    mapRevealed = true;
  }
  
  function closePlatform934() {
    showPlatform934 = false;
    mapRevealed = false;
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

<!-- SVG Filters for Paper Effects -->
<svg style="display: none;">
  <defs>
    <filter id="paper-roughness">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
    </filter>
  </defs>
</svg>

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
        <div 
          class="door-wrapper"
          in:scale={{
            duration: 400,
            delay: i * 50,
            easing: cubicOut,
            start: 0.8
          }}
        >
          <div 
            role="button"
            tabindex="0"
            class="door-flap"
            class:locked={day.isLocked}
            class:unlocked={!day.isLocked}
            class:open={openingDoor === day.dayNumber}
            class:door-9-visited={day.dayNumber === 9 && door9Visited && !day.isLocked}
            on:click|preventDefault={() => handleDoorClick(day)}
            on:keydown={(e) => e.key === 'Enter' && handleDoorClick(day)}
          >
            <div class="door-front">
              <div class="door-texture"></div>
              <div class="door-content">
                <div class="door-number">{day.dayNumber}</div>
                {#if day.isLocked}
                  <div class="lock-icon">🔒</div>
                {:else}
                  <div class="unlock-icon">✨</div>
                {/if}
                
                <!-- Platform 9¾ Easter Egg -->
                {#if day.dayNumber === 9 && door9Visited && !day.isLocked}
                  <button 
                    class="platform-934-badge" 
                    on:click|stopPropagation|preventDefault={handleThreeQuartersClick}
                  >
                    <span class="badge-text">¾</span>
                    <span class="badge-wand">🪄</span>
                  </button>
                {/if}
              </div>
              <div class="door-shine"></div>
            </div>
            <div class="door-back"></div>
          </div>
          
          <!-- The "Inside" of the box (visible when door opens) -->
          <div class="door-socket">
            <div class="socket-depth"></div>
            {#if !day.isLocked}
               <div class="socket-content">
                 <span class="socket-number">{day.dayNumber}</span>
                 <span class="socket-hint">Öffnen</span>
               </div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
  
  <footer>
    <p>💕 Mit Liebe erstellt für uns 💕</p>
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
      
      {#if !mapRevealed}
        <div 
          class="map-cover" 
          on:click={revealMap} 
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && revealMap()}
          role="button"
          tabindex="0"
          transition:fade
        >
          <div class="map-parchment">
            <p class="map-quote">"Ich schwöre feierlich, ich bin ein Tunichtgut."</p>
            <p class="map-hint">(Tippe hier, um die Karte zu öffnen)</p>
            <div class="wand-cursor">🪄</div>
          </div>
        </div>
      {:else}
        <div class="platform-header" transition:fade>
          <h2>🚂 Platform 9¾ 🪄</h2>
          <div class="platform-subtitle">Hogwarts Express - Weihnachts-Special</div>
        </div>
        
        <div class="platform-content" transition:fade>
          <div class="hogwarts-ticket">
            <div class="ticket-stub">
              <div class="ticket-logo">HOGWARTS EXPRESS</div>
              <div class="ticket-number">No. 934</div>
            </div>
            <div class="ticket-body">
              <div class="ticket-route">LONDON ⚡ HOGWARTS</div>
              <div class="ticket-passenger">PASSENGER: Locdoc & Miss Chaos</div>
              <div class="ticket-class">CLASS: First Class Magic</div>
            </div>
          </div>

          <div class="train-decoration">
            <div class="train">🚂</div>
            <div class="steam">💨💨✨</div>
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
              <p><strong>Miss Chaos' Aufgabe:</strong> Erstelle ein kleines Rätsel oder eine digitale Schnitzeljagd, die ich lösen muss.</p>
            </div>
            
            <div class="challenge-box ravenclaw">
              <h4>🦅 RAVENCLAW - Weisheit teilen</h4>
              <p><strong>Gemeinsam:</strong> Erstellt eine Liste mit 10 Dingen, die ihr aneinander faszinierend findet und die euch verbinden.</p>
            </div>
            
            <div class="challenge-box hufflepuff">
              <h4>🦡 HUFFLEPUFF - Treue beweisen</h4>
              <p><strong>Beide:</strong> Schreibt ein gemeinsames Versprechen für 2025 - etwas, das ihr füreinander tun wollt.</p>
            </div>

            <div class="challenge-box divination">
              <h4>🔮 WAHRSAGEN - Der Blick in die Kugel</h4>
              <p><strong>Prophezeiung:</strong> Schreibt beide 3 Dinge auf, die ihr glaubt, dass sie im nächsten Jahr passieren werden. Öffnet den Zettel erst an Weihnachten 2026!</p>
            </div>
            
            <div class="hogwarts-quote">
              <p><em>"After all this time?"</em></p>
              <p><em>"Always." ⚡</em></p>
              <p class="quote-author">- In Gedanken nah, im Herzen verbunden -</p>
            </div>
            
            <div class="bonus-idea">
              <h4>🎄 Weihnachts-Bonus-Idee</h4>
              <ul>
                <li><strong>Harry Potter Marathon:</strong> Schaut alle 8 Filme zusammen via Discord Screenshare (Kuscheldecke & Snacks bereitstellen!)</li>
                <li><strong>Butterbier-Rezept:</strong> Braut es "gemeinsam" im Video-Call und stoßt virtuell an.</li>
                <li><strong>Hogwarts Mystery:</strong> Spielt das Handy-Spiel zusammen und tauscht Screenshots aus</li>
                <li><strong>Patronus-Quiz:</strong> Macht beide den Pottermore-Test und vergleicht eure Patronus-Tiere</li>
                <li><strong>Zauberstab-Wahl:</strong> Beschreibt euch gegenseitig, wie der Zauberstab des anderen aussehen würde (Holz, Kern, Flexibilität).</li>
              </ul>
            </div>
          </div>
          
          <div class="platform-footer">
            <p>🎫 Fahrkarte gültig für: Locdoc & Miss Chaos</p>
            <p>🪄 Mischief Managed! 🪄</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}





<style>
  /* Body styles moved to +layout.svelte */
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    position: relative;
    z-index: 10;
  }
  
  header {
    text-align: center;
    color: #2c1810;
    margin-bottom: 4rem;
    position: relative;
  }
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #ffd700; /* Gold instead of dark red */
    text-shadow: 
      0 2px 4px rgba(0,0,0,0.5),
      0 0 20px rgba(255, 215, 0, 0.3);
    font-weight: 800;
    letter-spacing: 2px;
    font-family: 'Georgia', serif;
  }
  
  .date-display {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #f4e4c1; /* Creamy white */
    border-bottom: 2px solid #d4af37;
    display: inline-block;
    padding-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #e0c097; /* Lighter brown/gold */
    font-style: italic;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 2.5rem;
    margin-bottom: 4rem;
    padding: 1rem;
  }
  
  @media (min-width: 768px) {
    .calendar-grid {
      grid-template-columns: repeat(6, 1fr);
      gap: 3rem;
    }
  }
  
  /* Wrapper for the 3D context */
  .door-wrapper {
    position: relative;
    aspect-ratio: 1;
    perspective: 1000px;
    z-index: 1;
  }
  
  /* The dark hole behind the door */
  .door-socket {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2c1810;
    border-radius: 4px;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .socket-depth {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%);
  }
  
  .socket-hint {
    color: #d4af37;
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-family: 'Georgia', serif;
    font-style: italic;
    z-index: 1;
  }
  
  .socket-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    z-index: 1;
    transform: translateZ(-10px); /* Push slightly back */
  }
  
  .socket-number {
    font-size: 2rem;
    color: rgba(212, 175, 55, 0.3); /* Faint gold number */
    font-weight: 700;
    font-family: 'Georgia', serif;
  }
  
  .door-wrapper:hover .socket-hint {
    opacity: 1;
  }
  
  /* The rotating door flap */
  .door-flap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform-style: preserve-3d;
    transform-origin: left center;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    text-decoration: none;
    cursor: pointer;
    /* Apply the frayed paper filter */
    filter: url(#paper-roughness);
  }
  
  .door-front {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f4e4c1;
    background-image: linear-gradient(135deg, #f4e4c1 0%, #e6d2a0 100%);
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #8d6e63;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    overflow: hidden; /* Fixes white shadow/shine bleeding */
  }
  
  .door-texture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
    opacity: 0.6;
    pointer-events: none;
  }
  
  .door-back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #e6d2a0;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    border: 1px solid #d4af37;
  }
  
  /* Hover Effects */
  .door-flap.locked {
    cursor: not-allowed;
  }
  
  /* Locked doors rattle slightly but don't open */
  .door-flap.locked:hover {
    animation: rattle 0.5s ease-in-out;
  }
  
  @keyframes rattle {
    0%, 100% { transform: rotateY(0); }
    25% { transform: rotateY(-5deg); }
    75% { transform: rotateY(5deg); }
  }
  
  /* Unlocked doors open slightly on hover to indicate interaction */
  .door-flap.unlocked:hover {
    transform: rotateY(-15deg);
    box-shadow: 5px 0 15px rgba(0,0,0,0.1);
  }
  
  /* Open state (when clicked) - fully open */
  .door-flap.unlocked.open {
    transform: rotateY(-110deg);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Add thickness to the door for 3D effect */
  .door-flap::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 4px;
    background: #d7ccc8;
    transform: rotateY(90deg) translateX(2px);
    transform-origin: right;
  }
  
  /* Door Content */
  .door-content {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }
  
  .door-number {
    font-size: 3rem;
    font-weight: 900;
    color: #8b0000;
    font-family: 'Georgia', serif;
    text-shadow: 1px 1px 0px rgba(255,255,255,0.5);
    opacity: 0.9;
    mix-blend-mode: multiply;
  }
  
  .door-flap.unlocked .door-number {
    color: #2e7d32;
  }
  
  .lock-icon {
    font-size: 2rem;
    color: #5d4037;
    opacity: 0.6;
  }
  
  .unlock-icon {
    font-size: 2rem;
    filter: drop-shadow(0 0 2px #d4af37);
  }
  
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
    pointer-events: none;
  }
  
  .door-flap:hover .door-shine {
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
    background: rgba(244, 228, 193, 0.15);
    border: 2px solid #d4af37;
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2);
  }
  
  .hogwarts-letter h3 {
    color: #ffd700;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-family: Georgia, serif;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .hogwarts-letter p {
    line-height: 1.8;
    margin-bottom: 1rem;
    color: #f4e4c1;
  }
  
  .challenge-box {
    margin: 1.5rem 0;
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 5px solid;
    background: rgba(0, 0, 0, 0.2);
  }
  
  .gryffindor {
    background: linear-gradient(135deg, rgba(116, 0, 1, 0.4) 0%, rgba(174, 0, 1, 0.4) 100%);
    border-color: #d4af37;
  }
  
  .gryffindor h4 {
    color: #ffd700;
    margin-top: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .slytherin {
    background: linear-gradient(135deg, rgba(26, 71, 42, 0.4) 0%, rgba(42, 102, 62, 0.4) 100%);
    border-color: #a8a8a8;
  }
  
  .slytherin h4 {
    color: #e0e0e0;
    margin-top: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .ravenclaw {
    background: linear-gradient(135deg, rgba(13, 30, 64, 0.4) 0%, rgba(34, 67, 123, 0.4) 100%);
    border-color: #946b2d;
  }
  
  .ravenclaw h4 {
    color: #e0c097;
    margin-top: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .hufflepuff {
    background: linear-gradient(135deg, rgba(236, 178, 46, 0.3) 0%, rgba(255, 214, 10, 0.3) 100%);
    border-color: #ecb22e;
  }
  
  .hufflepuff h4 {
    color: #ffd700;
    margin-top: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .divination {
    background: linear-gradient(135deg, rgba(75, 0, 130, 0.4) 0%, rgba(138, 43, 226, 0.4) 100%);
    border-color: #9370db;
  }

  .divination h4 {
    color: #e6e6fa;
    margin-top: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  /* Map Reveal Styles */
  .map-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f4e4bc;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
  }

  .map-parchment {
    text-align: center;
    color: #5d4037;
    padding: 2rem;
    border: 3px double #5d4037;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.3);
  }

  .map-quote {
    font-family: 'Georgia', serif;
    font-size: 1.8rem;
    font-style: italic;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .map-hint {
    font-size: 1rem;
    opacity: 0.7;
  }

  .wand-cursor {
    font-size: 3rem;
    margin-top: 1rem;
    animation: floatWand 2s ease-in-out infinite;
  }

  @keyframes floatWand {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(10deg); }
  }

  /* Ticket Styles */
  .hogwarts-ticket {
    background: #fdfbf7;
    border: 2px solid #d4af37;
    border-radius: 8px;
    margin-bottom: 2rem;
    display: flex;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
  }

  .hogwarts-ticket::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#d4af37 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.1;
    pointer-events: none;
  }

  .ticket-stub {
    background: #740001;
    color: #ffd700;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 2px dashed #d4af37;
    min-width: 120px;
  }

  .ticket-logo {
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .ticket-number {
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
  }

  .ticket-body {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #2c1810;
  }

  .ticket-route {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #740001;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .ticket-passenger {
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .ticket-class {
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    color: #5d4037;
  }
  
  .hogwarts-quote {
    text-align: center;
    margin: 2rem 0;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    font-family: Georgia, serif;
    border: 1px solid rgba(212, 175, 55, 0.2);
  }
  
  .hogwarts-quote p {
    font-size: 1.3rem;
    color: #ffd700;
    margin: 0.5rem 0;
    font-style: italic;
  }
  
  .quote-author {
    font-size: 1rem !important;
    color: #c0c0c0 !important;
    margin-top: 1rem !important;
  }
  
  .bonus-idea {
    background: linear-gradient(135deg, rgba(116, 0, 1, 0.25) 0%, rgba(26, 71, 42, 0.25) 100%);
    border: 2px solid #d4af37;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .bonus-idea h4 {
    color: #ffd700;
    font-size: 1.5rem;
    margin-top: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .bonus-idea ul {
    list-style: none;
    padding: 0;
  }
  
  .bonus-idea li {
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    color: #f4e4c1;
  }
  
  .bonus-idea li:last-child {
    border-bottom: none;
  }
  
  .bonus-idea strong {
    color: #ffd700;
  }
  
  .platform-footer {
    background: rgba(44, 24, 16, 0.8);
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
