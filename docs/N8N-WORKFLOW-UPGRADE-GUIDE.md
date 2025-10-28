# n8n-Workflow Upgrade Guide

## Übersicht

Dieser Guide erklärt, wie du **deinen bestehenden Widget-Workflow** um Spam-Protection erweiterst, **ohne ihn komplett neu zu erstellen**.

---

## Was wird hinzugefügt?

✅ **IP-Extraktion** (X-Forwarded-For, Cloudflare-IP)  
✅ **Redis Rate-Limiting** (2 Calls/10min pro IP)  
✅ **24h-Blockliste** (automatisch nach Rate-Limit)  
✅ **Metadaten-Logging** (Fingerprint, User-Agent, Timestamp)  
✅ **Strukturierte Responses** (429 Rate Limited, 200 Success)

### ⚠️ Wichtiger Hinweis zu Redis

**n8n hat keine `EXPIRE`-Operation!** 

Stattdessen setzen wir die **TTL direkt beim `SET`**:

```
Request 1 (IP: 85.214.123.45)
  ↓
GET rate_limit:85.214.123.45 → NULL (Key existiert nicht)
  ↓
SET rate_limit:85.214.123.45 1 EX 600  ✅ TTL gesetzt!
  ↓
Counter = 1, TTL = 600 Sekunden

Request 2 (gleiche IP, nach 2min)
  ↓
GET rate_limit:85.214.123.45 → "1" (Key existiert)
  ↓
INCR rate_limit:85.214.123.45  ✅ TTL bleibt bei ~480 Sekunden
  ↓
Counter = 2, TTL = ~480 Sekunden

Request 3 (gleiche IP, nach 1min)
  ↓
GET rate_limit:85.214.123.45 → "2" ❌ Rate-Limit!
  ↓
IF counter >= 2 → Block IP (24h)
```

**Wichtig**: TTL kann in Redis **nicht nachträglich** mit `EXPIRE` gesetzt werden in n8n!  
Deshalb: **IF-Check ob Key existiert** → dann `SET` (mit TTL) oder `INCR` (TTL bleibt).

---

## Upgrade-Schritte

### Schritt 1: Redis aufsetzen

1. **Upstash Redis** (Free Tier): https://upstash.com/
2. Redis-Datenbank erstellen
3. Connection String kopieren:
   ```
   rediss://default:PASSWORD@ENDPOINT:6379
   ```

4. **n8n-Credentials** hinzufügen:
   - **Credentials** → **Add** → **Redis**
   - **Host**: `ENDPOINT` (z. B. `us1-great-shark-12345.upstash.io`)
   - **Port**: `6379`
   - **Password**: `PASSWORD`
   - **Database**: `0`
   - **SSL**: `true` ✅

---

### Schritt 2: Bestehenden Workflow öffnen

1. **n8n** → **Workflows** → Dein Widget-Workflow öffnen
2. **Workflow pausieren** (oben rechts: Active → Inactive)

---

### Schritt 3: Nodes hinzufügen/anpassen

#### 3.1. Node: "Extract IP & Metadata" (NEU)

**Einfügen zwischen**: `Webhook Trigger` → `If` (oder `Code in JavaScript`)

**Node-Typ**: `Set` (n8n-nodes-base.set)

**Assignments**:
```javascript
// IP-Extraktion
{
  "ip": {{ $headers['x-forwarded-for']?.split(',')[0].trim() || $headers['cf-connecting-ip'] || $headers['x-real-ip'] || 'unknown' }},
  "phone": {{ $json.body.phone }},
  "name": {{ $json.body.name }},
  "fingerprint": {{ $json.body.metadata?.fingerprint || 'none' }},
  "userAgent": {{ $headers['user-agent'] || 'unknown' }},
  "timestamp": {{ $now() }},
  "cfRay": {{ $headers['cf-ray'] || 'none' }}
}
```

