const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Performance-Messungen für Build-Optimierung
 * Misst Build-Zeit und Bundle-Größen
 */

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

function getDirectorySize(dirPath) {
  let totalSize = 0;
  let fileCount = 0;
  
  if (!fs.existsSync(dirPath)) {
    return { size: 0, files: 0 };
  }
  
  function calculateSize(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        calculateSize(fullPath);
      } else {
        totalSize += stat.size;
        fileCount++;
      }
    }
  }
  
  calculateSize(dirPath);
  return { size: totalSize, files: fileCount };
}

function cleanBuild() {
  console.log('🧹 Bereinige vorherigen Build...');
  try {
    if (fs.existsSync('.next')) {
      execSync('rm -rf .next', { stdio: 'pipe' });
    }
    if (fs.existsSync('out')) {
      execSync('rm -rf out', { stdio: 'pipe' });
    }
  } catch (error) {
    // Windows Fallback
    try {
      if (fs.existsSync('.next')) {
        execSync('rmdir /s /q .next', { stdio: 'pipe' });
      }
      if (fs.existsSync('out')) {
        execSync('rmdir /s /q out', { stdio: 'pipe' });
      }
    } catch (e) {
      console.log('⚠️  Manuelle Bereinigung erforderlich');
    }
  }
}

function measureBuild() {
  console.log('⏱️  Starte Build-Performance-Messung...');
  console.log('━'.repeat(60));
  
  const startTime = Date.now();
  
  try {
    // Build ausführen
    console.log('🏗️  Building...');
    execSync('npm run build', { stdio: 'inherit' });
    
    const endTime = Date.now();
    const buildTime = endTime - startTime;
    
    // Bundle-Größen messen
    const nextStats = getDirectorySize('.next');
    const outStats = getDirectorySize('out');
    
    console.log('━'.repeat(60));
    console.log('📊 BUILD-PERFORMANCE BERICHT');
    console.log('');
    console.log('⏱️  Zeit-Statistiken:');
    console.log(`   📈 Build-Zeit: ${formatDuration(buildTime)}`);
    console.log(`   🚀 Geschwindigkeit: ${buildTime < 30000 ? '🟢 Schnell' : buildTime < 60000 ? '🟡 Mittel' : '🔴 Langsam'}`);
    console.log('');
    console.log('📦 Bundle-Statistiken:');
    console.log(`   📁 .next Verzeichnis: ${formatBytes(nextStats.size)} (${nextStats.files} Dateien)`);
    console.log(`   📤 out Verzeichnis: ${formatBytes(outStats.size)} (${outStats.files} Dateien)`);
    
    // Bundle-Analyse
    if (outStats.size > 0) {
      const avgFileSize = outStats.size / outStats.files;
      console.log(`   📊 Ø Dateigröße: ${formatBytes(avgFileSize)}`);
      
      // Performance-Bewertung
      if (outStats.size < 10 * 1024 * 1024) { // < 10MB
        console.log(`   🎯 Bundle-Größe: 🟢 Optimal`);
      } else if (outStats.size < 25 * 1024 * 1024) { // < 25MB
        console.log(`   🎯 Bundle-Größe: 🟡 Akzeptabel`);
      } else {
        console.log(`   🎯 Bundle-Größe: 🔴 Zu groß`);
      }
    }
    
    console.log('');
    console.log('💡 Optimierungs-Tipps:');
    
    if (buildTime > 60000) {
      console.log('   ⚡ Build zu langsam - prüfe Dependencies');
    }
    
    if (outStats.size > 25 * 1024 * 1024) {
      console.log('   📦 Bundle zu groß - prüfe Code-Splitting');
    }
    
    if (buildTime < 30000 && outStats.size < 10 * 1024 * 1024) {
      console.log('   ✨ Optimale Performance erreicht!');
    }
    
    // Performance-Score berechnen
    let score = 100;
    if (buildTime > 30000) score -= 20;
    if (buildTime > 60000) score -= 30;
    if (outStats.size > 10 * 1024 * 1024) score -= 15;
    if (outStats.size > 25 * 1024 * 1024) score -= 25;
    
    console.log('');
    console.log(`🏆 Performance-Score: ${Math.max(0, score)}/100`);
    
    return {
      buildTime,
      bundleSize: outStats.size,
      fileCount: outStats.files,
      score: Math.max(0, score)
    };
    
  } catch (error) {
    console.error('🚨 Build fehlgeschlagen:', error.message);
    process.exit(1);
  }
}

function runPerformanceTest() {
  console.log('🎯 BUILD-PERFORMANCE TEST');
  console.log(`📅 ${new Date().toLocaleString()}`);
  console.log('');
  
  cleanBuild();
  const results = measureBuild();
  
  console.log('');
  console.log('🎉 Performance-Test abgeschlossen!');
  
  return results;
}

// Führe Test aus wenn Script direkt aufgerufen wird
if (require.main === module) {
  runPerformanceTest();
}

module.exports = { runPerformanceTest, measureBuild }; 