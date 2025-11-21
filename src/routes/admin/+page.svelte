<script lang="ts">
  import { enhance } from '$app/forms';
  import { getContentComponent } from '$lib/components/content-types';
  import type { ActionData, PageData } from './$types';
  
  export let data: PageData;
  export let form: ActionData | null = null;
  
  type AdminDay = PageData['days'][number];
  
  let editingDay: AdminDay | null = null;
  let showPreview = false;
  let activeTab: 'grunddaten' | 'inhalt' | 'antwort' | 'chain' | 'ergebnis' = 'grunddaten';
  
  // Reactive component for preview
  $: previewComponent = editingDay ? getContentComponent(editingDay.contentTypeA || 'TEXT') : null;
  
  function editDay(day: AdminDay) {
    editingDay = { ...day };
    showPreview = false;
    activeTab = 'grunddaten';
  }
  
  function cancelEdit() {
    editingDay = null;
    showPreview = false;
  }
  
  function togglePreview() {
    showPreview = !showPreview;
  }
  
  // Story Chain Helper Functions
  function getStoryChains(days: AdminDay[]) {
    const chains: Array<{ storyChainId: string | null; days: AdminDay[] }> = [];
    const processed = new Set<number>();
    
    // Group by storyChainId
    const byChainId = days.filter((d) => d.storyChainId && !processed.has(d.id));
    const chainGroups = new Map<string, AdminDay[]>();
    
    byChainId.forEach((day) => {
      if (!chainGroups.has(day.storyChainId)) {
        chainGroups.set(day.storyChainId, []);
      }
      chainGroups.get(day.storyChainId)?.push(day);
      processed.add(day.id);
    });
    
    chainGroups.forEach((chainDays, storyChainId) => {
      chains.push({
        storyChainId,
        days: [...chainDays].sort((a, b) => a.dayNumber - b.dayNumber)
      });
    });
    
    // Find linked chains without storyChainId
    days.forEach((day) => {
      if (processed.has(day.id)) return;
      if (!day.linkedToPrevious && !day.linkedToNext) return;
      
      const linkedDays: AdminDay[] = [day];
      processed.add(day.id);
      
      // Find next days
      let current = day;
      while (current.linkedToNext) {
        const next = days.find((d) => d.dayNumber === current.dayNumber + 1 && d.linkedToPrevious);
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
        const prev = days.find((d) => d.dayNumber === current.dayNumber - 1 && d.linkedToNext);
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
          days: [...linkedDays].sort((a, b) => a.dayNumber - b.dayNumber)
        });
      }
    });
    
    return chains;
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
  
  const templatesBase = {
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

  const templateOverrides: Record<string, string> = {
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

    'RECIPE': `🍳 MEIN LIEBLINGSREZEPT FÜR DICH

NAME: [Name des Gerichts]
ZEIT: [Zubereitungszeit]

ZUTATEN:
- [Zutat 1]
- [Zutat 2]
- [...]

ZUBEREITUNG:
1. [Schritt 1]
2. [Schritt 2]
3. [...]

WARUM DU ES LIEBEN WIRST:
[Beschreibe den Geschmack...]

WANN WIR ES KOCHEN:
[Vorschlag für ein Datum]`,

    'BOOK_RECOMMENDATION': `📚 BUCH-EMPFEHLUNG

TITEL: [Buchtitel]
AUTOR: [Autor]

DARUM GEHT ES:
[Kurze Zusammenfassung...]

WARUM ES DIR GEFALLEN KÖNNTE:
[Deine Gedanken dazu...]

LIEBLINGSZITAT:
"[...]"

Lass es uns zusammen lesen? 📖`,

    'BUCKET_LIST': `🎯 BUCKET LIST ITEM

DAS MÖCHTE ICH MIT DIR ERLEBEN:
[Titel des Erlebnisses]

WARUM?
[Beschreibe warum das toll wäre...]

WIE WIR DAS MACHEN:
1. [Erster Schritt]
2. [Zweiter Schritt]

ZEITRAHMEN:
[Wann wollen wir das machen?]`,

    'SHARED_GOAL': `🎯 GEMEINSAMES ZIEL 2026

DAS ZIEL:
[Was wollen wir erreichen?]

WARUM ES UNS GUT TUT:
[...]

UNSER PLAN:
- [Schritt 1]
- [Schritt 2]

BELOHNUNG WENN WIR ES SCHAFFEN:
[Was gönnen wir uns?]`,

    'DREAM_DATE_PLANNING': `🌟 TRAUM-DATE PLANUNG

DAS KONZEPT:
[Titel des Dates]

ORT: [Wo?]
STIMMUNG: [Romantisch/Abenteuer/Entspannt?]

ABLAUF:
1. Wir treffen uns...
2. Dann gehen wir...
3. Wir essen...
4. Der Abend endet...

WAS DU MITBRINGEN MUSST:
[...]

Wann hast du Zeit? ❤️`,

    'PLAYLIST_COLLAB': `🎵 GEMEINSAME PLAYLIST

THEMA: [z.B. Roadtrip / Kuscheln / Kochen]

MEINE ERSTEN 3 SONGS:
1. [Song] - [Interpret]
   (Weil: ...)
2. [Song] - [Interpret]
   (Weil: ...)
3. [Song] - [Interpret]
   (Weil: ...)

DEINE AUFGABE:
Füge 3 Songs hinzu die dazu passen! 🎧`,

    'GAME_CHALLENGE': `🎮 GAMING CHALLENGE

SPIEL: [Name des Spiels]

DIE HERAUSFORDERUNG:
[Was müssen wir schaffen?]

REGELN:
1. [...]
2. [...]

DER EINSATZ:
Der Verlierer muss... [Bestrafung/Aufgabe]
Der Gewinner bekommt... [Belohnung]

Bist du bereit? 🕹️`
  };

  const templates: Record<string, string> = { ...templatesBase, ...templateOverrides };
  
  function loadTemplate(type: string) {
    if (templates[type] && editingDay) {
      editingDay.contentA = templates[type];
      selectedTemplate = type;
    }
  }
  
  function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
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
        <h3 class="group-title">🔧 Inhalts-Werkzeuge</h3>
        <div class="header-actions">
          <a href="/admin/tiles" class="btn-tiles">
            🎨 Kachel-Bibliothek
          </a>
          <a href="/admin/calendar-manager" class="btn-calendar">
            📅 Kalender-Verwaltung
          </a>
          <a href="/admin/template-builder" class="btn-builder">
            📝 Vorlagen-Baukasten
          </a>
          <a href="/admin/story-chain-builder" class="btn-builder">
            📖 Geschichten-Editor
          </a>
          <a href="/admin/quiz-builder" class="btn-quiz">
            🎯 Quiz-Baukasten
          </a>
        </div>
      </div>
      
      <!-- System & Verwaltung -->
      <div class="header-group">
        <h3 class="group-title">🔧 System-Werkzeuge</h3>
        <div class="header-actions">
          <a href="/admin/tracking" class="btn-tracking">
            🔄 Tracking zurücksetzen
          </a>
        </div>
      </div>
      
      <!-- Einstellungen & Logout -->
      <div class="header-group">
        <h3 class="group-title">⚙️ System</h3>
        <div class="header-actions">
          <a href="/admin/settings" class="btn-settings">
            ⚙️ Einstellungen
          </a>
          <a href="/admin/logout" class="btn-logout">🔓 Abmelden</a>
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
  

  
  <!-- Admin Layout Wrapper -->
  <div class="admin-layout">
    <!-- Sidebar with Days -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h3>📅 Türchen</h3>
      </div>
      <div class="days-grid-sidebar">
        {#each data.days as day}
          <button 
            class="day-tile-sidebar" 
            class:active={editingDay?.id === day.id}
            class:answered={day.contentB}
            on:click={() => editDay(day)}
          >
            {day.dayNumber}
          </button>
        {/each}
      </div>
      <div class="sidebar-legend">
        <div class="legend-item"><span class="dot active"></span> Aktiv</div>
        <div class="legend-item"><span class="dot done"></span> Erledigt</div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-content">
      <!-- Editor -->
      {#if editingDay}
        <div class="editor-panel">
        <!-- Template Selection -->
        {#if data.tiles && editingDay}
          {@const dayTemplates = data.tiles.filter(t => t.tags && t.tags.includes(`day-${editingDay!.dayNumber}`))}
          {#if dayTemplates.length > 0}
            <details class="templates-section" open={!editingDay.contentA}>
              <summary>✨ Vorlagen für Tag {editingDay.dayNumber} <span class="summary-hint">(Klicken zum Öffnen/Schließen)</span></summary>
              <div class="templates-grid">
                {#each dayTemplates as template}
                  <button 
                    type="button" 
                    class="template-card"
                    on:click={() => {
                      if (!confirm('Möchtest du diese Vorlage übernehmen? Aktuelle Änderungen gehen verloren.')) return;
                      if (editingDay) {
                        editingDay = {
                          ...editingDay,
                          title: template.title.replace(/ \(Var \d+\)/, ''),
                          contentTypeA: template.contentType,
                          contentA: template.content,
                          taskForB: template.taskForB || '',
                          responseMode: template.responseMode || 'DISABLED'
                        };
                      }
                    }}
                  >
                    <span class="template-category">{template.category}</span>
                    <span class="template-title">{template.title}</span>
                    <span class="template-desc">{template.description}</span>
                  </button>
                {/each}
              </div>
            </details>
          {/if}
        {/if}

        <div class="editor-header">
          <h2>Bearbeite Tag {editingDay.dayNumber}: {editingDay.title}</h2>
          <div class="editor-header-actions">
            <button
              type="button"
              class="btn-preview"
              on:click={() => {
                if (!editingDay) return;
                window.open(`/admin/preview/${editingDay.dayNumber}`, '_blank');
              }}
            >
              🚀 Live-Vorschau
            </button>
            <button on:click={cancelEdit} class="btn-close">✕</button>
          </div>
        </div>
        
        <!-- Tab Navigation -->
        <div class="editor-tabs">
          <button
            type="button"
            class="tab-btn"
            class:active={activeTab === 'grunddaten'}
            on:click={() => activeTab = 'grunddaten'}
          >
            📋 Grunddaten
          </button>
          <button
            type="button"
            class="tab-btn"
            class:active={activeTab === 'inhalt'}
            on:click={() => activeTab = 'inhalt'}
          >
            💝 Inhalt A
          </button>
          <button
            type="button"
            class="tab-btn"
            class:active={activeTab === 'antwort'}
            on:click={() => activeTab = 'antwort'}
          >
            ✨ Antwort & Aufgabe
          </button>
          <button
            type="button"
            class="tab-btn"
            class:active={activeTab === 'chain'}
            on:click={() => activeTab = 'chain'}
          >
            🔗 Story-Verknüpfung
          </button>
          <button
            type="button"
            class="tab-btn"
            class:active={activeTab === 'ergebnis'}
            on:click={() => activeTab = 'ergebnis'}
          >
            🎨 Gemeinsames Ergebnis
          </button>
        </div>
        
        <form method="POST" action="?/update" use:enhance>
          <input type="hidden" name="id" value={editingDay.id} />
          
          <!-- Grunddaten Tab -->
          {#if activeTab === 'grunddaten'}
          <div class="tab-content">
            <div class="form-group">
              <label for="title">
                Titel
                <span class="info-tooltip" title="Der Titel wird ganz oben im Türchen angezeigt. Wähle etwas Spannendes!">ℹ️</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                bind:value={editingDay.title}
                required
                placeholder="z.B. Willkommen in unserem Kalender! 🎅"
              />
              <small class="hint">💡 Tipp: Verwende Emojis für mehr Spaß! 🎄 ❤️ ✨</small>
            </div>
            
            <div class="form-group">
              <label for="authorA">
                Autor (optional)
                <span class="info-tooltip" title="Zeigt an, wer diesen Inhalt erstellt hat. Z.B. 'Locdoc' oder 'Von deinem Schatz'">ℹ️</span>
              </label>
              <input
                type="text"
                id="authorA"
                name="authorA"
                bind:value={editingDay.authorA}
                placeholder="z.B. Locdoc, Von deinem Schatz"
              />
            </div>
            
            {#if editingDay.contentB}
              <div class="info-banner success">
                ✅ Miss Chaos hat bereits geantwortet.
              </div>
            {:else}
              <div class="info-banner">
                ℹ️ Miss Chaos kann ihre Antwort direkt auf der Website hinzufügen.
              </div>
            {/if}
          </div>
          {:else if activeTab === 'inhalt'}
          <div class="tab-content">
            <div class="form-section">
            <h3>💝 Person A - Inhalt</h3>
            
            <div class="form-group">
              <label for="contentTypeA">
                Inhaltstyp
                <span class="info-tooltip" title="Wähle die Art des Inhalts. Dies bestimmt, wie der Content dargestellt wird (Text, Bild, Video, Quiz, etc.)">ℹ️</span>
              </label>
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
            
            {#if editingDay && templates[editingDay.contentTypeA]}
              <div class="template-box">
                <div class="template-header">
                  <span class="template-icon">📝</span>
                  <span>Vorlage verfügbar!</span>
                </div>
                <button
                  type="button"
                  class="btn-template"
                  on:click={() => {
                    if (!editingDay) return;
                    loadTemplate(editingDay.contentTypeA);
                  }}
                >
                  ✨ Vorlage einfügen & anpassen
                </button>
                <small>Klicke um eine fertige Vorlage zu laden, die du dann personalisieren kannst!</small>
              </div>
            {/if}
            
            <div class="form-group">
              <label for="contentA">
                Inhalt
                {#if editingDay?.contentTypeA === 'QUIZ_JSON'}
                  <button
                    type="button"
                    class="btn-help"
                    on:click={() => {
                      if (!editingDay) return;
                      editingDay.contentA = getQuizExample();
                    }}
                  >
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
          </div>
          {:else if activeTab === 'antwort'}
          <div class="tab-content">
          <div class="form-section">
            <h3>✨ Aufgabe & Antwort-Modus</h3>
            
            <div class="form-group">
              <label for="responseMode">
                Antwort-Modus
                <span class="info-tooltip" title="Bestimmt, wie und wann auf dieses Türchen geantwortet werden kann">ℹ️</span>
              </label>
              <select id="responseMode" name="responseMode" bind:value={editingDay.responseMode}>
                <option value="DISABLED">🔒 Keine Antwort möglich</option>
                <option value="OPEN">💬 Sofort antworten (Miss Chaos kann direkt antworten)</option>
                <option value="AFTER_A">📝 Nur Locdoc-Inhalt (Miss Chaos sieht nur, antwortet nicht)</option>
                <option value="AFTER_B">📝 Nur Miss Chaos-Inhalt (Nur sie kann was hinzufügen)</option>
                <option value="COLLABORATIVE">🤝 Zusammenarbeit (Beide können unabhängig beitragen)</option>
              </select>
              <div class="help-box">
                <strong>� Erklärung der Modi:</strong>
                <ul>
                  <li><strong>🔒 Keine Antwort möglich:</strong> Nur Locdocs Inhalt wird angezeigt. Miss Chaos kann nichts hinzufügen.</li>
                  <li><strong>💬 Sofort antworten:</strong> Miss Chaos kann direkt nach dem Öffnen ihre Antwort schreiben.</li>
                  <li><strong>📝 Nur Locdoc-Inhalt:</strong> Das Türchen zeigt nur Locdocs vorbereiteten Inhalt. Keine Antwortmöglichkeit.</li>
                  <li><strong>📝 Nur Miss Chaos-Inhalt:</strong> Nur Miss Chaos kann hier etwas eintragen (z.B. für ihre persönlichen Gedanken).</li>
                  <li><strong>🤝 Zusammenarbeit:</strong> Beide Bereiche werden angezeigt. Perfekt für gemeinsame Aufgaben!</li>
                </ul>
              </div>
            </div>
            
            <div class="form-group">
              <label for="taskForB">
                Aufgabenstellung für Miss Chaos (optional)
                <span class="info-tooltip" title="Beschreibe hier, was Miss Chaos tun soll. Z.B. 'Schreibe deine Version der Geschichte' oder 'Wähle deine Lieblingsfarbe'">ℹ️</span>
              </label>
              <textarea
                id="taskForB"
                name="taskForB"
                bind:value={editingDay.taskForB}
                rows="3"
                placeholder="z.B. Ergänze die Geschichte mit deinem Teil, Schreibe deine Antwort hier..."
              ></textarea>
              <small class="hint">💡 Je klarer die Aufgabe, desto einfacher für Miss Chaos!</small>
            </div>
          </div>
          </div>
          {:else if activeTab === 'chain'}
          <div class="tab-content">
          <div class="form-section">
            <h3>🔗 Mehrtägige Aufgaben (Story-Chain)
              <span class="info-tooltip" title="Verknüpfe mehrere Türchen zu einer zusammenhängenden Story. Entscheidungen aus früheren Tagen können spätere beeinflussen!">ℹ️</span>
            </h3>
            
            <div class="help-box info">
              <strong>🎯 Was sind Story-Chains?</strong>
              <p>Story-Chains verbinden mehrere Türchen zu einer interaktiven Geschichte! Miss Chaos kann z.B.:</p>
              <ul>
                <li>🎨 Farben wählen, die sich durch die Story ziehen</li>
                <li>📝 Text-Bausteine sammeln, die zu einer Geschichte werden</li>
                <li>✨ Elemente auswählen, die am Ende kombiniert werden</li>
                <li>🎭 Entscheidungen treffen, die das Ergebnis beeinflussen</li>
              </ul>
              <p><em>Beispiel:</em> Tag 3 wählt Farbe → Tag 5 schreibt Text → Tag 7 wählt Element → Tag 10 zeigt das kombinierte Ergebnis!</p>
            </div>
            
            <div class="form-group">
              <label>
                <input type="checkbox" name="linkedToPrevious" bind:checked={editingDay.linkedToPrevious} />
                📖 Fortsetzung vom vorherigen Tag
                <span class="info-tooltip" title="Aktiviere dies, wenn dieses Türchen eine direkte Fortsetzung vom Tag davor ist">ℹ️</span>
              </label>
              <small class="hint">Zeigt einen Hinweis auf den vorherigen Tag an</small>
            </div>
            
            <div class="form-group">
              <label>
                <input type="checkbox" name="linkedToNext" bind:checked={editingDay.linkedToNext} />
                ⏭️ Wird am nächsten Tag fortgesetzt
                <span class="info-tooltip" title="Aktiviere dies, wenn die Geschichte am nächsten Tag weitergeht">ℹ️</span>
              </label>
              <small class="hint">Zeigt einen Teaser auf den nächsten Tag an</small>
            </div>
            
            <div class="form-group">
              <label for="storyChainId">
                Story-Chain ID (optional)
                <span class="info-tooltip" title="Eine eindeutige ID für zusammenhängende Geschichten. Alle Türchen mit derselben ID gehören zusammen.">ℹ️</span>
              </label>
              <input
                type="text"
                id="storyChainId"
                name="storyChainId"
                bind:value={editingDay.storyChainId}
                placeholder="z.B. our-love-story, build-your-design"
              />
              <div class="help-box">
                <strong>💡 Beispiele für Chain-IDs:</strong>
                <ul>
                  <li><code>our-love-story</code> - Gemeinsame Geschichte schreiben</li>
                  <li><code>build-your-design</code> - Farben & Elemente sammeln</li>
                  <li><code>christmas-adventure</code> - Weihnachts-Abenteuer</li>
                  <li><code>memory-collection</code> - Erinnerungen sammeln</li>
                </ul>
                <p><em>Tipp:</em> Verwende einfache, sprechende Namen ohne Leerzeichen!</p>
              </div>
            </div>
          </div>
          </div>
          {:else if activeTab === 'ergebnis'}
          <div class="tab-content">
          <div class="form-section">
            <h3>🎨 Gemeinsames Ergebnis
              <span class="info-tooltip" title="Hier kannst du ein finales Ergebnis eingeben, das erst sichtbar wird, wenn beide ihre Teile beigetragen haben">ℹ️</span>
            </h3>
            
            <div class="help-box info">
              <strong>💫 Wann wird das verwendet?</strong>
              <p>Das kombinierte Ergebnis wird nur dann angezeigt, wenn:</p>
              <ul>
                <li>✅ Locdoc seinen Teil (Inhalt A) hat</li>
                <li>✅ Miss Chaos ihren Teil (Inhalt B) hinzugefügt hat</li>
              </ul>
              <p><strong>Perfekt für:</strong></p>
              <ul>
                <li>📖 Gemeinsame Geschichten die zusammengeführt werden</li>
                <li>🎯 Aufgaben die beide erfüllen müssen</li>
                <li>💝 Überraschungen die beide vorbereiten</li>
                <li>🎨 Kreative Projekte die zusammen ein Ganzes ergeben</li>
              </ul>
            </div>
            
            <div class="form-group">
              <label for="combinedResult">
                Kombiniertes Ergebnis (optional)
                <span class="info-tooltip" title="Trage hier das finale Ergebnis ein, z.B. die zusammengeführte Geschichte oder die gemeinsame Überraschung">ℹ️</span>
              </label>
              <textarea
                id="combinedResult"
                name="combinedResult"
                bind:value={editingDay.combinedResult}
                rows="4"
                placeholder="z.B. Die fertige Geschichte aus beiden Teilen..."
              ></textarea>
              <small class="hint">💡 Wird erst angezeigt wenn beide ihre Teile ausgefüllt haben</small>
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
              <div style="margin-top: 1rem;">
                <button
                  type="submit"
                  class="btn-danger"
                  formaction="?/resetResponse"
                  formmethod="POST"
                  formnovalidate
                >
                  🗑️ Antwort zurücksetzen
                </button>
              </div>
            {/if}
          </div>
          </div>
          {/if}
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              💾 Speichern
            </button>
            <button
              type="button"
              class="btn-secondary"
              on:click={() => {
                if (!editingDay) return;
                window.open(`/admin/preview/${editingDay.dayNumber}`, '_blank');
              }}
            >
              � Vorschau öffnen
            </button>
            <button type="button" on:click={cancelEdit} class="btn-secondary">
              Abbrechen
            </button>
          </div>
        </form>
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
              <!-- Preview removed -->
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
    </main>
  </div>
</div>

<style>
  /* Body styles moved to +layout.svelte */
  
  .admin-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .admin-header {
    background: #fff;
    padding: 2rem;
    border-radius: 2px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    margin-bottom: 3rem;
    border: 1px solid #d4af37;
    position: relative;
  }
  
  .admin-header h1 {
    margin: 0 0 2rem 0;
    color: #8b0000;
    font-size: 2.5rem;
    text-align: center;
    font-family: 'Georgia', serif;
    border-bottom: 2px dashed #d4af37;
    padding-bottom: 1rem;
  }
  
  .header-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .header-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .group-title {
    margin: 0;
    color: #5d4037;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.5rem;
    font-family: 'Georgia', serif;
  }
  
  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .header-actions a {
    padding: 0.8rem 1.2rem;
    border-radius: 2px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    font-family: 'Georgia', serif;
    cursor: pointer;
    display: block;
  }
  
  .btn-tiles { background: #fff; border: 1px solid #2e7d32; color: #2e7d32; }
  .btn-tiles:hover { background: #2e7d32; color: #fff; }
  
  .btn-calendar { background: #fff; border: 1px solid #1565c0; color: #1565c0; }
  .btn-calendar:hover { background: #1565c0; color: #fff; }
  
  .btn-builder { background: #fff; border: 1px solid #6a1b9a; color: #6a1b9a; }
  .btn-builder:hover { background: #6a1b9a; color: #fff; }
  
  .btn-quiz { background: #fff; border: 1px solid #c2185b; color: #c2185b; }
  .btn-quiz:hover { background: #c2185b; color: #fff; }
  
  .btn-tracking { background: #fff; border: 1px solid #00838f; color: #00838f; }
  .btn-tracking:hover { background: #00838f; color: #fff; }

  .alert {
    padding: 1rem 1.5rem;
    border-radius: 2px;
    margin-bottom: 1.5rem;
    font-weight: 500;
    font-family: 'Georgia', serif;
  }
  
  .alert-success {
    background: #f1f8e9;
    color: #2e7d32;
    border: 1px solid #2e7d32;
  }
  
  .alert-error {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #c62828;
  }
  
  .editor-panel, .editor-placeholder {
    background: #fff;
    padding: 2.5rem;
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    border: 1px solid #e0e0e0;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
  }
  
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px dashed #d4af37;
  }
  
  .editor-header h2 {
    margin: 0;
    color: #8b0000;
    font-family: 'Georgia', serif;
  }
  
  .btn-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #d4af37;
    transition: color 0.3s ease;
  }
  
  .btn-close:hover { color: #8b0000; }
  
  .editor-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0;
  }
  
  .tab-btn {
    background: transparent;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    color: #9e9e9e;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    font-family: 'Georgia', serif;
  }
  
  .tab-btn:hover { color: #5d4037; background: #fffcf5; }
  
  .tab-btn.active {
    color: #8b0000;
    border-bottom-color: #8b0000;
    font-weight: 600;
  }
  
  .form-section {
    background: #fffcf5;
    padding: 2rem;
    border-radius: 2px;
    margin-bottom: 2rem;
    border: 1px solid #e0e0e0;
  }
  
  .form-section h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #5d4037;
    font-family: 'Georgia', serif;
    border-bottom: 1px dashed #d4af37;
    padding-bottom: 0.5rem;
    display: inline-block;
  }
  
  .form-group { margin-bottom: 1.5rem; }
  
  .form-group label {
    display: block;
    font-weight: 600;
    color: #2c1810;
    margin-bottom: 0.8rem;
    font-family: 'Georgia', serif;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #d4af37;
    border-radius: 2px;
    font-size: 1rem;
    font-family: 'Georgia', serif;
    background: #fff;
    color: #2c1810;
    box-sizing: border-box;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #8b0000;
    box-shadow: 0 0 5px rgba(139, 0, 0, 0.1);
  }
  
  .form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }
  
  .btn-primary, .btn-secondary, .btn-danger, .btn-logout, .btn-settings, .btn-simulation {
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 2px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Georgia', serif;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .btn-primary { background: #8b0000; color: #fff; border: 1px solid #8b0000; }
  .btn-primary:hover { background: #a50000; box-shadow: 2px 2px 5px rgba(0,0,0,0.2); }
  
  .btn-secondary { background: #fff; color: #5d4037; border: 1px solid #5d4037; }
  .btn-secondary:hover { background: #5d4037; color: #fff; }
  
  .btn-danger { background: #fff; color: #c62828; border: 1px solid #c62828; }
  .btn-danger:hover { background: #c62828; color: #fff; }

  .btn-logout { background: #5d4037; color: #fff; }
  .btn-logout:hover { background: #4e342e; }

  .btn-settings { background: #d4af37; color: #fff; }
  .btn-settings:hover { background: #c5a028; }

  .btn-simulation { background: #e65100; color: #fff; }
  .btn-simulation:hover { background: #ef6c00; }
  
  .story-overview {
    background: #fffcf5;
    padding: 2rem;
    border-radius: 2px;
    margin-bottom: 2rem;
    border: 2px dashed #558b2f;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }
  
  .story-overview h2 {
    margin: 0 0 1rem 0;
    color: #2e7d32;
    font-size: 2rem;
    font-family: 'Georgia', serif;
  }
  
  .chain-card {
    background: #fff;
    border-radius: 2px;
    padding: 2rem;
    border: 1px solid #81c784;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.05);
  }
  
  .chain-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #81c784;
  }
  
  .chain-header h3 {
    margin: 0;
    flex: 1;
    color: #2e7d32;
    font-size: 1.5rem;
    font-family: 'Georgia', serif;
  }
  
  .timeline-day {
    background: #fff;
    border: 1px solid #d4af37;
    padding: 1rem;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    position: relative;
  }
  
  .timeline-day:hover {
    transform: translateY(-2px);
    box-shadow: 3px 3px 0 rgba(212, 175, 55, 0.2);
  }
  
  .timeline-day.has-content-b {
    background: #f1f8e9;
    border-color: #558b2f;
  }
  
  .timeline-number {
    font-weight: 700;
    color: #e65100;
    font-size: 0.9rem;
    font-family: 'Georgia', serif;
  }
  
  .timeline-title {
    color: #2c1810;
    font-size: 1rem;
    font-style: italic;
  }
  


  /* Template Section Styles */
  .templates-section {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #fff8e1;
    border: 1px dashed #d4af37;
    border-radius: 4px;
  }
  
  .templates-section summary {
    cursor: pointer;
    color: #d4af37;
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .templates-section summary::-webkit-details-marker {
    display: none;
  }
  
  .templates-section summary::before {
    content: '▶';
    font-size: 0.8rem;
    transition: transform 0.2s;
  }
  
  .templates-section[open] summary::before {
    transform: rotate(90deg);
  }

  .summary-hint {
    font-size: 0.8rem;
    color: #9e9e9e;
    font-weight: normal;
    margin-left: auto;
  }
  
  .templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .template-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .template-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #d4af37;
  }
  
  .template-category {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #9e9e9e;
    font-weight: 600;
  }
  
  .template-title {
    font-weight: 700;
    color: #2c1810;
  }
  
  .template-desc {
    font-size: 0.85rem;
    color: #5d4037;
    font-style: italic;
  }

  /* Admin Layout */
  .admin-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  .admin-sidebar {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    position: sticky;
    top: 2rem;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  
  .days-grid-sidebar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
  
  .day-tile-sidebar {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    font-family: 'Georgia', serif;
    font-weight: bold;
    font-size: 1.1rem;
    color: #5d4037;
  }
  
  .day-tile-sidebar:hover {
    background: #fff3e0;
    border-color: #ffb74d;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .day-tile-sidebar.active {
    background: #2c1810;
    color: #d4af37;
    border-color: #d4af37;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
  }
  
  .day-tile-sidebar.answered::after {
    content: '✓';
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 0.8rem;
    color: #2e7d32;
    font-weight: 900;
  }
  
  .admin-content {
    min-width: 0; /* Prevent overflow */
  }
  
  .sidebar-header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .sidebar-header h3 {
    margin: 0;
    color: #2c1810;
    font-size: 1.2rem;
  }
  
  .sidebar-legend {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: #757575;
    display: flex;
    gap: 1rem;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  
  .dot.active { background: #2c1810; }
  .dot.done { background: #2e7d32; }
</style>
