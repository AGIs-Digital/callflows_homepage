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

ftpDeploy.deploy(config)
  .then(() => console.log('✨ Deployment erfolgreich abgeschlossen'))
  .catch(err => {
    console.error('🚨 Deployment fehlgeschlagen:', err);
    process.exit(1);
  });
