const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const isProduction = process.env.NODE_ENV === 'production';
const targetFolder = isProduction ? 'callflows.de' : 'staging.callflows.de';


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
    '.htaccess'
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
    'public/videos/**',
    '**/.DS_Store',
    '**/Thumbs.db',
    '**/*.log',
    '**/*.tmp',
    '**/*.temp',
    '**/desktop.ini',
    '**/*.js.map',
    '**/*.css.map',
    '**/src/**',
    '**/components/**/*.test.*',
    '**/lib/**/*.test.*',
    '**/*.bak',
    '**/*.cache',
    '**/*.old',
    '**/*.woff',
    '**/*.ttf',
    '**/*.otf'
  ],
  sftp: true,
  deleteRemote: false,
  backupDir: 'backups',
  skipIfOlderModDate: true,
  preserveTimestamps: true,
  forcePasv: true,
  concurrency: 20,
  parallelReads: true,
  sftpConfig: {
    algorithms: {
      kex: ['ecdh-sha2-nistp256', 'ecdh-sha2-nistp384'],
      cipher: ['aes128-gcm', 'aes256-gcm', 'aes128-ctr'],
      hmac: ['hmac-sha2-256'],
      serverHostKey: ['ecdsa-sha2-nistp256', 'rsa-sha2-512']
    },
    compress: 'force',
    keepaliveInterval: 30000,
    keepaliveCountMax: 5,
    readyTimeout: 60000,
    highWaterMark: 32 * 1024,
    forceIPv4: true,
    tryKeyboard: false,
    debug: false
  },
  continueOnError: false,
  retries: 3,
  retryDelay: 1000
};

try {
  const { optimizeForDeploy } = require('./pre-deploy-optimize.js');
  optimizeForDeploy();
} catch (e) {
  // Ignore
}
const startTime = Date.now();
let uploadCount = 0;
let totalFiles = 0;
let totalBytes = 0;
let uploadedBytes = 0;
let failedUploads = [];
let lastProgressUpdate = 0;
let compressionEnabled = false;

const fs = require('fs');
const path = require('path');

function countFiles(dir) {
  let count = 0;
  let bytes = 0;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subResult = countFiles(fullPath);
      count += subResult.count;
      bytes += subResult.bytes;
    } else {
      count++;
      bytes += stat.size;
    }
  }
  return { count, bytes };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
}

const fileStats = countFiles(config.localRoot);
totalFiles = fileStats.count;
totalBytes = fileStats.bytes;

if (process.env.FTP_COMPRESSION !== 'false') {
  compressionEnabled = true;
}
ftpDeploy.on('log', function(data) {
  if (data.includes('error') || data.includes('Error') || data.includes('failed')) {
    console.log('⚠️', data);
  }
});

ftpDeploy.on('uploaded', function(data) {
  uploadCount++;
  
  const filePath = path.join(config.localRoot, data.filename);
  try {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      uploadedBytes += stat.size;
    }
  } catch (e) {
    // Ignore
  }
  
  const progressPercent = Math.round((uploadCount / totalFiles) * 100);
  const shouldShowProgress = 
    progressPercent % 25 === 0 && progressPercent !== lastProgressUpdate ||
    uploadCount === totalFiles;
    
  if (shouldShowProgress) {
    console.log(`📤 ${progressPercent}% (${uploadCount}/${totalFiles})`);
    lastProgressUpdate = progressPercent;
  }
});

ftpDeploy.on('upload-error', function(data) {
  console.log('❌ Fehler:', data.filename);
  failedUploads.push(data.filename);
});


ftpDeploy.deploy(config)
  .then(() => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const avgSpeed = uploadedBytes > 0 ? (uploadedBytes / 1024) / (totalTime / 1000) : 0;
    
    if (failedUploads.length > 0) {
      console.log(`⚠️ ${failedUploads.length} Fehler:`);
      failedUploads.forEach(file => console.log('❌', file));
      process.exit(1);
    } else {
      console.log('✅ Fertig');
    }
  })
  .catch(err => {
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.error(`❌ ${err.message || err}`);
    process.exit(1);
  });
