# Quick Start: Google APIs für callflows

## 🚀 5-Minuten-Setup für echte SEO-Daten

Diese Kurzanleitung bringt Sie schnell zu echten Daten in Ihrem SEO-Dashboard.

---

## ✅ Schritt 1: Google Cloud Projekt (2 Minuten)

1. **Gehe zu:** [Google Cloud Console](https://console.cloud.google.com/)
2. **Neues Projekt:** "callflows-seo-apis"
3. **Projekt auswählen** (oben links)

---

## 🔧 Schritt 2: APIs aktivieren (1 Minute)

**Navigation:** APIs & Services → Bibliothek

1. **Suche:** "Google Search Console API" → **Aktivieren**
2. **Suche:** "Google Analytics Reporting API" → **Aktivieren**

---

## 🔑 Schritt 3: API-Keys erstellen (2 Minuten)

**Navigation:** APIs & Services → Anmeldedaten

1. **Klicke:** "+ Anmeldedaten erstellen" → "API-Schlüssel"
2. **Kopiere:** den ersten API-Key (für Search Console)
3. **Wiederholen:** für zweiten API-Key (für Analytics)

**Sicherheit (optional):**
- Klicke "Einschränken" bei jedem Key
- **API-Einschränkungen:** Jeweilige API auswählen
- **HTTP-Referrer:** callflows.de hinzufügen

---

## 📊 Schritt 4: Search Console vorbereiten (30 Sekunden)

1. **Gehe zu:** [Google Search Console](https://search.google.com/search-console/)
2. **Domain hinzufügen:** `https://callflows.de`
3. **Verifizierung:** HTML-Tag, DNS oder Datei-Upload

---

## 📈 Schritt 5: Analytics Property ID finden (30 Sekunden)

1. **Gehe zu:** [Google Analytics](https://analytics.google.com/)
2. **Wähle:** callflows.de Property
3. **Einstellungen → Property-Einstellungen**
4. **Kopiere:** Property-ID (Format: 123456789)

---

## ⚙️ Schritt 6: Environment-Datei erstellen

**Erstelle:** `.env.local` im Projektroot

```bash
# Google APIs Configuration
GOOGLE_SEARCH_CONSOLE_API_KEY=AIzaSy...XYZ123
GOOGLE_ANALYTICS_API_KEY=AIzaSy...ABC456
GA4_PROPERTY_ID=123456789
```

**Wichtig:** Nie in Git commiten! (bereits in .gitignore)

---

## 🧪 Schritt 7: Testen

```bash
# Anwendung neustarten
npm run dev

# Dashboard besuchen
http://localhost:3000/seo-dashboard

# API-Status prüfen (unten auf der Seite)
```

**Erfolg:** ✅ Grüne Badges bei "Google Search Console" und "Google Analytics 4"

---

## 🔧 Problembehandlung

### ❌ API-Key funktioniert nicht
- **Prüfe:** Ist die entsprechende API aktiviert?
- **Prüfe:** Sind API-Einschränkungen zu streng?

### ❌ Property nicht gefunden  
- **Prüfe:** Richtige GA4 Property-ID?
- **Prüfe:** Hast du Zugriff auf die Property?

### ❌ CORS-Fehler
- **Lösung:** HTTP-Referrer `*.callflows.de` zu API-Key hinzufügen

### ❌ 403 Forbidden
- **Prüfe:** Ist callflows.de in Search Console verifiziert?

---

## 📊 Erwartete Ergebnisse

### ✅ Mit konfigurierten APIs:
- **Search Console:** Echte Clicks, Impressions, CTR
- **Analytics:** Echte Sessions und Traffic-Trends
- **Keyword Rankings:** Realistische Fallback-Daten
- **LLM Mentions:** Fallback-Daten

### ⚠️ Ohne APIs:
- **Alle Metriken:** Realistische Mock-Daten
- **API-Status:** Gelbe "Fallback" Badges

---

## 🚀 Nächste Schritte

### Nach erfolgreichem Setup:
1. **Monitoring:** Täglich neue Daten im Dashboard
2. **Alerts:** Bei ungewöhnlichen Veränderungen
3. **Premium APIs:** SerpApi für echte Keyword-Rankings

### Optional: Premium APIs (~$80/Monat)
- **SerpApi:** $50/Monat für präzise Google-Rankings
- **Perplexity API:** $20/Monat für LLM-Mentions
- **ValueSerp:** $10/Monat (günstigere Alternative zu SerpApi)

---

## 💡 Tipps

### Kostenmanagement:
- **Google APIs:** Komplett kostenlos
- **Rate Limits:** Sind für normale Nutzung ausreichend
- **Quotas:** 100 Requests/100 Sekunden (Google APIs)

### Sicherheit:
- **API-Keys:** Nur für callflows.de einschränken
- **Service Accounts:** Für produktive Umgebung empfohlen
- **Monitoring:** Ungewöhnliche API-Nutzung überwachen

### Performance:
- **Caching:** Daten werden client-seitig gecacht
- **Fallbacks:** Bei API-Fehlern automatisch Mock-Daten
- **Loading:** Progressives Laden für bessere UX

---

## 📞 Hilfe benötigt?

**Wizard verwenden:** [API Setup Wizard](/api-setup)
**Detaillierte Anleitung:** [Google APIs Setup Guide](/api-setup/guide)
**Browser-Konsole:** Für detaillierte Fehlermeldungen

**Erfolgreich? Sie haben jetzt echte SEO-Daten! 🎉** 