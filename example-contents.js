// Beispiel-Inhalte für verschiedene Content-Typen
// Diese können direkt im Admin-Panel verwendet werden!

const exampleContents = {
  
  // TAG 1: Romantischer Start mit Liebesbrief
  day1: {
    contentTypeA: "LOVE_LETTER",
    contentA: `Meine liebste Miss Chaos,

Willkommen zu unserem besonderen Adventskalender! 🎄

Jeden Tag im Dezember wirst du hier etwas Besonderes finden - manchmal eine Erinnerung, manchmal eine Überraschung, manchmal eine kleine Herausforderung für uns beide.

Diese 24 Türchen sind mein Geschenk an dich, an uns, an unsere Liebe trotz der Distanz.

Lass uns zusammen durch diesen Advent gehen!

In Liebe,
Dein Locdoc 🧡`,
    responseMode: "OPEN",
    taskForB: "Schreib mir, was du dir von diesem Adventskalender erhoffst! 💕"
  },

  // TAG 2: Interaktive Wahl
  day2: {
    contentTypeA: "INTERACTIVE_CHOICE",
    contentA: `🎬 Was schauen wir heute Abend zusammen?

Wähle eine Option und wir machen einen virtuellen Film-Abend daraus!

Option: 🎅 Ein klassischer Weihnachtsfilm
Option: 🍿 Unsere Lieblingsserie weiterschauen
Option: 🎭 Etwas völlig Neues entdecken
Option: 📺 Lass mich überraschen!

Schreib mir deine Wahl in die Antwort! 💕`,
    responseMode: "OPEN",
    taskForB: "Wähle eine Option und sag mir warum!"
  },

  // TAG 3: Gemeinsame Erinnerung
  day3: {
    contentTypeA: "MEMORY",
    contentA: `💭 Erinnerst du dich noch?

Unser erstes Video-Date... Ich war so aufgeregt! 

Du hattest diese süße Art zu lachen, die mich sofort verzaubert hat. Und als die Verbindung ständig abgebrochen ist, haben wir einfach weiter gelacht statt uns zu ärgern.

Das war der Moment, in dem ich wusste: Mit dir kann ich alles schaffen, sogar diese Distanz.

Was war dein erster Gedanke über uns?`,
    responseMode: "OPEN",
    taskForB: "Erzähl mir von deiner Sicht auf unser erstes Date! 💖"
  },

  // TAG 4: Foto-Challenge
  day4: {
    contentTypeA: "PHOTO_CHALLENGE",
    contentA: `📸 Foto-Challenge des Tages!

Mach heute ein Foto von etwas, das dich an mich erinnert!

Das kann sein:
- Ein Gegenstand
- Ein Ort
- Eine Farbe
- Ein Gefühl
- Irgendetwas, das "Das ist so Locdoc!" ausdrückt

Schick mir das Foto und beschreib, warum du es ausgewählt hast! 🧡`,
    responseMode: "OPEN",
    taskForB: "Dein Foto + die Geschichte dahinter 💕"
  },

  // TAG 5: Rätsel
  day5: {
    contentTypeA: "RIDDLE",
    contentA: `🤔 Rätsel des Tages

Ich bin unsichtbar, aber immer da.
Ich werde stärker, je mehr Zeit vergeht.
Ich überwinde jede Distanz.
Ich verbinde zwei Herzen, egal wo sie sind.

Was bin ich?

(Schreib mir deine Antwort! 💝)`,
    responseMode: "OPEN",
    taskForB: "Rate das Rätsel!"
  },

  // TAG 6-8: Story-Chain Start
  day6: {
    contentTypeA: "TEXT",
    contentA: `📖 Unsere gemeinsame Geschichte - Teil 1/3

Heute starten wir eine mehrtägige Geschichte, die wir ZUSAMMEN schreiben!

Ich beginne:

"Es war einmal in einem kleinen Café in [Stadt], wo zwei Seelen sich das erste Mal virtuell begegnet sind. Der Kaffee dampfte, das WLAN funktionierte ausnahmsweise, und plötzlich..."`,
    responseMode: "COLLABORATIVE",
    linkedToNext: true,
    storyChainId: "love-story-1",
    taskForB: "Schreib die Geschichte weiter! Was passiert dann? 💕"
  },

  day7: {
    contentTypeA: "TEXT",
    contentA: `📖 Unsere gemeinsame Geschichte - Teil 2/3

Die Geschichte geht weiter! Erinnere dich, was gestern passiert ist...

[Hier steht später der kombinierte Text von Tag 6]

Meine Fortsetzung:

"...und während die Sterne draußen funkelten, merkten sie, dass die Kilometer zwischen ihnen nichts bedeuteten, denn..."`,
    responseMode: "COLLABORATIVE",
    linkedToPrevious: true,
    linkedToNext: true,
    storyChainId: "love-story-1",
    taskForB: "Fortsetzung! Was passiert als nächstes?"
  },

  day8: {
    contentTypeA: "TEXT",
    contentA: `📖 Unsere gemeinsame Geschichte - Teil 3/3 (Finale!)

Das große Finale unserer Geschichte!

[Kombination von Tag 6 + 7]

Mein Ende:

"...und so beschlossen sie, dass ihre Liebe stärker war als jede Distanz. Sie wussten: Eines Tages würde..."`,
    responseMode: "COLLABORATIVE",
    linkedToPrevious: true,
    storyChainId: "love-story-1",
    taskForB: "Schreib das Ende unserer Geschichte! 💖"
  },

  // TAG 9: Rezept
  day9: {
    contentTypeA: "RECIPE",
    contentA: `🍳 Locdoc's Spezial-Frühstück

Heute kochen wir zusammen - jeder für sich, aber gleichzeitig!

ZUTATEN:
- 2 Eier
- 100g Champignons
- 1 Tomate
- Käse nach Wahl
- Gewürze: Salz, Pfeffer, Paprika
- 2 Scheiben Brot

ZUBEREITUNG:
1. Champignons in Scheiben schneiden und anbraten
2. Tomaten würfeln und dazugeben
3. Eier aufschlagen und als Rührei dazugeben
4. Mit Gewürzen abschmecken
5. Käse drüberstreuen
6. Auf getoastetem Brot servieren

📱 Lass uns gleichzeitig kochen und dabei telefonieren! 🧡`,
    responseMode: "OPEN",
    taskForB: "Wie hat's geschmeckt? Fotos erwünscht! 😋"
  },

  // TAG 10: Bucket List
  day10: {
    contentTypeA: "BUCKET_LIST",
    contentA: `🎯 Bucket List Item #1

ZUSAMMEN NORDLICHTER SEHEN 🌌

Warum: Weil du mal gesagt hast, dass das dein größter Traum ist. Und ich möchte dabei sein, wenn deine Augen leuchten wie diese Lichter.

Wo: Nordnorwegen, Island oder Finnland
Wann: Idealerweise im Winter, wenn die Nächte lang sind
Wie lange: Mindestens 5 Tage, um gute Chancen zu haben

Was wir noch machen:
- In einer Glas-Iglu schlafen
- Mit Huskys Schlitten fahren
- In einer heißen Quelle entspannen

Das ist mein Versprechen an dich: Wir werden das machen! 💚`,
    responseMode: "OPEN",
    taskForB: "Füge etwas zu unserem Plan hinzu! Was willst DU dort noch machen?"
  },

  // TAG 11: Umfrage
  day11: {
    contentTypeA: "POLL",
    contentA: `📊 Mini-Umfrage: Unser Weihnachten

Hilf mir, unser gemeinsames Weihnachten zu planen!

1️⃣ Weihnachtsessen:
☐ Traditionell (Gans/Ente)
☐ International (Pizza/Sushi)
☐ Gemütlich (Fondue/Raclette)
☐ Überraschung

2️⃣ Geschenke:
☐ Selbstgemacht
☐ Gekauft mit Bedeutung
☐ Erlebnisse statt Dinge
☐ Mix aus allem

3️⃣ Stimmung:
☐ Klassisch mit Weihnachtsmusik
☐ Modern und entspannt
☐ Verrückt und lustig
☐ Romantisch zu zweit

Kreuz an und schreib mir deine Gedanken! 🎄`,
    responseMode: "OPEN",
    taskForB: "Beantworte die Umfrage! 💕"
  },

  // TAG 12: Dankbarkeit
  day12: {
    contentTypeA: "GRATITUDE",
    contentA: `🙏 Wofür ich heute dankbar bin

Meine liebste Miss Chaos,

heute möchte ich dir einfach danken:

💛 Für deine Geduld, wenn ich mal wieder vergessen habe, rechtzeitig zu antworten
💛 Für dein Lachen, das durch das Telefon heller strahlt als die Sonne
💛 Für deine Unterstützung, auch wenn du selbst gerade kämpfst
💛 Für deine Liebe, die jeden Kilometer zwischen uns bedeutungslos macht
💛 Für dich, einfach für dein Dasein in meinem Leben

Du bist mein größtes Geschenk. Jeden Tag. 🧡`,
    responseMode: "OPEN",
    taskForB: "Wofür bist DU dankbar? Lass es mich wissen! 💖"
  },

  // TAG 13: Countdown
  day13: {
    contentTypeA: "COUNTDOWN",
    contentA: `⏰ COUNTDOWN

Noch 12 Tage bis Weihnachten! 🎄
Noch 47 Tage bis zu unserem Wiedersehen! 💕

Aber wer zählt schon?
(Okay, ich... jeden Tag... mehrmals... 😅)

Jeder Tag bringt uns näher zusammen!

Fun Fact: Das sind noch 1.128 Stunden oder 67.680 Minuten oder 4.060.800 Sekunden!

Aber jede einzelne davon ist es wert! 🧡`,
    responseMode: "OPEN",
    taskForB: "Worauf freust du dich am meisten? 💝"
  },

  // TAG 14: Song des Tages
  day14: {
    contentTypeA: "SPOTIFY_SONG",
    contentA: `🎵 Song des Tages

"Can't Help Falling in Love" - Elvis Presley

Warum: Weil diese Zeilen einfach ALLES sagen:

"Wise men say, only fools rush in
But I can't help falling in love with you"

Das war ich: Ein Narr, der sich Hals über Kopf verliebt hat. Und ich bereue keine Sekunde davon.

🎧 Hör dir den Song an und denk an mich!
📱 Dann schick mir DEINEN Song des Tages!

Spotify: spotify:track:44AyOl4qVkzS48vBsbNXaC 🧡`,
    responseMode: "OPEN",
    taskForB: "Welcher Song erinnert DICH an uns? 🎶"
  },

  // TAG 15: Gemeinsames Ziel
  day15: {
    contentTypeA: "SHARED_GOAL",
    contentA: `🎯 Unser gemeinsames Ziel für 2025

ZUSAMMENZIEHEN 🏠

Bis Ende 2025 wollen wir:
1. Eine gemeinsame Wohnung finden
2. Beide unsere Jobs so organisieren, dass es funktioniert
3. Den Umzug planen und durchführen
4. Unser erstes GEMEINSAMES Weihnachten in UNSEREM Zuhause feiern

Erste Schritte:
✅ Über Städte/Regionen sprechen
☐ Budget festlegen
☐ Job-Möglichkeiten recherchieren
☐ Wohnungssuche starten (ab Sommer)
☐ ...

Lass uns das zusammen planen! 💪💕`,
    responseMode: "COLLABORATIVE",
    taskForB: "Füge deine Ideen und Schritte hinzu!"
  },

  // TAG 16-17: Traumboard Story-Chain
  day16: {
    contentTypeA: "DREAM_BOARD",
    contentA: `🌟 Unser Traumboard - Teil 1: Das Zuhause

Lass uns zusammen träumen!

UNSER ZUKÜNFTIGES ZUHAUSE:
- 2-3 Zimmer Wohnung oder kleines Haus
- Mit Balkon oder Garten für Sommerabende
- Gemütliche Küche, wo wir zusammen kochen können
- Arbeitsecken für uns beide
- Ein Zimmer nur für Hobbys und Kreatives
- Nähe zur Natur für Spaziergänge

Meine Wünsche:
🧡 Eine große, gemütliche Couch
🧡 Viel Licht und Pflanzen
🧡 Eine Wand für unsere gemeinsamen Fotos

Was sind DEINE Träume für unser Zuhause?`,
    responseMode: "COLLABORATIVE",
    linkedToNext: true,
    storyChainId: "dream-board",
    taskForB: "Beschreib deine Traumwohnung! 🏡"
  },

  day17: {
    contentTypeA: "DREAM_BOARD",
    contentA: `🌟 Unser Traumboard - Teil 2: Die Zukunft

In 5 Jahren sehe ich uns:

💼 Beruflich:
- Beide zufrieden in unseren Jobs
- Vielleicht sogar ein gemeinsames Projekt?

🐕 Familie:
- Mindestens einen Hund (einen großen, kuscheligen!)
- Vielleicht Besuch von Familie und Freunden
- Ein Gästezimmer für Übernachtungen

🌍 Reisen:
- Mindestens 2 große Reisen pro Jahr
- Wochenendausflüge in die Natur
- Unsere Bucket List abarbeiten

💕 Uns:
- Noch verliebter als heute
- Mit tausend gemeinsamen Erinnerungen
- Jeden Abend zusammen einschlafen

Was ist deine Vision?`,
    responseMode: "COLLABORATIVE",
    linkedToPrevious: true,
    storyChainId: "dream-board",
    taskForB: "Male unsere Zukunft in Worten! 🎨"
  },

  // TAG 18: Zeichnung/ASCII Art
  day18: {
    contentTypeA: "DRAWING",
    contentA: `🎨 Mein Kunstwerk für dich

    ⭐
   ⭐⭐⭐
  ⭐⭐⭐⭐⭐
 ⭐⭐⭐⭐⭐⭐⭐
    |  |
    
    🧡 + 💖
    
   ┌─────────┐
   │ I ❤️ U │
   └─────────┘
   
      🎄
     🎄🎄
    🎄🎄🎄
   🎄🎄🎄🎄
      | |

Okay, ich gebe zu, ich bin kein Picasso... 
Aber es kommt von Herzen! 😅🧡

Versuch doch auch mal, mir etwas zu zeichnen!`,
    responseMode: "OPEN",
    taskForB: "Zeichne mir etwas! Kann ASCII-Art, Emoji-Art oder eine Beschreibung sein! 🎨"
  },

  // TAG 19: Zeitkapsel
  day19: {
    contentTypeA: "TIME_CAPSULE",
    contentA: `⏳ Zeitkapsel - Öffne am 19. Dezember 2025

Liebes zukünftiges Ich,
liebes zukünftiges Wir,

wenn du das liest, ist ein Jahr vergangen. 

Heute, am 19. Dezember 2024, sind wir noch getrennt durch viele Kilometer. Aber wir träumen davon, nächstes Jahr zusammen zu sein.

Was ich mir für uns wünsche:
- Dass wir zusammen aufwachen können
- Dass die Distanz nur noch eine Erinnerung ist
- Dass wir diesen Adventskalender nächstes Jahr zusammen öffnen
- Dass wir noch glücklicher sind

Meine Fragen an euch:
1. Lebt ihr zusammen?
2. Habt ihr euren Traum verwirklicht?
3. Seid ihr glücklich?
4. War es die Mühe wert?

Ich bin mir sicher: JA! ✨

Bewahrt diese Nachricht auf und lest sie nächstes Jahr wieder!`,
    responseMode: "OPEN",
    taskForB: "Schreib deine eigene Zeitkapsel-Nachricht an uns in einem Jahr! ⏳"
  },

  // TAG 20-24: Weitere kreative Ideen können hier hinzugefügt werden
  
};

// Export für Verwendung im Seed-Script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = exampleContents;
}
