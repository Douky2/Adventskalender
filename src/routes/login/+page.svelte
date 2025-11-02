<script lang="ts">
  import { enhance } from '$app/forms';
  
  export let form;
</script>

<svelte:head>
  <title>Login - Adventskalender</title>
</svelte:head>

<div class="login-container">
  <div class="login-box">
    <div class="icon">🎄</div>
    <h1>Unser digitaler Adventskalender</h1>
    <p class="subtitle">Gib das geheime Passwort ein, um fortzufahren</p>
    
    <form method="POST" use:enhance>
      <div class="input-group">
        <input
          type="password"
          name="password"
          placeholder="Geheimes Passwort"
          required
          autocomplete="off"
        />
      </div>
      
      {#if form?.error}
        <div class="error-message">
          ❌ {form.error}
        </div>
      {/if}
      
      <button type="submit" class="login-btn">
        Eintreten ✨
      </button>
    </form>
    
    <p class="hint">💡 Psst... nur für uns zwei!</p>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
  
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1rem;
  }
  
  .login-box {
    background: white;
    border-radius: 20px;
    padding: 3rem 2rem;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  
  h1 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #7f8c8d;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }
  
  .input-group {
    margin-bottom: 1.5rem;
  }
  
  input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 12px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }
  
  input:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .login-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
  }
  
  .error-message {
    background: #fadbd8;
    color: #c0392b;
    padding: 0.8rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
  
  .hint {
    margin-top: 2rem;
    color: #95a5a6;
    font-size: 0.9rem;
  }
</style>
