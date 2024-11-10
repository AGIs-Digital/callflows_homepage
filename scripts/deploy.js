const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD, 
  host: process.env.FTP_SERVER,
  port: 22,
  localRoot: __dirname + '/../out',
  remoteRoot: '/',
  include: ['*', '**/*'],
  exclude: [
    '.git/**',
    '.github/**',
    'node_modules/**',
    'tests/**',
    '*.map',
    '.env*',
    '.next/**'
  ],
  sftp: true,
  forcePasv: true
};

console.log('🚀 Starte Deployment...');

ftpDeploy.on('uploading', function(data) {
  console.log(`📦 Upload: ${data.filename} (${data.transferredFileCount}/${data.totalFilesCount})`);
});

ftpDeploy.on('uploaded', function(data) {
  console.log(`✅ Fertig: ${data.filename}`);
});

ftpDeploy.on('upload-error', function(data) {
  console.error(`❌ Fehler beim Upload von ${data.filename}: ${data.err}`);
});

ftpDeploy.deploy(config)
  .then(() => console.log('✨ Deployment erfolgreich abgeschlossen'))
  .catch(err => console.error('🚨 Deployment fehlgeschlagen:', err));
