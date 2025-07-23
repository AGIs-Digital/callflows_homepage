const FtpDeploy = require('ftp-deploy');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class FastDeploy {
  constructor() {
    this.ftpDeploy = new FtpDeploy();
    this.checksumFile = path.join(__dirname, '..', '.deploy-checksums.json');
    this.lastChecksums = this.loadChecksums();
  }

  loadChecksums() {
    try {
      if (fs.existsSync(this.checksumFile)) {
        return JSON.parse(fs.readFileSync(this.checksumFile, 'utf8'));
      }
    } catch (error) {
      console.log('⚠️ Checksums konnten nicht geladen werden, alle Dateien werden hochgeladen');
    }
    return {};
  }

  saveChecksums(checksums) {
    try {
      fs.writeFileSync(this.checksumFile, JSON.stringify(checksums, null, 2));
    } catch (error) {
      console.log('⚠️ Checksums konnten nicht gespeichert werden');
    }
  }

  generateFileChecksum(filePath) {
    try {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('md5').update(content).digest('hex');
    } catch (error) {
      return null;
    }
  }

  getChangedFiles(localRoot) {
    const changedFiles = [];
    const newChecksums = {};

    const scanDirectory = (dir, relativePath = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativeFilePath = path.join(relativePath, item).replace(/\\/g, '/');
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanDirectory(fullPath, relativeFilePath);
        } else {
          const checksum = this.generateFileChecksum(fullPath);
          newChecksums[relativeFilePath] = checksum;

          // Datei ist neu oder verändert
          if (!this.lastChecksums[relativeFilePath] || 
              this.lastChecksums[relativeFilePath] !== checksum) {
            changedFiles.push(relativeFilePath);
          }
        }
      }
    };

    scanDirectory(localRoot);
    
    return { changedFiles, newChecksums };
  }

  async deploy() {
    const isProduction = process.env.NODE_ENV === 'production';
    const targetFolder = isProduction ? 'callflows.de' : 'staging.callflows.de';
    
    // Kopiere .env Datei
    require('fs').copyFileSync('.env', __dirname + '/../out/.env');
    
    const localRoot = path.join(__dirname, '..', 'out');
    
    console.log('🚀 Starte Fast-Deployment...');
    console.log('📁 Zielordner:', targetFolder);
    
    // Erkenne geänderte Dateien
    console.log('🔍 Analysiere Dateien...');
    const { changedFiles, newChecksums } = this.getChangedFiles(localRoot);
    
    if (changedFiles.length === 0) {
      console.log('✅ Keine Änderungen erkannt - Deployment übersprungen!');
      return;
    }
    
    console.log(`📊 ${changedFiles.length} geänderte Dateien erkannt:`);
    changedFiles.forEach(file => console.log(`   📄 ${file}`));
    
    const config = {
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      host: process.env.FTP_SERVER,
      port: 22,
      localRoot: localRoot + '/',
      remoteRoot: '/',
      include: changedFiles.length > 0 ? changedFiles : ['*'],
      exclude: [],
      sftp: true,
      deleteRemote: false,
      // Maximale Performance-Einstellungen
      concurrency: 12, // Noch mehr parallele Uploads
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

    const startTime = Date.now();
    let uploadCount = 0;

    this.ftpDeploy.on('uploaded', function(data) {
      uploadCount++;
      console.log(`📤 ${uploadCount}/${changedFiles.length} - ${data.filename}`);
    });

    this.ftpDeploy.on('upload-error', function(data) {
      console.log('❌ Fehler:', data.filename, data.err);
    });

    try {
      await this.ftpDeploy.deploy(config);
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // Speichere neue Checksums
      this.saveChecksums(newChecksums);
      
      console.log('━'.repeat(50));
      console.log('⚡ FAST-DEPLOYMENT ABGESCHLOSSEN');
      console.log(`   ⏱️ Zeit: ${Math.round(totalTime / 1000)}s`);
      console.log(`   📁 Dateien: ${uploadCount}/${changedFiles.length}`);
      console.log(`   🚀 ~${Math.round(uploadCount / (totalTime / 1000))} Dateien/s`);
      console.log('━'.repeat(50));
      
    } catch (error) {
      console.error('❌ Fast-Deployment fehlgeschlagen:', error.message);
      process.exit(1);
    }
  }
}

// Ausführung
const fastDeploy = new FastDeploy();
fastDeploy.deploy(); 