# Make.com Webhook Setup für KI-Callflow Demo

## 🎯 Übersicht
Direkter Make.com Webhook für statischen Export - **KEINE API Routes nötig!**

## ⚙️ Umgebungsvariablen

### Für Development (lokal)
```bash
# .env.local erstellen:
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/YOUR_WEBHOOK_ID_HERE
```

### Für Production (Build-Zeit)
```bash
# GitHub Secrets ODER direkt im Build-Command:
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/DEINE_WEBHOOK_ID
```

## 🔧 Make.com Szenario Setup

### 1. Webhook Trigger erstellen
- Neues Szenario → **Webhooks → Custom Webhook**
- URL kopieren (Format: `https://hook.eu1.make.com/xxxxx`)
- Webhook Data Structure:
```json
{
  "phoneNumber": "+49...",
  "customerName": "Max Mustermann",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "source": "callflows_website",
  "callType": "demo_call",
  "userAgent": "Mozilla/5.0...",
  "leadData": {
    "name": "Max Mustermann",
    "phone": "+49...",
    "source": "website_widget",
    "campaign": "ki_callflow_demo",
    "requestedAt": "2024-01-01T12:00:00.000Z",
    "url": "https://callflows.de/"
  }
}
```

### 2. Synthflow Action hinzufügen
- **HTTP → Make a Request**
- URL: `https://api.synthflow.ai/v2/calls`
- Method: `POST`
- Headers:
  ```
  Authorization: Bearer YOUR_SYNTHFLOW_API_KEY
  Content-Type: application/json
  ```
- Body:
  ```json
  {
    "assistant_id": "YOUR_SYNTHFLOW_ASSISTANT_ID",
    "phone_number": "{{phoneNumber}}",
    "metadata": {
      "customer_name": "{{customerName}}",
      "source": "callflows_widget",
      "campaign": "ki_callflow_demo"
    }
  }
  ```

### 3. Optional: CRM Integration (Pipedrive)
- **Pipedrive → Create Person**
- **Pipedrive → Create Deal**
- Mapping:
  ```
  Name: {{customerName}}
  Phone: {{phoneNumber}}
  Source: Website Demo
  ```

## 🚀 Deployment

### GitHub Actions (empfohlen)
```yaml
# .github/workflows/deploy.yml
- name: Build with Make.com Webhook
  env:
    NEXT_PUBLIC_MAKE_WEBHOOK_URL: ${{ secrets.MAKE_WEBHOOK_URL }}
  run: npm run build
```

### Manueller Build
```bash
# Mit Webhook URL
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/xxxxx npm run build

# Upload out/ Ordner zu Ionos
```

## ✅ Vorteile dieser Lösung
- ✅ **Statischer Export kompatibel**
- ✅ **Keine Serverkosten**
- ✅ **Einfacher zu deployen**
- ✅ **Weniger Komplexität**
- ✅ **GitHub Secrets funktionieren**

## 🔄 Workflow
1. **Kunde** füllt Widget aus
2. **Widget** sendet direkt an Make.com
3. **Make.com** triggert Synthflow
4. **Synthflow** ruft Kunden an
5. **Optional**: CRM Update

## 🧪 Testing
```bash
# Development
npm run dev
# Widget testen mit Fallback URL

# Production
npm run build
# Upload und testen
```
