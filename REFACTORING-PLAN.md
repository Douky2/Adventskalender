# 🔍 Phase 1: Analyse & Bestandsaufnahme

## ✅ Backup erstellt
- **Tag:** `v1.0.1-pre-refactor`
- **Datum:** 2. November 2025
- **Status:** Zu GitHub gepusht

## 📊 Content-Typen Inventar

### Gesamt: 61 Content-Typen in 10 Kategorien

#### 1️⃣ Basis (3 Typen)
- TEXT
- IMAGE_URL
- VIDEO_EMBED

#### 2️⃣ Romantisch (5 Typen)
- LOVE_LETTER
- APPRECIATION
- MEMORY
- GRATITUDE
- GRATITUDE_EXCHANGE

#### 3️⃣ Virtual (5 Typen)
- VIRTUAL_DATE
- MOVIE_NIGHT
- GAME_CHALLENGE
- COOKING_TOGETHER
- WORKOUT_CHALLENGE

#### 4️⃣ Musik (5 Typen)
- PLAYLIST_COLLAB
- COLLABORATIVE_PLAYLIST
- SPOTIFY_SONG
- VOICE_MESSAGE
- PODCAST_SHARE

#### 5️⃣ Spiele (11 Typen)
- WOULD_YOU_RATHER
- THIS_OR_THAT
- TRUTH_OR_DARE
- TWO_TRUTHS_ONE_LIE
- DEBATE_FUN
- PREDICTION_GAME
- QUESTION_EXCHANGE
- INTERACTIVE_CHOICE
- POLL
- RIDDLE
- QUIZ_JSON

#### 6️⃣ Kreativ (12 Typen)
- PHOTO_CHALLENGE
- ART_CHALLENGE
- COUPLE_CHALLENGE
- STORY_TOGETHER
- BINGO_CHALLENGE
- ROLEPLAY_SCENARIO
- COMPLIMENT_BATTLE
- SCAVENGER_HUNT
- PARALLEL_CHALLENGE
- DRAWING
- SCREENSHOT_TOUR
- MEME_COLLECTION

#### 7️⃣ Zukunft (7 Typen)
- BUCKET_LIST
- SHARED_GOAL
- DREAM_BOARD
- LIFE_GOALS
- DREAM_DATE_PLANNING
- ADVENTURE_PLAN
- WISH_LIST

#### 8️⃣ Persönlich (5 Typen)
- CHILDHOOD_STORY
- FIRST_IMPRESSION
- EMBARRASSING_MOMENT
- INSIDE_JOKE
- FAVORITE_THINGS

#### 9️⃣ Spezial (5 Typen)
- COUNTDOWN
- TIME_CAPSULE
- LETTER_TO_FUTURE
- SUNRISE_SUNSET
- PET_PHOTOS

🔟 Weiteres (3 Typen)
- RECIPE
- BOOK_RECOMMENDATION
- MAP

## 📍 Aktuelle Dateien zum Refactoring

### Hauptdateien:
1. **`src/routes/day/[dayNumber]/+page.svelte`** 
   - Geschätzte Größe: ~1500 Zeilen
   - Enthält: Riesige {#if}-Kette für alle Content-Typen
   - Problem: Schwer wartbar, viel Duplikation

2. **`src/routes/+page.svelte`** 
   - Enthält: Kalender-Grid + Dekorationen (Schneemann, Baum, etc.)
   - Problem: Vermischt Layout mit Dekoration

3. **`src/routes/admin/+page.svelte`** 
   - Geschätzte Größe: ~2500 Zeilen
   - Enthält: Content-Type Definitionen, Templates, Admin-UI
   - Zu refactoren: Settings-Logik (.env → DB)

4. **`src/routes/admin/settings/+page.svelte`**
   - Aktuell: Schreibt in .env-Datei
   - Zu ändern: DB-basierte Settings

### CSS-Analyse:
- Geschätzte Duplikation: 70-80%
- Gemeinsame Properties:
  - `padding: 2rem;`
  - `border-radius: 15px;`
  - `box-shadow: 0 4px 6px rgba(0,0,0,0.1);`
  - `border: 2px solid;`
  - Background gradients
  - Font styles

## 🎯 Fortschritt

### Phasen-Status:
1. ✅ **Phase 1: Backup & Analyse** - **ABGESCHLOSSEN** (Commit: c52b8f8)
2. ✅ **Phase 5: Dekorationen auslagern** - **ABGESCHLOSSEN** (Commit: 67207b5)
3. ✅ **Phase 3: Settings in DB** - **TEILWEISE ABGESCHLOSSEN** (Commit: 55fd42d)
4. ⏭️ **Phase 4: CSS Optimierung** (45 Min, visuell) - **BEREIT**
5. ⏭️ **Phase 2: Dynamische Komponenten** (2-3 Std, komplex) - **AUSSTEHEND**
6. ⏭️ **Phase 6: Testing** (30 Min, Abschluss) - **AUSSTEHEND**

### Was wurde erreicht:
- ✅ Git Backup-Tag erstellt (v1.0.1-pre-refactor)
- ✅ Vollständige Analyse aller 61 Content-Typen
- ✅ ChristmasDecor.svelte Komponente erstellt
- ✅ +page.svelte um 100 Zeilen reduziert (6%)
- ✅ Prisma Setting Model hinzugefügt
- ✅ Settings-Datenbank-Funktionen erstellt
- ✅ Seed.ts mit Default-Settings erweitert

### Nächste Schritte:
1. **Phase 4:** CSS-Variablen einführen + Basisklassen
2. **Phase 2:** 61 Content-Komponenten + Mapping erstellen
3. **Phase 6:** Alles testen + Performance messen

## 📈 Erwartete Verbesserungen

| Datei | Vorher | Nachher | Reduzierung |
|-------|--------|---------|-------------|
| day/[dayNumber]/+page.svelte | ~1500 Zeilen | ~100 Zeilen | **-93%** |
| CSS gesamt | ~2000 Zeilen | ~600 Zeilen | **-70%** |
| +page.svelte (Kalender) | ~1700 Zeilen | ~1200 Zeilen | **-30%** |

---

*Erstellt: 2. November 2025*  
*Letztes Update: 3. November 2025*  
*Status: Phase 1, 3 (teilweise), 5 abgeschlossen ✅*
