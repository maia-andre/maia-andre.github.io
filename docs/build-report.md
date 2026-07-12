# Build report — 2026-07-12 (INC-09)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-09 — Deploy automático no GitHub Pages
Rodada: construção
Testes: 140 passando / 140 total — `npm test`

## Requisitos atendidos
- **REQ-15** — Atendido — `.github/workflows/deploy.yml`: push na `main` → job `build` (checkout, Node 24 com cache, `npm ci`, **`npm test` como portão**, `npm run build`, artefato do Pages a partir de `dist/`) → job `deploy` (`actions/deploy-pages@v4`, environment `github-pages`). Permissões mínimas (`contents: read`, `pages: write`, `id-token: write`) e `concurrency` para não sobrepor deploys. GitHub Pages do repositório trocado de `legacy` (Jekyll, que errava no fonte Astro) para `build_type=workflow` via API. Coberto por `tests/deploy.test.ts` (YAML parseado de verdade: gatilho, permissões, ordem dos passos, artefato, deploy action).
- O push real e a publicação em `https://maia-andre.github.io` serão dirigidos no `/verify` (o commit do workflow ainda não foi empurrado — o verify observa o primeiro run de ponta a ponta).

## Casos extremos cobertos
- **CE-08** — dupla estrutura testada: (a) `npm test` vem ANTES de `npm run build` no job (asserção de ordem), então conteúdo/código quebrado falha o job; (b) `deploy` tem `needs: build` (asserção) — sem build verde não há publicação, e o Pages mantém a última versão no ar. A falha real será dirigida no verify com um run de branch quebrado via `workflow_dispatch`.

## Observações
- devDependency `yaml` para parsear o workflow nos testes (asserções estruturais, não grep frágil).
- CI usa `npm ci` + Node 24 (mesma major da máquina local).

## Perguntas em aberto / pendências
- Nenhuma.
