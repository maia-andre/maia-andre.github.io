# Verify report — 2026-07-14 (INC-14, re-verificação pós-correção)
Incremento: INC-14 — Linha do tempo em /artigos/ + transições de página | Build report: 2026-07-14 (INC-14, correção)
Como rodei: `npm run build` + `npm run preview -- --port 4342`; puppeteer dirigindo navegação real; Lighthouse mobile ×3 por página
Suíte de testes: 192 passando / 192 total (`npm test`)

## Fluxos dirigidos

| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| RNF-E01 (o item que falhou) | Lighthouse mobile ×3 nas 4 páginas auditadas | **CLS 0,0000 em 12/12 execuções**; perf 100 e a11y 100 em todas (Home, /artigos/, /busca/, /projetos/matrix/) | FUNCIONA |
| Correção da caixa do botão | Chrome sem JS: geometria do botão `[hidden]` | caixa reservada de 28×26px com `visibility: hidden` — invisível, não-interativo, sem deslocar o cabeçalho em nenhum timing | FUNCIONA |
| REQ-E10 (regressão pós-fix) | Sessão única: marcador em window → alternar tema → navegar à busca → buscar | `swap: true` (sem reload), tema `escuro` persistiu, 1 resultado para "jardineiro", `aria-pressed: true` no botão religado; **0 erros de página** | FUNCIONA |

## Falhas encontradas (para o /build)

Nenhuma. A FALHA da rodada anterior (CLS 0,0247 na busca) está corrigida.

## Não verificável de ponta a ponta

- Observação mantida da rodada anterior: 404 de `/favicon.ico` é pré-existente
  à spec estética e fora de escopo (melhoria editorial futura).
- Ambiente limpo: preview derrubado, sem scripts residuais.
