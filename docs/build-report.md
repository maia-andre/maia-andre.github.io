# Build report — 2026-07-12
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-01 — Esqueleto executável: Astro + layout base + repositório como projeto
Rodada: construção
Testes: 18 passando / 18 total — `npm test` (Vitest constrói o site real e valida o dist/)

## Requisitos atendidos
- **REQ-01** — Atendido — layout base em `src/layouts/Base.astro` (cabeçalho com navegação Início/Artigos/Projetos/Tags/Sobre/Busca, rodapé-carimbo, skip-link) aplicado a `index.astro` e `404.astro`; coberto por `tests/layout.test.ts`. **Nota de escopo**: o botão de tema citado no texto do REQ-01 será entregue junto com seu comportamento (REQ-14/CE-05) no INC-08, conforme a cobertura do plano — um botão inerte no ar seria pior que a ausência dele.
- **REQ-16** — Atendido — `README.md` (o que é, stack, como rodar/testar), `ROADMAP.md` (tudo do "Fora de escopo" da spec) e `CHANGELOG.md` (Keep a Changelog, com seção Unreleased do INC-01); coberto por `tests/repo-docs.test.ts`.
- **RNF-04** — Atendido — `lang="pt-BR"` no layout base, interface toda em português; coberto por `tests/layout.test.ts`.
- **RNF-05** — Atendido — meta viewport, container fluido `min(100% - margens, 44rem)`, navegação com flex-wrap (sem quebra em 320px), tipografia com clamp(); meta viewport coberta por teste, comportamento visual a confirmar no `/verify`.
- **RN-06** — Atendido — `package.json` em `0.1.0`, CHANGELOG documenta a convenção `v0.x.0 → v1.0.0`, rodapé exibe a versão real lida do `package.json`; coberto por `tests/repo-docs.test.ts`.

## Casos extremos cobertos
Nenhum CE pertence ao escopo do INC-01 (cobertura do plano: CE-01/06 → INC-02, CE-02 → INC-07, CE-03 → INC-06, CE-04 → INC-05, CE-05 → INC-08, CE-07 → INC-04, CE-08 → INC-09).

## Decisões técnicas da rodada
- Node.js LTS v24.18.0 instalado via nvm (não havia Node na máquina); symlinks em `~/.local/bin`.
- Astro v7.0.7, Vitest v4: a suíte roda `astro build` uma vez (globalSetup) e os testes fazem asserções sobre o HTML real de `dist/` — testes de ponta a ponta, não de mock.
- Identidade visual "ficha de registro" com tokens em custom properties (`--papel`, `--tinta`, `--carimbo`...) para o INC-08 trocar só os valores.
- Commits granulares por tema na convenção: chore (scaffold) → test → feat(layout) → docs(repo).

## Perguntas em aberto / pendências
- Nenhuma. A decisão sobre o botão de tema (acima) segue a divisão de incrementos do plano aprovado.
