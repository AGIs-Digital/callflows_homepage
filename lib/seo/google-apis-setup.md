# Google APIs Setup für callflows SEO Dashboard

## 🎯 Übersicht

Diese Anleitung führt Sie durch die Einrichtung der **kostenlosen Google APIs** für echte SEO-Daten in Ihrem Dashboard.

**Zeitaufwand:** ~30 Minuten  
**Kosten:** Kostenlos  
**Ergebnis:** Echte Search Console und Analytics Daten

---

## 📋 Voraussetzungen

1. **Google Account** mit Zugang zu:
   - Google Cloud Console
   - Google Search Console (mit callflows.de verifiziert)
   - Google Analytics 4 (GA4) Property

2. **Zugriffsrechte** auf die callflows.de Domain

---

## 🛠️ Schritt 1: Google Cloud Projekt erstellen

### 1.1 Cloud Console öffnen
1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Klicke auf **"Neues Projekt erstellen"**
3. **Projektname:** `callflows-seo-apis`
4. **Organisation:** (optional)
5. Klicke **"Erstellen"**

### 1.2 Projekt auswählen
- Stelle sicher, dass das neue Projekt ausgewählt ist (oben links)

---

## 🔍 Schritt 2: Google Search Console API

### 2.1 API aktivieren
1. **Navigation:** APIs & Services → Bibliothek
2. **Suche:** "Google Search Console API"
3. Klicke auf **"Google Search Console API"**
4. Klicke **"Aktivieren"**

### 2.2 API-Key erstellen
1. **Navigation:** APIs & Services → Anmeldedaten
2. Klicke **"+ Anmeldedaten erstellen"**
3. Wähle **"API-Schlüssel"**
4. **Kopiere den API-Key** (sicher aufbewahren!)
5. **Optional:** Klicke "Einschränken" für bessere Sicherheit:
   - **API-Einschränkungen:** Google Search Console API
   - **Anwendungseinschränkungen:** HTTP-Referrer (mit callflows.de)

