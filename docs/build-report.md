# Build report — 2026-07-14
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada)
Incremento: INC-11 — Tipografia própria: Lora + IBM Plex Mono self-hosted
Rodada: construção
Testes: 165 passando / 165 total — `npm test` (vitest run, inclui build real do Astro)

## Requisitos atendidos

- **REQ-E01** — Atendido — 4 woff2 latinos em `public/fontes/` (Lora variável
  400–700 normal e itálico; IBM Plex Mono 400 e 600), servidos do próprio
  domínio; `@font-face` em `src/styles/global.css`; licenças OFL commitadas ao
  lado das fontes. Coberto por `tests/tipografia.test.ts` ("todos os woff2 de
  dist são exatamente os 4 esperados", "nenhum HTML ou CSS gerado referencia
  serviço de fontes de terceiros").
- **REQ-E02** — Atendido — troca feita nos tokens: `--fonte-corpo` e
  `--fonte-titulo` → Lora; `--fonte-registro` → IBM Plex Mono. Corpo, h1–h4,
  `.registro` (datas, categoria, tags, tecnologias) e `.navegacao a` já
  consumiam os tokens — verificado por teste de CSS e por teste de markup nas
  páginas de artigo e projeto. Ajuste óptico: tracking dos títulos de -0.02em
  para -0.01em (serifada em corpo grande).
- **REQ-E03** — Atendido — `font-display: swap` nas 4 faces; preload de
  exatamente 2 arquivos acima da dobra (Lora normal + Plex Mono 400, com
  `crossorigin`) em `src/layouts/Base.astro`; fallbacks métricos
  `Lora Fallback` (Georgia, size-adjust 104.98%) e `IBM Plex Mono Fallback`
  (Courier New, size-adjust 99.98%) com ascent/descent/line-gap overrides
  calculados das métricas reais via capsize. Coberto pelos três testes de
  swap/preload/fallback.
- **RNF-E02** — Atendido — 4 arquivos woff2 somando 108.888 bytes (≈ 106 KB ≤
  160 KB), subset latino (cobre pt-BR). Coberto pelo teste de orçamento.

## Casos extremos cobertos

- **CE-E04** — Pilhas de fonte terminam em genérica (`serif` / `monospace`)
  com Georgia e ui-monospace/Menlo como degraus intermediários; com as fontes
  indisponíveis o texto renderiza no fallback métrico sem conteúdo invisível
  (`swap`). Coberto por "as pilhas terminam em família genérica".

## Perguntas em aberto / pendências

- Nenhuma. Os pacotes fontsource/capsize usados para extrair arquivos e
  métricas foram instalados com `--no-save` (não são dependências do projeto;
  os valores estão hard-coded no CSS com comentário de proveniência).
