<script lang="ts">
  export let data;
  
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    createSnowflakes();
  });
  
  function createSnowflakes() {
    const container = document.querySelector('.snowflakes-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
      snowflake.style.animationDelay = Math.random() * 5 + 's';
      snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
      snowflake.style.opacity = (Math.random() * 0.6 + 0.3).toString();
      container.appendChild(snowflake);
    }
  }
  
  onMount(() => {
    mounted = true;
    createSnowflakes();
  });
</script>

<svelte:head>
  <title>Unser Adventskalender 🎄</title>
</svelte:head>

<div class="snowflakes-container"></div>

<!-- Dezente Herzen (nur 3 Stück) -->
<div class="heart heart-1">💕</div>
<div class="heart heart-2">💖</div>
<div class="heart heart-3">💝</div>

<!-- Christmas Tree Decoration -->
<div class="christmas-tree">
  <div class="tree-star">⭐</div>
  <div class="tree-part tree-top">
    <span class="tree-emoji">🌲</span>
    <span class="ornament ornament-1">🔴</span>
    <span class="ornament ornament-2">🟡</span>
    <span class="ornament ornament-3">🔵</span>
  </div>
  <div class="tree-part tree-middle">
    <span class="tree-emoji">🌲</span>
    <span class="ornament ornament-4">🟣</span>
    <span class="ornament ornament-5">⚪</span>
    <span class="ornament ornament-6">🔴</span>
    <span class="ornament ornament-7">🟡</span>
  </div>
  <div class="tree-part tree-bottom">
    <span class="tree-emoji">🌲</span>
    <span class="ornament ornament-8">�</span>
    <span class="ornament ornament-9">�🟣</span>
    <span class="ornament ornament-10">⚪</span>
  </div>
  <div class="tree-trunk">🟫</div>
  <div class="tree-lights">✨</div>
</div>

<!-- Geschenke überall verteilt -->
<div class="presents">
  <div class="present present-1">🎁</div>
  <div class="present present-2">🎁</div>
  <div class="present present-3">🎁</div>
  <div class="present present-4">🎁</div>
  <div class="present present-5">🎁</div>
  <div class="present present-6">🎁</div>
</div>

<!-- Sterne im Hintergrund -->
<div class="stars">
  <div class="star star-1">⭐</div>
  <div class="star star-2">✨</div>
  <div class="star star-3">⭐</div>
  <div class="star star-4">✨</div>
  <div class="star star-5">⭐</div>
  <div class="star star-6">✨</div>
  <div class="star star-7">⭐</div>
  <div class="star star-8">✨</div>
</div>

<!-- Kerzen überall verteilt -->
<div class="candles">
  <div class="candle candle-1">🕯️</div>
  <div class="candle candle-2">🕯️</div>
  <div class="candle candle-3">🕯️</div>
  <div class="candle candle-4">🕯️</div>
  <div class="candle candle-5">🕯️</div>
  <div class="candle candle-6">🕯️</div>
</div>

<!-- Zusätzliche Deko: Zuckerstangen -->
<div class="candy-canes">
  <div class="candy-cane candy-1">🍭</div>
  <div class="candy-cane candy-2">🍭</div>
  <div class="candy-cane candy-3">🍭</div>
</div>

<!-- Glocken -->
<div class="bells">
  <div class="bell bell-1">🔔</div>
  <div class="bell bell-2">🔔</div>
</div>

<!-- Snowman Decoration -->
<div class="snowman">
  <div class="snowman-hat">🎩</div>
  <div class="snowman-top">
    <span class="snowman-face">☃️</span>
  </div>
  <div class="snowman-middle">
    <span class="snowman-body-circle">⚪</span>
    <span class="snowman-button btn-1">⚫</span>
    <span class="snowman-button btn-2">⚫</span>
  </div>
  <div class="snowman-bottom">
    <span class="snowman-body-circle">⚪</span>
    <span class="snowman-button btn-3">⚫</span>
  </div>
  <div class="snowman-scarf">🧣</div>
