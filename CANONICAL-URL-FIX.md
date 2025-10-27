# Canonical URL & SEO Fixes

## Problem
Google Search Console meldete: **"Seite mit Weiterleitung"** – nicht-kanonische URLs mit Redirects wurden nicht indexiert.

### Ursache
1. **`trailingSlash: true`** in `next.config.js` → Next.js erzeugt URLs mit `/` am Ende (`/blog/`, `/pricing/`)
2. **Canonical URLs ohne trailing slash** → Metadata zeigt auf `/blog`, `/pricing` (ohne `/`)
3. **Hardcodierte Canonical Links** im Root Layout (blockierten andere Seiten)
4. **Inkonsistente Metadata** – manche Seiten nutzten nicht die zentrale `generateMetadata()`-Funktion

**Resultat:** 
- Browser ruft `/blog` auf
- Next.js redirectet zu `/blog/`
- Google sieht Redirect und indexiert nicht

---

## Lösung

### 1. ✅ `trailingSlash` entfernt
**Datei:** `next.config.js`

**Vorher:**
```javascript
trailingSlash: true,
```

**Nachher:**
```javascript
// trailingSlash entfernt (Standard: false)
```

**Vorteil:** Keine automatischen Redirects mehr, URLs sind konsistent ohne trailing slash.

---

### 2. ✅ Hardcodierte Canonical Links entfernt
**Datei:** `app/layout.tsx`

**Vorher:**
```html
<link rel="canonical" href="https://callflows.de" />
<link rel="alternate" hrefLang="de" href="https://callflows.de" />
<link rel="alternate" hrefLang="x-default" href="https://callflows.de" />
```

**Nachher:**
```html
<!-- Canonical Links werden jetzt per generateMetadata() auf jeder Seite individuell gesetzt -->
```

**Vorteil:** Jede Seite hat ihre eigene, korrekte Canonical URL über die Metadata.

---

### 3. ✅ Canonical URL Safety-Check
**Datei:** `lib/seo/metadata.ts`

**Neu hinzugefügt:**
```typescript
// Ensure path doesn't have trailing slash (except for root)
const cleanPath = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
const url = `${baseUrl}${cleanPath}`;
```

**Vorteil:** Selbst wenn jemand `/blog/` als Path angibt, wird daraus `/blog` für die Canonical URL.

---

### 4. ✅ Alle Seiten auf `generateMetadata()` umgestellt

#### Kontakt-Seite (`app/kontakt/page.tsx`)
**Vorher:** Client Component mit `<Head>` (funktioniert nicht im App Router)  
**Nachher:** Server Component mit `generateMetadata()` + separater Client Component für UI

**Neue Dateien:**
- `app/kontakt/page.tsx` (Server Component mit Metadata)
- `app/kontakt/contact-page-content.tsx` (Client Component für UI)

**Canonical URL:** `https://callflows.de/kontakt`

---

#### Pricing-Seite (`app/pricing/page.tsx`)
**Vorher:** Manuelle Metadata mit `openGraph.url`  
**Nachher:** Nutzt `generateMetadata()` mit Keywords und Images

**Canonical URL:** `https://callflows.de/pricing`

---

#### About-Seite (`app/about/page.tsx`)
**Vorher:** Keine Metadata  
**Nachher:** `generateMetadata()` mit SEO-Keywords

**Canonical URL:** `https://callflows.de/about`

---

#### FAQ-Seite (`app/faq/page.tsx`)
**Vorher:** Manuelle Metadata mit `openGraph.url`  
**Nachher:** Nutzt `generateMetadata()`

**Canonical URL:** `https://callflows.de/faq`

---

#### Datenschutz-Seite (`app/datenschutz/page.tsx`)
**Vorher:** Client Component mit `<Head>`  
**Nachher:** Server Component mit `generateMetadata()` + separater Client Component

**Neue Dateien:**
- `app/datenschutz/page.tsx` (Server Component mit Metadata)
- `app/datenschutz/datenschutz-content.tsx` (Client Component für UI)

**Canonical URL:** `https://callflows.de/datenschutz`

---

#### AGB-Seite (`app/agb/page.tsx`)
**Vorher:** Client Component ohne Metadata  
**Nachher:** Server Component mit `generateMetadata()` + separater Client Component

