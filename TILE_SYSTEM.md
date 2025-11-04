# 🎨 Tile Management System

Das **Tile Management System** ist ein ausgeklügeltes WYSIWYG-System zur einfachen Erstellung und Verwaltung von wiederverwendbaren Content-Bausteinen für deinen Adventskalender.

## 📋 Übersicht

### Was sind Tiles?

Tiles sind **wiederverwendbare Content-Bausteine**, die unabhängig vom Kalender gespeichert werden. Jede Tile enthält:
- 📝 Einen Titel und Beschreibung
- 🎨 Content-Typ (z.B. Gedicht, Brief, Quiz)
- ✍️ Den eigentlichen Inhalt
- 🎯 Optional: Aufgaben für Person B
- 🔗 Optional: Story Chain-Verbindungen
- 🏷️ Tags für die Suche

### Vorteile

✅ **Wiederverwendbar** - Erstelle einmal, nutze mehrfach  
✅ **WYSIWYG** - Live-Vorschau beim Bearbeiten  
✅ **Organisiert** - Kategorien, Tags, Favoriten  
✅ **Flexibel** - Entwürfe speichern ohne Zuweisung  
✅ **Versioniert** - Timestamps für Änderungen  

## 🗺️ Navigation

Das Tile-System besteht aus 5 Hauptbereichen:

```
/admin/tiles                → Tile Library (Übersicht aller Tiles)
/admin/tiles/new            → Neue Tile erstellen
/admin/tiles/[id]/edit      → Tile bearbeiten
/admin/tiles/bulk           → Bulk-Operationen (mehrere Tiles)
/admin/calendar-manager     → Calendar Manager (Drag & Drop)
```

### 1. 🎨 Tile Library

**Hauptseite zur Verwaltung aller Tiles**

**Features:**
- 🔍 **Suche** nach Titel, Beschreibung oder Tags
- 📂 **Kategoriefilter** (Romantisch, Spiele, Kreativ, etc.)
- ⭐ **Favoritenfilter** - Nur bevorzugte Tiles anzeigen
- 📦 **Verfügbarkeitsfilter** - Nur nicht zugewiesene Tiles
- 📊 **Statistiken** - Gesamt, Favoriten, Verfügbar, Zugewiesen
- 👁️ **Quick Preview** - Schnelle Vorschau
- ✏️ **Quick Edit** - Direkt bearbeiten
- 📋 **Duplizieren** - Tile als Vorlage kopieren
- 🗑️ **Löschen** mit Bestätigung

**Tile-Karten zeigen:**
- Icon des Content-Typs
- Titel und Beschreibung
- Kategorie und Typ-Badge
- Story Chain-Indikator (🔗)
- Zuweisungs-Status (📅 Tag X)
- Tags
- Verwendungsanzahl (📊)
- Letztes Änderungsdatum (🕒)

### 2. ✏️ Tile Editor (WYSIWYG)

**Split-Screen Editor mit Live-Vorschau**

#### Linke Seite: Editor

**📋 Basis-Informationen**
- **Titel** (Pflicht)
- **Beschreibung** (Optional, für Library-Übersicht)
- **Kategorie** (Romantisch, Spiele, Kreativ, etc.)
- **Autor** (Dein Name)

**🎨 Content-Typ Selector**

Visueller Selector mit Icons für 18+ Typen:
- 📝 Text
- 📖 Geschichte
- ✍️ Gedicht
- 💌 Brief
- 💭 Zitat
- ❓ Fragespiel
- 🧩 Rätsel
- ✅ Aufgabe
- 🎯 Challenge
- 🍪 Rezept
- 🎬 Film-Abend
- 🎵 Playlist
- 📷 Foto
- 🎥 Video
- 🎫 Gutschein
- 🎁 Überraschung
- 💫 Erinnerung
- ⭐ Wunsch

**✍️ Inhalt**
- Großes Textarea für Content
- Markdown-Unterstützung
- Hilfe-Hinweise

**🎯 Interaktion**
- **Aufgabe für Person B** (Optional)
- **Antwort-Modus:**
  - 🚫 Keine Antwort
  - ✉️ Freie Antwort
  - 🤝 Zusammenarbeit
  - ☑️ Auswahloptionen

**🔗 Story Chain**
- ☑️ Mit vorherigem Tag verknüpft
- ☑️ Mit nächstem Tag verknüpft
- Story Chain ID (für Gruppierung)

**🏷️ Tags**
- Kommagetrennte Tags für Suche

**📚 Template Browser**
- Button öffnet Template-Auswahl
- Vordefinierte Vorlagen für schnellen Start
- Templates nach Kategorie gruppiert
- Ein Klick übernimmt Vorlage

