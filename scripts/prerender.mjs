// Prerenders src/app.tsx to static HTML in dist/index.html so crawlers
// (Google, LinkedIn, Discord) read full content without running JS.
// Shortcut: no hydration - the client re-mounts and paints identical content.
// Upgrade to hydrateRoot in main.tsx if the replace-flash ever becomes visible.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const server = await createServer({
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true },
});
try {
  const { App } = await server.ssrLoadModule('/src/app.tsx');
  const html = renderToStaticMarkup(React.createElement(App));

  const file = fileURLToPath(new URL('../dist/index.html', import.meta.url));
  const dist = readFileSync(file, 'utf8');
  if (!dist.includes('<div id="root"></div>')) throw new Error('root div not found in dist/index.html');
  const out = dist.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  // Guard: a prerender without name/location is useless for SEO - fail the build instead of shipping an empty shell.
  if (!out.includes('Bintang Hari Kahono') || !out.includes('Tangerang')) throw new Error('prerendered HTML missing name/location');

  writeFileSync(file, out);

  // Keep sitemap lastmod in sync with build date (signals freshness to Google).
  const today = new Date().toISOString().slice(0, 10);
  for (const p of ['../dist/sitemap.xml', '../public/sitemap.xml']) {
    const f = fileURLToPath(new URL(p, import.meta.url));
    try {
      const sm = readFileSync(f, 'utf8');
      const next = sm.includes('<lastmod>') ? sm.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${today}</lastmod>`) : sm.replace('<loc>https://harikahono.github.io/</loc>', `<loc>https://harikahono.github.io/</loc>\n    <lastmod>${today}</lastmod>`);
      if (next !== sm) writeFileSync(f, next);
    } catch {} // sitemap missing - skip, not fatal
  }

  console.log(`prerender OK: index.html ${out.length} bytes, sitemap lastmod=${today}`);
} finally {
  await server.close();
}
