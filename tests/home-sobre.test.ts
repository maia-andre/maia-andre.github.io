import { describe, expect, it } from 'vitest';
import {
  LIMITE_ARTIGOS_HOME,
  LIMITE_PROJETOS_HOME,
  artigosRecentes,
  projetosEmDestaque,
} from '../src/lib/conteudo';
import { pageExists, parsePage } from './helpers/dist';

// REQ-02 — Home: apresentação com a mensagem principal, 5 recentes, destaques
// REQ-10 — projetos com destaque: true na Home (até 4)
// REQ-12 — /sobre/ com Markdown editável
// RN-04 / CE-04 — limites 5/4; menos → existentes; zero → seção omitida

const artigo = (titulo: string, data: string) => ({
  data: { titulo, data: new Date(data), rascunho: false },
});
const projeto = (nome: string, destaque: boolean) => ({ data: { nome, destaque } });

describe('RN-04 — limites da Home', () => {
  it('recentes corta em 5 e ordena por data desc', () => {
    const seis = Array.from({ length: 6 }, (_, i) => artigo(`A${i}`, `2026-01-0${i + 1}`));
    const r = artigosRecentes(seis as never[], true);
    expect(LIMITE_ARTIGOS_HOME).toBe(5);
    expect(r).toHaveLength(5);
    expect((r[0] as ReturnType<typeof artigo>).data.titulo).toBe('A5');
  });

  it('com menos que o limite, mostra os existentes; com zero, lista vazia', () => {
    expect(artigosRecentes([artigo('X', '2026-01-01')] as never[], true)).toHaveLength(1);
    expect(artigosRecentes([], true)).toHaveLength(0);
  });

  it('recentes exclui rascunhos em produção', () => {
    const comRascunho = [
      artigo('Pub', '2026-01-01'),
      { data: { titulo: 'Rasc', data: new Date('2026-02-01'), rascunho: true } },
    ];
    const r = artigosRecentes(comRascunho as never[], true);
    expect(r).toHaveLength(1);
  });

  it('destaques corta em 4 e ignora não destacados', () => {
    const cinco = Array.from({ length: 5 }, (_, i) => projeto(`P${i}`, true));
    expect(LIMITE_PROJETOS_HOME).toBe(4);
    expect(projetosEmDestaque(cinco as never[])).toHaveLength(4);
    expect(projetosEmDestaque([projeto('Não', false)] as never[])).toHaveLength(0);
    expect(projetosEmDestaque([])).toHaveLength(0);
  });
});

describe('REQ-02 — Home', () => {
  it('apresenta a mensagem principal no conteúdo (não só no rodapé)', () => {
    const main = parsePage('index.html').querySelector('main')!;
    expect(main.text).toContain(
      'Entre código, gestão pública e as coisas que escrevo para conseguir carregar',
    );
  });

  it('lista o artigo mais recente com link', () => {
    const main = parsePage('index.html').querySelector('main')!;
    expect(main.text).toContain('Artigos recentes');
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    // com 16 publicados, a Home mostra os 5 mais recentes (RN-04) — Quando o
    // requisito (2026-07-21, sem empate) entra no topo e a Carta (agora a
    // sexta) sai da vitrine
    expect(hrefs).toContain(
      '/artigos/quando-o-requisito-esta-certo-e-o-problema-continua-errado/',
    );
    expect(hrefs).toContain(
      '/artigos/organizar-um-almoxarifado-e-organizar-software-sao-o-mesmo-problema/',
    );
    expect(hrefs).toContain('/artigos/todo-software-conta-uma-historia/');
    expect(hrefs).toContain('/artigos/a-nevoa-nao-decide/');
    expect(hrefs).not.toContain('/artigos/carta-ao-menino-de-seis-anos/');
    expect(hrefs).not.toContain('/artigos/construindo-este-site/');
    expect(hrefs).toContain('/artigos/');
  });

  it('não vaza rascunho na Home', () => {
    expect(parsePage('index.html').text).not.toContain('Controle patrimonial na prática');
  });
});

describe('REQ-10 — projetos em destaque na Home', () => {
  it('lista projetos com destaque: true com link', () => {
    const main = parsePage('index.html').querySelector('main')!;
    expect(main.text).toContain('Projetos em destaque');
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    // desde o INC-10 os destaques são os 4 projetos reais (site-pessoal saiu)
    expect(hrefs).toContain('/projetos/matrix/');
    expect(hrefs).toContain('/projetos/');
  });
});

describe('REQ-12 — página Sobre', () => {
  it('existe e renderiza o Markdown editável', () => {
    expect(pageExists('sobre/index.html')).toBe(true);
    const main = parsePage('sobre/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('Sobre');
    expect(main.querySelectorAll('p').length).toBeGreaterThan(2);
  });

  it('cobre quem sou, por que escrevo/desenvolvo e contato', () => {
    const texto = parsePage('sobre/index.html').querySelector('main')!.text.toLowerCase();
    expect(texto).toContain('escrev');
    expect(texto).toContain('software');
    expect(texto).toContain('contato');
  });
});
