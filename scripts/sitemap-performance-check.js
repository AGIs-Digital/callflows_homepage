const fs = require('fs');
const path = require('path');

/**
 * Sitemap Performance & SEO Check
 * Prüft Sitemap-Struktur, Prioritäten und gibt Optimierungsvorschläge
 */

function parseSitemap() {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Sitemap nicht gefunden!');
    return null;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  
  // Parse URLs
  const urlMatches = content.matchAll(/<url>[\s\S]*?<\/url>/g);
  const urls = [];
  
  for (const match of urlMatches) {
    const urlBlock = match[0];
    const loc = urlBlock.match(/<loc>(.*?)<\/loc>/)?.[1];
    const priority = urlBlock.match(/<priority>(.*?)<\/priority>/)?.[1];
    const changefreq = urlBlock.match(/<changefreq>(.*?)<\/changefreq>/)?.[1];
    const lastmod = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    
    if (loc) {
      urls.push({
        url: loc.replace('https://callflows.de', ''),
        priority: parseFloat(priority || '0.5'),
        changefreq,
        lastmod
      });
    }
  }
  
  return urls;
}

function checkInternalLinks() {
  console.log('🔍 Prüfe interne Verlinkungen...\n');
  
  const componentsDir = path.join(process.cwd(), 'components');
  const appDir = path.join(process.cwd(), 'app');
  
  const brokenLinks = [];
  
  function scanDirectory(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.')) {
        scanDirectory(filePath, fileList);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }
  
  const allFiles = [
    ...scanDirectory(componentsDir),
    ...scanDirectory(appDir)
  ];
  
  // Prüfe auf Links zu gelöschten Seiten
  const deletedPages = ['/ki-telefonie'];
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    
    deletedPages.forEach(page => {
      const regex = new RegExp(`(href|to)=["']${page}["']`, 'g');
      if (regex.test(content)) {
        brokenLinks.push({
          file: file.replace(process.cwd(), ''),
          page
        });
      }
    });
  });
  
  return brokenLinks;
}

function analyzeSitemap() {
  console.log('📊 SITEMAP PERFORMANCE & SEO CHECK');
  console.log(`📅 ${new Date().toLocaleString('de-DE')}`);
  console.log('━'.repeat(60));
  console.log('');
  
  const urls = parseSitemap();
  
  if (!urls) {
    process.exit(1);
  }
  
  // Statistiken
  console.log('📈 Sitemap-Statistiken:');
  console.log(`   📄 Anzahl URLs: ${urls.length}`);
  console.log(`   🎯 Durchschnittliche Priorität: ${(urls.reduce((sum, u) => sum + u.priority, 0) / urls.length).toFixed(2)}`);
  console.log('');
  
  // Prioritäten-Verteilung
  console.log('🎯 Prioritäten-Verteilung:');
  const priorityGroups = {
    '1.0': urls.filter(u => u.priority === 1.0),
    '0.9': urls.filter(u => u.priority === 0.9),
    '0.8': urls.filter(u => u.priority === 0.8),
    '0.7': urls.filter(u => u.priority === 0.7),
    '0.6': urls.filter(u => u.priority === 0.6),
    '0.3': urls.filter(u => u.priority <= 0.3)
  };
  
  Object.entries(priorityGroups).forEach(([priority, items]) => {
    if (items.length > 0) {
      console.log(`   ${priority}: ${items.length} URL(s)`);
      items.forEach(item => {
        const emoji = priority === '1.0' ? '🏠' : priority === '0.9' ? '⭐' : priority === '0.8' ? '📄' : priority === '0.7' ? '📰' : priority === '0.6' ? '📚' : '⚖️';
        console.log(`      ${emoji} ${item.url || '/'}`);
      });
    }
  });
  console.log('');
  
  // Interne Links prüfen
  console.log('🔗 Interne Verlinkungen:');
  const brokenLinks = checkInternalLinks();
  
  if (brokenLinks.length === 0) {
    console.log('   ✅ Keine defekten Links zu gelöschten Seiten gefunden');
  } else {
    console.log(`   ⚠️  ${brokenLinks.length} defekte Link(s) gefunden:`);
    brokenLinks.forEach(link => {
      console.log(`      📄 ${link.file}`);
      console.log(`         → ${link.page}`);
    });
  }
  console.log('');
  
  // SEO-Bewertung
  console.log('🎯 SEO-Bewertung:');
  
  let score = 100;
  const issues = [];
  
  // Zu viele URLs?
  if (urls.length > 50) {
    score -= 10;
    issues.push('⚠️  Zu viele URLs in Sitemap (> 50)');
  }
  
  // Zu wenige High-Priority URLs?
  const highPriorityUrls = urls.filter(u => u.priority >= 0.9);
  if (highPriorityUrls.length > 5) {
    score -= 15;
    issues.push('⚠️  Zu viele High-Priority URLs (verwässert Fokus)');
  }
  
  // Rechtliche Seiten zu hoch priorisiert?
  const legalPages = urls.filter(u => 
    u.url.includes('datenschutz') || 
    u.url.includes('impressum') || 
    u.url.includes('agb')
  );
  const highPriorityLegal = legalPages.filter(u => u.priority > 0.5);
  if (highPriorityLegal.length > 0) {
    score -= 10;
    issues.push('💡 Rechtliche Seiten haben hohe Priorität (empfohlen: 0.3)');
  }
  
  // Defekte Links
  if (brokenLinks.length > 0) {
    score -= 25;
    issues.push('❌ Defekte interne Links gefunden');
  }
  
  if (issues.length === 0) {
    console.log('   ✅ Keine Probleme gefunden!');
  } else {
    issues.forEach(issue => console.log(`   ${issue}`));
  }
  console.log('');
  
  // Empfehlungen
  console.log('💡 Optimierungs-Empfehlungen:');
  
  if (urls.length <= 15) {
    console.log('   ✨ Perfekte Sitemap-Größe (≤15 URLs)');
  }
  
  if (highPriorityUrls.length <= 3) {
    console.log('   ✨ Guter Fokus auf wichtigste Seiten');
  }
  
  if (brokenLinks.length === 0) {
    console.log('   ✨ Keine defekten internen Links');
  }
  
  const blogUrls = urls.filter(u => u.url.includes('/blog/') && u.url !== '/blog');
  if (blogUrls.length === 0) {
    console.log('   ✨ Blog-Artikel werden über /blog gefunden (optimal)');
  }
  
  console.log('');
  console.log(`🏆 Sitemap SEO-Score: ${Math.max(0, score)}/100`);
  console.log('');
  
  // Performance-Tipps
  console.log('🚀 Performance-Tipps:');
  console.log('   1. Sitemap in Google Search Console einreichen');
  console.log('   2. robots.txt prüfen (alle wichtigen Seiten crawlbar?)');
  console.log('   3. Interne Verlinkung aufbauen (zu wichtigsten Seiten)');
  console.log('   4. Mobile Performance testen (PageSpeed Insights)');
  console.log('');
  
  return {
    urlCount: urls.length,
    highPriorityCount: highPriorityUrls.length,
    brokenLinksCount: brokenLinks.length,
    score: Math.max(0, score)
  };
}

// Führe Check aus
if (require.main === module) {
  try {
    analyzeSitemap();
    console.log('✅ Sitemap-Check abgeschlossen!');
  } catch (error) {
    console.error('❌ Fehler beim Sitemap-Check:', error.message);
    process.exit(1);
  }
}

module.exports = { analyzeSitemap, parseSitemap, checkInternalLinks };

