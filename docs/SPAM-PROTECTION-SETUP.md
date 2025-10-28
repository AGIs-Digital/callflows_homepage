# Spam-Protection & Rate-Limiting Setup

## Übersicht

Multi-Layer-Schutz gegen Missbrauch des Widget-Call-Systems:

1. **Client-seitig** (Widget): Honeypot, Fingerprinting, Timing-Checks
2. **Server-seitig** (n8n): IP-Rate-Limiting, Blockliste, Spam-Detection
3. **Abuse-Reporting**: Automatische IP-Lookup & E-Mail an ISP-Abuse-Kontakt

---

## Client-Schutz (bereits implementiert)

### Maßnahmen

- **Honeypot-Feld**: Unsichtbares `<input name="website">` – Bots füllen es aus → Request blockiert
- **Browser-Fingerprinting**: Canvas-Hashing + Screen-Resolution + Timezone → Eindeutige ID
- **Timing-Check**: Formular darf nicht in < 2 Sekunden ausgefüllt werden
- **localStorage Rate-Limit**: Max. 3 Calls pro 10min pro Gerät

### Limitation

Client-seitig ist **leicht umgehbar** (Inkognito, localStorage löschen). Deshalb **n8n als Gatekeeper**.

---

## n8n-Workflow Setup

### Voraussetzungen

