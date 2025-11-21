# 📚 Admin-Begriffe erklärt

## 🎯 Response Mode (Antwort-Modus)

Der Antwort-Modus bestimmt, wie und wann auf ein Türchen geantwortet werden kann:

### 🔒 DISABLED - Keine Antwort möglich
**Was bedeutet das?**
- Nur Locdocs vorbereiteter Inhalt wird angezeigt
- Miss Chaos kann nichts hinzufügen oder ändern
- Perfekt für: Überraschungen, fertige Geschichten, Videos, Bilder

**Wann verwenden?**
✅ Reine Geschenke ohne Interaktion
✅ Videos, Bilder, Lieder
✅ Fertige Geschichten oder Gedichte
✅ Überraschungen die keine Antwort brauchen

### 💬 OPEN - Sofort antworten
**Was bedeutet das?**
- Miss Chaos kann direkt nach dem Öffnen antworten
- Ihre Antwort erscheint sofort unter Locdocs Inhalt
- Beide Bereiche (A und B) sind unabhängig sichtbar

**Wann verwenden?**
✅ Fragen die sofort beantwortet werden sollen
✅ Interaktive Aufgaben
✅ Diskussionen oder Austausch
✅ "Was denkst du über...?" Türchen

**Beispiel:**
```
Locdoc: "Was ist deine schönste Weihnachtserinnerung?"
Miss Chaos kann direkt antworten: "Als wir zusammen..."
```

### 📝 AFTER_A - Nur Locdoc-Inhalt
**Was bedeutet das?**
- Identisch mit DISABLED
- Nur Locdocs Inhalt wird gezeigt
- Miss Chaos hat keine Antwortmöglichkeit

**Wann verwenden?**
✅ Wie DISABLED - für reine Geschenke
✅ Legacy-Modus, besser DISABLED verwenden

### 📝 AFTER_B - Nur Miss Chaos-Inhalt
**Was bedeutet das?**
- Nur Miss Chaos kann hier etwas eintragen
- Locdocs Bereich bleibt leer (oder kann als Anleitung dienen)
- Perfekt für persönliche Bereiche

**Wann verwenden?**
✅ Miss Chaos' persönliches Tagebuch
✅ Ihre eigenen Gedanken/Wünsche
✅ Reflexionen die nur sie schreibt
✅ "Dein persönlicher Raum" Türchen

**Beispiel:**
```
Locdoc (als Anleitung): "Was möchtest du mir heute sagen?"
Miss Chaos schreibt dann ihren eigenen Text
```

### 🤝 COLLABORATIVE - Zusammenarbeit
**Was bedeutet das?**
- Beide Bereiche werden angezeigt
- Jeder kann unabhängig seinen Teil beitragen
- Perfekt für gemeinsame Projekte

**Wann verwenden?**
✅ Gemeinsame Geschichten (jeder schreibt einen Teil)
✅ Aufgaben die beide erfüllen
✅ Gegenseitige Komplimente/Wünsche
✅ "Jeder ergänzt..." Türchen

**Beispiel:**
```
Locdoc: "Es war einmal an Weihnachten..."
Miss Chaos: "...als der Schnee sanft vom Himmel fiel..."
Kombiniertes Ergebnis: Beide Teile zusammengefügt!
```

---

## 🔗 Story-Chain Konzepte

### Was ist eine Story-Chain?
Mehrere Türchen, die zusammengehören und aufeinander aufbauen.

### Story-Chain ID
**Beispiel:** `our-love-story`
- Alle Türchen mit derselben ID gehören zusammen
- Verwende einfache Namen ohne Leerzeichen
- Kleinbuchstaben mit Bindestrichen bevorzugt

**Gute IDs:**
- `christmas-adventure`
- `build-your-story`
- `memory-collection`
- `our-journey`

**Schlechte IDs:**
- `Unsere Geschichte` (Leerzeichen)
- `Story#1` (Sonderzeichen)
- `geschichte123` (nicht sprechend)

