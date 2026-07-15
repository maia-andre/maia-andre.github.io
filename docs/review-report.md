# Review report — 2026-07-14 (INC-14)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada) | Incremento: INC-14 — Linha do tempo + transições de página | Build report: 2026-07-14 (correção)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: **192/192**. Verify sem FALHAs (a regressão de CLS
na busca foi corrigida e re-medida: 0,0000 em 12/12). Auditoria extra: o
auditor dirigiu o **CE-E05 de verdade** — Chrome com `startViewTransition`
removido antes do load — e a navegação funcionou por inteiro com zero erros do
roteador (o único erro de console é o 404 pré-existente de favicon, sem
relação com a spec).

## Verificação requisito a requisito

| Item | Status | Evidência |
|------|--------|-----------|
| REQ-E09 | Atendido | Prop `linhaDoTempo` no `ListaArtigos.astro`, usada só em `/artigos/`; linha e marcadores por tokens (testes de CSS); ordem RN-02 e dados intocados — o teste v1 da listagem passou sem mudança de expectativa, que era o critério da spec |
| REQ-E10 | Atendido | `<ClientRouter />` no Base (meta em todas as páginas, teste); troca client-side comprovada (marcador em `window` sobrevive); navegação por `<a>` puro sem JS (teste + drive); tema e busca religados por `astro:page-load`/`after-swap` (drive real: alternar → navegar → persistir → alternar; buscar → sair → voltar → buscar) |
| RNF-E03 | Atendido | Bloco `reduce` anulando `::view-transition-*` (teste); navegação sob `prefers-reduced-motion: reduce` dirigida sem erro |
| CE-E05 | Atendido | Drive do auditor sem a API: navegação completa, 5 títulos renderizados, zero erros do roteador |
| Regressão | Limpa | CLS 0,0000 em 12/12 nas 4 páginas auditadas; suíte inteira verde incluindo v1 (tema, busca, RNF-01) e INC-11–13 |

Interpretação validada: REQ-E09 nomeia a listagem `/artigos/`; as páginas de
categoria mantêm a listagem simples — conforme a letra da spec e a entrega
verificável do plano. Estender às categorias, se desejado, é refinamento
editorial pós-spec.

Violação de escopo: nenhuma. A correção `.botao-tema[hidden]` é mínima e
amarrada à falha do verify; RNF-01 da v1 preservada (botão invisível e
não-interativo sem JS, agora com caixa reservada — drive confirmou 28×26px
invisível).

## Qualidade dos testes (TDD)

- 5 testes nasceram vermelhos na construção + 1 na correção (histórico nos
  commits); 3 guardas de comportamento existente documentados.
- Inversão mental: remover o `ClientRouter`, os hooks `astro:*`, a variante da
  listagem, o bloco reduce ou a reserva da caixa do botão deixa testes
  vermelhos.
- O comportamento dinâmico (religação pós-swap) é coberto por verificação
  objetiva de navegador no verify — o registro está no relatório com evidência
  literal.

## Segurança

- Nenhuma dependência nova (`package.json` idêntico ao da v1.3.0);
  `npm audit --omit=dev` = 0. O roteador não adiciona requisições externas
  nem prefetch. Sem novos vetores de entrada; busca continua com o mesmo
  escape de DOM da v1 (textContent, nunca innerHTML).

## Correções necessárias (para o /build)

Nenhuma. Próximo passo: `/ship` para fechar o INC-14 (release v1.4.0).
