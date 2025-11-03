# 🎄 Digitaler Adventskalender 2025

Ein interaktiver, emotionaler Adventskalender für Fernbeziehungen - vollständig gefüllt mit 24 Tagen voller Liebe, Spiel und Überraschungen.

**Erstellt für:** Locdoc 🧡 & Miss Chaos 💖

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/Douky2/Adventskalender)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.5.28-ff3e00.svg)](https://kit.svelte.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2d3748.svg)](https://www.prisma.io/)
[![Refactored](https://img.shields.io/badge/refactored-71%25%20smaller-green.svg)](https://github.com/Douky2/Adventskalender)

---

## 📖 Inhaltsverzeichnis

- [🚀 Quick Start](#-quick-start)
- [✨ Features](#-features)
- [📅 Kalender-Inhalt](#-kalender-inhalt)
- [🎨 Content-Typen](#-content-typen)
- [⚙️ Admin-Bereich](#️-admin-bereich)
- [🗄️ Datenbank](#️-datenbank)
- [🚀 Deployment](#-deployment)
- [🎯 Technologie](#-technologie)
- [� Version 2.0 Refactoring](#-version-20-refactoring)
- [�🐛 Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Installation & Setup

```bash
# Repository klonen
git clone https://github.com/Douky2/Adventskalender.git
cd Adventskalender

# Dependencies installieren
npm install

# Umgebungsvariablen einrichten (optional - hat Defaults)
cp .env.example .env
# Bearbeite .env für eigene Passwörter

# Datenbank initialisieren
npx prisma migrate dev
npx prisma db seed  # Füllt alle 24 Türchen mit Inhalt!

# Entwicklungsserver starten
npm run dev
```

### 🌐 Zugriff

| Feature | URL | Passwort | Beschreibung |
|---------|-----|----------|--------------|
| **📅 Kalender** | http://localhost:5173 | `IhrGeheimerCode2025` | Hauptkalender mit 24 Türchen |
| **⚙️ Admin-Panel** | http://localhost:5173/admin | `admin2025` | Türchen bearbeiten, Einstellungen |
| **🎮 Simulation** | http://localhost:5173/?simulation=true | - | Alle Türchen sofort verfügbar |
| **🎯 Quiz-Builder** | http://localhost:5173/admin/quiz-builder | - | Visueller Quiz-Editor |
| **🔄 Tracking Reset** | http://localhost:5173/admin/tracking | - | localStorage zurücksetzen |
| **🗄️ Prisma Studio** | http://localhost:5555 | - | Datenbank GUI (`npx prisma studio`) |

> 💡 **Tipp:** Passwörter können über .env oder im Admin-Panel unter "Einstellungen" geändert werden!

---

## ✨ Features

### 🎁 24 Türchen - Vollständig Gefüllt!

Alle Türchen sind mit echtem, emotionalem Inhalt befüllt:

| Feature | Details |
|---------|---------|
| 📖 **Mehrteilige Love Story** | Tag 4-6: Dreiteiler über "Unsere Geschichte" |
| 🚂 **Platform 9¾ Easter Egg** | Tag 9: Klicke auf ¾-Badge → Hogwarts Express! |
| 💕 **Romantische Höhepunkte** | Tag 1, 11, 20, 23, 24: Liebesbriefe & Wertschätzung |
| 🎮 **Interaktive Spiele** | Tag 2, 8, 12, 18: Dies oder Das, Quiz, Wahrheit/Pflicht |
| 🎨 **Kreative Challenges** | Tag 10, 16: Photo Challenge, Mal-Challenge |
| 🎄 **Weihnachtsfinale** | Tag 23-24: Emotional, dankbar, hoffnungsvoll |
| 🎆 **Silvester-Mission Teaser** | Tag 24: Mysteriöser Hinweis auf geheimes Türchen |

→ Vollständige Übersicht in [`KALENDER-INHALT-KOMPLETT-2025.md`](./KALENDER-INHALT-KOMPLETT-2025.md)

### 🎨 61 Content-Typen in 10 Kategorien

| Kategorie | Anzahl | Beispiele |
|-----------|--------|-----------|
| **📝 Basis** | 3 | Text, Bild, Video |
| **💕 Romantisch** | 11 | Liebesbrief, Wertschätzung, Erinnerung, Kompliment, Gedicht, Random Acts |
| **🌐 Virtual** | 5 | Discord Date, Gaming, Virtuelles Kochen, Screenshare, Watch Party |
| **🎵 Musik** | 4 | Playlist, Song, Sprachnachricht, Podcast |
| **🎮 Spiele** | 9 | Würdest du lieber, Dies oder Das, Wahrheit/Pflicht, Quiz, Bingo |
| **🎨 Kreativ** | 9 | Foto, Kunst, Meme, Collage, Video-Nachricht, Screenshot-Tour |
| **🗓️ Planung** | 7 | Bucket List, Lebensziele, Traumboard, Jahresrückblick, Dream Date |
| **📖 Persönlich** | 6 | Kindheitsgeschichte, Erster Eindruck, Inside Jokes, Lieblingsdinge |
| **🎁 Spezial** | 4 | Zeitkapsel, Countdown, Sonnenauf/-untergang, Überraschung |
| **📚 Weiteres** | 3 | Rezept, Buch-Empfehlung, Karte |

**Neue Content-Typen (2025):**
- `COZY_EVENING` - Gemütlicher Abend
- `BLANKET_BURRITO` - Decken-Burrito Tag
- `CUDDLE_QUIZ` - Kuschel-Quiz
- `RAINY_DAY` - Regentag-Programm
- `MASSAGE_COUPON` - Massage-Gutschein
- `BREAKFAST_IN_BED` - Frühstück im Bett
- `MOVIE_NEST` - Film-Nest Date
- `SLOW_MORNING` - Langsamer Morgen
- `STARGAZING` - Sternengucken
- `RANDOM_ACTS` - Zufällige Liebesbeweise
- `PARALLEL_UNIVERSE` - "Was wäre wenn" Szenarien
- `PILLOW_FORT` - Kissen-Festung Challenge

### 📝 63+ Fertige Vorlagen

Jeder Content-Typ hat eine Copy-Paste fertige Vorlage im Admin-Panel:

```svelte
<!-- Klick auf "✨ Vorlage einfügen" und die Vorlage erscheint! -->
```

**Vorlagen-Kategorien:**
- 💌 **Romantisch:** Liebesbriefe, Komplimente, Wertschätzungen
- 🎬 **Virtual Dates:** Discord Plans mit Zeitangaben & Aktivitäten
- 🎮 **Spiele:** Regeln, Fragen, Challenges
- 🛋️ **Gemütlich:** Kuschelabend-Rezepte, Cozy Day Programme
- 🌧️ **Wetter-Special:** Regentag, Schneetag, Sonnentag
- ⭐ **Romantisch-Special:** Sternengucken, Frühstück im Bett, Massage
- 📸 **Challenges:** Photo, Kunst, Kreativ
- 📖 **Story:** Kindheit, Erinnerungen, Inside Jokes

### 💬 5 Response-Modi

| Modus | Icon | Beschreibung | Verwendung |
|-------|------|--------------|------------|
| **DISABLED** | 🔒 | Keine Antwort möglich | Reine Leseinhalte, Ankündigungen |
| **OPEN** | ✅ | Person B kann jederzeit antworten | Standard-Modus, freie Kommunikation |
| **COLLABORATIVE** | 🤝 | Beide füllen gemeinsam aus | Bucket Lists, Zukunftspläne, Träume |
| **AFTER_A** | 1️⃣➡️2️⃣ | Erst A postet, dann B's Feld öffnet sich | Story Chains, aufeinander aufbauend |
| **AFTER_B** | 2️⃣➡️1️⃣ | Erst B antwortet, dann A | Reaktionen, Rückfragen |

**Beispiel: Story Chain mit AFTER_A**
```typescript
// Tag 5: Teil 2 einer Geschichte
{
  responseMode: 'AFTER_A',  // B kann erst antworten, wenn A fertig ist
  linkedToPrevious: true,   // Link zu Tag 4
  linkedToNext: true,       // Link zu Tag 6
  storyChainId: 'our-love-story'
}
```

### 📖 Story-Chains & Verlinkung

Mehrtägige Geschichten über mehrere Türchen verlinken:

```typescript
// Tag 4: Kapitel 1
{
  dayNumber: 4,
  title: '📖 Unsere Geschichte - Teil 1',
  contentTypeA: 'MEMORY',
  linkedToPrevious: false,  // Kein vorheriger Teil
  linkedToNext: true,       // Link zu Tag 5
  storyChainId: 'our-love-story'
}

// Tag 5: Kapitel 2  
{
  dayNumber: 5,
  title: '📖 Unsere Geschichte - Teil 2',
  contentTypeA: 'MEMORY',
  responseMode: 'AFTER_A',  // Erst nach Locdocs Teil öffnen
  linkedToPrevious: true,   // Link zu Tag 4
  linkedToNext: true,       // Link zu Tag 6
  storyChainId: 'our-love-story'
}

// Tag 6: Kapitel 3
{
  dayNumber: 6,
  title: '📖 Unsere Geschichte - Teil 3',
  contentTypeA: 'MEMORY',
  linkedToPrevious: true,   // Link zu Tag 5
  linkedToNext: false,      // Letzter Teil
  storyChainId: 'our-love-story'
}
```

**Visuelle Darstellung:**
```
┌─────────────────┐
│  ⬅️ Vorheriger  │
│   Teil lesen    │
└─────────────────┘
      Content
┌─────────────────┐
│  Nächster ➡️    │
│   Teil öffnen   │
└─────────────────┘
```

### 🎨 Visuelle Features

#### Design & Animationen
- ❄️ **Schneeflocken:** 50 animierte Flocken (verschiedene Größen & Geschwindigkeiten)
- 💖 **Schwebende Herzen:** 3 dezente Herzen (float-Animation)
- 🎄 **Weihnachtsbaum:** Animiert mit 10 Ornamenten
- ⛄ **Schneemann:** Mit Hut, Schal und Pfeife
- 🚂 **Hogwarts-Zug:** Mit Dampf, Magie-Glow und Sparkle-Effekten

#### Farbschema & Thema
```css
/* Hauptfarben */
--locdoc-orange: #ff9a56;      /* Locdoc 🧡 */
--miss-chaos-pink: #ff6b9d;    /* Miss Chaos 💖 */
--christmas-red: #ff6b6b;      /* Gesperrt */
--christmas-green: #56ab2f;    /* Freigeschaltet */
--dark-blue-bg: #1a1a2e;       /* Haupthintergrund */
--deep-blue: #16213e;          /* Sekundär */
--accent-blue: #0f3460;        /* Akzent */
```

#### Easter Eggs & Interaktionen

**🚂 Platform 9¾ Easter Egg:**
1. Öffne Türchen 9 (einmal besuchen)
2. Zurück zum Kalender
3. Klicke auf das ¾-Badge bei Türchen 9
4. 🎉 Hogwarts Express Modal erscheint!

**Features:**
- Animierter Zug mit Dampf
- Magischer Glow-Effekt
- Sparkle-Partikel
- "Hogwarts Express - Gleis 9¾" Text
- Schließen-Button

**Andere Interaktionen:**
- ✨ **Sparkle-Effekte:** Auf allen geöffneten Türchen
- 🎭 **Hover-Animationen:** Türchen heben sich & rotieren leicht
- 🔓 **Unlock-Glow:** Freigeschaltete Türchen pulsieren grün
- 🔒 **Lock-Shake:** Gesperrte Türchen wackeln bei Klick
- 💫 **Transition-Effects:** Smooth fade-in/out beim Öffnen

### ⚙️ Admin-Panel Features

#### 🎯 Hauptfunktionen
- **✏️ Türchen bearbeiten:** Alle 61 Content-Typen mit Vorlagen
- **⚙️ Einstellungen:** Namen, Jahr, Monat, Passwörter anpassen
- **🎮 Simulation-Modus:** Alle Türchen sofort testen
- **📋 Vorlagen-System:** 63+ fertige Templates

#### 🛠️ Tools & Verwaltung
- **🎯 Quiz-Builder:** Visueller JSON-Editor für Quizze
  - Fragen/Antworten verwalten
  - Beispiel-Quiz laden
  - JSON generieren & kopieren
- **🔄 Tracking Reset:** localStorage Daten zurücksetzen
  - Einzeln oder alle auf einmal
  - door9_visited, platform934_completed
- **🗄️ Prisma Studio:** Datenbank GUI öffnen

#### 📊 System & Backup
- **💾 Git-Tags:** v1.0.0 als Hauptspeicherpunkt
- **📝 Dokumentation:** Automatisch generiert
- **🔐 Sicherheit:** Passwort-geschützt (2-Stufen)

**Admin-Panel Layout:**
```
┌─────────────────────────────────────────┐
│  Hauptfunktionen                        │
│  [🎮 Simulation] [⚙️ Einstellungen]    │
├─────────────────────────────────────────┤
│  Tools & Verwaltung                     │
│  [🎯 Quiz Builder] [🔄 Tracking]       │
├─────────────────────────────────────────┤
│  System                                 │
│  [🗄️ Prisma Studio] [📖 Doku]         │
└─────────────────────────────────────────┘
```

---

## 📅 Kalender-Inhalt

### Übersicht aller 24 Tage

| Tag | Titel | Typ | Highlights |
|-----|-------|-----|------------|
| 1 | 💌 Der Beginn unserer Reise | LOVE_LETTER | Romantischer Einstieg |
| 2 | ⚡ Schnelle Entscheidungen | THIS_OR_THAT | Kollaborativ! |
| 3 | 🎨 Unsere Bucket List | SHARED_GOAL | Zukunftsträume |
| 4 | 📖 Unsere Geschichte - Teil 1 | MEMORY | Story-Start |
| 5 | 📖 Unsere Geschichte - Teil 2 | MEMORY | Story-Mitte |
| 6 | 📖 Unsere Geschichte - Teil 3 | MEMORY | Story-Ende |
| 7 | 🎅 Nikolaus-Überraschung | VIRTUAL_DATE | Nikolaus-Special |
| 8 | 🎲 Würdest du lieber...? | WOULD_YOU_RATHER | Interaktiv |
| 9 | ✨ Magische Erinnerungen | MEMORY | 🚂 Easter Egg! |
| 10 | 📸 Photo Challenge | PHOTO_CHALLENGE | 7-Tage Challenge |
| 11 | 💝 11 Gründe warum ich dich liebe | LOVE_LETTER | Emotional |
| 12 | 🎮 Quiz: Wie gut kennst du mich? | QUIZ_JSON | 6 Fragen |
| 13 | ☕ Perfekter gemütlicher Abend | COZY_EVENING | Kuschelrezept |
| 14 | 🎵 Unsere Love Songs | MUSIC_PLAYLIST | 8 Songs |
| 15 | 🎊 Halbzeit-Feier! | CELEBRATION | Meilenstein |
| 16 | 🎨 Male mir etwas | CREATIVE_CHALLENGE | Kreativ |
| 17 | 💫 Sternschnuppen-Wünsche | STARGAZING | Romantisch |
| 18 | 🎯 Wahrheit oder Pflicht | TRUTH_OR_DARE | Mutig! |
| 19 | 🏠 Unsere Zukunft zusammen | LIFE_GOALS | Kollaborativ! |
| 20 | 💝 Was du für mich bist | LOVE_LETTER | Tiefgründig |
| 21 | ⏰ Countdown zu Weihnachten | COUNTDOWN | 3 Tage! |
| 22 | 🎄 Weihnachtsstimmung | COZY_EVENING | Vorbereitung |
| 23 | 💫 Danke für dieses Jahr | LOVE_LETTER | Dankbarkeit |
| 24 | 🎄 FROHE WEIHNACHTEN! | LOVE_LETTER | 🎆 Finale + Teaser |

### Emotionale Bögen

**Woche 1 (Tag 1-7):** Kennenlernen & Erinnerungen
- Romantischer Einstieg
- Spielerische Interaktionen
- Mehrteilige Love Story
- Nikolaus-Special

**Woche 2 (Tag 8-14):** Interaktion & Kreativität
- Spiele & Challenges
- Emotionale Höhepunkte
- Musik & Gemütlichkeit
- Platform 9¾ Entdeckung

**Woche 3 (Tag 15-21):** Vertiefung & Zukunft
- Halbzeit-Feier
- Kreative Challenges
- Zukunftspläne
- Countdown beginnt

**Woche 4 (Tag 22-24):** Finale & Ausblick
- Weihnachtsstimmung aufbauen
- Dankbarkeit ausdrücken
- Großes Finale
- Silvester-Mission Teaser

### Besondere Momente

🔥 **Höhepunkte:**
1. **Tag 1:** Erster Liebesbrief - setzt den Ton
2. **Tag 6:** Ende der Love Story - emotional
3. **Tag 9:** Platform 9¾ - magisch
4. **Tag 15:** Halbzeit - Reflexion
5. **Tag 20:** Was du für mich bist - tiefgründig
6. **Tag 24:** Weihnachtsfinale - Klimax

📖 **Story-Ketten:**
- **Tag 4-6:** "Unsere Geschichte" (3-Teiler)
- **Tag 23-24:** Danke → Weihnachten (2-Teiler)

🎮 **Interaktive Tage:**
- **Tag 2, 19:** Kollaborativ (beide füllen aus)
- **Tag 8, 12, 18:** Spiele & Quiz
- **Tag 10, 16:** Challenges

---

## 🎨 Content-Typen

### Vollständige Liste (61 Typen)

<details>
<summary><strong>📝 Basis (3)</strong></summary>

- `TEXT` - Einfacher Text
- `IMAGE` - Bild mit Beschreibung
- `VIDEO` - Video-Link mit Text
</details>

<details>
<summary><strong>💕 Romantisch (11)</strong></summary>

- `LOVE_LETTER` - Liebesbrief
- `APPRECIATION` - Wertschätzung
- `MEMORY` - Gemeinsame Erinnerung
- `COMPLIMENT` - Komplimente
- `POEM` - Gedicht
- `FUTURE_LETTER` - Brief an zukünftiges Ich
- `LOVE_LANGUAGE` - Love Languages
- `GRATITUDE` - Dankbarkeit
- `ROMANTIC_QUOTE` - Romantisches Zitat
- `LOVE_NOTES` - Kleine Liebesnotizen
- `RANDOM_ACTS` - Zufällige Liebesbeweise
</details>

<details>
<summary><strong>🌐 Virtual (5)</strong></summary>

- `VIRTUAL_DATE` - Virtual Date Plan
- `DISCORD_DATE` - Discord Screenshare Date
- `GAMING` - Gaming-Session
- `VIRTUAL_COOKING` - Virtuell zusammen kochen
- `WATCH_PARTY` - Gemeinsam Film schauen
</details>

<details>
<summary><strong>🎵 Musik & Audio (4)</strong></summary>

- `MUSIC_PLAYLIST` - Playlist teilen
- `SONG` - Ein besonderer Song
- `VOICE_MESSAGE` - Sprachnachricht
- `PODCAST` - Podcast-Empfehlung
</details>

<details>
<summary><strong>🎮 Spiele (9)</strong></summary>

- `WOULD_YOU_RATHER` - Würdest du lieber
- `THIS_OR_THAT` - Dies oder Das
- `TRUTH_OR_DARE` - Wahrheit oder Pflicht
- `QUIZ` - Quiz über Person
- `QUIZ_JSON` - Quiz (JSON-Format)
- `RIDDLE` - Rätsel
- `CHALLENGE` - Challenge/Wette
- `COUPLE_BINGO` - Paar-Bingo
- `NEVER_HAVE_I_EVER` - Ich habe noch nie
</details>

<details>
<summary><strong>🎨 Kreativ & Challenges (9)</strong></summary>

- `PHOTO_CHALLENGE` - Foto-Challenge
- `ART` - Zeichnung/Kunst
- `MEME` - Meme erstellen
- `COLLAGE` - Foto-Collage
- `VIDEO_MESSAGE` - Video-Nachricht
- `SCREENSHOT_TOUR` - Screenshot-Tour
- `CREATIVE_CHALLENGE` - Kreative Aufgabe
- `DOODLE` - Gekritzel/Skizze
- `VOICE_MEMO` - Sprach-Memo
</details>

<details>
<summary><strong>🗓️ Planung & Zukunft (7)</strong></summary>

- `BUCKET_LIST` - Bucket List
- `SHARED_GOAL` - Gemeinsames Ziel
- `LIFE_GOALS` - Lebensziele
- `DREAM_BOARD` - Traum-Board
- `YEAR_REVIEW` - Jahresrückblick
- `COUNTDOWN` - Countdown
- `DREAM_DATE` - Traumdate planen
</details>

<details>
<summary><strong>📖 Persönlich (6)</strong></summary>

- `CHILDHOOD_STORY` - Kindheitsgeschichte
- `FIRST_IMPRESSION` - Erster Eindruck
- `INSIDE_JOKES` - Inside Jokes
- `FAVORITE_THINGS` - Lieblingsdinge
- `PERSONAL_QUESTION` - Persönliche Frage
- `DEEP_TALK` - Tiefgründiges Gespräch
</details>

<details>
<summary><strong>🎁 Spezial (4)</strong></summary>

- `TIME_CAPSULE` - Zeitkapsel
- `SURPRISE` - Überraschung
- `SUNRISE_SUNSET` - Sonnenauf/-untergang
- `CELEBRATION` - Feier/Meilenstein
</details>

<details>
<summary><strong>📚 Weiteres (3)</strong></summary>

- `RECIPE` - Rezept
- `BOOK_RECOMMENDATION` - Buch-Empfehlung
- `MAP` - Karte (Orte markieren)
</details>

<details>
<summary><strong>🛋️ Gemütlich & Cozy (9)</strong></summary>

- `COZY_EVENING` - Gemütlicher Abend
- `BLANKET_BURRITO` - Decken-Burrito Tag
- `CUDDLE_QUIZ` - Kuschel-Quiz
- `RAINY_DAY` - Regentag-Programm
- `MASSAGE_COUPON` - Massage-Gutschein
- `BREAKFAST_IN_BED` - Frühstück im Bett
- `MOVIE_NEST` - Film-Nest Date
- `SLOW_MORNING` - Langsamer Morgen
- `STARGAZING` - Sternengucken
- `PILLOW_FORT` - Kissen-Festung
- `PARALLEL_UNIVERSE` - Alternative Szenarien
</details>

---

## ⚙️ Admin-Bereich

### 🆕 Version 2.0 Admin Features

#### 👁️ **Live-Vorschau System**
- **In-Editor Vorschau:** Toggle mit "👁️ Vorschau" Button
- **Zeigt exakt wie Kalenderseite:** Gleiche Komponenten, Styles
- **Person A + B Boxen:** Orange (Locdoc) & Pink (Miss Chaos)
- **Live-Tab Vorschau:** `🚀 Live-Vorschau in neuem Tab öffnen`
  - Öffnet Tag mit `?simulation=true` Parameter
  - Immer entsperrt - teste alles sofort!
  - Perfekt für Quiz-Tests & interaktive Inhalte

#### 📚 **Story-Chain-Übersicht**
Erscheint automatisch wenn verbundene Tage existieren:

```
📚 Mehrtägige Zusammenhänge & Story-Ketten
├─ 🔗 Story: weihnachtsgeschichte (4 Tage)
│  ├─ Tag 1 → Tag 2 → Tag 3 → Tag 4
│  └─ [👁️ Alle Tage dieser Kette anschauen]
│
└─ 🔗 Verbundene Tage (3 Tage)
   ├─ Tag 10 → Tag 11 ✅ → Tag 12
   └─ [👁️ Alle Tage dieser Kette anschauen]
```

**Features:**
- Klickbare Timeline-Karten → springt direkt zum Editor
- Grüne ✅ Badges = Person B hat geantwortet
- Batch-Vorschau = alle Tage einer Kette in separaten Tabs öffnen
- Auto-Erkennung via `linkedToPrevious/Next` oder `storyChainId`

#### 📝 **Template-System (132+ Vorlagen)**
Jeder Content-Type mit Vorlage zeigt:
```
┌────────────────────────────────┐
│ 📝 Vorlage verfügbar!          │
│ [✨ Vorlage einfügen & anpassen]│
│ Klicke um eine fertige Vorlage│
│ zu laden, die du dann         │
│ personalisieren kannst!       │
└────────────────────────────────┘
```

**Vorlage-Kategorien:**
- 💌 Romantisch (10+) - Liebesbriefe, Wertschätzung
- 🎬 Virtual Dates (8+) - Discord, Gaming, Kochen
- 🎮 Spiele (15+) - Quizze, Challenges, Debates
- 🛋️ Gemütlich (10+) - Cozy evenings, Kuscheltage
- 🎨 Kreativ (12+) - Foto/Kunst Challenges
- 📖 Story (8+) - Erinnerungen, Geschichten
- 🎯 Zukunft (10+) - Bucket Lists, Träume, Ziele
- 🌟 Spezial (10+) - Zeitkapseln, Überraschungen

#### 🛠️ **Builder Tools**
Zugriff über Admin-Header:

1. **📝 Template Builder** (`/admin/template-builder`)
   - Durchsuche alle 132+ Vorlagen
   - Nach Kategorie gefiltert
   - Copy-to-Clipboard Funktion

2. **📖 Story Chain Builder** (`/admin/story-chain-builder`)
   - Plane mehrtägige Geschichten visuell
   - Generiert TypeScript-Code zum Kopieren
   - Konfiguriere linkedToPrevious/Next/storyChainId

3. **🎯 Quiz-Builder** (`/admin/quiz-builder`)
   - Erstelle Quizze mit Editor
   - JSON-Validator
   - Live-Vorschau

### Hauptfunktionen

#### ✏️ Türchen bearbeiten

1. Gehe zu `/admin`
2. Klicke "✏️ Bearbeiten" bei einem Türchen
3. Wähle Content-Typ aus Dropdown (61 verfügbar)
4. Klicke "✨ Vorlage einfügen" (falls verfügbar)
5. **Person A (Locdoc):**
   - Content-Typ A wählen
   - Inhalt A schreiben
   - Autor A setzen
6. **Person B (Miss Chaos) - Optional:**
   - Content-Typ B wählen  
   - Inhalt B schreiben
   - Autor B setzen
7. **Response-Mode** wählen
8. **Story-Verlinkung** (optional):
   - `linkedToPrevious` aktivieren
   - `linkedToNext` aktivieren
   - `storyChainId` eingeben
9. **Speichern!**

**Vorlagen nutzen:**
```
Wenn Content-Typ Vorlage hat:
┌──────────────────────────────┐
│ 📝 Vorlage verfügbar!        │
│ [✨ Vorlage einfügen]        │
└──────────────────────────────┘
    ↓ Klick
┌──────────────────────────────┐
│ Textfeld mit Vorlage gefüllt│
│ Platzhalter: [Name], [...]  │
└──────────────────────────────┘
```

#### ⚙️ Einstellungen ändern

1. Klicke auf "⚙️ Einstellungen" im Admin-Header
2. **Personen-Namen:**
   ```
   AUTHOR_A: Locdoc
   AUTHOR_B: Miss Chaos
   ```
3. **Kalender-Konfiguration:**
   ```
   CALENDAR_YEAR: 2025
   CALENDAR_MONTH: 11  (0-11, wobei 11 = Dezember)
   ```
4. **Passwörter:**
   ```
   CALENDAR_PASSWORD: IhrGeheimerCode2025
   ADMIN_PASSWORD: admin2025
   ```
5. **Speichern** → Server neu starten!

**Wichtig:** Nach Änderung von Einstellungen muss der Server neu gestartet werden:
```bash
# Strg+C zum Beenden
npm run dev
```

#### 🎮 Simulation-Modus

```
http://localhost:5173/?simulation=true
```

**Features:**
- Alle 24 Türchen sofort freigeschaltet
- Umgeht Datums-Check
- Perfekt zum Testen
- Keine Änderungen an DB nötig

**Verwendung:**
1. Im Admin: Klicke "🎮 Simulation Modus"
2. Oder: URL manuell `?simulation=true` anhängen
3. Alle Türchen sind grün und klickbar
4. Normale Funktionalität bleibt erhalten

### Tools & Verwaltung

#### 🎯 Quiz-Builder

Visueller Editor zum Erstellen von QUIZ_JSON Content:

**URL:** http://localhost:5173/admin/quiz-builder

**Features:**
- ➕ Fragen hinzufügen/entfernen
- ✏️ Antworten bearbeiten
- ✅ Korrekte Antwort markieren
- 📋 JSON generieren
- 📄 In Zwischenablage kopieren
- 💡 Beispiel-Quiz laden

**Workflow:**
1. Öffne Quiz-Builder
2. Klicke "Frage hinzufügen"
3. Gib Fragetext ein
4. Füge 2-4 Antworten hinzu
5. Markiere korrekte Antwort (Radio-Button)
6. Wiederhole für alle Fragen
7. Klicke "JSON generieren"
8. Klicke "In Zwischenablage kopieren"
9. Gehe zu Admin → Türchen bearbeiten
10. Wähle Content-Typ "QUIZ_JSON"
11. Füge JSON ein
12. Speichern!

**Beispiel-Output:**
```json
{
  "title": "Wie gut kennst du mich?",
  "questions": [
    {
      "question": "Was ist meine Lieblingsfarbe?",
      "options": ["Rot", "Blau", "Grün", "Gelb"],
      "correctAnswer": 1
    }
  ]
}
```

#### 🔄 Tracking Reset

localStorage Daten zurücksetzen:

**URL:** http://localhost:5173/admin/tracking

**Verfügbare Daten:**
- `door9_visited` - Türchen 9 besucht
- `platform934_completed` - Platform 9¾ Easter Egg gefunden

**Aktionen:**
- **Einzeln Reset:** Klicke "Löschen" neben Eintrag
- **Alle Reset:** Klicke "Alle zurücksetzen" (mit Bestätigung)

**Verwendung:**
- Easter Egg erneut testen
- Türchen-Status zurücksetzen
- Nach Demo wieder auf Anfang

---

## 🗄️ Datenbank

### Prisma Schema

```prisma
model Day {
  id               Int      @id @default(autoincrement())
  dayNumber        Int      @unique
  title            String
  
  // Person A (Locdoc)
  contentTypeA     String?
  contentA         String?
  authorA          String?
  
  // Person B (Miss Chaos)
  contentTypeB     String?
  contentB         String?
  authorB          String?
  taskForB         String?
  
  // Response-Modus
  responseMode     String   @default("OPEN")
  
  // Story-Verlinkung
  linkedToPrevious Boolean  @default(false)
  linkedToNext     Boolean  @default(false)
  storyChainId     String?
  
  // Ergebnis
  combinedResult   String?
  resultGenerated  Boolean  @default(false)
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

### Prisma Studio

GUI zum direkten Bearbeiten der Datenbank:

```bash
npx prisma studio
```

→ http://localhost:5555

**Features:**
- Alle 24 Türchen sehen
- Inhalte direkt bearbeiten
- Felder hinzufügen/löschen
- Filtern & Sortieren
- JSON-Daten bearbeiten

### Migrations

```bash
# Neue Migration erstellen
npx prisma migrate dev --name beschreibung

# Migration auf Produktion
npx prisma migrate deploy

# Prisma Client regenerieren
npx prisma generate
```

### Datenbank Reset

```bash
# ⚠️ VORSICHT: Löscht alle Daten!
npx prisma migrate reset

# Danach automatisch:
# 1. Datenbank neu erstellt
# 2. Migrations angewendet
# 3. Seed ausgeführt (24 Türchen wieder da!)
```

### Seed-Datei

**Datei:** `prisma/seed.ts`

**Inhalt:** Alle 24 Türchen mit vollständigem Content

**Ausführen:**
```bash
npx tsx prisma/seed.ts
```

**Backup:**
- `prisma/seed.backup.ts` - Backup vor großen Änderungen

---

## 🚀 Deployment

### Lokaler Server (Entwicklung)

```bash
# Entwicklungsserver mit Hot-Reload
npm run dev

# Port: 3000 (default)
# URL: http://localhost:5173
```

### Production Build

```bash
# 1. Build erstellen
npm run build

# 2. Production Server starten
node build/index.js

# Oder mit benutzerdef. Port:
PORT=8080 node build/index.js
```

### Linux Server Deployment

#### Voraussetzungen
- Node.js 20+
- Git
- PM2 (optional, empfohlen)

#### Setup-Schritte

```bash
# 1. Repository klonen
git clone https://github.com/Douky2/Adventskalender.git
cd Adventskalender

# 2. Dependencies
npm install

# 3. Umgebungsvariablen
cp .env.example .env
nano .env  # Passwörter setzen!

# 4. Datenbank
npx prisma migrate deploy
npx prisma db seed

# 5. Build
npm run build

# 6. Starten (Option A: Direkt)
node build/index.js

# 6. Starten (Option B: Mit PM2 - empfohlen)
npm install -g pm2
pm2 start build/index.js --name adventskalender
pm2 save
pm2 startup  # Auto-Start bei Reboot
```

#### PM2 Befehle

```bash
# Status
pm2 status

# Logs
pm2 logs adventskalender

# Restart
pm2 restart adventskalender

# Stop
pm2 stop adventskalender

# Delete
pm2 delete adventskalender
```

### Nginx Reverse Proxy

**Datei:** `/etc/nginx/sites-available/adventskalender`

```nginx
server {
    listen 80;
    server_name deine-domain.de;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Aktivieren:**
```bash
sudo ln -s /etc/nginx/sites-available/adventskalender /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL mit Let's Encrypt (optional)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d deine-domain.de
```

---

## 🎯 Technologie

### Tech-Stack

| Komponente | Technologie | Version |
|------------|-------------|---------|
| **Frontend** | SvelteKit | 2.5.28 |
| **Backend** | Node.js | 20+ |
| **Datenbank** | SQLite + Prisma | 5.22.0 |
| **Auth** | Cookie-based | Custom |
| **Styling** | Custom CSS | - |
| **Build** | Vite | 5.4.21 |
| **Deployment** | @sveltejs/adapter-node | Latest |

### Projektstruktur

```
Adventskalender/
├── prisma/
│   ├── schema.prisma          # DB-Schema
│   ├── seed.ts                # 24 Türchen Seeding
│   ├── seed.backup.ts         # Backup
│   ├── dev.db                 # SQLite Datenbank
│   └── migrations/            # DB Migrations
├── src/
│   ├── routes/
│   │   ├── +page.svelte       # Hauptkalender (1600 Zeilen)
│   │   ├── +layout.svelte     # Layout
│   │   ├── admin/
│   │   │   ├── +page.svelte   # Admin-Panel
│   │   │   ├── settings/      # Einstellungen (DB-backed)
│   │   │   ├── quiz-builder/  # Quiz-Builder
│   │   │   ├── tracking/      # Tracking Reset
│   │   │   └── login/         # Admin Login
│   │   ├── day/[dayNumber]/
│   │   │   └── +page.svelte   # Einzelne Türchen (410 Zeilen, war 1403!)
│   │   └── login/
│   │       └── +page.svelte   # Login
│   └── lib/
│       ├── components/
│       │   ├── ChristmasDecor.svelte  # Weihnachts-Dekorationen
│       │   └── content-types/         # 66 dynamische Content-Komponenten
│       │       ├── TEXT.svelte
│       │       ├── IMAGE_URL.svelte
│       │       ├── VIDEO_EMBED.svelte
│       │       ├── LOVE_LETTER.svelte
│       │       ├── GenericContent.svelte  # Universal-Fallback
│       │       └── index.ts           # Component Mapping
│       ├── auth.ts            # Auth Logic
│       └── server/
│           ├── db.ts          # Prisma Client
│           └── settings.ts    # Database Settings Helper
├── static/                    # Statische Assets
├── .env                       # Umgebungsvariablen
├── .env.example               # Env Template
├── package.json               # Dependencies
├── vite.config.ts             # Vite Config
├── svelte.config.js           # Svelte Config
├── KALENDER-INHALT-KOMPLETT-2025.md  # Content-Doku
├── KALENDER-INHALT-2025.md    # Content-Overview
└── README.md                  # Diese Datei
```

### Dependencies

**Haupt-Dependencies:**
```json
{
  "@prisma/client": "^5.22.0",
  "@sveltejs/adapter-node": "^latest",
  "@sveltejs/kit": "^2.5.28",
  "svelte": "^4.2.19"
}
```

**Dev-Dependencies:**
```json
{
  "prisma": "^5.22.0",
  "tsx": "^4.7.0",
  "typescript": "^5.0.0",
  "vite": "^5.4.21"
}
```

---

## � Version 2.0 Refactoring

### ✨ Was ist neu in Version 2.0?

**Version 2.0.0** (November 2025) bringt massive Code-Verbesserungen ohne Content-Änderungen:

#### 🏆 Achievements:
- **71% Code-Reduktion** in `day/[dayNumber]/+page.svelte` (1403 → 410 Zeilen)
- **35% Gesamt-Reduktion** im gesamten Projekt (-1093 Zeilen)
- **66 dynamische Content-Komponenten** statt 463-Zeilen if-chain
- **Database-backed Settings** - keine .env-Dateien mehr bearbeiten
- **Kein Server-Neustart** mehr nötig bei Settings-Änderungen

#### 📦 Neue Architektur:

**1. Dynamic Component System (Phase 2)**
```typescript
// Vorher: 463 Zeilen if-else if-chain 😱
if (contentTypeA === 'TEXT') { ... }
else if (contentTypeA === 'IMAGE_URL') { ... }
// ... 61 weitere Typen ...

// Nachher: 1 Zeile! 🎉
<svelte:component this={getContentComponent(contentTypeA)} {...props} />
```

**2. Database Settings (Phase 3)**
- Admin Settings jetzt in SQLite statt .env
- Änderungen sofort aktiv (kein `npm run dev` restart)
- Simulation Mode als Toggle im Admin-Panel

**3. Christmas Decorations Component (Phase 5)**
- Alle Schneeflocken, Herzen, etc. in `ChristmasDecor.svelte`
- -100 Zeilen aus Hauptkalender
- Saubere Separation of Concerns

**4. CSS Optimization (Phase 4)**
- 432 Zeilen obsoleter CSS entfernt
- Content-Typ Styling in Komponenten verschoben
- Maintainability drastisch verbessert

#### 🔧 Migration von v1.0 zu v2.0:

**Automatisch kompatibel!** Keine Breaking Changes:
- Alle Content-Typen funktionieren weiter
- Datenbank-Schema erweitert (Settings Tabelle)
- .env kann bleiben (wird nur nicht mehr für Admin-Settings genutzt)

```bash
# Update durchführen
git pull origin main
npm install
npx prisma migrate dev  # Fügt Settings-Tabelle hinzu
npm run dev
```

#### 📊 Performance & Maintainability:

| Metrik | Vorher | Nachher | Verbesserung |
|--------|--------|---------|--------------|
| **day/[dayNumber]/+page.svelte** | 1403 Zeilen | 410 Zeilen | **-71%** 🎉 |
| **Hauptkalender (+page.svelte)** | ~1700 Zeilen | 1600 Zeilen | **-6%** |
| **If-Chain Komplexität** | 463 Zeilen | 1 Zeile | **-99.8%** ⭐ |
| **CSS Bloat** | 432 Zeilen unused | 0 Zeilen | **-100%** |
| **Settings Management** | .env editing | Database UI | **∞ besser** 💾 |

→ Vollständige Refactoring-Dokumentation in [`REFACTORING-PLAN.md`](./REFACTORING-PLAN.md)

---

## �🐛 Troubleshooting

### Server startet nicht

**Problem:** Port bereits belegt

```bash
# Windows (PowerShell)
Get-Process node | Stop-Process -Force

# Linux/Mac
killall node
# oder
lsof -ti:3000 | xargs kill -9
```

**Problem:** Dependencies fehlen

```bash
rm -rf node_modules package-lock.json
npm install
```

### Datenbank-Fehler

**Problem:** Migration failed

```bash
# Prisma Client neu generieren
npx prisma generate

# Datenbank neu aufsetzen
npx prisma migrate reset
```

**Problem:** Seed schlägt fehl

```bash
# Mit tsx statt node
npx tsx prisma/seed.ts

# Datenbank vorher leeren
npx prisma migrate reset --skip-seed
npx tsx prisma/seed.ts
```

### Türchen öffnet sich nicht

**Problem:** Datum ist falsch

- Prüfe Systemdatum
- Oder nutze Simulation-Modus: `?simulation=true`

**Problem:** Türchen ist nicht freigeschaltet

```typescript
// In seed.ts:
// Monat 11 = Dezember (0-basiert!)
new Date(2025, 11, 1)  // 1. Dezember
new Date(2025, 11, 24) // 24. Dezember
```

### Platform 9¾ funktioniert nicht

**Problem:** Easter Egg erscheint nicht

1. Öffne Türchen 9 mindestens einmal
2. Zurück zum Kalender
3. Klicke auf ¾-Badge (nicht Türchen!)

**Reset:**
```
http://localhost:5173/admin/tracking
→ "door9_visited" löschen
→ "platform934_completed" löschen
```

### Login funktioniert nicht

**Problem:** Passwort falsch

```bash
# .env prüfen
cat .env

# Defaults:
CALENDAR_PASSWORD=IhrGeheimerCode2025
ADMIN_PASSWORD=admin2025
```

**Problem:** Cookie nicht gesetzt

- Cookies im Browser aktivieren
- Private Mode deaktivieren
- Browser-Cache leeren

### Build-Fehler

**Problem:** TypeScript Fehler

```bash
# TypeScript ignorieren (nicht empfohlen)
npm run build -- --no-typecheck

# Oder Fehler fixen
npm run check
```

**Problem:** Adapter-Fehler

```bash
# Adapter neu installieren
npm install -D @sveltejs/adapter-node
```

---

## 📊 Statistiken

### Content

- **24** Türchen (alle gefüllt!)
- **61** Content-Typen
- **63+** Vorlagen
- **10** Kategorien
- **5** Response-Modi

### Code

- **~4000** Zeilen SvelteKit Code
- **~1000** Zeilen TypeScript (Seed)
- **~2000** Zeilen CSS
- **3** Hauptrouten (Kalender, Admin, Day)

### Features

- **2** Personen-System (Locdoc & Miss Chaos)
- **1** Easter Egg (Platform 9¾)
- **3** Story-Chains (Tag 4-6)
- **2** Passwort-Ebenen (Kalender + Admin)
- **∞** Liebe 💖

---

## 💝 Credits

**Erstellt mit ❤️ für Fernbeziehungen**

- **Für:** Locdoc 🧡 & Miss Chaos 💖
- **Von:** Douky2
- **Jahr:** 2025
- **Zweck:** Liebe über Distanz teilen

### Tech-Credits

- **SvelteKit** - Framework
- **Prisma** - Database ORM
- **Vite** - Build Tool
- **SQLite** - Database
- **GitHub** - Version Control

---

## 📝 Lizenz

Dieses Projekt ist für den privaten Gebrauch erstellt.

---

## 🎁 Happy Holidays!

**Frohe Weihnachten! 🎄✨**

Möge dieser Adventskalender eure Fernbeziehung noch stärker machen und euch jeden Tag ein Lächeln ins Gesicht zaubern!

**Mit Liebe entwickelt** 💖🧡

---

*Letzte Aktualisierung: 2. November 2025*  
*Version: 1.0.0*  
*Git-Tag: v1.0.0*
