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
    '.next/**'
  ],
  sftp: true,
  forcePasv: true
};

console.log('🚀 Starte Deployment...');
console.log('Server:', process.env.FTP_SERVER);
console.log('Username:', process.env.FTP_USERNAME);
console.log('Using SFTP:', config.sftp);

let failedUploads = [];

// Event-Listener für Upload-Fortschritt
ftpDeploy.on('uploaded', function(data) {
  console.log('✅ Hochgeladen:', data.filename + ' (' + data.transferredFileCount + ' / ' + data.totalFilesCount + ' Dateien)');
});

ftpDeploy.on('upload-error', function(data) {
  console.log('❌ Fehler beim Hochladen:', data.filename);
  failedUploads.push(data.filename);
});

ftpDeploy.deploy(config)
  .then(() => {
    console.log('✨ Deployment abgeschlossen');
    if (failedUploads.length > 0) {
      console.log('\n⚠️ Folgende Dateien konnten nicht hochgeladen werden:');
      failedUploads.forEach(file => console.log('   ❌', file));
      process.exit(1);
    }
    console.log('✅ Alle Dateien erfolgreich hochgeladen');
  })
  .catch(err => {
    console.error('🚨 Deployment fehlgeschlagen:', err);
    process.exit(1);
  });
