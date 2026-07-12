# Review report — 2026-07-12 (INC-03)
Spec: docs/spec.md (Versão 1, aprovada) | Incremento: INC-03 — Listagens de artigos + rascunhos | Build report: 2026-07-12 (INC-03)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: 77/77. O item que o verify declarou "não observável" (RN-02 no HTML) foi **dirigido pelo auditor** com artigos temporários num build isolado — comprovado.

## Verificação requisito a requisito
| Item | Status | Evidência / Falha |
|------|--------|-------------------|
| REQ-05 | Atendido | `/artigos/` servida com item completo (título/descrição/data/categoria/tags linkadas) e navegação das 3 categorias; categoria com artigo o lista; categoria vazia mostra "Nenhum artigo nesta categoria ainda." sem vazar conteúdo (verify via curl no preview). |
| REQ-07 | Atendido | Rascunho real como fixture permanente: `HTTP 404` na rota própria, 0 menções em listagens (inclusive na categoria dele) no build de produção. |
| RN-02 | Atendido | **Dirigido pelo auditor**: 3 artigos temporários (um mais novo + dois empatados na mesma data) em build isolado → ordem real no HTML: `Construindo… (07-12) → Mais novo (07-01) → Água → Zebra` (empate por colação pt-BR). Unitários cobrem imutabilidade e limites. |
| RN-05 | Atendido | Mesma evidência do REQ-07; helpers `ehPublicado`/`prepararListagem` são a única via de listagem — INC-06/07 devem reusá-los (anotado no plano de cobertura). |
| Regressão INC-01/02 | Limpa | 77/77 inclui layout, docs, schema, páginas e builds inválidos. |

## Qualidade dos testes (TDD)
- Ciclo vermelho→verde documentado (12 falhas antes da implementação; 3 permaneceram por causa real — ver Descoberta).
- A investigação do vazamento de rascunhos foi exemplar: o bug estava no **harness** (Vitest injeta `PROD=""` falsy no process.env; o build filho herdava e virava não-produção). A correção em `tests/setup/build-site.ts` faz o build da suíte espelhar CI — sem ela, os testes de rascunho passariam por motivo errado no futuro ou falhariam para sempre.
- Fixture de rascunho permanente é bom desenho: todo build futuro re-prova REQ-07/RN-05.

## Segurança
- Nenhum achado. `npm audit` 0 vulnerabilidades; sem entradas de usuário; sem segredos.

## Observações não bloqueantes
- A guarda de slug reservado em `[slug].astro` usa `artigo.id in CATEGORIAS` — o operador `in` consulta a cadeia de protótipos, então um arquivo hipotético `constructor.md` causaria falso positivo. Trocar por `Object.hasOwn(CATEGORIAS, artigo.id)` na próxima rodada de build (é código extra-spec, não bloqueia).
- `--outDir` em `/tmp` cruza filesystems e falha no `rename` de assets do Astro (EXDEV) quando o build chega à fase final; os testes CE-01/CE-06 não são afetados (falham antes, e a asserção do nome do arquivo impede aprovação por falha de motivo errado). Auditorias futuras devem usar outDir dentro do projeto.

## Correções necessárias (para o /build)
Nenhuma. Próximo passo: `/ship`.
