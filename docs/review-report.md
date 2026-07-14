# Review report — 2026-07-14 (INC-12)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada) | Incremento: INC-12 — Frame do Matrix | Build report: 2026-07-14 (INC-12)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: **175/175**. Verify sem FALHAs. Auditoria extra de
proveniência: o auditor recompilou/rodou o Matrix em `e8b93ac` com seed 42 até
o tick 3000 e comparou com o asset commitado — **frame idêntico linha a
linha**; a promessa da legenda ("f(seed): a mesma semente reproduz este
mundo") é literalmente verdadeira.

## Verificação requisito a requisito

| Item | Status | Evidência |
|------|--------|-----------|
| REQ-E04 | Atendido | `src/assets/matrix-frame.txt` + `src/components/FrameMatrix.astro`, incluído em `[slug].astro` só para `projeto.id === 'matrix'`, entre header e prosa; build importa via `?raw`, nunca executa o Matrix; testes de posição/conteúdo/ausência nos outros projetos (`tests/frame-matrix.test.ts`) |
| REQ-E05 | Atendido | `<pre aria-hidden="true">` + `<figcaption class="registro">`; legenda acessível; a11y do Lighthouse seguiu 100 na página com o frame |
| REQ-E06 | Atendido | Cores só por tokens (`--carimbo`/`--superficie`/`--linha`/`--grafite`); verify mediu os valores exatos dos dois temas alternando `data-tema`; teste proíbe hex nas regras `.frame-matrix` |
| RN-E01 | Atendido | seed 42, tick 3000 (mostrador interno do frame confirma); metadados na 1ª linha do asset — trocar o frame exige novo asset+legenda, nada automático |
| RN-E02 | Atendido | Legenda declara seed/tick/commit; reprodutibilidade auditada por recaptura determinística idêntica |
| CE-E01 | Atendido | Dois builds reais no `builds-reais.test.ts` (ausente/vazio → exit ≠ 0 apontando `matrix-frame`); verify dirigiu o caso ausente manualmente |
| CE-E03 | Atendido | Fonte escala com a página (`min(0.8125rem, calc(...))`), `overflow: hidden`; verify a 320px: `scrollWidth` = 320, frame contido e visível |

Violações de escopo: nenhuma. A mudança nos `outDir` dos builds spawnados
(tmpfs → dentro do projeto) é correção de infraestrutura de teste necessária ao
CE-E01 — o EXDEV do tmpfs mascarava o erro sob teste e foi documentada no
build-report.

## Qualidade dos testes (TDD)

- 7 testes novos nasceram vermelhos (histórico nos commits); a única exceção
  ("nenhum outro projeto ganha o frame") é um guarda negativo, vermelho por
  construção impossível — aceitável.
- Inversão mental: remover a figura, o `aria-hidden`, o commit da legenda, as
  variáveis de tema, o `min()` da fonte ou tornar o asset opcional deixa ao
  menos um teste vermelho em cada caso.
- Observação menor (não bloqueante): o teste de tema cobre `color`/`background`
  das regras `.frame-matrix`; a `border` poderia teoricamente regredir para hex
  sem teste vermelho — o padrão da casa (tokens) e o review cobrem isso hoje.

## Segurança

- A arte é texto estático do próprio repositório, interpolada como texto pelo
  Astro (escapada) — sem vetor de XSS. Nenhuma dependência nova (`package.json`
  intacto; `npm audit --omit=dev` = 0). Sem segredos, sem dados pessoais.
- Observação de ambiente (fora deste repo): a auditoria compilou `bin/matrix`
  no repositório do Matrix (artefato untracked lá); sem efeito no site.

## Correções necessárias (para o /build)

Nenhuma. Próximo passo: `/ship` para fechar o INC-12 (release v1.2.0).
