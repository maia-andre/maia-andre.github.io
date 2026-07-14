import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { distFile, parsePage } from './helpers/dist';

// INC-12 — Frame do Matrix (REQ-E04/E05/E06, RN-E01/E02, CE-E03):
// um tick real da simulação (seed 42, tick 3000) como hero de
// /projetos/matrix/, com legenda de proveniência e cores dos temas.

function cssDoSite(relPath = 'projetos/matrix/index.html'): string {
  const pagina = parsePage(relPath);
  const externos = pagina
    .querySelectorAll('link[rel="stylesheet"]')
    .map((l) => l.getAttribute('href'))
    .filter((href): href is string => Boolean(href))
    .map((href) => readFileSync(distFile(href.replace(/^\//, '')), 'utf-8'));
  const inline = pagina.querySelectorAll('style').map((s) => s.text);
  return [...externos, ...inline].join('\n');
}

describe('REQ-E04 — frame ASCII entre o cabeçalho e o corpo, só no Matrix', () => {
  it('a página do Matrix tem <figure> com a arte em <pre>, depois do header e antes da prosa', () => {
    const main = parsePage('projetos/matrix/index.html').querySelector('main')!;
    const figura = main.querySelector('figure.frame-matrix');
    expect(figura).not.toBeNull();
    expect(figura!.querySelector('pre')).not.toBeNull();
    const html = main.innerHTML;
    const posHeader = html.indexOf('artigo-cabecalho');
    const posFigura = html.indexOf('frame-matrix');
    const posProsa = html.indexOf('class="prosa"');
    expect(posHeader).toBeGreaterThan(-1);
    expect(posFigura).toBeGreaterThan(posHeader);
    expect(posProsa).toBeGreaterThan(posFigura);
  });

  it('a arte é um frame de verdade: moldura da grade e população de blocos', () => {
    const arte = parsePage('projetos/matrix/index.html').querySelector('.frame-matrix pre')!.text;
    expect(arte).toContain('+--');
    expect(arte).toMatch(/\|[^|]*@[^|]*\|/);
    expect(arte.split('\n').length).toBeGreaterThan(10);
  });

  it('nenhum outro projeto ganha o frame', () => {
    for (const slug of [
      'centro-logistico-municipal',
      'conferidor-de-encargos-cobol',
      'observatorio-de-oportunidades',
      'site-pessoal',
    ]) {
      expect(
        parsePage(`projetos/${slug}/index.html`).querySelector('.frame-matrix'),
        slug,
      ).toBeNull();
    }
  });
});

describe('REQ-E05/RN-E01/RN-E02 — acessibilidade e proveniência', () => {
  it('a arte fica oculta de leitores de tela; a legenda é acessível e em mono', () => {
    const figura = parsePage('projetos/matrix/index.html').querySelector('figure.frame-matrix')!;
    expect(figura.querySelector('pre')!.getAttribute('aria-hidden')).toBe('true');
    const legenda = figura.querySelector('figcaption');
    expect(legenda).not.toBeNull();
    expect(legenda!.getAttribute('aria-hidden')).toBeFalsy();
    expect(legenda!.classList.contains('registro')).toBe(true);
  });

  it('a legenda declara seed 42, tick 3000 e o commit curto do Matrix', () => {
    const legenda = parsePage('projetos/matrix/index.html').querySelector(
      '.frame-matrix figcaption',
    )!.text;
    expect(legenda).toContain('seed 42');
    expect(legenda).toContain('tick 3000');
    expect(legenda).toMatch(/matrix@[0-9a-f]{7}/);
  });
});

describe('REQ-E06/CE-E03 — temas e contenção em telas estreitas', () => {
  it('as cores do frame derivam das variáveis de tema, sem hex fixo', () => {
    const css = cssDoSite();
    const blocos = css.match(/\.frame-matrix[^{]*{[^}]*}/g) ?? [];
    expect(blocos.length).toBeGreaterThanOrEqual(2);
    const comCor = blocos.filter((b) => /(?:^|[^-])(color|background)/.test(b));
    expect(comCor.length).toBeGreaterThan(0);
    for (const bloco of comCor) {
      expect(bloco, bloco).toMatch(/var\(--/);
      expect(bloco, bloco).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    }
  });

  it('a arte escala com a largura da página e o contêiner não vaza (CE-E03)', () => {
    const css = cssDoSite();
    const blocoPre = css.match(/\.frame-matrix pre\s*{[^}]*}/)?.[0];
    expect(blocoPre, 'regra .frame-matrix pre ausente').toBeDefined();
    expect(blocoPre).toMatch(/font-size:\s*min\(/);
    expect(blocoPre).toMatch(/100vw/);
    expect(blocoPre).toMatch(/overflow:\s*hidden/);
  });
});
