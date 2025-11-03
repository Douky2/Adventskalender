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

<!-- Christmas Tree - Links unten (einzelner schöner Baum) -->
<div class="christmas-tree">
  <div class="tree-topper">⭐</div>
  <div class="tree-body">�</div>
  <div class="tree-decorations">
    <span class="ornament o1">🔴</span>
    <span class="ornament o2">🟡</span>
    <span class="ornament o3">🔵</span>
    <span class="ornament o4">⚪</span>
    <span class="ornament o5">🟣</span>
  </div>
  <div class="tree-lights-sparkle">✨</div>
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
</div>

<!-- Snowman - Rechts unten (kompakter) -->
<div class="snowman">
  <div class="snowman-complete">☃️</div>
  <div class="snowman-accessories">
    <span class="snowman-hat">🎩</span>
    <span class="snowman-scarf">🧣</span>
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
  
  /* Christmas Tree - Neues Design */
  .christmas-tree {
    position: fixed;
    left: 3%;
    bottom: 5%;
    z-index: 1;
    pointer-events: none;
  }
  
  .tree-topper {
    font-size: 3rem;
    text-align: center;
    animation: starShine 2s ease-in-out infinite;
    filter: drop-shadow(0 0 20px gold);
    margin-bottom: -1rem;
  }
  
  @keyframes starShine {
    0%, 100% {
      opacity: 1;
      transform: rotate(0deg) scale(1);
      filter: drop-shadow(0 0 20px gold);
    }
    50% {
      opacity: 0.8;
      transform: rotate(10deg) scale(1.1);
      filter: drop-shadow(0 0 30px gold);
    }
  }
  
  .tree-body {
    font-size: 10rem;
    text-align: center;
    filter: drop-shadow(0 0 25px rgba(0, 200, 0, 0.8));
    animation: treeGlow 3s ease-in-out infinite;
  }
  
  @keyframes treeGlow {
    0%, 100% {
      filter: drop-shadow(0 0 25px rgba(0, 200, 0, 0.8));
    }
    50% {
      filter: drop-shadow(0 0 35px rgba(0, 255, 0, 0.9));
    }
  }
  
  .tree-decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .ornament {
    position: absolute;
    font-size: 1.5rem;
    animation: ornamentSwing 3s ease-in-out infinite;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  }
  
  .ornament.o1 { top: 20%; left: 30%; animation-delay: 0s; }
  .ornament.o2 { top: 35%; right: 25%; animation-delay: 0.6s; }
  .ornament.o3 { top: 50%; left: 35%; animation-delay: 1.2s; }
  .ornament.o4 { top: 60%; right: 30%; animation-delay: 1.8s; }
  .ornament.o5 { top: 70%; left: 40%; animation-delay: 2.4s; }
  
  @keyframes ornamentSwing {
    0%, 100% {
      transform: rotate(-3deg) scale(1);
    }
    50% {
      transform: rotate(3deg) scale(1.05);
    }
  }
  
  .tree-lights-sparkle {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    animation: lightsSparkle 1.5s ease-in-out infinite;
  }
  
  @keyframes lightsSparkle {
    0%, 100% {
      opacity: 0.4;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) scale(1.2);
      filter: drop-shadow(0 0 15px gold);
    }
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
  
  /* Snowman - Neues kompaktes Design */
  .snowman {
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 1;
    pointer-events: none;
    text-align: center;
  }
  
  .snowman-complete {
    font-size: 8rem;
    filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.9));
    animation: snowmanBob 3s ease-in-out infinite;
  }
  
  @keyframes snowmanBob {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-5px) rotate(2deg);
    }
  }
  
  .snowman-accessories {
    position: relative;
    margin-top: -2rem;
  }
  
  .snowman-hat {
    position: absolute;
    top: -6rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3rem;
    animation: hatTilt 4s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  }
  
  @keyframes hatTilt {
    0%, 100% {
      transform: translateX(-50%) rotate(0deg);
    }
    50% {
      transform: translateX(-50%) rotate(-8deg);
    }
  }
  
  .snowman-scarf {
    position: absolute;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    animation: scarfWave 3s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(255, 100, 100, 0.6));
  }
  
  @keyframes scarfWave {
    0%, 100% {
      transform: translateX(-50%) rotate(0deg);
    }
    50% {
      transform: translateX(-45%) rotate(5deg);
    }
  }
  
  @media (max-width: 768px) {
    .christmas-tree {
      left: 1%;
      bottom: 2%;
      transform: scale(0.6);
    }
    
    .snowman {
      right: 1%;
      bottom: 2%;
      transform: scale(0.6);
    }
    
    .presents-group {
      left: 2%;
      bottom: 1%;
      transform: scale(0.6);
    }
    
    .presents-corner {
      top: 2%;
      right: 2%;
      transform: scale(0.6);
    }
    
    .candle {
      font-size: 1.5rem;
    }
    
    .candy-cane {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 480px) {
    .christmas-tree,
    .snowman {
      transform: scale(0.4);
    }
    
    .presents-group,
    .presents-corner {
      display: none;
    }
    
    .candles,
    .candy-canes {
      opacity: 0.3;
    }
  }
</style>
