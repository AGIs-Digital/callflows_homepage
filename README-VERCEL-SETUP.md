# 🚀 Vercel Functions Setup für Lead Generator

## Übersicht
Dein Lead Generator wurde erfolgreich für Vercel Functions migriert! Alle Dateien sind bereit für das Deployment.

## 📁 Neue Struktur
```
/api/
├── lead-search.ts          # Hauptfunktion (Vercel Function)
├── sources/
│   ├── google.ts          # Google Search API
│   └── 11880.ts           # 11880 Scraping
├── types/
│   └── lead-scraping.ts   # TypeScript Definitionen
├── package.json           # Dependencies für Vercel
└── tsconfig.json          # TypeScript Config
vercel.json                # Vercel Konfiguration
```

## 🔧 Setup-Schritte

### 1. Vercel Account & CLI
```bash
npm i -g vercel
vercel login
```

### 2. Projekt initialisieren
```bash
cd /pfad/zu/deinem/projekt
vercel
```

### 3. Environment Variables setzen
```bash
vercel env add GOOGLE_API_KEY
# Gib deinen Google API Key ein: AIzaSyDYOSjzT84kXkOILP_s8L1c4Td0JFThUwo

vercel env add GOOGLE_CSE_ID  
# Gib deine Google CSE ID ein: a72a1990010cb4262
```

### 4. Deployment
```bash
vercel --prod
```

## 🌐 Nach dem Deployment

### URL Update im Frontend
Nach erfolgreichem Deployment erhältst du eine URL wie:
`https://dein-projekt-name.vercel.app`

**Aktualisiere dann in `app/seo-dashboard/lead-generator/page.tsx`:**
```typescript
const apiUrl = process.env.NODE_ENV === 'development' 
  ? '/api/lead-generator/search' 
  : 'https://dein-projekt-name.vercel.app/api/lead-search'; // <-- HIER deine echte URL
```

## ✅ Funktionalität
- **Gleiche API** wie vorher
- **Gleiches Response Format**  
- **Playwright funktioniert** auf Vercel
- **Kostenlos** bis 100k Requests/Monat
- **Automatisches Scaling**

## 🔄 Development Workflow
```bash
# Lokal testen
cd api
npm install
vercel dev

# Deployment
vercel --prod
```

## 📊 Monitoring
- Vercel Dashboard: https://vercel.com/dashboard
- Function Logs in Echtzeit verfügbar
- Performance Metrics included

## 🆘 Troubleshooting

### Function Timeout
Falls Playwright zu lange braucht:
```json
// vercel.json anpassen
{
  "functions": {
    "api/lead-search.ts": {
      "maxDuration": 300  // 5 Minuten (max für Free Plan)
    }
  }
}
```

### CORS Issues
Falls Frontend andere Domain:
```typescript
// In lead-search.ts bereits enthalten
res.setHeader('Access-Control-Allow-Origin', '*');
```

### Dependencies
Falls Playwright Probleme:
```bash
cd api
npm install playwright
npx playwright install chromium
```

## 💰 Kosten
- **Hobby Plan**: Kostenlos
- **100.000 Function Invocations/Monat**
- **100GB Bandwidth/Monat**
- **Mehr als ausreichend** für deinen Use Case

Du bist startklar! 🎉