#### Rechte Seite: Live Preview

**👁️ Echtzeit-Vorschau**

Zeigt **exakt**, wie die Tile im Kalender aussehen wird:
- ✅ Gleicher Rendering-Code wie Kalender
- 🔄 Updates in Echtzeit beim Tippen
- 🎨 Gleiche Styles wie Produktivansicht
- 📱 Responsive Darstellung

**Metadaten-Anzeige:**
- Kategorie
- Content-Typ mit Icon
- Autor
- Story Chain-Status

### 3. 📚 Templates

Der Editor bietet **vorgefertigte Templates** für häufige Szenarien:

**Romantisch:**
- 💌 Liebesbrief-Vorlage
- 💫 Erinnerungs-Template
- 🌟 Wertschätzungs-Text

**Spiele:**
- ❓ Kennst-Du-Mich-Frage
- 🤔 Würdest-du-lieber
- 🎯 Challenge-Vorlage

**Kreativ:**
- 🍪 Plätzchen-Rezept
- 🎨 DIY-Projekt
- ✍️ Gedicht-Struktur

**Templates enthalten:**
- Vorausgefüllte Kategorie
- Passender Content-Typ
- Beispiel-Content mit Platzhaltern
- Optional: Vorkonfigurierte Aufgabe

**Verwendung:**
1. Klicke "📚 Templates" im Editor
2. Wähle gewünschtes Template
3. Template wird in Editor geladen
4. Passe Inhalt an deine Bedürfnisse an

## 🎯 Workflows

### Workflow 1: Neue Tile erstellen

```
1. Admin Panel öffnen
2. "🎨 Tile Library" klicken
3. "➕ Neue Tile erstellen" klicken
4. Titel eingeben
5. Content-Typ wählen
6. Inhalt verfassen (Vorschau live!)
7. Optional: Template als Startpunkt nutzen
8. Optional: Story Chain konfigurieren
9. Tags hinzufügen
10. "💾 Speichern" klicken
```

**Tile ist jetzt in Library verfügbar!**

### Workflow 2: Tile aus Library verwenden

```
1. Tile Library öffnen
2. Gewünschte Tile finden (Suche/Filter)
3. "✏️ Bearbeiten" klicken
4. Anpassungen vornehmen
5. In Calendar Manager ziehen (coming soon)
   ODER manuell Tag zuweisen
```

### Workflow 3: Template-basierte Erstellung

```
1. Neue Tile erstellen
2. "📚 Templates" klicken
3. Template wählen (z.B. "Liebesbrief")
4. Vorlage wird geladen
5. Platzhalter ersetzen (z.B. [DEIN NAME])
6. In Live-Vorschau prüfen
7. Speichern
```

### Workflow 4: Favoriten-System

```
1. In Library: ⭐/☆ klicken bei Tile
2. Filter "⭐ Nur Favoriten" aktivieren
3. Schneller Zugriff auf häufig genutzte Tiles
```

### Workflow 5: Tile duplizieren

```
1. Tile in Library finden
2. "📋 Duplizieren" klicken
3. Editor öffnet sich mit Kopie
4. Titel wird automatisch "(Kopie)" Suffix erhalten
5. Anpassungen vornehmen
6. Als neue Tile speichern
```

## 🗃️ Datenbank-Struktur

Tiles werden in separater Tabelle gespeichert:

```prisma
model Tile {
  id              Int      @id @default(autoincrement())
  
  // Basis
  title           String
  description     String?
  category        String   @default("Allgemein")
  
  // Content
  contentType     String
  content         String
  author          String?
  
  // Interaktion
  taskForB        String?
  responseMode    String   @default("DISABLED")
  
  // Story Chain
  linkedToPrevious Boolean @default(false)
  linkedToNext     Boolean @default(false)
  storyChainId     String?
  
  // Organisation
  tags            String?  // comma-separated
  isFavorite      Boolean  @default(false)
  usageCount      Int      @default(0)
  
  // Kalender-Zuordnung
  assignedToDayNumber Int?   @unique  // null = Library
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Wichtig:**
- `assignedToDayNumber = null` → Tile in Library (nicht zugewiesen)
- `assignedToDayNumber = 1-24` → Tile einem Tag zugewiesen
- `@unique` verhindert Doppelzuweisung

## 📊 Statistiken & Tracking

### Usage Count
Jede Tile trackt, wie oft sie verwendet wurde:
- Erhöht sich bei Zuweisung zu einem Tag
- Hilft beliebteste Tiles zu identifizieren
- Sortierung nach Popularität möglich

### Timestamps
- `createdAt` - Erstellungsdatum
- `updatedAt` - Letzte Änderung

### Filter-Optionen
- Nach Kategorie
- Nach Favoriten
- Nach Zuweisungs-Status
- Volltextsuche

## 🎨 Content-Typen

Das System unterstützt **66 verschiedene Content-Typen**.

Siehe `CONTENT_TYPES.md` für vollständige Dokumentation aller Typen mit Beispielen.

**Wichtigste Kategorien:**
- 📝 **Basis** - Text, Bilder, Videos
- 💕 **Romantisch** - Briefe, Gedichte, Erinnerungen
- 🎮 **Virtual** - Online-Dates, Gaming-Challenges
- 🎵 **Musik** - Playlists, Songs, Podcasts
- 🎯 **Spiele** - Quizze, Challenges, Rätsel
- 🎨 **Kreativ** - Rezepte, DIY, Kunst
- 🔮 **Zukunft** - Ziele, Pläne, Träume
- 💭 **Persönlich** - Geschichten, Geständnisse
- 🎁 **Spezial** - Überraschungen, Gutscheine

## 🔗 Story Chains

Tiles können Teil von **mehrtägigen Geschichten** sein:

```
Tag 5: "Winter-Märchen (Teil 1)"
  ↓ linkedToNext = true
