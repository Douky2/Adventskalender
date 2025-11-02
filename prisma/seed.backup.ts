import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎄 Seeding Adventskalender-Daten...');

  // 24 Türchen mit abwechslungsreichen Inhalten für Locdoc 🧡 & Miss Chaos 💖
  const days = [
    {
      dayNumber: 1,
      title: 'Willkommen im Adventskalender 2025! �',
      contentType: 'LOVE_LETTER',
      contentTypeA: 'LOVE_LETTER',
      contentA: `💌 Meine liebste Miss Chaos,

heute beginnt unsere besondere Adventszeit! Die nächsten 24 Tage gehören nur uns beiden.

Ich weiß, die Entfernung ist manchmal schwer. Aber dieser Kalender soll dir jeden Tag zeigen: Du bist mir wichtig. Du bist es wert. Und ich bin so dankbar, dass es dich gibt.

Jeden Tag wartet eine neue Überraschung auf dich - manchmal romantisch, manchmal verrückt, manchmal gemütlich. Genau wie wir. 💕

Lass uns diese Zeit gemeinsam genießen!

In Liebe,
Dein Locdoc 🧡`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 1)
    },
    {
      dayNumber: 2,
      title: 'Dies oder Das? ⚡',
      contentType: 'THIS_OR_THAT',
      contentTypeA: 'THIS_OR_THAT',
      contentA: `⚡ DIES ODER DAS?

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

Schreib mir ALLE deine Antworten! Ich bin gespannt ob wir gleich ticken! 🤔`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 2)
    },
    {
      dayNumber: 3,
      title: 'Kissen-Burg Bauplan 🏰',
      contentType: 'PILLOW_FORT',
      contentTypeA: 'PILLOW_FORT',
      contentA: `🏰 KISSEN-BURG BAUPLAN

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
📺 Weihnachtsfilm deiner Wahl
🍫 Heiße Schokolade + Kekse
🎮 Optional: Handy-Spiele zusammen
💤 Optional: Nickerchen

REGEL: Wer die Burg verlässt, muss einen Weihnachtssong singen! 🎵

Bau deine Burg und schick mir Fotos! 📸`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 3)
    },
    {
      dayNumber: 4,
      title: 'Unsere Geschichte beginnt... (Teil 1) 📖',
      contentType: 'MEMORY',
      contentTypeA: 'MEMORY',
      contentA: `📖 UNSERE LIEBESGESCHICHTE - KAPITEL 1

Weißt du noch, wie alles anfing?

Als ich dich das erste Mal "gesehen" habe (auf dem Bildschirm 😄), dachte ich: "Wow, die ist anders." Du warst witzig, schlau, und hattest diese Art zu schreiben, die mich sofort angezogen hat.

Unser erstes richtiges Gespräch... ich war SO nervös! Ich hab drei Mal überlegt, was ich schreiben soll. Und dann hast du einfach was Verrücktes gesagt und ich musste lachen.

Von da an war es wie ein Sog. Jeden Tag hab ich mich mehr auf unsere Nachrichten gefreut. Auf unsere Calls. Auf deine Stimme.

UND DANN... (morgen geht's weiter! 😊)

Was war dein erster Gedanke über mich? Schreib's mir! 💭`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      linkedToNext: true,
      storyChainId: 'our-love-story',
      availableFrom: new Date(2025, 11, 4)
    },
    {
      dayNumber: 5,
      title: 'Unsere Geschichte... (Teil 2) 💕',
      contentType: 'MEMORY',
      contentTypeA: 'MEMORY',
      contentA: `📖 UNSERE LIEBESGESCHICHTE - KAPITEL 2

...und dann wurde aus Nachrichten mehr.

Plötzlich telefonierten wir. Stundenlang. Über alles und nichts. Ich erinnere mich an diesen einen Abend, wo wir bis 3 Uhr morgens geredet haben und keiner wollte auflegen.

"Noch 5 Minuten..."
"Okay, aber dann wirklich..."
*30 Minuten später*
"Jetzt aber wirklich!" 😄

Und irgendwann... wurde aus dem "Ich mag dich" ein "Ich hab mich in dich verliebt."

Ich weiß noch genau, wann ich es gemerkt habe. Es war [beschreibe deinen Moment]. Da wusste ich: Das ist echt. Das ist sie.

FORTSETZUNG FOLGT am 6. Dezember! 💖

Wann wusstest DU, dass es mehr ist?`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: true,
      linkedToNext: true,
      storyChainId: 'our-love-story',
      availableFrom: new Date(2025, 11, 5)
    },
    {
      dayNumber: 6,
      title: 'Unsere Geschichte... (Finale) 🌟',
      contentType: 'MEMORY',
      contentTypeA: 'MEMORY',
      contentA: `📖 UNSERE LIEBESGESCHICHTE - FINAL CHAPTER

Und heute? Heute sind wir hier.

Ja, wir sind weit voneinander entfernt. Ja, manchmal ist es schwer. Ja, ich wünschte, ich könnte dich einfach umarmen.

ABER:

Wir haben es geschafft, etwas Besonderes aufzubauen. Trotz Bildschirmen. Trotz Kilometern. Trotz allem.

Und das Beste? Unsere Geschichte ist noch lange nicht zu Ende.

Das hier ist nur der Anfang. Bald werden wir nicht mehr "eines Tages" sagen. Bald wird es "bald" sein. Und dann "heute".

Bis dahin: Jeder Call, jede Nachricht, jedes Lachen - das ist unsere Geschichte.

Und ich würde sie mit niemandem sonst schreiben wollen. 💕

ENDE VON KAPITEL 1 - DIE ONLINE-PHASE
KAPITEL 2 - DIE REAL-LIFE-PHASE kommt bald! 🚀`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      linkedToPrevious: true,
      storyChainId: 'our-love-story',
      availableFrom: new Date(2025, 11, 6)
    },
    {
      dayNumber: 7,
      title: 'Nikolaus-Überraschung 🎅',
      contentType: 'VIRTUAL_DATE',
      contentTypeA: 'VIRTUAL_DATE',
      contentA: `🎬 NIKOLAUS KINO-DATE!

Film: "Der Grinch" (2018) oder deine Wahl!
Zeit: HEUTE, 20:00 Uhr
Platform: Discord Screenshare

VORBEREITUNG:
🍿 Popcorn (salzig!)
🍫 Schokolade (Nikolaus-Reste?)
🥤 Heiße Schokolade
🛋️ Gemütlich machen
🎄 Weihnachtliche Stimmung

DRESSCODE:
Weihnachtspulli Pflicht! Oder zumindest was Rotes! 🎅

REGEL:
Bei jedem "Ho Ho Ho" im Film trinken wir einen Schluck! 😄

Ich freu mich schon so drauf! 💕

P.S.: Mach dein Handy aus - heute Abend sind nur wir beide dran! 📵✨`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 7)
    },
    {
      dayNumber: 8,
      title: 'Würdest du lieber...? 🤔',
      contentType: 'WOULD_YOU_RATHER',
      contentTypeA: 'WOULD_YOU_RATHER',
      contentA: `🤔 WÜRDEST DU LIEBER...?

Hier sind 5 schwierige Entscheidungen für dich:

1️⃣ Würdest du lieber...
   A) Jeden Tag 10 Nachrichten von mir
   B) Jeden Tag 1 Stunde telefonieren

2️⃣ Würdest du lieber...
   A) Nie wieder Gaming zusammen
   B) Nie wieder Filme zusammen schauen

3️⃣ Würdest du lieber...
   A) Mich 1x im Monat für 1 Woche treffen
   B) Mich 4x im Monat für 1 Tag treffen

4️⃣ Würdest du lieber...
   A) Nur noch über Text kommunizieren
   B) Nur noch über Voice (kein Video)

5️⃣ Würdest du lieber...
   A) Zusammen in meiner Stadt wohnen
   B) Zusammen in deiner Stadt wohnen

Schreib mir ALLE Antworten mit Begründung! 😊`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 8)
    },
    {
      dayNumber: 9,
      title: 'Ein magischer Tag... �',
      contentType: 'TEXT',
      contentTypeA: 'TEXT',
      contentA: `🎩 HEUTE IST EIN BESONDERER TAG...

Manchmal verstecken sich die schönsten Dinge an den unerwartetsten Orten.

Manchmal muss man genau hinschauen.

Manchmal gibt es Geheimnisse, die nur für diejenigen sind, die suchen.

Heute ist so ein Tag. 🪄

P.S.: Schau dir diese Kachel genau an... vielleicht entdeckst du etwas Magisches? ✨

P.P.S.: Klick auf die "9"... oder vielleicht auf etwas ANDERES? 😉🚂

(Falls du es findest: Es lohnt sich! Ein kleines Weihnachts-Abenteuer wartet...)`,
      author: 'Locdoc',
      responseMode: 'DISABLED',
      availableFrom: new Date(2025, 11, 9)
    },
    {
      dayNumber: 10,
      title: 'Gemütlicher Abend 🕯️',
      contentType: 'COZY_EVENING',
      contentTypeA: 'COZY_EVENING',
      contentA: `🕯️ GEMÜTLICHER ABEND

Ich plane für uns einen perfekt gemütlichen Abend (jeder bei sich, aber in Gedanken zusammen):

🛋️ SETTING:
- Gedimmtes Licht / Kerzen anzünden
- Weiche Decken rausholen
- Dicke Socken anziehen
- Vielleicht Kaminfeuer-Video am Laptop?

☕ GETRÄNKE:
- Heiße Schokolade mit Marshmallows
- Oder Glühwein? (wenn du magst!)
- Kekse dazu ✅

🍪 SNACKS:
- Plätzchen
- Schokolade
- Was Warmes zum Essen

📺 UNTERHALTUNG:
- Gemeinsam "Home Alone" schauen?
- Oder: Einfach nur telefonieren und reden
- Oder: Zusammen Musik hören

DRESSCODE: Hoodie & Jogginghose Pflicht! 😊

ZEIT: Heute Abend, 19:00 Uhr?

Machst du mit? 🧸💕`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 10)
    },
    {
      dayNumber: 11,
      title: 'Gaming Challenge! �',
      contentType: 'GAME_CHALLENGE',
      contentTypeA: 'GAME_CHALLENGE',
      contentA: `🎮 GAMING-NIGHT!

SPIELE: Among Us & Minecraft
ZEIT: Heute, 19:00 Uhr
ORT: Discord

🎯 CHALLENGES:

AMONG US (3 Runden):
- Wer ist der bessere Imposter?
- Wer überlebt am längsten als Crewmate?
- Wer findet mehr Imposters?

MINECRAFT (1 Stunde):
- Wer baut das schönere Haus?
- Wer findet mehr Diamanten?
- Wer überlebt die erste Nacht besser?

ZUSATZ-CHALLENGE:
Verlierer macht morgen Frühstück (virtuell 😄)!

REGELN:
✅ Kein Rage-Quitting!
✅ Viel Gelächter erwünscht
✅ Screenshots von witzigen Momenten!

Bereit zu verlieren? �`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 11)
    },
    {
      dayNumber: 12,
      title: 'Kuschel-Quiz 💕',
      contentType: 'CUDDLE_QUIZ',
      contentTypeA: 'CUDDLE_QUIZ',
      contentA: `💕 KUSCHEL-QUIZ

Beantworte folgende wichtige Fragen (für unser erstes ECHTES Kuscheln!):

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

Deine Antworten? Ich muss das wissen für unser Treffen! 🤔�`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 12)
    },
    {
      dayNumber: 13,
      title: 'Decken-Burrito 🌯',
      contentType: 'BLANKET_BURRITO',
      contentTypeA: 'BLANKET_BURRITO',
      contentA: `🌯 DECKEN-BURRITO ANLEITUNG

Du siehst heute aus als könntest du einen DECKEN-BURRITO gebrauchen!

ZUTATEN:
🛌 1x große weiche Decke
🧸 1x du
☕ Optional: heißer Kakao
🍫 Optional: Schokolade
📱 Optional: Handy für unsere Nachrichten

ZUBEREITUNG:
1. Decke flach ausbreiten
2. Dich in die Mitte legen
3. Einrollen wie einen Burrito
4. Nicht mehr bewegen

SERVIERVORSCHLAG:
Am besten auf Sofa/Bett
Mit Netflix oder Hörbuch
Bleib mindestens 2 Stunden so!

WARNUNG: Kann süchtig machen! 🥰

Mach ein Foto von deinem Burrito-Status und schick's mir! 😄📸

EXTRA: Ich mach auch einen und wir facetimen als Burritos! 🌯🌯`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 13)
    },
    {
      dayNumber: 14,
      title: 'Regentag-Programm 🌧️',
      contentType: 'RAINY_DAY',
      contentTypeA: 'RAINY_DAY',
      contentA: `🌧️ REGENTAG-PROGRAMM

Egal ob es regnet oder nicht - HEUTE ist offiziell Cozy-Day!

REGENTAG-AKTIVITÄTEN:
☔ Regen am Fenster beobachten (oder imaginären Regen 😄)
☕ Heißen Tee/Kakao trinken
📚 Buch lesen (oder ich les dir was vor?)
🎵 Regen-Playlist hören
🍪 Kekse backen (schick mir Fotos!)
🛋️ Kuscheldecke + Film Marathon
🕯️ Kerzen anzünden
💤 Power-Nap machen
🎨 Etwas kreatives machen
💭 Einfach nur chillen

REGENTAG-REGEL:
Niemand muss raus! Niemand muss produktiv sein!
Heute ist offiziell Faulenzen erlaubt! 🌈

BONUS: Später zusammen Pfützen-Spring-Videos schauen? 😄

Was machst du an deinem perfekten Regentag?`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 14)
    },
    {
      dayNumber: 15,
      title: 'Halbzeit! �',
      contentType: 'GRATITUDE',
      contentTypeA: 'GRATITUDE',
      contentA: `🎊 HALBZEIT - WIR HABEN'S ZUR HÄLFTE GESCHAFFT! 🎊

15 von 24 Türchen sind offen. Nur noch 9 Tage bis Weihnachten!

DANKBARKEITS-MOMENT:

Ich bin dankbar für...
- Jeden "Guten Morgen" Text von dir
- Unsere nächtlichen Gespräche bis 3 Uhr
- Dass du meine verrückten Ideen mitmachst
- Dein Lachen, das ich auch durchs Handy hören kann
- Dass du BLEIBST, trotz der Entfernung

Die letzten 15 Tage waren besonders. Die nächsten 9 werden noch besser.

UND DANN: Nur noch [X] Tage bis zu unserem Treffen! 🚀

Wofür bist DU dankbar? Schreib mir 5 Dinge! 💕

Die besten Türchen kommen noch... ich hab mir was Besonderes für dich überlegt! 😊✨`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 15)
    },
    {
      dayNumber: 16,
      title: 'Massage-Gutschein 💆',
      contentType: 'MASSAGE_COUPON',
      contentTypeA: 'MASSAGE_COUPON',
      contentA: `💆 MASSAGE-GUTSCHEIN

✨ DIESER GUTSCHEIN BERECHTIGT ZU: ✨

🙌 EINE 30-MINUTEN MASSAGE
📍 ORT: Bei unserem nächsten Treffen!
⏰ ZEIT: Nach deiner Wahl

LEISTUNGEN:
✅ Schulter-Massage (du bist bestimmt verspannt!)
✅ Rücken-Massage (entspannend!)
✅ Kopf-Massage (so gut!)
✅ Hand-Massage
✅ Fuß-Massage (wenn du willst!)

EXTRAS INKLUSIVE:
- Entspannende Musik 🎵
- Gedimmtes Licht 🕯️
- Danach: Kuscheln 🧸
- Garantiert professionell... oder zumindest bemüht! 😄

BEDINGUNGEN:
- Keine Rückgabe
- Nicht übertragbar
- Unbegrenzt gültig
- Kann mehrfach eingelöst werden 😊

Freu dich drauf! 💕`,
      author: 'Locdoc',
      responseMode: 'DISABLED',
      availableFrom: new Date(2025, 11, 16)
    },
    {
      dayNumber: 17,
      title: 'Sternengucken ⭐',
      contentType: 'STARGAZING',
      contentTypeA: 'STARGAZING',
      contentA: `⭐ STERNENGUCKEN

Heute Abend: STERNENBEOBACHTUNG! (jeder bei sich, aber zur selben Zeit!)

📍 ORT:
Balkon/Garten/Fenster - wo du den Himmel siehst

🛋️ SETUP:
- Decken zum Einwickeln (wird kalt!)
- Kissen für Kopf
- Warme Jacke/Hoodie
- Heißgetränk in Thermoskanne

✨ WAS WIR SEHEN KÖNNEN:
- Sternbilder: Orion, Großer Wagen, Kassiopeia
- Planeten: Jupiter & Venus (hell!)
- Vielleicht Sternschnuppen? 💫

🎵 PLAN:
- 21:00 Uhr: Beide raus gehen
- Telefonieren während wir Sterne anschauen
- Über Universum & verrückte Weltraum-Fakten reden
- Wünsche bei Sternschnuppen!

💭 GESPRÄCHSTHEMEN:
- Was wäre wenn wir auf dem Mond wären?
- Unsere Träume & Zukunft
- Verrückte "Was wäre wenn" Szenarien

Heute Nacht? Gleiche Sterne, verschiedene Orte, zusammen im Herzen. 🌙💕`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 17)
    },
    {
      dayNumber: 18,
      title: 'Frühstück im Bett �️',
      contentType: 'BREAKFAST_IN_BED',
      contentTypeA: 'BREAKFAST_IN_BED',
      contentA: `🛏️ FRÜHSTÜCK IM BETT GUTSCHEIN

Bei unserem nächsten Treffen: Du bleibst liegen - ich kümmere mich um alles!

MENÜ (nach deinen Wünschen):
🥐 Croissants oder Brötchen
🍳 Rührei oder Spiegelei
🥣 Müsli mit Joghurt
🍓 Frisches Obst
☕ Kaffee (oder Tee!)
🥤 Frischer O-Saft

EXTRAS:
- Frische Blume in Vase 🌸
- Serviette kunstvoll gefaltet (ich versuch's! 😄)
- Kleine Überraschung unterm Teller

UNTERHALTUNG:
📱 Handy zum Scrollen
📰 Oder etwas zum Lesen
🎵 Leise Musik im Hintergrund

REGEL: Du darfst erst aufstehen wenn du komplett fertig bist! 😊

ZEITPUNKT: Bei unserem Treffen, an einem Morgen deiner Wahl!

Freu dich drauf! 🥰`,
      author: 'Locdoc',
      responseMode: 'DISABLED',
      availableFrom: new Date(2025, 11, 18)
    },
    {
      dayNumber: 19,
      title: 'Film-Nest Setup 🎬',
      contentType: 'MOVIE_NEST',
      contentTypeA: 'MOVIE_NEST',
      contentA: `🎬 FILM-NEST SETUP

HEUTE bauen wir das ultimative Cozy-Film-Nest! (jeder bei sich, aber synchron!)

NEST-BASIS:
🛋️ Sofa/Bett komplett umbauen
🛏️ ALLE Kissen & Decken sammeln
✨ Lichterkette aufhängen
🕯️ Duftkerze anzünden

VERPFLEGUNG:
🍿 Popcorn (salzig UND süß!)
🍫 Schokolade
🍕 Pizza bestellen für später?
🥤 Getränke in Reichweite

FILM-AUSWAHL (zusammen entscheiden):
Option 1: Love Actually
Option 2: Der Grinch
Option 3: Kevin allein zu Haus
Backup: Deine Lieblingsserie

REGELN:
✅ Handys auf stumm (außer unsere Nachrichten!)
✅ Kein Aufstehen außer Notfall
✅ Kuscheln mit Kissen (ich wär lieber da 😊)
✅ Kommentieren des Films erwünscht!

ZEIT: Heute, 20:00 Uhr?

Bereit für den besten Filmabend? 🎥💕`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 19)
    },
    {
      dayNumber: 20,
      title: 'Slow Morning 🌅',
      contentType: 'SLOW_MORNING',
      contentTypeA: 'SLOW_MORNING',
      contentA: `☀️ LANGSAMER MORGEN - GUTSCHEIN

Diesen Sonntag machen wir einen SLOW MORNING!

⏰ KEIN WECKER!
Wir stehen auf wenn wir aufwachen

🛌 AUSSCHLAFEN:
Alle Zeitlimits sind aufgehoben

☕ GEMÜTLICHES FRÜHSTÜCK:
Wir nehmen uns Zeit
Vielleicht zusammen "frühstücken" (facetime)?

🧘 ENTSPANNTE AKTIVITÄTEN:
- Im Bett rumliegen ✅
- Miteinander schreiben ✅
- Telefonieren ✅
- Musik hören ✅
- Raus schauen ✅
- Einfach sein ✅

📵 REGEL:
Keine stressigen Nachrichten checken
Kein Social Media
Nur wir beide und Ruhe

⏱️ ZEITLIMIT:
Bis mindestens 12:00 Uhr dürfen wir NICHTS produktives tun!

Kommenden Sonntag? Oder dieses Wochenende? 🥰`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 20)
    },
    {
      dayNumber: 21,
      title: 'Unsere Lebensziele 🎯',
      contentType: 'LIFE_GOALS',
      contentTypeA: 'LIFE_GOALS',
      contentA: `🎯 UNSERE LEBENSZIELE

Lass uns über die Zukunft reden - UNSERE Zukunft!

IN 1 JAHR (2026):
- Wo wollen wir sein?
- Was wollen wir erreicht haben?
- Wie sieht unsere Beziehung aus?

IN 5 JAHREN (2030):
- Wo wohnen wir?
- Was machen wir beruflich?
- Große Reisen? Zusammenleben?

IN 10 JAHREN (2035):
- Wie sieht unser Leben aus?
- Was ist uns wichtig?
- Verrückte Träume?

GEMEINSAME ZIELE:
1. [Schreib mir deine Ideen!]
2. 
3. 

MEINE ZIELE FÜR UNS:
- Endlich keine Fernbeziehung mehr
- Zusammen aufwachen
- Gemeinsame Wohnung?
- Zusammen alt werden 💕

Was sind DEINE Ziele für uns? Schreib mir alles! Keine Träume sind zu groß! 🚀`,
      author: 'Locdoc',
      responseMode: 'COLLABORATIVE',
      availableFrom: new Date(2025, 11, 21)
    },
    {
      dayNumber: 22,
      title: 'Countdown zu Weihnachten ⏰',
      contentType: 'COUNTDOWN',
      contentTypeA: 'COUNTDOWN',
      contentA: `⏰ COUNTDOWN

Nur noch 3 Tage bis Weihnachten! 🎄

WAS PASSIERT DANN:
Weihnachten! Und unser erstes Weihnachten "zusammen" (virtuell, aber bald real!)

DARAUF FREUE ICH MICH:
- Geschenke austauschen (hab ich schon!)
- Zusammen Weihnachtsfilme schauen
- Den ganzen Tag miteinander verbringen
- Dich glücklich machen 💕

VORBEREITUNG:
[X] Geschenk besorgt
[X] Weihnachtsfilm ausgesucht
[X] Plätzchen gebacken
[ ] Noch 2 Türchen öffnen!

EXTRA COUNTDOWN:
Und nur noch [X] Tage bis zu unserem ECHTEN Treffen! 🚀

Die Spannung steigt! Bist du auch schon so aufgeregt? 😊✨`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 22)
    },
    {
      dayNumber: 23,
      title: 'Vor dem großen Tag... 💝',
      contentType: 'APPRECIATION',
      contentTypeA: 'APPRECIATION',
      contentA: `💝 VOR DEM GROSSEN TAG...

Morgen ist Heiligabend. Das letzte Türchen.

ABER HEUTE möchte ich einfach nur DANKE sagen.

DANKE FÜR:
- Jeden "Guten Morgen" Text
- Jede durchlachte Nacht bis 3 Uhr
- Deine Geduld wenn ich spamme
- Dass du meine verrückten Ideen mitmachst
- Dein Verständnis an schlechten Tagen
- Dass du BLEIBST

DANKE DASS DU:
- Mich zum Lachen bringst
- Mich verstehst
- Mich erträgst 😄
- Mich liebst

Diese 23 Tage waren besonders. Nicht wegen dem Kalender.
Sondern weil ich sie mit DIR teilen durfte.

Morgen kommt das Finale. Aber eigentlich...
ist jeder Tag mit dir ein Geschenk.

Ich hab dich lieb, Miss Chaos. 💖

Dein Locdoc 🧡

P.S.: Morgen wird besonders. Versprochen. ✨`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 23)
    },
    {
      dayNumber: 24,
      title: 'Frohe Weihnachten! 🎄✨',
      contentType: 'TEXT',
      contentTypeA: 'TEXT',
      contentA: `🎄✨ FROHE WEIHNACHTEN, MISS CHAOS! ✨🎄

Wir haben es geschafft - alle 24 Türchen!

24 Tage voller Überraschungen.
24 Tage voller uns.
24 Tage die zeigen sollten: Du bist mir wichtig.

ABER DAS WAR NUR DER ANFANG.

Dieser Kalender endet heute.
Aber WIR nicht.

2026 wird UNSER Jahr.
Das Jahr wo aus "irgendwann" ein "bald" wird.
Das Jahr wo aus Kilometern Zentimeter werden.
Das Jahr wo aus Bildschirmen echte Umarmungen werden.

Ich weiß, die Entfernung ist schwer.
Aber du bist es wert.
WIR sind es wert.

Also: FROHE WEIHNACHTEN! 🎅

Danke für jeden Moment.
Danke für jedes Lachen.
Danke dass du DU bist.

Ich hab dich lieb. Mehr als dieser Kalender je zeigen könnte. 💕

Dein Locdoc 🧡

P.S.: Ruf mich SOFORT an! Ich hab noch eine echte Überraschung! 📞🎁

P.P.S.: Und das hier ist nicht das Ende... nur der Anfang von was Größerem. ✨

FROHE WEIHNACHTEN! 🎄❤️`,
      author: 'Locdoc',
      responseMode: 'OPEN',
      availableFrom: new Date(2025, 11, 24)
    }
  ];

  for (const day of days) {
    // Entferne alte Felder die nicht mehr im Schema sind
    const { contentType, content, author, availableFrom, ...validDay } = day as any;
    
    await prisma.day.upsert({
      where: { dayNumber: validDay.dayNumber },
      update: validDay,
      create: validDay
    });
  }

  console.log('✅ Seeding abgeschlossen! 24 Türchen wurden erstellt.');
}

main()
  .catch((e) => {
    console.error('❌ Fehler beim Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
