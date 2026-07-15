# Build report — 2026-07-14 (INC-15, correção)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada)
Incremento: INC-15 — Auditoria final da direção estética (v1.5.0)
Rodada: correção (verify de 2026-07-14 — falso-aprovado no detector de 320px)
Testes: 198 passando / 198 total — `npm test`

## Correção aplicada

- **[RNF-E04]** O detector de 320px comparava `scrollWidth` contra
  `window.innerWidth`, que infla junto com o conteúdo na emulação mobile —
  nunca reprovava. Agora compara contra a **constante 320** configurada.
  Aceitação dirigida nas duas direções: sabotagem `main { min-width: 400px }`
  → **REPROVADA** com as 6 páginas nomeadas e exit 1; reversão → **APROVADA**
  com exit 0.

## Requisitos atendidos

- **RNF-E01** — Atendido — auditoria virou comando executável do ciclo:
  `npm run auditoria` (`tools/auditoria.mjs`) constrói o site, serve o build
  (espera ativa, falha alto se a porta estiver ocupada, mata o grupo de
  processos ao final) e roda Lighthouse mobile **×3** em cada uma das 4
  páginas da spec, decidindo por **mediana**: Performance = 100,
  Accessibility = 100 e CLS = 0, com reprovação nomeando página e valor.
  Núcleo de decisão puro (`tools/auditoria-nucleo.mjs`) coberto por 6 testes
  unitários (medianas com outlier, reprovações por perf/a11y/CLS/320px).
  **Execução real desta rodada: APROVADA** — 100/100 e CLS 0,0000 nas 4
  páginas. Fecha a lacuna registrada no review do INC-11 (valores de
  size-adjust sem pino: agora qualquer regressão neles reprova a auditoria
  executável).
- **RNF-E04** — Atendido — o mesmo comando mede `scrollWidth × viewport` a
  320px em 6 páginas alteradas pela direção estética (Home, /artigos/,
  /projetos/, projeto Matrix, artigo com capitular, busca); vazamento
  horizontal reprova nomeando a página. Execução real: todas contidas.

## Casos extremos cobertos

- Porta ocupada / servidor que não sobe ⇒ o script falha alto com instrução
  (`fuser -k`), sem medir contra um servidor fantasma (foi bug real
  encontrado e corrigido durante a construção: preview órfão segurando a
  porta mascarava o erro).
- Outlier de medição ⇒ absorvido pela mediana (teste unitário com 97 entre
  dois 100).

## Perguntas em aberto / pendências

- Registro de processo: os ships v1.1.0–v1.4.0 não bumparam a versão do
  `package.json` (o rodapé exibe `v{pkg.version}`); corrigido em
  `chore(release)` para 1.4.0 nesta rodada — nada havia sido publicado com a
  versão defasada. O ship do INC-15 deve bumpar para **1.5.0**.
- A auditoria fica fora do `npm test` de propósito (12 execuções de
  Lighthouse ≈ minutos por rodada tornariam o TDD do ciclo inviável); ela é o
  portão de qualidade de verify/review/ship e está documentada no README.
