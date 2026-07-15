// Auditoria estética executável (INC-15 — RNF-E01/RNF-E04): constrói o site,
// serve o build e mede de verdade — Lighthouse mobile ×3 nas 4 páginas da
// spec (mediana) e scroll horizontal a 320px nas páginas alteradas.
// Uso: npm run auditoria    (sai com código 1 se qualquer critério reprovar)
import { execFileSync, spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import puppeteer from 'puppeteer';
import { avaliarAuditoria, mediana } from './auditoria-nucleo.mjs';

const PORTA = 4390;
const BASE = `http://localhost:${PORTA}`;

// As 4 páginas auditadas pela RNF-E01
const PAGINAS_LIGHTHOUSE = [
  ['Home', '/'],
  ['artigo', '/artigos/a-regua-que-desbota/'],
  ['projeto Matrix', '/projetos/matrix/'],
  ['busca', '/busca/'],
];

// Páginas alteradas pela direção estética (RNF-E04)
const PAGINAS_320 = [
  ['Home', '/'],
  ['/artigos/', '/artigos/'],
  ['/projetos/', '/projetos/'],
  ['projeto Matrix', '/projetos/matrix/'],
  ['artigo (capitular)', '/artigos/a-cidade-nao-percebe-quando-alguem-desaba/'],
  ['busca', '/busca/'],
];

console.log('· build de produção…');
execFileSync('npx', ['astro', 'build'], { stdio: 'ignore' });

console.log(`· preview em :${PORTA}…`);
const servidor = spawn('npx', ['astro', 'preview', '--port', String(PORTA)], {
  stdio: 'ignore',
  detached: true, // grupo próprio: o kill no finally derruba o astro junto
});
// espera ativa: falha alto se o servidor não subir (porta ocupada, build ruim)
let noAr = false;
for (let i = 0; i < 30 && !noAr; i++) {
  await new Promise((r) => setTimeout(r, 500));
  noAr = await fetch(BASE + '/', { signal: AbortSignal.timeout(1000) })
    .then((r) => r.ok)
    .catch(() => false);
}
if (!noAr) {
  try {
    process.kill(-servidor.pid);
  } catch {}
  console.error(`O preview não subiu em :${PORTA} — porta ocupada? (fuser -k ${PORTA}/tcp)`);
  process.exit(1);
}

let saida = 1;
try {
  // RNF-E04 — 320px sem scroll horizontal
  const browser = await puppeteer.launch({ headless: true });
  const scroll320 = [];
  for (const [nome, caminho] of PAGINAS_320) {
    const page = await browser.newPage();
    await page.setViewport({ width: 320, height: 700, isMobile: true });
    await page.goto(BASE + caminho, { waitUntil: 'networkidle0' });
    const medida = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    scroll320.push({ nome, ...medida });
    await page.close();
  }
  const chromePath = String(await puppeteer.executablePath());
  await browser.close();

  // RNF-E01 — Lighthouse mobile ×3 por página
  const dirRelatorios = mkdtempSync(join(tmpdir(), 'auditoria-lh-'));
  const paginas = [];
  for (const [nome, caminho] of PAGINAS_LIGHTHOUSE) {
    const execucoes = { perf: [], a11y: [], cls: [] };
    for (let i = 1; i <= 3; i++) {
      const arquivo = join(dirRelatorios, `${nome.replaceAll(/\W/g, '')}-${i}.json`);
      try {
        execFileSync(
          'npx',
          [
            'lighthouse',
            BASE + caminho,
            '--only-categories=performance,accessibility',
            '--output=json',
            `--output-path=${arquivo}`,
            '--chrome-flags=--headless=new',
            '--quiet',
          ],
          { encoding: 'utf-8', env: { ...process.env, CHROME_PATH: chromePath } },
        );
      } catch (erro) {
        console.error(`Lighthouse falhou em ${nome}:`);
        console.error(String(erro.stderr ?? erro.stdout ?? erro).slice(0, 800));
        throw erro;
      }
      const r = JSON.parse(readFileSync(arquivo, 'utf-8'));
      execucoes.perf.push(r.categories.performance.score * 100);
      execucoes.a11y.push(r.categories.accessibility.score * 100);
      execucoes.cls.push(r.audits['cumulative-layout-shift'].numericValue);
    }
    paginas.push({ nome, ...execucoes });
    console.log(
      `  ${nome}: perf ${mediana(execucoes.perf)} · a11y ${mediana(execucoes.a11y)} · CLS ${mediana(execucoes.cls).toFixed(4)}`,
    );
  }
  rmSync(dirRelatorios, { recursive: true, force: true });

  const veredito = avaliarAuditoria({ paginas, scroll320 });
  if (veredito.aprovado) {
    console.log('\nAUDITORIA APROVADA — 100/100, CLS 0 e 320px contidos em todas as páginas.');
    saida = 0;
  } else {
    console.error('\nAUDITORIA REPROVADA:');
    for (const falha of veredito.falhas) console.error(`  ✗ ${falha}`);
  }
} finally {
  try {
    process.kill(-servidor.pid); // grupo inteiro: npx + astro
  } catch {
    servidor.kill();
  }
}
process.exit(saida);
