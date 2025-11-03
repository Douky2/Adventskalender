<script lang="ts">
  export let content: string;
  export let author: string | undefined = undefined;
</script>

<div class="content-box content-love-letter">
  {#if author}
    <div class="author-badge">💌 {author}</div>
  {/if}
  <div class="letter-header">
    <div class="envelope-icon">💌</div>
    <h3>Liebesbrief</h3>
  </div>
  <div class="letter-content">
    {content}
  </div>
</div>

<style>
  .content-box {
    padding: 2.5rem;
    border-radius: 15px;
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
    border-left: 4px solid #ff6b6b;
    box-shadow: 0 8px 16px rgba(255, 107, 107, 0.2);
    margin-bottom: 2rem;
  }
  
  .author-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #2c3e50;
  }
  
  .letter-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .envelope-icon {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  .letter-header h3 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin: 0;
  }
  
  .letter-content {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #2c3e50;
    white-space: pre-wrap;
    font-family: 'Georgia', serif;
  }
</style>
