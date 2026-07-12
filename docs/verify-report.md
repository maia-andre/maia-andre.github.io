# Verify report — 2026-07-12 (INC-09)
Incremento: INC-09 — Deploy automático no GitHub Pages | Build report: 2026-07-12 (INC-09)
Como rodei: push real na `main` + `gh run watch`; CE-08 dirigido com branch descartável `teste-ce08` (conteúdo quebrado) via `workflow_dispatch`
Suíte de testes: 140 passando / 140 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-15 | Push na main → workflow → publicação | Run 29211480693: `✓ Testes`, `✓ Build`, `✓ Artefato do Pages`, `✓ deploy — Publicar` | FUNCIONA |
| REQ-15 | Site EM PRODUÇÃO | `https://maia-andre.github.io/` → HTTP 200, `<title>André Maia</title>`; artigo, projeto, busca, tag e sobre → todos 200 | FUNCIONA |
| REQ-15 | 404 customizada em produção | `/rota-inexistente/` → 404 (GitHub Pages usa o `404.html` gerado) | FUNCIONA |
| RN-05 (produção) | Rascunho invisível em produção real | `/artigos/controle-patrimonial-na-pratica/` → 404 | FUNCIONA |
| CE-08 | Branch com artigo inválido → run disparado | Run 29211526252: `conclusion: failure`; job `build` falhou no passo "Testes (portão de qualidade)" com `InvalidContentEntryDataError … quebra-ce08.md`; job `deploy`: **skipped** | FUNCIONA |
| CE-08 | Site preserva a última versão após build quebrado | Produção continua 200; página da quebra → 404 | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- Nada — este incremento foi 100% dirigido em produção real.

Ambiente limpo: branch `teste-ce08` deletada (local e remoto), working tree de volta à main.
