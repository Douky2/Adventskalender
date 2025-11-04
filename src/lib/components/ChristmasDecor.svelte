<script lang="ts">
  import { onMount } from 'svelte';

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

<!-- Schnee Animation -->
<div class="snowflakes-container"></div>

<!-- Viele kleine Herzen über die ganze Seite -->
<div class="heart heart-1">💕</div>
<div class="heart heart-2">💖</div>
<div class="heart heart-3">💝</div>
<div class="heart heart-4">💗</div>
<div class="heart heart-5">💕</div>
<div class="heart heart-6">💖</div>

<!-- Einfache Tannenbäume (mehrere verteilt) -->
<div class="tree tree-1">🎄</div>
<div class="tree tree-2">🌲</div>
<div class="tree tree-3">🎄</div>
<div class="tree tree-4">🌲</div>
<div class="tree tree-5">🎄</div>
<div class="tree tree-6">🌲</div>
<div class="tree tree-7">🎄</div>
<div class="tree tree-8">🌲</div>

<!-- Einfache Schneemänner (mehrere klein) -->
<div class="snowman sm-1">☃️</div>
<div class="snowman sm-2">⛄</div>
<div class="snowman sm-3">☃️</div>
<div class="snowman sm-4">⛄</div>
<div class="snowman sm-5">☃️</div>
<div class="snowman sm-6">⛄</div>

<!-- Geschenke verteilt -->
<div class="present pr-1">🎁</div>
<div class="present pr-2">🎁</div>
<div class="present pr-3">🎁</div>
<div class="present pr-4">🎁</div>
<div class="present pr-5">🎁</div>

<!-- Sterne überall -->
<div class="star star-1">⭐</div>
<div class="star star-2">✨</div>
<div class="star star-3">⭐</div>
<div class="star star-4">✨</div>
<div class="star star-5">⭐</div>
<div class="star star-6">✨</div>
<div class="star star-7">⭐</div>
<div class="star star-8">✨</div>
<div class="star star-9">⭐</div>
<div class="star star-10">✨</div>

<!-- Kerzen -->
<div class="candle candle-1">🕯️</div>
<div class="candle candle-2">🕯️</div>
<div class="candle candle-3">🕯️</div>
<div class="candle candle-4">🕯️</div>
<div class="candle candle-5">🕯️</div>
<div class="candle candle-6">🕯️</div>

<!-- Zuckerstangen -->
<div class="candy candy-1">🍭</div>
<div class="candy candy-2">🍭</div>
<div class="candy candy-3">🍭</div>
<div class="candy candy-4">🍭</div>

<!-- Glocken -->
<div class="bell bell-1">🔔</div>
<div class="bell bell-2">🔔</div>
<div class="bell bell-3">🔔</div>
<div class="bell bell-4">🔔</div>

<!-- Plätzchen -->
<div class="cookie cookie-1">🍪</div>
<div class="cookie cookie-2">🍪</div>
<div class="cookie cookie-3">🍪</div>
<div class="cookie cookie-4">🍪</div>

<!-- Rentiere -->
<div class="reindeer reindeer-1">🦌</div>
<div class="reindeer reindeer-2">🦌</div>
<div class="reindeer reindeer-3">🦌</div>

<!-- Mehr Weihnachts-Elemente -->
<div class="santa santa-1">🎅</div>
<div class="santa santa-2">🎅</div>

<div class="mistletoe mistletoe-1">🎄</div>
<div class="mistletoe mistletoe-2">🎄</div>
<div class="mistletoe mistletoe-3">🎄</div>

<div class="light light-1">💡</div>
<div class="light light-2">💡</div>
<div class="light light-3">💡</div>
<div class="light light-4">💡</div>

<div class="angel angel-1">👼</div>
<div class="angel angel-2">👼</div>

<div class="wreath wreath-1">🎀</div>
<div class="wreath wreath-2">🎀</div>
<div class="wreath wreath-3">🎀</div>

<div class="ornament ornament-1">🔴</div>
<div class="ornament ornament-2">🔵</div>
<div class="ornament ornament-3">🟡</div>
<div class="ornament ornament-4">🟢</div>

<div class="sleigh sleigh-1">🛷</div>
<div class="sleigh sleigh-2">🛷</div>

<div class="snowglobe snowglobe-1">🌨️</div>
<div class="snowglobe snowglobe-2">🌨️</div>

