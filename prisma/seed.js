// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient();
async function main() {
  console.log("\u{1F384} Seeding Adventskalender-Daten mit vollst\xE4ndigem Inhalt...");
  await prisma.day.deleteMany({});
  await prisma.setting.deleteMany({});
  console.log("\u{1F5D1}\uFE0F  Alte Daten gel\xF6scht");
  await prisma.setting.createMany({
    data: [
      {
        key: "CALENDAR_PASSWORD",
        value: "advent2024",
        description: "Passwort f\xFCr den Kalender-Zugang"
      },
      {
        key: "ADMIN_PASSWORD",
        value: "admin123",
        description: "Passwort f\xFCr das Admin-Panel"
      },
      {
        key: "PERSON_A_NAME",
        value: "Locdoc",
        description: "Name von Person A"
      },
      {
        key: "PERSON_B_NAME",
        value: "Miss Chaos",
        description: "Name von Person B"
      },
      {
        key: "SIMULATION_MODE",
        value: "false",
        description: "Simulationsmodus (alle T\xFCrchen offen)"
      }
    ]
  });
  console.log("\u2699\uFE0F  Settings erstellt");
  const days = [
    // Tag 1: Romantischer Start
    {
      dayNumber: 1,
      title: "\u{1F48C} Der Beginn unserer Reise",
      contentTypeA: "LOVE_LETTER",
      contentA: `Meine allerliebste Miss Chaos \u{1F496},

heute \xF6ffnet sich das erste T\xFCrchen unseres ganz besonderen Adventskalenders. 24 Tage, gef\xFCllt mit Liebe, Erinnerungen und Vorfreude auf alles, was noch kommt.

Wei\xDFt du noch, wie alles begann? Jeder Tag mit dir ist ein Geschenk. Die Entfernung zwischen uns mag gro\xDF sein, aber meine Gef\xFChle f\xFCr dich sind noch gr\xF6\xDFer.

Dieser Kalender ist mehr als nur eine Sammlung von Tagen - er ist eine Liebeserkl\xE4rung in 24 Kapiteln. Manchmal romantisch, manchmal verspielt, manchmal tiefgr\xFCndig. Genau wie unsere Beziehung.

Ich freue mich auf jeden einzelnen Tag bis Weihnachten mit dir. Und dar\xFCber hinaus. \u2728

In unendlicher Liebe,
Dein Locdoc \u{1F9E1}

PS: Halte die Augen offen nach versteckten \xDCberraschungen... \u{1F609}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 2: Interaktiv
    {
      dayNumber: 2,
      title: "\u26A1 Schnelle Entscheidungen",
      contentTypeA: "THIS_OR_THAT",
      contentA: `\u26A1 DIES ODER DAS? \u26A1

Lass uns herausfinden, wie gut wir uns kennen! Beantworte spontan:

\u2615 Kaffee ODER Tee am Morgen?
\u{1F305} Sonnenaufgang ODER Sonnenuntergang?
\u{1F3D6}\uFE0F Strandurlaub ODER Bergwanderung?
\u{1F4F1} Spontaner Anruf ODER lange Textnachricht?
\u{1F355} Pizza ODER Pasta?
\u{1F3AC} Romantische Kom\xF6die ODER Thriller?
\u{1F3AE} Videospiele gemeinsam ODER Brettspiele?
\u{1F4DA} Krimi ODER Fantasy-Roman?
\u{1F3B5} Tanzen ODER Kuscheln zu Musik?
\u{1F32E} S\xFC\xDFes Fr\xFChst\xFCck ODER herzhaftes?
\u{1F3A8} Museumsbesuch ODER Konzert?
\u{1F303} Nachtspaziergang ODER gem\xFCtlicher Filmabend?

Ich bin gespannt auf deine Antworten! \u{1F495}`,
      authorA: "Locdoc",
      contentTypeB: "THIS_OR_THAT",
      contentB: `Hier sind meine Antworten, mein Schatz:

\u2615 Definitiv Kaffee (du wei\xDFt, ich brauche das!)
\u{1F305} Sonnenuntergang - romantischer
\u{1F3D6}\uFE0F Berge - frische Luft und Abenteuer
\u{1F4F1} Lange Textnachricht - ich liebe es, meine Gedanken zu teilen
\u{1F355} Pizza (aber deine Pasta ist unschlagbar!)
\u{1F3AC} Thriller - aber mit dir an meiner Seite
\u{1F3AE} Brettspiele - ich gewinne meistens \u{1F60F}
\u{1F4DA} Fantasy - Magie und Abenteuer
\u{1F3B5} Beides? Erst tanzen, dann kuscheln!
\u{1F32E} S\xFC\xDF - Pfannkuchen forever
\u{1F3A8} Konzert - Musik verbindet uns
\u{1F303} Nachtspaziergang - unter den Sternen mit dir

Und du? \u{1F9E1}`,
      authorB: "Miss Chaos",
      responseMode: "COLLABORATIVE",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 3: Kreativ
    {
      dayNumber: 3,
      title: "\u{1F3A8} Unsere Bucket List",
      contentTypeA: "SHARED_GOAL",
      contentA: `\u{1F3A8} UNSERE GEMEINSAME BUCKET LIST \u{1F3A8}

Dinge, die wir ZUSAMMEN erleben wollen:

\u2708\uFE0F **Reisen & Abenteuer:**
\u25A1 Polarlichter in Norwegen sehen
\u25A1 Ein Wochenende in Paris verbringen
\u25A1 Roadtrip ohne festes Ziel
\u25A1 In einem Baumhaus \xFCbernachten
\u25A1 Einen Berg zusammen besteigen

\u{1F3E0} **Zuhause & Alltag:**
\u25A1 Gemeinsam kochen und dabei tanzen
\u25A1 Einen Garten anlegen
\u25A1 DIY-Projekt: M\xF6bel bauen
\u25A1 Marathon aller Harry Potter Filme
\u25A1 Sternenhimmel vom Balkon aus beobachten

\u{1F491} **Romantisches:**
\u25A1 Paartanz-Kurs machen
\u25A1 Liebesbriefe in einer Zeitkapsel vergraben
\u25A1 Gemeinsam ein Lied schreiben
\u25A1 Picknick bei Sonnenuntergang
\u25A1 In einem Hot Air Balloon fahren

Was m\xF6chtest du noch hinzuf\xFCgen? Schreib deine Tr\xE4ume dazu! \u{1F4AD}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 4-6: Mehrteilige Love Story (Story Chain)
    {
      dayNumber: 4,
      title: "\u{1F4D6} Unsere Geschichte - Teil 1",
      contentTypeA: "MEMORY",
      contentA: `\u{1F4D6} WIE ALLES BEGANN - TEIL 1 \u{1F4D6}

*Eine Geschichte in drei Teilen*

**Kapitel 1: Der erste Funke**

Erinnerst du dich an unsere erste richtige Unterhaltung? Ich schon. Ich erinnere mich an jedes Detail.

Es war nicht Liebe auf den ersten Blick - es war etwas Tieferes. Es war, als ob ich jemanden wiedergetroffen h\xE4tte, den ich schon ewig kannte. Deine Art zu lachen, deine verr\xFCckten Ideen, die Art wie du die Welt siehst...

Ich wusste in diesem Moment noch nicht, dass du die Person werden w\xFCrdest, an die ich jeden Tag denke. Die Person, f\xFCr die ich alles tun w\xFCrde. Die Person, die mein Leben komplett ver\xE4ndert hat.

Aber irgendwo, ganz tief drinnen, hatte ich ein Gef\xFChl. Ein Kribbeln. Eine Vorahnung, dass du etwas Besonderes bist.

Und ich sollte recht behalten. \u2728

*Fortsetzung folgt morgen... \u{1F4AB}*`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: true,
      storyChainId: "our-love-story"
    },
    {
      dayNumber: 5,
      title: "\u{1F4D6} Unsere Geschichte - Teil 2",
      contentTypeA: "MEMORY",
      contentA: `\u{1F4D6} WIE ALLES BEGANN - TEIL 2 \u{1F4D6}

**Kapitel 2: Das erste "Wir"**

Die n\xE4chsten Wochen waren wie ein Tanz. Jede Nachricht von dir lie\xDF mein Herz schneller schlagen. Jedes Telefonat endete viel zu fr\xFCh. Jedes "Gute Nacht" f\xFChlte sich falsch an, weil ich einfach nicht aufh\xF6ren wollte, mit dir zu reden.

Wei\xDFt du noch, wann wir das erste Mal "wir" gesagt haben? Nicht als Plan, nicht als gro\xDFe Ank\xFCndigung - es rutschte einfach so raus. "Was machen wir am Wochenende?" "Wie w\xFCrden wir das l\xF6sen?"

Aus "ich" und "du" wurde "wir". Und pl\xF6tzlich ergab alles einen Sinn.

Die Entfernung? Nur eine Zahl.
Die Zweifel? Verschwunden.
Die Zukunft? Auf einmal klar.

Ich wollte jeden Tag mit dir teilen. Jeden Moment. Jede dumme Geschichte, jeden Erfolg, jede Angst. Mit dir war alles leichter. Mit dir war alles m\xF6glich.

*Fortsetzung folgt morgen... \u{1F495}*`,
      authorA: "Locdoc",
      responseMode: "AFTER_A",
      linkedToPrevious: true,
      linkedToNext: true,
      storyChainId: "our-love-story"
    },
    {
      dayNumber: 6,
      title: "\u{1F4D6} Unsere Geschichte - Teil 3",
      contentTypeA: "MEMORY",
      contentA: `\u{1F4D6} WIE ALLES BEGANN - TEIL 3 \u{1F4D6}

**Kapitel 3: Heute und alle Tage danach**

Und hier sind wir nun. Jeden Tag schreiben wir ein neues Kapitel unserer Geschichte.

Manchmal ist es ein Abenteuer-Kapitel, voller Lachen und verr\xFCckter Pl\xE4ne.
Manchmal ist es ein stilles Kapitel, wo wir einfach nur zusammen sind.
Manchmal ist es ein schwieriges Kapitel, aber wir meistern es gemeinsam.

Was ich dir sagen m\xF6chte: Diese Geschichte ist die sch\xF6nste, die ich je erlebt habe. Jeder Tag mit dir ist ein Geschenk. Jede Nachricht, jeder Anruf, jedes "Ich liebe dich" bedeutet mir die Welt.

Du bist meine beste Entscheidung. Mein gr\xF6\xDFtes Abenteuer. Meine Heimat, egal wo auf der Welt ich bin.

Und das Beste? Diese Geschichte hat gerade erst begonnen. Die sch\xF6nsten Kapitel kommen noch. \u2728

Ich liebe dich, Miss Chaos. Heute, morgen und alle Tage danach. \u{1F496}

In ewiger Liebe,
Dein Locdoc \u{1F9E1}

**ENDE DER STORY** - Aber nicht unserer Geschichte! \u{1F495}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: true,
      linkedToNext: false,
      storyChainId: "our-love-story"
    },
    // Tag 7: Nikolaus Special
    {
      dayNumber: 7,
      title: "\u{1F385} Nikolaus-\xDCberraschung",
      contentTypeA: "VIRTUAL_DATE",
      contentA: `\u{1F385} VIRTUELLES NIKOLAUS-DATE \u{1F385}

Ho ho ho! Der Nikolaus war da! \u{1F381}

**Unser gem\xFCtlicher Nikolaus-Abend:**

\u{1F550} **19:00 Uhr** - Video-Call starten
\u2615 **19:15 Uhr** - Hei\xDFe Schokolade machen (mit Marshmallows!)
\u{1F3AC} **19:30 Uhr** - Gemeinsam "Der Polarexpress" schauen
\u{1F36A} **21:00 Uhr** - Pause: Nikolaus-Pl\xE4tzchen naschen
\u{1F4D6} **21:15 Uhr** - Gegenseitig eine Weihnachtsgeschichte vorlesen
\u{1F495} **22:00 Uhr** - Einfach quatschen und kuschelig sein

**Deine Nikolaus-\xDCberraschungen:**
\u{1F381} Ein Gedicht f\xFCr dich (kommt per Nachricht)
\u{1F3B5} Eine Playlist mit unseren Lieblingsliedern
\u{1F48C} Ein Brief, der schon zu dir unterwegs ist
\u{1F36B} Und nat\xFCrlich: ganz viel Liebe! 

Bist du bereit f\xFCr unser Date? \u{1F9E1}\u{1F496}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 8: Spielerisch
    {
      dayNumber: 8,
      title: "\u{1F3B2} W\xFCrdest du lieber...?",
      contentTypeA: "WOULD_YOU_RATHER",
      contentA: `\u{1F3B2} W\xDCRDEST DU LIEBER...? \u{1F3B2}

Schwierige Entscheidungen f\xFCr uns beide!

\u2744\uFE0F **W\xFCrdest du lieber...**
...einen Monat im Schnee eingeschlossen sein ODER einen Monat in der W\xFCste?

\u{1F3E0} **W\xFCrdest du lieber...**
...in einer mega-Villa alleine wohnen ODER in einer winzigen Wohnung zusammen mit mir?

\u{1F52E} **W\xFCrdest du lieber...**
...die Zukunft sehen k\xF6nnen ODER die Vergangenheit \xE4ndern k\xF6nnen?

\u{1F3B5} **W\xFCrdest du lieber...**
...nie wieder Musik h\xF6ren ODER nie wieder Filme schauen k\xF6nnen?

\u{1F355} **W\xFCrdest du lieber...**
...nur noch Pizza essen d\xFCrfen ODER nie wieder Pizza?

\u23F0 **W\xFCrdest du lieber...**
...immer zu fr\xFCh ODER immer zu sp\xE4t kommen?

\u{1F9B8} **W\xFCrdest du lieber...**
...fliegen k\xF6nnen ODER unsichtbar sein k\xF6nnen?

\u{1F4F1} **W\xFCrdest du lieber...**
...1 Jahr ohne Internet ODER 1 Jahr ohne Telefon?

Antworte auf alles und erkl\xE4re warum! Ich will deine verr\xFCckten Begr\xFCndungen h\xF6ren! \u{1F604}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 9: Platform 9¾ Easter Egg
    {
      dayNumber: 9,
      title: "\u2728 Magische Erinnerungen",
      contentTypeA: "MEMORY",
      contentA: `\u2728 MAGISCHE MOMENTE \u2728

Heute wird es ein bisschen magisch... \u{1FA84}

Erinnerst du dich an den Moment, als wir beide merkten, dass wir beide riesige Harry Potter Fans sind? Es war, als h\xE4tten wir einen geheimen Code gefunden, den nur wir verstehen.

Seitdem sind so viele magische Momente entstanden:
- Unsere Diskussionen \xFCber H\xE4user (du bist SO eine Gryffindor! \u{1F981})
- Die sp\xE4ten N\xE4chte, in denen wir die Filme durchgebinged haben
- Deine Theorien \xFCber die B\xFCcher
- Unsere Tr\xE4ume von einem gemeinsamen Besuch in den Studios

Manchmal denke ich, unsere Liebe ist wie Magie. Unerkl\xE4rbar, wundervoll, m\xE4chtig.

Du bist mein Patronus - der Gedanke an dich vertreibt jede Dunkelheit. \u2728

**PS:** *Schau genau hin... manchmal verstecken sich magische Geheimnisse an unerwarteten Orten. Wie zum Beispiel zwischen den Gleisen...* \u{1F682}

In Liebe und Magie,
Dein Locdoc \u{1F9E1}

*"After all this time?"*
*"Always."* \u{1F495}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 10: Kreativ
    {
      dayNumber: 10,
      title: "\u{1F4F8} Photo Challenge",
      contentTypeA: "PHOTO_CHALLENGE",
      contentA: `\u{1F4F8} 7-TAGE PHOTO CHALLENGE \u{1F4F8}

Lass uns eine Woche lang jeden Tag ein spezielles Foto teilen!

**Die Challenge:**

\u{1F4F7} **Tag 1:** Etwas, das dich an mich erinnert
\u{1F4F7} **Tag 2:** Dein Lieblingsort zuhause
\u{1F4F7} **Tag 3:** Was du gerade liest/schaust
\u{1F4F7} **Tag 4:** Dein Fr\xFChst\xFCck (make it pretty!)
\u{1F4F7} **Tag 5:** Etwas Rotes (unsere Farbe \u{1F495})
\u{1F4F7} **Tag 6:** Der Blick aus deinem Fenster
\u{1F4F7} **Tag 7:** Du (ein Selfie f\xFCr mich \u{1F970})

**Die Regeln:**
\u2705 Keine Profi-Fotos n\xF6tig - echt ist sch\xF6ner!
\u2705 Jeden Tag um 18:00 Uhr Foto-Austausch
\u2705 Eine kleine Geschichte zum Bild erz\xE4hlen
\u2705 Kreativit\xE4t erw\xFCnscht!

Ich mache nat\xFCrlich mit! Wir schauen dann zusammen unsere kleinen Kunstwerke an. 

Bist du dabei? \u{1F4F1}\u2728`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 11: Romantisch
    {
      dayNumber: 11,
      title: "\u{1F49D} Gr\xFCnde warum ich dich liebe",
      contentTypeA: "LOVE_LETTER",
      contentA: `\u{1F49D} 11 GR\xDCNDE WARUM ICH DICH LIEBE \u{1F49D}

Heute am 11. Dezember bekommst du 11 Gr\xFCnde (aber es gibt tausende mehr):

1\uFE0F\u20E3 **Dein Lachen** - Es ist ansteckend und macht jeden schlechten Tag besser

2\uFE0F\u20E3 **Deine Spontanit\xE4t** - Mit dir wird es nie langweilig

3\uFE0F\u20E3 **Dein Herz** - Du k\xFCmmerst dich so sehr um die Menschen, die du liebst

4\uFE0F\u20E3 **Deine St\xE4rke** - Du gibst nie auf, egal wie schwer es wird

5\uFE0F\u20E3 **Deine Verspieltheit** - Du erinnerst mich daran, das Leben nicht zu ernst zu nehmen

6\uFE0F\u20E3 **Deine Intelligenz** - Unsere Gespr\xE4che sind nie oberfl\xE4chlich

7\uFE0F\u20E3 **Deine Art zu lieben** - Bedingungslos, echt, intensiv

8\uFE0F\u20E3 **Deine Tr\xE4ume** - Sie inspirieren mich, meine eigenen zu verfolgen

9\uFE0F\u20E3 **Deine Ehrlichkeit** - Ich kann immer ich selbst sein bei dir

\u{1F51F} **Deine kleinen Macken** - Sie machen dich zu der Person, in die ich mich verliebt habe

1\uFE0F\u20E31\uFE0F\u20E3 **Einfach ALLES** - Du bist perfekt, genau so wie du bist

Ich liebe dich mehr als Worte es je sagen k\xF6nnten. \u{1F9E1}\u{1F496}

Dein Locdoc, f\xFCr immer und ewig \u2728`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 12: Spiel
    {
      dayNumber: 12,
      title: "\u{1F3AE} Quiz: Wie gut kennst du mich?",
      contentTypeA: "QUIZ_JSON",
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
      "question": "Wovon tr\xE4ume ich f\xFCr unsere Zukunft?",
      "options": ["Weltreise", "Gemeinsames Zuhause", "Hund adoptieren", "Alles davon!"],
      "correctAnswer": 3
    },
    {
      "question": "Was bedeutet mir am meisten an unserer Beziehung?",
      "options": ["Die Gespr\xE4che", "Dass ich ich selbst sein kann", "Dein Support", "Einfach alles"],
      "correctAnswer": 3
    }
  ]
}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 13: Gemütlich
    {
      dayNumber: 13,
      title: "\u2615 Perfekter gem\xFCtlicher Abend",
      contentTypeA: "COZY_EVENING",
      contentA: `\u2615 REZEPT F\xDCR DEN PERFEKTEN KUSCHELABEND \u2615

Heute bekommst du von mir das Rezept f\xFCr unseren perfekten gemeinsamen Abend:

**Zutaten:**
- 1 weiche Decke (am besten flauschig)
- 2 gro\xDFe Tassen hei\xDFen Kakao mit Marshmallows
- Kuschelklamotten (Jogginghose ist Pflicht!)
- Kerzenlicht (3-5 St\xFCck f\xFCr die Atmosph\xE4re)
- 1 guter Film oder unsere Lieblingsserie
- Snacks nach Wahl (Chips, Schokolade, alles erlaubt!)
- Unbegrenzt viel Zeit

**Zubereitung:**
1. Handy auf lautlos stellen (au\xDFer f\xFCr uns!)
2. Gem\xFCtliche Ecke auf dem Sofa vorbereiten
3. Dich in meine Arme kuscheln (wichtigster Schritt!)
4. Film starten, aber eigentlich mehr reden als schauen
5. Zwischendurch K\xFCsse nicht vergessen
6. Einfach genie\xDFen und die Zeit anhalten

**Serviervorschlag:**
Am besten regelm\xE4\xDFig wiederholen! \u{1F495}

**Schwierigkeitsgrad:** Leicht
**Zubereitungszeit:** Ein ganzes Leben lang
**Ergebnis:** Perfektion \u2728

Wann machen wir das das n\xE4chste Mal? \u{1F970}

In Kuschellaune,
Dein Locdoc \u{1F9E1}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 14: Musik
    {
      dayNumber: 14,
      title: "\u{1F3B5} Unsere Love Songs",
      contentTypeA: "MUSIC_PLAYLIST",
      contentA: `\u{1F3B5} DIE SOUNDTRACK UNSERER LIEBE \u{1F3B5}

Ich habe dir eine Playlist zusammengestellt mit Liedern, die mich an uns erinnern:

**\u{1F495} Unsere Love Songs:**

1. **"Perfect" - Ed Sheeran**
   \u21B3 *Weil du genau das bist: perfekt f\xFCr mich*

2. **"All of Me" - John Legend**
   \u21B3 *I give you all of me, and you give me all of you*

3. **"Thinking Out Loud" - Ed Sheeran**
   \u21B3 *Unser Tanz-in-der-K\xFCche Song*

4. **"A Thousand Years" - Christina Perri**
   \u21B3 *I have loved you for a thousand years...*

5. **"Die With A Smile" - Bruno Mars & Lady Gaga**
   \u21B3 *Unser neuester Favorit!*

6. **"Lover" - Taylor Swift**
   \u21B3 *We could leave the Christmas lights up 'til January*

7. **"Everything" - Michael Bubl\xE9**
   \u21B3 *You're every line, you're every word, you're everything*

8. **"Make You Feel My Love" - Adele**
   \u21B3 *I could make you happy, make your dreams come true*

**\u{1F3A7} H\xF6r-Anweisung:**
Am besten zusammen h\xF6ren, Video-Call an, Kerzen an, und einfach nur f\xFChlen.

Welches Lied w\xFCrdest du hinzuf\xFCgen? \u{1F495}

Musikalische Gr\xFC\xDFe,
Dein Locdoc \u{1F3B6}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 15: Halbzeit!
    {
      dayNumber: 15,
      title: "\u{1F38A} Halbzeit-Feier!",
      contentTypeA: "CELEBRATION",
      contentA: `\u{1F38A} HALBZEIT! WIR HABEN DIE H\xC4LFTE GESCHAFFT! \u{1F38A}

15 Tage sind vorbei, 9 Tage noch bis Weihnachten!

**Lass uns feiern mit:**

\u{1F389} **Mini-Challenge:**
Schick mir heute 15 Dinge, f\xFCr die du dankbar bist!
(Ich mache das Gleiche!)

\u{1F37E} **Virtueller Champagner-Toast:**
Heute Abend um 20:00 Uhr - Video-Call!
Nimm dein Lieblingsgetr\xE4nk und wir sto\xDFen an!

\u{1F48C} **Erinnerung:**
Die erste H\xE4lfte war wundervoll. Die zweite wird noch besser!

\u{1F381} **Kleiner Teaser:**
Die n\xE4chsten Tage werden noch \xFCberraschender...
Und am Ende wartet etwas ganz Besonderes auf dich! \u{1F609}

**Was bisher geschah:**
\u2728 Wir haben gelacht
\u{1F495} Wir haben uns noch mehr verliebt
\u{1F3AE} Wir haben gespielt
\u{1F4D6} Wir haben Erinnerungen geteilt
\u{1F3B5} Wir haben unsere Songs gefeiert

**Was noch kommt:**
\u{1F440} Das bleibt eine \xDCberraschung!

Auf uns! \u{1F942}

Dein stolzer Locdoc \u{1F9E1}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 16: Kreativ
    {
      dayNumber: 16,
      title: "\u{1F3A8} Male mir etwas",
      contentTypeA: "CREATIVE_CHALLENGE",
      contentA: `\u{1F3A8} KREATIV-CHALLENGE: MALE MIR ETWAS! \u{1F3A8}

Heute darfst du kreativ werden!

**Deine Aufgabe:**
Male, zeichne oder bastle etwas, das uns beide repr\xE4sentiert!

**Es kann sein:**
- Ein Bild von uns beiden (Strichm\xE4nnchen erlaubt!)
- Ein Symbol f\xFCr unsere Liebe
- Eine Collage aus Fotos oder Zeitschriften
- Ein abstraktes Kunstwerk
- Etwas komplett Verr\xFCcktes!

**Regeln:**
\u2705 Keine Profi-Skills n\xF6tig!
\u2705 Hauptsache von Herzen!
\u2705 So kreativ und chaotisch wie du willst!
\u2705 Foto davon schicken!

**Mein Versprechen:**
Ich h\xE4nge dein Kunstwerk auf (egal wie "gut" es ist)!
Und ich male dir auch etwas! \u{1F3A8}

**Inspiration:**
- Unsere Lieblingsfarben
- Dinge, die wir zusammen gemacht haben
- Insider-Jokes
- Zukunftstr\xE4ume

Ich bin SO gespannt, was du kreierst! 
Deine k\xFCnstlerische Seite fasziniert mich! \u{1F495}

In kreativer Vorfreude,
Dein Locdoc \u270F\uFE0F`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 17: Romantisch
    {
      dayNumber: 17,
      title: "\u{1F4AB} Sternschnuppen-W\xFCnsche",
      contentTypeA: "STARGAZING",
      contentA: `\u{1F4AB} STERNSCHNUPPEN-W\xDCNSCHE \u{1F4AB}

Heute Nacht schauen wir zusammen in die Sterne!

**Unser virtuelles Stargazing:**

\u{1F31F} **20:30 Uhr** - Video-Call starten
\u{1F303} **20:45 Uhr** - Beide ans Fenster oder raus
\u2B50 **21:00 Uhr** - Gemeinsam Sterne suchen
\u{1F4AB} **21:30 Uhr** - W\xFCnsche teilen

**Wenn du eine Sternschnuppe siehst, darfst du dir was w\xFCnschen!**

**Meine 3 W\xFCnsche (psst, nicht weitersagen!):**

1. Dass wir bald wieder in echt zusammen sind
2. Dass du immer so gl\xFCcklich bleibst
3. Dass wir irgendwann zusammen unter echten Sternenhimmel liegen

**Aufgabe:**
Finde den Polarstern und denk an mich!
Ich mache das Gleiche! \u{1F4AB}

**Fun Facts:**
- Die meisten Sterne, die wir sehen, sind l\xE4ngst erloschen
- Aber unsere Liebe brennt heller als jeder Stern \u2728
- Die Wahrscheinlichkeit dich zu finden war wie eine Sternschnuppe
- Aber ich hab dich trotzdem gefunden! \u{1F495}

Zieh dich warm an, mein Stern! \u{1F9E1}

In kosmischer Liebe,
Dein Locdoc \u{1F30C}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 18: Spiel
    {
      dayNumber: 18,
      title: "\u{1F3AF} Wahrheit oder Pflicht",
      contentTypeA: "TRUTH_OR_DARE",
      contentA: `\u{1F3AF} WAHRHEIT ODER PFLICHT \u{1F3AF}

Zeit f\xFCr etwas Mutiges! (Aber jugendfreie Version \u{1F604})

**WAHRHEITEN:**
1. Was war dein erster Gedanke \xFCber mich?
2. Was ist deine gr\xF6\xDFte Angst in Bezug auf uns?
3. Wann wusstest du, dass du mich liebst?
4. Was ist das Verr\xFCckteste, das du f\xFCr mich tun w\xFCrdest?
5. Welchen Spitznamen hast du mir gegeben (den ich nicht kenne)?

**PFLICHTEN:**
1. Schick mir ein peinliches Foto von dir
2. Ruf mich an und sing mir ein Lied vor
3. Poste etwas \xFCber mich in deiner Story
4. Schreib mir ein Gedicht (Reimt sich nicht? Egal!)
5. Tanz zu deinem Lieblingslied und schick mir ein Video

**Die Regeln:**
- Wir spielen abwechselnd
- Du kannst maximal 2x "Pflicht" w\xE4hlen hintereinander
- Bei Wahrheit muss die Antwort ehrlich sein!
- Bei Pflicht gibt es kein Zur\xFCck! \u{1F601}

Ich fange an: **WAHRHEIT!**

Frag mich etwas! \u{1F495}

Gespannt wartend,
Dein Locdoc \u{1F3B2}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 19: Zukunft
    {
      dayNumber: 19,
      title: "\u{1F3E0} Unsere Zukunft zusammen",
      contentTypeA: "LIFE_GOALS",
      contentA: `\u{1F3E0} TR\xC4UME VON MORGEN \u{1F3E0}

Lass uns \xFCber die Zukunft sprechen. Unsere Zukunft. \u{1F495}

**In 1 Jahr m\xF6chte ich:**
- Dass die Entfernung kleiner geworden ist
- Dass wir mindestens 3 gro\xDFe Trips zusammen gemacht haben
- Dass du wei\xDFt, wie ernst ich es mit uns meine

**In 5 Jahren tr\xE4ume ich von:**
- Einem gemeinsamen Zuhause (egal wo)
- Einem Hund, den wir zusammen ausf\xFChren
- Sonntagmorgen mit dir und Kaffee im Bett
- Dass "wir" selbstverst\xE4ndlich geworden ist

**In 10 Jahren sehe ich:**
- Uns beide, immer noch verliebt wie am ersten Tag
- Vielleicht eine kleine Familie?
- Einen Garten, den wir zusammen pflegen
- Erinnerungen an tausend Abenteuer

**F\xFCr immer w\xFCnsche ich mir:**
- Jeden Tag mit dir aufwachen zu k\xF6nnen
- Nie aufh\xF6ren, Gr\xFCnde zu finden, dich zu lieben
- Zusammen alt werden
- Dass du gl\xFCcklich bist - mit mir an deiner Seite

**Jetzt bist du dran:**
Was sind deine Tr\xE4ume f\xFCr uns? 
Lass uns diese Zukunft zusammen bauen! \u{1F3D7}\uFE0F\u{1F495}

In hoffnungsvoller Vorfreude,
Dein Locdoc \u{1F9E1}\u2728`,
      authorA: "Locdoc",
      responseMode: "COLLABORATIVE",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 20: Persönlich
    {
      dayNumber: 20,
      title: "\u{1F49D} Was du f\xFCr mich bist",
      contentTypeA: "LOVE_LETTER",
      contentA: `\u{1F49D} WAS DU F\xDCR MICH BIST \u{1F49D}

Meine liebste Miss Chaos,

es gibt Tage, an denen ich innehalte und mich frage: "Wie hatte ich Gl\xFCck, dich zu finden?"

Du bist nicht nur meine Freundin. Du bist so viel mehr:

Du bist mein **sicherer Hafen** - der Ort, wo ich sein kann, wer ich wirklich bin.

Du bist mein **Abenteuer** - mit dir wird das Leben nie langweilig.

Du bist meine **Motivation** - du glaubst an mich, auch wenn ich es nicht tue.

Du bist mein **Zuhause** - egal wo auf der Welt, mit dir bin ich daheim.

Du bist meine **beste Freundin** - niemand versteht mich so wie du.

Du bist meine **Inspiration** - du machst mich zu einem besseren Menschen.

Du bist meine **Realit\xE4t** - besser als jeder Traum, den ich je hatte.

Aber vor allem: Du bist meine **gro\xDFe Liebe**.

Die Entfernung ist hart. Die Sehnsucht ist real. Aber wei\xDFt du was? Es ist es wert. DU bist es wert. Jeden einzelnen schweren Moment wert.

Denn am Ende des Tages gibt es nichts Wichtigeres als dich.

Danke, dass du existierst. Danke, dass du mich liebst. Danke, dass du du bist.

Ich liebe dich \xFCber alles. \u{1F9E1}\u{1F496}

F\xFCr immer dein,
Locdoc

PS: Nur noch 4 T\xFCrchen! Halt durch, die besten kommen noch! \u2728`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 21: Countdown
    {
      dayNumber: 21,
      title: "\u23F0 Countdown zu Weihnachten",
      contentTypeA: "COUNTDOWN",
      contentA: `\u23F0 3 TAGE BIS WEIHNACHTEN! \u23F0

Es wird ernst! Nur noch 3 T\xFCrchen nach diesem! \u{1F384}

**Dein Weihnachts-Countdown-Plan:**

\u{1F385} **Heute (21.12.):**
- Gem\xFCtlich machen
- Weihnachtsmusik h\xF6ren
- An mich denken \u{1F495}

\u{1F384} **Morgen (22.12.):**
- Letzter Vorbereitungstag
- Vorfreude aufbauen
- Video-Call am Abend!

\u{1F381} **\xDCbermorgen (23.12.):**
- Aufregung steigt
- Fast geschafft!
- Eine besondere \xDCberraschung wartet...

\u2744\uFE0F **Heiligabend (24.12.):**
- DAS FINALE!
- Die gr\xF6\xDFte \xDCberraschung
- Und ein Hinweis auf etwas NOCH Gr\xF6\xDFeres... \u{1F440}

**Mini-Challenge:**
Schick mir jeden dieser 3 Tage:
- Ein Foto von deinem Tag
- Eine Sache, auf die du dich freust
- Ein "Ich liebe dich" (bitte! \u{1F970})

Die Endphase hat begonnen! \u{1F38A}

Aufgeregt wie ein Kind,
Dein Locdoc \u{1F9E1}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 22: Vorbereitung
    {
      dayNumber: 22,
      title: "\u{1F384} Weihnachtsstimmung",
      contentTypeA: "COZY_EVENING",
      contentA: `\u{1F384} PERFEKTE WEIHNACHTSSTIMMUNG \u{1F384}

Nur noch 2 Tage! Lass uns die Vorfreude zelebrieren! 

**Deine Aufgabe f\xFCr heute:**

\u2615 **Mach dir was Warmes:**
Tee, Kakao, Gl\xFChwein - egal, Hauptsache gem\xFCtlich!

\u{1F56F}\uFE0F **Kerzen anz\xFCnden:**
So viele wie m\xF6glich! (Aber sicher! \u{1F525})

\u{1F3B5} **Weihnachtsmusik:**
"Last Christmas", "All I Want For Christmas" - die Klassiker!

\u{1F4F1} **Video-Call heute Abend:**
20:00 Uhr - Wir schauen zusammen einen Weihnachtsfilm!
(Ich stimme f\xFCr "Tats\xE4chlich Liebe" oder "Der Grinch"!)

\u{1F4AD} **Denk an:**
- Alle sch\xF6nen Momente dieses Jahr
- Was du dir f\xFCr n\xE4chstes Jahr w\xFCnschst
- Wie sehr ich dich liebe \u{1F495}

**Kleiner Teaser f\xFCr morgen:**
\u{1F381} Tag 23 wird emotional...
\u{1F381} Tag 24 wird MEGA...
\u{1F381} Und dann... kommt die SILVESTER-MISSION! \u{1F680}

Ich kann es kaum erwarten! Du auch? \u{1F970}

In festlicher Stimmung,
Dein Locdoc \u{1F385}\u{1F9E1}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: false
    },
    // Tag 23: Emotional
    {
      dayNumber: 23,
      title: "\u{1F4AB} Danke f\xFCr dieses Jahr",
      contentTypeA: "LOVE_LETTER",
      contentA: `\u{1F4AB} DANKE F\xDCR DIESES JAHR \u{1F4AB}

Mein Schatz,

morgen ist Weihnachten. Aber heute m\xF6chte ich einfach nur Danke sagen.

**Danke f\xFCr:**

\u{1F495} Jede Nachricht, die meinen Tag besser gemacht hat
\u{1F4DE} Jeden Anruf, egal wie sp\xE4t oder fr\xFCh
\u{1F602} Jeden Lacher, den wir geteilt haben
\u{1F622} Jede Tr\xE4ne, die du mir abgewischt hast
\u{1F389} Jede Feier, die du mit mir geteilt hast
\u{1F614} Jeden schweren Moment, den wir gemeistert haben
\u{1F4AA} Jede Motivation, die du mir gegeben hast
\u{1F31F} Jeden Traum, den du mit mir tr\xE4umst
\u23F0 Jede Minute, die du mir schenkst
\u2764\uFE0F Jedes "Ich liebe dich"

**Danke daf\xFCr, dass du:**
- Geduldig mit mir bist
- An uns glaubst
- Die Entfernung ertr\xE4gst
- Mich so liebst, wie ich bin
- Meine verr\xFCckte Seite magst
- Meine ernste Seite verstehst
- Niemals aufgibst
- Einfach DU bist

Dieses Jahr war nicht immer leicht. Aber mit dir an meiner Seite war es das beste Jahr meines Lebens.

Und n\xE4chstes Jahr? Wird noch besser. Versprochen. \u{1F4AB}

Ich liebe dich mehr als alles auf dieser Welt.

Morgen kommt das Finale. Aber das ist nicht das Ende.
Das ist erst der Anfang von allem. \u{1F680}

In tiefer Dankbarkeit und Liebe,
Dein Locdoc \u{1F9E1}

PS: Morgen wird magisch. Versprochen. \u2728`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: false,
      linkedToNext: true
    },
    // Tag 24: Das Finale!
    {
      dayNumber: 24,
      title: "\u{1F384} FROHE WEIHNACHTEN! \u{1F381}",
      contentTypeA: "LOVE_LETTER",
      contentA: `\u{1F384}\u2728 FROHE WEIHNACHTEN, MEIN SCHATZ! \u2728\u{1F384}

WIR HABEN ES GESCHAFFT! 24 TAGE! \u{1F389}

Meine allerliebste Miss Chaos,

heute ist der Tag. Weihnachten. Das Fest der Liebe. Und ich m\xF6chte diesen besonderen Tag mit den wichtigsten Worten beginnen:

**ICH LIEBE DICH.** \u{1F496}\u{1F9E1}

Diese 24 Tage waren eine Reise. Durch Erinnerungen, durch Tr\xE4ume, durch Lachen und manchmal auch Sehnsucht. Aber vor allem waren sie ein Zeichen meiner Liebe zu dir.

**Mein Weihnachtsgeschenk an dich:**
- Mein Herz (hast du schon, aber es ist immer noch das wertvollste, was ich habe)
- Mein Versprechen, immer f\xFCr dich da zu sein
- Mein Traum, mit dir alt zu werden
- Meine Hoffnung auf ein gemeinsames Leben
- Meine Liebe - bedingungslos und f\xFCr immer

**Was ich mir von dir w\xFCnsche:**
Eigentlich nichts. Du bist genug. Du bist mehr als genug.
Du bist alles. \u{1F4AB}

Aber wenn du mir etwas schenken m\xF6chtest:
Schenk mir noch viele solcher Tage mit dir.
Schenk mir dein L\xE4cheln, wenn ich es am meisten brauche.
Schenk mir deine Hand, und ich halte sie f\xFCr immer.

**Das Weihnachtswunder:**
Das Wunder ist nicht, dass heute Weihnachten ist.
Das Wunder ist, dass es dich gibt.
Und dass du mich liebst. \u{1F495}

Frohe Weihnachten, mein Engel! \u{1F384}

F\xFCr immer und ewig dein,
Locdoc \u{1F9E1}\u2728

---

**\u{1F381} P.S. - WICHTIG! \u{1F381}**

Weihnachten ist vorbei, aber unsere Geschichte geht weiter!

Es gibt noch EINE LETZTE MISSION... \u{1F680}
Ein geheimes T\xFCrchen zwischen den Jahren...
Eine Aufgabe, die uns ins neue Jahr f\xFChrt...

**\u{1F386} DIE SILVESTER-MISSION wartet auf dich! \u{1F386}**

*Hinweis: Schau nach dem 24. Dezember nochmal in den Kalender...*
*Manche Geheimnisse offenbaren sich erst, wenn die Zeit reif ist...* \u23F0\u2728

\u{1F512} *Aktivierung: 28. Dezember 2025* \u{1F512}`,
      authorA: "Locdoc",
      responseMode: "OPEN",
      linkedToPrevious: true,
      linkedToNext: false
    }
  ];
  for (const day of days) {
    const { contentType, content, author, ...validDay } = day;
    await prisma.day.create({
      data: validDay
    });
    console.log(`\u2705 T\xFCrchen ${day.dayNumber} erstellt`);
  }
  console.log("\u2728 T\xFCrchen-Seeding abgeschlossen! 24 T\xFCrchen wurden mit vollst\xE4ndigem Inhalt erstellt.");
  console.log("\u{1F384} Inklusive:");
  console.log("   - Mehrteilige Love Story (Tag 4-6)");
  console.log("   - Platform 9\xBE Easter Egg Hinweis (Tag 9)");
  console.log("   - Emotionales Weihnachtsfinale (Tag 23-24)");
  console.log("   - Silvester-Mission Teaser (Tag 24)");
  console.log("\n\u{1F3A8} Starte Tile-Library Seeding...");
  await prisma.tile.deleteMany({});
  const demoTiles = [
    // ROMANTISCH
    { title: "\u270D\uFE0F Romantisches Gedicht", description: "Kurzes Liebesgedicht", category: "Romantisch", contentType: "POEM", content: "In jedem Sonnenstrahl,\nSehe ich dein L\xE4cheln,\nMit dir ist jeder Tag so sch\xF6n. \u{1F495}", author: "A", responseMode: "DISABLED", tags: "gedicht, romantik" },
    { title: "\u{1F4AB} Unsere Erinnerung", description: "Gemeinsame Erinnerung", category: "Romantisch", contentType: "MEMORY", content: "Wei\xDFt du noch, unser erster Spaziergang im Schnee?\n\nDas war magisch. \u2764\uFE0F", author: "A", responseMode: "OPEN", taskForB: "Teile deine Lieblingserinnerung", tags: "erinnerung, romantik" },
    // SPIELE
    { title: "\u2753 Kennst du mich Quiz", description: "Wissens-Quiz", category: "Spiele", contentType: "GAME_QUESTION", content: "Was ist meine Lieblings-Weihnachtstradition?\n\nA) Pl\xE4tzchen backen \u{1F36A}\nB) Weihnachtsmarkt \u{1F384}\nC) Filme schauen \u{1F3AC}\nD) Geschenke einpacken \u{1F381}", author: "A", responseMode: "CHOICE", taskForB: "W\xE4hle die Antwort", tags: "quiz, spiel" },
    { title: "\u{1F914} W\xFCrdest du lieber", description: "Entscheidungs-Spiel", category: "Spiele", contentType: "WOULD_YOU_RATHER", content: "W\xFCrdest du lieber...\n\n\u{1F170}\uFE0F Winter im Schnee\n\noder\n\n\u{1F171}\uFE0F Winter am Strand\n\n?", author: "A", responseMode: "OPEN", taskForB: "W\xE4hle und erkl\xE4re", tags: "spiel, entscheidung" },
    { title: "\u{1F9E9} Advents-R\xE4tsel", description: "Weihnachtsr\xE4tsel", category: "Spiele", contentType: "RIDDLE", content: "Ich bringe Licht in dunkle Nacht,\n24 T\xFCrchen hab ich hier,\nWas bin ich? \u{1F914}", author: "A", responseMode: "OPEN", taskForB: "L\xF6sung schreiben", tags: "r\xE4tsel, advent" },
    // KREATIV
    { title: "\u{1F36A} Vanillekipferl backen", description: "Pl\xE4tzchenrezept", category: "Kreativ", contentType: "RECIPE", content: "\u{1F36A} VANILLEKIPFERL\n\nZutaten:\n\u25B8 280g Mehl\n\u25B8 210g Butter\n\u25B8 100g Mandeln\n\nLass uns backen! \u{1F468}\u200D\u{1F373}", author: "A", responseMode: "COLLABORATIVE", taskForB: "Wann backen wir?", tags: "backen, pl\xE4tzchen" },
    { title: "\u{1F3B5} Weihnachts-Playlist", description: "Gemeinsame Playlist", category: "Kreativ", contentType: "COLLABORATIVE_PLAYLIST", content: "\u{1F3B6} Lass uns eine Advents-Playlist erstellen!\n\nF\xFCge 5 Songs hinzu! \u2728", author: "A", responseMode: "COLLABORATIVE", taskForB: "Songs hinzuf\xFCgen", tags: "musik, playlist" },
    { title: "\u{1F3AC} Film-Abend", description: "Weihnachtsfilm", category: "Kreativ", contentType: "MOVIE_NIGHT", content: '\u{1F37F} FILM-ABEND\n\nFilm: "Tats\xE4chlich... Liebe"\nWann: N\xE4chstes Wochenende\n\nBist du dabei? \u{1F495}', author: "A", responseMode: "OPEN", taskForB: "Zusagen", tags: "film, date" },
    // GUTSCHEINE
    { title: "\u{1F3AB} Kuschel-Gutschein", description: "Gem\xFCtlicher Abend", category: "Gutscheine", contentType: "COUPON", content: "\u{1F381} GUTSCHEIN\n\n\u25B8 Kuschel-Abend\n\u25B8 Mit Kerzenlicht\n\u25B8 Unbegrenzte Umarmungen \u{1F495}\n\nEinl\xF6sbar: Jederzeit!", author: "A", responseMode: "DISABLED", tags: "gutschein, kuscheln" },
    { title: "\u{1F486} Massage-Gutschein", description: "R\xFCckenmassage", category: "Gutscheine", contentType: "COUPON", content: "\u{1F486}\u200D\u2640\uFE0F MASSAGE-GUTSCHEIN\n\n\u25B8 30 Min R\xFCckenmassage\n\u25B8 Mit Kerzen & Musik\n\nG\xFCltig bis: 31.12.2025 \u2764\uFE0F", author: "A", responseMode: "DISABLED", tags: "gutschein, massage" },
    // AUFGABEN
    { title: "\u2728 Komplimente-Aufgabe", description: "3 Dinge die du liebst", category: "Fragen", contentType: "TASK", content: "\u{1F495} Schreibe mir 3 Dinge, die du an mir liebst.\n\nIch bin gespannt! \u{1F60A}", author: "A", responseMode: "OPEN", taskForB: "Schreibe 3 Komplimente", tags: "aufgabe, komplimente" },
    { title: "\u{1F4F8} Foto-Challenge", description: "Besonderes Foto", category: "Spiele", contentType: "PHOTO_CHALLENGE", content: "\u{1F4F8} FOTO-CHALLENGE\n\nMache ein Foto von etwas, das dich an mich erinnert! \u{1F929}", author: "A", responseMode: "OPEN", taskForB: "Foto machen", tags: "foto, challenge" },
    // ABENTEUER
    { title: "\u{1F5FA}\uFE0F Mini-Schnitzeljagd", description: "Kleine \xDCberraschung", category: "Abenteuer", contentType: "TASK", content: "\u{1F50D} SCHNITZELJAGD\n\nHinweis: Schau dort nach, wo wir jeden Morgen sind \u2615\n\nViel Spa\xDF! \u{1F3C3}\u200D\u2640\uFE0F", author: "A", responseMode: "OPEN", taskForB: "Finde die \xDCberraschung", tags: "schnitzeljagd, abenteuer" },
    // WELLNESS
    { title: "\u{1F9D8} Entspannungs-Tag", description: "Wellness-Programm", category: "Wellness", contentType: "TASK", content: "\u{1F9D8}\u200D\u2640\uFE0F WELLNESS-TAG\n\n\u25B8 Entspannungsbad \u{1F6C1}\n\u25B8 Gesichtsmaske \u{1F486}\u200D\u2640\uFE0F\n\u25B8 Tee & Buch \u{1F4D6}\n\nDu hast es verdient! \u2728", author: "A", responseMode: "OPEN", taskForB: "Genie\xDFe deinen Tag", tags: "wellness, entspannung" },
    { title: "\u{1F4A7} Wasser-Challenge", description: "2L Wasser trinken", category: "Wellness", contentType: "CHALLENGE", content: "\u{1F4A7} WASSER-CHALLENGE\n\nHeute: 2 Liter Wasser trinken!\n\nSchaffst du das? \u{1F4AA}", author: "A", responseMode: "OPEN", taskForB: "2L trinken", tags: "wellness, gesundheit" }
  ];
  let tileCount = 0;
  for (const tileData of demoTiles) {
    await prisma.tile.create({ data: tileData });
    tileCount++;
  }
  console.log(`\u2705 ${tileCount} Demo-Tiles erstellt!`);
  console.log("\n\u{1F4CA} Kategorien:");
  console.log("   \u{1F495} Romantisch: 3 Tiles");
  console.log("   \u{1F3AE} Spiele: 4 Tiles");
  console.log("   \u{1F3A8} Kreativ: 3 Tiles");
  console.log("   \u{1F3AB} Gutscheine: 2 Tiles");
  console.log("   \u2705 Aufgaben: 2 Tiles");
  console.log("   \u{1F5FA}\uFE0F Abenteuer: 2 Tiles");
  console.log("   \u{1F9D8} Wellness: 2 Tiles");
  console.log("   \u{1F4FC} Nostalgisch: 2 Tiles");
  console.log("   \u{1F381} \xDCberraschungen: 2 Tiles");
  console.log(`
\u{1F389} Gesamt: ${tileCount} Tiles bereit zum Verwenden!`);
  console.log("\u{1F386} N\xE4chster Schritt: Silvester-K\xE4stchen implementieren!");
}
main().catch((e) => {
  console.error("\u274C Fehler beim Seeding:", e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
