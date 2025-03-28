const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

// Bestimme das richtige Deployment-Ziel basierend auf der Umgebung
const isProduction = process.env.NODE_ENV === 'production';
const targetFolder = isProduction ? 'callflows.de' : 'staging.callflows.de';

// Kopiere .env Datei in den Build-Ordner
require('fs').copyFileSync('.env', __dirname + '/../out/.env');

const config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_SERVER,
  port: 22,
  localRoot: __dirname + '/../out/',
  remoteRoot: `/`,
  include: [
    '*',
    '**/*',
    '.htaccess',
    '.env'
  ],
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
    'README.md',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    '.env.local',
    '.env.development',
    'public/videos/**'
  ],
  sftp: true,
  deleteRemote: false,
  backupDir: 'backups',
  forcePasv: true
};

// Create backup of current deployment
console.log('📦 Creating backup...');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = `${config.remoteRoot}backups`;

ftpDeploy.on('log', function(data) {
  console.log(data);
});

console.log('🚀 Starte Deployment...');
console.log('Zielordner:', targetFolder);

let failedUploads = [];

ftpDeploy.on('uploaded', function(data) {
  console.log('✅ Hochgeladen:', data.filename);
});

ftpDeploy.on('upload-error', function(data) {
  console.log('❌ Fehler beim Hochladen:', data.filename);
  failedUploads.push(data.filename);
});

ftpDeploy.deploy(config)
  .then(() => {
    console.log('✨ Deployment abgeschlossen');
    if (failedUploads.length > 0) {
      console.log('\n⚠️ Fehlerhafte Uploads:');
      failedUploads.forEach(file => console.log('   ❌', file));
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('🚨 Deployment fehlgeschlagen:', err);
    process.exit(1);
  });
