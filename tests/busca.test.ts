import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { criarBusca, type ItemDeBusca } from '../src/lib/busca';
import { distFile, pageExists, parsePage } from './helpers/dist';

// REQ-13 — /busca/ com Fuse.js sobre índice JSON gerado no build
// (título, descrição, tags e categoria de artigos e projetos publicados)
// CE-02 — sem resultados → estado vazio; sem JS → aviso

function lerIndice(): ItemDeBusca[] {
  return JSON.parse(readFileSync(distFile('busca-indice.json'), 'utf-8'));
}

describe('REQ-13 — índice JSON gerado no build', () => {
  it('existe e é um JSON válido com os campos da spec', () => {
    const indice = lerIndice();
    expect(indice.length).toBeGreaterThanOrEqual(2);
    for (const item of indice) {
      expect(item.titulo).toBeTruthy();
      expect(item.descricao).toBeTruthy();
      expect(Array.isArray(item.tags)).toBe(true);
      expect(item.url).toMatch(/^\/(artigos|projetos)\//);
    }
  });

  it('contém o artigo publicado com categoria', () => {
    const artigo = lerIndice().find((i) => i.url === '/artigos/construindo-este-site/');
    expect(artigo).toBeDefined();
    expect(artigo!.categoria).toBe('computacao');
    expect(artigo!.tags).toContain('astro');
  });

  it('contém o projeto', () => {
    const projeto = lerIndice().find((i) => i.url === '/projetos/site-pessoal/');
    expect(projeto).toBeDefined();
    expect(projeto!.categoria).toBeNull();
  });

  it('não contém rascunhos (RN-05)', () => {
    const urls = lerIndice().map((i) => i.url);
    expect(urls).not.toContain('/artigos/controle-patrimonial-na-pratica/');
    const titulos = lerIndice().map((i) => i.titulo);
    expect(titulos).not.toContain('Controle patrimonial na prática');
  });
});

describe('REQ-13 — comportamento da busca (mesma lógica da página)', () => {
  const indice: ItemDeBusca[] = [
    {
      titulo: 'Construindo este site',
      descricao: 'spec e TDD',
      tags: ['astro', 'meta'],
      categoria: 'computacao',
      url: '/artigos/a/',
    },
    {
      titulo: 'Site pessoal',
      descricao: 'arquivo vivo',
      tags: ['astro', 'typescript'],
      categoria: null,
      url: '/projetos/p/',
    },
  ];

  it('encontra por título', () => {
    const buscar = criarBusca(indice);
    expect(buscar('construindo').map((i) => i.url)).toContain('/artigos/a/');
  });

  it('encontra por tag (artigo e projeto juntos)', () => {
    const urls = criarBusca(indice)('astro').map((i) => i.url);
    expect(urls).toContain('/artigos/a/');
    expect(urls).toContain('/projetos/p/');
  });

  it('encontra por categoria', () => {
    expect(criarBusca(indice)('computacao').map((i) => i.url)).toContain('/artigos/a/');
  });

  it('CE-02: termo inexistente retorna lista vazia', () => {
    expect(criarBusca(indice)('xyzinexistente')).toHaveLength(0);
  });

  it('termo vazio ou só espaços retorna lista vazia', () => {
    expect(criarBusca(indice)('')).toHaveLength(0);
    expect(criarBusca(indice)('   ')).toHaveLength(0);
  });
});

describe('REQ-13/CE-02 — página /busca/', () => {
  it('existe com campo de busca rotulado', () => {
    expect(pageExists('busca/index.html')).toBe(true);
    const main = parsePage('busca/index.html').querySelector('main')!;
    expect(main.querySelector('input[type="search"], input[type="text"]')).not.toBeNull();
    expect(main.querySelector('label')).not.toBeNull();
  });

  it('CE-02: informa que a busca requer JavaScript quando desabilitado', () => {
    const html = readFileSync(distFile('busca/index.html'), 'utf-8');
    expect(html).toContain('<noscript>');
    expect(html.toLowerCase()).toContain('javascript');
  });

  it('tem região de resultados com aria-live', () => {
    const main = parsePage('busca/index.html').querySelector('main')!;
    expect(main.querySelector('[aria-live]')).not.toBeNull();
  });
});
