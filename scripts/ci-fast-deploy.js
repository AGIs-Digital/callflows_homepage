const FtpDeploy = require('ftp-deploy');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class CIFastDeploy {
  constructor() {
    this.ftpDeploy = new FtpDeploy();
  }

  getChangedFiles() {
    try {
      // Git-basierte Erkennung von geänderten Dateien
      let gitCommand;
      
      // Prüfe verschiedene GitHub Actions-Szenarien
      if (process.env.GITHUB_EVENT_NAME === 'push') {
        // Bei Push: Verwende GitHub-spezifische Environment-Variablen wenn verfügbar
        if (process.env.GITHUB_SHA && process.env.GITHUB_BEFORE && process.env.GITHUB_BEFORE !== '0000000000000000000000000000000000000000') {
          gitCommand = `git diff --name-only ${process.env.GITHUB_BEFORE} ${process.env.GITHUB_SHA}`;
        } else {
          // Fallback: Versuche HEAD~1
          gitCommand = 'git diff --name-only HEAD~1 HEAD 2>/dev/null || git show --name-only --format=""';
        }
      } else {
        // Fallback: Vergleiche mit main/master branch
        gitCommand = 'git diff --name-only origin/main...HEAD 2>/dev/null || git show --name-only --format=""';
      }
      
      console.log(`🐛 Git-Command: ${gitCommand}`);
      const output = execSync(gitCommand, { encoding: 'utf8' }).trim();
      console.log(`🐛 Git-Output: "${output}"`);
      
      if (!output) {
        console.log('🔍 Keine Dateien geändert');
        return [];
      }
      
             // Intelligente Zuordnung von Quellcode zu Build-Dateien
       const allChangedFiles = output.split('\n');
       const affectedFiles = new Set();
      
      for (const file of allChangedFiles) {
        // Sammle alle potenziell betroffenen Build-Dateien
        if (file.startsWith('app/') && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
          // App-Router Dateien → entsprechende HTML/JS Dateien
          const routePath = file.replace('app/', '').replace('/page.tsx', '').replace('/page.ts', '');
                     if (routePath) {
             // Spezifische Route
             affectedFiles.add(`${routePath}.html`);
             affectedFiles.add(`${routePath}/index.html`);
           } else {
             // Root-Route
             affectedFiles.add('index.html');
           }
         } else if (file.startsWith('components/') || file.startsWith('lib/')) {
           // Komponenten/Lib-Änderungen können viele Seiten betreffen
           // Füge JS-Chunks hinzu die wahrscheinlich betroffen sind
           affectedFiles.add('_next/static/chunks/pages/_app-*.js');
           affectedFiles.add('_next/static/chunks/main-*.js');
         } else if (file.includes('.css') || file.includes('tailwind')) {
           // CSS-Änderungen
           affectedFiles.add('_next/static/css/*.css');
           affectedFiles.add('globals.css');
         } else if (file.startsWith('public/')) {
           // Public-Dateien direkter Bezug
           const publicFile = file.replace('public/', '');
           affectedFiles.add(publicFile);
        }
      }
      
             // Filtere nur existierende Dateien aus dem out/ Verzeichnis
       const existingChangedFiles = Array.from(affectedFiles).filter(file => {
         const outPath = path.join('out', file);
         return fs.existsSync(outPath) && fs.statSync(outPath).isFile();
       });
       
       // Wenn weniger als 5 spezifische Dateien gefunden, nutze intelligente Glob-Patterns
       if (existingChangedFiles.length === 0 && affectedFiles.size > 0) {
        // Fallback: Verwende Patterns für häufige Änderungen
        const patterns = [];
        if (allChangedFiles.some(f => f.startsWith('components/') || f.startsWith('lib/'))) {
          patterns.push('_next/static/chunks/**/*.js');
        }
        if (allChangedFiles.some(f => f.includes('.css') || f.includes('tailwind'))) {
          patterns.push('_next/static/css/**/*.css');
        }
        if (allChangedFiles.some(f => f.startsWith('app/'))) {
          patterns.push('*.html');
          patterns.push('**/index.html');
        }
        return patterns.length > 0 ? patterns : existingChangedFiles;
      }
      
             return existingChangedFiles;
       
       // Prüfe auch auf allgemeine Änderungen, die einen kompletten Deploy erfordern
             const forceFullDeploy = allChangedFiles.some(file => 
         file.includes('package.json') ||
         file.includes('next.config.js') ||
         file.includes('tailwind.config') ||
         file.includes('components/ui/') ||
         file.includes('lib/') ||
         file.startsWith('app/layout.') ||
         file.startsWith('app/globals.') ||
         file.startsWith('scripts/') ||
         file.startsWith('.github/workflows/')
       );
      
      if (forceFullDeploy) {
        console.log('🔄 Strukturelle Änderungen erkannt - Vollständiges Deployment wird durchgeführt');
        return null; // Signal für vollständiges Deployment
      }
      
      return changedFiles;
      
          } catch (error) {
      console.log('⚠️ Git-Analyse fehlgeschlagen, führe vollständiges Deployment durch');
      console.log('Fehler:', error.message);
      
      // Zusätzliche Diagnostik
      try {
        const commitCount = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
        console.log(`🐛 Anzahl Commits im Repository: ${commitCount}`);
        
        if (parseInt(commitCount) === 1) {
          console.log('💡 Dies ist der erste Commit - Vollständiges Deployment ist korrekt');
        }
      } catch (diagnosticError) {
        console.log('🐛 Diagnostik fehlgeschlagen:', diagnosticError.message);
      }
      
      return null; // Signal für vollständiges Deployment
    }
  }

  async deploy() {
    const isProduction = process.env.NODE_ENV === 'production';
    const targetFolder = isProduction ? 'callflows.de' : 'staging.callflows.de';
    
    // Kopiere .env Datei
    require('fs').copyFileSync('.env', __dirname + '/../out/.env');
    
    const localRoot = path.join(__dirname, '..', 'out');
    
    console.log('🚀 Starte CI-Fast-Deployment...');
    console.log('📁 Zielordner:', targetFolder);
    
    // Erkenne geänderte Dateien über Git
    console.log('🔍 Analysiere Git-Änderungen...');
    const changedFiles = this.getChangedFiles();
    
    let config;
    
         if (changedFiles === null || changedFiles.length === 0) {
       // Vollständiges Deployment
       console.log('📦 Vollständiges Deployment wird durchgeführt');
       config = {
        user: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD,
        host: process.env.FTP_SERVER,
        port: 22,
        localRoot: localRoot + '/',
        remoteRoot: '/',
        include: ['*', '**/*', '.htaccess', '.env'],
        exclude: [
          '.git/**',
          '.github/**',
          'node_modules/**',
          'tests/**',
          '*.map',
          '*.ts',
          '*.tsx',
          '.next/**',
          'backups/**',
          'README.md'
        ],
                 sftp: true,
         deleteRemote: false, // Intelligentes Überschreiben ohne Löschen
         // CI-optimierte Performance-Einstellungen
        concurrency: 8,
        parallelReads: true,
        sftpConfig: {
          algorithms: {
            kex: ['diffie-hellman-group-exchange-sha256'],
            cipher: ['aes128-ctr'],
            hmac: ['hmac-sha2-256']
          },
          compress: true,
          keepaliveInterval: 60000,
          keepaliveCountMax: 3
        }
      };
    } else if (changedFiles.length > 0) {
      // Nur geänderte Dateien
      console.log(`📊 ${changedFiles.length} geänderte Dateien erkannt:`);
      changedFiles.forEach(file => console.log(`   📄 ${file}`));
      
      config = {
        user: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD,
        host: process.env.FTP_SERVER,
        port: 22,
        localRoot: localRoot + '/',
        remoteRoot: '/',
        include: changedFiles,
        exclude: [],
        sftp: true,
        deleteRemote: false,
        // Maximale Performance für wenige Dateien
        concurrency: 12,
        parallelReads: true,
        sftpConfig: {
          algorithms: {
            kex: ['diffie-hellman-group-exchange-sha256'],
            cipher: ['aes128-ctr'],
            hmac: ['hmac-sha2-256']
          },
          compress: true,
          keepaliveInterval: 30000,
          keepaliveCountMax: 5
        }
      };
    } else {
      console.log('✅ Keine Änderungen an Deploy-relevanten Dateien - Deployment übersprungen!');
      return;
    }

    const startTime = Date.now();
    let uploadCount = 0;
    const expectedFiles = changedFiles ? changedFiles.length : 'alle';

    this.ftpDeploy.on('uploaded', function(data) {
      uploadCount++;
      console.log(`📤 ${uploadCount}/${expectedFiles} - ${data.filename}`);
    });

    this.ftpDeploy.on('upload-error', function(data) {
      console.log('❌ Fehler:', data.filename, data.err);
    });

    try {
      await this.ftpDeploy.deploy(config);
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      

      
      console.log('━'.repeat(50));
      console.log('⚡ CI-FAST-DEPLOYMENT ABGESCHLOSSEN');
      console.log(`   ⏱️ Zeit: ${Math.round(totalTime / 1000)}s`);
      console.log(`   📁 Dateien: ${uploadCount}`);
      console.log(`   🚀 ~${Math.round(uploadCount / (totalTime / 1000))} Dateien/s`);
      if (changedFiles && changedFiles.length > 0) {
        console.log(`   💡 Einsparung: ${Math.round(((218 - uploadCount) / 218) * 100)}% weniger Uploads`);
      }
      console.log('━'.repeat(50));
      
    } catch (error) {
      console.error('❌ CI-Fast-Deployment fehlgeschlagen:', error.message);
      process.exit(1);
    }
  }
}

// Ausführung
const ciFastDeploy = new CIFastDeploy();
ciFastDeploy.deploy(); 