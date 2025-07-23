# API-Setup Guide für echte SEO-Daten

## 🎯 Übersicht

Das SEO-Dashboard kann sowohl mit **kostenlosen Mock-Daten** als auch mit **echten APIs** betrieben werden. Diese Anleitung zeigt, wie Sie echte Daten integrieren.

## 📊 Aktuelle Funktionen

### ✅ Bereits implementiert:
- **Google Search Console API** (kostenlos)
- **Google Analytics 4 API** (kostenlos)

- **Intelligente Fallbacks** (falls APIs nicht verfügbar)

### 🔄 Fallback-System:
- **Mit APIs:** Echte Daten aus Google Search Console, Analytics, etc.
- **Ohne APIs:** Realistische Mock-Daten statt Zufallszahlen

## 🆓 Kostenlose APIs einrichten

### 1. Google Search Console API

**Kosten:** Kostenlos  
**Daten:** Clicks, Impressions, CTR, durchschnittliche Position

**Setup:**
1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt oder wähle ein vorhandenes
3. Aktiviere die "Search Console API"
4. Erstelle API-Credentials (API Key)
5. Füge die callflows.de Domain in Search Console hinzu

**Environment Variable:**
```bash
GOOGLE_SEARCH_CONSOLE_API_KEY=dein-api-key-hier
```

### 2. Google Analytics 4 API

**Kosten:** Kostenlos  
**Daten:** Sessions, Nutzer, Traffic-Entwicklung

**Setup:**
1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Aktiviere die "Analytics Reporting API"
3. Erstelle API-Credentials
4. Finde deine GA4 Property ID in Google Analytics

**Environment Variables:**
```bash
GOOGLE_ANALYTICS_API_KEY=dein-api-key-hier
GA4_PROPERTY_ID=deine-property-id
```

## 💰 Kostenpflichtige APIs (optional)



## 🛠️ Implementierung

### Schritt 1: Environment Variables setzen

Erstelle eine `.env.local` Datei im Projektroot:

```bash
# Kostenlose APIs
GOOGLE_SEARCH_CONSOLE_API_KEY=dein-key-hier
GOOGLE_ANALYTICS_API_KEY=dein-key-hier
GA4_PROPERTY_ID=deine-property-id

# Kostenpflichtige APIs (optional - entfernt)
```

### Schritt 2: System neustarten

```bash
npm run dev
```

### Schritt 3: Dashboard testen

1. Gehe zu `callflows.de/login`
2. Logge dich als Admin ein (`admin@callflows.de` / `callflows2025`)
3. Besuche das SEO-Dashboard
4. Prüfe die Datenquellen in der Konsole

## 📈 Datenquellen-Übersicht

### Mit APIs (empfohlen):
- **Search Console:** Echte Clicks, Impressions, CTR
- **Analytics:** Echte Sessions, Nutzer-Entwicklung


### Ohne APIs (Fallback):
- **Realistische Mock-Daten** statt Zufallszahlen
- **Konsistente Werte** für callflows-Keywords
- **Plausible Trends** und Entwicklungen

## 🔍 Debugging

### Dashboard zeigt Mock-Daten:
1. Prüfe `.env.local` Datei
2. Überprüfe API-Keys in der Browser-Konsole
3. Schaue nach Fehlermeldungen im Dashboard

### API-Fehler:
- **401 Unauthorized:** API-Key falsch oder abgelaufen
- **403 Forbidden:** API nicht aktiviert oder Quote überschritten
- **429 Too Many Requests:** Rate Limit erreicht

### Konsole-Logs:
```javascript
// Erfolgreiche API-Calls
"Using real Search Console data"
"Using real Analytics data"

// Fallback zu Mock-Daten
"Google Search Console API Key nicht konfiguriert"
"Error fetching real keyword rankings"
```

## 💡 Empfohlene Reihenfolge

### Phase 1: Kostenlose Grundausstattung
1. **Google Search Console API** einrichten
2. **Google Analytics 4 API** einrichten
3. Dashboard testen

### Phase 2: Erweiterte Funktionen
1. **Alternative Ranking-Services** (falls benötigt)
3. Monitoring-Alerts einrichten

### Phase 3: Optimierung
1. **Automatisierte Reports** einrichten
2. **Custom Dashboards** erstellen
3. **Performance-Optimierungen**

## 🎛️ Konfiguration

### API-Prioritäten:
```typescript
// Keyword-Rankings
1. Fallback Mock-Daten (kostenpflichtige APIs entfernt)

// Traffic-Daten
1. Google Analytics 4
2. Google Search Console
3. Fallback Mock-Daten

// LLM-Mentions
1. Fallback Mock-Daten (kostenpflichtige APIs entfernt)
```

### Rate Limiting:
- **Google APIs:** 100 Requests/100 Sekunden
- **Fallback-Daten:** Keine Limits

## 🚀 Nächste Schritte

1. **Starte mit kostenlosen APIs** (Google Search Console + Analytics)
2. **Teste das Dashboard** mit echten Daten
3. **Erweitere bei Bedarf** mit kostenpflichtigen APIs
4. **Monitoring einrichten** für kontinuierliche Überwachung

**Ergebnis:** Echte SEO-Daten statt Zufallszahlen! 📊 