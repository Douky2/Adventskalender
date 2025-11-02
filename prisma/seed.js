import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎄 Seeding Adventskalender-Daten...');

  // Beispieldaten für verschiedene Inhaltstypen
  const days = [
    {
      dayNumber: 1,
      title: 'Willkommen in unserem Kalender! 🎅',
      contentType: 'TEXT',
      content: 'Hallo mein Schatz! Die nächsten 24 Tage sind nur für uns. Jeden Tag erwartet dich eine kleine Überraschung. Ich freue mich so auf diese besondere Zeit mit dir! ❤️',
      author: 'Dein Liebster'
    },
    {
      dayNumber: 2,
      title: 'Unsere Songs 🎵',
      contentType: 'PLAYLIST',
      content: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
      author: 'Für uns beide'
    },
    {
      dayNumber: 3,
      title: 'Erinnerungen an uns 📸',
      contentType: 'IMAGE_URL',
      content: 'https://picsum.photos/800/600?random=1',
      author: 'Unsere Momente'
    },
    {
      dayNumber: 4,
      title: 'Wie gut kennst du mich? 🤔',
      contentType: 'QUIZ_JSON',
      content: JSON.stringify({
        questions: [
          {
            question: 'Was ist mein Lieblingssnack beim Telefonieren?',
            options: ['Chips', 'Schokolade', 'Gummibärchen', 'Nüsse'],
            correctAnswer: 1
          },
          {
            question: 'Welchen Film wollen wir zusammen schauen?',
            options: ['Harry Potter', 'Der Herr der Ringe', 'Star Wars', 'Marvel'],
            correctAnswer: 0
          },
          {
            question: 'Was vermisse ich am meisten an dir?',
            options: ['Deine Stimme', 'Dein Lachen', 'Deine Umarmungen', 'Alles davon!'],
            correctAnswer: 3
          }
        ]
      }),
      author: 'Von mir für dich'
    },
    {
      dayNumber: 5,
      title: 'Gutschein: Movie Night! 🎬',
      contentType: 'TEXT',
      content: '🎫 GUTSCHEIN 🎫\n\nEinlösbar: Heute Abend\nFür: Gemeinsames Anschauen von "Home Alone" über Discord Screenshare\nMit: Popcorn (jeder macht sein eigenes 😄)\nStart: 20:00 Uhr\n\nIch kann es kaum erwarten! ❤️',
      author: 'Dein persönlicher Kinobetreiber'
    },
    {
      dayNumber: 6,
      title: 'Unsere Lieblingsmemes 😂',
      contentType: 'IMAGE_URL',
      content: 'https://picsum.photos/800/600?random=2',
      author: 'Zum Lachen'
    },
    {
      dayNumber: 7,
      title: 'Weihnachtsvideo für uns 🎅',
      contentType: 'VIDEO_EMBED',
      content: 'https://www.youtube.com/embed/yXQViqx6GMY',
      author: 'Festliche Stimmung'
    },
    {
      dayNumber: 8,
      title: 'Orte, die wir besuchen werden 🗺️',
      contentType: 'MAP',
      content: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409215612593!2d13.404953999999998!3d52.5200066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1234567890',
      author: 'Unsere Zukunft'
    },
    {
      dayNumber: 9,
      title: 'Ein Gedicht für dich 💝',
      contentType: 'TEXT',
      content: 'In Pixeln und in Worten nah,\nBist du mir fern und doch so da.\nDurch Screens hindurch seh ich dein Licht,\nDie Distanz? Die zählt für mich nicht.\n\nBald schon sind wir nicht mehr allein,\nWird Digitales endlich Real sein.\nBis dahin halt ich dich hier fest,\nIn meinem Herzen, du weißt es best. ❤️',
      author: 'Dein Amateur-Poet'
    },
    {
      dayNumber: 10,
      title: 'Spieleabend! 🎮',
      contentType: 'TEXT',
      content: '🎮 GAME NIGHT GUTSCHEIN 🎮\n\nHeute Abend spielen wir:\n• Skribbl.io (wer malt besser?)\n• Among Us (wer lügt besser? 😏)\n• Codenames (Teamwork!)\n\nZeit: 19:00 Uhr\nOrt: Discord Voice Channel\nPflicht: Gute Laune mitbringen!',
      author: 'Player 1'
    },
    {
      dayNumber: 11,
      title: 'Mehr von unseren Songs 🎶',
      contentType: 'PLAYLIST',
      content: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO',
      author: 'Für romantische Momente'
    },
    {
      dayNumber: 12,
      title: 'Unser erstes "Date" 💑',
      contentType: 'IMAGE_URL',
      content: 'https://picsum.photos/800/600?random=3',
      author: 'Unvergesslich'
    },
    {
      dayNumber: 13,
      title: 'Was ich an dir liebe (Teil 1) 💕',
      contentType: 'TEXT',
      content: 'Dein Lachen, das selbst durch einen Bildschirm mein Herz erwärmt.\nDeine Art, mir zuzuhören, auch wenn wir uns nur schreiben.\nWie du mich verstehst, ohne dass ich viel sagen muss.\nDeine verrückten Witze um 2 Uhr morgens.\nDass du immer für mich da bist, egal wie weit weg.\n\n...wird fortgesetzt! 😊',
      author: 'Dein größter Fan'
    },
    {
      dayNumber: 14,
      title: 'Noch ein Quiz! 🧠',
      contentType: 'QUIZ_JSON',
      content: JSON.stringify({
        questions: [
          {
            question: 'An welchem Tag haben wir uns "getroffen"?',
            options: ['Montag', 'Dienstag', 'Freitag', 'Samstag'],
            correctAnswer: 2
          },
          {
            question: 'Was war unser erstes Spiel zusammen?',
            options: ['Among Us', 'Minecraft', 'Stardew Valley', 'Mario Kart'],
            correctAnswer: 2
          }
        ]
      }),
      author: 'Erinnerungs-Test'
    },
    {
      dayNumber: 15,
      title: 'Halbzeit! 🎉',
      contentType: 'TEXT',
      content: '🎊 WIR HABEN DIE HÄLFTE GESCHAFFT! 🎊\n\nNur noch 9 Tage bis Weihnachten!\nUnd nur noch [X] Tage bis wir uns endlich treffen!\n\nDanke, dass du jeden Tag mit mir teilst.\nDanke, dass du du bist.\nDanke, dass es dich gibt. ❤️\n\nDie besten Türchen kommen noch!',
      author: 'Dein aufgeregter Schatz'
    },
    {
      dayNumber: 16,
      title: 'Gemeinsame Playlist 🎵',
      contentType: 'PLAYLIST',
      content: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd',
      author: 'Unsere Vibes'
    },
    {
      dayNumber: 17,
      title: 'Winter Wonderland Video ❄️',
      contentType: 'VIDEO_EMBED',
      content: 'https://www.youtube.com/embed/nCrlyX6XbTU',
      author: 'Winterstimmung'
    },
    {
      dayNumber: 18,
      title: 'Unsere Bucket List 📝',
      contentType: 'TEXT',
      content: 'Dinge, die wir zusammen machen werden:\n\n✓ Endlich in echt reden!\n✓ Zusammen einen Film im Kino schauen\n✓ Hand in Hand spazieren gehen\n✓ Zusammen kochen (und wahrscheinlich das Chaos aufräumen 😄)\n✓ Ein Picknick machen\n✓ Sternenhimmel zusammen anschauen\n✓ Ein Foto machen, wo wir beide drauf sind!\n✓ Einfach zusammen sein...\n\nIch kann es kaum erwarten! 💕',
      author: 'Unsere Träume'
    },
    {
      dayNumber: 19,
      title: 'Noch mehr Erinnerungen 📷',
      contentType: 'IMAGE_URL',
      content: 'https://picsum.photos/800/600?random=4',
      author: 'Unsere Geschichte'
    },
    {
      dayNumber: 20,
      title: 'Countdown-Gutschein! ⏰',
      contentType: 'TEXT',
      content: '⏰ SPECIAL GUTSCHEIN ⏰\n\nAb heute zählen wir gemeinsam runter!\n\nJeden Abend um 22:00 Uhr:\n- 5 Minuten nur für uns\n- Wir sagen uns, worauf wir uns morgen freuen\n- Und was heute schön war\n\nBis Weihnachten! 🎄',
      author: 'Ritual-Erfinder'
    },
    {
      dayNumber: 21,
      title: 'Was ich an dir liebe (Teil 2) 💖',
      contentType: 'TEXT',
      content: 'Wie du mich zum Lachen bringst, selbst an schlechten Tagen.\nDeine Geduld, wenn ich mal wieder zu spät antworte.\nDass du meine Memes verstehst (die wichtigste Eigenschaft! 😄).\nWie aufmerksam du bist bei allem, was ich erzähle.\nDass du genauso verrückt bist wie ich.\nUnd dass du trotz der Distanz geblieben bist. ❤️',
      author: 'Dein Glückspilz'
    },
    {
      dayNumber: 22,
      title: 'Unser Reiseplan 🗺️✈️',
      contentType: 'MAP',
      content: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406081493!2d2.292292615674192!3d48.858370079287466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffelturm!5e0!3m2!1sde!2sde!4v1234567890',
      author: 'Irgendwann...'
    },
    {
      dayNumber: 23,
      title: 'Heiligabend ist morgen! 🎄',
      contentType: 'TEXT',
      content: 'Morgen ist es soweit - Weihnachten! 🎅\n\nAber das größte Geschenk habe ich schon:\nDich. ❤️\n\nDanke für jeden Chat.\nDanke für jeden Call.\nDanke für jeden Moment.\n\nMorgen wartet das letzte Türchen auf dich...\nUnd ich verspreche, es wird besonders! 💝',
      author: 'Voller Vorfreude'
    },
    {
      dayNumber: 24,
      title: 'Frohe Weihnachten, mein Schatz! 🎄❤️',
      contentType: 'TEXT',
      content: '🎄✨ FROHE WEIHNACHTEN! ✨🎄\n\nWir haben es geschafft - alle 24 Tage!\n\nIch weiß, die Entfernung ist schwer.\nIch weiß, manchmal fühlt es sich unmöglich an.\nAber jeden Tag mit dir, auch wenn er nur digital ist,\nist ein Geschenk für mich.\n\nDieser Kalender war meine Art zu sagen:\nDu bist es wert.\nWir sind es wert.\nUnd bald - ganz bald - werden wir nicht mehr nur Pixel sein.\n\nBis dahin: Frohe Weihnachten, mein Liebster.\nIch hab dich lieb. Mehr als Worte sagen können. 💕\n\nDein [Name] ❤️\n\nP.S.: Ruf mich gleich an! Ich habe noch eine Überraschung! 📞🎁',
      author: 'Dein Herz'
    }
  ];

  for (const day of days) {
    await prisma.day.upsert({
      where: { dayNumber: day.dayNumber },
      update: day,
      create: day
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
