# Verify report — 2026-07-12 (INC-06)
Incremento: INC-06 — Tags | Build report: 2026-07-12 (INC-06)
Como rodei: `npm run build` + `npx astro preview --port 4399 --host 127.0.0.1`
Suíte de testes: 110 passando / 110 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-11 | `/tags/` com contagens | `HTTP 200`; `#astro (2)`, `#engenharia-de-software (2)`, `#meta (1)`, `#typescript (1)` — todas linkadas | FUNCIONA |
| REQ-11 | Tag compartilhada une artigo e projeto | `/tags/astro/` → seções `Artigos` e `Projetos` com `href` do artigo E do projeto | FUNCIONA |
| REQ-11 | Fluxo completo de clique | Página do artigo contém `href="/tags/meta/"` → `curl /tags/meta/` → `HTTP 200` | FUNCIONA |
| CE-03 | Tag exclusiva de rascunho em produção | `/tags/patrimonio/` → `HTTP 404`; 0 menções a `patrimonio` em `/tags/` | FUNCIONA |
| Regressão | Suíte completa (todas as superfícies anteriores) | 110/110 | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- Nada nesta rodada.

Ambiente limpo: preview derrubado, scratch removido.
