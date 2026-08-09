import { describe, expect, it } from 'vitest';
import { filtrarPublicados, ordenarArtigos } from '../src/lib/conteudo';
import { pageExists, parsePage } from './helpers/dist';

// REQ-05 — /artigos/ e /artigos/<categoria>/ com listagem ordenada
// REQ-07 / RN-05 — rascunho fora de produção por completo
// RN-02 — data desc; empate por título alfabético

type ArtigoMinimo = { data: Date; titulo: string };
const artigo = (titulo: string, data: string): ArtigoMinimo => ({
  titulo,
  data: new Date(data),
});

describe('RN-02 — ordenação das listagens', () => {
  it('ordena por data decrescente', () => {
    const ordenados = ordenarArtigos([
      artigo('Antigo', '2026-01-01'),
      artigo('Novo', '2026-07-01'),
      artigo('Médio', '2026-03-15'),
    ]);
    expect(ordenados.map((a) => a.titulo)).toEqual(['Novo', 'Médio', 'Antigo']);
  });

  it('desempata pela ordem alfabética do título (colação pt-BR)', () => {
    const ordenados = ordenarArtigos([
      artigo('Zebra', '2026-07-01'),
      artigo('Água', '2026-07-01'),
      artigo('banana', '2026-07-01'),
    ]);
    expect(ordenados.map((a) => a.titulo)).toEqual(['Água', 'banana', 'Zebra']);
  });

  it('não muta a lista original', () => {
    const original = [artigo('B', '2026-01-02'), artigo('A', '2026-01-01')];
    ordenarArtigos(original);
    expect(original[0]!.titulo).toBe('B');
  });
});

describe('RN-05 — filtro de rascunhos', () => {
  const publicado = { rascunho: false };
  const rascunho = { rascunho: true };

  it('remove rascunhos em produção', () => {
    expect(filtrarPublicados([publicado, rascunho], true)).toEqual([publicado]);
  });

  it('mantém rascunhos fora de produção (preview do autor no dev)', () => {
    expect(filtrarPublicados([publicado, rascunho], false)).toHaveLength(2);
  });
});

describe('REQ-05 — página de listagem /artigos/', () => {
  it('existe e lista o artigo publicado com título, descrição, data e categoria', () => {
    expect(pageExists('artigos/index.html')).toBe(true);
    const main = parsePage('artigos/index.html').querySelector('main')!;
    const link = main
      .querySelectorAll('a')
      .find((a) => a.getAttribute('href') === '/artigos/construindo-este-site/');
    expect(link, 'link do artigo ausente na listagem').toBeDefined();
    expect(main.text).toContain('Construindo este site como um projeto de software');
    expect(main.text).toContain('spec, backlog de incrementos, TDD');
    const datas = main.querySelectorAll('time').map((t) => t.getAttribute('datetime'));
    expect(datas, 'data do artigo ausente na listagem').toContain('2026-07-12');
    expect(main.text).toContain('Computação');
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs, 'tags do artigo ausentes na listagem').toContain('/tags/astro/');
  });

  it.each(['computacao', 'fundamentos', 'gestao-publica', 'reflexoes'])(
    'existe página da categoria %s',
    (categoria) => {
      expect(pageExists(`artigos/${categoria}/index.html`)).toBe(true);
    },
  );

  it('a página da categoria do artigo o lista', () => {
    const main = parsePage('artigos/computacao/index.html').querySelector('main')!;
    expect(main.text).toContain('Construindo este site');
  });

  // Desde a estreia de gestao-publica (2026-07-20) as três categorias têm
  // artigo publicado — o estado vazio ("nenhum artigo") não tem mais categoria
  // real que o exercite; o que segue coberto é o não-vazamento entre categorias.
  it('a categoria estreante lista o seu artigo, sem vazar artigos de outras', () => {
    const main = parsePage('artigos/gestao-publica/index.html').querySelector('main')!;
    expect(main.text).toContain('Organizar um almoxarifado');
    expect(main.text).not.toContain('Construindo este site');
    expect(main.text).not.toContain('A névoa não decide');
  });
});

describe('REQ-07 / RN-05 — rascunho não existe em produção', () => {
  const RASCUNHO_SLUG = 'controle-patrimonial-na-pratica';

  it('não gera página própria', () => {
    expect(pageExists(`artigos/${RASCUNHO_SLUG}/index.html`)).toBe(false);
  });

  it('não aparece em nenhuma listagem', () => {
    for (const pagina of [
      'artigos/index.html',
      'artigos/gestao-publica/index.html',
      'index.html',
    ]) {
      expect(
        parsePage(pagina).text,
        `rascunho vazou em ${pagina}`,
      ).not.toContain('Controle patrimonial na prática');
    }
  });
});
