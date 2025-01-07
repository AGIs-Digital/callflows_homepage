import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs', 'contact-form');
const LOG_FILE = path.join(LOG_DIR, 'staging-contact-form.log');

export const logger = {
  init: () => {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  },
  
  log: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}${data ? ` ${JSON.stringify(data)}` : ''}\n`;
    
    try {
      fs.appendFileSync(LOG_FILE, logMessage);
      console.log(logMessage);
    } catch (error) {
      console.error('Logging failed:', error);
    }
  }
}; 