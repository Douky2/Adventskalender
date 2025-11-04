<script lang="ts">
  import { fade } from 'svelte/transition';
  
  // Content-Typen Kategorien
  const categories = {
    Basis: ['TEXT', 'IMAGE_URL', 'VIDEO_EMBED'],
    Romantisch: ['LOVE_LETTER', 'APPRECIATION', 'MEMORY', 'GRATITUDE', 'GRATITUDE_EXCHANGE', 'COMPLIMENT', 'LOVE_POEM', 'FAVORITE_THING_ABOUT_YOU', 'REASONS_I_LOVE_YOU', 'LOVE_LANGUAGE', 'RANDOM_ACTS'],
    Virtual: ['VIRTUAL_DATE', 'MOVIE_NIGHT', 'GAME_CHALLENGE', 'COOKING_TOGETHER', 'WORKOUT_CHALLENGE'],
    Musik: ['PLAYLIST_COLLAB', 'COLLABORATIVE_PLAYLIST', 'SPOTIFY_SONG', 'VOICE_MESSAGE', 'PODCAST_SHARE'],
    Spiele: ['WOULD_YOU_RATHER', 'THIS_OR_THAT', 'TRUTH_OR_DARE', 'TWO_TRUTHS_ONE_LIE', 'DEBATE_FUN', 'PREDICTION_GAME', 'QUESTION_EXCHANGE', 'INTERACTIVE_CHOICE', 'POLL', 'RIDDLE', 'QUIZ_JSON', 'BINGO'],
    Kreativ: ['PHOTO_CHALLENGE', 'CREATIVE_ART', 'MEME_EXCHANGE', 'COUPLE_COLLAGE', 'VIDEO_MESSAGE', 'DOODLE_EXCHANGE', 'SCREENSHOT_TOUR', 'RECIPE_SHARE', 'HANDWRITTEN_NOTE'],
    Planung: ['BUCKET_LIST', 'DREAM_VACATION', 'LIFE_GOALS', 'WISH_LIST', 'DREAM_BOARD', 'YEAR_IN_REVIEW', 'DREAM_DATE'],
    Persönlich: ['CHILDHOOD_STORY', 'FIRST_IMPRESSION', 'INSIDE_JOKE', 'FAVORITE_MEMORY', 'LOVE_STORY', 'SECRETS'],
    Gemütlich: ['COZY_EVENING', 'BLANKET_BURRITO', 'CUDDLE_QUIZ', 'RAINY_DAY', 'MASSAGE_COUPON', 'BREAKFAST_IN_BED', 'MOVIE_NEST', 'SLOW_MORNING', 'STARGAZING', 'PILLOW_FORT'],
    Spezial: ['TIME_CAPSULE', 'COUNTDOWN', 'SUNSET_SUNRISE', 'SURPRISE', 'PARALLEL_UNIVERSE']
  } as const;

  type CategoryKey = keyof typeof categories;
  type ContentType = (typeof categories)[CategoryKey][number];

  const categoryKeys = Object.keys(categories) as CategoryKey[];
  
  let selectedCategory: CategoryKey | '' = '';
  let selectedType: ContentType | '' = '';
  let template = '';
  let copiedMessage = '';
  
  // Vorlagen für jeden Content-Typ (2 pro Typ)
  const templates: Record<string, string[]> = {
    'TEXT': [
      'Guten Morgen, mein Schatz! 🌅\n\nHeute möchte ich dir einfach sagen...',
      '💭 Ein kleiner Gedanke für dich:\n\n[Deine persönliche Nachricht hier]'
    ],
    'IMAGE_URL': [
      'https://beispiel.de/bild.jpg\n\n📸 Dieses Bild erinnert mich an uns...',
      'https://i.imgur.com/BEISPIEL.png\n\n💖 Habe dieses schöne Bild für dich gefunden!'
    ],
    'VIDEO_EMBED': [
      'https://www.youtube.com/watch?v=BEISPIEL\n\n🎥 Unser Song! 🎵',
      'https://youtu.be/BEISPIEL\n\n📹 Das Video musst du sehen!'
    ],
    'LOVE_LETTER': [
      'Meine Liebste,\n\nals ich heute aufgewacht bin, war mein erster Gedanke an dich. Dein Lächeln, deine Stimme, die Art wie du...\n\n[Fortsetzung deiner Gedanken]\n\nIn ewiger Liebe,\n[Dein Name]',
      'An die Person, die mein Leben verändert hat,\n\nich weiß nicht, wo ich anfangen soll. Es gibt so viele Gründe, warum ich dich liebe...\n\n[Deine tiefsten Gefühle]\n\nFür immer dein,\n[Dein Name]'
    ],
    'APPRECIATION': [
      '🙏 Dinge, für die ich heute dankbar bin:\n\n1. Dass du immer für mich da bist\n2. Dein ansteckendes Lachen\n3. Die kleinen Gesten, die zeigen, wie sehr du dich kümmerst\n4. [Weitere Punkte]\n\nDanke, dass du existierst! 💖',
      '💝 Ich schätze dich so sehr wegen:\n\n• Deiner Geduld mit mir\n• Deinem Verständnis\n• Deiner bedingungslosen Unterstützung\n• [Weitere Eigenschaften]\n\nDu bist einzigartig! ✨'
    ],
    'MEMORY': [
      '📖 Weißt du noch, als wir...\n\n[Beschreibe die Erinnerung]\n\nDas war einer der schönsten Momente mit dir! 💕',
      '🎞️ Eine Erinnerung, die ich nie vergessen werde:\n\n[Erzähle die Geschichte]\n\nDanke für diese wundervolle Erinnerung! 🌟'
    ],
    'VIRTUAL_DATE': [
      '💻 Unser nächstes Discord Date! 📅\n\nWann: [Datum und Uhrzeit]\n\nProgramm:\n🕐 19:00 - Wir starten mit...\n🕑 20:00 - Dann machen wir...\n🕒 21:00 - Zum Abschluss...\n\nFreue mich so sehr auf dich! 💖',
      '🎮 Virtual Date Night Plan:\n\nThema: [z.B. Gaming Marathon]\nStart: [Uhrzeit]\n\nAktivitäten:\n1. [Spiel 1]\n2. [Spiel 2]\n3. [Entspannung]\n\nBring gute Laune mit! 🎉'
    ],
    'WOULD_YOU_RATHER': [
      '🤔 Würdest du lieber...?\n\n1. 🏖️ ...einen Monat am Strand verbringen\n   ODER\n   🏔️ ...einen Monat in den Bergen?\n\n2. ⏰ ...in die Vergangenheit reisen\n   ODER\n   🚀 ...in die Zukunft?\n\n[Weitere Fragen]',
      '💭 Schwierige Entscheidungen:\n\n• 🍕 Pizza oder 🍝 Pasta für immer?\n• 📚 Bücher oder 🎬 Filme?\n• 🌅 Morgenmensch oder 🌙 Nachteule?\n\n[Deine Antworten hier]'
    ],
    'QUIZ_JSON': [
      '{\n  "title": "Wie gut kennst du mich?",\n  "questions": [\n    {\n      "question": "Was ist meine Lieblingsfarbe?",\n      "options": ["Blau", "Rot", "Grün", "Lila"],\n      "correctAnswer": 0,\n      "explanation": "Blau! Du hast es gewusst! 💙"\n    },\n    {\n      "question": "Welches Essen liebe ich am meisten?",\n      "options": ["Pizza", "Pasta", "Sushi", "Burger"],\n      "correctAnswer": 2,\n      "explanation": "Sushi! Ich könnte es jeden Tag essen 🍣"\n    }\n  ]\n}',
      '{\n  "title": "Unser Beziehungs-Quiz",\n  "questions": [\n    {\n      "question": "Wo haben wir uns kennengelernt?",\n      "options": ["Option A", "Option B", "Option C", "Option D"],\n      "correctAnswer": 0,\n      "explanation": "Genau dort! 💕"\n    }\n  ]\n}'
    ],
    'COZY_EVENING': [
      '🕯️ Programm für einen gemütlichen Abend:\n\n18:00 - 🛀 Entspannendes Bad\n19:00 - 🍵 Tee und Kekse\n20:00 - 📺 Lieblingsfilm\n21:00 - 📖 Zusammen lesen\n22:00 - 💤 Kuscheln\n\nFreue mich auf einen entspannten Abend mit dir! 💕',
      '🌙 Cozy Night Plan:\n\n✨ Kerzen anzünden\n🧦 Kuschelsocken an\n☕ Kakao machen\n🎬 Film aussuchen\n🛋️ Auf der Couch einkuscheln\n\nPerfekter Abend zu zweit! 💖'
    ],
    'PLAYLIST_COLLAB': [
      '🎵 Unsere gemeinsame Playlist!\n\nThema: [z.B. "Songs für Roadtrips"]\n\nSpotify Link: [Link einfügen]\n\nMeine ersten 5 Songs:\n1. [Song 1 - Artist]\n2. [Song 2 - Artist]\n3. [Song 3 - Artist]\n4. [Song 4 - Artist]\n5. [Song 5 - Artist]\n\nJetzt bist du dran! 🎶',
      '🎧 Let\'s create magic!\n\nPlaylist Name: [Name]\nLink: [Spotify/YouTube Link]\n\nMeine Picks:\n• [Song 1] - Weil...\n• [Song 2] - Erinnert mich an...\n• [Song 3] - Macht mich glücklich\n\nWas sind deine? 💕'
    ],
    'BUCKET_LIST': [
      '📝 Unsere Bucket List für die nächsten Jahre:\n\n✨ Zusammen erleben:\n□ [Aktivität 1]\n□ [Aktivität 2]\n□ [Aktivität 3]\n\n🌍 Orte besuchen:\n□ [Ort 1]\n□ [Ort 2]\n□ [Ort 3]\n\n💕 Ziele erreichen:\n□ [Ziel 1]\n□ [Ziel 2]\n□ [Ziel 3]',
      '🎯 Dinge, die wir gemeinsam machen wollen:\n\n1. [ ] [Großes Abenteuer]\n2. [ ] [Kleines Vergnügen]\n3. [ ] [Romantisches Erlebnis]\n4. [ ] [Verrückte Idee]\n5. [ ] [Langfristiges Ziel]\n\nLass uns anfangen! 🚀'
    ],
    'PHOTO_CHALLENGE': [
      '📸 Foto-Challenge für heute!\n\nAufgabe: Mache ein Foto von...\n• [Challenge-Idee 1]\n• [Challenge-Idee 2]\n• [Challenge-Idee 3]\n\nBeste Einsendung gewinnt: [Preis/Belohnung]\n\nDeadline: [Datum/Zeit]\nSende es mir per: [WhatsApp/Discord/etc.]\n\nViel Spaß! 📱✨',
      '📷 Photography Challenge:\n\n🎯 Thema: [z.B. "Dinge, die dich an mich erinnern"]\n\n📋 Regeln:\n- Mindestens 3 Fotos\n- Kreativität zählt!\n- Bis [Uhrzeit] fertig\n\n🏆 Gewinn: [Überraschung]\n\nLeg los! 🌟'
    ]
  };
  
  // Füge für alle restlichen Typen Standardvorlagen hinzu
  categoryKeys.forEach(category => {
    categories[category].forEach((type) => {
      if (!templates[type]) {
        templates[type] = [
          `Vorlage 1 für ${type}:\n\n[Platzhalter für deine kreative Idee]\n\n💖`,
          `Vorlage 2 für ${type}:\n\n[Alternative Idee]\n\n✨`
        ];
      }
    });
  });
  
  function selectCategory(cat: CategoryKey) {
    selectedCategory = cat;
    selectedType = '';
    template = '';
  }
  
  function selectType(type: ContentType) {
    selectedType = type;
    if (templates[type]) {
      template = templates[type][0]; // Zeige erste Vorlage
    }
  }
  
  function loadTemplate(index: number) {
    if (templates[selectedType] && templates[selectedType][index]) {
      template = templates[selectedType][index];
    }
  }
  
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(template);
      copiedMessage = '✅ In Zwischenablage kopiert!';
      setTimeout(() => copiedMessage = '', 3000);
    } catch (err) {
      copiedMessage = '❌ Fehler beim Kopieren';
    }
  }
