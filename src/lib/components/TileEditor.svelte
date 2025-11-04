<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import GenericContent from '$lib/components/content-types/GenericContent.svelte';
  
  export let tile: any = null; // Wenn null, dann neue Tile
  
  let formData = {
    title: tile?.title || '',
    description: tile?.description || '',
    category: tile?.category || 'Allgemein',
    contentType: tile?.contentType || 'TEXT',
    content: tile?.content || '',
    author: tile?.author || '',
    taskForB: tile?.taskForB || '',
    responseMode: tile?.responseMode || 'DISABLED',
    linkedToPrevious: tile?.linkedToPrevious || false,
    linkedToNext: tile?.linkedToNext || false,
    storyChainId: tile?.storyChainId || '',
    tags: tile?.tags || ''
  };
  
  const categories = [
    'Romantisch',
    'Spiele',
    'Kreativ',
    'Fragen',
    'Aktivitäten',
    'Geschichten',
    'Überraschungen',
    'Gutscheine',
    'Challenges',
    'Allgemein'
  ];
  
  const contentTypes = [
    { value: 'TEXT', label: 'Text', icon: '📝', description: 'Einfacher Text', help: 'Für Briefe, Gedichte, Geschichten. Der vielseitigste Typ!' },
    { value: 'LOVE_LETTER', label: 'Liebesbrief', icon: '💌', description: 'Romantischer Brief', help: 'Perfekt für emotionale, romantische Nachrichten mit schönem Layout' },
    { value: 'STORY', label: 'Geschichte', icon: '📖', description: 'Längere Erzählung', help: 'Für mehrteilige Geschichten oder längere Texte mit Kapiteln' },
    { value: 'POEM', label: 'Gedicht', icon: '✍️', description: 'Gedicht/Verse', help: 'Zeigt Gedichte mit spezieller Formatierung und Versbrechungen' },
    { value: 'MEMORY', label: 'Erinnerung', icon: '💫', description: 'Gemeinsame Erinnerung', help: 'Erzähle von einem besonderen gemeinsamen Moment' },
    { value: 'QUOTE', label: 'Zitat', icon: '💭', description: 'Inspirierendes Zitat', help: 'Zeigt Zitate in schönem Design mit Autor' },
    { value: 'WOULD_YOU_RATHER', label: 'Würdest du lieber', icon: '🤔', description: 'Entscheidungsspiel', help: 'Stelle lustige "Würdest du lieber...?" Fragen' },
    { value: 'THIS_OR_THAT', label: 'Dies oder Das', icon: '⚡', description: 'Schnelles Entscheidungsspiel', help: 'Zwei Optionen zur Wahl - schnell und lustig!' },
    { value: 'GAME_QUESTION', label: 'Quiz-Frage', icon: '❓', description: 'Multiple Choice Quiz', help: 'Erstelle Quiz-Fragen mit mehreren Antwortoptionen' },
    { value: 'RIDDLE', label: 'Rätsel', icon: '🧩', description: 'Rätsel zu lösen', help: 'Stelle ein Rätsel mit versteckter Antwort' },
    { value: 'TASK', label: 'Aufgabe', icon: '✅', description: 'Aufgabe erledigen', help: 'Gib eine Aufgabe die erledigt werden soll' },
    { value: 'CHALLENGE', label: 'Challenge', icon: '🎯', description: 'Herausforderung', help: 'Stelle eine lustige oder romantische Challenge' },
    { value: 'RECIPE', label: 'Rezept', icon: '🍪', description: 'Backrezept', help: 'Teile ein Rezept zum gemeinsamen Backen' },
    { value: 'MOVIE_NIGHT', label: 'Film-Abend', icon: '🎬', description: 'Film-Empfehlung', help: 'Schlage einen Film für einen gemeinsamen Abend vor' },
    { value: 'COLLABORATIVE_PLAYLIST', label: 'Playlist', icon: '🎵', description: 'Musik-Playlist', help: 'Erstelle oder teile eine Playlist für euch' },
    { value: 'PHOTO_CHALLENGE', label: 'Foto-Challenge', icon: '📷', description: 'Foto-Aufgabe', help: 'Fordere zu einem bestimmten Foto heraus' },
    { value: 'COUPON', label: 'Gutschein', icon: '🎫', description: 'Geschenk-Gutschein', help: 'Erstelle einen Gutschein für etwas Besonderes' },
    { value: 'SURPRISE', label: 'Überraschung', icon: '🎁', description: 'Geheime Überraschung', help: 'Kündige eine Überraschung an oder verstecke einen Hinweis' }
  ];
  
  const responseModes = [
    { value: 'DISABLED', label: '🚫 Keine Antwort', description: 'Nur anschauen', help: 'Person B kann nur lesen, nicht antworten. Gut für Überraschungen!' },
    { value: 'OPEN', label: '✍️ Freie Antwort', description: 'Freitext-Antwort', help: 'Person B kann frei antworten. Perfekt für Fragen und Aufgaben!' },
    { value: 'COLLABORATIVE', label: '🤝 Zusammenarbeit', description: 'Gemeinsames Projekt', help: 'Für Dinge die ihr zusammen macht (Playlist, Rezept, etc.)' },
    { value: 'CHOICE', label: '☑️ Multiple Choice', description: 'Auswahl-Optionen', help: 'Person B wählt aus vorgegebenen Optionen (für Quiz)' }
  ];
  
  let showTemplates = false;
  let selectedTemplate: any = null;
  
  // Template-Beispiele - Umfangreiche Vorlagen für alle Kategorien
  const templates = [
    // === ROMANTISCH (7 Templates) ===
    {
      category: 'Romantisch',
      contentType: 'LOVE_LETTER',
      title: '💌 Liebesbrief',
      content: `Mein Liebling,

jeden Tag mit dir ist ein Geschenk. Heute möchte ich dir sagen, wie sehr ich dich liebe und schätze.

Was ich an dir am meisten liebe:
- [ERGÄNZE HIER]
- [ERGÄNZE HIER]
- [ERGÄNZE HIER]

In Liebe,
[DEIN NAME]`
    },
    {
      category: 'Romantisch',
      contentType: 'POEM',
      title: '✍️ Liebesgedicht',
      content: `Roses are red,
Violets are blue,
[DEINE ZEILE HIER],
And I'm so lucky to have you!

💖`
    },
    {
      category: 'Romantisch',
      contentType: 'MEMORY',
      title: '💫 Unsere schönste Erinnerung',
      content: `Weißt du noch, als wir [ORT/SITUATION]?

Das war der Moment, als ich wusste, dass...

[ERGÄNZE DEINE GEDANKEN]

Diese Erinnerung wird mir immer bleiben. ❤️`
    },
    {
      category: 'Romantisch',
      contentType: 'QUOTE',
      title: '💭 Romantisches Zitat',
      content: `"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."

— Maya Angelou

💕 Das beschreibt perfekt, was ich für dich empfinde.`
    },
    {
      category: 'Romantisch',
      contentType: 'COUPON',
      title: '🎫 Kuschel-Gutschein',
      content: `🎁 GUTSCHEIN 🎁

Dieser Gutschein berechtigt zu:
▸ Einem gemütlichen Kuschel-Abend
▸ Mit deinen Lieblings-Snacks
▸ Deiner Film-Wahl
▸ Unbegrenzten Umarmungen

Einlösbar: Jederzeit! 💕

Unterschrift: ___________`
    },
    {
      category: 'Romantisch',
      contentType: 'TASK',
      title: '✨ Komplimente-Aufgabe',
      content: `Deine Aufgabe für heute:

Schreibe mir 3 Dinge, die du an mir liebst.

Ich bin gespannt! 💕`,
      taskForB: 'Schreibe 3 Komplimente',
      responseMode: 'OPEN'
    },
    {
      category: 'Romantisch',
      contentType: 'SURPRISE',
      title: '🎁 Romantische Überraschung',
      content: `Psst... ich habe etwas für dich vorbereitet! 🎉

Hinweis: Es hat mit [HINWEIS HIER] zu tun...

Mehr verrate ich noch nicht! 😊✨`
    },
    
    // === SPIELE (7 Templates) ===
    {
      category: 'Spiele',
      contentType: 'GAME_QUESTION',
      title: '❓ Kennst-Du-Mich Quiz',
      content: `Was war unser erstes gemeinsames Date?

A) [OPTION 1]
B) [OPTION 2]
C) [OPTION 3]
D) [OPTION 4]

Rate mal! 😊`,
      taskForB: 'Wähle die richtige Antwort',
      responseMode: 'CHOICE'
    },
    {
      category: 'Spiele',
      contentType: 'WOULD_YOU_RATHER',
      title: '🤔 Würdest du lieber...?',
      content: `Würdest du lieber...

🅰️ [OPTION A - z.B. "Fliegen können"]

oder

🅱️ [OPTION B - z.B. "Unsichtbar sein"]

?

Begründe deine Wahl! 😄`,
      taskForB: 'Wähle und erkläre warum',
      responseMode: 'OPEN'
    },
    {
      category: 'Spiele',
      contentType: 'THIS_OR_THAT',
      title: '⚡ Dies oder Das',
      content: `Schnelle Entscheidung! Was magst du lieber?

☕ Kaffee oder Tee? 🍵
🏖️ Strand oder Berge? 🏔️
🌞 Frühaufsteher oder Nachteule? 🦉
🍕 Pizza oder Pasta? 🍝

Schreib einfach die Emojis die du wählst! 😊`
    },
    {
      category: 'Spiele',
      contentType: 'RIDDLE',
      title: '🧩 Rätsel des Tages',
      content: `Heute habe ich ein Rätsel für dich:

[DEIN RÄTSEL HIER - z.B.
"Es gibt ein Wort mit 5 Buchstaben.
Nimmt man 2 weg, bleiben 2 übrig.
Was ist es?"]

💡 Tipp: [OPTIONALER TIPP]

Kommst du drauf? 🤔`,
      taskForB: 'Schreibe die Lösung',
      responseMode: 'OPEN'
    },
    {
      category: 'Spiele',
      contentType: 'CHALLENGE',
      title: '🎯 Tages-Challenge',
      content: `🎮 CHALLENGE ACCEPTED?

Deine Challenge heute:
[BESCHREIBE CHALLENGE - z.B. "Mache ein Selfie mit etwas Rotem"]

Belohnung: [z.B. "Meine Anerkennung + Kuss 💋"]

Schaffst du das? 😎`,
      taskForB: 'Challenge annehmen und Beweis schicken',
      responseMode: 'OPEN'
    },
    {
      category: 'Spiele',
      contentType: 'PHOTO_CHALLENGE',
      title: '📷 Foto-Challenge',
      content: `📸 FOTO-MISSION 📸

Mach heute ein Foto von:
▸ [THEMA 1 - z.B. "etwas, das dich an mich erinnert"]
▸ [THEMA 2 - z.B. "deinem schönsten Lächeln"]

Ich bin gespannt! 🤩`,
      taskForB: 'Fotos machen und teilen',
      responseMode: 'OPEN'
    },
    {
      category: 'Spiele',
      contentType: 'GAME_QUESTION',
      title: '🎲 Trivia-Frage',
      content: `🧠 WISSENS-FRAGE 🧠

[DEINE FRAGE - z.B. "In welchem Jahr haben wir uns kennengelernt?"]

A) [ANTWORT 1]
B) [ANTWORT 2]  ← richtig!
C) [ANTWORT 3]
D) [ANTWORT 4]

Rate mal! 🤓`,
      taskForB: 'Wähle eine Antwort',
      responseMode: 'CHOICE'
    },
    
    // === KREATIV (5 Templates) ===
    {
      category: 'Kreativ',
      contentType: 'RECIPE',
      title: '🍪 Plätzchen-Rezept',
      content: `🍪 Vanillekipferl

Zutaten:
▸ 280g Mehl
▸ 210g Butter
▸ 100g gemahlene Mandeln
▸ 70g Zucker
▸ 1 Pck. Vanillezucker

Zubereitung:
1. [SCHRITT 1]
2. [SCHRITT 2]
3. [SCHRITT 3]

Lass uns die zusammen backen! 👨‍🍳👩‍🍳`,
      responseMode: 'COLLABORATIVE'
    },
    {
      category: 'Kreativ',
      contentType: 'COLLABORATIVE_PLAYLIST',
      title: '🎵 Unsere Playlist',
      content: `🎶 PLAYLIST-PROJEKT 🎶

Lass uns eine gemeinsame Playlist erstellen!

Thema: [z.B. "Songs die uns verbinden"]

Füge 3 Songs hinzu die...
▸ [KRITERIUM 1 - z.B. "dich an mich erinnern"]
▸ [KRITERIUM 2 - z.B. "uns glücklich machen"]
▸ [KRITERIUM 3 - z.B. "wir zusammen gehört haben"]

Link zur Playlist: [LINK]`,
      taskForB: 'Füge deine Songs hinzu',
      responseMode: 'COLLABORATIVE'
    },
    {
      category: 'Kreativ',
      contentType: 'MOVIE_NIGHT',
      title: '🎬 Film-Abend',
      content: `🍿 FILM-ABEND EINLADUNG 🍿

Ich schlage vor: [FILMTITEL]

Warum dieser Film:
[BEGRÜNDUNG]

Wann: [DATUM/ZEIT]
Snacks: [z.B. "Popcorn, Chips, Schokolade"]

Bist du dabei? 🎥💕`,
      taskForB: 'Zusagen oder Gegenvorschlag',
      responseMode: 'OPEN'
    },
    {
      category: 'Kreativ',
      contentType: 'STORY',
      title: '📖 Gemeinsame Geschichte',
      content: `Es war einmal ein Paar, das sich in [ORT] kennengelernt hatte...

[SCHREIBE DEN ANFANG DEINER GESCHICHTE]

--- DEINE FORTSETZUNG ---

Schreib die Geschichte weiter! Was passiert als nächstes? 📝`,
      taskForB: 'Geschichte weiterschreiben',
      responseMode: 'COLLABORATIVE'
    },
    {
      category: 'Kreativ',
      contentType: 'TASK',
      title: '🎨 Kreative Aufgabe',
      content: `🎨 KREATIV-CHALLENGE 🎨

Erstelle heute etwas für mich:
[z.B. "Zeichne, schreibe, bastle..."]

Thema: [z.B. "Was ich an dir liebe"]

Ich bin gespannt auf dein Werk! 💕`,
      taskForB: 'Erstelle etwas Kreatives',
      responseMode: 'OPEN'
    },
    
    // === FRAGEN (4 Templates) ===
    {
      category: 'Fragen',
      contentType: 'TEXT',
      title: '💭 Tiefe Frage',
      content: `Heute möchte ich dich etwas fragen:

[DEINE TIEFE FRAGE - z.B. "Was sind deine Träume für unsere Zukunft?"]

Nimm dir Zeit für deine Antwort. Ich höre dir zu. 💕`,
      taskForB: 'Beantworte die Frage ehrlich',
      responseMode: 'OPEN'
    },
    {
      category: 'Fragen',
      contentType: 'THIS_OR_THAT',
      title: '🔮 Zukunfts-Fragen',
      content: `Unsere Zukunft - Dies oder Das:

🏡 Haus oder Wohnung?
🌍 Stadt oder Land?
🐕 Hund oder Katze?
🚗 Abenteuer oder Gemütlichkeit?

Erzähl mir von deinen Vorstellungen! 💭`,
      taskForB: 'Wähle und erkläre',
      responseMode: 'OPEN'
    },
    {
      category: 'Fragen',
      contentType: 'MEMORY',
      title: '✨ Erinnerungs-Frage',
      content: `Was war dein schönster Moment mit mir bisher?

Erzähl mir davon. Ich möchte wissen, was dir im Gedächtnis geblieben ist. 💕

Deine Erinnerung: ___________`,
      taskForB: 'Teile deine Erinnerung',
      responseMode: 'OPEN'
    },
    {
      category: 'Fragen',
      contentType: 'TASK',
      title: '📝 3-Fragen-Spiel',
      content: `Beantworte diese 3 Fragen:

1️⃣ [FRAGE 1 - z.B. "Was würdest du tun, wenn wir einen Tag König und Königin wären?"]

2️⃣ [FRAGE 2 - z.B. "Welche Superkraft würdest du dir wünschen?"]

3️⃣ [FRAGE 3 - z.B. "Was war dein peinlichster Moment?"]

Ich bin neugierig! 😊`,
      taskForB: 'Beantworte alle 3 Fragen',
      responseMode: 'OPEN'
    },
    
    // === GUTSCHEINE (3 Templates) ===
    {
      category: 'Gutscheine',
      contentType: 'COUPON',
      title: '🎫 Massage-Gutschein',
      content: `💆‍♀️ MASSAGE-GUTSCHEIN 💆‍♂️

Dieser Gutschein berechtigt zu:
▸ 30 Minuten Rückenmassage
▸ Mit Kerzen & Entspannungsmusik
▸ Von deinem persönlichen Masseur/Masseurin

Einlösbar: [ZEITRAUM]
Gültig bis: [DATUM]

❤️ Mit Liebe ausgestellt von: [DEIN NAME]`
    },
    {
      category: 'Gutscheine',
      contentType: 'COUPON',
      title: '🍽️ Dinner-Gutschein',
      content: `🍝 RESTAURANT-GUTSCHEIN 🍝

Hiermit lade ich dich ein zu:
▸ Einem 3-Gänge-Menü
▸ Im Restaurant deiner Wahl
▸ Mit Vor- & Nachspeise

Dresscode: [z.B. "Schick!"]
Wann: [z.B. "Nächstes Wochenende"]

Ich freue mich drauf! 💕`
    },
    {
      category: 'Gutscheine',
      contentType: 'COUPON',
      title: '🎮 Freifahrt-Gutschein',
      content: `🎉 JOKER-GUTSCHEIN 🎉

Einlösbar für:
▸ Eine Pflicht die du nicht machen musst
▸ (z.B. Abwaschen, Aufräumen, etc.)
▸ ODER: Ein Wunsch den ich dir erfülle

Bedingungen: [z.B. "Muss legal sein 😄"]

Einmalig einlösbar! ✨`
    }
  ];
  
  function applyTemplate(template: any) {
    formData.category = template.category;
    formData.contentType = template.contentType;
    formData.title = template.title;
    formData.content = template.content;
    if (template.taskForB) formData.taskForB = template.taskForB;
    showTemplates = false;
    selectedTemplate = template;
  }
  
  function getContentTypeData(type: string) {
    return contentTypes.find(ct => ct.value === type) || contentTypes[0];
  }
  
  async function handleSave() {
    const response = await fetch('/api/tiles', {
      method: tile ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        id: tile?.id
      })
    });
    
    if (response.ok) {
      goto('/admin/tiles');
    }
  }
