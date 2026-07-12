# Build report — 2026-07-12 (INC-03)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-03 — Listagens de artigos + rascunhos
Rodada: construção
Testes: 77 passando / 77 total — `npm test`

## Requisitos atendidos
- **REQ-05** — Atendido — `/artigos/` (`src/pages/artigos/index.astro`) e `/artigos/<categoria>/` (`src/pages/artigos/[categoria].astro`) com o componente compartilhado `src/components/ListaArtigos.astro` exibindo título, descrição, data, categoria e tags; navegação entre categorias; estado vazio para categoria sem artigos. Coberto por `tests/artigos-listagem.test.ts` (existência das 4 páginas, conteúdo do item, filtro por categoria, tags na listagem, estado vazio).
- **REQ-07** — Atendido — `getStaticPaths` de `[slug].astro` filtra rascunhos em produção via `ehPublicado()`; listagens usam `prepararListagem()`. Rascunho real (`controle-patrimonial-na-pratica.md`) atua como fixture permanente: testes provam ausência de página própria e de menção em qualquer listagem no dist de produção. No dev o autor pré-visualiza rascunhos (spec só exige exclusão em produção).

## Regras de negócio
- **RN-02** — Atendido — `ordenarArtigos()` (data desc, empate por título com colação pt-BR, sem mutação); testes unitários com datas distintas, empate com acentos/maiúsculas e imutabilidade. Nota honesta: com apenas 1 artigo publicado, a ordenação ainda não é observável no dist — está garantida pela função pura usada pelas páginas e será exercitada naturalmente quando houver mais conteúdo (INC-10).
- **RN-05** — Atendido — mesma mecânica do REQ-07: rascunho fora de página própria e listagens; superfícies futuras (tags INC-06, busca INC-07) deverão reusar `ehPublicado`/`prepararListagem` — anotado para os próximos incrementos.

## Casos extremos cobertos
Nenhum CE do plano pertence ao INC-03. Guardas adicionais desta rodada: slug de artigo colidindo com slug de categoria derruba o build (proteção da coexistência REQ-05×REQ-06 nas rotas `/artigos/*`); categoria sem artigos mostra estado vazio sem vazar conteúdo de outras.

## Descoberta técnica da rodada
O Vitest injeta `PROD=""` (string vazia, falsy), `NODE_ENV=test`, `DEV=1`, `MODE=test` e `BASE_URL` no `process.env`; o build filho da suíte herdava essas variáveis e o Vite resolvia `import.meta.env.PROD=false`, vazando rascunhos só no dist da suíte (o build real estava correto). Corrigido em `tests/setup/build-site.ts` limpando `VARS_DO_VITEST` — o build da suíte agora espelha CI. Registrado na memória do projeto.

## Perguntas em aberto / pendências
- Nenhuma.
