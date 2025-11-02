<script lang="ts">
  import { enhance } from '$app/forms';
  
  export let data;
  export let form;
  
  let editingDay: any = null;
  let showPreview = false;
  let showPrismaInfo = false;
  
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

DATUM FÜR REAL: [Wann machen wir das?]`
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
    <div class="header-actions">
      <button on:click={openPrismaStudio} class="btn-prisma">
        🗄️ Prisma Studio
      </button>
      <a href="/" class="btn-secondary">← Zum Kalender</a>
      <a href="/admin/logout" class="btn-logout">🔓 Logout</a>
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
        
        {#if showPreview}
          <div class="preview-panel">
            <h3>Vorschau</h3>
            <div class="preview-content">
              <h2>{editingDay.title}</h2>
              {#if editingDay.author}
                <p class="preview-author">Von: {editingDay.author}</p>
              {/if}
              
              {#if editingDay.contentType === 'TEXT'}
                <div class="preview-text">
                  {#each editingDay.content.split('\n') as line}
                    {#if line.trim()}
                      <p>{line}</p>
                    {/if}
                  {/each}
                </div>
              {:else if editingDay.contentType === 'IMAGE_URL'}
                <img src={editingDay.content} alt={editingDay.title} style="max-width: 100%; border-radius: 8px;" />
              {:else if editingDay.contentType === 'VIDEO_EMBED' || editingDay.contentType === 'PLAYLIST' || editingDay.contentType === 'MAP'}
                <iframe 
                  src={editingDay.content}
                  title={editingDay.title}
                  style="width: 100%; min-height: 400px; border-radius: 8px; border: none;"
                ></iframe>
              {:else if editingDay.contentType === 'QUIZ_JSON'}
                <pre class="preview-json">{editingDay.content}</pre>
              {/if}
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
    padding: 1.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .admin-header h1 {
    margin: 0;
    color: #2c3e50;
    font-size: 2rem;
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
    color: #2c3e50;
  }
  
  .preview-content {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
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
