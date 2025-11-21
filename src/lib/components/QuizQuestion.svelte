<script lang="ts">
  export let data: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  
  let selectedAnswer: number | null = null;
  let showResult = false;
  
  function selectAnswer(index: number) {
    selectedAnswer = index;
  }
  
  function checkAnswer() {
    showResult = true;
  }
  
  function reset() {
    selectedAnswer = null;
    showResult = false;
  }
  
  $: isCorrect = selectedAnswer === data.correctAnswer;
</script>

<div class="quiz-question">
  <h3>{data.question}</h3>
  
  <div class="options">
    {#each data.options as option, index}
      <button
        class="option"
        class:selected={selectedAnswer === index}
        class:correct={showResult && index === data.correctAnswer}
        class:wrong={showResult && selectedAnswer === index && !isCorrect}
        on:click={() => selectAnswer(index)}
        disabled={showResult}
      >
        {option}
      </button>
    {/each}
  </div>
  
  {#if !showResult && selectedAnswer !== null}
    <button class="check-btn" on:click={checkAnswer}>
      Antwort prüfen
    </button>
  {/if}
  
  {#if showResult}
    <div class="result" class:correct={isCorrect} class:wrong={!isCorrect}>
      {#if isCorrect}
        <p>🎉 Richtig! Du kennst mich gut! 💕</p>
      {:else}
        <p>😅 Fast! Die richtige Antwort ist: {data.options[data.correctAnswer]}</p>
      {/if}
      <button class="reset-btn" on:click={reset}>Nochmal versuchen</button>
    </div>
  {/if}
</div>

<style>
  .quiz-question {
    margin: 2rem 0;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #2c1810;
    font-family: 'Georgia', serif;
    text-align: center;
  }
  
  .options {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .option {
    padding: 1.2rem 1.5rem;
    font-size: 1.1rem;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    font-family: 'Georgia', serif;
    color: #5d4037;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.05);
  }
  
  .option:hover:not(:disabled) {
    border-color: #d4af37;
    background: #fffcf5;
    transform: translateX(5px);
    box-shadow: 4px 4px 0 rgba(212, 175, 55, 0.2);
  }
  
  .option.selected {
    border-color: #8b0000;
    background: #fff5f5;
    color: #8b0000;
    font-weight: 600;
  }
  
  .option.correct {
    border-color: #2e7d32;
    background: #f1f8e9;
    color: #2e7d32;
  }
  
  .option.wrong {
    border-color: #c62828;
    background: #ffebee;
    color: #c62828;
  }
  
  .option:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  .check-btn,
  .reset-btn {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Georgia', serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    margin: 0 auto;
  }
  
  .check-btn {
    background: #8b0000;
    color: white;
    border: 1px solid #8b0000;
  }
  
  .check-btn:hover {
    background: #a50000;
    transform: translateY(-2px);
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
  }
  
  .reset-btn {
    background: #fff;
    color: #5d4037;
    border: 1px solid #5d4037;
    margin-top: 1rem;
  }
  
  .reset-btn:hover {
    background: #5d4037;
    color: #fff;
  }
  
  .result {
    margin-top: 2rem;
    padding: 1.5rem;
    border-radius: 2px;
    text-align: center;
    font-family: 'Georgia', serif;
  }
  
  .result.correct {
    background: #f1f8e9;
    border: 1px dashed #2e7d32;
    color: #2e7d32;
  }
  
  .result.wrong {
    background: #ffebee;
    border: 1px dashed #c62828;
    color: #c62828;
  }
  
  .result p {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-weight: 500;
  }
</style>
