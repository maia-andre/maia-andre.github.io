# Build report — 2026-07-12 (INC-04)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-04 — Sistema de projetos
Rodada: construção
Testes: 91 passando / 91 total — `npm test`

## Requisitos atendidos
- **REQ-08** — Atendido — coleção `projetos` em `src/content.config.ts` com `esquemaProjeto` em `src/lib/conteudo.ts`: obrigatórios nome, descricao, tecnologias (≥1), tags (≥1, padrão RN-03 compartilhado); opcionais destaque (default false), repositorio (URL validada), links ({rotulo, url} validados), imagem. Corpo Markdown livre. Coberto por `tests/projetos.test.ts` (campo a campo, URLs inválidas, listas vazias, defaults).
- **REQ-09** — Atendido — `/projetos/` (`src/pages/projetos/index.astro`, ordem alfabética por nome) e `/projetos/<slug>/` (`[slug].astro`) com tecnologias, corpo renderizado, seção de links/repositório condicional e tags linkadas; seções de campos ausentes não renderizam. Coberto por asserções no dist + build real do CE-07.

## Casos extremos cobertos
- **CE-07** — dois níveis: (a) projeto semente tem repositório mas não imagem/links → página sem `<img>` e com exatamente 1 link na seção; (b) build real com projeto só de campos obrigatórios (`tests/builds-reais.test.ts`) → página renderiza com h1 e sem nenhuma seção opcional.

## Extras absorvidos (documentados)
- Correção não bloqueante do review do INC-03: `Object.hasOwn` na guarda de slugs reservados de artigos.
- Guarda de colisão de slugs (`criarGeradorDeIds`) instanciada também para a coleção de projetos — mesma integridade do CE-06, instância separada por coleção (artigo e projeto podem compartilhar slug, namespaces de URL distintos).
- Estabilidade da suíte: todos os testes que spawnam `astro build` real foram consolidados em `tests/builds-reais.test.ts` — em arquivos paralelos, o conteúdo temporário de um teste contaminava o build de outro (flake real observado nesta rodada).

## Perguntas em aberto / pendências
- As páginas dos 4 projetos reais (LicitaDocs, Matrix, Observatório de Oportunidades, Transporte SJC) dependem de material do André e entram no INC-10, conforme decisão da spec ("conteúdo real mínimo" escrito durante a construção). O sistema já as recebe sem mudança de código — basta criar os `.md`.
