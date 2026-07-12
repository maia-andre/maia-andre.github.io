# Review report — 2026-07-12 (INC-05)
Spec: docs/spec.md (Versão 1, aprovada) | Incremento: INC-05 — Home + Sobre | Build report: 2026-07-12 (INC-05)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: 102/102. Verify sem FALHAs. O CE-04, declarado "não observável" pelo verify, foi **dirigido pelo auditor** em build isolado.

## Verificação requisito a requisito
| Item | Status | Evidência / Falha |
|------|--------|-------------------|
| REQ-02 | Atendido | Home servida com h1, apresentação editável contendo a mensagem principal (2× na página: apresentação + rodapé-carimbo), seção de recentes com link do artigo e link "todos os artigos" (verify via curl). |
| REQ-10 | Atendido | Projeto `destaque: true` na Home com link; seleção filtra não destacados e corta em 4 (unitários). |
| REQ-12 | Atendido | `/sobre/` servida com h1, Markdown renderizado cobrindo quem sou / por que escrevo / por que desenvolvo / contato (link GitHub). Conteúdo em arquivo editável (`src/content/paginas/sobre.md`). |
| RN-04 | Atendido | Constantes 5/4; unitários nos valores-limite (6→5, 1→1, 0→0, 5 destacados→4, não destacado→fora). |
| CE-04 | Atendido | **Dirigido pelo auditor**: artigo único rascunhado + destaque removido temporariamente → build isolado → Home sem NENHUMA das duas seções (0 ocorrências dos títulos). Conteúdo restaurado (working tree limpo). |
| Extras (hardening INC-04) | Verificado | `urlHttp()` rejeita `javascript:`/`data:` com testes; regressão de URLs http(s) aceitas. |
| Regressão INC-01–04 | Limpa | 102/102; rotas anteriores 200/404 corretos no verify. `/tags/` e `/busca/` 404 são estado esperado (INC-06/07 pendentes). |

## Qualidade dos testes (TDD)
- Vermelho documentado (9 falhas antes da implementação).
- Teste da mensagem principal restrito ao `main` — evita falso verde pela ocorrência do rodapé. Bom cuidado.
- Rascunho re-verificado em nova superfície (Home) — RN-05 acompanha cada superfície nova, como o plano exige.
- Sem testes triviais; funções de seleção testadas nos limites exatos da RN-04.

## Segurança
- Nenhum achado. Hardening do review anterior aplicado e testado. `npm audit`: 0 vulnerabilidades. Conteúdo de `paginas` é autoral e renderizado via pipeline Markdown do Astro (escape padrão).

## Correções necessárias (para o /build)
Nenhuma. Próximo passo: `/ship`.
