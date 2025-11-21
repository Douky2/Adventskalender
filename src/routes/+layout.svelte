<script>
  import '../app.css';
  import ChristmasDecor from '$lib/components/ChristmasDecor.svelte';
  import MusicPlayer from '$lib/components/MusicPlayer.svelte';
  import Snow from '$lib/components/Snow.svelte';
  import SideDecorations from '$lib/components/SideDecorations.svelte';

  export let data;
</script>

<ChristmasDecor />
<SideDecorations />

{#if data.enableSnow}
  <Snow />
{/if}

{#if data.musicFiles && data.musicFiles.length > 0}
  <MusicPlayer files={data.musicFiles} autoplay={data.musicAutoplay} />
{/if}

<slot />

<style>
  :global(body) {
    margin: 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    /* Lighter, warmer, more inviting background */
    background-color: #3e1e14; 
    background-image: 
      radial-gradient(circle at 50% 30%, rgba(180, 60, 30, 0.4) 0%, rgba(40, 15, 10, 0.95) 85%),
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.07'/%3E%3C/svg%3E");
    background-attachment: fixed;
    color: #f4e4c1;
    min-height: 100vh;
  }
</style>