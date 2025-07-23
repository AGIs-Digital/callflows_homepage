const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

// Bestimme das richtige Deployment-Ziel basierend auf der Umgebung
const isProduction = process.env.NODE_ENV === 'production';
const targetFolder = isProduction ? 'callflows.de' : 'staging.callflows.de';

// WICHTIG: Für API-Support verwenden wir .next/ statt out/
const sourceFolder = __dirname + '/../.next/';

// Kopiere .env Datei in den Build-Ordner
require('fs').copyFileSync('.env', sourceFolder + '.env');

const config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_SERVER,
  port: 22,
  localRoot: sourceFolder,
  remoteRoot: `/`,
  include: [
    '*',
    '**/*',
  ],
  exclude: [
    '.DS_Store',
    'Thumbs.db',
    '.git/**/*',
    '.gitignore',
    'node_modules/**/*',
    '.next/cache/**/*',
    'README.md',
    'package.json',
    'package-lock.json',
    '.env.local',
    '.env.example',
    'tsconfig.json',
    'tailwind.config.ts',
    'postcss.config.js',
    'components.json',
    '*.log',
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false,
};

console.log('\n🚀 Starting API-enabled deployment...');
console.log(`📁 Source: ${sourceFolder}`);
console.log(`🎯 Target: ${targetFolder}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV}`);

ftpDeploy
  .deploy(config)
  .then(res => {
    console.log('\n✅ API deployment completed successfully!');
    console.log(`📊 Uploaded ${res.length} files`);
  })
  .catch(err => {
    console.log('\n❌ Deployment failed:', err.message);
    process.exit(1);
  });

ftpDeploy.on('uploading', function(data) {
  const progress = Math.round((data.transferredFileCount / data.totalFilesCount) * 100);
  console.log(`📤 [${progress}%] ${data.filename}`);
});

ftpDeploy.on('uploaded', function(data) {
  console.log(`✅ ${data.filename}`);
});

ftpDeploy.on('log', function(data) {
  console.log('📋', data);
});