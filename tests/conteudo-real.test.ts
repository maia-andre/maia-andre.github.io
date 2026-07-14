import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { distFile, pageExists, parsePage } from './helpers/dist';

// Definição de concluído da v1.0.0 — as páginas dos 4 projetos reais no ar
// (Matrix, Centro Logístico, Conferidor COBOL, Observatório) e destaque na Home.

const PROJETOS = [
  ['matrix', 'Matrix'],
  ['centro-logistico-municipal', 'Centro Logístico Municipal'],
  ['conferidor-de-encargos-cobol', 'Conferidor de Encargos'],
  ['observatorio-de-oportunidades', 'Observatório de Oportunidades'],
] as const;

describe('v1.0.0 — os 4 projetos reais', () => {
  it.each(PROJETOS)('/projetos/%s/ existe e tem o nome no h1', (slug, nome) => {
    expect(pageExists(`projetos/${slug}/index.html`)).toBe(true);
    expect(parsePage(`projetos/${slug}/index.html`).querySelector('main h1')?.text).toContain(
      nome,
    );
  });

  it('a Home destaca exatamente os 4 projetos reais (RN-04 no limite)', () => {
    const main = parsePage('index.html').querySelector('main')!;
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    for (const [slug] of PROJETOS) {
      expect(hrefs, `destaque ausente: ${slug}`).toContain(`/projetos/${slug}/`);
    }
    expect(hrefs).not.toContain('/projetos/site-pessoal/');
  });

  it('o repositório privado (CLM) não vira link; os públicos sim', () => {
    const clm = parsePage('projetos/centro-logistico-municipal/index.html');
    expect(clm.querySelector('.links-projeto')).toBeNull();
    const matrix = parsePage('projetos/matrix/index.html')
      .querySelectorAll('a')
      .map((a) => a.getAttribute('href'));
    expect(matrix).toContain('https://github.com/maia-andre/matrix');
  });

  it('os projetos entram no índice de busca', () => {
    const indice = JSON.parse(readFileSync(distFile('busca-indice.json'), 'utf-8')) as Array<{
      url: string;
    }>;
    const urls = indice.map((i) => i.url);
    for (const [slug] of PROJETOS) expect(urls).toContain(`/projetos/${slug}/`);
  });
});

describe('conteúdo real — cinco artigos publicados', () => {
  it('o segundo artigo (derivado do Matrix) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/a-regua-que-desbota/index.html')).toBe(true);
    const main = parsePage('artigos/a-regua-que-desbota/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('régua');
    expect(main.text).toContain('Reflexões');
  });

  it('o terceiro artigo (pessoal) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-silencio-tambem-faz-barulho/index.html')).toBe(true);
    const main = parsePage('artigos/o-silencio-tambem-faz-barulho/index.html').querySelector(
      'main',
    )!;
    expect(main.querySelector('h1')?.text).toContain('silêncio');
    expect(main.text).toContain('Reflexões');
  });

  it('o quarto artigo (parábola) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-jardineiro-e-as-sementes-de-inverno/index.html')).toBe(true);
    const main = parsePage(
      'artigos/o-jardineiro-e-as-sementes-de-inverno/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('jardineiro');
    expect(main.text).toContain('Reflexões');
  });

  it('o quinto artigo (pessoal) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/a-cidade-nao-percebe-quando-alguem-desaba/index.html')).toBe(true);
    const main = parsePage(
      'artigos/a-cidade-nao-percebe-quando-alguem-desaba/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('cidade');
    expect(main.text).toContain('Reflexões');
  });

  it('a listagem mostra os 5 publicados na ordem da RN-02 (data desc; empate → alfabético)', () => {
    const titulos = parsePage('artigos/index.html')
      .querySelectorAll('main .item-titulo a')
      .map((a) => a.text.trim());
    expect(titulos).toHaveLength(5);
    // 2026-07-14 no topo; empates (2026-07-13 e 2026-07-12): desempate alfabético pt-BR
    expect(titulos[0]).toMatch(/^A cidade/);
    expect(titulos[1]).toMatch(/^O jardineiro/);
    expect(titulos[2]).toMatch(/^O silêncio/);
    expect(titulos[3]).toMatch(/^A régua/);
    expect(titulos[4]).toMatch(/^Construindo/);
  });
});

// Diário de pesquisa do Matrix — as notas de laboratório vivem no repositório
// do projeto (papers/notes/, amarradas a commits); o site só as divulga e linka.
const NOTAS_DO_DIARIO = [
  '01-quatro-modos-de-errar',
  '02-o-teto-de-nascimentos',
  '03-a-evolucao-extingue-a-agencia',
  '04-o-automodelo-era-um-modelo-do-outro',
  '05-phi-media-o-segundo-motivo',
  '06-o-interprete-leigo',
  '07-o-dedo-do-espectador',
  '08-o-sinal-e-a-mentira',
  '09-o-self-ja-estava-la',
] as const;

describe('página do Matrix — diário de pesquisa', () => {
  it('tem a seção com as 9 notas na ordem, cada uma linkando o arquivo no repositório', () => {
    const main = parsePage('projetos/matrix/index.html').querySelector('main')!;
    expect(main.querySelectorAll('h2').map((h) => h.text.trim())).toContain(
      'Diário de pesquisa',
    );
    const notas = main
      .querySelectorAll('a')
      .map((a) => a.getAttribute('href'))
      .filter((href) => href?.includes('/matrix/blob/'));
    expect(notas).toEqual(
      NOTAS_DO_DIARIO.map(
        (nota) => `https://github.com/maia-andre/matrix/blob/main/papers/notes/${nota}.md`,
      ),
    );
  });

  it('fecha o ciclo nota → artigo: o diário linka o artigo destilado', () => {
    const hrefs = parsePage('projetos/matrix/index.html')
      .querySelector('main')!
      .querySelectorAll('a')
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/a-regua-que-desbota/');
  });
});

describe('v1.0.0 — botão de tema com estado acessível (nota do review INC-08)', () => {
  it('o script atualiza aria-pressed ao revelar e ao alternar', () => {
    const html = readFileSync(distFile('index.html'), 'utf-8');
    const externos = [...html.matchAll(/<script[^>]*src="([^"]+\.js)"/g)].map((m) =>
      readFileSync(distFile(m[1]!.slice(1)), 'utf-8'),
    );
    const conteudo = [html, ...externos].join('\n');
    expect(conteudo).toContain('aria-pressed');
  });
});
