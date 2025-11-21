import { json } from '@sveltejs/kit';
import { db } from '$lib/server/storage';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  try {
    // 1. Clear existing data (optional, but good for a clean slate)
    // We won't delete everything, just overwrite days and add tiles.
    
    // 2. Create Tiles (5 examples per category group for brevity, or specific types)
    const tilesData = [
      // --- ROMANTISCH ---
      {
        title: "Liebesbrief an dich",
        category: "Romantisch",
        contentType: "LOVE_LETTER",
        content: "Mein Schatz,\n\nIch wollte dir heute einfach mal sagen, wie unglaublich wichtig du für mich bist...",
        description: "Ein klassischer Liebesbrief"
      },
      {
        title: "10 Gründe warum ich dich liebe",
        category: "Romantisch",
        contentType: "APPRECIATION",
        content: "1. Dein Lachen\n2. Deine Art zu denken\n3. Wie du Kaffee trinkst...",
        description: "Eine Liste mit Liebesgründen"
      },
      {
        title: "Unsere schönste Erinnerung",
        category: "Romantisch",
        contentType: "MEMORY",
        content: "Weißt du noch, als wir damals im Regen getanzt haben? Das war der Moment...",
        description: "Erinnerung an einen besonderen Moment"
      },
      {
        title: "Dankbarkeits-Moment",
        category: "Romantisch",
        contentType: "GRATITUDE",
        content: "Heute bin ich besonders dankbar dafür, dass du mich immer unterstützt, wenn...",
        description: "Ausdruck von Dankbarkeit"
      },
      {
        title: "Virtuelle Umarmung",
        category: "Romantisch",
        contentType: "TEXT",
        content: "*Fühl dich ganz fest gedrückt!* 🤗\nIch sende dir ganz viel Wärme und Liebe für deinen Tag.",
        description: "Eine kleine Aufmunterung"
      },

      // --- SPIELE & QUIZ ---
      {
        title: "Würdest du lieber...?",
        category: "Spiele",
        contentType: "WOULD_YOU_RATHER",
        content: "Würdest du lieber...\nA) Für immer nur noch Pizza essen können\nB) Für immer nur noch Pasta essen können?",
        description: "Entscheidungsfrage Essen"
      },
      {
        title: "Wahrheit oder Pflicht",
        category: "Spiele",
        contentType: "TRUTH_OR_DARE",
        content: "Wahrheit: Was war dein peinlichster Moment dieses Jahr?\nPflicht: Mach ein Selfie mit einem lustigen Gesicht und schick es mir!",
        description: "Klassisches Party-Spiel"
      },
      {
        title: "Advents-Quiz",
        category: "Spiele",
        contentType: "QUIZ_JSON",
        content: JSON.stringify({
          question: "Welches Rentier hat eine rote Nase?",
          options: ["Dasher", "Dancer", "Rudolph", "Vixen"],
          correctAnswer: "Rudolph"
        }),
        description: "Ein kleines Weihnachtsquiz"
      },
      {
        title: "Zwei Wahrheiten, eine Lüge",
        category: "Spiele",
        contentType: "TWO_TRUTHS_ONE_LIE",
        content: "1. Ich habe schon mal einen Knochen gebrochen.\n2. Ich kann jonglieren.\n3. Ich war schon mal in Australien.\n\nRate mal!",
        description: "Kennenlern-Spiel"
      },
      {
        title: "Emoji-Rätsel",
        category: "Spiele",
        contentType: "RIDDLE",
        content: "Errate den Film:\n👦👓⚡🧙‍♂️🦉",
        description: "Harry Potter Emoji Rätsel"
      },

      // --- KREATIV & CHALLENGES ---
      {
        title: "Foto-Challenge: Rot",
        category: "Kreativ",
        contentType: "PHOTO_CHALLENGE",
        content: "Mach heute ein Foto von etwas Rote, das dir begegnet!",
        description: "Suche nach der Farbe Rot"
      },
      {
        title: "Gemeinsame Geschichte",
        category: "Kreativ",
        contentType: "STORY_TOGETHER",
        content: "Es war einmal ein kleiner Pinguin, der unbedingt fliegen wollte. Eines Tages...",
        description: "Anfang einer Geschichte zum Weitererzählen",
        responseMode: "COLLABORATIVE"
      },
      {
        title: "Zeichne mich!",
        category: "Kreativ",
        contentType: "DRAWING",
        content: "Zeichne ein schnelles Porträt von mir (oder uns) auf einen Zettel und schick ein Foto!",
        description: "Zeichen-Aufgabe"
      },
      {
        title: "Reim-Challenge",
        category: "Kreativ",
        contentType: "TEXT",
        content: "Schreibe ein Gedicht mit 4 Zeilen über Weihnachten. Es muss sich reimen!",
        description: "Kleines Gedicht schreiben"
      },
      {
        title: "Weihnachts-Deko",
        category: "Kreativ",
        contentType: "PHOTO_CHALLENGE",
        content: "Zeig mir deine liebste Weihnachtsdeko in deiner Wohnung!",
        description: "Deko zeigen"
      },

      // --- AKTIVITÄTEN (VIRTUAL) ---
      {
        title: "Netflix Party",
        category: "Virtual",
        contentType: "MOVIE_NIGHT",
        content: "Heute Abend 20:00 Uhr? Wir schauen 'Kevin allein zu Haus' zusammen!",
        description: "Filmabend Einladung"
      },
      {
        title: "Zusammen Kochen",
        category: "Virtual",
        contentType: "COOKING_TOGETHER",
        content: "Lass uns heute Abend beide Spaghetti machen und per Video-Call zusammen essen!",
        description: "Virtuelles Dinner"
      },
      {
        title: "Online Gaming",
        category: "Virtual",
        contentType: "GAME_CHALLENGE",
        content: "Eine Runde 'Among Us' oder 'Gartic Phone' heute Abend?",
        description: "Zocken"
      },
      {
        title: "Spaziergang am Telefon",
        category: "Virtual",
        contentType: "VIRTUAL_DATE",
        content: "Geh raus spazieren, ich auch. Wir telefonieren dabei und beschreiben was wir sehen.",
        description: "Audio-Spaziergang"
      },
      {
        title: "Workout Challenge",
        category: "Virtual",
        contentType: "WORKOUT_CHALLENGE",
        content: "Wer schafft länger Planking? Video-Beweis oder Live-Battle!",
        description: "Sportliche Herausforderung"
      },

      // --- MUSIK ---
      {
        title: "Song des Tages",
        category: "Musik",
        contentType: "SPOTIFY_SONG",
        content: "https://open.spotify.com/track/0bYg9bo50gSsH3LtXe2SQn",
        description: "All I Want For Christmas Is You"
      },
      {
        title: "Playlist für uns",
        category: "Musik",
        contentType: "PLAYLIST_COLLAB",
        content: "Hier ist ein Link zu einer offenen Playlist. Füg 3 Songs hinzu, die dich an mich erinnern!",
        description: "Gemeinsame Playlist erstellen"
      },
      {
        title: "Weihnachts-Karaoke",
        category: "Musik",
        contentType: "VOICE_MESSAGE",
        content: "Sing den Refrain von 'Last Christmas' und schick mir die Sprachnachricht! Trau dich! 🎤",
        description: "Gesangs-Einlage"
      },
      {
        title: "Entspannungs-Track",
        category: "Musik",
        contentType: "SPOTIFY_SONG",
        content: "Ein Song zum Runterkommen für dich.",
        description: "Ruhige Musik"
      },
      {
        title: "Party Mix",
        category: "Musik",
        contentType: "SPOTIFY_SONG",
        content: "Dieser Song macht sofort gute Laune! Tanz eine Runde durchs Zimmer!",
        description: "Gute Laune Musik"
      },

      // --- STORY CHAIN (MEHRTÄGIG) ---
      {
        title: "Das Geheimnis - Teil 1",
        category: "Geschichten",
        contentType: "STORY_PART",
        content: "Du findest einen alten Schlüssel im Schnee. Er sieht magisch aus... (Fortsetzung folgt morgen)",
        storyChainId: "mystery_story",
        linkedToNext: true,
        description: "Teil 1 einer Geschichte"
      },
      {
        title: "Das Geheimnis - Teil 2",
        category: "Geschichten",
        contentType: "STORY_PART",
        content: "Der Schlüssel passt in eine kleine Tür an einem Baumstamm. Du öffnest sie... (Fortsetzung folgt)",
        storyChainId: "mystery_story",
        linkedToPrevious: true,
        linkedToNext: true,
        description: "Teil 2 einer Geschichte"
      },
      {
        title: "Das Geheimnis - Teil 3",
        category: "Geschichten",
        contentType: "STORY_PART",
        content: "Dahinter liegt eine Welt voller Süßigkeiten! Du hast das Weihnachtsland gefunden. Ende.",
        storyChainId: "mystery_story",
        linkedToPrevious: true,
        description: "Teil 3 einer Geschichte"
      },
      {
        title: "Wochenend-Challenge: Samstag",
        category: "Challenges",
        contentType: "TASK",
        content: "Baue heute eine Höhle aus Decken und Kissen!",
        storyChainId: "weekend_fort",
        linkedToNext: true,
        description: "Teil 1 der Wochenend-Aktion"
      },
      {
        title: "Wochenend-Challenge: Sonntag",
        category: "Challenges",
        contentType: "PHOTO_CHALLENGE",
        content: "Mach ein Foto von dir in deiner Höhle von gestern!",
        storyChainId: "weekend_fort",
        linkedToPrevious: true,
        description: "Teil 2 der Wochenend-Aktion"
      }
    ];

    // Insert Tiles
    const createdTiles = [];
    for (const t of tilesData) {
      const tile = await db.tiles.create({
        title: t.title,
        description: t.description,
        category: t.category,
        contentType: t.contentType,
        content: t.content,
        author: 'Locdoc',
        taskForB: t.responseMode === 'COLLABORATIVE' ? 'Mach mit!' : null,
        responseMode: t.responseMode || 'DISABLED',
        linkedToPrevious: t.linkedToPrevious || false,
        linkedToNext: t.linkedToNext || false,
        storyChainId: t.storyChainId || null,
        tags: null,
        isFavorite: false,
        usageCount: 0,
        assignedToDayNumber: null
      });
      createdTiles.push(tile);
    }

    // 3. Populate Days (1-24)
    // We'll distribute the created tiles across the days
    
    // Map specific tiles to specific days for the Story Chain
    const storyTiles = createdTiles.filter(t => t.storyChainId === 'mystery_story');
    const weekendTiles = createdTiles.filter(t => t.storyChainId === 'weekend_fort');
    const otherTiles = createdTiles.filter(t => !t.storyChainId);

    for (let i = 1; i <= 24; i++) {
      let selectedTile;

      // Assign Story Chain to Days 5, 6, 7
      if (i === 5) selectedTile = storyTiles[0];
      else if (i === 6) selectedTile = storyTiles[1];
      else if (i === 7) selectedTile = storyTiles[2];
      // Assign Weekend Challenge to Days 12, 13
      else if (i === 12) selectedTile = weekendTiles[0];
      else if (i === 13) selectedTile = weekendTiles[1];
      // Random others for the rest
      else {
        const randomIndex = Math.floor(Math.random() * otherTiles.length);
        selectedTile = otherTiles[randomIndex];
      }

      if (selectedTile) {
        await db.days.update(i, {
          title: selectedTile.title,
          contentTypeA: selectedTile.contentType,
          contentA: selectedTile.content,
          authorA: selectedTile.author,
          taskForB: selectedTile.taskForB,
          responseMode: selectedTile.responseMode,
          linkedToPrevious: selectedTile.linkedToPrevious,
          linkedToNext: selectedTile.linkedToNext,
          storyChainId: selectedTile.storyChainId
        });
        
        // Update usage count and assignment
        await db.tiles.update(selectedTile.id, {
            usageCount: selectedTile.usageCount + 1,
            assignedToDayNumber: i
        });
      }
    }

    return json({ success: true, message: `Created ${createdTiles.length} tiles and populated 24 days.` });
  } catch (error) {
    console.error(error);
    return json({ success: false, error: 'Seeding failed' }, { status: 500 });
  }
};