</div>

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

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
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
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
    pointer-events: none;
    animation: backgroundFloat 20s ease-in-out infinite;
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
    background: linear-gradient(145deg, #ffffff, #f0f0f0);
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
    background: linear-gradient(145deg, #e0e0e0, #d0d0d0);
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
  }
  
  .door-number {
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
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
  
  .snowflakes-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
  }
  
  :global(.snowflake) {
    position: absolute;
    top: -20px;
    color: white;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
    animation: fall linear infinite;
    user-select: none;
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
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
  
  /* Dezente Herzen */
  .heart {
    position: fixed;
    font-size: 1.5rem;
    opacity: 0.15;
    pointer-events: none;
    z-index: 1;
    animation: gentlePulse 4s ease-in-out infinite;
  }
  
  .heart-1 {
    top: 15%;
    right: 20%;
    animation-delay: 0s;
  }
  
  .heart-2 {
    top: 25%;
    left: 15%;
    animation-delay: 1.5s;
  }
  
  .heart-3 {
    top: 70%;
    right: 12%;
    animation-delay: 3s;
  }
  
  @keyframes gentlePulse {
    0%, 100% {
      opacity: 0.15;
      transform: scale(1);
    }
    50% {
      opacity: 0.25;
      transform: scale(1.1);
    }
  }
  
  /* Christmas Tree */
  .christmas-tree {
    position: fixed;
    left: 3%;
    bottom: 3%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: treeFloat 4s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  }
  
  @keyframes treeFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  
  .tree-star {
    font-size: 2.5rem;
    text-align: center;
    animation: starTwinkle 2s ease-in-out infinite;
    margin-bottom: -0.5rem;
    z-index: 3;
  }
  
  @keyframes starTwinkle {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      filter: brightness(1) drop-shadow(0 0 5px gold);
    }
    50% {
      transform: scale(1.15) rotate(180deg);
      filter: brightness(1.5) drop-shadow(0 0 15px gold);
    }
  }
  
  .tree-part {
    position: relative;
    text-align: center;
    line-height: 1;
    margin: -0.8rem 0;
  }
  
  .tree-emoji {
    display: block;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  .tree-top .tree-emoji {
    font-size: 3.5rem;
  }
  
  .tree-middle .tree-emoji {
    font-size: 5rem;
  }
  
  .tree-bottom .tree-emoji {
    font-size: 6.5rem;
  }
  
  .tree-trunk {
    font-size: 2rem;
    text-align: center;
    margin-top: -0.5rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  .tree-lights {
    text-align: center;
    font-size: 1.5rem;
    margin-top: -0.3rem;
    animation: lightsSparkle 1s ease-in-out infinite;
  }
  
  @keyframes lightsSparkle {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  .ornament {
    position: absolute;
    font-size: 1.2rem;
    animation: ornamentGlow 2s ease-in-out infinite;
    z-index: 2;
  }
  
  /* Mehr Kugeln für den Baum */
  .tree-top .ornament-1 { top: 30%; left: 15%; animation-delay: 0s; }
  .tree-top .ornament-2 { top: 50%; right: 12%; animation-delay: 0.3s; }
  .tree-top .ornament-3 { top: 65%; left: 25%; animation-delay: 0.6s; }
  
  .tree-middle .ornament-4 { top: 25%; left: 8%; animation-delay: 0.9s; }
  .tree-middle .ornament-5 { top: 40%; right: 5%; animation-delay: 1.2s; }
  .tree-middle .ornament-6 { top: 60%; left: 18%; animation-delay: 1.5s; }
  .tree-middle .ornament-7 { top: 75%; right: 15%; animation-delay: 1.8s; }
  
  .tree-bottom .ornament-8 { top: 30%; left: 12%; animation-delay: 2.1s; }
  .tree-bottom .ornament-9 { top: 50%; right: 10%; animation-delay: 2.4s; }
  .tree-bottom .ornament-10 { top: 70%; left: 25%; animation-delay: 2.7s; }
  
  @keyframes ornamentGlow {
    0%, 100% {
      transform: scale(1);
      filter: brightness(1) drop-shadow(0 0 3px currentColor);
    }
    50% {
      transform: scale(1.15);
      filter: brightness(1.4) drop-shadow(0 0 8px currentColor);
    }
  }
  
  /* Snowman */
  .snowman {
    position: fixed;
    right: 3%;
    bottom: 3%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: snowmanBounce 3s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  }
  
  @keyframes snowmanBounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .snowman-hat {
    font-size: 3rem;
    text-align: center;
    animation: hatTip 3s ease-in-out infinite;
    margin-bottom: -1rem;
    z-index: 3;
  }
  
  @keyframes hatTip {
    0%, 100% {
      transform: rotate(-8deg);
    }
    50% {
      transform: rotate(8deg);
    }
  }
  
  .snowman-top {
    position: relative;
    z-index: 2;
  }
  
  .snowman-face {
    font-size: 4.5rem;
    display: block;
    animation: snowmanWave 2.5s ease-in-out infinite;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
  }
  
  @keyframes snowmanWave {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
  }
  
  .snowman-scarf {
    font-size: 2.5rem;
    text-align: center;
    margin-top: -1.5rem;
    margin-bottom: -0.5rem;
    animation: scarfWave 2s ease-in-out infinite;
    z-index: 2;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  }
  
  @keyframes scarfWave {
    0%, 100% {
      transform: rotate(-3deg) translateX(0);
    }
    50% {
      transform: rotate(3deg) translateX(2px);
    }
  }
  
  .snowman-middle {
    position: relative;
    margin-top: -0.5rem;
  }
  
  .snowman-bottom {
    position: relative;
    margin-top: -1rem;
  }
  
  .snowman-body-circle {
    font-size: 3.8rem;
    display: block;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
  }
  
  .snowman-bottom .snowman-body-circle {
    font-size: 4.5rem;
  }
  
  .snowman-button {
    position: absolute;
    font-size: 0.9rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
  
  .snowman-middle .btn-1 {
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .snowman-middle .btn-2 {
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .snowman-bottom .btn-3 {
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  /* Geschenke überall verteilt */
  .presents {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .present {
    position: absolute;
    font-size: 2rem;
    animation: presentRotate 4s ease-in-out infinite;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
  }
  
  .present-1 { bottom: 1%; left: 3%; animation-delay: 0s; }
  .present-2 { bottom: 2%; left: 8%; animation-delay: 0.5s; }
  .present-3 { bottom: 3%; left: 13%; animation-delay: 1s; }
  .present-4 { bottom: 5%; right: 15%; animation-delay: 1.5s; }
  .present-5 { top: 20%; left: 8%; animation-delay: 2s; font-size: 1.5rem; opacity: 0.6; }
  .present-6 { top: 40%; right: 5%; animation-delay: 2.5s; font-size: 1.5rem; opacity: 0.6; }
  
  @keyframes presentRotate {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
  
  /* Sterne im Hintergrund */
  .stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  
  .star {
    position: absolute;
    font-size: 1.5rem;
    opacity: 0.3;
    animation: starTwinkle2 3s ease-in-out infinite;
  }
  
  .star-1 {
    top: 10%;
    left: 25%;
    animation-delay: 0s;
  }
  
  .star-2 {
    top: 20%;
    right: 30%;
    font-size: 1.2rem;
    animation-delay: 0.8s;
  }
  
  .star-3 {
    top: 35%;
    left: 10%;
    animation-delay: 1.6s;
  }
  
  .star-4 {
    top: 60%;
    right: 15%;
    font-size: 1rem;
    animation-delay: 2.4s;
  }
  
  .star-5 {
    top: 80%;
    left: 40%;
    animation-delay: 3.2s;
  }
  
  .star-6 {
    top: 45%;
    left: 50%;
    font-size: 1.3rem;
    animation-delay: 4s;
  }
  
  .star-7 {
    top: 25%;
    left: 70%;
    animation-delay: 4.8s;
  }
  
  .star-8 {
    top: 70%;
    right: 25%;
    font-size: 1.1rem;
    animation-delay: 5.6s;
  }
  
  @keyframes starTwinkle2 {
    0%, 100% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }
  
  /* Kerzen überall verteilt */
  .candles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  
  .candle {
    position: absolute;
    font-size: 2rem;
    opacity: 0.25;
    animation: candleFlicker 2s ease-in-out infinite;
  }
  
  .candle-1 { top: 15%; left: 20%; animation-delay: 0s; }
  .candle-2 { top: 30%; right: 25%; animation-delay: 0.4s; }
  .candle-3 { top: 50%; left: 15%; animation-delay: 0.8s; }
  .candle-4 { top: 65%; right: 20%; animation-delay: 1.2s; }
  .candle-5 { top: 80%; left: 30%; animation-delay: 1.6s; }
  .candle-6 { top: 40%; right: 10%; animation-delay: 2s; }
  
  @keyframes candleFlicker {
    0%, 100% {
      opacity: 0.2;
      filter: brightness(1);
    }
    50% {
      opacity: 0.35;
      filter: brightness(1.3) drop-shadow(0 0 10px rgba(255, 200, 100, 0.5));
    }
  }
  
  /* Zuckerstangen */
  .candy-canes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .candy-cane {
    position: absolute;
    font-size: 1.8rem;
    opacity: 0.4;
    animation: candySwing 3s ease-in-out infinite;
  }
  
  .candy-1 { top: 25%; left: 12%; animation-delay: 0s; }
  .candy-2 { top: 55%; right: 18%; animation-delay: 1s; }
  .candy-3 { bottom: 15%; left: 45%; animation-delay: 2s; }
  
  @keyframes candySwing {
    0%, 100% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(5deg);
    }
  }
  
  /* Glocken */
  .bells {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .bell {
    position: absolute;
    font-size: 2rem;
    opacity: 0.3;
    animation: bellRing 4s ease-in-out infinite;
  }
  
  .bell-1 { top: 10%; right: 10%; animation-delay: 0s; }
  .bell-2 { top: 30%; left: 5%; animation-delay: 2s; }
  
  @keyframes bellRing {
    0%, 90%, 100% {
      transform: rotate(0deg);
    }
    92% {
      transform: rotate(-15deg);
    }
    96% {
      transform: rotate(15deg);
    }
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .calendar-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    
    .christmas-tree {
      transform: scale(0.5);
      left: 1%;
      bottom: 1%;
    }
    
    .snowman {
      transform: scale(0.5);
      right: 1%;
      bottom: 1%;
    }
    
    .presents {
      transform: scale(0.5);
      left: 1%;
    }
    
    .candles {
      gap: 1rem;
    }
    
    .candle {
      font-size: 1.8rem;
    }
  }
  
  @media (max-width: 480px) {
    .christmas-tree,
    .snowman,
    .presents {
      display: none; /* Auf sehr kleinen Bildschirmen ausblenden */
    }
    
    .candles {
      display: none;
    }
  }
</style>
