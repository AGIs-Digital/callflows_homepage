# Korrekturen-Zusammenfassung

## Gefundene Fehler in n8n-Workflows

### ❌ Fehler 1: `EXPIRE`-Operation existiert nicht

**Problem**: n8n Redis-Node hat keine `EXPIRE`-Operation.

**Lösung**: TTL direkt beim `SET` setzen.

```redis
# Falsch (geht nicht in n8n)
SET rate_limit:IP 1
EXPIRE rate_limit:IP 600  ❌

# Richtig
SET rate_limit:IP 1 EX 600  ✅
```

**Workflow-Änderung**:
- Node "Redis: Set TTL" gelöscht
- Stattdessen: IF-Check ob Key existiert → `SET` (mit TTL) oder `INCR`

---

### ❌ Fehler 2: `$now() + 86400000` ergibt Unsinn

**Problem**: `$now()` gibt Date-String zurück, nicht Millisekunden.

```javascript
// Falsch
$now() + 86400000  
// → "2025-10-28T10:30:00.000Z86400000" ❌

// Richtig
"blocked"  // Simpler String
// oder
$now().toISOString()  // Für Logging
```

**Workflow-Änderung**:

#### Rate-Limit-Block (24h)
```json
{
  "operation": "set",
  "key": "{{ 'blocked:' + IP }}",
  "value": "blocked",  // ✅ Nicht $now() + 86400000
  "ttl": 86400
}
```

#### Turnstile-Block (1h)
```json
{
  "operation": "set",
  "key": "{{ 'blocked:' + IP }}",
  "value": "turnstile_failed",  // ✅ Nicht $now() + 3600000
  "ttl": 3600
}
```

---

## Korrigierte Dateien

### 1. Main Workflow
✅ `docs/n8n-widget-workflow-enhanced.json`
- Redis Block IP: `"value": "blocked"`
- Redis Rate-Limit: TTL beim ersten SET
- Response: `retryAfter: 86400`

### 2. Turnstile Addon
✅ `docs/n8n-turnstile-verification-addon.json`
- Redis Block IP: `"value": "turnstile_failed"`
- Response: `retryAfter: 3600`

### 3. Dokumentation
✅ `docs/N8N-WORKFLOW-UPGRADE-GUIDE.md`
- Warnung zu Redis EXPIRE
- Erklärung TTL-Handling
- Korrigierte Node-Beschreibungen

✅ `docs/CLOUDFLARE-TURNSTILE-SETUP.md`
- Warnung zu $now() + Millisekunden
- Korrigierte Workflow-Snippets

✅ `docs/SCHNELLSTART-TIMO.md`
- Hinweis auf Redis-TTL-Handling

---

## Korrekte Redis-Struktur

### Rate-Limiting (2 Calls/10min)

```redis
# Request 1
GET rate_limit:85.214.123.45  # → NULL (Key existiert nicht)
SET rate_limit:85.214.123.45 1 EX 600  # ✅ TTL gesetzt

# Request 2 (nach 2 Minuten)
GET rate_limit:85.214.123.45  # → "1"
INCR rate_limit:85.214.123.45  # → 2 (TTL bleibt bei ~480s)

# Request 3 (nach 1 Minute)
GET rate_limit:85.214.123.45  # → "2" ≥ 2 ❌
→ Block IP!
```

### IP-Blockliste (24h)

```redis
# Nach Rate-Limit-Überschreitung
SET blocked:85.214.123.45 "blocked" EX 86400  # TTL 24h

# Check ob geblockt
EXISTS blocked:85.214.123.45  # → 1 (ja) / 0 (nein)
GET blocked:85.214.123.45     # → "blocked"
TTL blocked:85.214.123.45     # → 86399, 86398, ... 0
```

### Turnstile-Block (1h)

```redis
# Nach Turnstile-Failure
SET blocked:85.214.123.45 "turnstile_failed" EX 3600  # TTL 1h

# Unterscheidung möglich
GET blocked:85.214.123.45  
# → "blocked" (Rate-Limit)
# → "turnstile_failed" (Turnstile)
```

---

## Wichtigste Learnings

1. ✅ **TTL muss beim ersten SET gesetzt werden** (nicht nachträglich mit EXPIRE)
2. ✅ **Value ist egal** – Redis prüft nur ob Key existiert + TTL nicht abgelaufen
3. ✅ **$now() gibt Date-String zurück**, nicht Millisekunden → nicht für Arithmetik nutzen
4. ✅ **INCR behält TTL bei** – nur beim ersten SET TTL setzen

---

## Testing-Checkliste

### Rate-Limit-Test

```bash
# Request 1: OK
curl -X POST $WEBHOOK_URL -d '{"phone":"+49 151 123","name":"Max"}'
→ 200 OK ✅

# Request 2: OK
curl -X POST $WEBHOOK_URL -d '{"phone":"+49 151 123","name":"Max"}'
→ 200 OK ✅

# Request 3: Blocked (24h)
curl -X POST $WEBHOOK_URL -d '{"phone":"+49 151 123","name":"Max"}'
→ 429 Rate Limited ❌
→ Redis: GET rate_limit:IP → "2"
→ Redis: GET blocked:IP → "blocked"
→ Redis: TTL blocked:IP → 86400
```

### Turnstile-Test (falls aktiviert)

```bash
# Mit ungültigem Token
curl -X POST $WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"phone":"+49 151 123","name":"Max","metadata":{"turnstileToken":"INVALID"}}'
→ 403 Forbidden ❌
→ Redis: GET blocked:IP → "turnstile_failed"
→ Redis: TTL blocked:IP → 3600
```

---

## Status

✅ **Alle Workflows korrigiert**  
✅ **Dokumentation aktualisiert**  
✅ **Bereit für Import & Testing**

**Nächste Schritte**:
1. Import `n8n-widget-workflow-enhanced.json`
2. Redis-Credentials verknüpfen
3. Testing (siehe oben)
4. (Optional) Turnstile-Addon importieren

---

**Bei Fragen**: Schick mir n8n-Execution-Logs (JSON-Export) + Redis-Outputs.