### Linked to Previous / Next
**"Fortsetzung vom vorherigen Tag"** ☑️
- Zeigt einen Hinweis auf den vorherigen Tag
- Nutzer wissen, dass es zusammengehört
- Optional: Link zum vorherigen Tag

**"Wird am nächsten Tag fortgesetzt"** ☑️
- Zeigt einen Teaser auf morgen
- Macht neugierig auf die Fortsetzung
- Optional: Vorschau-Text

---

## 💡 Best Practices

### Content-Typen wählen
- **TEXT**: Einfacher Text, Geschichten, Briefe
- **IMAGE_URL**: Bilder (Link zu Bild eingeben)
- **VIDEO_EMBED**: YouTube-Links
- **LOVE_LETTER**: Romantischer Brief mit Herz-Design
- **QUIZ_JSON**: Interaktives Quiz
- **MEMORY**: Erinnerungen mit Timeline

### Titel-Tipps
✅ Kurz und knackig
✅ Emojis verwenden 🎄 ❤️ ✨
✅ Neugierig machen
❌ Zu lang
❌ Spoilern

**Gute Titel:**
- "🎄 Willkommen in unserem Kalender!"
- "💝 Eine Überraschung für dich"
- "📖 Teil 1: Unsere Geschichte"

**Vermeide:**
- "Heute ist Tag 1 und hier ist eine Geschichte die ich geschrieben habe über uns"
- "Tag 5" (zu generisch)

### Aufgabenstellungen formulieren
✅ Klar und präzise
✅ Ermutigend
✅ Mit Beispielen

**Gut:**
```
Schreibe deine Fortsetzung der Geschichte hier! 
(Ca. 2-3 Sätze)
```

**Besser:**
```
Was passiert als nächstes in unserer Geschichte? 
Schreibe 2-3 Sätze und lass deiner Fantasie freien Lauf! ✨

Beispiel: "Plötzlich öffnete sich die Tür und..."
```

---

## 🎨 Kreative Ideen

### Story-Chain Beispiele

#### 1. Gemeinsame Geschichte (5 Tage)
- **Tag 1**: Locdoc schreibt Anfang (OPEN)
- **Tag 2**: Miss Chaos ergänzt (OPEN)
- **Tag 3**: Locdoc setzt fort (OPEN)
- **Tag 4**: Miss Chaos nächster Teil (OPEN)
- **Tag 5**: Finales Ende + kombiniertes Ergebnis (COLLABORATIVE)

#### 2. Build Your Design (4 Tage)
- **Tag 3**: Farbe wählen (Interactive Component)
- **Tag 7**: Theme wählen (Interactive Component)
- **Tag 10**: Element sammeln (Interactive Component)
- **Tag 15**: Finales Design zeigen (Result Component)

#### 3. Erinnerungs-Sammlung (7 Tage)
- Jeden Tag eine schöne Erinnerung aufschreiben
- Am Ende: Alle Erinnerungen als Scrapbook
- Mode: OPEN oder COLLABORATIVE

---

## 🆘 Häufige Probleme

### "Miss Chaos kann nicht antworten"
✅ Response Mode auf OPEN oder COLLABORATIVE setzen
✅ Aufgabenstellung eingeben
✅ Türchen muss entsperrt sein (Datum erreicht)

### "Das kombinierte Ergebnis wird nicht angezeigt"
✅ Beide müssen ihren Teil ausgefüllt haben
✅ Response Mode muss OPEN oder COLLABORATIVE sein
✅ Feld "Kombiniertes Ergebnis" muss ausgefüllt sein

### "Story-Chain wird nicht verbunden"
✅ Story-Chain ID muss bei allen Türchen gleich sein
✅ Groß-/Kleinschreibung beachten
✅ Keine Leerzeichen in der ID

---

💡 **Tipp**: Experimentiere im Simulation-Modus (alle Türchen entsperrt) um verschiedene Modi auszuprobieren!
