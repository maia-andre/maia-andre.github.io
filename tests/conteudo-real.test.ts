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

describe('conteúdo real — vinte e oito artigos publicados', () => {
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

  it('o sexto artigo (pessoal) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-velorio-que-nao-houve/index.html')).toBe(true);
    const main = parsePage('artigos/o-velorio-que-nao-houve/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('velório');
    expect(main.text).toContain('Reflexões');
  });

  it('o sétimo artigo (conto) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-menino-que-tinha-medo-das-proprias-maos/index.html')).toBe(true);
    const main = parsePage(
      'artigos/o-menino-que-tinha-medo-das-proprias-maos/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('menino');
    expect(main.text).toContain('Reflexões');
  });

  it('o oitavo artigo (ensaio pessoal) existe, com categoria reflexoes e o link da régua', () => {
    expect(pageExists('artigos/a-memoria-que-nao-desbota/index.html')).toBe(true);
    const main = parsePage('artigos/a-memoria-que-nao-desbota/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('memória');
    expect(main.text).toContain('Reflexões');
    // a peça inversa linka a peça original
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/a-regua-que-desbota/');
  });

  it('o nono artigo (crônica-carta) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/a-resposta-que-fiquei-devendo/index.html')).toBe(true);
    const main = parsePage('artigos/a-resposta-que-fiquei-devendo/index.html').querySelector(
      'main',
    )!;
    expect(main.querySelector('h1')?.text).toContain('resposta');
    expect(main.text).toContain('Reflexões');
  });

  it('o décimo artigo (crônica) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/a-pergunta-errada/index.html')).toBe(true);
    const main = parsePage('artigos/a-pergunta-errada/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('pergunta');
    expect(main.text).toContain('Reflexões');
  });

  it('o décimo primeiro artigo (carta) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/carta-ao-menino-de-seis-anos/index.html')).toBe(true);
    const main = parsePage('artigos/carta-ao-menino-de-seis-anos/index.html').querySelector(
      'main',
    )!;
    expect(main.querySelector('h1')?.text).toContain('Carta');
    expect(main.text).toContain('Reflexões');
  });

  it('o décimo segundo artigo (ensaio) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/a-nevoa-nao-decide/index.html')).toBe(true);
    const main = parsePage('artigos/a-nevoa-nao-decide/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('névoa');
    expect(main.text).toContain('Reflexões');
  });

  it('o décimo terceiro artigo (parábola) existe, com categoria reflexoes e o link do Jardineiro', () => {
    expect(pageExists('artigos/os-canteiros-que-espalharam-sementes/index.html')).toBe(true);
    const main = parsePage(
      'artigos/os-canteiros-que-espalharam-sementes/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('canteiros');
    expect(main.text).toContain('Reflexões');
    // a parábola-irmã linka a original, como as duas réguas
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/o-jardineiro-e-as-sementes-de-inverno/');
  });

  it('o décimo quarto artigo (estreia do pilar técnico) existe com categoria computacao', () => {
    expect(pageExists('artigos/todo-software-conta-uma-historia/index.html')).toBe(true);
    const main = parsePage(
      'artigos/todo-software-conta-uma-historia/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('software');
    expect(main.text).toContain('Computação');
    // a tese que abre o pilar técnico, por extenso
    expect(main.text).toContain('diário de quem não sabia que estava escrevendo um diário');
  });

  it('o décimo quinto artigo (o paralelo dos dois mundos) estreia a categoria gestao-publica', () => {
    expect(
      pageExists(
        'artigos/organizar-um-almoxarifado-e-organizar-software-sao-o-mesmo-problema/index.html',
      ),
    ).toBe(true);
    const main = parsePage(
      'artigos/organizar-um-almoxarifado-e-organizar-software-sao-o-mesmo-problema/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('almoxarifado');
    expect(main.text).toContain('Gestão Pública');
    // a tese do artigo, por extenso na descrição
    expect(main.text).toContain('antes de trabalhar com computadores, trabalhamos com informação');
  });

  it('o décimo sexto artigo (requisito vs problema) existe com categoria computacao', () => {
    expect(
      pageExists('artigos/quando-o-requisito-esta-certo-e-o-problema-continua-errado/index.html'),
    ).toBe(true);
    const main = parsePage(
      'artigos/quando-o-requisito-esta-certo-e-o-problema-continua-errado/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('requisito');
    expect(main.text).toContain('Computação');
    // a distinção que sustenta o artigo, por extenso
    expect(main.text).toContain('Requisito é o que foi pedido. Problema é o que dói');
  });

  it('o décimo sétimo artigo (a crônica do vidro) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/do-outro-lado-do-vidro/index.html')).toBe(true);
    const main = parsePage('artigos/do-outro-lado-do-vidro/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('vidro');
    expect(main.text).toContain('Reflexões');
    // o fecho que devolve a pergunta do artigo do requisito, por extenso
    expect(main.text).toContain('há dias em que o vidro é a gente');
    // a crônica linka as duas pontas do triângulo
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/a-cidade-nao-percebe-quando-alguem-desaba/');
    expect(hrefs).toContain(
      '/artigos/quando-o-requisito-esta-certo-e-o-problema-continua-errado/',
    );
  });

  it('o décimo oitavo artigo (a certidão da névoa) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/para-sair-abra-aqui/index.html')).toBe(true);
    const main = parsePage('artigos/para-sair-abra-aqui/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('abra aqui');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso
    expect(main.text).toContain('Eu não queria desaparecer. Eu queria ser achado');
  });

  it('o décimo nono artigo (documentação também é código) existe com categoria computacao', () => {
    expect(
      pageExists('artigos/o-dia-em-que-descobri-que-documentacao-tambem-e-codigo/index.html'),
    ).toBe(true);
    const main = parsePage(
      'artigos/o-dia-em-que-descobri-que-documentacao-tambem-e-codigo/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('documentação');
    expect(main.text).toContain('Computação');
    // a virada do artigo, por extenso
    expect(main.text).toContain('Requisito escrito é decisão que não precisa ser tomada de novo');
    // as duas pontes: o caso vivo do site e o par pessoal
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/construindo-este-site/');
    expect(hrefs).toContain('/artigos/a-memoria-que-nao-desbota/');
  });

  it('o vigésimo artigo (a peça-economia) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-emprestimo-com-juros/index.html')).toBe(true);
    const main = parsePage('artigos/o-emprestimo-com-juros/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('empréstimo');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso
    expect(main.text).toContain('anestesia é sempre alugada');
  });

  it('o vigésimo primeiro artigo (os autos completos) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-reu-que-era-a-vitima/index.html')).toBe(true);
    const main = parsePage('artigos/o-reu-que-era-a-vitima/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('réu');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso
    expect(main.text).toContain(
      'O tribunal dos adultos durou uma noite. O meu durou vinte e seis anos',
    );
    // a peça referencia o interrogatório e o acórdão da série
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/a-pergunta-errada/');
    expect(hrefs).toContain('/artigos/carta-ao-menino-de-seis-anos/');
  });

  it('o vigésimo segundo artigo (o moletom) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-moletom-preto/index.html')).toBe(true);
    const main = parsePage('artigos/o-moletom-preto/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('moletom');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso
    expect(main.text).toContain('Eu não ouvia barulho. Ouvia alguém concordando.');
    // a peça referencia o velório, o aviso e o silêncio da série
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/artigos/o-velorio-que-nao-houve/');
    expect(hrefs).toContain('/artigos/para-sair-abra-aqui/');
    expect(hrefs).toContain('/artigos/o-silencio-tambem-faz-barulho/');
  });

  it('o vigésimo terceiro artigo (o microscópio) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/rapido-demais-devagar-demais/index.html')).toBe(true);
    const main = parsePage('artigos/rapido-demais-devagar-demais/index.html').querySelector(
      'main',
    )!;
    expect(main.querySelector('h1')?.text).toContain('Rápido demais');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso
    expect(main.text).toContain('Não foi um erro do detector. Foi um limite dele.');
    // a peça linka o projeto e o repositório do Matrix
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/projetos/matrix/');
    expect(hrefs).toContain('https://github.com/maia-andre/matrix');
  });

  it('o vigésimo quarto artigo (a corrida armamentista) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/a-rainha-vermelha-da-propria-cabeca/index.html')).toBe(true);
    const main = parsePage('artigos/a-rainha-vermelha-da-propria-cabeca/index.html').querySelector(
      'main',
    )!;
    expect(main.querySelector('h1')?.text).toContain('Rainha Vermelha');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso
    expect(main.text).toContain('horizonte fundo não produz nada');
    // a peça linka o projeto e o repositório do Matrix
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/projetos/matrix/');
    expect(hrefs).toContain('https://github.com/maia-andre/matrix');
  });

  it('o vigésimo quinto artigo (o mar que não cobrava perguntas) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-mar-de-sao-sebastiao/index.html')).toBe(true);
    const main = parsePage('artigos/o-mar-de-sao-sebastiao/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('mar de São Sebastião');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso (contida numa única linha-fonte)
    expect(main.text).toContain('Curiosidade, no original, é um plano de volta');
  });

  it('o vigésimo sexto artigo (a resposta à crônica) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-estranho-passaro/index.html')).toBe(true);
    const main = parsePage('artigos/o-estranho-passaro/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('estranho pássaro');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso (contida numa única linha-fonte)
    expect(main.text).toContain('Texto publicado é uma pergunta paciente');
  });

  it('o vigésimo sétimo artigo (o fecho do pilar técnico) existe com categoria computacao', () => {
    expect(pageExists('artigos/a-ilusao-do-desenvolvedor-heroi/index.html')).toBe(true);
    const main = parsePage(
      'artigos/a-ilusao-do-desenvolvedor-heroi/index.html',
    ).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('ilusão do desenvolvedor herói');
    expect(main.text).toContain('Computação');
    // a frase-âncora da peça, por extenso (contida numa única linha-fonte)
    expect(main.text).toContain('quem deixa o mapa em vez de ser o mapa');
  });

  it('o vigésimo oitavo artigo (o primeiro poema do site) existe com categoria reflexoes', () => {
    expect(pageExists('artigos/o-poema-da-contracapa/index.html')).toBe(true);
    const main = parsePage('artigos/o-poema-da-contracapa/index.html').querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('poema da contracapa');
    expect(main.text).toContain('Reflexões');
    // a frase-âncora da peça, por extenso (contida numa única linha-fonte)
    expect(main.text).toContain('Eu li e reconheci o quintal');
    // os versos quebram de verdade: hard breaks do markdown viram <br>
    expect(main.querySelectorAll('br').length).toBeGreaterThanOrEqual(30);
    // a nota "Sobre o original" linka o poema resgatado no Internet Archive
    const hrefs = main.querySelectorAll('a').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain(
      'https://web.archive.org/web/20080228173611/http://www.spectrumgothic.com.br:80/literatura/poemas/visitantes/galeria03/jardim.htm',
    );
  });

  it('a listagem mostra os 28 publicados na ordem da RN-02 (data desc; empate → alfabético)', () => {
    const titulos = parsePage('artigos/index.html')
      .querySelectorAll('main .item-titulo a')
      .map((a) => a.text.trim());
    expect(titulos).toHaveLength(28);
    // empate TRIPLO em 2026-08-04 (A ilusão / O estranho pássaro / O
    // poema da contracapa) abre a lista com desempate alfabético pt-BR; O
    // mar de São Sebastião (2026-07-29, sem empate) e A Rainha Vermelha
    // (2026-07-28, sem empate) vêm a seguir; empate duplo em 2026-07-27
    // (O moletom / Rápido demais), duplo em 2026-07-26 (O empréstimo / O
    // réu), triplo em 2026-07-24 (Do outro lado / O dia / Para sair),
    // duplo em 2026-07-20 (Organizar / Todo software), em 2026-07-19 (A
    // névoa / Os canteiros), em 2026-07-15 (A memória / O menino) e em
    // 2026-07-14 (A cidade / O velório); 2026-07-21 sem empate
    expect(titulos[0]).toMatch(/^A ilusão do desenvolvedor herói/);
    expect(titulos[1]).toMatch(/^O estranho pássaro/);
    expect(titulos[2]).toMatch(/^O poema da contracapa/);
    expect(titulos[3]).toMatch(/^O mar de São Sebastião/);
    expect(titulos[4]).toMatch(/^A Rainha Vermelha/);
    expect(titulos[5]).toMatch(/^O moletom/);
    expect(titulos[6]).toMatch(/^Rápido demais/);
    expect(titulos[7]).toMatch(/^O empréstimo/);
    expect(titulos[8]).toMatch(/^O réu/);
    expect(titulos[9]).toMatch(/^Do outro lado/);
    expect(titulos[10]).toMatch(/^O dia em que descobri/);
    expect(titulos[11]).toMatch(/^Para sair/);
    expect(titulos[12]).toMatch(/^Quando o requisito/);
    expect(titulos[13]).toMatch(/^Organizar/);
    expect(titulos[14]).toMatch(/^Todo software/);
    expect(titulos[15]).toMatch(/^A névoa/);
    expect(titulos[16]).toMatch(/^Os canteiros/);
    expect(titulos[17]).toMatch(/^Carta/);
    expect(titulos[18]).toMatch(/^A pergunta/);
    expect(titulos[19]).toMatch(/^A resposta/);
    expect(titulos[20]).toMatch(/^A memória/);
    expect(titulos[21]).toMatch(/^O menino/);
    expect(titulos[22]).toMatch(/^A cidade/);
    expect(titulos[23]).toMatch(/^O velório/);
    expect(titulos[24]).toMatch(/^O jardineiro/);
    expect(titulos[25]).toMatch(/^O silêncio/);
    expect(titulos[26]).toMatch(/^A régua/);
    expect(titulos[27]).toMatch(/^Construindo/);
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
  '10-o-zero-estrutural',
  '11-a-replicacao',
  '12-a-janela-longa',
  '13-o-fatorial',
  '14-o-torneio',
  '15-o-imposto',
  '16-a-varredura-do-desconto',
  '17-ruido-ou-teimosia',
  '18-o-erro-do-plano',
  '19-a-grade-fina',
  '20-o-invasor-raro',
  '21-o-imposto-que-recicla',
  '22-a-sonda-ordinal',
  '23-o-teste-de-bimodalidade',
  '24-o-detector-de-colapso',
  '25-a-dose-resposta-do-detector',
  '26-duas-linhagens-sem-h-conhecido',
  '27-o-detector-de-nova-estrategia',
  '28-mutacao-ou-ramificacao-em-delta-080',
] as const;

describe('página do Matrix — diário de pesquisa', () => {
  it('tem a seção com as 28 notas na ordem, cada uma linkando o arquivo no repositório', () => {
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