<div class="hot-chocolate hc-1">☕</div>
<div class="hot-chocolate hc-2">☕</div>
<div class="hot-chocolate hc-3">☕</div>

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
  
  /* === HERZEN === */
  .heart {
    position: fixed;
    font-size: 24px;
    pointer-events: none;
    z-index: 2;
    animation: pulse 3s ease-in-out infinite;
    opacity: 0.6;
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  .heart-1 { top: 10%; left: 5%; animation-delay: 0s; }
  .heart-2 { top: 15%; right: 8%; animation-delay: 0.5s; }
  .heart-3 { top: 60%; left: 3%; animation-delay: 1s; }
  .heart-4 { top: 70%; right: 5%; animation-delay: 1.5s; }
  .heart-5 { top: 40%; left: 90%; animation-delay: 2s; }
  .heart-6 { top: 85%; left: 50%; animation-delay: 2.5s; }
  
  /* === TANNENBÄUME === */
  .tree {
    position: fixed;
    font-size: 40px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: sway 4s ease-in-out infinite;
  }
  
  @keyframes sway {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }
  
  .tree-1 { bottom: 5%; left: 2%; }
  .tree-2 { bottom: 8%; left: 15%; animation-delay: 0.5s; }
  .tree-3 { bottom: 3%; right: 3%; animation-delay: 1s; }
  .tree-4 { bottom: 10%; right: 18%; animation-delay: 1.5s; }
  .tree-5 { top: 20%; left: 2%; animation-delay: 2s; }
  .tree-6 { top: 50%; left: 1%; animation-delay: 2.5s; }
  .tree-7 { top: 25%; right: 2%; animation-delay: 3s; }
  .tree-8 { top: 55%; right: 3%; animation-delay: 3.5s; }
  
  /* === SCHNEEMÄNNER === */
  .snowman {
    position: fixed;
    font-size: 35px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.8;
    animation: wiggle 3s ease-in-out infinite;
  }
  
  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
  
  .sm-1 { bottom: 15%; left: 8%; }
  .sm-2 { bottom: 12%; right: 12%; animation-delay: 0.5s; }
  .sm-3 { top: 35%; left: 5%; animation-delay: 1s; }
  .sm-4 { top: 65%; right: 7%; animation-delay: 1.5s; }
  .sm-5 { bottom: 40%; left: 3%; animation-delay: 2s; }
  .sm-6 { top: 80%; right: 4%; animation-delay: 2.5s; }
  
  /* === GESCHENKE === */
  .present {
    position: fixed;
    font-size: 30px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: bounce 2s ease-in-out infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .pr-1 { bottom: 20%; left: 20%; }
  .pr-2 { bottom: 18%; right: 22%; animation-delay: 0.3s; }
  .pr-3 { top: 15%; left: 10%; animation-delay: 0.6s; }
  .pr-4 { top: 45%; right: 10%; animation-delay: 0.9s; }
  .pr-5 { bottom: 50%; left: 95%; animation-delay: 1.2s; }
  
  /* === STERNE === */
  .star {
    position: fixed;
    font-size: 20px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.5;
    animation: twinkle 2s ease-in-out infinite;
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.2); }
  }
  
  .star-1 { top: 8%; left: 12%; }
  .star-2 { top: 12%; left: 25%; animation-delay: 0.3s; }
  .star-3 { top: 5%; right: 15%; animation-delay: 0.6s; }
  .star-4 { top: 18%; right: 30%; animation-delay: 0.9s; }
  .star-5 { top: 30%; left: 20%; animation-delay: 1.2s; }
  .star-6 { top: 45%; left: 10%; animation-delay: 1.5s; }
  .star-7 { top: 55%; right: 20%; animation-delay: 1.8s; }
  .star-8 { top: 75%; left: 15%; animation-delay: 2.1s; }
  .star-9 { top: 85%; right: 25%; animation-delay: 2.4s; }
  .star-10 { bottom: 10%; left: 40%; animation-delay: 2.7s; }
  
  /* === KERZEN === */
  .candle {
    position: fixed;
    font-size: 25px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.6;
    animation: flicker 1.5s ease-in-out infinite;
  }
  
  @keyframes flicker {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 0.9; }
  }
  
  .candle-1 { top: 20%; left: 30%; }
  .candle-2 { top: 40%; right: 35%; animation-delay: 0.3s; }
  .candle-3 { bottom: 25%; left: 35%; animation-delay: 0.6s; }
  .candle-4 { bottom: 45%; right: 30%; animation-delay: 0.9s; }
  .candle-5 { top: 60%; left: 25%; animation-delay: 1.2s; }
  .candle-6 { bottom: 60%; right: 40%; animation-delay: 1.5s; }
  
  /* === ZUCKERSTANGEN === */
  .candy {
    position: fixed;
    font-size: 28px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: rotate 5s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .candy-1 { top: 25%; left: 40%; }
  .candy-2 { bottom: 30%; right: 45%; animation-delay: 1s; }
  .candy-3 { top: 70%; left: 80%; animation-delay: 2s; }
  .candy-4 { bottom: 55%; left: 45%; animation-delay: 3s; }
  
  /* === GLOCKEN === */
  .bell {
    position: fixed;
    font-size: 22px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.6;
    animation: swing 2s ease-in-out infinite;
  }
  
  @keyframes swing {
    0%, 100% { transform: rotate(-15deg); }
    50% { transform: rotate(15deg); }
  }
  
  .bell-1 { top: 10%; left: 50%; }
  .bell-2 { top: 35%; right: 50%; animation-delay: 0.5s; }
  .bell-3 { bottom: 35%; left: 55%; animation-delay: 1s; }
  .bell-4 { bottom: 20%; right: 55%; animation-delay: 1.5s; }
  
  /* === PLÄTZCHEN === */
  .cookie {
    position: fixed;
    font-size: 26px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: spin 6s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .cookie-1 { top: 28%; left: 60%; }
  .cookie-2 { bottom: 40%; right: 60%; animation-delay: 1.5s; }
  .cookie-3 { top: 55%; left: 70%; animation-delay: 3s; }
  .cookie-4 { bottom: 65%; right: 15%; animation-delay: 4.5s; }
  
  /* === RENTIERE === */
  .reindeer {
    position: fixed;
    font-size: 32px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: jump 3s ease-in-out infinite;
  }
  
  @keyframes jump {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-5deg); }
  }
  
  .reindeer-1 { bottom: 8%; left: 45%; }
  .reindeer-2 { top: 42%; left: 85%; animation-delay: 1s; }
  .reindeer-3 { bottom: 70%; right: 50%; animation-delay: 2s; }
  
  /* === WEIHNACHTSMÄNNER === */
  .santa {
    position: fixed;
    font-size: 35px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.75;
    animation: wave 4s ease-in-out infinite;
  }
  
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
  }
  
  .santa-1 { top: 15%; right: 8%; }
  .santa-2 { bottom: 18%; left: 12%; animation-delay: 2s; }
  
  /* === MISTELZWEIGE === */
  .mistletoe {
    position: fixed;
    font-size: 24px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.6;
    animation: sway 3s ease-in-out infinite;
  }
  
  .mistletoe-1 { top: 12%; left: 30%; }
  .mistletoe-2 { top: 18%; right: 35%; animation-delay: 1s; }
  .mistletoe-3 { bottom: 80%; left: 60%; animation-delay: 2s; }
  
  /* === LICHTERKETTEN === */
  .light {
    position: fixed;
    font-size: 20px;
    pointer-events: none;
    z-index: 2;
    animation: blink 1.5s ease-in-out infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  .light-1 { top: 8%; left: 15%; }
  .light-2 { top: 8%; right: 15%; animation-delay: 0.5s; }
  .light-3 { bottom: 8%; left: 20%; animation-delay: 1s; }
  .light-4 { bottom: 8%; right: 20%; animation-delay: 1.5s; }
  
  /* === ENGEL === */
  .angel {
    position: fixed;
    font-size: 30px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.8;
    animation: float 5s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .angel-1 { top: 5%; left: 50%; }
  .angel-2 { bottom: 85%; right: 10%; animation-delay: 2.5s; }
  
  /* === KRÄNZE/SCHLEIFEN === */
  .wreath {
    position: fixed;
    font-size: 26px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: spin 8s linear infinite;
  }
  
  .wreath-1 { top: 35%; left: 8%; }
  .wreath-2 { bottom: 45%; right: 8%; animation-delay: 2s; }
  .wreath-3 { top: 65%; right: 25%; animation-delay: 4s; }
  
  /* === CHRISTBAUMKUGELN === */
  .ornament {
    position: fixed;
    font-size: 22px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: swing 2.5s ease-in-out infinite;
  }
  
  .ornament-1 { top: 22%; left: 38%; }
  .ornament-2 { top: 48%; right: 38%; animation-delay: 0.6s; }
  .ornament-3 { bottom: 32%; left: 42%; animation-delay: 1.2s; }
  .ornament-4 { bottom: 58%; right: 42%; animation-delay: 1.8s; }
  
  /* === SCHLITTEN === */
  .sleigh {
    position: fixed;
    font-size: 28px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.65;
    animation: slide 6s ease-in-out infinite;
  }
  
  @keyframes slide {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-15px); }
  }
  
  .sleigh-1 { top: 75%; left: 18%; }
  .sleigh-2 { bottom: 12%; right: 22%; animation-delay: 3s; }
  
  /* === SCHNEEKUGELN === */
  .snowglobe {
    position: fixed;
    font-size: 24px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: shake 4s ease-in-out infinite;
  }
  
  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-5deg); }
  }
  
  .snowglobe-1 { top: 52%; left: 12%; }
  .snowglobe-2 { bottom: 38%; right: 12%; animation-delay: 2s; }
  
  /* === HEISSE SCHOKOLADE === */
  .hot-chocolate {
    position: fixed;
    font-size: 24px;
    pointer-events: none;
    z-index: 2;
    opacity: 0.7;
    animation: steam 3s ease-in-out infinite;
  }
  
  @keyframes steam {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.05); }
  }
  
  .hc-1 { top: 38%; left: 75%; }
  .hc-2 { bottom: 48%; left: 28%; animation-delay: 1s; }
  .hc-3 { top: 68%; right: 32%; animation-delay: 2s; }
  
  /* Mobile Optimierung */
  @media (max-width: 768px) {
    .tree, .snowman, .present, .santa, .sleigh { font-size: 25px; }
    .heart, .star, .candle, .candy, .bell, .cookie, .reindeer, .angel, .wreath, .ornament, .snowglobe, .hot-chocolate { font-size: 18px; }
    .mistletoe, .light { font-size: 16px; }
  }
</style>
