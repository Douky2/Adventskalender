# 🎄 Adventskalender Setup Script
# Führt alle notwendigen Schritte automatisch aus

Write-Host "🎄 Digitaler Adventskalender - Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Schritt 1: Dependencies installieren
Write-Host "📦 Schritt 1/4: Installiere Dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Fehler beim Installieren der Dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installiert!" -ForegroundColor Green
Write-Host ""

# Schritt 2: Prüfe .env Datei
Write-Host "🔐 Schritt 2/4: Prüfe Umgebungsvariablen..." -ForegroundColor Cyan
if (-Not (Test-Path ".env")) {
    Write-Host "❌ .env Datei nicht gefunden!" -ForegroundColor Red
    Write-Host "Erstelle .env aus .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

# Warnung für Passwort
Write-Host ""
Write-Host "⚠️  WICHTIG: Hast du das Passwort in der .env Datei geändert?" -ForegroundColor Yellow
Write-Host "Standard-Passwort: IhrGeheimerCode2024" -ForegroundColor Yellow
$response = Read-Host "Drücke Enter um fortzufahren (oder STRG+C zum Abbrechen)"
Write-Host ""

# Schritt 3: Datenbank erstellen
Write-Host "🗄️  Schritt 3/4: Erstelle Datenbank..." -ForegroundColor Cyan
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Fehler beim Erstellen der Datenbank!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Datenbank erstellt!" -ForegroundColor Green
Write-Host ""

# Schritt 4: Datenbank befüllen
Write-Host "🌱 Schritt 4/4: Befülle Datenbank mit Beispieldaten..." -ForegroundColor Cyan
npx prisma db seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Fehler beim Befüllen der Datenbank!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Datenbank befüllt!" -ForegroundColor Green
Write-Host ""

# Fertig!
Write-Host "=====================================" -ForegroundColor Green
Write-Host "🎉 Setup abgeschlossen!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Starte den Development-Server mit:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Oder bearbeite die Inhalte mit Prisma Studio:" -ForegroundColor Cyan
Write-Host "  npx prisma studio" -ForegroundColor White
Write-Host ""
Write-Host "💕 Viel Spaß mit eurem Adventskalender! 🎄" -ForegroundColor Magenta
