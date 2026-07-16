import { describe, expect, it } from 'vitest';
import { pageExists, parsePage } from './helpers/dist';

// REQ-06 — página do artigo em /artigos/<slug>/ com título, data, categoria,
// tags linkadas e corpo Markdown renderizado (slug = nome do arquivo)

const SLUG = 'construindo-este-site';
const PAGINA = `artigos/${SLUG}/index.html`;

describe('REQ-06 — página individual do artigo', () => {
  it('gera a página no slug igual ao nome do arquivo', () => {
    expect(pageExists(PAGINA)).toBe(true);
  });

  it('renderiza o título do frontmatter como h1', () => {
    const h1 = parsePage(PAGINA).querySelector('main h1');
    expect(h1?.text).toContain('Construindo este site');
  });

  it('exibe a data de publicação em pt-BR', () => {
    const doc = parsePage(PAGINA);
    const tempo = doc.querySelector('main time');
    expect(tempo?.getAttribute('datetime')).toBe('2026-07-12');
    expect(tempo?.text).toMatch(/12 de julho de 2026/);
  });

  it('exibe o nome de exibição da categoria (RN-01)', () => {
    expect(parsePage(PAGINA).querySelector('main')!.text).toContain('Computação');
  });

  it('lista as tags como links para /tags/<tag>/', () => {
    const links = parsePage(PAGINA)
      .querySelectorAll('main a')
      .map((a) => a.getAttribute('href'));
    expect(links).toContain('/tags/astro/');
    expect(links).toContain('/tags/engenharia-de-software/');
  });

  it('renderiza o corpo Markdown (parágrafos e formatação)', () => {
    const artigo = parsePage(PAGINA).querySelector('main article');
    expect(artigo).not.toBeNull();
    expect(artigo!.querySelectorAll('p').length).toBeGreaterThan(1);
    expect(artigo!.text).toContain('arquivo vivo');
  });
});
