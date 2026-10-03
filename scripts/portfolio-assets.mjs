// Gera as miniaturas do portfólio (webp) a partir das capturas do portão visual (versão em inglês) e copia as demonstrações
// estáticas (28 produtos) mais a Torre de Controle para public/demos. Fonte: repositório Hive (C:/Desenv/AI/hive).
import sharp from 'sharp'
import { cpSync, mkdirSync, readdirSync, existsSync, rmSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'

const HIVE = 'C:/Desenv/AI/hive'
const QA = join(HIVE, '.qa/i18n')
const SITE = 'C:/Workspace/qa-en' // site estático gerado com DEFAULT_LANG=en (hive/scripts/portfolio/build-static.mjs)
mkdirSync('public/portfolio', { recursive: true })
const slugs = readdirSync(SITE, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('.')).map((d) => d.name)
for (const s of slugs) {
  const png = join(QA, 'en-' + s, 'painel-papel1-1280.png')
  if (!existsSync(png)) throw new Error('sem captura: ' + png)
  await sharp(png).resize({ width: 1200 }).webp({ quality: 78 }).toFile(`public/portfolio/${s}.webp`)
}
await sharp(join(HIVE, '.qa/tower-ui/demo-desktop.png')).resize({ width: 1200 }).webp({ quality: 78 }).toFile('public/portfolio/control-tower.webp')

rmSync('public/demos', { recursive: true, force: true })
cpSync(SITE, 'public/demos', { recursive: true, filter: (p) => !p.includes('.git') && !p.endsWith('README.md') })
// Torre de Controle: os mesmos arquivos do binário (tower/web), abrindo direto na demonstração
mkdirSync('public/demos/control-tower', { recursive: true })
for (const f of ['index.html', 'app.js', 'style.css']) copyFileSync(join(HIVE, 'tower/web', f), `public/demos/control-tower/${f}`)
console.log('ok:', slugs.length, 'demos + control-tower')
