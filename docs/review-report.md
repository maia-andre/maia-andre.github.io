# Review report — 2026-07-12 (INC-02, 2ª auditoria)
Spec: docs/spec.md (Versão 1, aprovada) | Incremento: INC-02 — Coleção de artigos validada + página do artigo | Build report: 2026-07-12 (INC-02, rodada 2)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: 64/64. As 3 correções do review anterior foram verificadas no código e dirigidas de verdade.

## Verificação requisito a requisito
| Item | Status | Evidência / Falha |
|------|--------|-------------------|
| REQ-03 | Atendido | Inalterado desde a 1ª auditoria (schema campo a campo testado); regressão limpa. |
| REQ-04 | Atendido | Inalterado; dirigido na 1ª rodada com categoria inválida → exit 1. |
| REQ-06 | Atendido | Regressão dirigida: build válido pós-correção gera `3 page(s)` com slug `construindo-este-site` inalterado; suíte da página verde. |
| RN-01 | Atendido | Inalterado. |
| RN-03 | Atendido | Inalterado. |
| CE-01 | Atendido | Teste de integração continua verde (build real, exit ≠ 0, arquivo nomeado). |
| CE-06 | **Atendido** | Correção 1 verificada: `criarGeradorDeIds()` (`src/lib/conteudo.ts`) plugado como `generateId` do `glob()` (`src/content.config.ts`) — detecção ANTES da deduplicação do loader. Dirigido pelo auditor/verify: cenário exato da reprovação agora dá `exit: 1` com `Slug duplicado "ce01-colisao-ce06": os arquivos "__ce01__colisao ce06.md" e "__ce01__colisao-ce06.md" geram o mesmo endereço.` Correção 2 verificada: teste de integração com build real e asserção dos dois nomes. Correção 3 verificada: guarda morta removida da página e da lib. |
| Regressão INC-01 | Limpa | Suíte de layout/docs verde na rodada do auditor. |

## Qualidade dos testes (TDD)
- O teste que na 1ª auditoria "testava o mock" foi substituído por: (a) unitários do gerador real (slugificação com acentos, idempotência para recarga, colisão com os dois nomes, não-colisão) e (b) integração que reproduz a reprovação no build real. Ciclo vermelho→verde documentado (5 falhas antes da correção).
- Cobertura do incremento íntegra e sem testes triviais.

## Segurança
- Nenhum achado. `npm audit`: 0 vulnerabilidades. A perda silenciosa de conteúdo apontada na 1ª auditoria está eliminada.

## Observações não bloqueantes (fora do escopo da spec)
- Renomear um arquivo em sessão de dev longa pode acusar colisão falsa com o "fantasma" do nome antigo (estado do closure) — resolve com restart do dev server; o build de produção (processo novo) não é afetado.
- Arquivo com nome patológico (ex.: `---.md`) slugificaria para string vazia; nenhum item da spec cobre isso. Sugestão de guarda `min-length` num incremento futuro, se incomodar.

## Correções necessárias (para o /build)
Nenhuma. Próximo passo: `/ship`.
