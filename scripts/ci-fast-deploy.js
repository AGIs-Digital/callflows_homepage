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
      
      const output = execSync(gitCommand, { encoding: 'utf8' }).trim();
      
      if (!output) {
        console.log('🔍 Keine Dateien geändert');
        return [];
      }
      
                    // Filtere nur Build-relevante Änderungen
       const allChangedFiles = output.split('\n');
       const buildRelevantFiles = allChangedFiles.filter(file => {
         // Nur Dateien die das Build-Output beeinflussen
         return file.startsWith('app/') ||
                file.startsWith('components/') ||
                file.startsWith('lib/') ||
                file.startsWith('public/') ||
                file.includes('.css') ||
                file.includes('tailwind') ||
                file.includes('globals.css');
       });
       
       console.log(`🔍 Build-relevante Änderungen: ${buildRelevantFiles.length}/${allChangedFiles.length}`);
       buildRelevantFiles.forEach(file => console.log(`   📄 ${file}`));
       
            // Wenn keine Build-relevanten Änderungen, überspringe Deploy
     if (buildRelevantFiles.length === 0) {
       console.log('✅ Keine Build-relevanten Änderungen - Deploy übersprungen!');
       return 'SKIP_DEPLOY'; // Spezieller Wert
     }
       
       // Vereinfachte Logik: Bei wenigen Änderungen versuche intelligentes Mapping
       if (buildRelevantFiles.length <= 3) {
         console.log('🎯 Versuche intelligentes File-Mapping...');
         
         const affectedBuildFiles = new Set();
         
         for (const file of buildRelevantFiles) {
           if (file.startsWith('app/') && file.includes('page.')) {
             // Seiten-Änderungen
             const routePath = file.replace('app/', '').replace('/page.tsx', '').replace('/page.ts', '').replace('/page.jsx', '').replace('/page.js', '');
             if (routePath) {
               affectedBuildFiles.add(`${routePath}/index.html`);
             } else {
               affectedBuildFiles.add('index.html');
             }
           } else if (file.startsWith('public/')) {
             // Public-Dateien direkter Copy
             const publicFile = file.replace('public/', '');
             affectedBuildFiles.add(publicFile);
           }
                       // Andere Änderungen führen zu JS/CSS Updates
            else if (file.startsWith('components/') || file.startsWith('lib/') || file.includes('.css')) {
              // Komponenten-Änderungen → Alle HTML-Seiten neu generieren (zu komplex für Smart-Mapping)
              console.log('🔄 Komponenten-Änderung erkannt - Vollständiges Deployment nötig');
              return null; // Vollständiges Deployment
            }
         }
         
                   // Prüfe ob die gemappten Dateien existieren (nur exakte Dateien)
          const existingFiles = [];
          for (const file of affectedBuildFiles) {
            const outPath = path.join('out', file);
            if (fs.existsSync(outPath)) {
              existingFiles.push(file);
            } else {
              console.log(`⚠️ Gemappte Datei nicht gefunden: ${file}`);
            }
          }
         
                   if (existingFiles.length > 0 && existingFiles.length <= 5) {
            console.log(`🎯 Smart-Deploy: ${existingFiles.length} spezifische Dateien`);
            existingFiles.forEach(file => console.log(`   📄 ${file}`));
            return existingFiles;
          } else if (existingFiles.length > 5) {
            console.log(`🔄 Zu viele betroffene Dateien (${existingFiles.length}) - Vollständiges Deployment sicherer`);
            return null;
          }
       }
       
       console.log('🔄 Mapping zu komplex - verwende vollständiges Deployment');
       return null; // Vollständiges Deployment
       
       // Prüfe auch auf allgemeine Änderungen, die einen kompletten Deploy erfordern
             const forceFullDeploy = allChangedFiles.some(file => 
         file.includes('package.json') ||
         file.includes('next.config.js') ||
         file.includes('tailwind.config') ||
         file.includes('components/ui/') ||
         file.includes('lib/utils') ||
         file.startsWith('app/layout.') ||
         file.startsWith('app/globals.')
         // Entfernt: scripts/ und .github/workflows/ - diese brauchen kein Rebuild
       );
      
      if (forceFullDeploy) {
        console.log('🔄 Strukturelle Änderungen erkannt - Vollständiges Deployment wird durchgeführt');
        return null; // Signal für vollständiges Deployment
      }
      
      return changedFiles;
      
          } catch (error) {
      console.log('⚠️ Git-Analyse fehlgeschlagen, führe vollständiges Deployment durch');
      console.log('Fehler:', error.message);
      
      // Vereinfachte Diagnostik
      try {
        const commitCount = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
        if (parseInt(commitCount) === 1) {
          console.log('💡 Erster Commit erkannt - Vollständiges Deployment wird durchgeführt');
        }
      } catch (e) { /* Ignoriere Diagnostik-Fehler */ }
      
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
    
    // Spezialbehandlung: Deploy überspringen
    if (changedFiles === 'SKIP_DEPLOY') {
      console.log('🎉 Deployment erfolgreich übersprungen - keine Änderungen nötig!');
      return;
    }
    
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
      
      // Kompakte Progress-Anzeige - nur alle 10 Dateien oder bei wichtigen Meilensteinen
      if (uploadCount === 1 || uploadCount % 10 === 0) {
        if (expectedFiles === 'alle') {
          // Bei vollständigem Deploy nur Zähler ohne Prozent
          console.log(`📤 ${uploadCount} Dateien hochgeladen...`);
        } else {
          // Bei bekannter Anzahl mit Progress-Bar
          const progressPercentage = Math.floor((uploadCount / expectedFiles) * 100);
          const progressBar = '█'.repeat(Math.floor(progressPercentage / 5));
          const emptyBar = '░'.repeat(20 - progressBar.length);
          console.log(`📤 ${uploadCount}/${expectedFiles} [${progressBar}${emptyBar}] ${progressPercentage}%`);
        }
      }
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