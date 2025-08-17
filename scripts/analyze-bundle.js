#!/usr/bin/env node

// Bundle Analyzer für statische Exports
const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Analysiere JavaScript Bundle für statisches Hosting...');

try {
  // Next.js Bundle Analyzer für Export
  process.env.ANALYZE = 'true';
  
  console.log('📊 Erstelle Bundle-Analyse...');
  execSync('npx next build', { 
    stdio: 'inherit',
    env: { ...process.env, ANALYZE: 'true' }
  });
  
  console.log('\n✅ Bundle-Analyse abgeschlossen!');
  console.log('📂 Ergebnisse in: .next/analyze/');
  
} catch (error) {
  console.error('❌ Fehler bei Bundle-Analyse:', error.message);
  process.exit(1);
}
