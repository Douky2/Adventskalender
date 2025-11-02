# 🎄 Digitaler Adventskalender

Interaktiver Adventskalender für Fernbeziehungen - Locdoc 🧡 & Miss Chaos 💖

## 🚀 Quick Start

```bash
# Installation
npm install

# Datenbank Setup
npx prisma migrate dev
npx prisma db seed

# Server starten
npm run dev
```

→ **Kalender:** http://localhost:5173  
→ **Passwort:** `weihnachten2025`  
→ **Admin:** http://localhost:5173/admin (passwortgeschützt)  
→ **Admin-Passwort:** `admin2025`

## ✨ Features

### 🎨 50+ Content-Typen in 10 Kategorien
- **Basis:** Text, Bild, Video
- **Romantisch:** Liebesbrief, Wertschätzung, Erinnerungen
- **Virtual Activities:** Discord Date, Gaming, Virtuelles Kochen
- **Musik & Audio:** Playlists, Songs, Sprachnachrichten
- **Interaktive Spiele:** Würdest du lieber, Dies oder Das, Wahrheit oder Pflicht
- **Kreativ & Challenges:** Foto, Kunst, Memes, Screenshot-Tour
- **Planung & Zukunft:** Bucket List, Lebensziele, Traumboard
- **Persönlich:** Kindheitsgeschichten, Erster Eindruck, Inside Jokes
- **Spezial:** Zeitkapsel, Countdown, Sonnenauf/untergang
- **Weiteres:** Rezepte, Bücher, Karten

### 📝 25+ Vorlagen
Direkt im Admin verfügbar - Copy & Paste ready für:
- 🎬 Virtuelles Date (Discord Screenshare)
- 🎮 Gaming-Challenge (Among Us, Minecraft)
- 👨‍🍳 Virtuelles Kochen
- 💌 Liebesbrief
- 🤔 Würdest du lieber (10 Fragen)
- 🎯 Lebensziele (5/10/20 Jahre)
- ... und viele mehr!

### 💬 5 Response-Modi
- **DISABLED:** Keine Antwort möglich
- **OPEN:** Person B kann sofort antworten
- **COLLABORATIVE:** Beide füllen gemeinsam aus
- **AFTER_A:** Nur Person A antwortet
- **AFTER_B:** Nur Person B antwortet

### 📖 Story-Chains
Mehrtägige Geschichten über mehrere Türchen verlinken

### 🎨 Visuelle Features
- Unique Design für jeden Content-Typ
- Animierte Schneeflocken ❄️
- Schwebende Herzen 💖
- Weihnachtsbaum 🎄
- Schneemann ⛄
- Orange für Locdoc, Pink für Miss Chaos

## 📂 Projekt-Struktur

```
├── prisma/
│   ├── schema.prisma          # Datenbank-Schema
│   ├── seed.ts                # 24 vorausgefüllte Türchen
│   └── dev.db                 # SQLite Datenbank
├── src/
│   ├── routes/
│   │   ├── +page.svelte       # Hauptkalender (24 Türchen)
│   │   ├── admin/+page.svelte # Admin-Panel (50+ Typen, Vorlagen)
│   │   ├── day/[dayNumber]/   # Türchen-Seiten
│   │   └── login/             # Login-Seite
│   └── lib/
│       └── auth.ts            # Auth-Cookie Logic
└── README.md                  # Diese Datei
```

## 🔧 Admin-Bereich

### Türchen bearbeiten:
1. Gehe zu `/admin`
2. Klicke "✏️ Bearbeiten" bei einem Türchen
3. Wähle Content-Typ (50+ verfügbar!)
4. Klicke "✨ Vorlage einfügen" (falls verfügbar)
5. Passe Inhalt an
6. Speichern!

### Vorlagen nutzen:
Wenn du einen Content-Typ mit Vorlage wählst, erscheint:
```
┌─────────────────────────────────┐
│  📝 Vorlage verfügbar!          │
│  [✨ Vorlage einfügen]          │
└─────────────────────────────────┘
```
→ Klicken → Vorlage wird eingefügt → Anpassen → Fertig!

## 🎯 Technologie

- **Frontend:** SvelteKit 2.5.28
- **Backend:** Node.js mit @sveltejs/adapter-node
- **Datenbank:** SQLite + Prisma 5.22.0
- **Auth:** Cookie-based (kein OAuth nötig)
- **Styling:** Custom CSS mit Animationen
- **Hosting:** Fly.io (optional)

## 🗄️ Datenbank-Management

### Prisma Studio (GUI):
```bash
npx prisma studio
```
→ http://localhost:5555

### Migrations:
```bash
npx prisma migrate dev --name beschreibung
```

