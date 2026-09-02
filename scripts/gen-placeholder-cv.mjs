/* Writes a minimal, valid placeholder PDF to public/vinicius-silva-cv.pdf so
   the résumé link is not broken in the preview.
   TODO[asset]: replace with the real CV before launch. */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(new URL('.', import.meta.url)));
const out = path.join(root, 'public', 'vinicius-silva-cv.pdf');

const lines = [
  'BT /F1 20 Tf 72 770 Td (Vinicius Silva \\226 Senior Software Engineer) Tj ET',
  'BT /F1 12 Tf 72 738 Td (Placeholder document. The final CV will be provided by Vinicius.) Tj ET',
  'BT /F1 12 Tf 72 720 Td (Backend \\183 Full-Stack \\183 Enterprise & Industrial systems.) Tj ET',
];
const content = lines.join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, i) => {
  offsets[i] = Buffer.byteLength(pdf);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((o) => {
  pdf += `${String(o).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

await writeFile(out, pdf, 'latin1');
console.log('wrote', path.join('public', 'vinicius-silva-cv.pdf'), `(${Buffer.byteLength(pdf)} bytes)`);
