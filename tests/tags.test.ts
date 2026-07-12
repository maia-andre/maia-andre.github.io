import { describe, expect, it } from 'vitest';
import { colecionarTags } from '../src/lib/conteudo';
import { pageExists, parsePage } from './helpers/dist';

// REQ-11 — /tags/ com contagem; /tags/<tag>/ lista artigos E projetos;
// só existem páginas para tags de conteúdo publicado
// CE-03 — tag usada apenas por rascunho não gera página nem entra em /tags/

const artigo = (titulo: string, tags: string[], rascunho = false) => ({
  data: { titulo, data: new Date('2026-01-01'), tags, rascunho },
});
const projeto = (nome: string, tags: string[]) => ({ data: { nome, tags } });

describe('colecionarTags — união de artigos e projetos publicados', () => {
  it('agrupa por tag somando artigos e projetos, em ordem alfabética', () => {
    const mapa = colecionarTags(
      [artigo('A', ['zeta', 'ia']), artigo('B', ['ia'])] as never[],
      [projeto('P', ['ia', 'alfa'])] as never[],
      true,
    );
    expect([...mapa.keys()]).toEqual(['alfa', 'ia', 'zeta']);
    expect(mapa.get('ia')!.artigos).toHaveLength(2);
    expect(mapa.get('ia')!.projetos).toHaveLength(1);
    expect(mapa.get('alfa')!.artigos).toHaveLength(0);
  });

  it('CE-03: tag usada só por rascunho não entra em produção', () => {
    const mapa = colecionarTags(
      [artigo('Rasc', ['exclusiva-de-rascunho'], true), artigo('Pub', ['ia'])] as never[],
      [] as never[],
      true,
    );
    expect(mapa.has('exclusiva-de-rascunho')).toBe(false);
    expect(mapa.has('ia')).toBe(true);
  });

  it('fora de produção, rascunhos contam (preview do autor)', () => {
    const mapa = colecionarTags(
      [artigo('Rasc', ['exclusiva-de-rascunho'], true)] as never[],
      [] as never[],
      false,
    );
    expect(mapa.has('exclusiva-de-rascunho')).toBe(true);
  });
});

describe('REQ-11 — página /tags/', () => {
  it('existe e lista tags em uso com contagem', () => {
    expect(pageExists('tags/index.html')).toBe(true);
    const main = parsePage('tags/index.html').querySelector('main')!;
    const linkAstro = main
      .querySelectorAll('a')
      .find((a) => a.getAttribute('href') === '/tags/astro/');
    expect(linkAstro, 'link da tag astro ausente').toBeDefined();
    // astro é usada por 1 artigo + 1 projeto = 2
    expect(main.text).toMatch(/astro\s*\(?2\)?|#astro[^)]*2/);
  });

  it('CE-03: tag exclusiva de rascunho (patrimonio) não aparece', () => {
    const main = parsePage('tags/index.html').querySelector('main')!;
    expect(main.text).not.toContain('patrimonio');
  });
});

describe('REQ-11 — página /tags/<tag>/', () => {
  it('tag compartilhada lista artigo E projeto', () => {
    expect(pageExists('tags/astro/index.html')).toBe(true);
    const hrefs = parsePage('tags/astro/index.html')
      .querySelectorAll('main a')
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/construindo-este-site/');
    expect(hrefs).toContain('/projetos/site-pessoal/');
  });

  it('tag só de projeto lista apenas o projeto', () => {
    expect(pageExists('tags/typescript/index.html')).toBe(true);
    const hrefs = parsePage('tags/typescript/index.html')
      .querySelectorAll('main a')
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/projetos/site-pessoal/');
    expect(hrefs).not.toContain('/artigos/construindo-este-site/');
  });

  it('CE-03: não gera página para tag exclusiva de rascunho', () => {
    expect(pageExists('tags/patrimonio/index.html')).toBe(false);
  });
});
