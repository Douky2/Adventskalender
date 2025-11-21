<script lang="ts">
	import { onMount } from 'svelte';

    interface Snowflake {
        id: number;
        left: string;
        animationDuration: string;
        animationDelay: string;
        opacity: number;
        size: string;
    }

	let snowflakes: Snowflake[] = [];

	onMount(() => {
		// Create snowflakes
		snowflakes = Array.from({ length: 50 }).map((_, i) => ({
			id: i,
			left: Math.random() * 100 + '%',
			animationDuration: Math.random() * 5 + 5 + 's', // Slower fall: 5-10s
			animationDelay: Math.random() * 5 + 's',
            opacity: Math.random() * 0.5 + 0.3,
            size: Math.random() * 1 + 0.5 + 'em'
		}));
	});
</script>

<div class="snow-container" aria-hidden="true">
	{#each snowflakes as flake (flake.id)}
		<div
			class="snowflake"
			style="
                left: {flake.left}; 
                animation-duration: {flake.animationDuration}; 
                animation-delay: {flake.animationDelay}; 
                opacity: {flake.opacity};
                font-size: {flake.size};
            "
		>
			❄
		</div>
	{/each}
</div>

<style>
	.snow-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999; /* On top of everything */
		overflow: hidden;
	}

	.snowflake {
		position: absolute;
		top: -50px;
		color: #fff;
		animation-name: fall;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
        text-shadow: 0 0 5px rgba(255,255,255,0.8);
        will-change: transform;
	}

	@keyframes fall {
		0% {
			transform: translateY(-10vh) translateX(-10px) rotate(0deg);
		}
        50% {
            transform: translateY(50vh) translateX(10px) rotate(180deg);
        }
		100% {
			transform: translateY(110vh) translateX(-10px) rotate(360deg);
		}
	}
</style>
