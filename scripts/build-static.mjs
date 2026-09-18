import fs from 'node:fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

function normalizeSiteUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return 'http://localhost:3000';
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, '');
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL
  || process.env.VERCEL_PROJECT_PRODUCTION_URL
  || process.env.VERCEL_URL
);

fs.writeFileSync(
  'static/config.js',
  `window.SUPABASE_CONFIG = ${JSON.stringify({ url, anonKey })};\n`
);

const indexPath = 'static/index.html';
const sourceHtml = fs.readFileSync(indexPath, 'utf8');
fs.writeFileSync(indexPath, sourceHtml.replaceAll('__SITE_URL__', siteUrl));

fs.writeFileSync(
  'static/robots.txt',
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);

const lastModified = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  'static/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeXml(siteUrl)}/</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`
);

console.log(`Built Workplace Initiative SEO files for ${siteUrl}`);
