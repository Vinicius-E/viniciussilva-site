// Gera as miniaturas do portfólio (webp) a partir das capturas do portão visual, e copia as demonstrações estáticas.
import sharp from 'sharp'
import { cpSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const QA = 'C:/Desenv/AI/hive/.qa'
const SITE = 'C:/Workspace/portfolio-site'
mkdirSync('public/portfolio', { recursive: true })
const slugs = readdirSync(SITE, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('.')).map((d) => d.name)
for (const s of slugs) {
  const png = join(QA, 'cs-' + s, 'painel-papel1-1280.png')
  if (!existsSync(png)) throw new Error('sem captura: ' + s)
  await sharp(png).resize({ width: 1200 }).webp({ quality: 78 }).toFile(`public/portfolio/${s}.webp`)
}
rmSync('public/demos', { recursive: true, force: true })
cpSync(SITE, 'public/demos', { recursive: true, filter: (p) => !p.includes('.git') && !p.endsWith('README.md') })
console.log('ok', slugs.length)
