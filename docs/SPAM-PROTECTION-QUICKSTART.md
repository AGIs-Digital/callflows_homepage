# Spam-Protection Quick Start

## TL;DR – Was wurde gemacht?

1. ✅ **Widget gehärtet**: Honeypot, Fingerprinting, Timing-Checks
2. ✅ **n8n-Workflow**: IP-Rate-Limiting (2 Calls/10min), 24h-Blockliste
3. ✅ **AI Spam-Detection**: GPT-4o analysiert verdächtige Calls
4. ✅ **Abuse-Reporting**: Automatische E-Mail an ISP-Abuse-Kontakt
5. ✅ **Cloudflare Turnstile**: DSGVO-konform, unsichtbar (optional)

---

## Deployment-Checklist

### Phase 1: Basis-Schutz (ohne zusätzliche Services)

- [x] **Widget-Changes deployen**
  ```bash
  npm run build
  npm run export
  # Upload zu ionos
  ```
  → Client-seitige Validierung ist aktiv (Honeypot, Timing, localStorage Rate-Limit)

### Phase 2: n8n-Integration (empfohlen)

- [x] **Redis aufsetzen** (Upstash Free Tier)
  - [x] Account erstellen: https://upstash.com/
  - [x] Redis-Datenbank anlegen
  - [x] Connection String kopieren

- [ ] **n8n-Credentials einrichten**
  - [x] Redis (Upstash)
  - [x] OpenAI API Key (GPT-5)
  - [x] SMTP (Microsoft 365 – siehe `MICROSOFT-SMTP-SETUP.md`)
  - [ ] IPInfo.io API Key (optional, Free Tier)

- [ ] **n8n-Workflow erweitern**
  - [ ] Siehe `docs/N8N-WORKFLOW-UPGRADE-GUIDE.md` (Schritt-für-Schritt)
  - [x] Oder: `docs/n8n-widget-workflow-enhanced.json` importieren (komplett neu)
  - [x] Platzhalter ersetzen (Credentials-IDs)
  - [x] Webhook-URL kopieren

- [x] **Widget mit n8n verbinden**
  ```bash
  # .env.local
  NEXT_PUBLIC_N8N_WEBHOOK_URL=https://YOUR-N8N.app.n8n.cloud/webhook/widget-call
  ```

- [ ] **Test-Requests senden**
  - [ ] Legitimer Request (sollte durchgehen)
  - [ ] 3 Requests innerhalb 10min (3. sollte 429 Rate Limited sein)
  - [ ] Spam-Request (gibberish Name → sollte 403 Forbidden + Abuse-Report sein)

### Phase 3: Cloudflare Turnstile (optional)

- [ ] **Turnstile in Cloudflare aktivieren**
  - [ ] Domain `callflows.de` hinzufügen
  - [ ] Site Key + Secret Key kopieren

- [ ] **Environment-Variablen**
  ```bash
  # .env.local
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
  TURNSTILE_SECRET_KEY=0x4AAAAAAA... # Nur in n8n
  ```

- [ ] **Widget aktivieren**
  ```typescript
  const { startCall } = useWidgetCall({
    enableTurnstile: true
  });
  ```

- [ ] **n8n-Workflow erweitern** (Token-Verification)
  - Siehe `CLOUDFLARE-TURNSTILE-SETUP.md`

### Phase 4: Monitoring

- [ ] **Google Sheets Dashboard**
  - [ ] Sheet erstellen: "Call Logs"
  - [ ] Spalten: Timestamp, IP, Country, Name, Phone, Status, AI Confidence
  - [ ] Sheet-ID in n8n-Workflow eintragen

- [ ] **Wöchentliche Reports**
  - [ ] Spam-Rate überwachen (sollte < 5% sein)
  - [ ] IP-Blockliste prüfen (falsch-positive?)
  - [ ] Abuse-Reports tracken (Antworten von ISPs?)

---

## Sofort-Maßnahmen (nach Spam-Angriff)

### 1. IP manuell blocken

```bash
# Redis-CLI (Upstash)
redis-cli -u rediss://default:PASSWORD@ENDPOINT:PORT

# IP für 24h blocken
SET blocked:105.108.140.87 1735386000000 EX 86400

# Check ob IP geblockt
GET blocked:105.108.140.87
```

### 2. Spam-Requests in n8n-Logs finden

1. **n8n** → **Executions** → Filter: `Last 24h`
2. Node **"Extract IP & Metadata"** → Alle IPs extrahieren
3. Gruppiere nach IP → IPs mit > 5 Requests = Spam

### 3. Abuse-Report manuell senden

```bash
# IP-Lookup
curl https://ipinfo.io/105.108.140.87

# WHOIS
curl https://rdap.org/ip/105.108.140.87

# Abuse-Email finden (abuse-mailbox)
# Template siehe SPAM-PROTECTION-SETUP.md
```

---

## Kostenübersicht (pro Monat)

| Service           | Plan          | Kosten   | Benötigt?       |
|-------------------|---------------|----------:|-----------------|
| Upstash Redis     | Free          | 0 €       | ✅ Ja           |
| IPInfo.io         | Free          | 0 €       | ⚠️ Optional     |
| OpenAI (GPT-4o)   | Pay-per-Use   | 5-20 €    | ✅ Ja           |
| Cloudflare        | Free          | 0 €       | ⚠️ Optional     |
| n8n Cloud         | Free/Starter  | 0-20 €    | ✅ Ja           |
| **Total**         |               | **5-40 €**|                 |

