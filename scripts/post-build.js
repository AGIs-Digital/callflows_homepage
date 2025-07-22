const fs = require('fs');
const path = require('path');

// Kopiert einen Ordner rekursiv
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function postBuild() {
  try {
    console.log('🚀 Starting post-build process...');
    
    // Ensure out directory exists
    const outDir = path.join(process.cwd(), 'out');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    // Copy public files to out directory
    const publicDir = path.join(process.cwd(), 'public');
    console.log('📁 Copying public files...');
    copyRecursive(publicDir, outDir);
    
    // Copy .env if exists
    const envSrc = path.join(process.cwd(), '.env');
    const envDest = path.join(outDir, '.env');
    if (fs.existsSync(envSrc)) {
      console.log('🔧 Copying .env...');
      fs.copyFileSync(envSrc, envDest);
    }
    
    console.log('✅ Post-build process completed successfully!');
  } catch (error) {
    console.error('❌ Post-build process failed:', error);
    process.exit(1);
  }
}

postBuild(); 