**Neue Dateien:**
- `app/agb/page.tsx` (Server Component mit Metadata)
- `app/agb/agb-content.tsx` (Client Component für UI)

**Canonical URL:** `https://callflows.de/agb`

---

#### Glossar-Seite (`app/glossar/page.tsx`)
**Vorher:** Client Component mit `<Head>`  
**Nachher:** Server Component mit `generateMetadata()` + separater Client Component

**Neue Dateien:**
- `app/glossar/page.tsx` (Server Component mit Metadata)
- `app/glossar/glossar-content.tsx` (Client Component für UI)

**Canonical URL:** `https://callflows.de/glossar`

---

## Ergebnis

### ✅ Alle Seiten haben jetzt:
1. **Korrekte Canonical URLs** (ohne trailing slash)
2. **Keine Redirects** mehr zwischen URL-Varianten
3. **Konsistente SEO-Metadaten** über `generateMetadata()`
4. **OpenGraph & Twitter Card** Daten
5. **Strukturierte Keywords** für jede Seite

### ✅ Vorteile:
- **Google kann indexieren** – keine "Seite mit Weiterleitung"-Fehler mehr
- **Bessere SEO-Performance** – konsistente Canonical URLs
- **Wartbarkeit** – zentrale `generateMetadata()`-Funktion
- **Server-Side Rendering** – Metadata wird bei Build-Zeit generiert

---

## Next Steps

1. **Deployment:** Änderungen deployen
2. **Google Search Console:** 
   - Nach 2-3 Tagen "URL-Prüfung" erneut durchführen
   - Sitemap neu einreichen (falls vorhanden)
   - Indexierung der betroffenen URLs anfordern
3. **Monitoring:** 
   - Nach 1-2 Wochen prüfen, ob Fehler verschwunden sind
   - Coverage-Report in Search Console beobachten

---

## Technische Details

### Canonical URL Format
- **Basis:** `https://callflows.de`
- **Format:** `{baseUrl}{cleanPath}` (ohne trailing slash)
- **Beispiele:**
  - Homepage: `https://callflows.de` (Ausnahme: `/` wird beibehalten)
  - Blog: `https://callflows.de/blog`
  - Pricing: `https://callflows.de/pricing`
  - Blog-Post: `https://callflows.de/blog/ki-telefonie`

### App Router Metadata API
Alle Seiten nutzen jetzt die Next.js 13+ Metadata API:

```typescript
export const metadata = generateMetadata({
  title: 'Seitentitel',
  description: 'Beschreibung',
  path: '/pfad',
  keywords: ['Keyword1', 'Keyword2'],
  images: [{
    url: '/image.webp',
    width: 1200,
    height: 630,
    alt: 'Alt-Text'
  }]
});
```

Dies generiert automatisch:
- `<title>` Tag
- `<meta name="description">`
- `<link rel="canonical">`
- OpenGraph Tags (`og:title`, `og:description`, `og:url`, etc.)
- Twitter Card Tags
- Strukturierte Keywords

---

## Dateien geändert

### Kern-Änderungen:
1. `next.config.js` – trailingSlash entfernt
2. `app/layout.tsx` – hardcodierte Canonical Links entfernt
3. `lib/seo/metadata.ts` – Trailing Slash Safety-Check

### Seiten umgestellt:
1. `app/kontakt/page.tsx` + `app/kontakt/contact-page-content.tsx`
2. `app/pricing/page.tsx`
3. `app/about/page.tsx`
4. `app/faq/page.tsx`
5. `app/datenschutz/page.tsx` + `app/datenschutz/datenschutz-content.tsx`
6. `app/agb/page.tsx` + `app/agb/agb-content.tsx`
7. `app/glossar/page.tsx` + `app/glossar/glossar-content.tsx`

### Bereits korrekt (keine Änderung nötig):
- `app/page.tsx` (Homepage – nutzt Root Layout Metadata)
- `app/blog/page.tsx` (nutzt bereits `generateMetadata()`)
- Alle Blog-Posts (nutzen bereits `generateMetadata()`)

---

**Status:** ✅ Alle Canonical URL Probleme behoben
**Build:** ✅ Keine Linter-Fehler
**Ready:** ✅ Bereit für Deployment

