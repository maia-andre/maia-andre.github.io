# Verify report — 2026-07-12 (INC-04)
Incremento: INC-04 — Sistema de projetos | Build report: 2026-07-12 (INC-04)
Como rodei: `npm run build` + `npx astro preview --port 4399 --host 127.0.0.1`
Suíte de testes: 91 passando / 91 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-09 | Abrir `/projetos/` no preview real | `HTTP 200`; item `<h2 class="item-titulo"><a href="/projetos/site-pessoal/">Site pessoal — arquivo vivo</a></h2>` com as 4 tecnologias (`Astro`, `TypeScript`, `Markdown`, `Vitest`) | FUNCIONA |
| REQ-09 | Página individual `/projetos/site-pessoal/` | `HTTP 200`; `<h1>Site pessoal — arquivo vivo</h1>`; link do repositório presente; tags linkadas (`/tags/astro/`, `/tags/typescript/`, `/tags/engenharia-de-software/`) | FUNCIONA |
| REQ-08 | Validação do frontmatter | Suíte: schema campo a campo (obrigatórios ausentes, URLs inválidas, listas vazias) — 14 testes de projetos verdes | FUNCIONA |
| CE-07 | Projeto sem imagem/links extras servido | 0 `<img>` na página; exatamente 1 ocorrência de `links-projeto` (só o repositório) | FUNCIONA |
| CE-07 | Projeto só com obrigatórios (build real na suíte) | `tests/builds-reais.test.ts` → build exit 0, página com h1 e sem seções opcionais | FUNCIONA |
| Regressão | Home, listagens, artigo, 404 | `/` 200, `/artigos/` 200, artigo 200, rota inexistente 404 | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- Nada. (Imagem de capa só será exercitada visualmente quando algum projeto tiver `imagem` — o schema e o condicional estão testados.)

Ambiente limpo: preview derrubado, scratch removido.
