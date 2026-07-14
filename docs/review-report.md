# Review report — 2026-07-14 (INC-11)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada) | Incremento: INC-11 — Tipografia própria | Build report: 2026-07-14 (correção)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: **166/166**. Verify sem FALHAs em aberto (a FALHA de
CLS da primeira rodada foi corrigida e re-verificada com 12 execuções de
Lighthouse a 0,0000). Auditor conferiu independentemente: dist com as 7 faces
(4 web + 3 fallbacks métricos) e descritores corretos; `npm audit --omit=dev`
com 0 vulnerabilidades; `package.json` sem nenhuma dependência nova desde a
v1.0.0.

## Verificação requisito a requisito

| Item | Status | Evidência |
|------|--------|-----------|
| REQ-E01 | Atendido | 4 woff2 em `public/fontes/` (95.084 B), `@font-face` em `src/styles/global.css`; licenças OFL ao lado; teste varre dist inteiro por woff2 extras e por domínios de terceiros (`tests/tipografia.test.ts`) |
| REQ-E02 | Atendido | Tokens `--fonte-corpo/-titulo` → Lora e `--fonte-registro` → IBM Plex Mono (`global.css`); consumo verificado por teste de CSS + markup; famílias computadas confirmadas em navegador no verify (`getComputedStyle` + `document.fonts.check`, incluindo itálico e peso 650) |
| REQ-E03 | Atendido | `font-display: swap` nas 4 faces servidas (as faces de fallback usam só `local()`, sem fase de download — swap não se aplica a elas); preload exatamente das 3 faces acima da dobra; fallbacks com métricas calibradas empiricamente (roman 117,3%, itálico 113%, bold 106%); resultado no instrumento da spec: CLS 0,0000 em 12/12 execuções, Performance 100, Accessibility 100 nas 4 páginas |
| RNF-E02 | Atendido | 4 arquivos, 95.084 B ≤ 163.840 B; subset cobre pt-BR + travessões/aspas/setas usados no conteúdo (auditor conferiu a varredura de codepoints do dist) |
| CE-E04 | Atendido | Dirigido de verdade no verify (interceptação abortando `/fontes/*` → página íntegra no fallback); pilhas terminam em genérica, coberto por teste |

Violações de escopo: nenhuma. O ajuste de tracking dos títulos (-0.02em →
-0.01em) e o subsetting são partes legítimas do requisito tipográfico e do
orçamento; nenhum arquivo fora do tema foi tocado; nenhuma dependência entrou.

## Qualidade dos testes (TDD)

- Todos os 11 testes de `tipografia.test.ts` nasceram vermelhos nas rodadas
  respectivas (6 na construção, 2 na correção) — histórico nos commits.
- Inversão mental: cada mecanismo quebrável tem teste que ficaria vermelho
  (fonte extra no dist, orçamento estourado, terceiro injetado, token trocado,
  preload removido, face de fallback apagada, pilha sem genérica).
- **Observação (não vinculante, endereçada ao INC-15)**: os *valores* de
  size-adjust calibrados não estão pinados em teste — uma regressão neles
  passaria na suíte e só seria pega pela auditoria Lighthouse. O INC-15
  (RNF-E01) deve transformar a auditoria 100/100 + CLS = 0 em verificação
  executável do ciclo, fechando essa lacuna por definição.

## Segurança

- **Baixa** — Fontes subsetadas mantêm o nome interno "Lora", que é Reserved
  Font Name sob OFL; subsetting é tecnicamente uma modificação. É a mesma
  prática do ecossistema (os arquivos do fontsource já eram subsets com o
  mesmo nome) e o `font-family` do CSS não é afetado pela cláusula; licenças
  OFL acompanham os arquivos. Sem ação exigida; registrado por transparência.
- **Média (ferramentas de dev, não embarcadas)** — `npm audit` completo acusa
  17 moderadas, todas em dependências de desenvolvimento (cadeias de
  lighthouse/puppeteer/vitest); `--omit=dev` = 0. Nada disso é servido ao
  usuário. Recomendação de manutenção: atualizar as devDependencies quando o
  ciclo estético fechar.
- Entradas do usuário: inalteradas neste incremento (site estático; busca já
  auditada na v1). Sem segredos em código ou commits. Sem dados pessoais novos.

## Correções necessárias (para o /build)

Nenhuma. Próximo passo: `/ship` para fechar o INC-11 (release v1.1.0).