**Formel-Eingabe** (für jedes Feld einzeln):
- `ip`: `={{ $headers['x-forwarded-for']?.split(',')[0].trim() || $headers['cf-connecting-ip'] || $headers['x-real-ip'] || 'unknown' }}`
- `phone`: `={{ $json.body.phone }}`
- `name`: `={{ $json.body.name }}`
- `fingerprint`: `={{ $json.body.metadata?.fingerprint || 'none' }}`
- `userAgent`: `={{ $headers['user-agent'] || 'unknown' }}`
- `timestamp`: `={{ $now() }}`
- `cfRay`: `={{ $headers['cf-ray'] || 'none' }}`

---

#### 3.2. Node: "Redis: Check Rate Limit" (NEU)

**Node-Typ**: `Redis` → `Get`

**Key**: `={{ 'rate_limit:' + $json.ip }}`

**Credentials**: Wähle deine Redis-Credentials

---

#### 3.3. Node: "Rate Limit Exceeded?" (NEU)

**Node-Typ**: `If`

**Condition**:
- **Left Value**: `={{ $json.value ? parseInt($json.value) : 0 }}`
- **Operator**: `>=` (greater or equal)
- **Right Value**: `2`

**Output**:
- **True** → Rate-Limit überschritten → Block IP
- **False** → OK → Increment Counter

---

#### 3.4. Node: "Redis: Block IP (24h)" (NEU, True-Branch)

**Node-Typ**: `Redis` → `Set`

**Key**: `={{ 'blocked:' + $('Extract IP & Metadata').item.json.ip }}`

**Value**: `blocked` 

**Alternative für Logging** (optional):  
`={{ $now().toISOString() }}` → Speichert Blockzeit als ISO-String (z.B. `2025-10-28T10:30:00.000Z`)

**TTL**: `86400` (24 Stunden)

**Wichtig**: 
- ❌ **Nicht** `$now() + 86400000` verwenden (ergibt String + Zahl = unsinnig)
- ✅ Der **Value ist egal** – wichtig ist nur der **TTL**
- ✅ Nach 24h wird der Key automatisch gelöscht (Redis TTL)
- ✅ Optional: Timestamp als Value speichern für Debugging (wann wurde geblockt?)

---

#### 3.5. Node: "Respond: 429 Rate Limited" (NEU, nach Block)

**Node-Typ**: `Respond to Webhook`

**Response Body**:
```json
{
  "error": "Rate limit exceeded. IP blocked for 24 hours.",
  "retryAfter": 86400,
  "blockedUntil": "{{ DateTime.now().plus({ hours: 24 }).toISO() }}"
}
```

**Alternative (einfacher)**:
```json
{
  "error": "Rate limit exceeded. Try again in 24 hours.",
  "retryAfter": 86400
}
```

**Response Code**: `429`

**Headers**:
- `Retry-After`: `86400` (24 Stunden in Sekunden)

---

#### 3.6. Node: "Redis: Check if Key Exists" (NEU, False-Branch)

**Node-Typ**: `Redis` → `Get`

**Key**: `={{ 'rate_limit:' + $('Extract IP & Metadata').item.json.ip }}`

**Purpose**: Prüfen ob Rate-Limit-Key bereits existiert

---

#### 3.7. Node: "Redis: Set Counter with TTL" (NEU)

**Node-Typ**: `If`

**Condition**:
- **Left Value**: `={{ $json.value }}`
- **Operator**: `isEmpty`
- **Right Value**: (leer)

**True-Branch** (Key existiert noch nicht):
- **Node**: `Redis` → `Set`
- **Key**: `={{ 'rate_limit:' + $('Extract IP & Metadata').item.json.ip }}`
- **Value**: `1`
- **TTL**: `600` (10 Minuten)

**False-Branch** (Key existiert bereits):
- **Node**: `Redis` → `Increment`
- **Key**: `={{ 'rate_limit:' + $('Extract IP & Metadata').item.json.ip }}`
- **Note**: TTL bleibt erhalten vom ersten SET

