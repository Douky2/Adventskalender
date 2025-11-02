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
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  .options {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .option {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
  }
  
  .option:hover:not(:disabled) {
    border-color: #e74c3c;
    background: #fff5f5;
    transform: translateX(5px);
  }
  
  .option.selected {
    border-color: #3498db;
    background: #ebf5fb;
  }
  
  .option.correct {
    border-color: #27ae60;
    background: #d5f4e6;
  }
  
  .option.wrong {
    border-color: #e74c3c;
    background: #fadbd8;
  }
  
  .option:disabled {
    cursor: not-allowed;
  }
  
  .check-btn,
  .reset-btn {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .check-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .check-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .reset-btn {
    background: #95a5a6;
    color: white;
    margin-top: 1rem;
  }
  
  .reset-btn:hover {
    background: #7f8c8d;
  }
  
  .result {
    margin-top: 1.5rem;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
  }
  
  .result.correct {
    background: #d5f4e6;
    border: 2px solid #27ae60;
  }
  
  .result.wrong {
    background: #fadbd8;
    border: 2px solid #e74c3c;
  }
  
  .result p {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 500;
  }
</style>
