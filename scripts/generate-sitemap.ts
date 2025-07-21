import { writeFileSync } from 'fs';
import prettier from 'prettier';
import globby from 'globby';

const generate = async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc');
  const pages = await globby([
    'app/**/*.tsx',
    '!app/**/_*.tsx',
    '!app/**/components/**',
    '!app/**/layout.tsx',
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://callflows.de';
  
  // Definiere Prioritäten für verschiedene Seitentypen
  const getPriority = (path: string) => {
    if (path === '/index') return '1.0'; // Startseite
    if (path.includes('/blog/')) return '0.7'; // Blogbeiträge
    if (path === '/pricing' || path === '/kontakt') return '0.9'; // Wichtige Seiten
    return '0.8'; // Standard
  };
  
  // Definiere Änderungshäufigkeit für verschiedene Seitentypen
  const getChangefreq = (path: string) => {
    if (path === '/index') return 'daily'; // Startseite
    if (path.includes('/blog/')) return 'weekly'; // Blogbeiträge
    return 'monthly'; // Standard
  };

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('app', '')
            .replace('/page.tsx', '')
            .replace('.tsx', '');
          const route = path === '/index' ? '' : path;
          
          return `
            <url>
              <loc>${baseUrl}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${getChangefreq(path)}</changefreq>
              <priority>${getPriority(path)}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  writeFileSync('public/sitemap.xml', formatted);
};

// IIFE für Top-Level await
(async () => {
  try {
    await generate();
    console.log('✅ Sitemap erfolgreich generiert');
  } catch (error) {
    console.error('❌ Fehler beim Generieren der Sitemap:', error);
    process.exit(1);
  }
})();