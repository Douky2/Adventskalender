<script lang="ts">
  import { enhance } from '$app/forms';
  import { getContentComponent } from '$lib/components/content-types';
  
  export let data;
  export let form;
  
  let editingDay: any = null;
  let showPreview = false;
  let showPrismaInfo = false;
  
  // Reactive component for preview
  $: previewComponent = editingDay ? getContentComponent(editingDay.contentTypeA || 'TEXT') : null;
  
  function openPrismaStudio() {
    showPrismaInfo = true;
  }
  
  function closePrismaInfo() {
    showPrismaInfo = false;
  }
  
  function editDay(day: any) {
    editingDay = { ...day };
    showPreview = false;
  }
  
  function cancelEdit() {
    editingDay = null;
    showPreview = false;
  }
  
  function togglePreview() {
    showPreview = !showPreview;
  }
  
  // Story Chain Helper Functions
  function getStoryChains(days: any[]) {
    const chains: any[] = [];
    const processed = new Set();
    
    // Group by storyChainId
    const byChainId = days.filter(d => d.storyChainId && !processed.has(d.id));
    const chainGroups = new Map();
    
    byChainId.forEach(day => {
      if (!chainGroups.has(day.storyChainId)) {
        chainGroups.set(day.storyChainId, []);
      }
      chainGroups.get(day.storyChainId).push(day);
      processed.add(day.id);
    });
    
    chainGroups.forEach((chainDays, storyChainId) => {
      chains.push({
        storyChainId,
        days: chainDays.sort((a, b) => a.dayNumber - b.dayNumber)
      });
    });
    
    // Find linked chains without storyChainId
    days.forEach(day => {
      if (processed.has(day.id)) return;
      if (!day.linkedToPrevious && !day.linkedToNext) return;
      
      const linkedDays = [day];
      processed.add(day.id);
      
      // Find next days
      let current = day;
      while (current.linkedToNext) {
        const next = days.find(d => d.dayNumber === current.dayNumber + 1 && d.linkedToPrevious);
        if (next && !processed.has(next.id)) {
          linkedDays.push(next);
          processed.add(next.id);
          current = next;
        } else {
          break;
        }
      }
      
      // Find previous days
      current = day;
      while (current.linkedToPrevious) {
        const prev = days.find(d => d.dayNumber === current.dayNumber - 1 && d.linkedToNext);
        if (prev && !processed.has(prev.id)) {
          linkedDays.unshift(prev);
          processed.add(prev.id);
          current = prev;
        } else {
          break;
        }
      }
      
      if (linkedDays.length > 1) {
        chains.push({
          storyChainId: null,
          days: linkedDays.sort((a, b) => a.dayNumber - b.dayNumber)
        });
      }
    });
    
    return chains;
  }
  
  function previewChain(chainDays: any[]) {
    // Open all days in the chain in separate tabs
    chainDays.forEach((day, idx) => {
      setTimeout(() => {
        window.open(`/day/${day.dayNumber}?simulation=true`, '_blank');
      }, idx * 300); // Stagger by 300ms to avoid browser blocking
    });
  }
  
  let selectedTemplate = '';
  let showTemplates = false;
  
  const contentTypes = [
    // Basis-Typen
    { value: 'TEXT', label: '📝 Text / Brief / Gedicht', category: 'Basis' },
    { value: 'IMAGE_URL', label: '🖼️ Bild-URL', category: 'Basis' },
    { value: 'VIDEO_EMBED', label: '🎥 Video (YouTube/Vimeo)', category: 'Basis' },
    
    // Romantisch
    { value: 'LOVE_LETTER', label: '💌 Liebesbrief', category: 'Romantisch' },
    { value: 'APPRECIATION', label: '🌟 Wertschätzung / Dankbarkeit', category: 'Romantisch' },
    { value: 'MEMORY', label: '💭 Gemeinsame Erinnerung', category: 'Romantisch' },
    { value: 'GRATITUDE', label: '🙏 Dankbarkeit', category: 'Romantisch' },
    { value: 'GRATITUDE_EXCHANGE', label: '🙏 Dankbarkeits-Austausch', category: 'Romantisch' },
    
    // Virtual Activities
    { value: 'VIRTUAL_DATE', label: '🎬 Virtuelles Date (Discord/Kino)', category: 'Virtual' },
    { value: 'MOVIE_NIGHT', label: '🎬 Film-Abend (Netflix Party)', category: 'Virtual' },
    { value: 'GAME_CHALLENGE', label: '🎮 Gaming-Challenge', category: 'Virtual' },
    { value: 'COOKING_TOGETHER', label: '🍳 Virtuelles Kochen', category: 'Virtual' },
    { value: 'WORKOUT_CHALLENGE', label: '💪 Sport-Challenge', category: 'Virtual' },
    
    // Musik & Audio
    { value: 'PLAYLIST_COLLAB', label: '🎵 Gemeinsame Playlist', category: 'Musik' },
    { value: 'COLLABORATIVE_PLAYLIST', label: '🎵 Story-Playlist (Kapitel)', category: 'Musik' },
    { value: 'SPOTIFY_SONG', label: '🎵 Song des Tages', category: 'Musik' },
    { value: 'VOICE_MESSAGE', label: '🎙️ Sprachnachricht', category: 'Musik' },
    { value: 'PODCAST_SHARE', label: '🎧 Podcast-Empfehlung', category: 'Musik' },
    
    // Interaktive Spiele
    { value: 'WOULD_YOU_RATHER', label: '🤔 Würdest du lieber...?', category: 'Spiele' },
    { value: 'THIS_OR_THAT', label: '⚡ Dies oder Das', category: 'Spiele' },
    { value: 'TRUTH_OR_DARE', label: '🎪 Wahrheit oder Pflicht', category: 'Spiele' },
    { value: 'TWO_TRUTHS_ONE_LIE', label: '🎭 Zwei Wahrheiten & Eine Lüge', category: 'Spiele' },
    { value: 'DEBATE_FUN', label: '🎤 Lustiges Debate', category: 'Spiele' },
    { value: 'PREDICTION_GAME', label: '🔮 Vorhersage-Spiel', category: 'Spiele' },
    { value: 'QUESTION_EXCHANGE', label: '💬 Fragen-Austausch', category: 'Spiele' },
    { value: 'INTERACTIVE_CHOICE', label: '🎮 Interaktive Wahl (Buttons)', category: 'Spiele' },
    { value: 'POLL', label: '📊 Umfrage', category: 'Spiele' },
    { value: 'RIDDLE', label: '🤔 Rätsel', category: 'Spiele' },
    { value: 'QUIZ_JSON', label: '❓ Quiz (JSON)', category: 'Spiele' },
    
    // Kreativ & Challenges
    { value: 'PHOTO_CHALLENGE', label: '📸 Foto-Challenge', category: 'Kreativ' },
    { value: 'ART_CHALLENGE', label: '🎨 Kunst-Challenge', category: 'Kreativ' },
    { value: 'COUPLE_CHALLENGE', label: '💑 Paar-Challenge', category: 'Kreativ' },
    { value: 'STORY_TOGETHER', label: '📖 Geschichte zusammen schreiben', category: 'Kreativ' },
    { value: 'BINGO_CHALLENGE', label: '🎯 Paar-Bingo', category: 'Kreativ' },
    { value: 'ROLEPLAY_SCENARIO', label: '🎭 Roleplay-Szenario', category: 'Kreativ' },
    { value: 'COMPLIMENT_BATTLE', label: '💝 Kompliment-Battle', category: 'Kreativ' },
    { value: 'SCAVENGER_HUNT', label: '🔍 Virtuelle Schnitzeljagd', category: 'Kreativ' },
    { value: 'PARALLEL_CHALLENGE', label: '⏱️ Parallel-Challenge', category: 'Kreativ' },
    { value: 'DRAWING', label: '✏️ Zeichnung / ASCII Art', category: 'Kreativ' },
    { value: 'SCREENSHOT_TOUR', label: '📱 Screenshot-Tour', category: 'Kreativ' },
    { value: 'MEME_COLLECTION', label: '😂 Meme-Sammlung', category: 'Kreativ' },
    
    // Planung & Zukunft
    { value: 'BUCKET_LIST', label: '🎯 Bucket List Item', category: 'Zukunft' },
    { value: 'SHARED_GOAL', label: '🎯 Gemeinsames Ziel', category: 'Zukunft' },
    { value: 'DREAM_BOARD', label: '🌟 Traumboard', category: 'Zukunft' },
    { value: 'LIFE_GOALS', label: '🎯 Lebensziele (5/10/20 Jahre)', category: 'Zukunft' },
    { value: 'DREAM_DATE_PLANNING', label: '🌟 Traumdate planen', category: 'Zukunft' },
    { value: 'ADVENTURE_PLAN', label: '🗺️ Abenteuer-Planung', category: 'Zukunft' },
    { value: 'WISH_LIST', label: '🎁 Wunschliste', category: 'Zukunft' },
    
    // Persönlich & Geschichten
    { value: 'CHILDHOOD_STORY', label: '👶 Kindheitsgeschichte', category: 'Persönlich' },
    { value: 'FIRST_IMPRESSION', label: '💑 Erster Eindruck', category: 'Persönlich' },
    { value: 'EMBARRASSING_MOMENT', label: '😳 Peinlicher Moment', category: 'Persönlich' },
    { value: 'INSIDE_JOKE', label: '🤫 Inside Joke', category: 'Persönlich' },
    { value: 'FAVORITE_THINGS', label: '❤️ Lieblingssachen', category: 'Persönlich' },
    
    // Spezial
    { value: 'COUNTDOWN', label: '⏰ Countdown', category: 'Spezial' },
    { value: 'TIME_CAPSULE', label: '⏳ Zeitkapsel', category: 'Spezial' },
    { value: 'LETTER_TO_FUTURE', label: '📝 Brief an die Zukunft', category: 'Spezial' },
    { value: 'SUNRISE_SUNSET', label: '🌅 Sonnenauf-/untergang', category: 'Spezial' },
    { value: 'PET_PHOTOS', label: '🐾 Haustier-Fotos', category: 'Spezial' },
    
    // Weitere
    { value: 'RECIPE', label: '🍳 Rezept', category: 'Weiteres' },
    { value: 'BOOK_RECOMMENDATION', label: '📚 Buch-Empfehlung', category: 'Weiteres' },
    { value: 'MAP', label: '🗺️ Karte / Orte', category: 'Weiteres' },
  ];
  
  const templates = {
    'VIRTUAL_DATE': `🎬 EXKLUSIVES KINO-DATE!

Film: [Dein Lieblingsfilm]
Zeit: 20:00 Uhr
Platform: Discord Screenshare

VORBEREITUNG:
🍿 Popcorn
🍫 Schokolade
🥤 Getränk
🛋️ Gemütlich machen

REGELN:
✅ Kameras AN
✅ Gleichzeitig pausieren
✅ Live-Reaktionen erwünscht!

Nach dem Film: Bewertung & Diskussion!`,

    'GAME_CHALLENGE': `🎮 GAMING-NIGHT!

Spiel: Among Us / Minecraft / Gartic Phone
Zeit: 19:00 Uhr

CHALLENGE:
- Wer gewinnt mehr Runden?
- Verlierer macht [lustige Strafe]!

DISCORD VOICE CHAT!
Ready? 💪`,

    'COOKING_TOGETHER': `👨‍🍳 KOCH-DATE! 👩‍🍳

Rezept: [Dein Lieblingsrezept]

ABLAUF:
1. Video-Call starten
2. Zutaten zeigen
3. Zusammen kochen
4. Zusammen essen
5. Bewerten!

BONUS: Lustigste Küchenpanne gewinnt! 😂`,

    'LOVE_LETTER': `💌 Meine liebste Miss Chaos,

[Schreib hier von Herzen...]

Was ich an dir liebe:
- 
- 
- 

Warum du besonders bist:


Was ich mir für uns wünsche:


In Liebe,
Dein Locdoc 🧡`,

    'APPRECIATION': `🌟 30 DINGE, DIE ICH AN DIR LIEBE

DEINE PERSÖNLICHKEIT:
1. Dein Lachen
2. Deine Geduld
3. Wie du immer positiv bleibst
4. [...]

DEINE KLEINEN MACKEN:
5. Wie du [...]
6. [...]

WAS DU FÜR MICH TUST:
10. Dass du immer für mich da bist
11. [...]

[... 20 weitere Punkte ...]`,

    'WOULD_YOU_RATHER': `🤔 WÜRDEST DU LIEBER...?

10 Fragen für uns:

1. Würdest du lieber...
   A) Gedanken lesen können
   B) Unsichtbar sein können?

2. Würdest du lieber...
   A) Immer in der Stadt leben
   B) Immer auf dem Land leben?

3. Würdest du lieber...
   A) Zeitreisen (Vergangenheit)
   B) Zukunft sehen können?

[... 7 weitere Fragen ...]

REGEL: Du MUSST dich entscheiden!
Erkläre deine Wahl!`,

    'THIS_OR_THAT': `⚡ SCHNELLFEUER: THIS OR THAT!

30 SEKUNDEN pro Antwort!

ESSEN:
🍕 Pizza ODER 🍔 Burger?
☕ Kaffee ODER 🍵 Tee?
🍫 Schokolade ODER 🍬 Gummibärchen?

FREIZEIT:
🏖️ Strand ODER 🏔️ Berge?
📚 Buch ODER 📺 Serie?
🎮 Games ODER 🎲 Brettspiele?

BEZIEHUNG:
🎁 Geschenke ODER ⏰ Quality Time?
💬 Reden ODER 😂 Lachen?

Vergleichen wir danach! 🎯`,

    'LIFE_GOALS': `🎯 UNSERE LEBENSZIELE

IN 5 JAHREN (2030):
👫 Beziehung: [Zusammenleben? Verlobt?]
💼 Karriere: [Wo willst du sein?]
🏡 Wohnen: [Stadt? Land? Eigenes Haus?]
🌍 Reisen: [Welche Orte?]

IN 10 JAHREN (2035):
👨‍👩‍👧‍👦 Familie: [...]
🏠 Haus: [...]

IN 20 JAHREN (2045):
💭 Wo sehe ich uns: [...]

BUCKET LIST FÜR UNS:
☐ Nordlichter sehen
☐ 10 Länder besuchen
☐ Zusammen leben
☐ [...]`,

    'PHOTO_CHALLENGE': `📸 FOTO-CHALLENGE DES TAGES!

AUFGABE: Mach ein Foto von etwas, das dich an mich erinnert!

Das kann sein:
- Ein Gegenstand
- Ein Ort
- Eine Farbe
- Ein Gefühl
- Irgendetwas "Das ist so Locdoc!"

Schick mir das Foto und beschreib, warum! 🧡`,

    'CHILDHOOD_STORY': `👶 KINDHEITS-ERINNERUNG

Meine Geschichte:
[Erzähl eine lustige/süße/peinliche Geschichte]

FRAGEN AN DICH:
1. Was wolltest du als Kind werden?
2. Lieblings-Cartoon?
3. Peinlichster Schulmoment?
4. Erste Verliebtheit?
5. Lustigste Familien-Anekdote?

Bonus: Kindheitsfoto! 📸`,

    'TIME_CAPSULE': `⏳ ZEITKAPSEL - Öffne am [Datum in 1 Jahr]

Liebes zukünftiges Ich, liebes zukünftiges Wir,

wenn ihr das lest, ist ein Jahr vergangen...

FRAGEN AN DIE ZUKUNFT:
1. Leben wir zusammen?
2. Größtes Abenteuer?
3. Wie oft gesehen?
4. Was erreicht?

MEINE VORHERSAGEN:
- Wo wir sein werden: [...]
- Was wir gemacht haben: [...]

MEIN VERSPRECHEN:
Ich verspreche, dass ich...

Datum: [Heute]`,

    'MOVIE_NIGHT': `🎬 NETFLIX PARTY!

Film-Auswahl:
1. [Dein Wunschfilm]
2. [Alternative]
3. [Notfall-Option]

SETUP:
📱 Teleparty Extension installieren
🎥 Netflix gleichzeitig
💬 Chat aktiviert
🍿 Snacks bereit!

ZEIT: 20:00 Uhr
DANACH: Film-Bewertung & Diskussion!`,

    'BUCKET_LIST': `🎯 BUCKET LIST ITEM

Gemeinsames Ziel: [Z.B. Nordlichter sehen]

WARUM: [...]

WIE KÖNNEN WIR DAS ERREICHEN:
- Budget: [...]
- Zeitplan: [...]
- Vorbereitung: [...]

BIS WANN: [Datum]

ZWISCHENZIELE:
☐ [Schritt 1]
☐ [Schritt 2]
☐ [Schritt 3]`,

    'APPRECIATION': `💖 ICH SCHÄTZE AN DIR...

DEINE PERSÖNLICHKEIT:
✨ [...]
✨ [...]
✨ [...]

KLEINE DINGE:
💗 Wie du lachst
💗 Deine Art zu [...]
💗 [...],

WAS DU FÜR MICH TUST:
🌟 [...]
🌟 [...]

WARUM ICH DICH LIEBE:
[...]`,

    'PLAYLIST_COLLAB': `🎵 UNSERE GEMEINSAME PLAYLIST!

Link: [Spotify Collaborative Playlist]

AUFGABE:
Füge 5 Songs hinzu, die...
- ...uns beschreiben
- ...dich an mich erinnern
- ...unsere Beziehung sind

REGELN:
✅ Jeder fügt Songs hinzu
✅ Keine Doppelungen
✅ Mix aus alten & neuen

Dann hören wir sie zusammen! 🎧`,

    'MEMORY': `💭 WEISST DU NOCH...?

Datum: [Wann war das?]
Ort: [Wo?]

WAS PASSIERT IST:
[Beschreibe die Erinnerung...]

LUSTIGSTE MOMENTE:
- [...]
- [...]

WAS ICH DARAN LIEBE:
[...]

FOTO? [Falls vorhanden]`,

    'FIRST_IMPRESSION': `💑 MEIN ERSTER EINDRUCK VON DIR

WANN: [Datum]
WO: [Ort]

MEIN ERSTER GEDANKE:
"[...]"

WAS MIR SOFORT AUFGEFALLEN IST:
- [...]
- [...]
- [...]

WAS ICH DACHTE:
[...]

WAS ICH HEUTE DARÜBER DENKE:
[...]`,

    'TRUTH_OR_DARE': `🎪 WAHRHEIT ODER PFLICHT!

10 WAHRHEITEN:
1. Wann wusstest du, dass du mich liebst?
2. Peinlichste Situation wegen mir?
3. Was hast du noch nie gesagt?
4. [...]

10 PFLICHTEN:
1. Schick ein Selfie in [lustigem Outfit]
2. Sing mir ein Lied
3. Erzähl einen schlechten Witz
4. [...]

REGEL: Ehrliche Antworten! 💯`,

    'ART_CHALLENGE': `🎨 KUNST-CHALLENGE!

AUFGABE: Zeichne/Male/Erstelle...
[Spezifisches Thema]

DEADLINE: [Datum]

INSPIRATION:
- [...]
- [...]

MEDIUM: [Digital/Papier/etc.]

Dann zeigen wir uns die Ergebnisse! 🖼️`,

    'SUNRISE_SUNSET': `🌅 SONNENAUF/UNTERGANG ZUSAMMEN!

DATUM: [Nächstes Wochenende]
ZEIT: [Sonnenaufgang/untergang Zeit]

ABLAUF:
1. Video-Call starten
2. Beide nach draußen/ans Fenster
3. Zusammen schauen
4. Live-Reaktionen!

BONUS:
📸 Wer macht das schönere Foto?

Romantisch & verbindend! ☀️`,

    'INSIDE_JOKE': `🤫 UNSERE INSIDE JOKES

1. "[Witz/Spruch]"
   Herkunft: [...]
   
2. "[Witz/Spruch]"
   Herkunft: [...]
   
3. "[Witz/Spruch]"
   Herkunft: [...]

UNSER GEHEIMCODE:
Wenn ich sage "[...]", meine ich eigentlich "[...]"

Nur WIR verstehen das! 😂`,

    'LETTER_TO_FUTURE': `📝 BRIEF AN UNS IN 5 JAHREN

Liebes Wir von 2030,

wie ist es bei euch?

FRAGEN:
- Lebt ihr zusammen?
- Welche Träume habt ihr erreicht?
- Seid ihr glücklich?

MEINE HOFFNUNGEN:
[...]

MEIN VERSPRECHEN:
Ich werde dafür sorgen, dass...

Mit Liebe,
[Name] - [Datum]`,

    'TWO_TRUTHS_ONE_LIE': `🎭 ZWEI WAHRHEITEN & EINE LÜGE

RUNDE 1 - LOCDOC:
1. [Wahrheit/Lüge über Kindheit]
2. [Wahrheit/Lüge über Hobby]
3. [Wahrheit/Lüge über Geheimnis]

→ Miss Chaos: Rate welche die Lüge ist!

RUNDE 2 - MISS CHAOS:
Jetzt bist du dran! Schreib 3 Aussagen!

PUNKTESYSTEM:
✅ Richtig geraten = 1 Punkt
❌ Falsch geraten = 0 Punkte
🎯 Wer gewinnt?`,

    'COUPLE_CHALLENGE': `💑 PAAR-CHALLENGE DER WOCHE

CHALLENGE: [Thema, z.B. "Komplimente-Marathon"]

REGELN:
1. Locdoc startet: [...]
2. Miss Chaos antwortet: [...]
3. Abwechselnd weitermachen!

DEADLINE: [Datum]

BELOHNUNG:
Gewinner darf sich nächstes Date aussuchen! 🎁

Los geht's!`,

    'STORY_TOGETHER': `📖 GEMEINSAME GESCHICHTE SCHREIBEN

THEMA: [z.B. "Unser erstes Abenteuer auf dem Mars"]

LOCDOC BEGINNT:
"Es war einmal... [schreib 3-5 Sätze]"

MISS CHAOS FORTSETZUNG:
[Schreib deine 3-5 Sätze als Antwort!]

REGEL: Jeder fügt einen Teil hinzu!
Am Ende: Komplette Geschichte lesen!`,

    'BINGO_CHALLENGE': `🎯 PAAR-BINGO

Markiert GEMEINSAM was ihr schon gemacht habt:

☐ Zusammen gekocht (virtuell)
☐ Gleiche Serie geschaut
☐ Zusammen eingeschlafen (Call)
☐ Gaming Session länger als 3h
☐ Fotos ausgetauscht (10+)
☐ Sprachnachricht länger als 5min
☐ Zusammen aufgewacht
☐ Memes geschickt (50+)
☐ Video-Date länger als 2h
☐ "Ich liebe dich" gesagt
☐ Pläne fürs Treffen gemacht
☐ Einander Lieder geschickt
☐ Zusammen was gelernt
☐ Sich gegenseitig überrascht
☐ Über Zukunft gesprochen
☐ Zusammen gelacht bis Tränen

ZIEL: 5 in einer Reihe = BINGO! 🎉`,

    'DEBATE_FUN': `🎤 LUSTIGES DEBATE

THESE: "[Lustige kontroverse Meinung]"

LOCDOC vertritt: PRO
Miss Chaos vertritt: CONTRA

REGELN:
- 3 Argumente pro Person
- Möglichst lustig & kreativ
- Am Ende: Wer hat gewonnen?

BEISPIEL THESE:
"Ananas gehört auf Pizza!"
"Hunde sind besser als Katzen!"
"Frühaufsteher sind Übermenschen!"

LOCDOCS ARGUMENTE:
1. [...]
2. [...]
3. [...]

MISS CHAOS ANTWORTET:
[Schreib deine Gegenargumente!]`,

    'ROLEPLAY_SCENARIO': `🎭 ROLEPLAY-SZENARIO

SITUATION: [z.B. "Erstes Date in einem Restaurant"]

ROLLEN:
Locdoc: [Rolle, z.B. "Nervöser Date-Kandidat"]
Miss Chaos: [Rolle, z.B. "Charmante Mystery-Person"]

ABLAUF:
Schreibt wie ein Chat-Rollenspiel!

LOCDOC:
*sitzt nervös am Tisch*
"Also, äh... kommst du oft hierher?"

MISS CHAOS:
[Antworte im Roleplay-Style!]

REGEL: Mindestens 5 Nachrichten pro Person!
Viel Spaß! 😂`,

    'COMPLIMENT_BATTLE': `💝 KOMPLIMENT-BATTLE

CHALLENGE: Wer macht die schönsten Komplimente?

REGELN:
- 5 Runden
- Abwechselnd Komplimente schreiben
- Je kreativer, desto besser!

RUNDE 1 - LOCDOC:
"Ich liebe wie du... [kreatives Kompliment]"

RUNDE 2 - MISS CHAOS:
"Deine Art zu... macht mich... [übertreffe ihn!]"

RUNDE 3 - LOCDOC:
[Noch besser!]

RUNDE 4 - MISS CHAOS:
[...]

RUNDE 5 - BEIDE:
[Finales Mega-Kompliment!]

Am Ende beide lächeln! 😊`,

    'PREDICTION_GAME': `🔮 VORHERSAGE-SPIEL

Sagt voraus was passieren wird!

IN 1 MONAT:
Locdoc denkt: [...]
Miss Chaos denkt: [...]

IN 6 MONATEN:
Locdoc: [...]
Miss Chaos: [...]

IN 1 JAHR:
Locdoc: [...]
Miss Chaos: [...]

IN 5 JAHREN:
Locdoc: [...]
Miss Chaos: [...]

REGEL: Versiegeln und in Zeitkapsel!
In 1 Jahr öffnen und vergleichen!`,

    'SCAVENGER_HUNT': `🔍 VIRTUELLE SCHNITZELJAGD

LOCDOC VERSTECKT HINWEISE:
Versteck Codes/Hinweise in:
- Alten Chat-Nachrichten
- Gemeinsamen Fotos
- Playlists
- Memes

HINWEIS 1: [...]
HINWEIS 2: [...]
HINWEIS 3: [...]

LÖSUNG: [Was Miss Chaos finden soll]

MISS CHAOS:
Finde alle Hinweise und löse das Rätsel!
Belohnung: [Überraschung!]`,

    'PARALLEL_CHALLENGE': `⏱️ PARALLEL-CHALLENGE

Macht GLEICHZEITIG die gleiche Aufgabe!

AUFGABE: [z.B. "Zeichne uns in 5 Minuten"]

REGELN:
1. Timer stellen: 5 Minuten
2. Beide starten gleichzeitig
3. KEINE Kamera (Überraschung!)
4. Nach 5 Min: Beide zeigen!

BEWERTUNG:
- Kreativität 1-10
- Ähnlichkeit 1-10
- Humor 1-10

Wer gewinnt? Oder beide? 🏆`,

    'QUESTION_EXCHANGE': `💬 FRAGEN-AUSTAUSCH

Stellt euch abwechselnd tiefe Fragen!

LOCDOC FRAGT:
1. Was ist dein größter Traum?
2. Wann fühlst du dich am glücklichsten?
3. [Deine Frage]

MISS CHAOS ANTWORTET:
[Ausführlich antworten!]

MISS CHAOS FRAGT:
1. Was macht dich wirklich stolz?
2. Welche Ängste hast du?
3. [Deine Frage]

LOCDOC ANTWORTET:
[...]

REGEL: Ehrliche, tiefe Gespräche! 💕`,

    'GRATITUDE_EXCHANGE': `🙏 DANKBARKEITS-AUSTAUSCH

Teilt wofür ihr dankbar seid!

LOCDOC:
3 Dinge die ich an DIR schätze:
1. [...]
2. [...]
3. [...]

3 Dinge die UNS glücklich machen:
1. [...]
2. [...]
3. [...]

MISS CHAOS ANTWORTET:
[Deine Dankbarkeiten!]

Am Ende: Gemeinsam reflektieren
Was haben wir gelernt? 💖`,

    'COLLABORATIVE_PLAYLIST': `🎵 GEMEINSAME STORY-PLAYLIST

Erstellt eine Playlist die UNSERE GESCHICHTE erzählt!

KAPITEL 1 - KENNENLERNEN:
Locdoc wählt: [Song + warum]
Miss Chaos wählt: [Song + warum]

KAPITEL 2 - VERLIEBT:
Locdoc: [...]
Miss Chaos: [...]

KAPITEL 3 - FERNBEZIEHUNG:
Locdoc: [...]
Miss Chaos: [...]

KAPITEL 4 - ZUKUNFT:
Locdoc: [...]
Miss Chaos: [...]

FINALE: Ein Song für UNS beide!
[Gemeinsam aussuchen]

Link zur Playlist: [...]`,

    'DREAM_DATE_PLANNING': `🌟 TRAUMDATE PLANEN

Plant GEMEINSAM euer perfektes Date!

ORT:
Locdoc Vorschlag: [...]
Miss Chaos Vorschlag: [...]
KONSENS: [...]

AKTIVITÄTEN:
1. [Locdoc Idee]
2. [Miss Chaos Idee]
3. [Gemeinsame Idee]

ESSEN:
Locdoc: [...]
Miss Chaos: [...]
Kompromiss: [...]

OUTFIT:
Locdoc trägt: [...]
Miss Chaos trägt: [...]

BESONDERES:
[Eine Überraschung für den anderen]

AM ENDE:
[Wie endet das perfekte Date?]

DATUM FÜR REAL: [Wann machen wir das?]`,

    // Distanzierte / Freundliche Vorlagen
    'TEXT': `📝 NACHRICHT DES TAGES

Hey! 👋

[Deine Nachricht hier...]

Einen schönen Tag wünsche ich dir!`,

    'SHARED_GOAL': `🎯 EIN GEMEINSAMES ZIEL

Was wir zusammen erreichen wollen:
[Ziel beschreiben]

WARUM IST DAS WICHTIG:
- [Grund 1]
- [Grund 2]
- [Grund 3]

ERSTE SCHRITTE:
1. [Schritt 1]
2. [Schritt 2]
3. [Schritt 3]

DEADLINE: [Wann wollen wir das schaffen?]

Lass uns das gemeinsam angehen! 💪`,

    'WOULD_YOU_RATHER': `🤔 WÜRDEST DU LIEBER...?

Hier sind 5 schwierige Entscheidungen für dich:

1️⃣ Würdest du lieber...
   A) [Option A]
   B) [Option B]

2️⃣ Würdest du lieber...
   A) [Option A]
   B) [Option B]

3️⃣ Würdest du lieber...
   A) [Option A]
   B) [Option B]

4️⃣ Würdest du lieber...
   A) [Option A]
   B) [Option B]

5️⃣ Würdest du lieber...
   A) [Option A]
   B) [Option B]

Schreib mir deine Antworten! 😊`,

    'THIS_OR_THAT': `⚡ DIES ODER DAS?

Schnelle Entscheidungen - keine Zeit zum Nachdenken!

☕ Kaffee oder Tee?
🌅 Frühaufsteher oder Nachteule?
🏖️ Strand oder Berge?
📱 iOS oder Android?
🍕 Pizza oder Pasta?
🎬 Film oder Serie?
🎮 Gaming oder Sport?
📚 Buch oder Podcast?
🌮 Süß oder Salzig?
🎵 Pop oder Rock?

Was ist deine Wahl? 🤷‍♀️`,

    'PHOTO_CHALLENGE': `📸 FOTO-CHALLENGE

AUFGABE:
Mach heute ein Foto von [...]

REGELN:
✅ Muss heute gemacht werden
✅ Sei kreativ!
✅ Bonus für lustige Details

BEISPIELE:
- Dein Arbeitsplatz/Schreibtisch
- Etwas das dich repräsentiert
- Deine Lieblings-Ecke zuhause
- Etwas das du gerade tust
- Dein aktueller Blick aus dem Fenster

Ich bin gespannt! 😊`,

    'BOOK_RECOMMENDATION': `📚 BUCH-EMPFEHLUNG

Ich empfehle dir heute:

TITEL: [Buchtitel]
AUTOR: [Autor/in]
GENRE: [Genre]

WORUM GEHT'S:
[Kurze Beschreibung ohne Spoiler]

WARUM ICH ES MAG:
- [Grund 1]
- [Grund 2]
- [Grund 3]

FÜR DICH, WEIL:
[Warum passt es zu dir?]

ZITAT:
"[Lieblingszitat aus dem Buch]"

Vielleicht hast du ja Lust es zu lesen? 📖`,

    'RECIPE': `🍳 REZEPT-EMPFEHLUNG

Hier ist ein Rezept das du probieren könntest:

GERICHT: [Name]
⏱️ ZEIT: [ca. X Minuten]
👥 PORTIONEN: [Anzahl]

ZUTATEN:
- [Zutat 1]
- [Zutat 2]
- [Zutat 3]
- [...]

ZUBEREITUNG:
1. [Schritt 1]
2. [Schritt 2]
3. [Schritt 3]
4. [...]

TIPPS:
💡 [Tipp 1]
💡 [Tipp 2]

Viel Spaß beim Nachkochen! Lass mich wissen wie es war! 😊`,

    'CHILDHOOD_STORY': `👶 GESCHICHTE AUS MEINER KINDHEIT

Ich möchte dir von etwas erzählen, was mir als Kind passiert ist:

ALTER: [Wie alt war ich?]
ORT: [Wo war das?]

WAS PASSIERT IST:
[Erzähle die Geschichte...]

WARUM ICH MICH DARAN ERINNERE:
[Was war besonders daran?]

WAS ICH DARAUS GELERNT HABE:
[...]

Hast du auch so eine Geschichte? 😊`,

    'FAVORITE_THINGS': `❤️ MEINE LIEBLINGS-DINGE

Hier sind ein paar Sachen die ich richtig gerne mag:

🎵 MUSIK: [Band/Song]
📺 SERIE: [Serie]
🍕 ESSEN: [Gericht]
☕ GETRÄNK: [...]
📚 BUCH: [...]
🎮 SPIEL: [...]
🏞️ ORT: [...]
🌈 FARBE: [...]
🐾 TIER: [...]
⏰ TAGESZEIT: [...]

Was sind deine Lieblings-Dinge? 😊`,

    'MAP': `🗺️ ORTE DIE ICH DIR ZEIGEN MÖCHTE

Hier sind Orte die mir wichtig sind:

📍 ORT 1: [Name]
Warum: [...]
Was man da machen kann: [...]

📍 ORT 2: [Name]
Warum: [...]
Was man da machen kann: [...]

📍 ORT 3: [Name]
Warum: [...]
Was man da machen kann: [...]

Vielleicht können wir da mal zusammen hin? 😊`,

    'COUNTDOWN': `⏰ COUNTDOWN

Nur noch [X] Tage bis [Event]!

WAS PASSIERT DANN:
[Beschreibung]

DARAUF FREUE ICH MICH:
- [Grund 1]
- [Grund 2]
- [Grund 3]

VORBEREITUNG:
[ ] [Todo 1]
[ ] [Todo 2]
[ ] [Todo 3]

Bist du auch schon gespannt? 😊`,

    // Verrückte & Kreative Ideen
    'RANDOM_ACTS': `🎭 ZUFÄLLIGE VERRÜCKTE IDEEN

Heute könnten wir Folgendes tun:

🎪 VERRÜCKTE CHALLENGE:
[Beschreibe eine absurde Challenge z.B. "Sprich den ganzen Tag nur in Reimen" oder "Iss Pizza mit Messer und Gabel rückwärts"]

🎨 KREATIVE AUFGABE:
[z.B. "Male ein Portrait von mir mit geschlossenen Augen" oder "Erfinde eine neue Sportart"]

🎲 SPONTAN-AKTION:
[z.B. "Bestell beim nächsten Essen das was der andere für dich aussucht" oder "Tanze plötzlich zu imaginärer Musik"]

Bist du bereit für Chaos? 😈`,

    'PARALLEL_UNIVERSE': `🌌 IN EINEM PARALLELUNIVERSUM...

Stell dir vor in einem Paralleluniversum:

🔮 DU BIST: [Alternative Version von dir]
🔮 ICH BIN: [Alternative Version von mir]

WIR TREFFEN UNS:
[Verrückter Ort/Situation]

UNSER ERSTES DATE:
[Absurde Date-Idee]

WAS PASSIERT:
[Erzähle eine verrückte Geschichte...]

PLOT TWIST:
[Unerwartetes Ende]

In welchem Paralleluniversum würdest du gerne leben? 🌠`,

    'PILLOW_FORT': `🏰 KISSEN-BURG BAUPLAN

HEUTE BAUEN WIR: Die ultimative Kuschel-Festung!

MATERIALIEN:
- [X] Kissen (alle!)
- [X] Decken (mindestens 5)
- [X] Lichterketten ✨
- [X] Snacks 🍿
- [X] Laptop für Filme

BAUANLEITUNG:
1. Sofa = Hauptstruktur
2. Kissen = Wände
3. Decken = Dach
4. Lichterkette = Ambiente

PROGRAMM IN DER BURG:
📺 [Film/Serie Vorschlag]
🍫 [Snack Ideen]
🎮 [Optional: Spiel]
💤 [Optional: Nickerchen]

REGEL: Wer die Burg verlässt, muss [lustige Strafe]!

Wann bauen wir? 🏗️`,

    'COZY_EVENING': `🕯️ GEMÜTLICHER ABEND

Ich plane einen perfekt gemütlichen Abend:

🛋️ SETTING:
- Gedimmtes Licht / Kerzen
- Weiche Decken
- Dicke Socken
- Vielleicht Kamin/Kaminfeuer-Video?

☕ GETRÄNKE:
- [Heißes Getränk 1]
- [Heißes Getränk 2]
- Marshmallows? ✅

🍪 SNACKS:
- [Süßes]
- [Salziges]
- [Extras]

📺 UNTERHALTUNG:
- [Film/Serie]
- Oder: [Brettspiel/Kartenspiel]
- Oder: Einfach nur reden

DRESSCODE: Hoodie & Jogginghose Pflicht! 😊

Zeit für Gemütlichkeit? 🧸`,

    'BLANKET_BURRITO': `🌯 DECKEN-BURRITO ANLEITUNG

Du siehst heute aus als könntest du einen DECKEN-BURRITO gebrauchen!

ZUTATEN:
🛌 1x große weiche Decke
🧸 1x du
☕ Optional: heißer Kakao
🍫 Optional: Schokolade
📱 Optional: Handy für Nachrichten

ZUBEREITUNG:
1. Decke flach ausbreiten
2. Dich in die Mitte legen
3. Einrollen wie einen Burrito
4. Nicht mehr bewegen

SERVIERVORSCHLAG:
Am besten auf Sofa/Bett
Mit Netflix oder Hörbuch
Bleib mindestens 2 Stunden so!

WARNUNG: Kann süchtig machen! 🥰`,

    'CUDDLE_QUIZ': `💕 KUSCHEL-QUIZ

Beantworte folgende wichtige Fragen:

1️⃣ Lieblings-Kuschel-Position?
   A) Kleiner Löffel
   B) Großer Löffel
   C) Face-to-Face
   D) Chaotisch übereinander

2️⃣ Optimale Kuschel-Temperatur?
   A) Mega warm mit 5 Decken
   B) Eine leichte Decke reicht
   C) Keine Decke, nur Körperwärme
   D) Ich bin ein Hitze-Ofen

3️⃣ Kuschel-Soundtrack?
   A) Totale Stille
   B) Leise Musik
   C) Film/Serie im Hintergrund
   D) Regen-Geräusche

4️⃣ Kuschel-Dauer?
   A) 5 Minuten dann wird's zu warm
   B) 30 Minuten sweet spot
   C) 2+ Stunden Marathon
   D) Ganzen Tag!

5️⃣ Beste Kuschel-Zeit?
   A) Morgens beim Aufwachen
   B) Nachmittags Nickerchen
   C) Abends vor dem Schlafen
   D) Jederzeit! Immer!

Deine Antworten? 🤔`,

    'RAINY_DAY': `🌧️ REGENTAG-PROGRAMM

Es regnet draußen? PERFEKT!

REGENTAG-AKTIVITÄTEN:
☔ Regen am Fenster beobachten
☕ Heißen Tee/Kakao trinken
📚 Buch lesen (oder vorlesen?)
🎵 Regen-Playlist hören
🍪 Kekse backen
🛋️ Kuscheldecke + Film Marathon
🕯️ Kerzen anzünden
💤 Power-Nap machen
🎨 Etwas kreatives machen
💭 Einfach nur chillen

REGENTAG-REGEL:
Niemand muss raus! Niemand muss produktiv sein!
Heute ist offiziell Cozy-Day! 🌈

BONUS: Später wenn es aufhört - raus und Pfützen-Springen? 😄

Was ist dein Lieblings-Regentag-Plan?`,

    'MASSAGE_COUPON': `💆 MASSAGE-GUTSCHEIN

✨ DIESER GUTSCHEIN BERECHTIGT ZU: ✨

🙌 EINE [X]-MINUTEN MASSAGE
📍 ORT: [z.B. "Auf dem Sofa" oder "Im Bett"]
⏰ ZEIT: [z.B. "Nach Wahl" oder "Heute Abend"]

LEISTUNGEN:
✅ Schulter-Massage
✅ Rücken-Massage
✅ Kopf-Massage
✅ Hand-Massage
✅ Fuß-Massage (wenn du willst)

EXTRAS INKLUSIVE:
- Entspannende Musik 🎵
- Gedimmtes Licht 🕯️
- Danach: Kuscheln 🧸

BEDINGUNGEN:
- Keine Rückgabe
- Nicht übertragbar
- Unbegrenzt gültig
- Kann mehrfach eingelöst werden 😊

Wann löst du ein? 💕`,

    'BREAKFAST_IN_BED': `🛏️ FRÜHSTÜCK IM BETT PLAN

Du bleibst morgen liegen - ich kümmere mich um Frühstück!

MENÜ:
🥐 [Backwaren]
🍳 [Warmes]
🥣 [Cerealien/Müsli/Joghurt]
🍓 [Obst]
☕ [Heißgetränk]
🥤 [Kaltgetränk]

EXTRAS:
- Frische Blume in Vase 🌸
- Serviette kunstvoll gefaltet (Versuch!)
- Kleine Überraschung unter der Tasse

UNTERHALTUNG:
📱 Handy zum Scrollen
📰 Oder etwas zum Lesen
🎵 Leise Musik im Hintergrund

REGEL: Du darfst erst aufstehen wenn du komplett fertig bist! 😊

Klingt gut? 🥰`,

    'MOVIE_NEST': `🎬 FILM-NEST SETUP

Heute bauen wir das ultimative Cozy-Film-Nest!

NEST-BASIS:
🛋️ Sofa/Bett umbauen
🛏️ Alle Kissen & Decken organisieren
✨ Lichterkette aufhängen
🕯️ Duftkerze anzünden

VERPFLEGUNG:
🍿 Popcorn (salzig & süß)
🍫 Schokolade
🍕 [Essen für später]
🥤 Getränke in Reichweite

FILM-AUSWAHL:
Option 1: [Film]
Option 2: [Film]
Option 3: [Serie-Marathon]
Backup: [Falls nichts passt]

REGELN:
✅ Handys auf stumm
✅ Kein Aufstehen außer Notfall
✅ Kuscheln erlaubt
✅ Kommentieren des Films erwünscht!

Bereit für Filmabend? 🎥`,

    'SLOW_MORNING': `☀️ LANGSAMER MORGEN

Morgen machen wir einen SLOW MORNING (keine Eile!):

⏰ KEIN WECKER!
Wir stehen auf wenn wir aufwachen

🛌 AUSSCHLAFEN:
Alle Zeitlimits sind aufgehoben

☕ GEMÜTLICHES FRÜHSTÜCK:
Wir nehmen uns Zeit
Vielleicht zusammen kochen?

🧘 ENTSPANNTE AKTIVITÄTEN:
- Im Bett rumliegen ✅
- Kuscheln ✅
- Reden ✅
- Musik hören ✅
- Raus schauen ✅
- Einfach sein ✅

📵 REGEL:
Keine stressigen Nachrichten checken
Kein Social Media
Nur wir beide und Ruhe

⏱️ ZEITLIMIT:
Bis mindestens [X] Uhr dürfen wir NICHTS produktives tun!

Klingt das nach einem Plan? 🥰`,

    'STARGAZING': `⭐ STERNENGUCKEN

Heute Abend: STERNENBEOBACHTUNG!

📍 ORT:
[Balkon/Garten/Draußen/Durchs Fenster]

🛋️ SETUP:
- Decken zum Draufliegen/Einwickeln
- Kissen für Kopf
- Warme Jacken/Hoodies
- Heißgetränk in Thermoskanne

✨ WAS WIR SEHEN KÖNNEN:
- Sternbilder: [X, Y, Z]
- Planeten: [falls sichtbar]
- Vielleicht Sternschnuppen? 💫

🎵 PLAYLIST:
[Entspannte Musik für's Handy]

💭 GESPRÄCHSTHEMEN:
- Universum & verrückte Weltraum-Fakten
- Was wäre wenn wir auf dem Mond wären?
- Unsere Träume & Zukunft

WICHTIG: Wir bleiben so lange bis uns kalt wird oder wir müde sind!

Heute Nacht? 🌙`
  };
  
  function loadTemplate(type: string) {
    if (templates[type] && editingDay) {
      editingDay.contentA = templates[type];
      selectedTemplate = type;
    }
  }
  
  function getCategoryColor(category: string) {
    const colors = {
      'Basis': '#9e9e9e',
      'Romantisch': '#ff4d94',
      'Virtual': '#667eea',
      'Musik': '#1db954',
      'Spiele': '#ff9800',
      'Kreativ': '#e91e63',
      'Zukunft': '#4caf50',
      'Persönlich': '#2196f3',
      'Spezial': '#9c27b0',
      'Weiteres': '#795548'
    };
    return colors[category] || '#9e9e9e';
  }
  
  function getQuizExample() {
    return JSON.stringify({
      questions: [
        {
          question: "Deine Frage hier?",
          options: ["Option 1", "Option 2", "Option 3", "Option 4"],
          correctAnswer: 0
        }
      ]
    }, null, 2);
  }
