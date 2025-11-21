# 🔗 Interaktive Story-Chains - Anleitung

## Konzept

Story-Chains ermöglichen es, mehrere Türchen miteinander zu verbinden, wo Entscheidungen und Eingaben aus früheren Türchen die späteren beeinflussen. Nutzer können:

- **Farben wählen** die sich durch die Story ziehen
- **Themen/Designs auswählen** die das Erscheinungsbild prägen
- **Text-Bausteine sammeln** die zu einer Geschichte/Gedicht zusammengebaut werden
- **Elemente sammeln** die am Ende kombiniert werden

## Verwendung in Content

### 1. Story-Chain Interactive Component

Verwende diese Komponente in einem Türchen-Content (z.B. Tag 3):

```svelte
<script lang="ts">
  import StoryChainInteractive from '$lib/components/StoryChainInteractive.svelte';
  
  export let content: string;
  export let author: string | undefined = undefined;
  export let contentType: string;
</script>

<div class="content-container">
  <h2>🎨 Wähle deine Lieblingsfarbe</h2>
  <p>Diese Farbe wird Teil deiner persönlichen Geschichte!</p>
  
  <StoryChainInteractive
    chainId="our-love-story"
    dayNumber={3}
    type="color"
    title="Wähle deine Farbe"
    options={[
      { value: '#ff6b9d', label: 'Rosa' },
      { value: '#4ecdc4', label: 'Türkis' },
      { value: '#ffd93d', label: 'Gelb' },
      { value: '#95e1d3', label: 'Mint' }
    ]}
  />
</div>
```

### 2. Text-Eingabe für Story-Building

Tag 5 könnte dann Text sammeln:

```svelte
<StoryChainInteractive
  chainId="our-love-story"
  dayNumber={5}
  type="text"
  title="Schreibe den nächsten Teil unserer Geschichte"
/>
```

### 3. Elemente/Themen auswählen

Tag 7 könnte Design-Elemente sammeln:

```svelte
<StoryChainInteractive
  chainId="our-love-story"
  dayNumber={7}
  type="element"
  title="Wähle ein Symbol für diesen Teil"
  options={[
    { value: 'heart', label: '❤️ Herz', preview: '#ff6b9d' },
    { value: 'star', label: '⭐ Stern', preview: '#ffd93d' },
    { value: 'moon', label: '🌙 Mond', preview: '#95e1d3' }
  ]}
/>
```

### 4. Finales Ergebnis anzeigen

Am letzten Tag der Chain (z.B. Tag 12):

```svelte
<script lang="ts">
  import StoryChainResult from '$lib/components/StoryChainResult.svelte';
</script>

<div class="final-result">
  <h1>🎉 Unsere zusammengebaute Geschichte!</h1>
  
  <StoryChainResult
    chainId="our-love-story"
    finalDayNumber={12}
    templateType="story"
  />
</div>
```

## Chain-Types und Parameter

### Type: 'color'
Zeigt Farbwahl-Buttons an.

**Options Format:**
```javascript
[
  { value: '#ff6b9d', label: 'Rosa' },
  { value: '#4ecdc4', label: 'Türkis' }
]
```

### Type: 'theme'
Zeigt thematische Auswahlmöglichkeiten.

**Options Format:**
```javascript
[
  { value: 'romantic', label: 'Romantisch', preview: '#ff6b9d' },
  { value: 'adventure', label: 'Abenteuer', preview: '#ffd93d' }
]
```

### Type: 'element'
Für einzelne Elemente/Symbole/Objekte.

**Options Format:**
```javascript
[
  { value: 'heart', label: '❤️ Herz', preview: '#ff0000' },
  { value: 'star', label: '⭐ Stern' }
]
```

### Type: 'text'
Freie Texteingabe - wird gespeichert und später zusammengebaut.

Keine Options nötig.

### Type: 'design'
Für visuelle Design-Elemente.

**Options Format:**
```javascript
[
  { 
    value: 'minimalist', 
    label: 'Minimalistisch',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
]
```

## Template Types für StoryChainResult

### 'story'
Baut alle Text-Eingaben chronologisch zu einer Geschichte zusammen.

### 'poem'
Kombiniert Text-Eingaben zu einem Gedicht (mit Zeilenumbrüchen).

### 'design'
Zeigt alle ausgewählten Design-Elemente visuell an.

### 'custom'
Für eigene Template-Logik.

## Beispiel: Vollständige 5-Tage Story-Chain

### Tag 1: Farbe wählen
```svelte
<StoryChainInteractive
  chainId="christmas-adventure"
  dayNumber={1}
  type="color"
  title="Wähle die Farbe deines Abenteuers"
  options={[
    { value: '#c0392b', label: 'Weihnachtsrot' },
    { value: '#27ae60', label: 'Tannengrün' },
    { value: '#3498db', label: 'Eisblau' }
  ]}
/>
```

### Tag 2: Story-Anfang schreiben
```svelte
<StoryChainInteractive
  chainId="christmas-adventure"
  dayNumber={2}
  type="text"
  title="Es war einmal... Schreibe den Anfang der Geschichte"
/>
```

### Tag 3: Charakter wählen
```svelte
<StoryChainInteractive
  chainId="christmas-adventure"
  dayNumber={3}
  type="element"
  title="Wer ist der Held deiner Geschichte?"
  options={[
    { value: 'elf', label: '🧝 Weihnachtself' },
    { value: 'reindeer', label: '🦌 Rentier' },
    { value: 'snowman', label: '⛄ Schneemann' }
  ]}
/>
```

### Tag 4: Story fortsetzen
```svelte
<StoryChainInteractive
  chainId="christmas-adventure"
  dayNumber={4}
  type="text"
  title="Was passiert als nächstes?"
/>
```

### Tag 5: Finale & Ergebnis
```svelte
<StoryChainResult
  chainId="christmas-adventure"
  finalDayNumber={5}
  templateType="story"
/>
```

## In Admin-Panel konfigurieren

1. Öffne Admin-Panel
2. Bearbeite ein Türchen
3. Gehe zum Tab "🔗 Story-Verknüpfung"
4. Setze:
   - **Story-Chain ID**: z.B. "our-love-story"
   - **Fortsetzung vom vorherigen Tag**: ✓ (außer beim ersten Tag)
   - **Wird am nächsten Tag fortgesetzt**: ✓ (außer beim letzten Tag)

## Technische Details

### Datenbank
Gespeichert in `ChainState` Tabelle:
- `storyChainId`: Eindeutige ID der Chain
- `dayNumber`: Bei welchem Tag
- `chosenColor`, `chosenTheme`, `chosenElement`: Auswahlwerte
- `textInput`: Freie Texteingabe
- `stateData`: JSON für komplexe Daten

### API
- **GET** `/api/chain-state?chainId=xyz` - Alle States einer Chain laden
- **POST** `/api/chain-state` - State speichern/updaten

## Ideen für Story-Chains

1. **Build Your Story**: Jeder Tag fügt einen Absatz hinzu
2. **Design Your Calendar**: Farben und Themen sammeln
3. **Poem Together**: Jeder Tag eine Zeile
4. **Adventure Path**: Entscheidungen beeinflussen die Route
5. **Memory Collection**: Erinnerungen sammeln zu einem Scrapbook
6. **Dream Board**: Ziele und Wünsche visualisieren
7. **Recipe Builder**: Zutaten sammeln für ein finales Rezept
8. **Playlist Builder**: Songs sammeln für eine gemeinsame Playlist

---

✨ **Happy Story Building!** 🎄