</script>

<svelte:head>
  <title>Template Builder - Admin</title>
</svelte:head>

<div class="template-builder">
  <div class="header">
    <a href="/admin" class="back-link">← Zurück zum Admin</a>
    <h1>📝 Template Builder</h1>
    <p class="subtitle">Erstelle schnell Inhalte mit vorgefertigten Vorlagen</p>
  </div>
  
  <div class="builder-content">
    <!-- Kategorie-Auswahl -->
    <div class="section">
      <h2>1️⃣ Wähle eine Kategorie</h2>
      <div class="category-grid">
  {#each categoryKeys as category}
          <button 
            class="category-btn"
            class:active={selectedCategory === category}
            on:click={() => selectCategory(category)}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Content-Typ Auswahl -->
    {#if selectedCategory}
      <div class="section" transition:fade>
        <h2>2️⃣ Wähle einen Content-Typ</h2>
        <div class="type-grid">
          {#each categories[selectedCategory] as type}
            <button 
              class="type-btn"
              class:active={selectedType === type}
              on:click={() => selectType(type)}
            >
              {type}
            </button>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Vorlagen-Auswahl -->
    {#if selectedType}
      <div class="section" transition:fade>
        <h2>3️⃣ Wähle eine Vorlage</h2>
        <div class="template-buttons">
          {#each templates[selectedType] as _, index}
            <button 
              class="template-btn"
              on:click={() => loadTemplate(index)}
            >
              Vorlage {index + 1}
            </button>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Template Editor -->
    {#if template}
      <div class="section" transition:fade>
        <h2>4️⃣ Bearbeite & Kopiere</h2>
        <textarea 
          bind:value={template}
          class="template-editor"
          placeholder="Deine Vorlage erscheint hier..."
        ></textarea>
        
        <div class="actions">
          <button class="copy-btn" on:click={copyToClipboard}>
            📋 In Zwischenablage kopieren
          </button>
          {#if copiedMessage}
            <span class="copied-message" transition:fade>{copiedMessage}</span>
          {/if}
        </div>
        
        <div class="info-box">
          💡 <strong>Tipp:</strong> Kopiere die Vorlage und füge sie im Admin-Panel in das entsprechende Content-Feld ein!
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .template-builder {
    min-height: 100vh;
    background: linear-gradient(135deg, #1e2837 0%, #243447 50%, #2a4158 100%);
    color: white;
    padding: 2rem;
  }
  
  .header {
    max-width: 1200px;
    margin: 0 auto 3rem;
    text-align: center;
  }
  
  .back-link {
    display: inline-block;
    color: #ffd700;
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  
  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }
  
  .builder-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #ffd700;
  }
  
  .category-grid,
  .type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .category-btn,
  .type-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  
  .category-btn:hover,
  .type-btn:hover {
    background: rgba(255, 215, 0, 0.2);
    border-color: #ffd700;
    transform: translateY(-2px);
  }
  
  .category-btn.active,
  .type-btn.active {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: #1e2837;
    border-color: #ffd700;
    font-weight: bold;
  }
  
  .template-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .template-btn {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    border: none;
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  
  .template-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(76, 175, 80, 0.4);
  }
  
  .template-editor {
    width: 100%;
    min-height: 400px;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: white;
    padding: 1.5rem;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    line-height: 1.6;
    resize: vertical;
  }
  
  .template-editor:focus {
    outline: none;
    border-color: #ffd700;
  }
  
  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .copy-btn {
    background: linear-gradient(135deg, #2196F3, #1976D2);
    border: none;
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  
  .copy-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(33, 150, 243, 0.4);
  }
  
  .copied-message {
    color: #4CAF50;
    font-weight: bold;
  }
  
  .info-box {
    background: rgba(33, 150, 243, 0.2);
    border-left: 4px solid #2196F3;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1rem;
  }
</style>