1. **Redis** (für Rate-Limiting & Blockliste)
   - Option A: Lokal (Docker: `docker run -d -p 6379:6379 redis:alpine`)
   - Option B: Cloud (Upstash Redis – Free Tier: https://upstash.com/)

2. **IPInfo.io API-Key** (optional, aber empfohlen)
   - Free Tier: 50.000 Requests/Monat
   - Anmeldung: https://ipinfo.io/signup

3. **OpenAI API-Key** (für AI Spam-Detection)
   - Benötigt: GPT-4o-Zugang

4. **SMTP-Credentials** (für Abuse-Reports)
   - Microsoft 365 SMTP (siehe `MICROSOFT-SMTP-SETUP.md`)

### Import des Workflows

1. n8n öffnen → **Workflows** → **Import from File**
2. `docs/n8n-spam-protection-workflow.json` hochladen
3. **Platzhalter ersetzen**:
   - `YOUR_REDIS_CREDENTIAL_ID` → Redis-Credentials anlegen
   - `YOUR_IPINFO_CREDENTIAL_ID` → Bearer Token mit IPInfo.io API-Key
   - `YOUR_OPENAI_CREDENTIAL_ID` → OpenAI API Key
   - `YOUR_SMTP_CREDENTIAL_ID` → SMTP (Microsoft 365)
   - `YOUR_VAPI_CREDENTIAL_ID` → VAPI Bearer Token
   - `YOUR_VAPI_ASSISTANT_ID` → Deine VAPI Assistant-ID
   - `YOUR_GOOGLE_SHEET_ID` → Google Sheet für Logging (optional)

### Credential-Setup

#### 1. Redis (Upstash empfohlen)

```bash
# Upstash Redis erstellen (Console: https://console.upstash.com/)
# Connection String kopieren:
# Format: rediss://default:PASSWORD@ENDPOINT:PORT
```

In n8n:
- **Credentials** → **Add** → **Redis**
- **Host**: `ENDPOINT` (z. B. `us1-great-shark-12345.upstash.io`)
- **Port**: `6379`
- **Password**: `PASSWORD`
- **Database**: `0`
- **SSL**: `true` (bei Upstash)

#### 2. IPInfo.io

```bash
# API-Key holen: https://ipinfo.io/account/token
```

In n8n:
- **Credentials** → **Add** → **Header Auth**
- **Name**: `IPInfo Bearer Token`
- **Auth Type**: `Bearer Token`
- **Token**: `YOUR_IPINFO_TOKEN`

#### 3. OpenAI

In n8n:
- **Credentials** → **Add** → **OpenAI API**
- **API Key**: `sk-...`

#### 4. SMTP (Microsoft 365)

Siehe `MICROSOFT-SMTP-SETUP.md` für App-Passwort-Setup.

In n8n:
- **Credentials** → **Add** → **SMTP**
- **Host**: `smtp.office365.com`
- **Port**: `587`
- **User**: `security@callflows.de`
- **Password**: `APP_PASSWORD`
- **TLS**: `true`

---

## Workflow-Logik

### 1. Webhook-Empfang + IP-Extraktion

```
Widget sendet POST /webhook/widget-call
↓
Extract IP aus Headers:
  - x-forwarded-for (Cloudflare)
  - cf-connecting-ip (Cloudflare)
  - x-real-ip (Fallback)
```

### 2. Rate-Limit-Check (Redis)

```
Redis-Key: rate_limit:<IP>
Value: Call-Counter
TTL: 600 Sekunden (10 Minuten)

IF counter >= 2:
  ├─ Block IP für 24h (Redis: blocked:<IP>)
  └─ Respond 429 Rate Limited
ELSE:
  ├─ Increment Counter
  └─ Continue
```

### 3. IP-Lookup (IPInfo.io)

```
GET https://ipinfo.io/<IP>/json
→ Country, City, Organization, Abuse-Kontakt
```

### 4. AI Spam-Detection (GPT-4o)

```
Analyse:
  - Name-Plausibilität (gibberish?)
  - Telefonnummer-Region vs. IP-Land
  - Timing-Patterns
  - Fingerprint-Anomalien

Output:
{
  "is_spam": boolean,
  "confidence": 0-100,
  "reason": "..."
}

IF is_spam AND confidence >= 70%:
  ├─ Block IP (24h)
  ├─ WHOIS-Lookup → Abuse-Report senden
  └─ Respond 403 Forbidden
```

### 5. Abuse-Reporting (automatisch)

```
WHOIS/RDAP Lookup:
  → https://rdap.org/ip/<IP>
  → Extract abuse-email

E-Mail-Template:
Subject: [ABUSE REPORT] Spam activity from IP <IP>
Body:
  - Timestamp (UTC)
  - Source IP + Geolocation
  - User-Agent, Cloudflare Ray ID
  - AI-Confidence + Reason
  - Target: callflows.de/widget-call

CC: info@callflows.de (für eigenes Tracking)
```

### 6. Logging (Google Sheets)

Jeder Request wird geloggt:
- Timestamp
- IP + Geolocation
- Fingerprint
- Customer Name/Phone
- Status (allowed/blocked/spam)
- AI Confidence

---

## Redis-Struktur

```redis
# Rate-Limiting
SET rate_limit:192.168.1.1 2 EX 600

# Blockliste (24h)
SET blocked:192.168.1.1 1735386000000 EX 86400

# Fingerprint-Tracking (optional)
SADD fingerprint:abc123 "192.168.1.1" "192.168.1.2"
```

---

## IP-Herausfinden & Rechtliche Schritte

### IP aus n8n-Logs extrahieren

```bash
# n8n Workflow-Execution öffnen
# Node "Extract IP & Metadata" → Output anzeigen
# IP steht in: $.ip
```

### IP-Lookup (manuell)

```bash
# WHOIS
curl https://ipinfo.io/105.108.140.87

# RDAP (detaillierter)
curl https://rdap.org/ip/105.108.140.87
```

### Abuse-Kontakt finden

```bash
# Aus WHOIS/RDAP:
# Suche nach "abuse-mailbox" oder "abuse@..."
# Fallback: abuse@<ISP-Name>.com
```

### Abuse-Report senden (manuell)

**Betreff**: `[ABUSE REPORT] Spam activity from IP 105.108.140.87`

**Inhalt**:

```
Dear Abuse Team,

We are reporting automated spam/abuse activity originating from your network:

--- REQUEST DETAILS ---
Timestamp (UTC): 2025-10-28T10:15:32.000Z
Source IP: 105.108.140.87
User-Agent: python-requests/2.28.1 (Bot detected)
Cloudflare Ray ID: 8c9d4e5f6a7b8c9d
Domain: callflows.de
Endpoint: POST /webhook/widget-call

--- GEOLOCATION ---
Country: Nigeria
City: Lagos
Organization: MTN Nigeria

--- ABUSE PATTERN ---
- 47 automated requests within 5 minutes
- Random phone numbers (pattern: +234 XXX XXX XXX)
- Fake names (Lorem, Test123, etc.)
- AI Spam Confidence: 94%

Please investigate and take appropriate action.

Best regards,
Timo Grünewald
callflows.de
info@callflows.de
```

---

## Cloudflare-Integration (optional, stark empfohlen)

### Turnstile (reCAPTCHA-Alternative)

Vorteile:
- **Unsichtbar** (kein "Klick auf Verkehrsampel")
- **DSGVO-konform**
- **Free Tier**: 1M Requests/Monat

Setup siehe nächste TODO.

### WAF (Web Application Firewall)

- Rate-Limiting auf Cloudflare-Ebene
- Geo-Blocking (z. B. nur DACH-Länder erlauben)
- Bot-Detection (Challenge Score < 30 → Block)

---

## Monitoring & Alerting

### Google Sheets Dashboard

Erstelle ein Google Sheet mit folgenden Spalten:

```
| Timestamp | IP | Country | Name | Phone | Status | AI Confidence | Reason |
```

Nutze Formeln für Statistiken:
```excel
=COUNTIF(G:G,"blocked")  # Geblockte IPs
=COUNTIF(G:G,"spam")      # Erkannter Spam
=AVERAGE(H:H)             # Durchschnittliche AI-Confidence
```

### Slack/Discord-Benachrichtigung (optional)

In n8n-Workflow einbauen (nach "Is Spam?"):

```json
{
  "node": "Slack: Send Alert",
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "channel": "#security-alerts",
    "text": "🚨 Spam detected from {{ $('Extract IP & Metadata').item.json.ip }}\nConfidence: {{ $('AI Spam Detection').item.json.confidence }}%"
  }
}
```

---

## Testing

### 1. Legitimer Request (sollte durchgehen)

```bash
curl -X POST https://YOUR-N8N-INSTANCE.com/webhook/widget-call \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 85.214.123.45" \
  -d '{
    "customer_name": "Max Mustermann",
    "customer_phonenumber": "+49 151 12345678",
    "metadata": {
      "fingerprint": "abc123",
      "timestamp": "2025-10-28T10:00:00.000Z",
      "userAgent": "Mozilla/5.0...",
      "language": "de-DE",
      "timezone": "Europe/Berlin",
      "referrer": "https://callflows.de",
      "screenResolution": "1920x1080"
    }
  }'
```

### 2. Rate-Limit-Test (3x innerhalb 10min)

```bash
# Request 1: OK
curl -X POST ...

# Request 2: OK
curl -X POST ...

# Request 3: 429 Rate Limited
curl -X POST ...
```

### 3. Spam-Test (gibberish Name + verdächtige IP)

```bash
curl -X POST https://YOUR-N8N-INSTANCE.com/webhook/widget-call \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 1.2.3.4" \
  -d '{
    "customer_name": "asdfghjkl",
    "customer_phonenumber": "+1 555 0000",
    "metadata": {
      "fingerprint": "test123",
      "timestamp": "2025-10-28T10:00:00.000Z",
      "userAgent": "python-requests/2.28.1",
      "language": "en-US",
      "timezone": "UTC",
      "referrer": "",
      "screenResolution": "800x600"
    }
  }'
```

→ Sollte 403 Forbidden zurückgeben + Abuse-Report senden.

---

## Troubleshooting

### Fehler: "CORS blocked"

**Problem**: Widget sendet `mode: 'cors'`, aber n8n-Webhook hat keine CORS-Header.

**Lösung**: In n8n-Webhook-Node:

```json
{
  "options": {
    "responseHeaders": {
      "entries": [
        { "name": "Access-Control-Allow-Origin", "value": "https://callflows.de" },
        { "name": "Access-Control-Allow-Methods", "value": "POST, OPTIONS" },
        { "name": "Access-Control-Allow-Headers", "value": "Content-Type, X-Fingerprint, X-Request-Timestamp" }
      ]
    }
  }
}
```

Zusätzlich: **OPTIONS-Request** in n8n abfangen:

```
IF $httpMethod === 'OPTIONS':
  → Respond 200 mit CORS-Headers
```

### Fehler: "Redis connection failed"

**Problem**: n8n kann nicht auf Redis zugreifen.

**Lösung**:
- Upstash: SSL-Verbindung aktivieren (`Use SSL: true`)
- Lokal: Firewall/Port 6379 öffnen

### IPInfo.io Rate-Limit

**Problem**: > 50k Requests/Monat (Free Tier).

**Lösung**:
- Caching in Redis: `SET ipinfo:<IP> <JSON> EX 86400`
- Vor IPInfo-Lookup: Check ob IP bereits gecacht

---

## Kosten-Übersicht

| Service           | Plan          | Kosten/Monat | Limit              |
|-------------------|---------------|-------------:|--------------------|
| Upstash Redis     | Free          |         0 €  | 10k Commands/Tag   |
| IPInfo.io         | Free          |         0 €  | 50k Requests       |
| OpenAI (GPT-4o)   | Pay-per-Use   |    ~5-20 €   | 0,005 $/1k Tokens  |
| Cloudflare        | Free          |         0 €  | Unlimited          |
| **Total**         |               |   **5-20 €** |                    |

Mit ~100 Spam-Requests/Tag → ca. **10 € / Monat** (hauptsächlich OpenAI).

---

## Next Steps

1. ✅ **Widget-Härtung** (Client-seitig)
2. ✅ **n8n-Workflow importieren**
3. ⏳ **Redis + Credentials einrichten**
4. ⏳ **Workflow testen** (legitim + spam)
5. ⏳ **Cloudflare Turnstile integrieren** (siehe nächste Doku)
6. ⏳ **Monitoring Dashboard** (Google Sheets/Slack)

---

## Support

Bei Fragen:
- n8n Community: https://community.n8n.io/
- Redis Docs: https://redis.io/docs/
- IPInfo.io: https://ipinfo.io/developers

**Timo**: Falls Workflow nicht funktioniert → n8n-Execution-Logs teilen.

