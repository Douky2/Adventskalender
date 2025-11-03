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

<!-- Christmas Tree - Schöner 3-teiliger Baum -->
<div class="christmas-tree">
  <div class="tree-star">⭐</div>
  <div class="tree-part tree-top">
    <span class="tree-emoji">🌲</span>
    <span class="ornament ornament-1">🔴</span>
    <span class="ornament ornament-2">🟡</span>
  </div>
  <div class="tree-part tree-middle">
    <span class="tree-emoji">🌲</span>
    <span class="ornament ornament-3">🔵</span>
    <span class="ornament ornament-4">🟠</span>
    <span class="ornament ornament-5">🟣</span>
  </div>
  <div class="tree-part tree-bottom">
    <span class="tree-emoji">🌲</span>
    <span class="ornament ornament-6">🔴</span>
    <span class="ornament ornament-7">🟡</span>
    <span class="ornament ornament-8">⚪</span>
  </div>
  <div class="tree-trunk">🟫</div>
</div>

<!-- Geschenke - Schön gruppiert unter dem Baum und verteilt -->
<div class="presents-group">
  <div class="present p1">🎁</div>
  <div class="present p2">🎁</div>
  <div class="present p3">🎁</div>
</div>

<!-- Extra Geschenke oben rechts -->
<div class="presents-corner">
  <div class="present corner1">🎁</div>
  <div class="present corner2">🎁</div>
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

