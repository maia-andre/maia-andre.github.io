# Build report — 2026-07-14 (correção)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada)
Incremento: INC-11 — Tipografia própria: Lora + IBM Plex Mono self-hosted
Rodada: correção (verify de 2026-07-14 — FALHA no REQ-E03: CLS 0,1025 no artigo, 0,0325 na Home)
Testes: 166 passando / 166 total — `npm test`

## Requisitos atendidos

- **REQ-E01** — Atendido — inalterado da rodada anterior (4 woff2 em
  `public/fontes/`, licenças OFL, zero terceiros), agora com **subset pt-BR**
  (Latin-1 + travessões/aspas/reticências/setas presentes no conteúdo): soma
  caiu de 108.888 para **95.084 bytes**. Cobertura de teste inalterada.
- **REQ-E02** — Atendido — tokens e seletores inalterados; famílias computadas
  verificadas em navegador na rodada anterior do verify.
- **REQ-E03** — Atendido (era a FALHA) — causa-raiz dupla encontrada e
  corrigida: (1) `local('Georgia')`/`local('Courier New')` **não resolvem** no
  Linux da auditoria — `local()` não passa pela substituição do fontconfig —
  então os overrides métricos nunca se aplicavam; (2) o `size-adjust` de
  tabela (capsize × Georgia real) errava ~10% contra a face efetivamente
  usada. Correção: cadeias `local('Liberation Serif'), local('Times New
  Roman')` (métrica-compatíveis entre si — um único size-adjust vale para
  Linux e Windows/macOS) e **calibração empírica no Chrome da auditoria**
  medindo blocos reais das páginas: roman **117,3%**, itálico **113%** (face
  própria; o itálico da Lora é mais estreito) e **face bold nova a 106%**
  (`local('Liberation Serif Bold')`, peso 550–900 — a Lora 650 dos títulos é
  bem mais larga que bold sintetizado). Itálico da Lora entrou no preload
  (3 faces acima da dobra: aparece na apresentação da Home e no primeiro
  parágrafo de artigos). **Resultado no instrumento do contrato (Lighthouse
  mobile, mediana de 3 execuções): Performance 100, Accessibility 100 e CLS
  0 nas quatro páginas auditadas** (Home, artigo, projeto Matrix, busca).
- **RNF-E02** — Atendido — 4 arquivos, 95.084 bytes (≤ 160 KB), com margem
  maior após o subset.

## Casos extremos cobertos

- **CE-E04** — Inalterado e re-testado: pilhas terminam em genérica; teste novo
  garante 2+ candidatos `local()` por face de fallback e as faces
  itálica/bold próprias (`tests/tipografia.test.ts`).

## Perguntas em aberto / pendências

- Honestidade de medição: sob throttling *real* de 4G lento (rede e CPU de
  verdade, mais duro que o modo simulado do Lighthouse), o h1 longo do artigo
  ainda pode deslocar ~1 linha se a fonte perder a corrida do primeiro paint —
  títulos curtos e longos têm demandas de `size-adjust` conflitantes (residual
  de 34px no melhor compromisso). O instrumento definido pela spec (auditoria
  Lighthouse, RNF-E01) mede CLS = 0; registro o residual para o
  /review-and-security julgar com contexto completo.
- Ferramentas de calibração foram scripts descartáveis (removidos); os valores
  finais estão hard-coded no `global.css` com comentário de proveniência.
  Recalibrar exige repetir a medição empírica (documentado no comentário).
