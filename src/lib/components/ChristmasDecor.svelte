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
    <span class="ornament ornament-8">🔵</span>
    <span class="ornament ornament-9">🟣</span>
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
  
  /* Christmas Tree */
  .christmas-tree {
    position: fixed;
    left: 2%;
    bottom: 3%;
    z-index: 1;
    pointer-events: none;
    transform: scale(1.3);
  }
  
  .tree-star {
    font-size: 2.8rem;
    text-align: center;
    animation: starShine 2s ease-in-out infinite;
    filter: drop-shadow(0 0 15px gold);
  }
  
  @keyframes starShine {
    0%, 100% {
      opacity: 1;
      filter: brightness(1.2) drop-shadow(0 0 15px gold);
    }
    50% {
      opacity: 0.9;
      filter: brightness(1.8) drop-shadow(0 0 25px gold);
    }
  }
  
  .tree-part {
    position: relative;
    text-align: center;
    margin: -0.8rem 0;
  }
  
  .tree-emoji {
    font-size: 5rem;
    filter: drop-shadow(0 0 15px rgba(0, 150, 0, 0.6));
  }
  
  .tree-top .tree-emoji {
    font-size: 3.5rem;
  }
  
  .tree-middle .tree-emoji {
    font-size: 5.5rem;
  }
  
  .tree-bottom .tree-emoji {
    font-size: 6.5rem;
  }
  
  .ornament {
    position: absolute;
    font-size: 0.8rem;
    animation: ornamentSwing 3s ease-in-out infinite;
  }
  
  .tree-top .ornament-1 { top: 30%; left: 35%; animation-delay: 0s; }
  .tree-top .ornament-2 { top: 50%; right: 30%; animation-delay: 0.5s; }
  .tree-top .ornament-3 { top: 40%; left: 50%; animation-delay: 1s; }
  
  .tree-middle .ornament-4 { top: 25%; left: 25%; animation-delay: 0.2s; }
  .tree-middle .ornament-5 { top: 45%; right: 20%; animation-delay: 0.7s; }
  .tree-middle .ornament-6 { top: 60%; left: 40%; animation-delay: 1.2s; }
  .tree-middle .ornament-7 { top: 35%; right: 40%; animation-delay: 1.7s; }
  
  .tree-bottom .ornament-8 { top: 30%; left: 20%; animation-delay: 0.3s; }
  .tree-bottom .ornament-9 { top: 50%; right: 15%; animation-delay: 0.8s; }
  .tree-bottom .ornament-10 { top: 65%; left: 45%; animation-delay: 1.3s; }
  
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
    text-align: center;
    margin-top: -1rem;
  }
  
  .tree-lights {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    animation: lightsSparkle 1s ease-in-out infinite;
  }
  
  @keyframes lightsSparkle {
    0%, 100% {
      opacity: 0.3;
      filter: brightness(1);
    }
    50% {
      opacity: 0.8;
      filter: brightness(1.5) drop-shadow(0 0 10px gold);
    }
  }
  
  /* Geschenke überall verteilt */
  .presents {
    position: fixed;
    left: 2%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    z-index: 1;
    pointer-events: none;
  }
  
  .present {
    font-size: 3.5rem;
    opacity: 0.7;
    animation: presentBounce 2s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(255, 100, 100, 0.5));
  }
  
  .present-1 { animation-delay: 0s; }
  .present-2 { animation-delay: 0.3s; }
  .present-3 { animation-delay: 0.6s; }
  .present-4 { animation-delay: 0.9s; }
  .present-5 { animation-delay: 1.2s; }
  .present-6 { animation-delay: 1.5s; }
  
  @keyframes presentBounce {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-10px) scale(1.05);
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
  
  /* Snowman Decoration */
  .snowman {
    position: fixed;
    right: 3%;
    bottom: 3%;
    z-index: 1;
    pointer-events: none;
    transform: scale(1.4);
  }
  
  .snowman-hat {
    font-size: 3.5rem;
    text-align: center;
    animation: hatTilt 4s ease-in-out infinite;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
  }
  
  @keyframes hatTilt {
    0%, 100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-5deg);
    }
  }
  
  .snowman-top {
    position: relative;
    text-align: center;
  }
  
  .snowman-face {
    font-size: 5rem;
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
  }
  
  .snowman-middle,
  .snowman-bottom {
    position: relative;
    text-align: center;
    margin-top: -1.5rem;
  }
  
  .snowman-body-circle {
    font-size: 4rem;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
  }
  
  .snowman-button {
    position: absolute;
    font-size: 0.8rem;
  }
  
  .snowman-middle .btn-1 { top: 35%; left: 45%; }
  .snowman-middle .btn-2 { top: 55%; left: 48%; }
  .snowman-bottom .btn-3 { top: 45%; left: 48%; }
  
  .snowman-scarf {
    font-size: 2.8rem;
    text-align: center;
    animation: scarfWave 3s ease-in-out infinite;
    filter: drop-shadow(0 0 8px rgba(255, 100, 100, 0.5));
  }
  
  @keyframes scarfWave {
    0%, 100% {
      transform: translateX(0) rotate(0deg);
    }
    50% {
      transform: translateX(5px) rotate(3deg);
    }
  }
  
  @media (max-width: 768px) {
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
      display: none;
    }
    
    .candles {
      display: none;
    }
  }
</style>