<!-- Snowman - Schön aufgebaut -->
<div class="snowman">
  <div class="snowman-hat">🎩</div>
  <div class="snowman-head">
    <span class="snowman-face">⛄</span>
  </div>
  <div class="snowman-body">
    <div class="snowman-middle">
      <span class="snowman-circle">⚪</span>
      <span class="snowman-button btn-1">🔘</span>
      <span class="snowman-button btn-2">🔘</span>
    </div>
    <div class="snowman-bottom">
      <span class="snowman-circle">⚪</span>
      <span class="snowman-button btn-3">🔘</span>
    </div>
  </div>
  <div class="snowman-scarf">🧣</div>
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
  
  /* Christmas Tree - Schöner 3-teiliger Baum */
  .christmas-tree {
    position: fixed;
    left: 5%;
    bottom: 8%;
    z-index: 2;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tree-star {
    font-size: 3.5rem;
    animation: starRotate 4s linear infinite;
    filter: drop-shadow(0 0 15px gold);
    margin-bottom: -1rem;
    z-index: 3;
  }
  
  @keyframes starRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .tree-part {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -1.5rem 0;
  }
  
  .tree-top .tree-emoji {
    font-size: 4rem;
  }
  
  .tree-middle .tree-emoji {
    font-size: 6rem;
  }
  
  .tree-bottom .tree-emoji {
    font-size: 8rem;
  }
  
  .tree-emoji {
    filter: drop-shadow(0 0 20px rgba(0, 255, 0, 0.6));
    animation: treeGlow 3s ease-in-out infinite;
  }
  
  @keyframes treeGlow {
    0%, 100% {
      filter: drop-shadow(0 0 20px rgba(0, 255, 0, 0.6));
    }
    50% {
      filter: drop-shadow(0 0 30px rgba(0, 255, 100, 0.8));
    }
  }
  
  .ornament {
    position: absolute;
    font-size: 1.3rem;
    animation: ornamentSwing 3s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9));
  }
  
  /* Kugeln direkt AM Baum positioniert */
  .tree-top .ornament-1 { top: 35%; left: 25%; animation-delay: 0s; }
  .tree-top .ornament-2 { top: 40%; right: 25%; animation-delay: 0.8s; }
  
  .tree-middle .ornament-3 { top: 30%; left: 18%; animation-delay: 0.4s; }
  .tree-middle .ornament-4 { top: 45%; right: 20%; animation-delay: 1.2s; }
  .tree-middle .ornament-5 { top: 55%; left: 30%; animation-delay: 1.6s; }
  
  .tree-bottom .ornament-6 { top: 25%; left: 15%; animation-delay: 0.6s; }
  .tree-bottom .ornament-7 { top: 40%; right: 18%; animation-delay: 1.4s; }
  .tree-bottom .ornament-8 { top: 50%; left: 35%; animation-delay: 2s; }
  
  @keyframes ornamentSwing {
    0%, 100% {
      transform: rotate(-5deg) scale(1);
    }
    50% {
      transform: rotate(5deg) scale(1.1);
    }
  }
  
  .tree-trunk {
    font-size: 2rem;
    margin-top: -1rem;
  }
  
  /* Geschenke - Gruppiert unter dem Baum */
  .presents-group {
    position: fixed;
    left: 5%;
    bottom: 3%;
    display: flex;
    gap: 1rem;
    z-index: 1;
    pointer-events: none;
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
    font-size: 3rem;
    opacity: 0.8;
    animation: presentBounce 2.5s ease-in-out infinite;
    filter: drop-shadow(0 0 15px rgba(255, 150, 150, 0.6));
  }
  
  .present.p1 { animation-delay: 0s; }
  .present.p2 { animation-delay: 0.4s; }
  .present.p3 { animation-delay: 0.8s; }
  .present.corner1 { animation-delay: 1.2s; font-size: 2.5rem; }
  .present.corner2 { animation-delay: 1.6s; font-size: 2.5rem; }
  
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
  
  /* Snowman - Schön aufgebaut */
  .snowman {
    position: fixed;
    right: 8%;
    bottom: 10%;
    z-index: 2;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .snowman-hat {
    font-size: 3rem;
    margin-bottom: -0.8rem;
    animation: hatTilt 4s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    z-index: 3;
  }
  
  @keyframes hatTilt {
    0%, 100% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(5deg);
    }
  }
  
  .snowman-head {
    position: relative;
    z-index: 2;
    margin-bottom: -0.5rem;
  }
  
  .snowman-face {
    font-size: 5rem;
    filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.9));
    animation: snowmanBob 3s ease-in-out infinite;
  }
  
  @keyframes snowmanBob {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }
  
  .snowman-scarf {
    position: absolute;
    top: 8rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3.5rem;
    animation: scarfWave 3s ease-in-out infinite;
    filter: drop-shadow(0 0 12px rgba(255, 100, 100, 0.7));
    z-index: 3;
  }
  
  @keyframes scarfWave {
    0%, 100% {
      transform: translateX(-50%) rotate(-5deg);
    }
    50% {
      transform: translateX(-50%) rotate(5deg);
    }
  }
  
  .snowman-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -1rem;
  }
  
  .snowman-middle,
  .snowman-bottom {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -1.5rem 0;
  }
  
  .snowman-circle {
    font-size: 4.5rem;
    filter: drop-shadow(0 0 22px rgba(255, 255, 255, 0.9));
  }
  
  .snowman-bottom .snowman-circle {
    font-size: 6rem;
  }
  
  .snowman-button {
    position: absolute;
    font-size: 1.2rem;
    animation: buttonShine 2s ease-in-out infinite;
  }
  
  .snowman-middle .btn-1 { top: 35%; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
  .snowman-middle .btn-2 { top: 65%; left: 50%; transform: translateX(-50%); animation-delay: 0.6s; }
  .snowman-bottom .btn-3 { top: 50%; left: 50%; transform: translateX(-50%); animation-delay: 1.2s; }
  
  @keyframes buttonShine {
    0%, 100% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .christmas-tree {
      left: 2%;
      bottom: 3%;
      transform: scale(0.7);
    }
    
    .snowman {
      right: 2%;
      bottom: 3%;
      transform: scale(0.7);
    }
    
    .presents-group {
      left: 2%;
      bottom: 1%;
      transform: scale(0.7);
    }
    
    .presents-corner {
      top: 2%;
      right: 2%;
      transform: scale(0.7);
    }
    
    .candle {
      font-size: 1.5rem;
    }
    
    .star {
      font-size: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
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
    
    .presents-group {
      transform: scale(0.5);
    }
    
    .presents-corner {
      display: none;
    }
    
    .candles,
    .candy-canes,
    .bells {
      opacity: 0.3;
    }
    
    .heart {
      display: none;
    }
  }
</style>
