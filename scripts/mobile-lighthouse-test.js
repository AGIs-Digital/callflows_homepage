#!/usr/bin/env node

// Mobile Lighthouse Performance Test
const { execSync } = require('child_process');

console.log('🚀 Mobile Lighthouse Performance Test');
console.log('=====================================');

try {
  // Lighthouse Mobile Test
  console.log('📱 Starte mobile Lighthouse-Analyse...');
  
  const lighthouseCmd = `npx lighthouse https://callflows.de \\
    --preset=perf \\
    --form-factor=mobile \\
    --throttling-method=devtools \\
    --chrome-flags="--headless --no-sandbox" \\
    --output=html \\
    --output-path=./lighthouse-mobile-report.html`;
  
  execSync(lighthouseCmd, { stdio: 'inherit' });
  
  console.log('✅ Mobile Lighthouse-Report erstellt: lighthouse-mobile-report.html');
  console.log('');
  console.log('📊 Mobile Performance Tipps:');
  console.log('• First Load JS sollte < 250kB sein');
  console.log('• LCP sollte < 2.5s sein');
  console.log('• CLS sollte < 0.1 sein');
  console.log('• TTI sollte < 3.8s sein');
  
} catch (error) {
  console.error('❌ Lighthouse-Test fehlgeschlagen:', error.message);
  console.log('💡 Installiere Lighthouse: npm install -g lighthouse');
}
