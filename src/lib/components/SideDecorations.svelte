<script>
    import { fade } from 'svelte/transition';
</script>

<div class="side-decorations" in:fade={{ duration: 1000 }}>
    <div class="left-side">
        <div class="decor-group">
            <div class="decor-item tree">🎄</div>
            <div class="decor-item gift-small">🎁</div>
        </div>
        <div class="decor-item snowman">⛄</div>
    </div>

    <div class="right-side">
        <div class="decor-item reindeer">🦌</div>
        <div class="decor-group stack">
            <div class="decor-item gift-stack">🎁</div>
            <div class="decor-item star">⭐</div>
        </div>
    </div>
    
    <!-- Ground snow effect -->
    <div class="ground-snow"></div>
</div>

<style>
    .side-decorations {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0;
        z-index: 5;
        pointer-events: none;
    }

    .left-side, .right-side {
        position: fixed;
        bottom: 40px;
        display: flex;
        align-items: flex-end;
        gap: 10px;
        filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));
    }

    .left-side {
        left: 30px;
    }

    .right-side {
        right: 30px;
    }

    .decor-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: -10px;
    }
    
    .decor-group.stack {
        align-items: flex-end;
    }

    .decor-item {
        transition: transform 0.3s ease;
        cursor: default;
        line-height: 1;
    }

    .decor-item:hover {
        transform: scale(1.1) rotate(5deg);
    }

    .tree { 
        font-size: 8rem; 
        z-index: 2;
    }
    
    .gift-small {
        font-size: 3rem;
        margin-top: -20px;
        margin-left: 40px;
        z-index: 3;
    }
    
    .snowman { 
        font-size: 5rem; 
        margin-left: -10px;
        z-index: 1;
    }
    
    .reindeer { 
        font-size: 6rem; 
        margin-right: 10px;
        transform: scaleX(-1); /* Face left */
    }
    
    .gift-stack { 
        font-size: 4.5rem; 
    }
    
    .star {
        font-size: 3rem;
        margin-bottom: 10px;
        animation: twinkle 3s infinite ease-in-out;
    }
    
    .ground-snow {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 100%);
        z-index: -1;
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        transform: scaleX(1.5);
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(0.9); }
    }
    
    @media (max-width: 1400px) {
        .tree { font-size: 6rem; }
        .reindeer { font-size: 4.5rem; }
        .snowman { font-size: 3.5rem; }
        .gift-stack { font-size: 3.5rem; }
        .gift-small { font-size: 2rem; }
    }
    
    @media (max-width: 1000px) {
        .side-decorations { display: none; }
    }
</style>