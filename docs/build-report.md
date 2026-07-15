# Build report — 2026-07-14 (INC-13)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada)
Incremento: INC-13 — Cards de projetos + letra capitular nas reflexões
Rodada: construção
Testes: 183 passando / 183 total — `npm test`

## Requisitos atendidos

- **REQ-E07** — Atendido — `/projetos/` e os destaques da Home renderizam cada
  projeto como `li.cartao-projeto` dentro de `ol.grade-projetos` (1 coluna no
  celular, 2 a partir de 40rem), com contorno `var(--linha)`, fundo
  `var(--superficie)` e hover `var(--carimbo)` — nenhum hex fixo. A informação
  é exatamente a de antes: nome linkado, descrição, tecnologias na camada mono
  (`.registro .tecnologia`) e tags. Coberto por `tests/cards-capitular.test.ts`
  (5 cards em /projetos/, 4 na Home, campos presentes em cada card, regra CSS
  por tokens) e pelos testes v1 de conteúdo que seguem verdes.
- **REQ-E08** — Atendido — `div.prosa` ganha a classe `prosa-capitular` em
  `artigos/[slug].astro` somente quando `categoria === 'reflexoes'` **e**
  `temCapitular(body)`; o efeito é
  `.prosa-capitular > p:first-of-type::first-letter` (float, 3.1em, cor
  `--carimbo`). Artigos fora de reflexões não têm a classe (teste com
  `construindo-este-site`, categoria computacao).

## Regras de negócio

- **RN-E03** — Atendida — efeito 100% CSS: o Markdown-fonte não muda, o HTML
  do parágrafo não ganha nenhuma marcação extra (teste verifica que o `<p>`
  não contém `<span>` e que o texto começa íntegro), e leitores de tela
  recebem o parágrafo normal (::first-letter é invisível à árvore de
  acessibilidade).

## Casos extremos cobertos

- **CE-E02** — `temCapitular()` em `src/lib/conteudo.ts`: descarta marcadores
  de ênfase do Markdown (`*`, `_`, `` ` ``) e exige `\p{L}` no primeiro
  caractere. Coberto em dois níveis: teste unitário com os limites (letra,
  ênfase, acentuada, travessão, aspas retas/curvas, número, vazio, só
  whitespace) e build real com fixture de reflexões começando com travessão —
  a página gerada não contém `prosa-capitular` (`builds-reais.test.ts`).

## Perguntas em aberto / pendências

- Nota de teste: o minificador CSS normaliza `::first-letter` para
  `:first-letter`; o teste aceita as duas grafias.
