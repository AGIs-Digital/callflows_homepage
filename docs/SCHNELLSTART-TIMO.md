# 🚀 Schnellstart für Timo

## Was wurde gemacht?

✅ **Alte Security-Components gelöscht** (redundant)  
✅ **Dein n8n-Workflow erweitert** (nicht neu erstellt!)  
✅ **Widget bleibt wie es ist** (Honeypot bereits vorhanden)  
✅ **Dokumentation aktualisiert** (kein Verweis auf alte Files)

---

## Was du jetzt tun musst

### 1. Redis aufsetzen (5 Minuten)

1. https://upstash.com/ → Account erstellen
2. Redis-Datenbank erstellen (Free Tier)
3. Connection String kopieren:
   ```
   rediss://default:PASSWORD@ENDPOINT:6379
   ```

### 2. n8n-Workflow erweitern (15 Minuten)

**⚠️ Wichtig**: n8n hat **keine `EXPIRE`-Operation**! TTL muss beim **ersten `SET`** gesetzt werden.

**Option A: Schritt-für-Schritt Upgrade** (empfohlen)
- Öffne `docs/N8N-WORKFLOW-UPGRADE-GUIDE.md`
- **Lies den Redis-Hinweis** (TTL-Handling!)
- Folge den Schritten (Nodes hinzufügen/anpassen)
- Deine Callback-Logik bleibt erhalten

**Option B: Komplett neu importieren** (schneller, aber überschreibt alles)
- `docs/n8n-widget-workflow-enhanced.json` importieren
- Deine Credentials neu verknüpfen
- Callback-Logik manuell übertragen

### 3. Widget deployen (5 Minuten)

```bash
npm run build
npm run export
# Upload zu ionos
```

### 4. Testen (5 Minuten)

```bash
# Test 1: Legitim (sollte klappen)
curl -X POST https://YOUR-N8N.../webhook/homepage-widget \
  -H "Content-Type: application/json" \
  -d '{"phone":"+49 151 123","name":"Max"}'

# Test 2: Rate-Limit (3. Request sollte 429 sein)
curl -X POST ... # Request 1: OK
curl -X POST ... # Request 2: OK
curl -X POST ... # Request 3: 429 ❌
```

---

## Wichtigste Dateien

| Datei | Zweck |
|-------|-------|
| `docs/N8N-WORKFLOW-UPGRADE-GUIDE.md` | ⭐ **Start hier!** Schritt-für-Schritt |
| `docs/n8n-widget-workflow-enhanced.json` | Dein Workflow + Spam-Protection |
| `components/widget-call/use-widget-call.ts` | Widget-Logik (bereits fertig) |
| `hooks/use-turnstile.ts` | Turnstile-Hook (optional) |

---

## Gelöschte Dateien (redundant)

- ❌ `components/security/spam-protection.tsx` (ersetzt durch `use-widget-call.ts`)
- ❌ `components/security/simple-captcha.tsx` (ersetzt durch Turnstile)
- ❌ `docs/n8n-spam-protection-workflow.json` (ersetzt durch `n8n-widget-workflow-enhanced.json`)

---

## Kosten

- **Redis** (Upstash Free): 0 €
- **Cloudflare Turnstile**: 0 € (optional)
- **n8n Self-Hosted**: 0 € (bereits vorhanden)

**Total: 0 €** (kein OpenAI GPT-4o, da nur Rate-Limiting)

---

## Nächste Schritte (optional)

1. **Cloudflare Turnstile** (DSGVO-konform, unsichtbar)
   - Siehe `docs/CLOUDFLARE-TURNSTILE-SETUP.md`

2. **AI Spam-Detection** (GPT-4o für verdächtige Namen/Nummern)
   - Siehe `docs/SPAM-PROTECTION-SETUP.md`
   - Kosten: ~5-20 €/Monat

3. **Google Sheets Logging** (für Monitoring)
   - Siehe `docs/N8N-WORKFLOW-UPGRADE-GUIDE.md`

---

## Support

Bei Problemen:
1. Check Redis-Connection (Upstash-Console)
2. Check n8n-Executions (Error-Logs)
3. Schick mir n8n-Execution-Logs (JSON-Export)

**Viel Erfolg! 🚀**

