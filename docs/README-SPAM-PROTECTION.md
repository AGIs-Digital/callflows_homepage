# 🛡️ Spam-Protection System – Übersicht

## Was ist das Problem?

Dein Widget wurde für **automatisierte Spam-Anrufe missbraucht** (z. B. 105.108.140.87). Jemand hat systematisch mit wechselnden Telefonnummern dein System bombardiert.

---

## Lösung: Multi-Layer-Schutz

```
┌──────────────────────────────────────────────────┐
│  Layer 1: Client-Side (Widget)                   │
│  ─────────────────────────────────────────────   │
│  ✅ Honeypot-Feld (Bot-Detection)                │
│  ✅ Browser-Fingerprinting                       │
│  ✅ Timing-Check (< 2 Sek = Bot)                 │
│  ✅ localStorage Rate-Limit (3/10min)            │
└──────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────┐
│  Layer 2: Server-Side (n8n)                      │
│  ─────────────────────────────────────────────   │
│  ✅ IP-Extraktion (X-Forwarded-For)              │
│  ✅ Redis Rate-Limit (2 Calls/10min/IP)          │
│  ✅ Blockliste (24h nach Rate-Limit)             │
│  ✅ IP-Lookup (Geolocation, ISP)                 │
└──────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────┐
│  Layer 3: AI Spam-Detection (GPT-4o)             │
│  ─────────────────────────────────────────────   │
│  ✅ Name-Plausibilität (gibberish?)              │
│  ✅ Telefon-Region vs. IP-Land                   │
│  ✅ Fingerprint-Anomalien                        │
│  ✅ User-Agent-Analyse (Bot-Strings)             │
└──────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────┐
│  Layer 4: Abuse-Reporting (automatisch)          │
│  ─────────────────────────────────────────────   │
│  ✅ WHOIS/RDAP-Lookup (abuse-mailbox)            │
│  ✅ E-Mail an ISP mit Logs                       │
│  ✅ CC: info@callflows.de (Tracking)             │
└──────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────┐
│  Layer 5: Cloudflare Turnstile (optional)        │
│  ─────────────────────────────────────────────   │
│  ✅ DSGVO-konform (kein Google-Tracking)         │
│  ✅ Unsichtbar (kein CAPTCHA-Klick)              │
│  ✅ Token-Verification in n8n                    │
└──────────────────────────────────────────────────┘
```

---

## Dateien-Übersicht

### 🚀 Quick Start

| Datei                              | Beschreibung                                  |
|------------------------------------|-----------------------------------------------|
| `SPAM-PROTECTION-QUICKSTART.md`    | ⭐ **Start hier!** Deployment-Checkliste     |
| `ENV-VARIABLES.md`                 | Environment-Variablen (Frontend + n8n)        |

### 📘 Detaillierte Dokumentation

| Datei                              | Beschreibung                                  |
|------------------------------------|-----------------------------------------------|
| `SPAM-PROTECTION-SETUP.md`         | Vollständige Setup-Anleitung (n8n, Redis, etc.)|
| `CLOUDFLARE-TURNSTILE-SETUP.md`    | Turnstile-Integration (DSGVO-konform)         |

### 🛠️ n8n-Workflows

| Datei                                   | Beschreibung                              |
|-----------------------------------------|-------------------------------------------|
| `n8n-widget-workflow-enhanced.json`     | ⭐ **Dein Workflow + Spam-Protection**    |
| `N8N-WORKFLOW-UPGRADE-GUIDE.md`         | **Upgrade-Anleitung** (Schritt-für-Schritt)|
| `n8n-turnstile-verification-addon.json` | Turnstile-Token-Verification (optional)   |

### 📧 Andere Dokumentation

| Datei                              | Beschreibung                                  |
|------------------------------------|-----------------------------------------------|
| `MICROSOFT-SMTP-SETUP.md`          | SMTP-Konfiguration für Abuse-Reports          |
| `OUTLOOK-SIGNATURE-SETUP.md`       | E-Mail-Signatur-Setup (nicht verwandt)        |

---

## Implementierungs-Status

### ✅ Abgeschlossen

