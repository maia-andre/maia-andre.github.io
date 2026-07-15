# Build report — 2026-07-14 (INC-14, correção)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada)
Incremento: INC-14 — Linha do tempo em /artigos/ + transições de página
Rodada: correção (verify de 2026-07-14 — CLS 0,0247 em /busca/)
Testes: 192 passando / 192 total — `npm test`

## Correção aplicada

- **[REQ-E10 → RNF-E01]** O botão de tema nasce `[hidden]` e era revelado no
  `astro:page-load` — pós-paint sob o roteador, o que crescia o cabeçalho e
  empurrava o `main` (CLS 0,0247 na busca). Correção mínima em CSS:
  `.botao-tema[hidden] { display: inline-block; visibility: hidden; }` — caixa
  reservada, invisível e não-interativo sem JS (RNF-01 preservada). Lighthouse
  na busca após a correção: CLS **0,0000 em 3/3**, perf 100, a11y 100.
  Coberto por teste novo em `linha-tempo-transicoes.test.ts` (nasceu
  vermelho).

## Requisitos atendidos

- **REQ-E09** — Atendido — `ListaArtigos.astro` ganhou a prop `linhaDoTempo`;
  só `/artigos/` a usa (Home e páginas de categoria seguem como estavam — a
  spec nomeia `/artigos/`; interpretação registrada abaixo). CSS: linha
  vertical contínua (`var(--linha)`) e marcador circular por item
  (`var(--carimbo)` com anel `var(--papel)`), substituindo as réguas
  horizontais na variante. Ordem RN-02 e dados por item intocados — o teste
  v1 da listagem passa sem nenhuma mudança de expectativa. Coberto por
  `tests/linha-tempo-transicoes.test.ts`.
- **REQ-E10** — Atendido — `<ClientRouter />` no `Base.astro` (meta
  `astro-view-transitions-enabled` presente em todas as páginas, coberto por
  teste). Aprimoramento progressivo: navegação segue por `<a href>` puro
  (teste), sem JS o site funciona como sempre (RNF-01 v1). **Resiliência dos
  scripts v1 às trocas de página** (parte necessária do requisito — sem ela,
  tema e busca regrediriam): tema reaplicado em `astro:after-swap` (o roteador
  substitui os atributos do `<html>`), botão de tema religado em
  `astro:page-load`, busca religada por troca com índice baixado uma vez por
  sessão (falha de rede permite nova tentativa). Presença dos hooks nos
  bundles coberta por teste; comportamento dinâmico fica para o /verify em
  navegador.

## Requisitos não-funcionais

- **RNF-E03** — Atendido — bloco `@media (prefers-reduced-motion: reduce)`
  anula as animações de `::view-transition-*`; a transição de cor dos links
  da v1 continua atrás do portão `no-preference`. Ambos cobertos por teste.

## Casos extremos cobertos

- **CE-E05** — Navegador sem suporte à View Transitions API: o roteador do
  Astro degrada com fallback próprio e a navegação por `<a>` continua íntegra
  (teste estático dos links; drive real de console limpo fica para o /verify).

## Perguntas em aberto / pendências

- Interpretação registrada: REQ-E09 nomeia a listagem `/artigos/`; as páginas
  de categoria (`/artigos/<categoria>/`) mantiveram a listagem simples. Se a
  intenção era estender a variante a elas, é mudança de uma linha por página +
  teste — decidir no review ou como refinamento editorial.