Tag 6: "Winter-Märchen (Teil 2)"  
  ↓ linkedToNext = true
Tag 7: "Winter-Märchen (Finale)"
```

**Konfiguration:**
1. ☑️ "Mit nächstem Tag verknüpft" bei Teil 1
2. ☑️ "Mit vorherigem Tag verknüpft" bei Teil 2
3. ☑️ Beide Checkboxen bei Mittelteilen
4. Gleiche `storyChainId` für alle Teile verwenden

**Vorteile:**
- Zusammenhängende Narrative
- Automatische Visualisierung im Admin
- Besseres Storytelling über mehrere Tage

## 🚀 Phase 2 Features - JETZT VERFÜGBAR! ✅

### 📅 Calendar Manager
**Visueller Drag & Drop Kalender** (`/admin/calendar-manager`)

✅ **Grid & Timeline View** - Zwei Ansichts-Modi
- **Grid-Modus:** 6x4 Kalender-Raster, perfekt für Überblick
- **Timeline-Modus:** Lineare Liste aller 24 Tage

✅ **Drag & Drop** - Tiles einfach zuweisen
- Tile aus Sidebar ziehen
- Auf Kalender-Tag droppen
- Automatische Day-Content-Synchronisation
- Warnung bei Überschreiben

✅ **Live-Statistiken**
- Zugewiesene Tiles
- Leere Tage
- Verfügbare Tiles
- Fortschrittsbalken (% Komplett)

✅ **Tile-Sidebar**
- Durchsuchbar & filterbar
- Nach Kategorie filtern
- "Nur Verfügbare" Filter
- Direkt zu Editor verlinkt

✅ **Quick Actions**
- 👁️ Live-Vorschau (öffnet Tag mit simulation=true)
- 🗑️ Zuweisung entfernen
- ✏️ Tile bearbeiten

✅ **Auto-Fill Vorschlag**
- Intelligenter Algorithmus
- Weist verfügbare Tiles zu leeren Tagen zu
- Berücksichtigt Kategorien

✅ **Export/Import**
- 📤 Kalender-Konfiguration als JSON exportieren
- 📥 Import-Funktion (in Vorbereitung)

### � Bulk-Operationen
**Mehrere Tiles gleichzeitig bearbeiten** (`/admin/tiles/bulk`)

✅ **Auswahl-System**
- Einzelne Tiles anklicken
- "Alle auswählen" Checkbox
- Visuelle Hervorhebung
- Anzahl ausgewählter Tiles

✅ **Bulk-Aktionen:**
- 🗑️ **Löschen** - Mehrere Tiles auf einmal entfernen
- 📂 **Kategorie ändern** - Neue Kategorie für alle
- 🏷️ **Tags hinzufügen** - Tags zu bestehenden hinzufügen
- ⭐ **Favoriten** - Als Favoriten markieren/entfernen
- 📦 **Entfernen** - Von Tagen entfernen (unassign)

✅ **Tabellen-Ansicht**
- Übersichtliche Darstellung
- Sortierbare Spalten
- Alle Metadaten auf einen Blick
- Schnelle Suche

✅ **Sicherheit**
- Bestätigungs-Dialoge
- Vorschau der Änderungen
- Rückgängig-Warnung

### 🎉 Weitere neue Features

✅ **Intelligente Zuweisung**
- Tiles → Days Content-Sync
- Automatisches Usage-Count-Increment
- Story Chain-Erhaltung

✅ **Status-Tracking**
- Zuweisungs-Badges überall
- Farbcodierung (Grün = zugewiesen)
- Verfügbarkeits-Indikatoren

✅ **Nahtlose Integration**
- Alle Tools verlinkt
- Konsistente Navigation
- Einheitliches Design

## 🔮 Zukünftige Features (Roadmap)

- 🎨 **Custom Icons** - Eigene Icons für Kategorien
- 📈 **Analytics Dashboard** - Detaillierte Nutzungsstatistiken
- 🗂️ **Ordner-System** - Tiles in Ordnern organisieren
- 🔍 **Advanced Search** - Kombinierte Filter, Regex
- 📝 **Markdown Editor** - Syntax-Highlighting im Editor
- 🎬 **Multi-Preview** - Mehrere Content-Typen gleichzeitig testen
- 🤖 **AI-Suggestions** - Content-Vorschläge basierend auf Kontext
- 📅 **Multi-Calendar** - Mehrere Kalender parallel verwalten

## 💡 Best Practices

### Tile-Organisation

**Naming Convention:**
```
✅ "Romantisches Gedicht - Winterabend"
✅ "Quiz: Wie gut kennst du mich?"
✅ "Challenge Tag 15 - Backen"