- [x] Client-seitiger Schutz (Widget gehärtet)
- [x] n8n-Workflow (Rate-Limiting, Blockliste)
- [x] AI Spam-Detection (GPT-4o)
- [x] Abuse-Reporting (IP-Lookup, WHOIS, E-Mail)
- [x] Cloudflare Turnstile-Integration (optional)
- [x] Dokumentation (Quick Start, Setup, Troubleshooting)

### ⏳ Deployment (Deine Aufgaben)

1. **Redis aufsetzen** → Upstash (Free Tier): https://upstash.com/
2. **n8n-Workflow importieren** → `n8n-spam-protection-workflow.json`
3. **Credentials einrichten** (Redis, OpenAI, SMTP, IPInfo.io)
4. **Environment-Variablen setzen** → `.env.local` + n8n-Settings
5. **Widget deployen** → `npm run build && npm run export`
6. **Test-Requests** → Happy Path + Spam-Test
7. **Monitoring** → Google Sheets Dashboard
8. **(Optional) Cloudflare Turnstile** → Siehe `CLOUDFLARE-TURNSTILE-SETUP.md`

---

## Technologie-Stack

| Komponente        | Technologie              | Kosten/Monat |
|-------------------|--------------------------|-------------:|
| Frontend          | Next.js (Static Export)  | 0 €          |
| Rate-Limiting     | Redis (Upstash Free)     | 0 €          |
| AI Spam-Detection | OpenAI GPT-4o            | 5-20 €       |
| Workflow-Engine   | n8n Cloud/Self-Hosted    | 0-20 €       |
| IP-Lookup         | IPInfo.io (Free Tier)    | 0 €          |
| Bot-Protection    | Cloudflare Turnstile     | 0 €          |
| **Total**         |                          | **5-40 €**   |

---

## Wie finde ich die Spam-IPs?

### Methode 1: n8n-Logs

```
n8n → Executions → Filter: Last 24h
→ Node "Extract IP & Metadata"
→ IPs mit > 5 Requests = Spam
```

### Methode 2: Google Sheets

```
Call Logs Sheet öffnen
→ Spalte "IP" gruppieren
→ COUNTIF(IP, ">5") = Spam
```

### Methode 3: Redis-Abfrage

```bash
redis-cli -u $REDIS_URL
KEYS blocked:*
KEYS rate_limit:*
```

---

## Abuse-Report senden

### Automatisch (via n8n)

Workflow sendet automatisch E-Mail an ISP-Abuse-Kontakt, wenn:
- AI Spam-Confidence > 70%
- IP-Lookup erfolgreich (WHOIS mit abuse-mailbox)

### Manuell (bei Bedarf)

```bash
# 1. IP-Lookup
curl https://ipinfo.io/105.108.140.87

# 2. WHOIS-Lookup
curl https://rdap.org/ip/105.108.140.87

# 3. Abuse-Kontakt extrahieren
# Suche nach "abuse-mailbox" oder "abuse@..."

# 4. E-Mail senden (Template siehe SPAM-PROTECTION-SETUP.md)
```

**Wichtig**: Nur bei **eindeutigem Missbrauch** (> 10 Requests, gibberish-Namen).

---

## Performance-Impact

| Maßnahme                | Latenz      | User-Erfahrung           |
|-------------------------|------------:|--------------------------|
| Client-Validierung      | +0ms        | ✅ Transparent           |
| n8n IP-Check (Redis)    | +50-100ms   | ✅ Akzeptabel            |
| AI Spam-Detection       | +500-1000ms | ⚠️ Nur bei Verdacht      |
| Turnstile (unsichtbar)  | +200-500ms  | ✅ Transparent           |
| **Total (ohne AI)**     | ~300ms      | ✅ Kaum spürbar          |
| **Total (mit AI)**      | ~1500ms     | ⚠️ Spürbar               |

**Empfehlung**: AI nur für verdächtige Requests (gibberish, VPN-IP, etc.).

---

## Testing-Szenarien

### ✅ Happy Path (legitimer User)

```bash
curl -X POST $N8N_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 85.214.123.45" \
  -d '{"customer_name":"Max Mustermann","customer_phonenumber":"+49 151 12345678",...}'
```