**Bei Spam-Angriffen**: OpenAI-Kosten können steigen (1000 Spam-Requests ≈ 5 €).

### Kosten-Optimierung

1. **AI nur bei Verdacht**: Erst Rate-Limit-Check, dann AI
2. **IPInfo.io cachen**: IP-Lookups in Redis speichern (TTL 24h)
3. **Turnstile statt AI**: Turnstile ist gratis, AI kostet Token

---

## Performance-Impact

| Maßnahme                | Latenz-Erhöhung | User-Erfahrung           |
|-------------------------|----------------:|--------------------------|
| Client-Validierung      | +0ms            | ✅ Transparent           |
| n8n IP-Check (Redis)    | +50-100ms       | ✅ Akzeptabel            |
| AI Spam-Detection       | +500-1000ms     | ⚠️ Nur bei Verdacht      |
| Turnstile (unsichtbar)  | +200-500ms      | ✅ Transparent           |
| **Total (mit AI)**      | ~1500ms         | ⚠️ Spürbar               |
| **Total (ohne AI)**     | ~300ms          | ✅ Kaum spürbar          |

**Empfehlung**: AI nur für verdächtige Requests (gibberish Name, VPN-IP, etc.).

---

## Wie IP herausfinden?

### Methode 1: n8n-Logs (einfachste)

1. **n8n** → **Executions** → Execution öffnen
2. Node **"Extract IP & Metadata"** → Output:
   ```json
   {
     "ip": "105.108.140.87",
     "fingerprint": "abc123",
     "customer_name": "asdfgh",
     "customer_phone": "+234 xxx"
   }
   ```

### Methode 2: Google Sheets

1. Google Sheet öffnen (Call Logs)
2. Spalte "IP" filtern nach häufigen Requests
3. IPs mit > 5 Requests = Spam

### Methode 3: Redis-Abfrage

```bash
# Alle geblockten IPs
KEYS blocked:*

# Alle Rate-Limited IPs
KEYS rate_limit:*
```

---

## Rechtliches & Abuse-Reporting

### DSGVO-Konformität

**IP-Logging ist erlaubt** für:
- ✅ Sicherheit (Spam-Schutz)
- ✅ Betrieb (Fehlerdiagnose)
- ❌ Marketing (ohne Consent)

**Speicherdauer**: Max. 7 Tage (danach löschen oder anonymisieren).

### Abuse-Report senden

**Wichtig**: Nur bei **eindeutigem Missbrauch** (> 10 Requests, gibberish-Namen).

**Template** siehe `SPAM-PROTECTION-SETUP.md`.

**Follow-Up**: ISPs antworten selten direkt. Aber IP-Blockliste hilft sofort.

---

## Testing-Szenarien

### 1. Legitimer User (Happy Path)

```bash
curl -X POST https://n8n.../webhook/widget-call \
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

**Erwartung**: 200 OK, Call wird initiiert.

### 2. Rate-Limit-Test

```bash
# Request 1: OK
curl -X POST ...

# Request 2: OK
curl -X POST ...

# Request 3: 429 Rate Limited
curl -X POST ...
```

**Erwartung**: 3. Request → `429 Rate Limited`, IP für 24h geblockt.

### 3. Spam-Test (Gibberish)

```bash
curl -X POST https://n8n.../webhook/widget-call \
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

**Erwartung**: 
- AI Confidence > 70% → Spam
- 403 Forbidden
- Abuse-Report an ISP
- IP für 24h geblockt

---

## Troubleshooting

### Problem: Widget sendet kein `metadata`

**Ursache**: Alte Widget-Version auf Production.

**Lösung**:
```bash
npm run build
npm run export
# Upload zu ionos
```

### Problem: n8n antwortet mit `502 Bad Gateway`

**Ursache**: Redis nicht erreichbar.

**Lösung**:
- Upstash: SSL aktivieren (`Use SSL: true`)
- Connection String prüfen (Password, Port)

### Problem: Turnstile zeigt immer Challenge

**Ursache**: Widget-Mode auf "Managed" + IP-Reputation < 50.

**Lösung**:
- Mode auf "Non-Interactive" ändern (Cloudflare Dashboard)
- Oder: IP-Reputation über Zeit verbessern

### Problem: Zu viele False-Positives (echte User geblockt)

**Ursache**: AI-Confidence-Threshold zu niedrig.

**Lösung**:
- In n8n-Workflow: Confidence von 70% auf 85% erhöhen
- Oder: Manuelle Review-Queue (Slack-Benachrichtigung bei 70-85%)

---

## Next Steps

1. ✅ **Widget deployen** (Client-Schutz aktiv)
2. ⏳ **n8n-Workflow einrichten** (IP-Rate-Limiting)
3. ⏳ **Test-Requests** (Happy Path + Spam)
4. ⏳ **Monitoring aufsetzen** (Google Sheets)
5. ⏳ **Cloudflare Turnstile** (optional, aber empfohlen)

---

## Support & Dokumentation

- **n8n-Workflow**: `docs/n8n-spam-protection-workflow.json`
- **Turnstile-Setup**: `docs/CLOUDFLARE-TURNSTILE-SETUP.md`
- **Detaillierte Doku**: `docs/SPAM-PROTECTION-SETUP.md`

**Bei Fragen**: Timo, schick mir n8n-Execution-Logs + Google Sheets-Export.

