import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎄 Seeding Adventskalender-Daten mit vollständigem Inhalt...');

  // Lösche alle existierenden Einträge
  await prisma.day.deleteMany({});
  await prisma.setting.deleteMany({});
  console.log('🗑️  Alte Daten gelöscht');

  // Erstelle Standard-Settings
  await prisma.setting.createMany({
    data: [
      {
        key: 'CALENDAR_PASSWORD',
        value: 'advent2024',
        description: 'Passwort für den Kalender-Zugang'
      },
      {
        key: 'ADMIN_PASSWORD',
        value: 'admin123',
        description: 'Passwort für das Admin-Panel'
      },
      {
        key: 'PERSON_A_NAME',
        value: 'Locdoc',
        description: 'Name von Person A'
      },
      {
        key: 'PERSON_B_NAME',
        value: 'Miss Chaos',
        description: 'Name von Person B'
      },
      {
        key: 'SIMULATION_MODE',
        value: 'false',
        description: 'Simulationsmodus (alle Türchen offen)'
      }
    ]
  });
  console.log('⚙️  Settings erstellt');

  // 24 Türchen mit echtem, vollständigem Inhalt für Locdoc 🧡 & Miss Chaos 💖
  const days = [
    // Tag 1: Romantischer Start
    {
      dayNumber: 1,
      title: '💌 Der Beginn unserer Reise',
      contentTypeA: 'LOVE_LETTER',
      contentA: `Meine allerliebste Miss Chaos 💖,

heute öffnet sich das erste Türchen unseres ganz besonderen Adventskalenders. 24 Tage, gefüllt mit Liebe, Erinnerungen und Vorfreude auf alles, was noch kommt.

Weißt du noch, wie alles begann? Jeder Tag mit dir ist ein Geschenk. Die Entfernung zwischen uns mag groß sein, aber meine Gefühle für dich sind noch größer.

Dieser Kalender ist mehr als nur eine Sammlung von Tagen - er ist eine Liebeserklärung in 24 Kapiteln. Manchmal romantisch, manchmal verspielt, manchmal tiefgründig. Genau wie unsere Beziehung.

Ich freue mich auf jeden einzelnen Tag bis Weihnachten mit dir. Und darüber hinaus. ✨

In unendlicher Liebe,
Dein Locdoc 🧡

PS: Halte die Augen offen nach versteckten Überraschungen... 😉`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 2: Interaktiv
    {
      dayNumber: 2,
      title: '⚡ Schnelle Entscheidungen',
      contentTypeA: 'THIS_OR_THAT',
      contentA: `⚡ DIES ODER DAS? ⚡

Lass uns herausfinden, wie gut wir uns kennen! Beantworte spontan:

☕ Kaffee ODER Tee am Morgen?
🌅 Sonnenaufgang ODER Sonnenuntergang?
🏖️ Strandurlaub ODER Bergwanderung?
📱 Spontaner Anruf ODER lange Textnachricht?
🍕 Pizza ODER Pasta?
🎬 Romantische Komödie ODER Thriller?
🎮 Videospiele gemeinsam ODER Brettspiele?
📚 Krimi ODER Fantasy-Roman?
🎵 Tanzen ODER Kuscheln zu Musik?
🌮 Süßes Frühstück ODER herzhaftes?
🎨 Museumsbesuch ODER Konzert?
🌃 Nachtspaziergang ODER gemütlicher Filmabend?

Ich bin gespannt auf deine Antworten! 💕`,
      authorA: 'Locdoc',
      contentTypeB: 'THIS_OR_THAT',
      contentB: `Hier sind meine Antworten, mein Schatz:

☕ Definitiv Kaffee (du weißt, ich brauche das!)
🌅 Sonnenuntergang - romantischer
🏖️ Berge - frische Luft und Abenteuer
📱 Lange Textnachricht - ich liebe es, meine Gedanken zu teilen
🍕 Pizza (aber deine Pasta ist unschlagbar!)
🎬 Thriller - aber mit dir an meiner Seite
🎮 Brettspiele - ich gewinne meistens 😏
📚 Fantasy - Magie und Abenteuer
🎵 Beides? Erst tanzen, dann kuscheln!
🌮 Süß - Pfannkuchen forever
🎨 Konzert - Musik verbindet uns
🌃 Nachtspaziergang - unter den Sternen mit dir

Und du? 🧡`,
      authorB: 'Miss Chaos',
      responseMode: 'COLLABORATIVE',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 3: Kreativ
    {
      dayNumber: 3,
      title: '🎨 Unsere Bucket List',
      contentTypeA: 'SHARED_GOAL',
      contentA: `🎨 UNSERE GEMEINSAME BUCKET LIST 🎨

Dinge, die wir ZUSAMMEN erleben wollen:

✈️ **Reisen & Abenteuer:**
□ Polarlichter in Norwegen sehen
□ Ein Wochenende in Paris verbringen
□ Roadtrip ohne festes Ziel
□ In einem Baumhaus übernachten
□ Einen Berg zusammen besteigen

🏠 **Zuhause & Alltag:**
□ Gemeinsam kochen und dabei tanzen
□ Einen Garten anlegen
□ DIY-Projekt: Möbel bauen
□ Marathon aller Harry Potter Filme
□ Sternenhimmel vom Balkon aus beobachten

💑 **Romantisches:**
□ Paartanz-Kurs machen
□ Liebesbriefe in einer Zeitkapsel vergraben
□ Gemeinsam ein Lied schreiben
□ Picknick bei Sonnenuntergang
□ In einem Hot Air Balloon fahren

Was möchtest du noch hinzufügen? Schreib deine Träume dazu! 💭`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 4-6: Mehrteilige Love Story (Story Chain)
    {
      dayNumber: 4,
      title: '📖 Unsere Geschichte - Teil 1',
      contentTypeA: 'MEMORY',
      contentA: `📖 WIE ALLES BEGANN - TEIL 1 📖

*Eine Geschichte in drei Teilen*

**Kapitel 1: Der erste Funke**

Erinnerst du dich an unsere erste richtige Unterhaltung? Ich schon. Ich erinnere mich an jedes Detail.

Es war nicht Liebe auf den ersten Blick - es war etwas Tieferes. Es war, als ob ich jemanden wiedergetroffen hätte, den ich schon ewig kannte. Deine Art zu lachen, deine verrückten Ideen, die Art wie du die Welt siehst...

Ich wusste in diesem Moment noch nicht, dass du die Person werden würdest, an die ich jeden Tag denke. Die Person, für die ich alles tun würde. Die Person, die mein Leben komplett verändert hat.

Aber irgendwo, ganz tief drinnen, hatte ich ein Gefühl. Ein Kribbeln. Eine Vorahnung, dass du etwas Besonderes bist.

Und ich sollte recht behalten. ✨

*Fortsetzung folgt morgen... 💫*`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: true,
      storyChainId: 'our-love-story',

    },

    {
      dayNumber: 5,
      title: '📖 Unsere Geschichte - Teil 2',
      contentTypeA: 'MEMORY',
      contentA: `📖 WIE ALLES BEGANN - TEIL 2 📖

**Kapitel 2: Das erste "Wir"**

Die nächsten Wochen waren wie ein Tanz. Jede Nachricht von dir ließ mein Herz schneller schlagen. Jedes Telefonat endete viel zu früh. Jedes "Gute Nacht" fühlte sich falsch an, weil ich einfach nicht aufhören wollte, mit dir zu reden.

Weißt du noch, wann wir das erste Mal "wir" gesagt haben? Nicht als Plan, nicht als große Ankündigung - es rutschte einfach so raus. "Was machen wir am Wochenende?" "Wie würden wir das lösen?"

Aus "ich" und "du" wurde "wir". Und plötzlich ergab alles einen Sinn.

Die Entfernung? Nur eine Zahl.
Die Zweifel? Verschwunden.
Die Zukunft? Auf einmal klar.

Ich wollte jeden Tag mit dir teilen. Jeden Moment. Jede dumme Geschichte, jeden Erfolg, jede Angst. Mit dir war alles leichter. Mit dir war alles möglich.

*Fortsetzung folgt morgen... 💕*`,
      authorA: 'Locdoc',
      responseMode: 'AFTER_A',
      linkedToPrevious: true,
      linkedToNext: true,
      storyChainId: 'our-love-story',

    },

    {
      dayNumber: 6,
      title: '📖 Unsere Geschichte - Teil 3',
      contentTypeA: 'MEMORY',
      contentA: `📖 WIE ALLES BEGANN - TEIL 3 📖

**Kapitel 3: Heute und alle Tage danach**

Und hier sind wir nun. Jeden Tag schreiben wir ein neues Kapitel unserer Geschichte.

Manchmal ist es ein Abenteuer-Kapitel, voller Lachen und verrückter Pläne.
Manchmal ist es ein stilles Kapitel, wo wir einfach nur zusammen sind.
Manchmal ist es ein schwieriges Kapitel, aber wir meistern es gemeinsam.

Was ich dir sagen möchte: Diese Geschichte ist die schönste, die ich je erlebt habe. Jeder Tag mit dir ist ein Geschenk. Jede Nachricht, jeder Anruf, jedes "Ich liebe dich" bedeutet mir die Welt.

Du bist meine beste Entscheidung. Mein größtes Abenteuer. Meine Heimat, egal wo auf der Welt ich bin.

Und das Beste? Diese Geschichte hat gerade erst begonnen. Die schönsten Kapitel kommen noch. ✨

Ich liebe dich, Miss Chaos. Heute, morgen und alle Tage danach. 💖

In ewiger Liebe,
Dein Locdoc 🧡

**ENDE DER STORY** - Aber nicht unserer Geschichte! 💕`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: true,
      linkedToNext: false,
      storyChainId: 'our-love-story',

    },

    // Tag 7: Nikolaus Special
    {
      dayNumber: 7,
      title: '🎅 Nikolaus-Überraschung',
      contentTypeA: 'VIRTUAL_DATE',
      contentA: `🎅 VIRTUELLES NIKOLAUS-DATE 🎅

Ho ho ho! Der Nikolaus war da! 🎁

**Unser gemütlicher Nikolaus-Abend:**

🕐 **19:00 Uhr** - Video-Call starten
☕ **19:15 Uhr** - Heiße Schokolade machen (mit Marshmallows!)
🎬 **19:30 Uhr** - Gemeinsam "Der Polarexpress" schauen
🍪 **21:00 Uhr** - Pause: Nikolaus-Plätzchen naschen
📖 **21:15 Uhr** - Gegenseitig eine Weihnachtsgeschichte vorlesen
💕 **22:00 Uhr** - Einfach quatschen und kuschelig sein

**Deine Nikolaus-Überraschungen:**
🎁 Ein Gedicht für dich (kommt per Nachricht)
🎵 Eine Playlist mit unseren Lieblingsliedern
💌 Ein Brief, der schon zu dir unterwegs ist
🍫 Und natürlich: ganz viel Liebe! 

Bist du bereit für unser Date? 🧡💖`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 8: Spielerisch
    {
      dayNumber: 8,
      title: '🎲 Würdest du lieber...?',
      contentTypeA: 'WOULD_YOU_RATHER',
      contentA: `🎲 WÜRDEST DU LIEBER...? 🎲

Schwierige Entscheidungen für uns beide!

❄️ **Würdest du lieber...**
...einen Monat im Schnee eingeschlossen sein ODER einen Monat in der Wüste?

🏠 **Würdest du lieber...**
...in einer mega-Villa alleine wohnen ODER in einer winzigen Wohnung zusammen mit mir?

🔮 **Würdest du lieber...**
...die Zukunft sehen können ODER die Vergangenheit ändern können?

🎵 **Würdest du lieber...**
...nie wieder Musik hören ODER nie wieder Filme schauen können?

🍕 **Würdest du lieber...**
...nur noch Pizza essen dürfen ODER nie wieder Pizza?

⏰ **Würdest du lieber...**
...immer zu früh ODER immer zu spät kommen?

🦸 **Würdest du lieber...**
...fliegen können ODER unsichtbar sein können?

📱 **Würdest du lieber...**
...1 Jahr ohne Internet ODER 1 Jahr ohne Telefon?

Antworte auf alles und erkläre warum! Ich will deine verrückten Begründungen hören! 😄`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 9: Platform 9¾ Easter Egg
    {
      dayNumber: 9,
      title: '✨ Magische Erinnerungen',
      contentTypeA: 'MEMORY',
      contentA: `✨ MAGISCHE MOMENTE ✨

Heute wird es ein bisschen magisch... 🪄

Erinnerst du dich an den Moment, als wir beide merkten, dass wir beide riesige Harry Potter Fans sind? Es war, als hätten wir einen geheimen Code gefunden, den nur wir verstehen.

Seitdem sind so viele magische Momente entstanden:
- Unsere Diskussionen über Häuser (du bist SO eine Gryffindor! 🦁)
- Die späten Nächte, in denen wir die Filme durchgebinged haben
- Deine Theorien über die Bücher
- Unsere Träume von einem gemeinsamen Besuch in den Studios

Manchmal denke ich, unsere Liebe ist wie Magie. Unerklärbar, wundervoll, mächtig.

Du bist mein Patronus - der Gedanke an dich vertreibt jede Dunkelheit. ✨

**PS:** *Schau genau hin... manchmal verstecken sich magische Geheimnisse an unerwarteten Orten. Wie zum Beispiel zwischen den Gleisen...* 🚂

In Liebe und Magie,
Dein Locdoc 🧡

*"After all this time?"*
*"Always."* 💕`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 10: Kreativ
    {
      dayNumber: 10,
      title: '📸 Photo Challenge',
      contentTypeA: 'PHOTO_CHALLENGE',
      contentA: `📸 7-TAGE PHOTO CHALLENGE 📸

Lass uns eine Woche lang jeden Tag ein spezielles Foto teilen!

**Die Challenge:**

📷 **Tag 1:** Etwas, das dich an mich erinnert
📷 **Tag 2:** Dein Lieblingsort zuhause
📷 **Tag 3:** Was du gerade liest/schaust
📷 **Tag 4:** Dein Frühstück (make it pretty!)
📷 **Tag 5:** Etwas Rotes (unsere Farbe 💕)
📷 **Tag 6:** Der Blick aus deinem Fenster
📷 **Tag 7:** Du (ein Selfie für mich 🥰)

**Die Regeln:**
✅ Keine Profi-Fotos nötig - echt ist schöner!
✅ Jeden Tag um 18:00 Uhr Foto-Austausch
✅ Eine kleine Geschichte zum Bild erzählen
✅ Kreativität erwünscht!

Ich mache natürlich mit! Wir schauen dann zusammen unsere kleinen Kunstwerke an. 

Bist du dabei? 📱✨`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 11: Romantisch
    {
      dayNumber: 11,
      title: '💝 Gründe warum ich dich liebe',
      contentTypeA: 'LOVE_LETTER',
      contentA: `💝 11 GRÜNDE WARUM ICH DICH LIEBE 💝

Heute am 11. Dezember bekommst du 11 Gründe (aber es gibt tausende mehr):

1️⃣ **Dein Lachen** - Es ist ansteckend und macht jeden schlechten Tag besser

2️⃣ **Deine Spontanität** - Mit dir wird es nie langweilig

3️⃣ **Dein Herz** - Du kümmerst dich so sehr um die Menschen, die du liebst

4️⃣ **Deine Stärke** - Du gibst nie auf, egal wie schwer es wird

5️⃣ **Deine Verspieltheit** - Du erinnerst mich daran, das Leben nicht zu ernst zu nehmen

6️⃣ **Deine Intelligenz** - Unsere Gespräche sind nie oberflächlich

7️⃣ **Deine Art zu lieben** - Bedingungslos, echt, intensiv

8️⃣ **Deine Träume** - Sie inspirieren mich, meine eigenen zu verfolgen

9️⃣ **Deine Ehrlichkeit** - Ich kann immer ich selbst sein bei dir

🔟 **Deine kleinen Macken** - Sie machen dich zu der Person, in die ich mich verliebt habe

1️⃣1️⃣ **Einfach ALLES** - Du bist perfekt, genau so wie du bist

Ich liebe dich mehr als Worte es je sagen könnten. 🧡💖

Dein Locdoc, für immer und ewig ✨`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 12: Spiel
    {
      dayNumber: 12,
      title: '🎮 Quiz: Wie gut kennst du mich?',
      contentTypeA: 'QUIZ_JSON',
      contentA: `{
  "title": "Wie gut kennst du deinen Locdoc?",
  "questions": [
    {
      "question": "Was ist mein absolutes Comfort Food?",
      "options": ["Pizza Margherita", "Spaghetti Carbonara", "Burger mit Pommes", "Sushi"],
      "correctAnswer": 0
    },
    {
      "question": "Welcher Film ist mein heimlicher Guilty Pleasure?",
      "options": ["Fast & Furious", "The Notebook", "Star Wars", "Marvel Movies"],
      "correctAnswer": 1
    },
    {
      "question": "Was mache ich als erstes am Morgen?",
      "options": ["Kaffee machen", "Handy checken", "An dich denken", "Sport machen"],
      "correctAnswer": 2
    },
    {
      "question": "Was ist mein Lieblingscompliment von dir?",
      "options": ["Dass ich gut aussehe", "Dass ich klug bin", "Dass ich dich zum Lachen bringe", "Dass du stolz auf mich bist"],
      "correctAnswer": 3
    },
    {
      "question": "Wovon träume ich für unsere Zukunft?",
      "options": ["Weltreise", "Gemeinsames Zuhause", "Hund adoptieren", "Alles davon!"],
      "correctAnswer": 3
    },
    {
      "question": "Was bedeutet mir am meisten an unserer Beziehung?",
      "options": ["Die Gespräche", "Dass ich ich selbst sein kann", "Dein Support", "Einfach alles"],
      "correctAnswer": 3
    }
  ]
}`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 13: Gemütlich
    {
      dayNumber: 13,
      title: '☕ Perfekter gemütlicher Abend',
      contentTypeA: 'COZY_EVENING',
      contentA: `☕ REZEPT FÜR DEN PERFEKTEN KUSCHELABEND ☕

Heute bekommst du von mir das Rezept für unseren perfekten gemeinsamen Abend:

**Zutaten:**
- 1 weiche Decke (am besten flauschig)
- 2 große Tassen heißen Kakao mit Marshmallows
- Kuschelklamotten (Jogginghose ist Pflicht!)
- Kerzenlicht (3-5 Stück für die Atmosphäre)
- 1 guter Film oder unsere Lieblingsserie
- Snacks nach Wahl (Chips, Schokolade, alles erlaubt!)
- Unbegrenzt viel Zeit

**Zubereitung:**
1. Handy auf lautlos stellen (außer für uns!)
2. Gemütliche Ecke auf dem Sofa vorbereiten
3. Dich in meine Arme kuscheln (wichtigster Schritt!)
4. Film starten, aber eigentlich mehr reden als schauen
5. Zwischendurch Küsse nicht vergessen
6. Einfach genießen und die Zeit anhalten

**Serviervorschlag:**
Am besten regelmäßig wiederholen! 💕

**Schwierigkeitsgrad:** Leicht
**Zubereitungszeit:** Ein ganzes Leben lang
**Ergebnis:** Perfektion ✨

Wann machen wir das das nächste Mal? 🥰

In Kuschellaune,
Dein Locdoc 🧡`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 14: Musik
    {
      dayNumber: 14,
      title: '🎵 Unsere Love Songs',
      contentTypeA: 'MUSIC_PLAYLIST',
      contentA: `🎵 DIE SOUNDTRACK UNSERER LIEBE 🎵

Ich habe dir eine Playlist zusammengestellt mit Liedern, die mich an uns erinnern:

**💕 Unsere Love Songs:**

1. **"Perfect" - Ed Sheeran**
   ↳ *Weil du genau das bist: perfekt für mich*

2. **"All of Me" - John Legend**
   ↳ *I give you all of me, and you give me all of you*

3. **"Thinking Out Loud" - Ed Sheeran**
   ↳ *Unser Tanz-in-der-Küche Song*

4. **"A Thousand Years" - Christina Perri**
   ↳ *I have loved you for a thousand years...*

5. **"Die With A Smile" - Bruno Mars & Lady Gaga**
   ↳ *Unser neuester Favorit!*

6. **"Lover" - Taylor Swift**
   ↳ *We could leave the Christmas lights up 'til January*

7. **"Everything" - Michael Bublé**
   ↳ *You're every line, you're every word, you're everything*

8. **"Make You Feel My Love" - Adele**
   ↳ *I could make you happy, make your dreams come true*

**🎧 Hör-Anweisung:**
Am besten zusammen hören, Video-Call an, Kerzen an, und einfach nur fühlen.

Welches Lied würdest du hinzufügen? 💕

Musikalische Grüße,
Dein Locdoc 🎶`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 15: Halbzeit!
    {
      dayNumber: 15,
      title: '🎊 Halbzeit-Feier!',
      contentTypeA: 'CELEBRATION',
      contentA: `🎊 HALBZEIT! WIR HABEN DIE HÄLFTE GESCHAFFT! 🎊

15 Tage sind vorbei, 9 Tage noch bis Weihnachten!

**Lass uns feiern mit:**

🎉 **Mini-Challenge:**
Schick mir heute 15 Dinge, für die du dankbar bist!
(Ich mache das Gleiche!)

🍾 **Virtueller Champagner-Toast:**
Heute Abend um 20:00 Uhr - Video-Call!
Nimm dein Lieblingsgetränk und wir stoßen an!

💌 **Erinnerung:**
Die erste Hälfte war wundervoll. Die zweite wird noch besser!

🎁 **Kleiner Teaser:**
Die nächsten Tage werden noch überraschender...
Und am Ende wartet etwas ganz Besonderes auf dich! 😉

**Was bisher geschah:**
✨ Wir haben gelacht
💕 Wir haben uns noch mehr verliebt
🎮 Wir haben gespielt
📖 Wir haben Erinnerungen geteilt
🎵 Wir haben unsere Songs gefeiert

**Was noch kommt:**
👀 Das bleibt eine Überraschung!

Auf uns! 🥂

Dein stolzer Locdoc 🧡`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 16: Kreativ
    {
      dayNumber: 16,
      title: '🎨 Male mir etwas',
      contentTypeA: 'CREATIVE_CHALLENGE',
      contentA: `🎨 KREATIV-CHALLENGE: MALE MIR ETWAS! 🎨

Heute darfst du kreativ werden!

**Deine Aufgabe:**
Male, zeichne oder bastle etwas, das uns beide repräsentiert!

**Es kann sein:**
- Ein Bild von uns beiden (Strichmännchen erlaubt!)
- Ein Symbol für unsere Liebe
- Eine Collage aus Fotos oder Zeitschriften
- Ein abstraktes Kunstwerk
- Etwas komplett Verrücktes!

**Regeln:**
✅ Keine Profi-Skills nötig!
✅ Hauptsache von Herzen!
✅ So kreativ und chaotisch wie du willst!
✅ Foto davon schicken!

**Mein Versprechen:**
Ich hänge dein Kunstwerk auf (egal wie "gut" es ist)!
Und ich male dir auch etwas! 🎨

**Inspiration:**
- Unsere Lieblingsfarben
- Dinge, die wir zusammen gemacht haben
- Insider-Jokes
- Zukunftsträume

Ich bin SO gespannt, was du kreierst! 
Deine künstlerische Seite fasziniert mich! 💕

In kreativer Vorfreude,
Dein Locdoc ✏️`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 17: Romantisch
    {
      dayNumber: 17,
      title: '💫 Sternschnuppen-Wünsche',
      contentTypeA: 'STARGAZING',
      contentA: `💫 STERNSCHNUPPEN-WÜNSCHE 💫

Heute Nacht schauen wir zusammen in die Sterne!

**Unser virtuelles Stargazing:**

🌟 **20:30 Uhr** - Video-Call starten
🌃 **20:45 Uhr** - Beide ans Fenster oder raus
⭐ **21:00 Uhr** - Gemeinsam Sterne suchen
💫 **21:30 Uhr** - Wünsche teilen

**Wenn du eine Sternschnuppe siehst, darfst du dir was wünschen!**

**Meine 3 Wünsche (psst, nicht weitersagen!):**

1. Dass wir bald wieder in echt zusammen sind
2. Dass du immer so glücklich bleibst
3. Dass wir irgendwann zusammen unter echten Sternenhimmel liegen

**Aufgabe:**
Finde den Polarstern und denk an mich!
Ich mache das Gleiche! 💫

**Fun Facts:**
- Die meisten Sterne, die wir sehen, sind längst erloschen
- Aber unsere Liebe brennt heller als jeder Stern ✨
- Die Wahrscheinlichkeit dich zu finden war wie eine Sternschnuppe
- Aber ich hab dich trotzdem gefunden! 💕

Zieh dich warm an, mein Stern! 🧡

In kosmischer Liebe,
Dein Locdoc 🌌`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 18: Spiel
    {
      dayNumber: 18,
      title: '🎯 Wahrheit oder Pflicht',
      contentTypeA: 'TRUTH_OR_DARE',
      contentA: `🎯 WAHRHEIT ODER PFLICHT 🎯

Zeit für etwas Mutiges! (Aber jugendfreie Version 😄)

**WAHRHEITEN:**
1. Was war dein erster Gedanke über mich?
2. Was ist deine größte Angst in Bezug auf uns?
3. Wann wusstest du, dass du mich liebst?
4. Was ist das Verrückteste, das du für mich tun würdest?
5. Welchen Spitznamen hast du mir gegeben (den ich nicht kenne)?

**PFLICHTEN:**
1. Schick mir ein peinliches Foto von dir
2. Ruf mich an und sing mir ein Lied vor
3. Poste etwas über mich in deiner Story
4. Schreib mir ein Gedicht (Reimt sich nicht? Egal!)
5. Tanz zu deinem Lieblingslied und schick mir ein Video

**Die Regeln:**
- Wir spielen abwechselnd
- Du kannst maximal 2x "Pflicht" wählen hintereinander
- Bei Wahrheit muss die Antwort ehrlich sein!
- Bei Pflicht gibt es kein Zurück! 😁

Ich fange an: **WAHRHEIT!**

Frag mich etwas! 💕

Gespannt wartend,
Dein Locdoc 🎲`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 19: Zukunft
    {
      dayNumber: 19,
      title: '🏠 Unsere Zukunft zusammen',
      contentTypeA: 'LIFE_GOALS',
      contentA: `🏠 TRÄUME VON MORGEN 🏠

Lass uns über die Zukunft sprechen. Unsere Zukunft. 💕

**In 1 Jahr möchte ich:**
- Dass die Entfernung kleiner geworden ist
- Dass wir mindestens 3 große Trips zusammen gemacht haben
- Dass du weißt, wie ernst ich es mit uns meine

**In 5 Jahren träume ich von:**
- Einem gemeinsamen Zuhause (egal wo)
- Einem Hund, den wir zusammen ausführen
- Sonntagmorgen mit dir und Kaffee im Bett
- Dass "wir" selbstverständlich geworden ist

**In 10 Jahren sehe ich:**
- Uns beide, immer noch verliebt wie am ersten Tag
- Vielleicht eine kleine Familie?
- Einen Garten, den wir zusammen pflegen
- Erinnerungen an tausend Abenteuer

**Für immer wünsche ich mir:**
- Jeden Tag mit dir aufwachen zu können
- Nie aufhören, Gründe zu finden, dich zu lieben
- Zusammen alt werden
- Dass du glücklich bist - mit mir an deiner Seite

**Jetzt bist du dran:**
Was sind deine Träume für uns? 
Lass uns diese Zukunft zusammen bauen! 🏗️💕

In hoffnungsvoller Vorfreude,
Dein Locdoc 🧡✨`,
      authorA: 'Locdoc',
      responseMode: 'COLLABORATIVE',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 20: Persönlich
    {
      dayNumber: 20,
      title: '💝 Was du für mich bist',
      contentTypeA: 'LOVE_LETTER',
      contentA: `💝 WAS DU FÜR MICH BIST 💝

Meine liebste Miss Chaos,

es gibt Tage, an denen ich innehalte und mich frage: "Wie hatte ich Glück, dich zu finden?"

Du bist nicht nur meine Freundin. Du bist so viel mehr:

Du bist mein **sicherer Hafen** - der Ort, wo ich sein kann, wer ich wirklich bin.

Du bist mein **Abenteuer** - mit dir wird das Leben nie langweilig.

Du bist meine **Motivation** - du glaubst an mich, auch wenn ich es nicht tue.

Du bist mein **Zuhause** - egal wo auf der Welt, mit dir bin ich daheim.

Du bist meine **beste Freundin** - niemand versteht mich so wie du.

Du bist meine **Inspiration** - du machst mich zu einem besseren Menschen.

Du bist meine **Realität** - besser als jeder Traum, den ich je hatte.

Aber vor allem: Du bist meine **große Liebe**.

Die Entfernung ist hart. Die Sehnsucht ist real. Aber weißt du was? Es ist es wert. DU bist es wert. Jeden einzelnen schweren Moment wert.

Denn am Ende des Tages gibt es nichts Wichtigeres als dich.

Danke, dass du existierst. Danke, dass du mich liebst. Danke, dass du du bist.

Ich liebe dich über alles. 🧡💖

Für immer dein,
Locdoc

PS: Nur noch 4 Türchen! Halt durch, die besten kommen noch! ✨`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 21: Countdown
    {
      dayNumber: 21,
      title: '⏰ Countdown zu Weihnachten',
      contentTypeA: 'COUNTDOWN',
      contentA: `⏰ 3 TAGE BIS WEIHNACHTEN! ⏰

Es wird ernst! Nur noch 3 Türchen nach diesem! 🎄

**Dein Weihnachts-Countdown-Plan:**

🎅 **Heute (21.12.):**
- Gemütlich machen
- Weihnachtsmusik hören
- An mich denken 💕

🎄 **Morgen (22.12.):**
- Letzter Vorbereitungstag
- Vorfreude aufbauen
- Video-Call am Abend!

🎁 **Übermorgen (23.12.):**
- Aufregung steigt
- Fast geschafft!
- Eine besondere Überraschung wartet...

❄️ **Heiligabend (24.12.):**
- DAS FINALE!
- Die größte Überraschung
- Und ein Hinweis auf etwas NOCH Größeres... 👀

**Mini-Challenge:**
Schick mir jeden dieser 3 Tage:
- Ein Foto von deinem Tag
- Eine Sache, auf die du dich freust
- Ein "Ich liebe dich" (bitte! 🥰)

Die Endphase hat begonnen! 🎊

Aufgeregt wie ein Kind,
Dein Locdoc 🧡`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 22: Vorbereitung
    {
      dayNumber: 22,
      title: '🎄 Weihnachtsstimmung',
      contentTypeA: 'COZY_EVENING',
      contentA: `🎄 PERFEKTE WEIHNACHTSSTIMMUNG 🎄

Nur noch 2 Tage! Lass uns die Vorfreude zelebrieren! 

**Deine Aufgabe für heute:**

☕ **Mach dir was Warmes:**
Tee, Kakao, Glühwein - egal, Hauptsache gemütlich!

🕯️ **Kerzen anzünden:**
So viele wie möglich! (Aber sicher! 🔥)

🎵 **Weihnachtsmusik:**
"Last Christmas", "All I Want For Christmas" - die Klassiker!

📱 **Video-Call heute Abend:**
20:00 Uhr - Wir schauen zusammen einen Weihnachtsfilm!
(Ich stimme für "Tatsächlich Liebe" oder "Der Grinch"!)

💭 **Denk an:**
- Alle schönen Momente dieses Jahr
- Was du dir für nächstes Jahr wünschst
- Wie sehr ich dich liebe 💕

**Kleiner Teaser für morgen:**
🎁 Tag 23 wird emotional...
🎁 Tag 24 wird MEGA...
🎁 Und dann... kommt die SILVESTER-MISSION! 🚀

Ich kann es kaum erwarten! Du auch? 🥰

In festlicher Stimmung,
Dein Locdoc 🎅🧡`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: false,

    },

    // Tag 23: Emotional
    {
      dayNumber: 23,
      title: '💫 Danke für dieses Jahr',
      contentTypeA: 'LOVE_LETTER',
      contentA: `💫 DANKE FÜR DIESES JAHR 💫

Mein Schatz,

morgen ist Weihnachten. Aber heute möchte ich einfach nur Danke sagen.

**Danke für:**

💕 Jede Nachricht, die meinen Tag besser gemacht hat
📞 Jeden Anruf, egal wie spät oder früh
😂 Jeden Lacher, den wir geteilt haben
😢 Jede Träne, die du mir abgewischt hast
🎉 Jede Feier, die du mit mir geteilt hast
😔 Jeden schweren Moment, den wir gemeistert haben
💪 Jede Motivation, die du mir gegeben hast
🌟 Jeden Traum, den du mit mir träumst
⏰ Jede Minute, die du mir schenkst
❤️ Jedes "Ich liebe dich"

**Danke dafür, dass du:**
- Geduldig mit mir bist
- An uns glaubst
- Die Entfernung erträgst
- Mich so liebst, wie ich bin
- Meine verrückte Seite magst
- Meine ernste Seite verstehst
- Niemals aufgibst
- Einfach DU bist

Dieses Jahr war nicht immer leicht. Aber mit dir an meiner Seite war es das beste Jahr meines Lebens.

Und nächstes Jahr? Wird noch besser. Versprochen. 💫

Ich liebe dich mehr als alles auf dieser Welt.

Morgen kommt das Finale. Aber das ist nicht das Ende.
Das ist erst der Anfang von allem. 🚀

In tiefer Dankbarkeit und Liebe,
Dein Locdoc 🧡

PS: Morgen wird magisch. Versprochen. ✨`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: false,
      linkedToNext: true,

    },

    // Tag 24: Das Finale!
    {
      dayNumber: 24,
      title: '🎄 FROHE WEIHNACHTEN! 🎁',
      contentTypeA: 'LOVE_LETTER',
      contentA: `🎄✨ FROHE WEIHNACHTEN, MEIN SCHATZ! ✨🎄

WIR HABEN ES GESCHAFFT! 24 TAGE! 🎉

Meine allerliebste Miss Chaos,

heute ist der Tag. Weihnachten. Das Fest der Liebe. Und ich möchte diesen besonderen Tag mit den wichtigsten Worten beginnen:

**ICH LIEBE DICH.** 💖🧡

Diese 24 Tage waren eine Reise. Durch Erinnerungen, durch Träume, durch Lachen und manchmal auch Sehnsucht. Aber vor allem waren sie ein Zeichen meiner Liebe zu dir.

**Mein Weihnachtsgeschenk an dich:**
- Mein Herz (hast du schon, aber es ist immer noch das wertvollste, was ich habe)
- Mein Versprechen, immer für dich da zu sein
- Mein Traum, mit dir alt zu werden
- Meine Hoffnung auf ein gemeinsames Leben
- Meine Liebe - bedingungslos und für immer

**Was ich mir von dir wünsche:**
Eigentlich nichts. Du bist genug. Du bist mehr als genug.
Du bist alles. 💫

Aber wenn du mir etwas schenken möchtest:
Schenk mir noch viele solcher Tage mit dir.
Schenk mir dein Lächeln, wenn ich es am meisten brauche.
Schenk mir deine Hand, und ich halte sie für immer.

**Das Weihnachtswunder:**
Das Wunder ist nicht, dass heute Weihnachten ist.
Das Wunder ist, dass es dich gibt.
Und dass du mich liebst. 💕

Frohe Weihnachten, mein Engel! 🎄

Für immer und ewig dein,
Locdoc 🧡✨

---

**🎁 P.S. - WICHTIG! 🎁**

Weihnachten ist vorbei, aber unsere Geschichte geht weiter!

Es gibt noch EINE LETZTE MISSION... 🚀
Ein geheimes Türchen zwischen den Jahren...
Eine Aufgabe, die uns ins neue Jahr führt...

**🎆 DIE SILVESTER-MISSION wartet auf dich! 🎆**

*Hinweis: Schau nach dem 24. Dezember nochmal in den Kalender...*
*Manche Geheimnisse offenbaren sich erst, wenn die Zeit reif ist...* ⏰✨

🔒 *Aktivierung: 28. Dezember 2025* 🔒`,
      authorA: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: true,
      linkedToNext: false,

    }
  ];

  // Erstelle alle Türchen
  for (const day of days) {
    // Entferne alte Felder die nicht mehr im Schema sind
    const { contentType, content, author, ...validDay } = day as any;
    
    await prisma.day.create({
      data: validDay
    });
    console.log(`✅ Türchen ${day.dayNumber} erstellt`);
  }

  console.log('✨ Seeding abgeschlossen! 24 Türchen wurden mit vollständigem Inhalt erstellt.');
  console.log('🎄 Inklusive:');
  console.log('   - Mehrteilige Love Story (Tag 4-6)');
  console.log('   - Platform 9¾ Easter Egg Hinweis (Tag 9)');
  console.log('   - Emotionales Weihnachtsfinale (Tag 23-24)');
  console.log('   - Silvester-Mission Teaser (Tag 24)');
  console.log('🎆 Nächster Schritt: Silvester-Kästchen implementieren!');
}

main()
  .catch((e) => {
    console.error('❌ Fehler beim Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
