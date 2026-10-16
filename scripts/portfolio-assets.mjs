// Monta o portfólio do site: gera as 5 suítes (hive/scripts/portfolio/suites), copia para public/demos junto da Torre de Controle e
// cria as miniaturas (webp) a partir de uma captura da própria página de apresentação de cada produto (versão em inglês).
// Fonte: repositório Hive (C:/Desenv/AI/hive). Os 28 demos antigos ficam no histórico do git (e em hive/kit/products). Uso: node scripts/portfolio-assets.mjs
import sharp from 'sharp'
import { chromium } from 'playwright-core'
import { cpSync, mkdirSync, rmSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const HIVE = 'C:/Desenv/AI/hive'
const OUT = 'C:/Workspace/portfolio-suites' // saída do construtor de suítes, com DEFAULT_LANG=en
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

// 1) constrói as suítes do zero: o que está em public/demos nunca é editado à mão
const b = spawnSync(process.execPath, [join(HIVE, 'scripts/portfolio/suites/build-suites.mjs'), OUT], { stdio: 'inherit', env: { ...process.env, DEFAULT_LANG: 'en' } })
if (b.status !== 0) throw new Error('falha ao construir as suítes')

// 2) miniaturas: um quadro representativo de cada página (fração da rolagem em que a ideia da página aparece)
const SHOTS = { 'carga-clara': 0.36, 'ti-sob-controle': 0.4, 'carreira-solo': 0.4, 'agenda-cheia': 0.28, 'diario-de-campo': 0.2 }
rmSync('public/portfolio', { recursive: true, force: true })
mkdirSync('public/portfolio', { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME, headless: true })
for (const [slug, frac] of Object.entries(SHOTS)) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()
  await page.goto(pathToFileURL(join(OUT, slug, 'index.html')).href, { waitUntil: 'load' })
  await page.waitForTimeout(800)
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(total * frac))
  await page.waitForTimeout(900)
  const png = await page.screenshot()
  await sharp(png).resize({ width: 1200, height: 750, fit: 'cover', position: 'top' }).webp({ quality: 80 }).toFile(`public/portfolio/${slug}.webp`)
  await ctx.close()
}
await browser.close()
await sharp(join(HIVE, '.qa/tower-ui/demo-desktop.png')).resize({ width: 1200 }).webp({ quality: 78 }).toFile('public/portfolio/control-tower.webp')

// 3) demos: suítes + Torre de Controle (os mesmos arquivos do binário, abrindo direto na demonstração)
rmSync('public/demos', { recursive: true, force: true })
cpSync(OUT, 'public/demos', { recursive: true, filter: (p) => !p.endsWith('.nojekyll') })
mkdirSync('public/demos/control-tower', { recursive: true })
for (const f of ['index.html', 'app.js', 'style.css']) copyFileSync(join(HIVE, 'tower/web', f), `public/demos/control-tower/${f}`)
console.log('ok: 5 suítes + control-tower')
