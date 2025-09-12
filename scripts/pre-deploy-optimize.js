const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Starte Pre-Deploy Optimierung...');

const outDir = path.join(__dirname, '../out');

// 1. Entferne unnötige Dateien um Upload zu reduzieren
function cleanupUnnecessaryFiles() {
  console.log('🧹 Entferne unnötige Dateien...');
  
  const patternsToDelete = [
    '**/*.woff',     // Nur WOFF2 behalten
    '**/*.ttf',      // TTF nicht nötig
    '**/*.otf',      // OTF nicht nötig  
    '**/*.map',      // Source Maps
    '**/.DS_Store',  // macOS
    '**/Thumbs.db',  // Windows
    '**/*.log',      // Logs
    '**/*.tmp',      // Temp files
  ];
  
  let deletedCount = 0;
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else {
        // Prüfe ob Datei gelöscht werden soll
        const shouldDelete = patternsToDelete.some(pattern => {
          // Konvertiere Glob-Pattern zu Regex
          const regexPattern = pattern
            .replace(/\*\*/g, '.*')    // ** → .*
            .replace(/(?<!\.\*)\*/g, '[^/]*')  // einzelne * → [^/]*
            .replace(/\./g, '\\.');    // . → \.
          const regex = new RegExp(regexPattern);
          return regex.test(filePath.replace(outDir, ''));
        });
        
        if (shouldDelete) {
          try {
            fs.unlinkSync(filePath);
            deletedCount++;
          } catch (e) {
            console.warn(`⚠️ Konnte ${file} nicht löschen:`, e.message);
          }
        }
      }
    });
  }
  
  if (fs.existsSync(outDir)) {
    walkDir(outDir);
    console.log(`✅ ${deletedCount} unnötige Dateien entfernt`);
  }
}

// 2. Komprimiere CSS und JS weiter (falls noch nicht optimal)
function optimizeAssets() {
  console.log('⚡ Optimiere Assets...');
  
  function optimizeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let optimized = content;
    
    // Entferne überflüssige Whitespace (sehr konservativ)
    if (filePath.endsWith('.css')) {
      optimized = content
        .replace(/\s+/g, ' ')           // Multiple spaces → single space
        .replace(/;\s*}/g, '}')         // Remove semicolon before }
        .replace(/\s*{\s*/g, '{')       // Remove space around {
        .replace(/\s*}\s*/g, '}')       // Remove space around }
        .replace(/;\s*/g, ';')          // Remove space after ;
        .trim();
    }
    
    if (filePath.endsWith('.js') && !filePath.includes('.min.')) {
      // Sehr konservative JS-Optimierung
      optimized = content
        .replace(/\s*;\s*\n\s*/g, ';')  // Remove unnecessary newlines after ;
        .replace(/\n\s*\n/g, '\n')      // Remove empty lines
        .trim();
    }
    
    // Nur schreiben wenn sich was geändert hat
    if (optimized !== content && optimized.length < content.length) {
      fs.writeFileSync(filePath, optimized);
      const saved = content.length - optimized.length;
      console.log(`📦 ${path.basename(filePath)}: ${saved} Bytes gespart`);
    }
  }
  
  // Rekursiv alle CSS/JS Dateien optimieren
  function walkAndOptimize(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkAndOptimize(filePath);
      } else if (file.endsWith('.css') || file.endsWith('.js')) {
        try {
          optimizeFile(filePath);
        } catch (e) {
          console.warn(`⚠️ Optimierung fehlgeschlagen für ${file}:`, e.message);
        }
      }
    });
  }
  
  if (fs.existsSync(outDir)) {
    walkAndOptimize(outDir);
  }
}

// 3. Erstelle Upload-Statistiken
function generateUploadStats() {
  console.log('📊 Generiere Upload-Statistiken...');
  
  let totalFiles = 0;
  let totalSize = 0;
  const fileTypes = {};
  
  function analyzeDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDir(filePath);
      } else {
        totalFiles++;
        totalSize += stat.size;
        
        const ext = path.extname(file).toLowerCase() || 'no-ext';
        if (!fileTypes[ext]) {
          fileTypes[ext] = { count: 0, size: 0 };
        }
        fileTypes[ext].count++;
        fileTypes[ext].size += stat.size;
      }
    });
  }
  
  if (fs.existsSync(outDir)) {
    analyzeDir(outDir);
    
    console.log('\n📈 Upload-Statistiken:');
    console.log(`📁 Dateien gesamt: ${totalFiles}`);
    console.log(`💾 Größe gesamt: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`⏱️ Geschätzte Upload-Zeit (20 parallel): ${Math.ceil(totalFiles / 20)} Sekunden`);
    
    console.log('\n📋 Dateitypen:');
    Object.entries(fileTypes)
      .sort((a, b) => b[1].size - a[1].size)
      .slice(0, 10)
      .forEach(([ext, data]) => {
        const sizeMB = (data.size / 1024 / 1024).toFixed(2);
        console.log(`   ${ext}: ${data.count} Dateien, ${sizeMB} MB`);
      });
  }
  
  return { totalFiles, totalSize: totalSize / 1024 / 1024 };
}

// Hauptfunktion
async function optimizeForDeploy() {
  const startTime = Date.now();
  
  try {
    cleanupUnnecessaryFiles();
    optimizeAssets();
    const stats = generateUploadStats();
    
    const duration = Date.now() - startTime;
    console.log(`\n✨ Pre-Deploy Optimierung abgeschlossen in ${duration}ms`);
    console.log(`🚀 Bereit für Upload: ${stats.totalFiles} Dateien, ${stats.totalSize.toFixed(2)} MB`);
    
    // Schätze neue Upload-Zeit
    const estimatedTime = Math.ceil(stats.totalFiles / 20); // 20 parallele Uploads
    console.log(`⏱️ Geschätzte Upload-Zeit: ~${estimatedTime} Sekunden`);
    
  } catch (error) {
    console.error('❌ Optimierung fehlgeschlagen:', error);
    process.exit(1);
  }
}

// Nur ausführen wenn direkt aufgerufen
if (require.main === module) {
  optimizeForDeploy();
}

module.exports = { optimizeForDeploy };
