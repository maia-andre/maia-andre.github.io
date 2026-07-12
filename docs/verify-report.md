# Verify report — 2026-07-12 (INC-05)
Incremento: INC-05 — Home + Sobre | Build report: 2026-07-12 (INC-05)
Como rodei: `npm run build` + `npx astro preview --port 4399 --host 127.0.0.1`
Suíte de testes: 102 passando / 102 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-02 | Home no preview real | `HTTP 200`; `<h1>André Maia</h1>`; mensagem principal presente 2× (apresentação + rodapé); `<h2>Artigos recentes</h2>` e `<h2>Projetos em destaque</h2>` | FUNCIONA |
| REQ-02 | Artigo recente linkado + link "todos" | `href="/artigos/construindo-este-site/"` presente na Home | FUNCIONA |
| REQ-10 | Projeto em destaque linkado | `href="/projetos/site-pessoal/"` presente na Home | FUNCIONA |
| RN-05 (regressão) | Rascunho na Home | 0 menções a "Controle patrimonial" | FUNCIONA |
| REQ-12 | `/sobre/` no preview real | `HTTP 200`; `<h1>Sobre</h1>`; link de contato GitHub; seção de contato presente | FUNCIONA |
| RN-04 | Limites 5/4 e casos 1/0 | Unitários das funções de seleção (6→5, 1→1, 0→0; 5 destacados→4) — com 1 artigo e 1 destaque, o corte não é observável no dist | FUNCIONA (unitário) |
| Regressão | Listagens e projetos | `/artigos/` 200, `/projetos/` 200 (`/tags/` e `/busca/` 404 — **esperado**: INC-06/07 ainda pendentes) | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- **CE-04 (seção omitida com zero itens)**: sempre há ≥1 artigo e ≥1 destaque no conteúdo atual; o condicional `length > 0` está no template e as funções de seleção retornam lista vazia testada. Auditor pode dirigir com build temporário sem conteúdo se quiser evidência extra.

Ambiente limpo: preview derrubado, scratch removido.
