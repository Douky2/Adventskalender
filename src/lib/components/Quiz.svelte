<script lang="ts">
  import QuizQuestion from './QuizQuestion.svelte';
  
  export let data: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  
  let currentQuestion = 0;
  let score = 0;
  let answered = 0;
  let showFinalScore = false;
</script>

<div class="quiz-container">
  <div class="quiz-header">
    <h2>Quiz Zeit! 🧠</h2>
    <div class="progress">
      Frage {currentQuestion + 1} von {data.questions.length}
    </div>
  </div>
  
  {#if !showFinalScore}
    <QuizQuestion 
      data={data.questions[currentQuestion]}
      on:answered={(e) => {
        answered++;
        if (e.detail.correct) score++;
        
        if (currentQuestion < data.questions.length - 1) {
          setTimeout(() => {
            currentQuestion++;
          }, 1500);
        } else {
          setTimeout(() => {
            showFinalScore = true;
          }, 1500);
        }
      }}
    />
  {:else}
    <div class="final-score">
      <h3>Quiz abgeschlossen! 🎉</h3>
      <div class="score-display">
        {score} / {data.questions.length}
      </div>
      <p>
        {#if score === data.questions.length}
          Perfekt! Du kennst mich wirklich gut! 💕
        {:else if score >= data.questions.length / 2}
          Nicht schlecht! Aber ich glaube, wir müssen mehr miteinander reden 😄
        {:else}
          Ups! Wir haben noch viel über uns zu lernen! 💬
        {/if}
      </p>
      <button 
        class="retry-btn"
        on:click={() => {
          currentQuestion = 0;
          score = 0;
          answered = 0;
          showFinalScore = false;
        }}
      >
        Nochmal spielen
      </button>
    </div>
  {/if}
</div>

<style>
  .quiz-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    position: relative;
  }
  
  .quiz-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    z-index: 1;
  }
  
  .quiz-header h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #8b0000;
    font-family: 'Georgia', serif;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.1);
  }
  
  .progress {
    font-size: 1.1rem;
    color: #5d4037;
    font-weight: 500;
    font-family: 'Georgia', serif;
    font-style: italic;
    border-bottom: 1px dashed #d4af37;
    display: inline-block;
    padding-bottom: 0.2rem;
  }
  
  .final-score {
    text-align: center;
    padding: 3rem 2rem;
    background: #fff;
    border-radius: 2px;
    color: #2c1810;
    border: 1px solid #e0e0e0;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    position: relative;
  }
  
  .final-score::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: -4px;
    bottom: -4px;
    border: 1px solid #e0e0e0;
    z-index: -1;
  }
  
  .final-score h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #8b0000;
    font-family: 'Georgia', serif;
  }
  
  .score-display {
    font-size: 4rem;
    font-weight: bold;
    margin: 1.5rem 0;
    color: #d4af37;
    font-family: 'Georgia', serif;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
  }
  
  .final-score p {
    font-size: 1.3rem;
    margin: 1.5rem 0;
    line-height: 1.6;
    font-family: 'Georgia', serif;
    color: #5d4037;
  }
  
  .retry-btn {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: 1px solid #8b0000;
    border-radius: 2px;
    background: #8b0000;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    font-family: 'Georgia', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .retry-btn:hover {
    background: #a50000;
    transform: translateY(-2px);
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  }
</style>
