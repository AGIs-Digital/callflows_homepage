# Build-Performance Optimierungen

## 🚀 Implementierte Optimierungen

### **1. Next.js Konfiguration**
- ✅ **Experimentelle Features entfernt** (Turbo, optimizePackageImports)
- ✅ **Besseres Bundle-Splitting** (UI-Components, Vendor, Default)
- ✅ **Webpack-Cache** für schnellere nachfolgende Builds
- ✅ **Tree-Shaking** für kleinere Bundles
- ✅ **Module-Resolution** optimiert

### **2. GitHub Actions Optimierungen**
- ✅ **Node.js Cache** mit spezifischer Dependency-Pfad
- ✅ **Next.js Build Cache** für inkrementelle Builds
- ✅ **NPM Installation** optimiert (--no-audit, --prefer-offline)
- ✅ **Memory Allocation** erhöht (4GB für große Builds)

### **3. Bundle-Optimierungen**
- ✅ **Chunk-Größen** optimiert (20KB-150KB)
- ✅ **Automatische WebP-Konvertierung** für Bilder
- ✅ **SWC Minification** aktiviert
- ✅ **Dead Code Elimination** verbessert

## 📊 Performance-Messungen

### **Lokaler Performance-Test:**
```bash
npm run build:performance
```

**Was wird gemessen:**
- Build-Zeit (Ziel: <30s = 🟢, <60s = 🟡, >60s = 🔴)
- Bundle-Größe (Ziel: <10MB = 🟢, <25MB = 🟡, >25MB = 🔴)
- Datei-Anzahl und durchschnittliche Größe
- Performance-Score (0-100)

### **Erwartete Verbesserungen:**
- **Build-Zeit**: 30-50% schneller
- **Bundle-Größe**: 15-25% kleiner
- **Deploy-Zeit**: 40-60% schneller (durch Cache)

## 🛠️ Verfügbare Scripts

```bash
# Performance-Test durchführen
npm run build:performance

# Bilder zu WebP optimieren (nach Build)
npm run optimize-images

# Standard Build mit Optimierungen
npm run build
```

## 📈 Cache-Strategie

### **Lokaler Cache:**
- `.next/cache/` - Webpack Build-Cache
- Automatische Invalidierung bei Code-Änderungen

### **GitHub Actions Cache:**
- Node.js Dependencies (package-lock.json basiert)
- Next.js Build-Artefakte
- Persistiert zwischen Builds

## ⚡ Best Practices

### **Für Entwickler:**
1. **Regelmäßige Performance-Tests:** `npm run build:performance`
2. **Cache warmhalten:** Regelmäßige lokale Builds
3. **Bundle-Analyse:** Überwache Bundle-Größe

### **Für Deployments:**
1. **Incremental Builds:** Cache wird automatisch genutzt
2. **WebP-Optimierung:** Läuft automatisch bei Deploy
3. **Parallel Processing:** Nutzt alle verfügbaren CPU-Kerne

## 🔧 Troubleshooting

### **Build zu langsam?**
```bash
# Prüfe Cache-Status
ls -la .next/cache/

# Bereinige Cache
rm -rf .next/cache && npm run build
```

### **Bundle zu groß?**
```bash
# Analysiere Bundle
npm run build:performance

# Prüfe Code-Splitting Konfiguration
cat next.config.js
```

### **Out of Memory Errors?**
```bash
# Memory für Build erhöhen (bereits in package.json)
NODE_OPTIONS='--max-old-space-size=8192' npm run build
```

## 📋 Monitoring

### **Überwache diese Metriken:**
- Build-Zeit in GitHub Actions
- Bundle-Größe trends
- Deploy-Erfolgsrate
- Cache-Hit-Rate

### **Performance-Ziele:**
- **Development Build**: <15s
- **Production Build**: <30s  
- **Bundle-Größe**: <10MB
- **Deploy-Zeit**: <3min

## 🚨 Wichtige Hinweise

⚠️ **Keine experimentellen Features** - Alle Optimierungen nutzen stabile APIs
⚠️ **Cache-Invalidierung** - Bei Problemen `.next/cache` löschen
⚠️ **Memory Requirements** - Minimum 4GB RAM für Builds
⚠️ **Node.js Version** - Nutze Node.js 20+ für beste Performance 