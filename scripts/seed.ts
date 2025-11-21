import { db } from '../src/lib/server/storage';

// Helper to generate content based on phase
function getContentForDay(day: number, variant: number) {
  const phase = day <= 8 ? 'EARLY' : day <= 16 ? 'MIDDLE' : 'LATE';
  
  const categories = ['Magie', 'Kennenlernen', 'Kreativ', 'Musik', 'Gedanken'];
  const category = categories[variant % categories.length];
  
  let title = '';
  let content = '';
  let contentType = 'TEXT';
  let description = '';
  let responseMode = 'DISABLED';

  // --- EARLY PHASE (1-8): Magic & Fun, Getting Closer ---
  if (phase === 'EARLY') {
    if (category === 'Magie') {
      const prompts = [
        "In welches Hogwarts-Haus würdest du gesteckt werden?",
        "Welche Gestalt hätte dein Patronus?",
        "Wenn du einen Zauberspruch im Alltag nutzen könntest, welcher wäre es?",
        "Butterbier oder Kürbissaft?",
        "Welches magische Tierwesen hättest du gerne als Haustier?"
      ];
      title = `Magischer Moment #${day}`;
      content = prompts[variant % prompts.length];
      contentType = 'TEXT';
      responseMode = 'OPEN';
    } else if (category === 'Kennenlernen') {
      const prompts = [
        "Was bringt dich sofort zum Lachen?",
        "Welches Buch hast du mehr als einmal gelesen?",
        "Was ist deine seltsamste Angewohnheit?",
        "Wenn du jetzt überall sein könntest, wo wärst du?",
        "Was ist dein absolutes Comfort-Food?"
      ];
      title = `Neugier #${day}`;
      content = prompts[variant % prompts.length];
      contentType = 'TEXT';
      responseMode = 'OPEN';
    } else if (category === 'Kreativ') {
      title = "Foto-Challenge";
      content = "Zeig mir etwas, das dich heute glücklich gemacht hat.";
      contentType = 'PHOTO_CHALLENGE';
      responseMode = 'OPEN';
    } else if (category === 'Musik') {
      title = "Soundtrack";
      content = "Ein Song, der gute Laune macht?";
      contentType = 'SPOTIFY_SONG';
    } else {
      title = "Gedankenspiel";
      content = "Wenn wir uns heute zufällig treffen würden, was würden wir machen?";
      contentType = 'TEXT';
      responseMode = 'OPEN';
    }
  }
  
  // --- MIDDLE PHASE (9-16): Deepening, Intense, Magical Connection ---
  else if (phase === 'MIDDLE') {
    if (category === 'Magie') {
      const prompts = [
        "Wonach würde dein Amortentia-Trank riechen? (Der Liebestrank, der nach dem riecht, was dich anzieht)",
        "Wenn wir zusammen nach Hogsmeade gehen würden, was bestellen wir?",
        "Welches magische Fach würden wir zusammen belegen?",
        "Gleis 9 3/4: Welches Abenteuer würdest du gerne mal erleben?",
        "Wenn du den Felix Felicis (Glückstrank) hättest, was würdest du heute tun?"
      ];
      title = `Zauberei #${day}`;
      content = prompts[variant % prompts.length];
      contentType = 'TEXT';
      responseMode = 'OPEN';
    } else if (category === 'Kennenlernen') {
      const prompts = [
        "Was schätzt du an Menschen am meisten?",
        "Was ist eine Eigenschaft, die dich an anderen fasziniert?",
        "Wann hast du dich das letzte Mal so richtig verstanden gefühlt?",
        "Was bringt deine Augen zum Leuchten?",
        "Was ist dir wichtiger: Ehrlichkeit oder Harmonie?"
      ];
      title = `Tiefgang #${day}`;
      content = prompts[variant % prompts.length];
      contentType = 'TEXT';
      responseMode = 'OPEN';
    } else if (category === 'Kreativ') {
      title = "Zeichne mir was";
      content = "Zeichne deinen Zauberstab (oder wie du ihn dir vorstellst)!";
      contentType = 'DRAWING';
      responseMode = 'OPEN';
    } else if (category === 'Musik') {
      title = "Vibe Check";
      content = "Ein Song, der beschreibt, wie du dich gerade fühlst.";
      contentType = 'TEXT';
      responseMode = 'OPEN';
    } else {
      title = "Wunschdenken";
      content = "Was ist etwas, das du mir schon immer mal sagen wolltest?";
      contentType = 'TEXT';
      responseMode = 'OPEN';
    }
  }
  
  // --- LATE PHASE (17-24): Flirty, Special, "Teasing Love" ---
  else {
    if (category === 'Magie') {
      const prompts = [
        "Wenn ich ein Animagus wäre, welches Tier wäre ich wohl?",
        "Würdest du mit mir das Trimagische Turnier bestreiten?",
        "Welche Erinnerung würdest du ins Denkarium geben, um sie nie zu vergessen?",
        "Wenn wir einen Unbrechbaren Schwur leisten müssten, worüber wäre er?",
        "Spiegel Nerhegeb: Was würdest du sehen, wenn du hineinschaust?"
      ];
      title = `Magische Verbindung #${day}`;
      content = prompts[variant % prompts.length];
      contentType = 'TEXT';
      responseMode = 'OPEN';
    } else if (category === 'Kennenlernen') {
      const prompts = [
        "Was magst du an mir besonders? (Sei ehrlich...)",
        "Was war ein Moment mit mir, der dir im Gedächtnis geblieben ist?",
        "Was bringt dich bei mir zum Lächeln?",
        "Wie fühlt es sich an, wenn mein Name auf deinem Handy aufleuchtet?",
        "Was ist das Verrückteste, das wir zusammen tun könnten?"
      ];
      title = `Nur wir #${day}`;
      content = prompts[variant % prompts.length];
      contentType = 'TEXT';
      responseMode = 'OPEN';
    } else if (category === 'Kreativ') {
      title = "Selfie Time";
      content = "Schick mir dein schönstes Lächeln.";
      contentType = 'PHOTO_CHALLENGE';
      responseMode = 'OPEN';
    } else if (category === 'Musik') {
      title = "Unser Song?";
      content = "Gibt es einen Song, der dich an mich erinnert?";
      contentType = 'SPOTIFY_SONG';
    } else {
      title = "Weihnachtswunsch";
      content = "Was wünschst du dir (außer Geschenken) für die nächste Zeit?";
      contentType = 'TEXT';
      responseMode = 'OPEN';
    }
  }

  return {
    title: `${title} (Var ${variant + 1})`,
    category,
    contentType,
    content,
    description: `Template für Tag ${day} - ${category}`,
    responseMode,
    tags: [`day-${day}`, `phase-${phase.toLowerCase()}`]
  };
}

