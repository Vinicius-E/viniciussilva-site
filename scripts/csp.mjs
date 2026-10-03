/* Pós-build: calcula os hashes dos scripts inline e grava a Content-Security-Policy em dist/_headers.
   node scripts/csp.mjs   (rodar depois de `astro build`) */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const hashes = new Set();
for (const f of walk('dist').filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/application\/ld\+json/.test(m[1])) continue; // dados, não executa
    hashes.add("'sha256-" + createHash('sha256').update(m[2]).digest('base64') + "'");
  }
}
const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');
const path = 'dist/_headers';
let h = readFileSync(path, 'utf8').replace(/\n# CSP-BEGIN[\s\S]*# CSP-END\n?/, '');
h += `\n# CSP-BEGIN (gerado por scripts/csp.mjs)\n/*\n  Content-Security-Policy: ${csp}\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n  Cross-Origin-Opener-Policy: same-origin\n  Cross-Origin-Resource-Policy: same-origin\n# CSP-END\n`;
writeFileSync(path, h);
console.log(`CSP gravada com ${hashes.size} hash(es) de script inline`);
