const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_SERVER,
  port: 22, // Standard SFTP Port
  localRoot: __dirname,
  remoteRoot: '/',
  deleteRemote: false,
  include: [
    '.env',
    'app/**',
    'artisan',
    'bootstrap/**',
    'composer.json',
    'composer.lock',
    'config/**',
    'database/**',
    'lang/**',
    'public/**',
    'public/.htaccess',
    'resources/**',
    'routes/**',
    'storage/**',
    'storage/logs/**'
  ],
  exclude: [
    '.env.example',
    '.git/**',
    '.github/**',
    '.vite.config.js',
    '.webpack.mix.js',
    '*.git',
    'dist/**/*.map',
    'node_modules/**',
    'README.md',
    'tests/**',
    'vendor/**',
  ],
  sftp: true
};

ftpDeploy.on('uploaded', function (data) {
  console.log(
    '✅ ' + data.filename + ' (' + data.transferredFileCount + ' / ' + data.totalFilesCount + ')'
  );
});

ftpDeploy.on('upload-error', function (data) {
  console.log('❌ ' + data.err);
});

ftpDeploy.deploy(config, function (err) {
  if (err) console.log(err);
  else console.log('finished');
});