**Erwartung**: 200 OK, Call wird initiiert.

### 🚫 Rate-Limit-Test

```bash
# Request 1: OK
curl -X POST ...

# Request 2: OK
curl -X POST ...

# Request 3: 429 Rate Limited
curl -X POST ...
```

**Erwartung**: 3. Request → `429 Rate Limited`, IP für 24h geblockt.

### 🤖 Spam-Test (gibberish)

```bash
curl -X POST $N8N_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 1.2.3.4" \
  -d '{"customer_name":"asdfghjkl","customer_phonenumber":"+1 555 0000",...}'
```

**Erwartung**: 
- AI Confidence > 70%
- 403 Forbidden
- Abuse-Report an ISP
- IP für 24h geblockt

---

## Troubleshooting

### Problem: Widget sendet kein `metadata`

**Lösung**: Widget deployen (`npm run build && npm run export`).

### Problem: n8n antwortet mit `502 Bad Gateway`

**Lösung**: Redis-Connection prüfen (Upstash SSL aktivieren).

### Problem: Zu viele False-Positives

**Lösung**: AI-Confidence-Threshold von 70% auf 85% erhöhen.

### Problem: Turnstile zeigt immer Challenge

**Lösung**: Widget-Mode auf "Non-Interactive" ändern (Cloudflare Dashboard).

---

## Rechtliches (DSGVO)

### IP-Logging erlaubt für:

- ✅ Sicherheit (Spam-Schutz)
- ✅ Betrieb (Fehlerdiagnose)
- ❌ Marketing (ohne Consent)

### Speicherdauer

- **Logs**: Max. 7 Tage
- **Blockliste**: 24 Stunden (automatisch gelöscht)
- **Analytics**: Anonymisiert nach 90 Tagen

### Datenschutzerklärung

Ergänze in `app/datenschutz/page.tsx`:

> Zum Schutz vor Spam und Missbrauch nutzen wir Cloudflare Turnstile (Bot-Detection) und speichern IP-Adressen für max. 7 Tage. Weitere Infos: https://www.cloudflare.com/products/turnstile/

---

## Support & Fragen

Bei Problemen:

1. **n8n-Logs prüfen** → Executions → Error-Nodes
2. **Redis-Connection testen** → `redis-cli PING`
3. **Turnstile-Dashboard** → Success-Rate > 95%?
4. **Google Sheets** → Spam-Rate < 5%?

**Contact**: Timo, schick mir:
- n8n-Execution-Logs (JSON-Export)
- Google Sheets-Export (CSV)
- Browser-Console-Logs (Widget-Fehler)

---

## Next Steps

1. ⏳ **Redis aufsetzen** (Upstash, 5 Minuten)
2. ⏳ **n8n-Workflow erweitern** (Siehe `N8N-WORKFLOW-UPGRADE-GUIDE.md`, 15 Minuten)
3. ⏳ **Credentials einrichten** (Redis, 5 Minuten)
4. ⏳ **Widget deployen** (5 Minuten)
5. ⏳ **Test-Requests** (5 Minuten)
6. ⏳ **(Optional) Cloudflare Turnstile** (15 Minuten)

**Total**: ~50-65 Minuten Setup-Zeit.

---

## Zusammenfassung

✅ **Was wurde geliefert?**

- Multi-Layer-Spam-Protection (Client + Server)
- n8n-Workflows (Rate-Limiting, AI, Abuse-Reporting)
- Cloudflare Turnstile-Integration (DSGVO-konform)
- Vollständige Dokumentation + Troubleshooting

✅ **Was musst du noch tun?**

1. Redis aufsetzen (Upstash)
2. n8n-Workflow importieren
3. Credentials einrichten
4. Deployen & Testen

✅ **Kosten?**

- 5-20 €/Monat (OpenAI GPT-4o)
- Alles andere: Free Tier (Redis, Turnstile, IPInfo.io)

✅ **Wartungsaufwand?**

- ~5 Minuten/Woche (Google Sheets checken, falsch-positive IPs entfernen)
- Automatische Abuse-Reports → kein manueller Aufwand

**Viel Erfolg, Timo! Bei Fragen melde dich.**

