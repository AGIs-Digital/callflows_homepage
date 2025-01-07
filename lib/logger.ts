import fs from 'fs/promises';
import path from 'path';

const LOG_DIR = './logs/contact-form';
const LOG_FILE = path.join(LOG_DIR, 'staging-contact-form.log');

export const logger = {
  async init() {
    try {
      await fs.mkdir(LOG_DIR, { recursive: true });
      console.log('📁 Log-Verzeichnis erstellt:', LOG_DIR);
    } catch (error) {
      console.error('❌ Fehler beim Erstellen des Log-Verzeichnisses:', error);
    }
  },
  
  async log(message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}${data ? ` ${JSON.stringify(data, null, 2)}` : ''}\n`;
    
    // Immer in die Konsole loggen
    console.log(logMessage);
    
    try {
      await fs.appendFile(LOG_FILE, logMessage);
    } catch (error) {
      console.error('❌ Fehler beim Schreiben des Logs:', error);
      console.error('Versuchter Pfad:', LOG_FILE);
    }
  }
}; 