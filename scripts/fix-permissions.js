#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

/**
 * Script zur automatischen Korrektur der Dateiberechtigungen auf dem Server
 * Verwendet SSH-Zugangsdaten aus Git Secrets
 */

async function fixServerPermissions() {
  try {
    console.log('🔧 Starte Berechtigungs-Korrektur auf Server...');

    // SSH-Secrets aus Environment laden
    const SSH_USER = process.env.SSH_USER;
    const SSH_HOST = process.env.SSH_HOST;
    const SSH_PASSWORD = process.env.SSH_PASSWORD;

    if (!SSH_USER || !SSH_HOST || !SSH_PASSWORD) {
      throw new Error('❌ SSH-Zugangsdaten nicht gefunden. Prüfe Git Secrets.');
    }

    console.log(`📡 Verbinde zu ${SSH_USER}@${SSH_HOST}...`);

    // SSH-Kommandos für Berechtigungs-Fix
    const commands = [
      'cd htdocs/',
      'echo "📂 Aktueller Ordner: $(pwd)"',
      'echo "🔍 Aktuelle Berechtigungen (Beispiel):"',
      'ls -la | head -5',
      'echo "⚡ Setze Ordner-Berechtigungen auf 755..."',
      'find . -type d -exec chmod 755 {} \\;',
      'echo "📄 Setze Datei-Berechtigungen auf 644..."', 
      'find . -type f -exec chmod 644 {} \\;',
      'echo "🔒 Schütze sensitive Dateien..."',
      'chmod 600 .env* 2>/dev/null || true',
      'chmod 600 *config*.php 2>/dev/null || true',
      'echo "✅ Berechtigungen korrigiert! Neue Beispiele:"',
      'ls -la | head -5'
    ];

    const sshCommand = `sshpass -p "${SSH_PASSWORD}" ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} "${commands.join(' && ')}"`;

    // SSH-Kommando ausführen
    const output = execSync(sshCommand, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });

    console.log('📋 Server Output:');
    console.log(output);
    console.log('🎉 Berechtigungen erfolgreich korrigiert!');

  } catch (error) {
    console.error('❌ Fehler bei Berechtigungs-Korrektur:', error.message);
    
    if (error.message.includes('sshpass')) {
      console.log('\n💡 Tipp: Installiere sshpass für automatische SSH-Authentifizierung:');
      console.log('Windows: choco install sshpass');
      console.log('Oder verwende manuellen SSH-Login.');
    }
    
    process.exit(1);
  }
}

// Script ausführen
if (require.main === module) {
  fixServerPermissions();
}

module.exports = { fixServerPermissions }; 