### 2.3 Search Console Domain verifizieren
1. Gehe zu [Google Search Console](https://search.google.com/search-console/)
2. Klicke **"Property hinzufügen"**
3. **URL-Präfix:** `https://callflows.de`
4. **Verifizierung:** HTML-Tag, DNS oder Datei-Upload
5. Warte auf die Bestätigung

---

## 📊 Schritt 3: Google Analytics 4 API

### 3.1 Analytics Reporting API aktivieren
1. **Navigation:** APIs & Services → Bibliothek  
2. **Suche:** "Google Analytics Reporting API"
3. Klicke **"Aktivieren"**
4. **Zusätzlich:** Suche "Google Analytics Data API" → **"Aktivieren"**

### 3.2 Service Account erstellen (empfohlen)
1. **Navigation:** APIs & Services → Anmeldedaten
2. Klicke **"+ Anmeldedaten erstellen"** → **"Service-Konto"**
3. **Name:** `callflows-analytics-service`
4. **Beschreibung:** "SEO Dashboard Analytics Access"
5. Klicke **"Erstellen und fortfahren"**
6. **Rolle:** "Betrachter" → **"Weiter"** → **"Fertig"**

### 3.3 Service Account Key herunterladen
1. Klicke auf das erstellte Service-Konto
2. **Tab:** "Schlüssel"
3. Klicke **"Schlüssel hinzufügen"** → **"Neuen Schlüssel erstellen"**
4. **Format:** JSON
5. **Datei herunterladen** und sicher aufbewahren

### 3.4 GA4 Property ID finden
1. Gehe zu [Google Analytics](https://analytics.google.com/)
2. Wähle deine **callflows.de Property**
3. **Einstellungen** → **Property-Einstellungen**
4. **Property-ID kopieren** (Format: 123456789)

### 3.5 Service Account zu Analytics hinzufügen
1. **Analytics:** Einstellungen → Property-Zugriff
2. Klicke **"+"** → **"Nutzer hinzufügen"**
3. **E-Mail:** Service-Account-E-Mail (aus JSON-Datei)
4. **Rolle:** "Betrachter"
5. **Hinzufügen**

---

## ⚙️ Schritt 4: Environment-Variablen konfigurieren

### 4.1 .env.local Datei erstellen
Erstelle eine Datei `.env.local` im Projektroot:

```bash
# Google Search Console API
GOOGLE_SEARCH_CONSOLE_API_KEY=your-search-console-api-key-here

# Google Analytics 4 API
GOOGLE_ANALYTICS_API_KEY=your-analytics-api-key-here
GA4_PROPERTY_ID=your-ga4-property-id-here

# Optional: Service Account für erweiterte Analytics
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
```

### 4.2 API-Keys eintragen
```bash
# Beispiel (NICHT die echten Keys verwenden!)
GOOGLE_SEARCH_CONSOLE_API_KEY=AIzaSyB...XYZ123
GOOGLE_ANALYTICS_API_KEY=AIzaSyC...ABC456
GA4_PROPERTY_ID=123456789
```

---

## 🧪 Schritt 5: APIs testen

### 5.1 Anwendung neustarten
```bash
npm run dev
```

### 5.2 Dashboard testen
1. Gehe zu `http://localhost:3000/login`
2. Logge dich als Admin ein:
   - **E-Mail:** `admin@callflows.de`
   - **Passwort:** `callflows2025`
3. Besuche das SEO-Dashboard
4. Prüfe die **API-Status-Sektion** unten

### 5.3 Browser-Konsole prüfen
**Erfolgreiche API-Calls:**
```
✅ Using real Search Console data
✅ Using real Analytics data
✅ API Status: Google Search Console - Active
```

**Fallback zu Mock-Daten:**
```
⚠️ Google Search Console API Key nicht konfiguriert
⚠️ Error fetching real keyword rankings
ℹ️ API Status: Google Search Console - Fallback
```

---

## 🔧 Fehlerbehebung

### API-Fehler 401 (Unauthorized)
- **Problem:** API-Key falsch oder abgelaufen
- **Lösung:** API-Key in Cloud Console überprüfen

### API-Fehler 403 (Forbidden)  
- **Problem:** API nicht aktiviert oder keine Berechtigung
- **Lösung:** APIs in Cloud Console aktivieren

### Keine Search Console Daten
- **Problem:** Domain nicht verifiziert
- **Lösung:** callflows.de in Search Console hinzufügen

### GA4 Property nicht gefunden
- **Problem:** Falsche Property-ID oder keine Berechtigung
- **Lösung:** Property-ID und Service-Account prüfen

### CORS-Fehler im Browser
- **Problem:** API-Einschränkungen zu streng
- **Lösung:** HTTP-Referrer für callflows.de erlauben

---

## 📈 Erwartete Ergebnisse

### Mit konfigurierten APIs:
- **Search Console:** Echte Clicks, Impressions, CTR
- **Analytics:** Echte Sessions, Nutzer-Entwicklung
- **Keyword-Rankings:** Fallback zu realistischen Mock-Daten
- **LLM-Mentions:** Fallback zu Mock-Daten

### Dashboard-Anzeige:
```
✅ Google Search Console: Echte Daten
✅ Google Analytics 4: Echte Daten
⚠️ SerpApi: Mock-Daten (nicht konfiguriert)
⚠️ Perplexity API: Mock-Daten (nicht konfiguriert)
```

---

## 🚀 Nächste Schritte

### Nach erfolgreicher Einrichtung:
1. **Monitoring einrichten:** Tägliche Datenaktualisierung
2. **Alerts konfigurieren:** Bei Traffic-Rückgängen
3. **Premium-APIs erwägen:** SerpApi für präzise Rankings

### Optional: Premium-APIs
- **SerpApi:** $50/Monat für echte Keyword-Rankings
- **Perplexity API:** $20/Monat für LLM-Mentions
- **ValueSerp:** $10/Monat günstigere Alternative

---

## 📞 Support

**Bei Problemen:**
1. **Browser-Konsole** auf Fehlermeldungen prüfen
2. **API-Status** im Dashboard unten kontrollieren
3. **Google Cloud Logs** für detaillierte Fehlerinfos

**Dokumentation:**
- [Google Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original)
- [Google Analytics Reporting API](https://developers.google.com/analytics/devguides/reporting)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## ✅ Checklist

- [ ] Google Cloud Projekt erstellt
- [ ] Search Console API aktiviert und API-Key erstellt
- [ ] callflows.de in Search Console verifiziert
- [ ] Analytics Reporting API aktiviert
- [ ] Service Account für Analytics erstellt
- [ ] GA4 Property-ID notiert
- [ ] .env.local Datei mit API-Keys erstellt
- [ ] Anwendung neugestartet
- [ ] Dashboard getestet
- [ ] API-Status im Dashboard geprüft

**Nach Abschluss haben Sie echte SEO-Daten statt Zufallszahlen! 🎉** 