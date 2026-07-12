# Build report — 2026-07-12 (INC-06)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-06 — Tags
Rodada: construção
Testes: 110 passando / 110 total — `npm test`

## Requisitos atendidos
- **REQ-11** — Atendido — `colecionarTags()` em `src/lib/conteudo.ts` une tags de artigos e projetos publicados (ordem alfabética pt-BR); `/tags/` (`src/pages/tags/index.astro`) lista cada tag com contagem total (artigos + projetos); `/tags/<tag>/` (`[tag].astro`) lista artigos (ordenados por RN-02) e projetos (por nome) da tag, em seções separadas omitidas quando vazias. Tags exibidas em artigos, projetos e listagens já eram links desde os INC-02/04. Coberto por `tests/tags.test.ts`: unitários da união/contagem/ordem + asserções no dist (tag compartilhada `astro` lista artigo E projeto; `typescript` só projeto).

## Casos extremos cobertos
- **CE-03** — três níveis: unitário (`exclusiva-de-rascunho` fora do mapa em produção, dentro no dev); dist sem `tags/patrimonio/index.html` (tag existe apenas no rascunho real de controle patrimonial); `/tags/` sem menção a `patrimonio`.

## Observações
- Só existem páginas para tags efetivamente usadas por conteúdo publicado — o `getStaticPaths` deriva do mesmo mapa da listagem, então não há como divergirem.
- Rascunhos seguem visíveis no `astro dev` (decisão registrada no INC-03), inclusive nas tags.

## Perguntas em aberto / pendências
- Nenhuma.
