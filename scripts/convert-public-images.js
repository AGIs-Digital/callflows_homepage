const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Konvertiert alle Bilder im public/ Verzeichnis zu WebP
 * Für lokale Entwicklung und Konsistenz
 */

const imageExtensions = ['.png', '.jpg', '.jpeg', '.tiff', '.tif'];
const publicDir = path.join(__dirname, '../public');
let processedCount = 0;
let savedBytes = 0;

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

async function convertImageToWebP(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    
    if (!imageExtensions.includes(ext)) {
      return false;
    }

    const originalStats = fs.statSync(filePath);
    const originalSize = originalStats.size;
    
    // Überspringe sehr kleine Bilder (< 2KB)
    if (originalSize < 2 * 1024) {
      return false;
    }

    const webpPath = filePath.replace(ext, '.webp');
    
    // Überspringe wenn WebP bereits existiert und neuer ist
    if (fs.existsSync(webpPath)) {
      const webpStats = fs.statSync(webpPath);
      if (webpStats.mtime > originalStats.mtime) {
        console.log(`⏭️  ${path.basename(webpPath)} bereits aktuell`);
        return false;
      }
    }

    // Konvertiere zu WebP
    await sharp(filePath)
      .webp({
        quality: 85,
        effort: 6,
        lossless: false
      })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    const spaceSaved = originalSize - webpSize;
    
    processedCount++;
    savedBytes += spaceSaved;
    
    console.log(`🖼️  ${path.basename(filePath)} → ${path.basename(webpPath)} (${formatBytes(spaceSaved)} gespart)`);
    
    // Behalte Original für Fallback
    // fs.unlinkSync(filePath); // Kommentiert aus für Sicherheit
    
    return true;
    
  } catch (error) {
    console.warn(`⚠️  Fehler bei ${path.basename(filePath)}: ${error.message}`);
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
      if (['node_modules', '.git', '.next', 'videos'].includes(item)) {
        continue;
      }
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      await convertImageToWebP(fullPath);
    }
  }
}

async function convertPublicImages() {
  const startTime = Date.now();
  
  console.log('🎨 Konvertiere Bilder im public/ Verzeichnis...');
  console.log(`📁 Verzeichnis: ${publicDir}`);
  
  if (!fs.existsSync(publicDir)) {
    console.log('❌ Public-Verzeichnis nicht gefunden.');
    process.exit(1);
  }

  try {
    await processDirectory(publicDir);
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    console.log('━'.repeat(50));
    console.log('✨ KONVERTIERUNG ABGESCHLOSSEN');
    console.log('');
    console.log('📊 Statistiken:');
    console.log(`   🖼️  Bilder konvertiert: ${processedCount}`);
    console.log(`   💾 Speicher gespart: ${formatBytes(savedBytes)}`);
    console.log(`   ⏱️  Dauer: ${duration}s`);
    
    if (processedCount > 0) {
      console.log('');
      console.log('🎉 Public-Bilder erfolgreich zu WebP konvertiert!');
      console.log('💡 Die ursprünglichen Dateien bleiben als Fallback erhalten.');
    } else {
      console.log('');
      console.log('ℹ️  Alle Bilder sind bereits konvertiert oder zu klein.');
    }
    
  } catch (error) {
    console.error('🚨 Konvertierung fehlgeschlagen:', error.message);
    process.exit(1);
  }
}

// Führe Konvertierung aus wenn Script direkt aufgerufen wird
if (require.main === module) {
  convertPublicImages();
}

module.exports = { convertPublicImages }; 