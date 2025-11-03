<script lang="ts">
  export let content: string;
  export let author: string | undefined = undefined;
</script>

<div class="content-box content-text">
  {#if author}
    <div class="author-badge">{author}</div>
  {/if}
  <div class="text-content">
    {content}
  </div>
</div>

<style>
  .content-box {
    padding: 2rem;
    border-radius: 15px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  
  .text-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #2c3e50;
    white-space: pre-wrap;
  }
</style>
