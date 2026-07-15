import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { temCapitular } from '../src/lib/conteudo';
import { distFile, parsePage } from './helpers/dist';

// INC-13 — Cards de projetos (REQ-E07) e letra capitular nas reflexões
// (REQ-E08, RN-E03, CE-E02).

function cssDoSite(relPath = 'projetos/index.html'): string {
  const pagina = parsePage(relPath);
  const externos = pagina
    .querySelectorAll('link[rel="stylesheet"]')
    .map((l) => l.getAttribute('href'))
    .filter((href): href is string => Boolean(href))
    .map((href) => readFileSync(distFile(href.replace(/^\//, '')), 'utf-8'));
  const inline = pagina.querySelectorAll('style').map((s) => s.text);
  return [...externos, ...inline].join('\n');
}

describe('REQ-E07 — projetos como cards, mesmos dados de hoje', () => {
  it('/projetos/ apresenta os 5 projetos como cards com nome, descrição e tecnologias em mono', () => {
    const main = parsePage('projetos/index.html').querySelector('main')!;
    const cards = main.querySelectorAll('.cartao-projeto');
    expect(cards.length).toBe(5);
    for (const card of cards) {
      expect(card.querySelector('.item-titulo a'), 'nome linkado').not.toBeNull();
      expect(card.querySelector('.item-descricao'), 'descrição').not.toBeNull();
      expect(card.querySelector('.registro .tecnologia'), 'tecnologias na camada mono').not.toBeNull();
      expect(card.querySelector('.lista-tags'), 'tags').not.toBeNull();
    }
  });

  it('a Home apresenta os 4 destaques como cards', () => {
    const main = parsePage('index.html').querySelector('main')!;
    expect(main.querySelectorAll('.cartao-projeto').length).toBe(4);
  });

  it('o card tem contorno sutil por tokens de tema, sem hex fixo', () => {
    const bloco = cssDoSite().match(/\.cartao-projeto\s*{[^}]*}/)?.[0];
    expect(bloco, 'regra .cartao-projeto ausente').toBeDefined();
    expect(bloco).toMatch(/border/);
    expect(bloco).toMatch(/var\(--/);
    expect(bloco).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });
});

describe('REQ-E08/RN-E03 — capitular nas reflexões, efeito puramente visual', () => {
  it('artigo de reflexões que começa com letra ganha a classe da capitular', () => {
    const prosa = parsePage(
      'artigos/a-cidade-nao-percebe-quando-alguem-desaba/index.html',
    ).querySelector('.prosa')!;
    expect(prosa.classList.contains('prosa-capitular')).toBe(true);
  });

  it('artigo fora de reflexões não ganha capitular', () => {
    const prosa = parsePage('artigos/construindo-este-site/index.html').querySelector('.prosa')!;
    expect(prosa.classList.contains('prosa-capitular')).toBe(false);
  });

  it('a capitular é ::first-letter do primeiro parágrafo; o texto segue íntegro, sem marcação extra', () => {
    expect(cssDoSite('artigos/a-cidade-nao-percebe-quando-alguem-desaba/index.html')).toMatch(
      /\.prosa-capitular\s*>?\s*p:first-of-type::first-letter/,
    );
    const p = parsePage('artigos/a-cidade-nao-percebe-quando-alguem-desaba/index.html')
      .querySelector('.prosa p')!;
    expect(p.text.trim().startsWith('Hoje descobri')).toBe(true);
    expect(p.innerHTML).not.toMatch(/<span/);
  });
});

describe('CE-E02 — a decisão da capitular recusa o que não é letra', () => {
  it('aceita letra (com ou sem ênfase markdown), recusa travessão, aspas, número e vazio', () => {
    expect(temCapitular('Hoje descobri uma curiosidade sobre as cidades.')).toBe(true);
    expect(temCapitular('*Ênfase* no começo ainda é letra.')).toBe(true);
    expect(temCapitular('**Forte** também.')).toBe(true);
    expect(temCapitular('É acentuada e ainda é letra.')).toBe(true);
    expect(temCapitular('— Primeiro veio o travessão.')).toBe(false);
    expect(temCapitular('"Aspas retas" primeiro.')).toBe(false);
    expect(temCapitular('“Aspas curvas” primeiro.')).toBe(false);
    expect(temCapitular('1984 não é manual de instruções.')).toBe(false);
    expect(temCapitular('')).toBe(false);
    expect(temCapitular('   \n\n  ')).toBe(false);
  });
});
