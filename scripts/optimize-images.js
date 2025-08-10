const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Optimiert alle Bilder automatisch zu WebP beim Deploy
 * Spart bis zu 80% Speicherplatz bei gleicher Qualität
 */

const imageExtensions = ['.jpg', '.jpeg', '.webp', '.tiff', '.tif'];
const outputDir = path.join(__dirname, '../out');
let processedCount = 0;
let savedBytes = 0;

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

async function convertToWebP(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    
    if (!imageExtensions.includes(ext)) {
      return false;
    }

    const originalStats = fs.statSync(filePath);
    const originalSize = originalStats.size;
    
    // Überspringe sehr kleine Bilder (< 5KB)
    if (originalSize < 5 * 1024) {
      return false;
    }

    const webpPath = filePath.replace(ext, '.webp');
    
    // Überspringe wenn WebP bereits existiert und neuer ist
    if (fs.existsSync(webpPath)) {
      const webpStats = fs.statSync(webpPath);
      if (webpStats.mtime > originalStats.mtime) {
        return false;
      }
    }

    await sharp(filePath)
      .webp({
        quality: 85, // Optimale Balance zwischen Qualität und Größe
        effort: 6,   // Bessere Kompression (0-6)
        lossless: false
      })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    const spaceSaved = originalSize - webpSize;
    
    // Lösche Original nur wenn WebP deutlich kleiner ist (>10% Einsparung)
    if (spaceSaved > originalSize * 0.1) {
      fs.unlinkSync(filePath);
      processedCount++;
      savedBytes += spaceSaved;
      
      console.log(`🖼️  ${path.basename(filePath)} → ${path.basename(webpPath)} (${formatBytes(spaceSaved)} gespart)`);
      return true;
    } else {
      // WebP nicht effizienter, lösche WebP und behalte Original
      fs.unlinkSync(webpPath);
      return false;
    }
    
  } catch (error) {
    console.warn(`⚠️  Fehler bei ${filePath}: ${error.message}`);
    return false;
  }
}

async function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Überspringe bestimmte Verzeichnisse
      if (['node_modules', '.git', '.next', 'backups'].includes(item)) {
        continue;
      }
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      await convertToWebP(fullPath);
    }
  }
}

async function optimizeImages() {
  const startTime = Date.now();
  
  console.log('🎨 Starte Bild-Optimierung...');
  console.log(`📁 Verzeichnis: ${outputDir}`);
  
  if (!fs.existsSync(outputDir)) {
    console.log('❌ Build-Verzeichnis nicht gefunden. Führe zuerst "npm run build" aus.');
    process.exit(1);
  }

  try {
    await processDirectory(outputDir);
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    console.log('━'.repeat(50));
    console.log('✨ BILD-OPTIMIERUNG ABGESCHLOSSEN');
    console.log('');
    console.log('📊 Statistiken:');
    console.log(`   🖼️  Bilder konvertiert: ${processedCount}`);
    console.log(`   💾 Speicher gespart: ${formatBytes(savedBytes)}`);
    console.log(`   ⏱️  Dauer: ${duration}s`);
    console.log(`   📈 Durchschnitt: ${processedCount > 0 ? formatBytes(savedBytes / processedCount) : '0 Bytes'} pro Bild`);
    
    if (processedCount > 0) {
      console.log('\n🚀 Tipp: Aktualisiere HTML/CSS um .webp Dateien zu verwenden!');
    }
    
  } catch (error) {
    console.error('🚨 Optimierung fehlgeschlagen:', error.message);
    process.exit(1);
  }
}

// Führe Optimierung aus wenn Script direkt aufgerufen wird
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages, convertToWebP }; 