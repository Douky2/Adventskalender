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
  /* Body styles moved to +layout.svelte */
  
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    position: relative;
  }
  
  .login-box {
    background: #fff;
    border-radius: 2px;
    padding: 3rem 2rem;
    max-width: 400px;
    width: 100%;
    box-shadow: 
      0 1px 4px rgba(0,0,0,0.05),
      0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    border: 1px solid #e0e0e0;
    position: relative;
    z-index: 1;
  }
  
  /* Paper stack effect */
  .login-box::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: -5px;
    bottom: -5px;
    background: #fff;
    z-index: -1;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transform: rotate(2deg);
  }
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: pulse 2s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
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
    color: #8b0000;
    margin-bottom: 0.5rem;
    font-weight: 800;
    letter-spacing: 1px;
    font-family: 'Georgia', serif;
  }
  
  .subtitle {
    color: #5d4037;
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
    border: 1px solid #bdbdbd;
    border-radius: 2px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    background: #fafafa;
    color: #3e2723;
    font-family: inherit;
    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.05);
  }
  
  input:focus {
    outline: none;
    border-color: #d4af37;
    background: #fff;
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
  }
  
  .login-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    font-weight: 700;
    border: none;
    border-radius: 2px;
    background: #2c1810;
    color: #d4af37;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Georgia', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
    background: #3e2723;
  }
  
  .error-message {
    background: #ffebee;
    color: #c62828;
    padding: 0.8rem;
    border-radius: 2px;
    margin-bottom: 1rem;
    font-size: 0.95rem;
    border: 1px solid #ef9a9a;
  }
  
  .hint {
    margin-top: 2rem;
    color: #90a4ae;
    font-size: 0.9rem;
    font-style: italic;
  }
</style>
