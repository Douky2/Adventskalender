<script lang="ts">
  export let content: string;
  export let author: string | undefined = undefined;
</script>

<div class="content-box content-image">
  {#if author}
    <div class="author-badge">{author}</div>
  {/if}
  <img src={content} alt="Kalender Bild" class="calendar-image" />
</div>

<style>
  .content-box {
    padding: 2rem;
    border-radius: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
  }
  
  .author-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #2c3e50;
  }
  
  .calendar-image {
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: block;
    margin: 0 auto;
  }
</style>