❌ "Tile 1"
❌ "Test"
❌ "Gedicht"
```

**Beschreibungen schreiben:**
```
✅ "Kurzes Gedicht über unsere erste Begegnung im Schnee"
✅ "10 Multiple-Choice Fragen über unsere Beziehung"
✅ "Gemeinsames Plätzchen-Rezept für Video-Call"

❌ ""
❌ "Ein Gedicht"
❌ "Fragen"
```

**Tags richtig nutzen:**
```
✅ "romantisch, winter, gedicht, kurz"
✅ "quiz, lustig, erinnerungen, interaktiv"
✅ "rezept, backen, zusammen, video-call"

❌ "1, 2, 3"
❌ "a, b, c"
```

### Content-Erstellung

**1. Template als Startpunkt**
- Nutze vordefinierte Templates
- Spare Zeit bei Struktur
- Lerne Best Practices

**2. Live-Vorschau nutzen**
- Prüfe Formatierung sofort
- Teste verschiedene Content-Typen
- Optimiere Lesbarkeit

**3. Story Chains planen**
- Skizziere mehrtägige Narrative vorab
- Nutze gleiche storyChainId
- Teste Reihenfolge im Simulation-Modus

**4. Interaktivität einbauen**
- Nutze "Aufgabe für Person B"
- Wähle passenden Response-Mode
- Mache Content erlebbar

## 🔧 Technische Details

### API Endpoints

```typescript
POST   /api/tiles        // Neue Tile erstellen
PATCH  /api/tiles        // Tile aktualisieren
DELETE /api/tiles        // Tile löschen
```

### Server Actions

```typescript
?/delete           // Tile löschen
?/toggleFavorite   // Favoriten-Status umschalten
?/duplicate        // Tile duplizieren
?/update           // Tile aktualisieren
```

### Component Structure

```
TileEditor.svelte          // Haupt-Editor-Komponente
  ├─ Template Browser      // Template-Auswahl
  ├─ Form Sections         // Eingabefelder
  ├─ Content Type Selector // Visueller Typ-Selector
  └─ Live Preview          // Echtzeit-Vorschau
```

### Prisma Operations

```typescript
// Alle Tiles laden
await prisma.tile.findMany()

// Tile erstellen
await prisma.tile.create({ data: {...} })

// Tile aktualisieren
await prisma.tile.update({ where: { id }, data: {...} })

// Tile löschen
await prisma.tile.delete({ where: { id } })

// Nach Kategorie filtern
await prisma.tile.findMany({ where: { category: 'Romantisch' } })

// Nur verfügbare
await prisma.tile.findMany({ where: { assignedToDayNumber: null } })
```

## 📚 Weitere Ressourcen

- **CONTENT_TYPES.md** - Vollständige Liste aller 66 Content-Typen
- **README.md** - Haupt-Projektdokumentation
- **Admin Panel** - Live-Dokumentation unter `/admin`

## 🎉 Los geht's!

1. Öffne das **Admin Panel** (`/admin`)
2. Klicke auf **"🎨 Tile Library"**
3. Erstelle deine erste Tile mit **"➕ Neue Tile erstellen"**
4. Nutze die **Live-Vorschau** für sofortiges Feedback
5. Speichere und verwalte deine Tiles zentral
6. Erstelle beeindruckende Adventskalender!

**Viel Spaß beim Erstellen! 🎄✨**
