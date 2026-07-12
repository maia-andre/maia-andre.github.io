import { describe, expect, it } from 'vitest';
import { pageExists, parsePage } from './helpers/dist';

// REQ-01 — layout base em todas as páginas + página 404
// RNF-04 — lang="pt-BR"
// RNF-05 — responsivo (meta viewport)

const NAV_LINKS: Array<[label: string, href: string]> = [
  ['Início', '/'],
  ['Artigos', '/artigos/'],
  ['Projetos', '/projetos/'],
  ['Tags', '/tags/'],
  ['Sobre', '/sobre/'],
  ['Busca', '/busca/'],
];

const PAGES = ['index.html', '404.html'];

describe('REQ-01 — layout base compartilhado', () => {
  it.each(PAGES)('%s existe no build', (page) => {
    expect(pageExists(page)).toBe(true);
  });

  it.each(PAGES)('%s tem cabeçalho com a navegação completa', (page) => {
    const doc = parsePage(page);
    const nav = doc.querySelector('header nav');
    expect(nav, `header nav ausente em ${page}`).not.toBeNull();
    for (const [label, href] of NAV_LINKS) {
      const link = nav!
        .querySelectorAll('a')
        .find((a) => a.getAttribute('href') === href);
      expect(link, `link "${label}" (${href}) ausente em ${page}`).toBeDefined();
      expect(link!.text.trim()).toBe(label);
    }
  });

  it.each(PAGES)('%s tem rodapé', (page) => {
    expect(parsePage(page).querySelector('footer')).not.toBeNull();
  });

  it.each(PAGES)('%s tem título com o nome do site', (page) => {
    const title = parsePage(page).querySelector('title');
    expect(title).not.toBeNull();
    expect(title!.text).toContain('André Maia');
  });

  it('404 explica que a página não existe', () => {
    const text = parsePage('404.html').text;
    expect(text).toMatch(/não (foi )?encontrada|não existe/i);
  });
});

describe('RNF-04 — idioma pt-BR', () => {
  it.each(PAGES)('%s declara lang="pt-BR"', (page) => {
    const html = parsePage(page).querySelector('html');
    expect(html?.getAttribute('lang')).toBe('pt-BR');
  });
});

describe('RNF-05 — base responsiva', () => {
  it.each(PAGES)('%s tem meta viewport', (page) => {
    const meta = parsePage(page).querySelector('meta[name="viewport"]');
    expect(meta?.getAttribute('content')).toContain('width=device-width');
  });
});