### Reset & Neu-Seed:
```bash
npx prisma migrate reset
```

## 🎄 Content-Typen Beispiele

### 🎬 Virtuelles Date
```
Film: [Dein Lieblingsfilm]
Zeit: 20:00 Uhr
Platform: Discord Screenshare
VORBEREITUNG: Popcorn, Schokolade, Getränk
REGELN: Kameras AN, Gleichzeitig pausieren
```

### 🎮 Gaming-Challenge
```
Spiel: Among Us / Minecraft
CHALLENGE: Wer gewinnt mehr Runden?
Verlierer: [lustige Strafe]
DISCORD VOICE CHAT!
```

### 💌 Liebesbrief
```
Meine liebste Miss Chaos,
Was ich an dir liebe:
- [...]
Warum du besonders bist: [...]
In Liebe, Dein Locdoc 🧡
```

## 📅 Deployment auf Linux Server

### Voraussetzungen:
- Node.js 20+ installiert
- Git installiert
- PM2 (optional, aber empfohlen)

### Deployment-Schritte:

```bash
# Repository klonen
git clone https://github.com/Douky2/Adventskalender.git
cd Adventskalender

# Dependencies installieren
npm install

# Umgebungsvariablen setzen
cp .env.example .env
nano .env  # Passwort anpassen!

# Datenbank aufsetzen
npx prisma migrate deploy
npx prisma db seed

# Build erstellen
npm run build

# Server starten (Option 1: Direkt)
node build

# Server starten (Option 2: Mit PM2 - empfohlen)
npm install -g pm2
pm2 start build/index.js --name adventskalender
pm2 save
pm2 startup  # Auto-Start bei Server-Neustart
```

### Nginx Reverse Proxy (optional):
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
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Umgebungsvariablen (.env):
```env
CALENDAR_PASSWORD=dein-sicheres-passwort
DATABASE_URL=file:./prisma/dev.db
PORT=3000
```

## 🐛 Troubleshooting

### Port bereits belegt:
```bash
# Prozess finden & beenden
Get-Process node | Stop-Process -Force
```

### Datenbank-Fehler:
```bash
# Datenbank neu erstellen
npx prisma migrate reset
npx prisma db seed
```

### Türchen öffnet sich nicht:
- Prüfe Systemdatum (muss aktuell sein)
- Datenbank: `availableFrom` Feld prüfen
- Im Seed: `new Date(2025, 11, X)` (11 = Dezember!)

## 💡 Tipps

### Response-Modi clever nutzen:
- **Tag 1-10:** OPEN (Miss Chaos kann jederzeit antworten)
- **Tag 11-15:** COLLABORATIVE (beide füllen gemeinsam aus)
- **Tag 16-20:** AFTER_A + AFTER_B (abwechselnd)
- **Tag 21-24:** OPEN (Finale!)

### Story-Chains:
1. Tag 5: "Kapitel 1" (linkedToNext ✅, ID: "love-story")
2. Tag 6: "Kapitel 2" (linkedToPrevious ✅, linkedToNext ✅, ID: "love-story")
3. Tag 7: "Kapitel 3" (linkedToPrevious ✅, ID: "love-story")

### 24-Tage Plan:
- **Woche 1:** Kennenlernen (Liebesbrief, Erinnerungen, Inside Jokes)
- **Woche 2:** Virtual Activities (Discord Date, Gaming, Kochen)
- **Woche 3:** Zukunft (Lebensziele, Bucket List, Traumboard)
- **Woche 4:** Kreativ & Finale (Kunst, Foto-Challenge, Zeitkapsel)

## � Sicherheit

### Passwortschutz
- **Kalender-Zugriff:** Geschützt mit `CALENDAR_PASSWORD`
- **Admin-Bereich:** Zusätzlich geschützt mit `ADMIN_PASSWORD`
- **Login-Seite:** `/admin/login` (automatischer Redirect)
- **Logout:** `/admin/logout`

### Umgebungsvariablen (.env)
```bash
CALENDAR_PASSWORD="weihnachten2025"
ADMIN_PASSWORD="admin2025"
CALENDAR_YEAR=2025
```

## �📊 Statistik

- **65+** Content-Typen (inkl. 15 neue interaktive/gemeinsame Türchen)
- **40+** Copy-Paste Vorlagen
- **10** Kategorien
- **5** Response-Modi
- **24** Türchen
- **2** Personen: Locdoc 🧡 & Miss Chaos 💖
- **🔐** Admin-Bereich passwortgeschützt

## 🎁 Viel Spaß!

Erstellt mit ❤️ für Fernbeziehungen.

**Happy Coding & Frohe Weihnachten! 🎄✨**
