<script lang="ts">
  let quizTitle = '';
  let questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[] = [
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ];
  
  let generatedJson = '';
  let showPreview = false;
  
  function addQuestion() {
    questions = [...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }];
  }
  
  function removeQuestion(index: number) {
    if (questions.length > 1) {
      questions = questions.filter((_, i) => i !== index);
    }
  }
  
  function addOption(questionIndex: number) {
    questions[questionIndex].options = [...questions[questionIndex].options, ''];
  }
  
  function removeOption(questionIndex: number, optionIndex: number) {
    if (questions[questionIndex].options.length > 2) {
      questions[questionIndex].options = questions[questionIndex].options.filter((_, i) => i !== optionIndex);
      // Korrigiere correctAnswer falls nötig
      if (questions[questionIndex].correctAnswer >= questions[questionIndex].options.length) {
        questions[questionIndex].correctAnswer = questions[questionIndex].options.length - 1;
      }
    }
  }
  
  function generateJson() {
    const quiz = {
      questions: questions.map(q => ({
        question: q.question,
        options: q.options.filter(o => o.trim() !== ''),
        correctAnswer: q.correctAnswer
      })).filter(q => q.question.trim() !== '' && q.options.length >= 2)
    };
    
    generatedJson = JSON.stringify(quiz, null, 2);
    showPreview = true;
  }
  
  function copyToClipboard() {
    navigator.clipboard.writeText(generatedJson);
    alert('✅ JSON in Zwischenablage kopiert!');
  }
  
  function loadExample() {
    quizTitle = 'Wie gut kennst du mich?';
    questions = [
      {
        question: 'Was ist mein Lieblingsessen?',
        options: ['Pizza', 'Pasta', 'Sushi', 'Burger'],
        correctAnswer: 0
      },
      {
        question: 'Welche Farbe mag ich am liebsten?',
        options: ['Blau', 'Rot', 'Grün', 'Gelb'],
        correctAnswer: 2
      },
      {
        question: 'Was mache ich am liebsten am Wochenende?',
        options: ['Sport', 'Schlafen', 'Gaming', 'Lesen'],
        correctAnswer: 2
      }
    ];
  }
</script>

