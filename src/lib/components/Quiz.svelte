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
  }
  
  .quiz-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .quiz-header h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  .progress {
    font-size: 0.9rem;
    color: #7f8c8d;
    font-weight: 500;
  }
  
  .final-score {
    text-align: center;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    color: white;
  }
  
  .final-score h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .score-display {
    font-size: 4rem;
    font-weight: bold;
    margin: 1.5rem 0;
  }
  
  .final-score p {
    font-size: 1.2rem;
    margin: 1.5rem 0;
    line-height: 1.6;
  }
  
  .retry-btn {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: 2px solid white;
    border-radius: 50px;
    background: transparent;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }
  
  .retry-btn:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
  }
</style>