</script>

<svelte:head>
  <title>Admin Panel - Adventskalender</title>
</svelte:head>

<div class="admin-container">
  <header class="admin-header">
    <h1>🛠️ Adventskalender Admin</h1>
    
    <div class="header-sections">
      <!-- Hauptfunktionen -->
      <div class="header-group">
        <h3 class="group-title">📋 Hauptfunktionen</h3>
        <div class="header-actions">
          <a href="/?simulation=true" class="btn-simulation" target="_blank">
            🎮 Simulation Modus
          </a>
          <a href="/" class="btn-secondary">← Zum Kalender</a>
        </div>
      </div>
      
      <!-- Tools & Verwaltung -->
      <div class="header-group">
        <h3 class="group-title">🔧 Content Builder Tools</h3>
        <div class="header-actions">
          <a href="/admin/tiles" class="btn-tiles">
            🎨 Tile Library
          </a>
          <a href="/admin/calendar-manager" class="btn-calendar">
            📅 Calendar Manager
          </a>
          <a href="/admin/template-builder" class="btn-builder">
            📝 Template Builder
          </a>
          <a href="/admin/story-chain-builder" class="btn-builder">
            📖 Story Chain Builder
          </a>
          <a href="/admin/quiz-builder" class="btn-quiz">
            🎯 Quiz-Builder
          </a>
        </div>
      </div>
      
      <!-- System & Verwaltung -->
      <div class="header-group">
        <h3 class="group-title">🔧 System Tools</h3>
        <div class="header-actions">
          <a href="/admin/tracking" class="btn-tracking">
            🔄 Tracking Reset
          </a>
          <button on:click={openPrismaStudio} class="btn-prisma">
            🗄️ Prisma Studio
          </button>
        </div>
      </div>
      
      <!-- Einstellungen & Logout -->
      <div class="header-group">
        <h3 class="group-title">⚙️ System</h3>
        <div class="header-actions">
          <a href="/admin/settings" class="btn-settings">
            ⚙️ Einstellungen
          </a>
          <a href="/admin/logout" class="btn-logout">🔓 Logout</a>
        </div>
      </div>
    </div>
  </header>
  
  {#if form?.success}
    <div class="alert alert-success">
      ✅ {form.message}
    </div>
  {/if}
  
  {#if form?.error}
    <div class="alert alert-error">
      ❌ {form.error}
    </div>
  {/if}
  
  {#if showPrismaInfo}
    <div class="modal-overlay" on:click={closePrismaInfo}>
      <div class="modal-content" on:click|stopPropagation>
        <div class="modal-header">
          <h2>🗄️ Prisma Studio starten</h2>
          <button on:click={closePrismaInfo} class="btn-close">✕</button>
        </div>
        <div class="modal-body">
          <p>Prisma Studio ist ein fortgeschrittenes Datenbank-Tool mit direktem Zugriff auf alle Tabellen.</p>
          
          <h3>So starten Sie Prisma Studio:</h3>
          <ol>
            <li>Öffnen Sie ein <strong>neues PowerShell-Fenster</strong></li>
            <li>Navigieren Sie zum Projekt:
              <pre class="code-block">cd e:\Scripte\Adventskalender</pre>
            </li>
            <li>Führen Sie aus:
              <pre class="code-block">npx prisma studio</pre>
            </li>
            <li>Warten Sie bis Sie sehen:
              <pre class="code-block">Prisma Studio is up on http://localhost:5555</pre>
            </li>
            <li>Öffnen Sie im Browser:
              <a href="http://localhost:5555" target="_blank" class="prisma-link">
                http://localhost:5555
              </a>
            </li>
          </ol>
          
          <div class="info-box">
            <h4>💡 Wann Prisma Studio nutzen?</h4>
            <ul>
              <li>✅ Bulk-Operationen (mehrere Einträge auf einmal)</li>
              <li>✅ Direkter Datenbank-Zugriff</li>
              <li>✅ Daten exportieren/importieren</li>
              <li>✅ Technische Fehlersuche</li>
            </ul>
            <h4>Für normale Bearbeitung:</h4>
            <p>👈 Nutzen Sie das Admin-Panel (diese Seite)</p>
          </div>
          
          <h3>📋 Kommando kopieren:</h3>
          <div class="copy-box">
            <code>npx prisma studio</code>
            <button on:click={() => navigator.clipboard.writeText('npx prisma studio')} class="btn-copy">
              📋 Kopieren
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <div class="content-wrapper">
    <!-- Story-Chain-Übersicht -->
    {#if data.days.filter(d => d.linkedToPrevious || d.linkedToNext || d.storyChainId).length > 0}
      <div class="story-overview">
        <h2>📚 Mehrtägige Zusammenhänge & Story-Ketten</h2>
        <p class="overview-hint">Hier siehst du alle Tage, die miteinander verbunden sind</p>
        
        <div class="story-chains">
          {#each getStoryChains(data.days) as chain}
            <div class="chain-card">
              <div class="chain-header">
                <span class="chain-icon">🔗</span>
                <h3>
                  {#if chain.storyChainId}
                    Story: {chain.storyChainId}
                  {:else}
                    Verbundene Tage
                  {/if}
                </h3>
                <span class="chain-count">{chain.days.length} Tage</span>
              </div>
              
              <div class="chain-timeline">
                {#each chain.days as day, idx}
                  <div class="timeline-item">
                    <button 
                      class="timeline-day"
                      class:has-content-b={day.contentB}
                      on:click={() => editDay(day)}
                    >
                      <span class="timeline-number">Tag {day.dayNumber}</span>
                      <span class="timeline-title">{day.title}</span>
                      {#if day.contentB}
                        <span class="timeline-badge">✅</span>
                      {/if}
                    </button>
                    {#if idx < chain.days.length - 1}
                      <div class="timeline-arrow">→</div>
                    {/if}
                  </div>
                {/each}
              </div>
              
              <div class="chain-actions">
                <button 
                  class="btn-preview-chain" 
                  on:click={() => previewChain(chain.days)}
                >
                  👁️ Alle Tage dieser Kette anschauen
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Türchen-Liste -->
    <div class="days-list">
      <h2>Alle Türchen</h2>
      <div class="days-grid">
        {#each data.days as day}
          <div class="day-card" class:editing={editingDay?.id === day.id}>
            <div class="day-header">
              <span class="day-number">Tag {day.dayNumber}</span>
              <span class="day-type">{day.contentTypeA}</span>
            </div>
            <h3>{day.title}</h3>
            {#if day.authorA}
              <p class="day-author">Von: {day.authorA}</p>
            {/if}
            {#if day.contentB}
              <span class="badge-answered">✅ Person B geantwortet</span>
            {/if}
            <div class="day-actions">
              <button on:click={() => editDay(day)} class="btn-edit">
                ✏️ Bearbeiten
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Editor -->
    {#if editingDay}
      <div class="editor-panel">
        <div class="editor-header">
          <h2>Bearbeite Tag {editingDay.dayNumber}</h2>
          <button on:click={cancelEdit} class="btn-close">✕</button>
        </div>
        
        <form method="POST" action="?/update" use:enhance>
          <input type="hidden" name="id" value={editingDay.id} />
          
          <div class="form-group">
            <label for="title">Titel</label>
            <input
              type="text"
              id="title"
              name="title"
              bind:value={editingDay.title}
              required
              placeholder="z.B. Willkommen in unserem Kalender! 🎅"
            />
          </div>
          
          <div class="form-section">
            <h3>💝 Person A - Inhalt</h3>
            
            <div class="form-group">
              <label for="contentTypeA">Inhaltstyp</label>
              <select id="contentTypeA" name="contentTypeA" bind:value={editingDay.contentTypeA} required>
                <optgroup label="─── Basis ───">
                  {#each contentTypes.filter(t => t.category === 'Basis') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Romantisch ───">
                  {#each contentTypes.filter(t => t.category === 'Romantisch') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Virtual Activities ───">
                  {#each contentTypes.filter(t => t.category === 'Virtual') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Musik & Audio ───">
                  {#each contentTypes.filter(t => t.category === 'Musik') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Interaktive Spiele ───">
                  {#each contentTypes.filter(t => t.category === 'Spiele') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Kreativ & Challenges ───">
                  {#each contentTypes.filter(t => t.category === 'Kreativ') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Planung & Zukunft ───">
                  {#each contentTypes.filter(t => t.category === 'Zukunft') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Persönlich & Geschichten ───">
                  {#each contentTypes.filter(t => t.category === 'Persönlich') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Spezial ───">
                  {#each contentTypes.filter(t => t.category === 'Spezial') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
                <optgroup label="─── Weiteres ───">
                  {#each contentTypes.filter(t => t.category === 'Weiteres') as type}
                    <option value={type.value}>{type.label}</option>
                  {/each}
                </optgroup>
              </select>
            </div>
            
            {#if templates[editingDay.contentTypeA]}
              <div class="template-box">
                <div class="template-header">
                  <span class="template-icon">📝</span>
                  <span>Vorlage verfügbar!</span>
                </div>
                <button type="button" class="btn-template" on:click={() => loadTemplate(editingDay.contentTypeA)}>
                  ✨ Vorlage einfügen & anpassen
                </button>
                <small>Klicke um eine fertige Vorlage zu laden, die du dann personalisieren kannst!</small>
              </div>
            {/if}
            
            <div class="form-group">
              <label for="contentA">
                Inhalt
                {#if editingDay.contentTypeA === 'QUIZ_JSON'}
                  <button type="button" class="btn-help" on:click={() => editingDay.contentA = getQuizExample()}>
                    Beispiel einfügen
                  </button>
                {/if}
              </label>
              <textarea
                id="contentA"
                name="contentA"
                bind:value={editingDay.contentA}
                required
                rows="10"
                placeholder="Inhalt von Person A..."
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="authorA">Autor (optional)</label>
              <input
                type="text"
                id="authorA"
                name="authorA"
                bind:value={editingDay.authorA}
                placeholder="z.B. Person A"
              />
            </div>
          </div>

          <div class="form-section">
            <h3>✨ Aufgabe & Antwort-Modus</h3>
            
            <div class="form-group">
              <label for="responseMode">Antwort-Modus</label>
              <select id="responseMode" name="responseMode" bind:value={editingDay.responseMode}>
                <option value="DISABLED">🔒 Keine Antwort möglich</option>
                <option value="OPEN">💬 Miss Chaos kann sofort antworten</option>
                <option value="AFTER_A">📝 Nur Locdoc antwortet hier</option>
                <option value="AFTER_B">📝 Nur Miss Chaos antwortet hier</option>
                <option value="COLLABORATIVE">🤝 Zusammenarbeit (beide füllen aus)</option>
              </select>
              <small>💡 Bestimmt, wer wann auf diesem Türchen antworten kann</small>
            </div>
            
            <div class="form-group">
              <label for="taskForB">Aufgabenstellung für Miss Chaos (optional)</label>
              <textarea
                id="taskForB"
                name="taskForB"
                bind:value={editingDay.taskForB}
                rows="3"
                placeholder="z.B. Ergänze die Geschichte mit deinem Teil..."
              ></textarea>
            </div>
          </div>
          
          <div class="form-section">
            <h3>🔗 Mehrtägige Aufgaben (Story-Chain)</h3>
            
            <div class="form-group">
              <label>
                <input type="checkbox" name="linkedToPrevious" bind:checked={editingDay.linkedToPrevious} />
                📖 Fortsetzung vom vorherigen Tag
              </label>
            </div>
            
            <div class="form-group">
              <label>
                <input type="checkbox" name="linkedToNext" bind:checked={editingDay.linkedToNext} />
                ⏭️ Wird am nächsten Tag fortgesetzt
              </label>
            </div>
            
            <div class="form-group">
              <label for="storyChainId">Story-Chain ID (optional)</label>
              <input
                type="text"
                id="storyChainId"
                name="storyChainId"
                bind:value={editingDay.storyChainId}
                placeholder="z.B. weihnachtsgeschichte, raetsel-serie"
              />
              <small>💡 Gleiche ID = Zusammenhängende Geschichte. Beispiele: Tag 3,4,5 = "love-story"</small>
            </div>
          </div>
          
          <div class="form-section">
            <h3>🎨 Gemeinsames Ergebnis</h3>
            <div class="form-group">
              <label for="combinedResult">Kombiniertes Ergebnis (optional)</label>
              <textarea
                id="combinedResult"
                name="combinedResult"
                bind:value={editingDay.combinedResult}
                rows="4"
                placeholder="z.B. Die fertige Geschichte aus beiden Teilen..."
              ></textarea>
              <small>💡 Wird angezeigt wenn beide ihre Teile ausgefüllt haben</small>
            </div>
          </div>
          
          <div class="form-section info-section">
            <h3>💖 Miss Chaos - Aktuelle Antwort</h3>
            <p class="info-text">
              {#if editingDay.contentB}
                ✅ Miss Chaos hat bereits geantwortet.
              {:else}
                ℹ️ Miss Chaos kann ihre Antwort direkt auf der Website hinzufügen.
              {/if}
            </p>
            {#if editingDay.contentB}
              <div class="preview-box">
                <strong>Antwort von {editingDay.authorB || 'Miss Chaos'}:</strong>
                <p>{editingDay.contentB}</p>
              </div>
              <form method="POST" action="?/resetResponse" use:enhance style="margin-top: 1rem;">
                <input type="hidden" name="id" value={editingDay.id} />
                <button type="submit" class="btn-danger">
                  🗑️ Antwort zurücksetzen
                </button>
              </form>
            {/if}
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              💾 Speichern
            </button>
            <button type="button" on:click={togglePreview} class="btn-secondary">
              {showPreview ? '📝 Editor' : '👁️ Vorschau'}
            </button>
            <button type="button" on:click={cancelEdit} class="btn-secondary">
              Abbrechen
            </button>
          </div>
        </form>
        
        {#if showPreview && previewComponent}
          <div class="preview-panel">
            <h3>📋 Vorschau - So wird es aussehen</h3>
            <div class="preview-wrapper">
              <div class="preview-header">
                <div class="preview-day-badge">Tag {editingDay.dayNumber}</div>
                <h2 class="preview-title">{editingDay.title || 'Titel fehlt'}</h2>
              </div>
              
              <!-- Person A Box (Locdoc) -->
              <div class="preview-box preview-box-a">
                <svelte:component 
                  this={previewComponent} 
                  content={editingDay.contentA}
                  author={editingDay.authorA}
                  contentType={editingDay.contentTypeA}
                />
                
                {#if editingDay.taskForB && editingDay.responseMode !== 'DISABLED'}
                  <div class="preview-task">
                    <h3>📋 Aufgabe für {editingDay.authorB || 'Miss Chaos'}:</h3>
                    <p>{editingDay.taskForB}</p>
                    {#if editingDay.responseMode === 'COLLABORATIVE'}
                      <span class="preview-mode-badge collaborative">🤝 Zusammenarbeit</span>
                    {:else if editingDay.responseMode === 'OPEN'}
                      <span class="preview-mode-badge open">💬 Offen</span>
                    {/if}
                  </div>
                {/if}
              </div>
              
              <!-- Person B Box (Miss Chaos) -->
              {#if editingDay.responseMode !== 'DISABLED'}
                <div class="preview-box preview-box-b">
                  <span class="preview-badge">{editingDay.authorB || 'Miss Chaos'} 💖</span>
                  {#if editingDay.contentB}
                    <div class="preview-response-content">
                      {#each editingDay.contentB.split('\n') as line}
                        {#if line.trim()}<p>{line}</p>{/if}
                      {/each}
                    </div>
                  {:else}
                    <div class="preview-empty">
                      <p>💭 Noch keine Antwort von {editingDay.authorB || 'Miss Chaos'}...</p>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
            
            <div class="preview-actions">
              <button type="button" class="btn-preview-live" on:click={() => window.open(`/day/${editingDay.dayNumber}?simulation=true`, '_blank')}>
                🚀 Live-Vorschau in neuem Tab öffnen (entsperrt)
              </button>
              <p class="preview-hint">💡 Die Vorschau ist immer entsperrt, damit du alles testen kannst!</p>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <div class="editor-placeholder">
        <div class="placeholder-content">
          <span class="placeholder-icon">✏️</span>
          <h3>Wähle ein Türchen zum Bearbeiten</h3>
          <p>Klicke auf "Bearbeiten" bei einem Türchen links</p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f5f7fa;
  }
  
  .admin-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .admin-header {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }
  
  .admin-header h1 {
    margin: 0 0 1.5rem 0;
    color: #2c3e50;
    font-size: 2rem;
    text-align: center;
  }
  
  .header-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .header-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .group-title {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 0.5rem;
  }
  
  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .header-actions a,
  .header-actions button {
    padding: 0.7rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    text-align: center;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    display: block;
  }
  
  .btn-tiles {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }
  
  .btn-tiles:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }
  
  .btn-calendar {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }
  
  .btn-calendar:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }
  
  .btn-builder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .btn-builder:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .btn-quiz {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }
  
  .btn-quiz:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
  }
  
  .btn-tracking {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
  }
  
  .btn-tracking:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
  }
  
  .alert {
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .alert-success {
    background: #d5f4e6;
    color: #27ae60;
    border: 2px solid #27ae60;
  }
  
  .alert-error {
    background: #fadbd8;
    color: #c0392b;
    border: 2px solid #e74c3c;
  }
  
  .content-wrapper {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  .days-list {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
  
  .days-list h2 {
    margin-top: 0;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
  
  .days-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .day-card {
    padding: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .day-card:hover {
    border-color: #667eea;
    transform: translateX(5px);
  }
  
  .day-card.editing {
    border-color: #667eea;
    background: #f0f4ff;
  }
  
  .day-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .day-number {
    font-weight: bold;
    color: #667eea;
  }
  
  .day-type {
    font-size: 0.75rem;
    background: #e0e7ff;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: #4c1d95;
  }
  
  .day-card h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #2c3e50;
  }
  
  .day-author {
    font-size: 0.85rem;
    color: #7f8c8d;
    font-style: italic;
    margin: 0.25rem 0;
  }
  
  .badge-answered {
    display: inline-block;
    background: #27ae60;
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    margin-top: 0.5rem;
  }
  
  .day-actions {
    margin-top: 0.75rem;
  }
  
  .btn-edit {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    border: none;
    border-radius: 6px;
    background: #667eea;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .btn-edit:hover {
    background: #5568d3;
    transform: translateY(-2px);
  }
  
  .editor-panel, .editor-placeholder {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
  
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #ecf0f1;
  }
  
  .editor-header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #7f8c8d;
    transition: color 0.3s ease;
  }
  
  .btn-close:hover {
    color: #e74c3c;
  }
  
  .form-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    border: 2px solid #e0e0e0;
  }
  
  .form-section h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .form-section.info-section {
    background: #e8f5e9;
    border-color: #27ae60;
  }
  
  .info-text {
    color: #555;
    margin: 0.5rem 0;
  }
  
  .preview-box {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    border: 1px solid #ddd;
  }
  
  .preview-box strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }
  
  .preview-box p {
    margin: 0;
    color: #555;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .btn-help {
    margin-left: 1rem;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }
  
  .form-group select optgroup {
    font-weight: bold;
    font-style: normal;
    color: #667eea;
    margin-top: 0.5rem;
  }
  
  .form-group select option {
    padding: 0.5rem;
  }
  
  .form-group textarea {
    font-family: 'Consolas', 'Monaco', monospace;
    resize: vertical;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .content-hints {
    margin-top: 0.5rem;
  }
  
  .content-hints small {
    color: #7f8c8d;
    font-size: 0.85rem;
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .btn-secondary {
    background: #95a5a6;
    color: white;
  }
  
  .btn-secondary:hover {
    background: #7f8c8d;
  }
  
  .btn-logout {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #e67e22;
    color: white;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn-logout:hover {
    background: #d35400;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(230, 126, 34, 0.4);
  }
  
  .btn-settings {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn-settings:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .btn-simulation {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn-simulation:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
  }
  
  .btn-danger {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #e74c3c;
    color: white;
  }
  
  .btn-danger:hover {
    background: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
  }
  
  .btn-prisma {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #2ecc71;
    color: white;
    margin-right: 1rem;
  }
  
  .btn-prisma:hover {
    background: #27ae60;
    transform: translateY(-2px);
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }
  
  .modal-content {
    background: white;
    border-radius: 16px;
    max-width: 700px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 2px solid #ecf0f1;
  }
  
  .modal-header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .modal-body {
    padding: 2rem;
  }
  
  .modal-body h3 {
    color: #2c3e50;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .modal-body ol {
    padding-left: 1.5rem;
  }
  
  .modal-body li {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .code-block {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-family: 'Consolas', 'Monaco', monospace;
    display: block;
    margin: 0.5rem 0;
    overflow-x: auto;
  }
  
  .prisma-link {
    display: inline-block;
    background: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    margin: 0.5rem 0;
    transition: background 0.3s ease;
  }
  
  .prisma-link:hover {
    background: #2980b9;
  }
  
  .info-box {
    background: #f0f4ff;
    border: 2px solid #667eea;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .info-box h4 {
    margin-top: 0;
    color: #667eea;
  }
  
  .info-box ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  .info-box p {
    margin-bottom: 0;
  }
  
  .copy-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
  }
  
  .copy-box code {
    flex: 1;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 1rem;
  }
  
  .btn-copy {
    padding: 0.5rem 1rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
  }
  
  .btn-copy:hover {
    background: #2980b9;
  }
  
  .template-box {
    background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
    border: 2px dashed #667eea;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    text-align: center;
  }
  
  .template-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
    color: #667eea;
    font-size: 1.1rem;
  }
  
  .template-icon {
    font-size: 1.5rem;
  }
  
  .btn-template {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;
  }
  
  .btn-template:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .template-box small {
    color: #666;
    font-size: 0.85rem;
    display: block;
  }
  
  .placeholder-content {
    text-align: center;
    padding: 4rem 2rem;
    color: #95a5a6;
  }
  
  .placeholder-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
  }
  
  .placeholder-content h3 {
    margin: 0.5rem 0;
    color: #7f8c8d;
  }
  
  .preview-panel {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #ecf0f1;
  }
  
  .preview-panel h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    font-size: 1.3rem;
  }
  
  .preview-wrapper {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #e0e0e0;
  }
  
  .preview-box { 
    margin: 1.5rem 0; 
    padding: 2.5rem; 
    border-radius: 20px; 
    border: 3px solid; 
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    position: relative;
    overflow: hidden;
  }
  
  /* Locdoc Box - Orange */
  .preview-box-a { 
    background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 50%, #fff 100%); 
    border-color: #ff9800;
  }
  
  /* Miss Chaos Box - Pink */
  .preview-box-b { 
    background: linear-gradient(135deg, #fff0f6 0%, #ffe4f0 50%, #fff 100%); 
    border-color: #ff4d94;
  }
  
  .preview-badge { 
    display: inline-block; 
    padding: 0.6rem 1.8rem; 
    border-radius: 50px; 
    font-weight: 700; 
    font-size: 1.1rem; 
    margin-bottom: 1.2rem; 
    color: white;
    background: linear-gradient(135deg, #ff4d94 0%, #e91e63 100%);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .preview-task {
    margin-top: 2rem;
    padding: 1.8rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    border-left: 5px solid #ff9800;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  .preview-task h3 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
  
  .preview-task p {
    margin: 0 0 1rem 0;
    line-height: 1.6;
    color: #34495e;
  }
  
  .preview-mode-badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .preview-mode-badge.collaborative {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  
  .preview-mode-badge.open {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }
  
  .preview-empty {
    padding: 2rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    border: 2px dashed #ff4d94;
  }
  
  .preview-empty p {
    margin: 0;
    color: #7f8c8d;
    font-style: italic;
  }
  
  .preview-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 3px solid #e0e0e0;
  }
  
  .preview-day-badge {
    background: linear-gradient(135deg, #ff9800 0%, #f57c00 50%, #ff4d94 100%);
    color: white;
    padding: 0.6rem 1.8rem;
    border-radius: 50px;
    display: inline-block;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
  }
  
  .preview-title {
    margin: 0;
    font-size: 2rem;
    background: linear-gradient(135deg, #ff9800 0%, #ff4d94 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 800;
  }
  
  .preview-response-content {
    line-height: 1.6;
    color: #2c3e50;
  }
  
  .preview-response-content p {
    margin: 0.5rem 0;
  }
  
  .preview-actions {
    margin-top: 1.5rem;
    text-align: center;
    padding-top: 1.5rem;
    border-top: 2px solid #ecf0f1;
  }
  
  .btn-preview-live {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
  }
  
  .btn-preview-live:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }
  
  .preview-hint {
    margin-top: 0.8rem;
    color: #7f8c8d;
    font-size: 0.9rem;
    font-style: italic;
  }
  
  /* Story Chain Overview */
  .story-overview {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    padding: 2rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    border: 3px solid #66bb6a;
    box-shadow: 0 8px 24px rgba(46, 125, 50, 0.15);
  }
  
  .story-overview h2 {
    margin: 0 0 0.5rem 0;
    color: #2e7d32;
    font-size: 1.8rem;
  }
  
  .overview-hint {
    margin: 0 0 1.5rem 0;
    color: #558b2f;
    font-style: italic;
  }
  
  .story-chains {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .chain-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    border: 2px solid #81c784;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  .chain-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e8f5e9;
  }
  
  .chain-icon {
    font-size: 2rem;
  }
  
  .chain-header h3 {
    margin: 0;
    flex: 1;
    color: #2e7d32;
    font-size: 1.3rem;
  }
  
  .chain-count {
    background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  .chain-timeline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  
  .timeline-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .timeline-day {
    background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%);
    border: 2px solid #ff9800;
    padding: 0.8rem 1.2rem;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    position: relative;
  }
  
  .timeline-day:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
    border-color: #f57c00;
  }
  
  .timeline-day.has-content-b {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border-color: #66bb6a;
  }
  
  .timeline-number {
    font-weight: 700;
    color: #e65100;
    font-size: 0.85rem;
  }
  
  .timeline-title {
    color: #2c3e50;
    font-size: 0.9rem;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .timeline-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #66bb6a;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  
  .timeline-arrow {
    color: #66bb6a;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .chain-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding-top: 1rem;
    border-top: 2px solid #e8f5e9;
  }
  
  .btn-preview-chain {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
  }
  
  .btn-preview-chain:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }
  
  .preview-text {
    line-height: 1.8;
  }
  
  .preview-author {
    font-style: italic;
    color: #7f8c8d;
    margin-top: 0.5rem;
  }
  
  .preview-json {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.9rem;
  }
  
  @media (max-width: 1200px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }
    
    .days-list {
      max-height: none;
    }
  }
</style>
