<script lang="ts">
  export let content: string;
  export let author: string | undefined = undefined;
  
  // Extract video ID from various YouTube URL formats
  function getYouTubeEmbedUrl(url: string): string {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : url;
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  $: embedUrl = content.includes('youtube.com') || content.includes('youtu.be') 
    ? getYouTubeEmbedUrl(content) 
    : content;
</script>

<div class="content-box content-video">
  {#if author}
    <div class="author-badge">{author}</div>
  {/if}
  <div class="video-wrapper">
    <iframe
      src={embedUrl}
      title="Video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="video-embed"
    ></iframe>
  </div>
</div>

<style>
  .content-box {
    padding: 2rem;
    border-radius: 15px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
  
  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    border-radius: 10px;
  }
  
  .video-embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
</style>
