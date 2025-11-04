<script lang="ts">
  import TileEditor from '$lib/components/TileEditor.svelte';
  import type { PageData } from './$types';
  
  export let data: PageData;
</script>

<TileEditor tile={data.tile} />
