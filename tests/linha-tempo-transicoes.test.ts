import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { distFile, parsePage } from './helpers/dist';

// INC-14 — Linha do tempo em /artigos/ (REQ-E09) e View Transitions
// (REQ-E10, RNF-E03, CE-E05): navegação suave com aprimoramento progressivo
// e todos os scripts da v1 sobrevivendo às trocas de página.

function cssDoSite(relPath = 'artigos/index.html'): string {
  const pagina = parsePage(relPath);
  const externos = pagina
    .querySelectorAll('link[rel="stylesheet"]')
    .map((l) => l.getAttribute('href'))
    .filter((href): href is string => Boolean(href))
    .map((href) => readFileSync(distFile(href.replace(/^\//, '')), 'utf-8'));
  const inline = pagina.querySelectorAll('style').map((s) => s.text);
  return [...externos, ...inline].join('\n');
}

function todoJsDoDist(): string {
  const dir = distFile('_astro');
  const externos = readdirSync(dir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(join(dir, f), 'utf-8'));
  const inline = parsePage('index.html')
    .querySelectorAll('script')
    .map((s) => s.text);
  return [...externos, ...inline].join('\n');
}

describe('REQ-E09 — linha do tempo em /artigos/', () => {
  it('a listagem de /artigos/ ganha a variante linha do tempo; a Home não', () => {
    const ol = parsePage('artigos/index.html').querySelector('main ol.lista-artigos')!;
    expect(ol.classList.contains('lista-linha-tempo')).toBe(true);
    const olHome = parsePage('index.html').querySelector('main ol.lista-artigos')!;
    expect(olHome.classList.contains('lista-linha-tempo')).toBe(false);
  });

  it('a linha vertical e o marcador por item existem no CSS, por tokens', () => {
    const css = cssDoSite();
    const linha = css.match(/\.lista-linha-tempo::?before\s*{[^}]*}/)?.[0];
    expect(linha, 'regra da linha vertical ausente').toBeDefined();
    expect(linha).toMatch(/var\(--/);
    const marcador = css.match(/\.lista-linha-tempo\s*>\s*\.item-artigo::?before\s*{[^}]*}/)?.[0];
    expect(marcador, 'regra do marcador ausente').toBeDefined();
    expect(marcador).toMatch(/border-radius:\s*50%/);
    expect(marcador).toMatch(/var\(--/);
    for (const bloco of [linha!, marcador!]) expect(bloco).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });

  it('os dados e a ordem por item não mudam (mesma estrutura de título/meta)', () => {
    const itens = parsePage('artigos/index.html').querySelectorAll('main .item-artigo');
    expect(itens.length).toBe(22);
    for (const item of itens) {
      expect(item.querySelector('.item-titulo a')).not.toBeNull();
      expect(item.querySelector('.artigo-meta time')).not.toBeNull();
    }
  });
});

describe('REQ-E10 — View Transitions com aprimoramento progressivo', () => {
  it('o roteador de transições está ativo em todas as páginas', () => {
    for (const pagina of ['index.html', 'artigos/index.html', 'projetos/matrix/index.html']) {
      const meta = parsePage(pagina).querySelector('meta[name="astro-view-transitions-enabled"]');
      expect(meta, pagina).not.toBeNull();
    }
  });

  it('a navegação continua sendo <a href> simples — sem JS ela funciona inteira', () => {
    const links = parsePage('index.html').querySelectorAll('.navegacao a');
    expect(links.length).toBeGreaterThanOrEqual(6);
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\//);
      expect(link.getAttribute('onclick')).toBeFalsy();
    }
  });

  it('tema e busca religam nas trocas de página (astro:page-load / astro:after-swap)', () => {
    const js = todoJsDoDist();
    expect(js).toContain('astro:page-load');
    const inlineTema = parsePage('index.html')
      .querySelectorAll('script')
      .map((s) => s.text)
      .join('\n');
    expect(inlineTema).toContain('astro:after-swap');
    const jsBusca = readdirSync(distFile('_astro'))
      .filter((f) => f.endsWith('.js'))
      .map((f) => readFileSync(join(distFile('_astro'), f), 'utf-8'))
      .join('\n');
    expect(jsBusca).toContain('astro:page-load');
  });
});

describe('correção do verify — o botão de tema não desloca layout ao ser revelado', () => {
  it('o espaço do botão é reservado mesmo com [hidden] (unhide pós-paint sem CLS)', () => {
    const bloco = cssDoSite('index.html').match(/\.botao-tema\[hidden\]\s*{[^}]*}/)?.[0];
    expect(bloco, 'regra .botao-tema[hidden] ausente').toBeDefined();
    expect(bloco).toMatch(/visibility:\s*hidden/);
    expect(bloco).toMatch(/display:\s*(inline-block|block|inline-flex|flex)/);
  });
});

describe('RNF-E03 — animações desligadas sob prefers-reduced-motion', () => {
  it('as transições de view transition são anuladas no modo reduzido', () => {
    const css = cssDoSite('index.html');
    const bloco = css.match(/@media[^{]*prefers-reduced-motion:\s*reduce[^{]*{[\s\S]*?}\s*}/)?.[0];
    expect(bloco, 'bloco reduce ausente').toBeDefined();
    expect(bloco).toMatch(/view-transition/);
    expect(bloco).toMatch(/animation:\s*none/);
  });

  it('a transição de cor dos links continua atrás do portão no-preference', () => {
    expect(cssDoSite('index.html')).toMatch(/prefers-reduced-motion:\s*no-preference/);
  });
});
