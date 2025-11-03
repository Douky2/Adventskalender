<script lang="ts">
  import { onMount } from 'svelte';

  export let mounted = false;

  onMount(() => {
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
</script>

<div class="snowflakes-container"></div>

<!-- Dezente Herzen (nur 3 Stück) -->
<div class="heart heart-1">💕</div>
<div class="heart heart-2">💖</div>
<div class="heart heart-3">💝</div>

<!-- Christmas Tree Group - Gestaffelte Tiefenwirkung -->
<div class="christmas-tree-forest">
  <!-- Hintere Bäume für Tiefe -->
  <div class="tree-back tree-back-left">
    <span class="tree-emoji-small">🌲</span>
    <span class="ornament-small om-1">🔴</span>
    <span class="ornament-small om-2">🟡</span>
  </div>
  
  <div class="tree-back tree-back-right">
    <span class="tree-emoji-small">🌲</span>
    <span class="ornament-small om-3">🔵</span>
    <span class="ornament-small om-4">⚪</span>
  </div>
  
  <!-- Hauptbaum im Vordergrund -->
  <div class="christmas-tree-main">
    <div class="tree-star-main">⭐</div>
    <div class="tree-main-body">
      <span class="tree-emoji-large">🌲</span>
      <!-- Natürlich verteilte Kugeln -->
      <span class="ornament main-o1">🔴</span>
      <span class="ornament main-o2">�</span>
      <span class="ornament main-o3">🔵</span>
      <span class="ornament main-o4">�</span>
      <span class="ornament main-o5">🟣</span>
      <span class="ornament main-o6">⚪</span>
      <span class="ornament main-o7">🔴</span>
      <!-- Glitzer-Effekte -->
      <span class="tree-sparkle sp1">✨</span>
      <span class="tree-sparkle sp2">✨</span>
    </div>
    <div class="tree-trunk-main">🟫</div>
  </div>
</div>

<!-- Geschenke - Natürlich versetzt gruppiert -->
<div class="presents-cluster">
  <div class="present pr1">🎁</div>
  <div class="present pr2">🎁</div>
  <div class="present pr3">🎁</div>
  <div class="present pr4">🎁</div>
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
  <div class="bell bell-3">🔔</div>
</div>

<!-- Plätzchen -->
<div class="cookies">
  <div class="cookie cookie-1">🍪</div>
  <div class="cookie cookie-2">🍪</div>
  <div class="cookie cookie-3">🍪</div>
</div>

<!-- Lebkuchenmänner -->
<div class="gingerbread">
  <div class="gingerbread-man gm-1">🤎</div>
  <div class="gingerbread-man gm-2">🤎</div>
</div>

<!-- Rentier -->
<div class="reindeer">
  <div class="reindeer-1">🦌</div>
</div>

<!-- Snowman - Harmonische Proportionen -->
<div class="snowman-improved">
  <!-- Hut fest auf dem Kopf -->
  <div class="snowman-hat-fixed">🎩</div>
  
  <!-- Kopf (größer) -->
  <div class="snowman-head-new">
    <span class="snowman-head-ball">⚪</span>
    <span class="snowman-eye eye-left">•</span>
    <span class="snowman-eye eye-right">•</span>
    <span class="snowman-nose">🥕</span>
    <span class="snowman-smile">︶</span>
  </div>
  
  <!-- Schal mit natürlichem Fall -->
  <div class="snowman-scarf-flowing">
    <span class="scarf-main">🧣</span>
    <span class="scarf-tail">～</span>
  </div>
  
  <!-- Mittlerer Körper -->
  <div class="snowman-body-middle">
    <span class="snowman-body-ball">⚪</span>
    <span class="snowman-button btn-mid-1">🔘</span>
    <span class="snowman-button btn-mid-2">🔘</span>
    <!-- Arme (Zweige) -->
    <span class="snowman-arm arm-left">🌿</span>
    <span class="snowman-arm arm-right">🌿</span>
  </div>
  
  <!-- Unterer Körper (kleiner für Pyramidenform) -->
  <div class="snowman-body-bottom">
    <span class="snowman-bottom-ball">⚪</span>
    <span class="snowman-button btn-bottom">🔘</span>
  </div>
</div>

<style>
  /* Snowflakes Container */
  .snowflakes-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }
  
  :global(.snowflake) {
    position: absolute;
    top: -20px;
    color: white;
    user-select: none;
    animation: fall linear infinite;
    text-shadow: 0 0 5px rgba(255,255,255,0.5);
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh);
    }
  }
  
  /* Dezente Herzen */
  .heart {
    position: fixed;
    font-size: 2.5rem;
    opacity: 0.15;
    animation: heartbeat 3s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }
  
  .heart-1 {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }
  
  .heart-2 {
    top: 60%;
    right: 8%;
    animation-delay: 1s;
  }
  
  .heart-3 {
    bottom: 15%;
    left: 50%;
    animation-delay: 2s;
  }
  
  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
      opacity: 0.1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.2;
    }
  }
  
  /* Christmas Tree Forest - Gestaffelte Tiefe */
  .christmas-tree-forest {
    position: fixed;
    left: 5%;
    bottom: 8%;
    z-index: 2;
    pointer-events: none;
    width: 12rem;
    height: 15rem;
  }
  
  /* Hintere Bäume für Tiefenwirkung */
  .tree-back {
    position: absolute;
    opacity: 0.7;
    z-index: 1;
  }
  
  .tree-back-left {
    left: -2rem;
    bottom: 2rem;
    transform: scale(0.75);
  }
  
  .tree-back-right {
    right: -1.5rem;
    bottom: 1.5rem;
    transform: scale(0.7);
  }
  
  .tree-emoji-small {
    font-size: 5rem;
    filter: drop-shadow(0 0 15px rgba(0, 200, 0, 0.5));
    display: inline-block;
    animation: treeGlowSubtle 4s ease-in-out infinite;
  }
  
  @keyframes treeGlowSubtle {
    0%, 100% {
      filter: drop-shadow(0 0 15px rgba(0, 200, 0, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(0, 220, 0, 0.6));
    }
  }
  
  .ornament-small {
    position: absolute;
    font-size: 0.9rem;
    animation: ornamentSwingSubtle 3s ease-in-out infinite;
  }
  
  .tree-back .om-1 { top: 30%; left: 25%; animation-delay: 0s; }
  .tree-back .om-2 { top: 50%; right: 28%; animation-delay: 1s; }
  .tree-back .om-3 { top: 35%; left: 30%; animation-delay: 0.5s; }
  .tree-back .om-4 { top: 55%; right: 25%; animation-delay: 1.5s; }
  
  /* Hauptbaum im Vordergrund */
  .christmas-tree-main {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tree-star-main {
    font-size: 3.5rem;
    animation: starRotateGlow 4s linear infinite;
    filter: drop-shadow(0 0 20px gold);
    margin-bottom: -0.8rem;
  }
  
  @keyframes starRotateGlow {
    0% { 
      transform: rotate(0deg); 
      filter: drop-shadow(0 0 20px gold);
    }
    50% {
      filter: drop-shadow(0 0 30px gold);
    }
    100% { 
      transform: rotate(360deg);
      filter: drop-shadow(0 0 20px gold);
    }
  }
  
  .tree-main-body {
    position: relative;
  }
  
  .tree-emoji-large {
    font-size: 9rem;
    filter: drop-shadow(0 0 25px rgba(0, 255, 0, 0.7));
    animation: treeGlowMain 3s ease-in-out infinite;
    display: inline-block;
  }
  
  @keyframes treeGlowMain {
    0%, 100% {
      filter: drop-shadow(0 0 25px rgba(0, 255, 0, 0.7));
    }
    50% {
      filter: drop-shadow(0 0 35px rgba(0, 255, 100, 0.9));
    }
  }
  
  /* Natürlich verteilte Kugeln */
  .ornament {
    position: absolute;
    font-size: 1.4rem;
    animation: ornamentSwing 3s ease-in-out infinite;
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9));
  }
  
  .main-o1 { top: 15%; left: 20%; animation-delay: 0s; }
  .main-o2 { top: 25%; right: 18%; animation-delay: 0.6s; }
  .main-o3 { top: 35%; left: 15%; animation-delay: 1.2s; }
  .main-o4 { top: 45%; right: 22%; animation-delay: 0.3s; }
  .main-o5 { top: 55%; left: 25%; animation-delay: 1.8s; }
  .main-o6 { top: 65%; right: 20%; animation-delay: 0.9s; }
  .main-o7 { top: 75%; left: 30%; animation-delay: 1.5s; }
  
  @keyframes ornamentSwing {
    0%, 100% {
      transform: rotate(-6deg) scale(1);
    }
    50% {
      transform: rotate(6deg) scale(1.08);
    }
  }
  
  @keyframes ornamentSwingSubtle {
    0%, 100% {
      transform: rotate(-4deg) scale(1);
    }
    50% {
      transform: rotate(4deg) scale(1.05);
    }
  }
  
  /* Glitzer-Effekte */
  .tree-sparkle {
    position: absolute;
    font-size: 1.8rem;
    animation: sparkleFloat 2s ease-in-out infinite;
    opacity: 0.8;
  }
  
  .sp1 { top: 20%; left: 10%; animation-delay: 0s; }
  .sp2 { top: 50%; right: 12%; animation-delay: 1s; }
  
  @keyframes sparkleFloat {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-8px) scale(1.15);
      opacity: 1;
    }
  }
  
  .tree-trunk-main {
    font-size: 2.2rem;
    margin-top: -1rem;
    filter: drop-shadow(0 0 8px rgba(139, 69, 19, 0.5));
  }
  
  /* Geschenke - Natürlich versetzt gruppiert */
  .presents-cluster {
    position: fixed;
    left: 5%;
    bottom: 2%;
    z-index: 2;
    pointer-events: none;
    width: 8rem;
    height: 4rem;
  }
  
  .presents-corner {
    position: fixed;
    top: 5%;
    right: 5%;
    display: flex;
    gap: 1rem;
    z-index: 1;
    pointer-events: none;
  }
  
  .present {
    position: absolute;
    font-size: 2.4rem;
    animation: presentBounce 2.5s ease-in-out infinite;
    filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.7));
  }
  
  /* Versetzte, dichte Gruppierung wie frisch hingelegt */
  .pr1 { left: 0; bottom: 0; animation-delay: 0s; transform: rotate(-5deg); }
  .pr2 { left: 2.5rem; bottom: 0.5rem; animation-delay: 0.4s; transform: rotate(3deg); z-index: 2; }
  .pr3 { left: 1.2rem; bottom: 2rem; animation-delay: 0.8s; transform: rotate(-3deg); }
  .pr4 { left: 4rem; bottom: 0; animation-delay: 1.2s; transform: rotate(5deg); }
  
  @keyframes presentBounce {
    0%, 100% {
      transform: translateY(0) rotate(0deg) scale(1);
    }
    50% {
      transform: translateY(-8px) rotate(2deg) scale(1.05);
    }
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
    animation: starTwinkle2 4s ease-in-out infinite;
  }
  
  .star-1 {
    top: 8%;
    left: 15%;
    font-size: 1.2rem;
    animation-delay: 0s;
  }
  
  .star-2 {
    top: 25%;
    right: 10%;
    font-size: 1rem;
    animation-delay: 0.8s;
  }
  
  .star-3 {
    top: 45%;
    left: 8%;
    font-size: 1.3rem;
    animation-delay: 1.6s;
  }
  
  .star-4 {
    top: 60%;
    right: 15%;
    font-size: 0.9rem;
    animation-delay: 2.4s;
  }
  
  .star-5 {
    top: 35%;
    left: 45%;
    font-size: 1.1rem;
    animation-delay: 3.2s;
  }
  
  .star-6 {
    top: 18%;
    right: 35%;
    font-size: 1rem;
    animation-delay: 4s;
  }
  
  .star-7 {
    top: 75%;
    left: 20%;
    font-size: 1.2rem;
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
    opacity: 0.35;
    animation: bellRing 4s ease-in-out infinite;
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
  }
  
  .bell-1 { top: 8%; right: 12%; animation-delay: 0s; }
  .bell-2 { top: 25%; left: 8%; animation-delay: 2s; }
  .bell-3 { bottom: 25%; right: 15%; animation-delay: 1s; }
  
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
  
  /* Plätzchen */
  .cookies {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .cookie {
    position: absolute;
    font-size: 2rem;
    opacity: 0.4;
    animation: cookieSpin 8s linear infinite;
    filter: drop-shadow(0 0 8px rgba(210, 180, 140, 0.6));
  }
  
  .cookie-1 { top: 15%; left: 20%; animation-delay: 0s; }
  .cookie-2 { top: 70%; left: 15%; animation-delay: 2s; }
  .cookie-3 { bottom: 20%; right: 25%; animation-delay: 4s; }
  
  @keyframes cookieSpin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
  
  /* Lebkuchenmänner */
  .gingerbread {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .gingerbread-man {
    position: absolute;
    font-size: 2.5rem;
    opacity: 0.35;
    animation: gingerbreadWave 3s ease-in-out infinite;
  }
  
  .gm-1 { top: 40%; left: 10%; animation-delay: 0s; }
  .gm-2 { bottom: 30%; right: 20%; animation-delay: 1.5s; }
  
  @keyframes gingerbreadWave {
    0%, 100% {
      transform: translateY(0) rotate(-3deg);
    }
    50% {
      transform: translateY(-10px) rotate(3deg);
    }
  }
  
  /* Rentier */
  .reindeer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .reindeer-1 {
    position: absolute;
    top: 20%;
    right: 5%;
    font-size: 3rem;
    opacity: 0.4;
    animation: reindeerJump 4s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(139, 69, 19, 0.6));
  }
  
  @keyframes reindeerJump {
    0%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(0);
    }
  }
  
  /* Snowman - Harmonische Proportionen (Pyramidenform) */
  .snowman-improved {
    position: fixed;
    right: 8%;
    bottom: 10%;
    z-index: 2;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Hut fest auf dem Kopf sitzend */
  .snowman-hat-fixed {
    font-size: 3.2rem;
    margin-bottom: -1.2rem;
    animation: hatTiltCharm 4s ease-in-out infinite;
    filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.6));
    z-index: 4;
    transform: rotate(-8deg);
  }
  
  @keyframes hatTiltCharm {
    0%, 100% {
      transform: rotate(-8deg);
    }
    50% {
      transform: rotate(-12deg);
    }
  }
  
  /* Kopf - größer für harmonische Proportionen */
  .snowman-head-new {
    position: relative;
    z-index: 3;
    margin-bottom: -1rem;
  }
  
  .snowman-head-ball {
    font-size: 5.5rem;
    filter: drop-shadow(0 0 28px rgba(255, 255, 255, 0.95));
    animation: snowmanBobGentle 3s ease-in-out infinite;
    display: inline-block;
  }
  
  @keyframes snowmanBobGentle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }
  
  /* Freundliches Gesicht */
  .snowman-eye {
    position: absolute;
    font-size: 1.5rem;
    color: #000;
    top: 38%;
  }
  
  .eye-left { left: 35%; }
  .eye-right { right: 35%; }
  
  .snowman-nose {
    position: absolute;
    font-size: 1.8rem;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .snowman-smile {
    position: absolute;
    font-size: 2rem;
    color: #000;
    top: 65%;
    left: 50%;
    transform: translateX(-50%);
  }
  
  /* Schal mit natürlichem Fall und Bewegung */
  .snowman-scarf-flowing {
    position: relative;
    z-index: 2;
    margin-top: -0.5rem;
    margin-bottom: -0.8rem;
  }
  
  .scarf-main {
    font-size: 3.8rem;
    display: inline-block;
    animation: scarfFlow 3s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(100, 150, 255, 0.7));
  }
  
  .scarf-tail {
    position: absolute;
    font-size: 2rem;
    left: 65%;
    top: 2rem;
    animation: scarfTailWave 2.5s ease-in-out infinite;
    color: rgba(100, 150, 255, 0.8);
  }
  
  @keyframes scarfFlow {
    0%, 100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
  
  @keyframes scarfTailWave {
    0%, 100% {
      transform: translateX(0) rotate(5deg);
    }
    50% {
      transform: translateX(5px) rotate(15deg);
    }
  }
  
  /* Mittlerer Körper */
  .snowman-body-middle {
    position: relative;
    margin-bottom: -1.2rem;
  }
  
  .snowman-body-ball {
    font-size: 4.8rem;
    filter: drop-shadow(0 0 24px rgba(255, 255, 255, 0.9));
    display: inline-block;
  }
  
  /* Arme - kräftigere Zweige */
  .snowman-arm {
    position: absolute;
    font-size: 2.5rem;
    top: 45%;
    animation: armWave 4s ease-in-out infinite;
  }
  
  .arm-left {
    left: -2.5rem;
    transform: rotate(-45deg);
    animation-delay: 0s;
  }
  
  .arm-right {
    right: -2.5rem;
    transform: rotate(45deg);
    animation-delay: 2s;
  }
  
  @keyframes armWave {
    0%, 100% {
      transform: rotate(var(--arm-base-rotate, 0deg));
    }
    50% {
      transform: rotate(calc(var(--arm-base-rotate, 0deg) + 10deg));
    }
  }
  
  .arm-left { --arm-base-rotate: -45deg; }
  .arm-right { --arm-base-rotate: 45deg; }
  
  /* Knöpfe */
  .snowman-button {
    position: absolute;
    font-size: 1.2rem;
    animation: buttonShine 2s ease-in-out infinite;
    color: #333;
  }
  
  .btn-mid-1 { top: 35%; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
  .btn-mid-2 { top: 65%; left: 50%; transform: translateX(-50%); animation-delay: 0.6s; }
  .btn-bottom { top: 45%; left: 50%; transform: translateX(-50%); animation-delay: 1.2s; }
  
  @keyframes buttonShine {
    0%, 100% {
      opacity: 0.8;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) scale(1.15);
    }
  }
  
  /* Unterer Körper - kleiner für Pyramidenform */
  .snowman-body-bottom {
    position: relative;
  }
  
  .snowman-bottom-ball {
    font-size: 4.2rem;
    filter: drop-shadow(0 0 22px rgba(255, 255, 255, 0.85));
    display: inline-block;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .christmas-tree-forest {
      left: 2%;
      bottom: 3%;
      transform: scale(0.7);
    }
    
    .snowman-improved {
      right: 2%;
      bottom: 3%;
      transform: scale(0.7);
    }
    
    .presents-cluster {
      left: 2%;
      bottom: 1%;
      transform: scale(0.7);
    }
    
    .candle {
      font-size: 1.5rem;
    }
    
    .star {
      font-size: 1.5rem;
    }
    
    .cookie, .gingerbread-man {
      font-size: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .christmas-tree-forest {
      transform: scale(0.5);
      left: 1%;
      bottom: 1%;
    }
    
    .snowman-improved {
      transform: scale(0.5);
      right: 1%;
      bottom: 1%;
    }
    
    .presents-cluster {
      transform: scale(0.5);
    }
    
    .candles,
    .candy-canes,
    .bells,
    .cookies,
    .gingerbread {
      opacity: 0.3;
    }
    
    .heart,
    .reindeer {
      display: none;
    }
  }
</style>