</script>

<div class="editor-container">
  <div class="editor-header">
    <div class="header-content">
      <a href="/admin/tiles" class="back-link">← Zurück zur Library</a>
      <h1>{tile ? '✏️ Tile bearbeiten' : '➕ Neue Tile erstellen'}</h1>
    </div>
    
    <button type="button" class="btn-templates" on:click={() => showTemplates = !showTemplates}>
      📚 Vorlagen ({templates.length})
    </button>
  </div>
  
  <div class="editor-intro">
    <div class="intro-icon">💡</div>
    <div class="intro-content">
      <h3>So funktioniert's:</h3>
      <ol>
        <li><strong>Titel & Kategorie</strong> wählen (damit du die Tile wiederfindest)</li>
        <li><strong>Content-Typ</strong> wählen (wie soll es aussehen?)</li>
        <li><strong>Text schreiben</strong> - die Vorschau rechts zeigt dir sofort wie es aussieht!</li>
        <li>Optional: Interaktion & Tags hinzufügen</li>
        <li><strong>Speichern</strong> → Fertig! Die Tile ist in deiner Library</li>
      </ol>
      <div class="intro-tip">
        🎯 <strong>Tipp:</strong> Klicke auf "📚 Vorlagen" oben für fertige Beispiele zum Anpassen!
      </div>
    </div>
  </div>
  
  {#if showTemplates}
    <div class="templates-panel">
      <div class="templates-header">
        <div>
          <h3>📚 Wähle eine Vorlage zum Starten</h3>
          <p class="templates-subtitle">Vorlagen sind Beispiele die du anpassen kannst - perfekt zum schnellen Start!</p>
        </div>
        <button type="button" class="btn-close-templates" on:click={() => showTemplates = false}>
          ✕ Schließen
        </button>
      </div>
      <div class="templates-grid">
        {#each templates as template}
          <button
            type="button"
            class="template-card"
            on:click={() => applyTemplate(template)}
          >
            <div class="template-icon">{getContentTypeData(template.contentType).icon}</div>
            <div class="template-title">{template.title}</div>
            <div class="template-meta">
              {template.category} • {getContentTypeData(template.contentType).label}
            </div>
            <div class="template-action">Vorlage verwenden →</div>
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  <div class="editor-layout">
    <!-- EDITOR PANEL -->
    <div class="editor-panel">
      <form on:submit|preventDefault={handleSave}>
        <div class="form-section">
          <div class="section-title">
            <h2>📋 Basis-Informationen</h2>
            <span class="section-help">Grundlegende Infos über deine Tile</span>
          </div>
          
          <div class="form-group">
            <label for="title">
              Titel *
              <span class="label-help" title="Gib deiner Tile einen aussagekräftigen Namen">ⓘ</span>
            </label>
            <input
              id="title"
              type="text"
              bind:value={formData.title}
              placeholder="z.B. 'Romantisches Gedicht für dich' oder 'Lustiges Quiz Tag 5'"
              required
            />
            <div class="input-help">💡 Ein guter Titel hilft dir, die Tile später schnell wiederzufinden</div>
          </div>
          
          <div class="form-group">
            <label for="description">
              Beschreibung (optional)
              <span class="label-help" title="Kurze Beschreibung was in dieser Tile steckt">ⓘ</span>
            </label>
            <input
              id="description"
              type="text"
              bind:value={formData.description}
              placeholder="z.B. 'Kurzes Gedicht über unsere erste Begegnung'"
            />
            <div class="input-help">💡 Erscheint in der Library-Übersicht unter dem Titel</div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="category">
                Kategorie
                <span class="label-help" title="Ordne deine Tile einer Kategorie zu">ⓘ</span>
              </label>
              <select id="category" bind:value={formData.category}>
                {#each categories as category}
                  <option value={category}>{category}</option>
                {/each}
              </select>
              <div class="input-help">📂 Hilft beim Filtern in der Library</div>
            </div>
            
            <div class="form-group">
              <label for="author">
                Autor (optional)
                <span class="label-help" title="Wer hat diese Tile erstellt?">ⓘ</span>
              </label>
              <input
                id="author"
                type="text"
                bind:value={formData.author}
                placeholder="Dein Name"
              />
              <div class="input-help">✍️ Wird im Kalender angezeigt</div>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <div class="section-title">
            <h2>🎨 Content-Typ wählen</h2>
            <span class="section-help">Wähle aus wie dein Inhalt dargestellt werden soll</span>
          </div>
          
          <div class="content-type-selector">
            {#each contentTypes as type}
              <label 
                class="content-type-option" 
                class:selected={formData.contentType === type.value}
                title={type.help}
              >
                <input
                  type="radio"
                  name="contentType"
                  value={type.value}
                  bind:group={formData.contentType}
                />
                <div class="type-card">
                  <div class="type-icon">{type.icon}</div>
                  <div class="type-label">{type.label}</div>
                  <div class="type-description">{type.description}</div>
                  {#if formData.contentType === type.value}
                    <div class="type-help">💡 {type.help}</div>
                  {/if}
                </div>
              </label>
            {/each}
          </div>
        </div>
        
        <div class="form-section">
          <div class="section-title">
            <h2>✍️ Dein Inhalt</h2>
            <span class="section-help">Schreibe hier deinen Text - siehe Live-Vorschau rechts!</span>
          </div>
          
          <div class="form-group">
            <label for="content">
              Content * 
              <span class="label-help" title="Der Hauptinhalt deiner Tile">ⓘ</span>
            </label>
            <textarea
              id="content"
              bind:value={formData.content}
              placeholder="Schreibe hier deinen Text... Die Vorschau rechts zeigt dir wie es aussieht!"
              rows="12"
              required
            ></textarea>
            <div class="markdown-tips">
              <strong>✨ Formatierungs-Tipps:</strong>
              <div class="tips-grid">
                <span><code>**fett**</code> → <strong>fett</strong></span>
                <span><code>*kursiv*</code> → <em>kursiv</em></span>
                <span><code># Überschrift</code> → große Überschrift</span>
                <span><code>- Liste</code> → • Liste</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <div class="section-title">
            <h2>🎯 Interaktion (optional)</h2>
            <span class="section-help">Soll Person B antworten oder etwas tun können?</span>
          </div>
          
          <div class="form-group">
            <label for="taskForB">
              Aufgabe für Person B
              <span class="label-help" title="Was soll die andere Person tun?">ⓘ</span>
            </label>
            <input
              id="taskForB"
              type="text"
              bind:value={formData.taskForB}
              placeholder="z.B. 'Beantworte die Frage' oder 'Wähle deine Lieblingsantwort'"
            />
            <div class="input-help">📝 Wird als Aufforderung unter dem Content angezeigt</div>
          </div>
          
          <div class="form-group">
            <label for="responseMode">
              Antwort-Modus
              <span class="label-help" title="Wie kann Person B reagieren?">ⓘ</span>
            </label>
            <select id="responseMode" bind:value={formData.responseMode}>
              {#each responseModes as mode}
                <option value={mode.value}>
                  {mode.label} - {mode.description}
                </option>
              {/each}
            </select>
            {#each responseModes as mode}
              {#if mode.value === formData.responseMode}
                <div class="input-help mode-help">💡 {mode.help}</div>
              {/if}
            {/each}
          </div>
        </div>
        
        <div class="form-section collapsible">
          <div class="section-title">
            <h2>🔗 Story Chain (optional)</h2>
            <span class="section-help">Für mehrteilige Geschichten über mehrere Tage</span>
          </div>
          
          <div class="story-chain-explainer">
            💡 <strong>Was ist eine Story Chain?</strong><br>
            Wenn du eine Geschichte über mehrere Tage erzählen möchtest (z.B. Tag 5-7), 
            verbindest du sie hier. Die Tiles werden dann im Admin als Kette angezeigt!
          </div>
          
          <div class="form-row">
            <label class="checkbox-label">
              <input type="checkbox" bind:checked={formData.linkedToPrevious} />
              ⬅️ Fortsetzung von vorherigem Tag
            </label>
            
            <label class="checkbox-label">
              <input type="checkbox" bind:checked={formData.linkedToNext} />
              ➡️ Wird am nächsten Tag fortgesetzt
            </label>
          </div>
          
          {#if formData.linkedToPrevious || formData.linkedToNext}
            <div class="form-group">
              <label for="storyChainId">
                Story Chain ID
                <span class="label-help" title="Gleiche ID für alle Teile der Geschichte">ⓘ</span>
              </label>
              <input
                id="storyChainId"
                type="text"
                bind:value={formData.storyChainId}
                placeholder="z.B. 'winter-märchen' oder 'quiz-reihe'"
              />
              <div class="input-help">
                🔗 Alle Tiles mit der gleichen ID werden als zusammenhängend erkannt
              </div>
            </div>
          {/if}
        </div>
        
        <div class="form-section">
          <div class="section-title">
            <h2>🏷️ Tags (optional)</h2>
            <span class="section-help">Für besseres Suchen und Filtern in der Library</span>
          </div>
          
          <div class="form-group">
            <label for="tags">
              Tags (durch Komma getrennt)
              <span class="label-help" title="Suchbegriffe für die Library">ⓘ</span>
            </label>
            <input
              id="tags"
              type="text"
              bind:value={formData.tags}
              placeholder="z.B. romantisch, gedicht, liebe, winter"
            />
            <div class="input-help">
              🔍 Beispiele: "romantisch, kurz, lustig" oder "quiz, interaktiv, spiel"
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn-secondary" on:click={() => goto('/admin/tiles')}>
            Abbrechen
          </button>
          <button type="submit" class="btn-primary">
            💾 Speichern
          </button>
        </div>
      </form>
    </div>
    
    <!-- PREVIEW PANEL -->
    <div class="preview-panel">
      <div class="preview-sticky">
        <h2>👁️ Live Vorschau</h2>
        <p class="preview-hint">So wird deine Tile im Kalender aussehen:</p>
        
        <div class="preview-container">
          <div class="preview-card">
            {#key formData.contentType + formData.content}
              <GenericContent
                contentType={formData.contentType}
                content={formData.content}
                author={formData.author || undefined}
              />
            {/key}
          </div>
        </div>
        
        <div class="preview-meta">
          <div class="meta-item">
            <strong>Kategorie:</strong> {formData.category}
          </div>
          <div class="meta-item">
            <strong>Typ:</strong> {getContentTypeData(formData.contentType).label} {getContentTypeData(formData.contentType).icon}
          </div>
          {#if formData.author}
            <div class="meta-item">
              <strong>Autor:</strong> {formData.author}
            </div>
          {/if}
          {#if formData.linkedToPrevious || formData.linkedToNext}
            <div class="meta-item story-chain">
              🔗 Teil einer Story Chain
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .editor-container {
    max-width: 1800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;
  }
  
  .editor-intro {
    background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
    border: 2px solid #3b82f6;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .intro-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
  }
  
  .intro-content {
    flex: 1;
  }
  
  .intro-content h3 {
    margin: 0 0 0.75rem 0;
    color: #1e40af;
    font-size: 1.2rem;
  }
  
  .intro-content ol {
    margin: 0 0 1rem 0;
    padding-left: 1.5rem;
    line-height: 1.6;
  }
  
  .intro-content ol li {
    margin-bottom: 0.5rem;
    color: #1e3a8a;
  }
  
  .intro-content ol li strong {
    color: #1e40af;
  }
  
  .intro-tip {
    background: white;
    border-left: 4px solid #10b981;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    color: #065f46;
  }
  
  .intro-tip strong {
    color: #047857;
  }
  
  .back-link {
    display: block;
    color: #6b7280;
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }
  
  .back-link:hover {
    color: #10b981;
  }
  
  .header-content h1 {
    margin: 0;
    font-size: 2rem;
    color: #1f2937;
  }
  
  .btn-templates {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .btn-templates:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  }
  
  .templates-panel {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    border: 3px solid #f59e0b;
  }
  
  .templates-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1.5rem;
  }
  
  .templates-panel h3 {
    margin: 0 0 0.5rem;
    color: #92400e;
    font-size: 1.5rem;
  }
  
  .templates-subtitle {
    margin: 0;
    color: #92400e;
    font-size: 0.95rem;
    opacity: 0.8;
  }
  
  .btn-close-templates {
    background: white;
    border: 2px solid #f59e0b;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 600;
    color: #92400e;
    transition: all 0.2s;
  }
  
  .btn-close-templates:hover {
    background: #92400e;
    color: white;
  }
  
  .templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .template-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .template-card:hover {
    border-color: #10b981;
    background: #ecfdf5;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
  }
  
  .template-card:hover .template-action {
    opacity: 1;
    transform: translateX(0);
  }
  
  .template-action {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #10b981;
    color: white;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.2s;
  }
  
  .template-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .template-title {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }
  
  .template-meta {
    font-size: 0.85rem;
    color: #6b7280;
  }
  
  .editor-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .editor-panel {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .form-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .form-section:last-of-type {
    border-bottom: none;
  }
  
  .form-section.collapsible {
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
  
  .section-title {
    margin-bottom: 1.5rem;
  }
  
  .section-title h2 {
    margin: 0 0 0.25rem;
    font-size: 1.25rem;
    color: #1f2937;
  }
  
  .section-help {
    display: block;
    color: #6b7280;
    font-size: 0.9rem;
    font-style: italic;
  }
  
  .story-chain-explainer {
    background: #dbeafe;
    border-left: 4px solid #3b82f6;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #374151;
  }
  
  .label-help {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: #e5e7eb;
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 700;
    color: #6b7280;
    cursor: help;
    transition: all 0.2s;
  }
  
  .label-help:hover {
    background: #3b82f6;
    color: white;
    transform: scale(1.2);
  }
  
  .input-help {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #6b7280;
    line-height: 1.5;
  }
  
  .mode-help {
    background: #ecfdf5;
    border-left: 3px solid #10b981;
    padding: 0.75rem;
    margin-top: 0.75rem;
    border-radius: 6px;
    color: #065f46;
  }
  
  .markdown-tips {
    margin-top: 0.75rem;
    padding: 1rem;
    background: #fef3c7;
    border-radius: 8px;
    font-size: 0.85rem;
  }
  
  .markdown-tips strong {
    color: #92400e;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .tips-grid code {
    background: #fde68a;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
    font-family: inherit;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #10b981;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 150px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .content-type-selector {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
  
  .content-type-option {
    cursor: pointer;
  }
  
  .content-type-option input {
    display: none;
  }
  
  .type-card {
    padding: 1rem;
    background: #f9fafb;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    text-align: center;
    transition: all 0.2s;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .content-type-option:hover .type-card {
    border-color: #10b981;
    background: #f0fdf4;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  }
  
  .content-type-option.selected .type-card {
    border-color: #10b981;
    background: #ecfdf5;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    transform: scale(1.02);
  }
  
  .type-help {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #dbeafe;
    border-radius: 6px;
    font-size: 0.75rem;
    line-height: 1.4;
    color: #1e40af;
    text-align: left;
  }
  
  .type-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .type-label {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }
  
  .type-description {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .checkbox-label:hover {
    background: #f3f4f6;
  }
  
  .checkbox-label input {
    cursor: pointer;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }
  
  .btn-secondary {
    background: #f3f4f6;
    color: #374151;
  }
  
  .btn-secondary:hover {
    background: #e5e7eb;
  }
  
  .preview-panel {
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
  
  .preview-sticky {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .preview-sticky h2 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    color: #1f2937;
  }
  
  .preview-hint {
    margin: 0 0 1.5rem;
    color: #6b7280;
    font-size: 0.9rem;
  }
  
  .preview-container {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    min-height: 300px;
  }
  
  .preview-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  
  .preview-meta {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 8px;
  }
  
  .meta-item {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #374151;
  }
  
  .meta-item:last-child {
    margin-bottom: 0;
  }
  
  .meta-item.story-chain {
    padding: 0.5rem;
    background: #dbeafe;
    border-radius: 6px;
    text-align: center;
    font-weight: 600;
    color: #1e40af;
  }
  
  @media (max-width: 1200px) {
    .editor-layout {
      grid-template-columns: 1fr;
    }
    
    .preview-panel {
      position: static;
    }
  }
</style>
