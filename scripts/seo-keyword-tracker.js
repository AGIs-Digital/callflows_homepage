#!/usr/bin/env node

// SEO Keyword Position Tracker für callflows.de
const puppeteer = require('puppeteer');

const TARGET_KEYWORDS = [
  'KI Telefonie',
  'Voice Bot Deutschland', 
  'KI Telefonassistent',
  'automatisierte Telefonie',
  'KI für Kundenservice',
  'Telefonie Automatisierung'
];

const DOMAIN = 'callflows.de';

async function checkKeywordPosition(keyword) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Google-Suche simulieren
    await page.goto(`https://www.google.de/search?q=${encodeURIComponent(keyword)}&hl=de&gl=de`);
    
    // Warte auf Suchergebnisse
    await page.waitForSelector('#search');
    
    // Extrahiere alle Suchergebnis-URLs
    const results = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('#search .g h3 a'));
      return links.map((link, index) => ({
        position: index + 1,
        url: link.href,
        title: link.textContent
      }));
    });
    
    // Finde Position von callflows.de
    const position = results.find(result => 
      result.url.includes(DOMAIN)
    );
    
    await browser.close();
    
    return {
      keyword,
      position: position ? position.position : 'Not in Top 100',
      url: position ? position.url : null,
      title: position ? position.title : null
    };
    
  } catch (error) {
    await browser.close();
    return {
      keyword,
      position: 'Error',
      error: error.message
    };
  }
}

async function trackAllKeywords() {
  console.log('🔍 SEO Keyword Position Tracking für callflows.de');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const keyword of TARGET_KEYWORDS) {
    console.log(`Prüfe: "${keyword}"...`);
    const result = await checkKeywordPosition(keyword);
    results.push(result);
    
    // Kurze Pause zwischen Anfragen
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Ergebnisse anzeigen
  console.log('\n📊 KEYWORD POSITION REPORT');
  console.log('=' .repeat(60));
  
  results.forEach(result => {
    const status = result.position === 'Not in Top 100' ? '🔴' : 
                   result.position <= 3 ? '🟢' :
                   result.position <= 10 ? '🟡' : '🟠';
    
    console.log(`${status} ${result.keyword}: Position ${result.position}`);
    if (result.title) {
      console.log(`   📄 ${result.title}`);
    }
  });
  
  // Top-Prioritäten identifizieren
  console.log('\n💡 OPTIMIERUNG-EMPFEHLUNGEN:');
  const notRanking = results.filter(r => r.position === 'Not in Top 100');
  const lowRanking = results.filter(r => typeof r.position === 'number' && r.position > 10);
  
  if (notRanking.length > 0) {
    console.log('🎯 Erstelle Content für:');
    notRanking.forEach(r => console.log(`   - ${r.keyword}`));
  }
  
  if (lowRanking.length > 0) {
    console.log('⚡ Optimiere bestehende Seiten für:');
    lowRanking.forEach(r => console.log(`   - ${r.keyword} (Position ${r.position})`));
  }
}

// Führe Tracking aus
if (require.main === module) {
  trackAllKeywords().catch(console.error);
}

module.exports = { checkKeywordPosition, trackAllKeywords };
