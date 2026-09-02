/* Copies only the font subsets we actually serve (latin + latin-ext) into
   public/fonts/, so the build doesn't ship Cyrillic / Greek / Vietnamese
   weights that no page uses. Re-run after changing font deps.
   Pairs with src/styles/fonts.css. */

import { mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = path.dirname(fileURLToPath(new URL('.', import.meta.url)));
const outDir = path.join(root, 'public', 'fonts');

const pkgDir = (pkg) => path.dirname(require.resolve(`${pkg}/package.json`));

const jobs = [
  // Archivo Variable (wght axis, 100–900) — one file per subset
  [pkgDir('@fontsource-variable/archivo'), 'files/archivo-latin-wght-normal.woff2', 'archivo-latin.woff2'],
  [pkgDir('@fontsource-variable/archivo'), 'files/archivo-latin-ext-wght-normal.woff2', 'archivo-latin-ext.woff2'],
];

for (const subset of ['latin', 'latin-ext']) {
  for (const w of [400, 500, 600]) {
    jobs.push([
      pkgDir('@fontsource/ibm-plex-sans'),
      `files/ibm-plex-sans-${subset}-${w}-normal.woff2`,
      `ibm-plex-sans-${subset}-${w}.woff2`,
    ]);
  }
  for (const w of [400, 500]) {
    jobs.push([
      pkgDir('@fontsource/ibm-plex-mono'),
      `files/ibm-plex-mono-${subset}-${w}-normal.woff2`,
      `ibm-plex-mono-${subset}-${w}.woff2`,
    ]);
  }
}

await mkdir(outDir, { recursive: true });
for (const [base, from, to] of jobs) {
  await copyFile(path.join(base, from), path.join(outDir, to));
  console.log('copied', to);
}
console.log('done —', jobs.length, 'files');
