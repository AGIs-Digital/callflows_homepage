const fs = require('fs');
const path = require('path');

/**
 * Automatisches Update aller Bild-Referenzen zu WebP
 * Durchsucht alle HTML, TSX, JSX, und Markdown Dateien
 */

const supportedExtensions = ['.tsx', '.jsx', '.ts', '.js', '.html', '.md', '.mdx'];
const imageExtensions = ['.webp', '.jpg', '.jpeg', '.tiff', '.tif'];
const excludeDirs = ['node_modules', '.git', '.next', 'out', 'backups', 'docs'];

let updatedFiles = 0;
let totalReplacements = 0;

function updateImageReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    let fileReplacements = 0;

    // Pattern für verschiedene Bild-Referenzen
    const patterns = [
      // src="image.webp" -> src="image.webp"
      {
        pattern: /src=['"]([^'"]*\.(webp|jpg|jpeg|tiff|tif))['"/]/gi,
        replacement: (match, imagePath, ext) => {
          const webpPath = imagePath.replace(new RegExp(`\\.${ext}$`, 'i'), '.webp');
          fileReplacements++;
          return match.replace(imagePath, webpPath);
        }
      },
      // url("image.webp") -> url("image.webp") 
      {
        pattern: /url\(['"]([^'"]*\.(webp|jpg|jpeg|tiff|tif))['"][)]/gi,
        replacement: (match, imagePath, ext) => {
          const webpPath = imagePath.replace(new RegExp(`\\.${ext}$`, 'i'), '.webp');
          fileReplacements++;
          return match.replace(imagePath, webpPath);
        }
      },
      // import image from "./image.webp" -> import image from "./image.webp"
      {
        pattern: /import\s+\w+\s+from\s+['"]([^'"]*\.(webp|jpg|jpeg|tiff|tif))['"];?/gi,
        replacement: (match, imagePath, ext) => {
          const webpPath = imagePath.replace(new RegExp(`\\.${ext}$`, 'i'), '.webp');
          fileReplacements++;
          return match.replace(imagePath, webpPath);
        }
      },
      // require("./image.webp") -> require("./image.webp")
      {
        pattern: /require\(['"]([^'"]*\.(webp|jpg|jpeg|tiff|tif))['"][)]/gi,
        replacement: (match, imagePath, ext) => {
          const webpPath = imagePath.replace(new RegExp(`\\.${ext}$`, 'i'), '.webp');
          fileReplacements++;
          return match.replace(imagePath, webpPath);
        }
      },
      // background-image: url("image.webp") -> background-image: url("image.webp")
      {
        pattern: /background-image:\s*url\(['"]([^'"]*\.(webp|jpg|jpeg|tiff|tif))['"][)]/gi,
        replacement: (match, imagePath, ext) => {
          const webpPath = imagePath.replace(new RegExp(`\\.${ext}$`, 'i'), '.webp');
          fileReplacements++;
          return match.replace(imagePath, webpPath);
        }
      },
      // Markdown: ![alt](image.webp) -> ![alt](image.webp)
      {
        pattern: /!\[([^\]]*)\]\(([^)]*\.(webp|jpg|jpeg|tiff|tif))\)/gi,
        replacement: (match, alt, imagePath, ext) => {
          const webpPath = imagePath.replace(new RegExp(`\\.${ext}$`, 'i'), '.webp');
          fileReplacements++;
          return match.replace(imagePath, webpPath);
        }
      }
    ];

    // Wende alle Pattern an
    patterns.forEach(({ pattern, replacement }) => {
      content = content.replace(pattern, replacement);
    });

    if (fileReplacements > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      hasChanges = true;
      totalReplacements += fileReplacements;
      console.log(`📝 ${path.relative(process.cwd(), filePath)}: ${fileReplacements} Referenzen aktualisiert`);
    }

    return hasChanges;
  } catch (error) {
    console.warn(`⚠️  Fehler bei ${filePath}: ${error.message}`);
    return false;
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Überspringe ausgeschlossene Verzeichnisse
      if (excludeDirs.includes(item)) {
        continue;
      }
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (supportedExtensions.includes(ext)) {
        const wasUpdated = updateImageReferences(fullPath);
        if (wasUpdated) {
          updatedFiles++;
        }
      }
    }
  }
}

function updateAllImageReferences() {
  const startTime = Date.now();
  
  console.log('🔄 Starte Aktualisierung der Bild-Referenzen...');
  console.log('📁 Suche in:', process.cwd());
  console.log('📄 Dateitypen:', supportedExtensions.join(', '));
  console.log('🖼️  Konvertiert von:', imageExtensions.join(', '), '→ .webp');
  console.log('━'.repeat(60));
  
  try {
    processDirectory(process.cwd());
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    console.log('━'.repeat(60));
    console.log('✨ AKTUALISIERUNG ABGESCHLOSSEN');
    console.log('');
    console.log('📊 Statistiken:');
    console.log(`   📝 Dateien bearbeitet: ${updatedFiles}`);
    console.log(`   🔄 Referenzen aktualisiert: ${totalReplacements}`);
    console.log(`   ⏱️  Dauer: ${duration}s`);
    
    if (totalReplacements > 0) {
      console.log('');
      console.log('🎉 Alle Bild-Referenzen erfolgreich auf WebP aktualisiert!');
      console.log('💡 Tipp: Teste die Website um sicherzustellen, dass alle Bilder korrekt laden.');
    } else {
      console.log('');
      console.log('ℹ️  Keine Bild-Referenzen gefunden oder bereits aktualisiert.');
    }
    
  } catch (error) {
    console.error('🚨 Aktualisierung fehlgeschlagen:', error.message);
    process.exit(1);
  }
}

// Führe Aktualisierung aus wenn Script direkt aufgerufen wird
if (require.main === module) {
  updateAllImageReferences();
}

module.exports = { updateAllImageReferences, updateImageReferences }; 