async function seed() {
  console.log('Starting seed with new tone (Kennenlernen -> Exklusiv)...');
  
  try {
    // Clear existing tiles to ensure no old content remains
    if ('deleteAll' in db.tiles) {
        // @ts-ignore - we just added this method
        await db.tiles.deleteAll();
        console.log('Cleared existing templates.');
    }

    // Generate 5 templates for each day (1-24)
    const createdTiles = [];
    
    for (let day = 1; day <= 24; day++) {
      for (let i = 0; i < 5; i++) {
        const t = getContentForDay(day, i);
        
        const tile = await db.tiles.create({
          title: t.title,
          description: t.description,
          category: t.category,
          contentType: t.contentType,
          content: t.content,
          author: 'Locdoc',
          taskForB: t.responseMode !== 'DISABLED' ? 'Deine Antwort?' : null,
          responseMode: t.responseMode,
          linkedToPrevious: false,
          linkedToNext: false,
          storyChainId: null,
          tags: JSON.stringify(t.tags),
          isFavorite: false,
          usageCount: 0,
          assignedToDayNumber: null
        });
        createdTiles.push({ ...tile, dayForSeed: day, variant: i });
      }
    }

    // Assign a rotating variant to each day to ensure variety
    for (let day = 1; day <= 24; day++) {
      // Rotate through variants 0-4 based on day number
      const selectedVariant = (day - 1) % 5;
      
      // Find the tile created for this day with the selected variant
      const selectedTile = createdTiles.find(t => t.dayForSeed === day && t.variant === selectedVariant);

      if (selectedTile) {
        await db.days.update(day, {
          title: selectedTile.title.replace(/ \(Var \d+\)/, ''), // Remove variant suffix for display
          contentTypeA: selectedTile.contentType,
          contentA: selectedTile.content,
          authorA: selectedTile.author,
          taskForB: selectedTile.taskForB,
          responseMode: selectedTile.responseMode,
          linkedToPrevious: false,
          linkedToNext: false,
          storyChainId: null
        });
        
        await db.tiles.update(selectedTile.id, {
            usageCount: 1,
            assignedToDayNumber: day
        });
      }
    }

    console.log(`Created ${createdTiles.length} templates (5 per day) and populated 24 days.`);
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();