---

#### 3.8. Node: "HTTP Request - 11labs call" (ANPASSEN)

**JSON Body ändern**:
```json
{
  "agent_id": "agent_4401k6d3axzkepws8xgvz6bqqgkn",
  "agent_phone_number_id": "phnum_1901k6mqqk7yepxrq6yew3cjk7x4",
  "to_number": "{{ $('Extract IP & Metadata').item.json.phone }}",
  "conversation_initiation_client_data": {
    "dynamic_variables": {
      "name": "{{ $('Extract IP & Metadata').item.json.name }}"
    }
  }
}
```

**Wichtig**: `$json.body.phone` → `$('Extract IP & Metadata').item.json.phone`

---

#### 3.9. Node: "Respond: 200 Success" (NEU, nach ElevenLabs)

**Node-Typ**: `Respond to Webhook`

**Response Body**:
```json
{
  "success": true,
  "message": "Call initiated",
  "callId": "{{ $json.id || 'unknown' }}"
}
```

**Response Code**: `200`

---

### Schritt 4: Connections anpassen

**Alter Flow**:
```
Webhook Trigger → If → Code → HTTP Request (11labs)
```

**Neuer Flow**:
```
Webhook Trigger
  ↓
Extract IP & Metadata
  ↓
Redis: Check Rate Limit (GET)
  ↓
Rate Limit Exceeded? (IF counter >= 2)
  ├─ TRUE → Redis: Block IP (SET mit TTL 24h) → Respond: 429 ❌
  └─ FALSE → Redis: Check if Key Exists (GET)
              ↓
              IF isEmpty?
              ├─ TRUE → Redis: Set Counter=1 (TTL 600s)
              └─ FALSE → Redis: Increment Counter
              ↓
              HTTP Request (11labs) → Respond: 200 ✅
```

**Callback-Flow** (bleibt gleich):
```
Webhook (Callback) → Code: Cleanup → Send Email
```

---

### Schritt 5: Testen

#### Test 1: Legitimer Request

```bash
curl -X POST https://YOUR-N8N.app.n8n.cloud/webhook/homepage-widget \
  -H "Content-Type: application/json" \
  -H "X-Forwarded-For: 85.214.123.45" \
  -d '{
    "phone": "+49 151 12345678",
    "name": "Max Mustermann"
  }'
```

**Erwartung**: 200 OK, Call wird initiiert.

#### Test 2: Rate-Limit

```bash
# Request 1: OK
curl -X POST ...

# Request 2: OK
curl -X POST ...

# Request 3: 429 Rate Limited
curl -X POST ...
```

**Erwartung**: 3. Request → `429 Rate Limited`, IP für 24h geblockt.

---

### Schritt 6: Workflow aktivieren

1. **Workflow speichern** (oben rechts: Save)
2. **Workflow aktivieren** (Inactive → Active)
3. **Webhook-URL prüfen** (Webhook Trigger → Copy URL)

---

## Wichtige Änderungen

### ⚠️ Breaking Changes

1. **Widget sendet jetzt JSON** (nicht mehr FormData):
   ```typescript
   // Alt (FormData)
   body: new FormData([["phone", "+49..."], ["name", "Max"]])

   // Neu (JSON)
   body: JSON.stringify({ phone: "+49...", name: "Max" })
   ```

2. **n8n muss JSON parsen**:
   - Webhook-Node: `Content-Type: application/json` akzeptieren

3. **Widget muss CORS-Header setzen**:
   ```typescript
   headers: {
     'Content-Type': 'application/json',
     'X-Fingerprint': fingerprint // (optional)
   }
   ```

---

## Troubleshooting

### Problem: "Redis connection failed"

**Lösung**:
- Upstash: SSL aktivieren (`Use SSL: true`)
- Firewall/Port 6379 öffnen
- Connection String prüfen (Password korrekt?)

### Problem: "IP immer 'unknown'"