<div class="quiz-builder">
  <div class="header">
    <h1>🎯 Quiz-Builder</h1>
    <p class="subtitle">Erstelle interaktive Quizze für den Adventskalender</p>
  </div>
  
  <div class="actions-top">
    <button class="btn-example" on:click={loadExample}>
      💡 Beispiel laden
    </button>
    <a href="/admin" class="btn-back">← Zurück</a>
  </div>
  
  <div class="quiz-form">
    <div class="form-section">
      <h2>📝 Quiz-Titel (optional)</h2>
      <input 
        type="text" 
        bind:value={quizTitle} 
        placeholder="z.B. 'Wie gut kennst du mich?'"
        class="title-input"
      />
    </div>
    
    <div class="questions-container">
      <h2>❓ Fragen ({questions.length})</h2>
      
      {#each questions as question, qIndex}
        <div class="question-card">
          <div class="question-header">
            <h3>Frage {qIndex + 1}</h3>
            {#if questions.length > 1}
              <button class="btn-remove" on:click={() => removeQuestion(qIndex)}>
                🗑️ Entfernen
              </button>
            {/if}
          </div>
          
          <div class="form-group">
            <label for={`question-${qIndex}-text`}>Fragetext:</label>
            <textarea 
              id={`question-${qIndex}-text`}
              bind:value={question.question}
              placeholder="Deine Frage hier..."
              rows="2"
            ></textarea>
          </div>
          
          <fieldset class="options-section">
            <legend>Antwortmöglichkeiten:</legend>
            
            {#each question.options as option, oIndex}
              <div class="option-row">
                <div class="radio-wrapper">
                  <input 
                    id={`correct-${qIndex}-${oIndex}`}
                    type="radio" 
                    name={`correct-${qIndex}`}
                    checked={question.correctAnswer === oIndex}
                    on:change={() => question.correctAnswer = oIndex}
                  />
                  <label class="radio-label" for={`correct-${qIndex}-${oIndex}`}>Richtig</label>
                </div>
                
                <input 
                  id={`option-${qIndex}-${oIndex}`}
                  type="text"
                  bind:value={question.options[oIndex]}
                  placeholder="Option {oIndex + 1}"
                  class="option-input"
                  aria-label={`Antwortoption ${oIndex + 1}`}
                />
                
                {#if question.options.length > 2}
                  <button 
                    class="btn-remove-option"
                    on:click={() => removeOption(qIndex, oIndex)}
                  >
                    ✕
                  </button>
                {/if}
              </div>
            {/each}
            
            <button class="btn-add-option" on:click={() => addOption(qIndex)}>
              ➕ Option hinzufügen
            </button>
          </fieldset>
        </div>
      {/each}
      
      <button class="btn-add-question" on:click={addQuestion}>
        ➕ Weitere Frage hinzufügen
      </button>
    </div>
    
    <div class="generate-section">
      <button class="btn-generate" on:click={generateJson}>
        ✨ JSON generieren
      </button>
    </div>
  </div>
  
  {#if showPreview && generatedJson}
    <div class="preview-section">
      <h2>📋 Generiertes JSON</h2>
      <p class="preview-info">
        Kopiere dieses JSON und füge es im Admin-Panel beim Content-Typ <code>QUIZ_JSON</code> ein:
      </p>
      
      <div class="json-preview">
        <pre>{generatedJson}</pre>
      </div>
      
      <div class="preview-actions">
        <button class="btn-copy" on:click={copyToClipboard}>
          📋 In Zwischenablage kopieren
        </button>
      </div>
      
      <div class="usage-info">
        <h3>💡 Verwendung:</h3>
        <ol>
          <li>Kopiere das JSON oben</li>
          <li>Gehe zum Admin-Panel und wähle ein Türchen</li>
          <li>Wähle Content-Typ: <strong>QUIZ_JSON</strong></li>
          <li>Füge das JSON in das Content-Feld ein</li>
          <li>Speichern!</li>
        </ol>
      </div>
    </div>
  {/if}
</div>

<style>
  .quiz-builder {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }
  
  .header {
    text-align: center;
    color: white;
    margin-bottom: 2rem;
  }
  
  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .actions-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  
  .btn-example {
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-example:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
  }
  
  .btn-back {
    padding: 0.8rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  .btn-back:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .quiz-form {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  .form-section {
    margin-bottom: 2rem;
  }
  
  .form-section h2 {
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  .title-input {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1.1rem;
    transition: border-color 0.3s ease;
  }
  
  .title-input:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .questions-container h2 {
    color: #667eea;
    margin-bottom: 1.5rem;
  }
  
  .question-card {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .question-card:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
  }
  
  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .question-header h3 {
    color: #764ba2;
    margin: 0;
  }
  
  .btn-remove {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  
  .btn-remove:hover {
    transform: scale(1.05);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    color: #555;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    transition: border-color 0.3s ease;
  }
  
  textarea:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .options-section {
    margin-top: 1rem;
  }
  
  .options-section label {
    display: block;
    color: #555;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  
  .option-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.8rem;
  }
  
  .radio-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 80px;
  }
  
  .radio-label {
    font-size: 0.9rem;
    color: #666;
  }
  
  .option-input {
    flex: 1;
    padding: 0.8rem;
    border: 2px solid #e9ecef;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .option-input:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .btn-remove-option {
    padding: 0.5rem 0.8rem;
    background: #ff6b6b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    transition: all 0.3s ease;
  }
  
  .btn-remove-option:hover {
    background: #ee5a6f;
    transform: scale(1.1);
  }
  
  .btn-add-option {
    padding: 0.6rem 1.2rem;
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    transition: all 0.3s ease;
  }
  
  .btn-add-option:hover {
    transform: scale(1.05);
  }
  
  .btn-add-question {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }
  
  .btn-add-question:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  
  .generate-section {
    margin-top: 2rem;
    text-align: center;
  }
  
  .btn-generate {
    padding: 1.2rem 3rem;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.3rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-generate:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(245, 87, 108, 0.5);
  }
  
  .preview-section {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  .preview-section h2 {
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  .preview-info {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .preview-info code {
    background: #f8f9fa;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    color: #d63384;
    font-family: 'Courier New', monospace;
  }
  
  .json-preview {
    background: #1e1e1e;
    border-radius: 8px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }
  
  .json-preview pre {
    margin: 0;
    color: #d4d4d4;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .preview-actions {
    text-align: center;
    margin: 1.5rem 0;
  }
  
  .btn-copy {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-copy:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(56, 239, 125, 0.4);
  }
  
  .usage-info {
    background: #f8f9fa;
    border-left: 4px solid #667eea;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
  }
  
  .usage-info h3 {
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  .usage-info ol {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .usage-info li {
    color: #555;
    line-height: 1.8;
    margin-bottom: 0.5rem;
  }
  
  .usage-info strong {
    color: #764ba2;
  }
  
  @media (max-width: 768px) {
    .quiz-builder {
      padding: 1rem;
    }
    
    .option-row {
      flex-direction: column;
      align-items: stretch;
    }
    
    .radio-wrapper {
      min-width: auto;
    }
  }
</style>
