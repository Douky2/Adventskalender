<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  export let form: ActionData;
</script>

<div class="login-container">
  <div class="login-box">
    <h1>🔐 Admin-Bereich</h1>
    <p>Bitte gib das Admin-Passwort ein:</p>
    
    <form method="POST" use:enhance>
      <input 
        type="password" 
        name="password" 
        placeholder="Admin-Passwort" 
        required 
        autocomplete="off"
      />
      
      {#if form?.error}
        <div class="error">{form.error}</div>
      {/if}
      
      <button type="submit">🔓 Anmelden</button>
    </form>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    /* Lighter, warm paper/parchment background */
    background: #fdfbf7;
    background-image: 
      linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
      radial-gradient(circle at center, #fffcf5 0%, #f0e6d2 100%);
    background-size: 40px 40px, 40px 40px, 100% 100%;
    min-height: 100vh;
    color: #2c1810;
  }
  
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
  }
  
  .login-box {
    background: #fff;
    padding: 3rem;
    border-radius: 2px;
    box-shadow: 
      0 1px 4px rgba(0,0,0,0.05),
      0 10px 30px rgba(0,0,0,0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
    border: 1px solid #e0e0e0;
    position: relative;
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
    transform: rotate(1deg);
  }
  
  h1 {
    margin: 0 0 1rem 0;
    color: #8b0000;
    font-size: 2rem;
    font-family: 'Georgia', serif;
    font-weight: 800;
  }
  
  p {
    color: #5d4037;
    margin-bottom: 2rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input {
    padding: 1rem;
    border: 1px solid #bdbdbd;
    border-radius: 2px;
    font-size: 1rem;
    transition: all 0.3s;
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
  
  button {
    padding: 1rem;
    background: #2c1810;
    color: #d4af37;
    border: none;
    border-radius: 2px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Georgia', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 3px 3px 0px rgba(0,0,0,0.2);
    background: #3e2723;
  }
  
  button:active {
    transform: translateY(0);
  }
  
  .error {
    background: #ffebee;
    color: #c62828;
    padding: 1rem;
    border-radius: 2px;
    border: 1px solid #ef9a9a;
  }
</style>