**Ursache**: Header `X-Forwarded-For` fehlt.

**Lösung**:
- Cloudflare: Aktiviere "CF-Connecting-IP"
- ionos: Check ob Proxy-Header weitergeleitet werden

### Problem: "Rate-Limit funktioniert nicht"

**Ursache**: Redis-TTL nicht gesetzt oder Key ohne TTL erstellt.

**Lösung**:
- **Wichtig**: TTL muss beim **ersten SET** gesetzt werden (nicht nachträglich mit EXPIRE)
- Node "Redis: Set Counter=1" muss **TTL: 600** haben
- Check Redis: 
  ```bash
  GET rate_limit:85.214.123.45  # → Counter (1, 2, ...)
  TTL rate_limit:85.214.123.45  # → verbleibende Sekunden (600, 599, ...)
  ```

### Problem: "ElevenLabs-Call schlägt fehl"

**Ursache**: Referenz auf `$json.body.phone` statt `$('Extract IP & Metadata').item.json.phone`.

**Lösung**:
- Alle Referenzen in HTTP Request anpassen:
  ```json
  "to_number": "{{ $('Extract IP & Metadata').item.json.phone }}"
  ```

---

## Redis-Datenstruktur

### Rate-Limiting

```redis
# Key: rate_limit:<IP>
# Value: Integer (Counter)
# TTL: 600 Sekunden (10 Minuten)

SET rate_limit:85.214.123.45 1 EX 600
GET rate_limit:85.214.123.45  # → 1
INCR rate_limit:85.214.123.45 # → 2
```

### Blockliste

```redis
# Key: blocked:<IP>
# Value: String ("blocked" oder beliebig)
# TTL: 86400 Sekunden (24 Stunden)

SET blocked:105.108.140.87 "blocked" EX 86400
EXISTS blocked:105.108.140.87  # → 1 (geblockt) oder 0 (nicht geblockt)
GET blocked:105.108.140.87     # → "blocked"
TTL blocked:105.108.140.87     # → verbleibende Sekunden (z.B. 86000)
```

**Wichtig**: Der **Value ist egal** – Redis prüft nur ob der Key **existiert** und noch **nicht abgelaufen** ist (TTL).

---

## Monitoring

### Redis-Abfragen (Upstash-Console)

```redis
# Alle Rate-Limits
KEYS rate_limit:*

# Alle geblockten IPs
KEYS blocked:*

# Check einzelne IP
GET rate_limit:85.214.123.45
GET blocked:85.214.123.45
```

### n8n-Executions

1. **n8n** → **Executions**
2. Filter: `Last 24h`
3. Suche nach `429 Rate Limited` (geblockte Requests)

---

## Optional: AI Spam-Detection

Falls du **zusätzlich AI-basierte Spam-Erkennung** willst (für verdächtige Namen/Nummern):

1. Siehe `docs/n8n-spam-protection-workflow.json`
2. Nodes hinzufügen:
   - `IPInfo.io Lookup` (IP-Geolocation)
   - `AI Spam Detection` (GPT-4o)
   - `WHOIS Lookup` (Abuse-Kontakt)
   - `Send Abuse Report` (E-Mail)

**Kosten**: ~5-20 €/Monat (OpenAI GPT-4o).

---

## Zusammenfassung

✅ **Was geändert wurde**:
- IP-Extraktion + Metadaten-Sammlung
- Redis Rate-Limiting (2 Calls/10min)
- 24h-Blockliste (automatisch)
- Strukturierte Responses (429, 200)

✅ **Was gleich blieb**:
- ElevenLabs-Call-Logik
- Callback-Webhook + E-Mail
- Deine Credentials

✅ **Nächste Schritte**:
1. Redis aufsetzen (Upstash)
2. Nodes hinzufügen (siehe oben)
3. Testen (legitim + rate-limit)
4. Aktivieren

**Bei Fragen**: Timo, schick mir n8n-Execution-Logs (JSON-Export).

