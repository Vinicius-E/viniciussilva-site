/* Generate OpenGraph images (1200×630) in the Foundry style.
   Run: npm run og   — output committed to public/og/.
   Only renders name, role and tagline — all approved, factual copy. */

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(new URL('.', import.meta.url)));
const outDir = path.join(root, 'public', 'og');

const INK = '#0e0d10';
const BONE = '#ece9e3';
const STEEL = '#837d73';
const EMBER = '#e4562a';
const HAIR = '#2a2830';

function card({ kicker, title, sub }) {
  // Font stack kept generic so librsvg/fontconfig can resolve it on any host.
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${EMBER}"/>
  <g transform="translate(80,90)">
    <path d="M0 26 L26 0 L52 26 L26 52 Z" fill="none" stroke="${EMBER}" stroke-width="3"/>
    <path d="M26 0 L26 52 M0 26 L52 26" stroke="${EMBER}" stroke-width="3" opacity="0.35"/>
  </g>
  <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="6" fill="${STEEL}">${esc(kicker.toUpperCase())}</text>
  <text x="78" y="330" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="82" fill="${BONE}">${esc(title)}</text>
  <line x1="80" y1="392" x2="1120" y2="392" stroke="${HAIR}" stroke-width="1"/>
  <text x="80" y="450" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${STEEL}">${esc(sub)}</text>
</svg>`;
}

const images = [
  {
    file: 'home.png',
    kicker: 'Senior Software Engineer · Full-Stack',
    title: 'Vinicius Silva',
    sub: 'Java · Spring Boot · Distributed Systems · Enterprise & Industrial',
  },
  {
    file: 'case-industrial.png',
    kicker: 'Case Study · Industrial Operations',
    title: 'Industrial Operations Platform',
    sub: 'Warehouse & operations software — Java, Spring Boot, React, React Native',
  },
];

await mkdir(outDir, { recursive: true });
for (const img of images) {
  const svg = card(img);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(path.join(outDir, img.file), png);
  console.log('wrote', path.join('public', 'og', img.file), `(${png.length} bytes)`);
}
console.log('done');
