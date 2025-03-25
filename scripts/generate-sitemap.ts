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
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
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