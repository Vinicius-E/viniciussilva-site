/* Warns (never fails) while the three résumé PDFs are still byte-identical copies:
   the owner must replace them with real EN-US / PT-BR / ES-ES versions. */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const files = ['en-us', 'pt-br', 'es-es'].map((l) => `public/vinicius-silva-cv-${l}.pdf`);
const hashes = files.map((f) => (existsSync(f) ? createHash('sha256').update(readFileSync(f)).digest('hex') : null));
const missing = files.filter((_, i) => !hashes[i]);
if (missing.length) console.warn('\n[resume] MISSING:', missing.join(', '));
else if (new Set(hashes).size < 3) console.warn('\n[resume] WARNING: the three résumé PDFs are identical copies. Replace them with the real EN-US / PT-BR / ES-ES versions (see PLACEHOLDERS.md).\n');
else console.log('[resume] three distinct résumé PDFs OK');
