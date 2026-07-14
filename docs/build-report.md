# Build report — 2026-07-14 (INC-12)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada)
Incremento: INC-12 — Frame do Matrix como hero da página do projeto
Rodada: construção
Testes: 175 passando / 175 total — `npm test`

## Requisitos atendidos

- **REQ-E04** — Atendido — frame ASCII real capturado do binário do Matrix
  (compilado de `main.c`, `./bin/matrix 42 3001 0`, último frame extraído do
  stdout e limpo de ANSI), commitado em `src/assets/matrix-frame.txt` (linha
  de metadados + título + grade de 68 colunas; as linhas de estatísticas do
  HUD ficaram de fora por estourarem o mobile — os números moram na legenda).
  Renderizado por `src/components/FrameMatrix.astro`, incluído em
  `[slug].astro` entre o `<header>` e a `.prosa`, somente para
  `projeto.id === 'matrix'`. O build importa o asset via `?raw` — nunca
  executa nem clona o Matrix. Coberto por `tests/frame-matrix.test.ts`
  (posição na página, moldura e blocos reais na arte, ausência nos outros 4
  projetos).
- **REQ-E05** — Atendido — `<figure class="frame-matrix">` com `<pre
  aria-hidden="true">` e `<figcaption class="registro">` declarando
  `seed 42 · tick 3000 · matrix@e8b93ac`. Coberto por testes de
  acessibilidade e proveniência.
- **REQ-E06** — Atendido — cores do frame exclusivamente por tokens de tema
  (`--carimbo`, `--superficie`, `--linha`, `--grafite`); teste garante
  `var(--` e a ausência de hex fixo nas regras `.frame-matrix`.
- **RN-E01** — Atendido — seed 42, tick 3000 (o mostrador interno do frame
  exibe `tick 3000`; captura com 3001 ticks porque o contador é 0-indexado).
  Troca do frame = novo asset com nova linha de metadados, nada automático.
- **RN-E02** — Atendido — legenda com seed, tick e commit curto; metadados
  vivem na 1ª linha do próprio asset, atomicamente com a arte.

## Casos extremos cobertos

- **CE-E01** — Dois testes de build real em `builds-reais.test.ts`: asset
  ausente (erro do Vite aponta o import) e asset vazio (o componente lança
  erro nomeando `src/assets/matrix-frame.txt` e citando a RN-E01). Correção
  de infraestrutura: os `outDir` dos builds spawnados agora ficam dentro do
  projeto — `outDir` em tmpfs quebrava com EXDEV antes de renderizar páginas,
  mascarando o erro sob teste.
- **CE-E03** — `font-size: min(0.8125rem, calc((100vw - 2*var(--espaco-pagina)
  - 2.5rem) / 41))` faz as 68 colunas caberem de 320px ao desktop;
  `overflow: hidden` garante que nada vaza. Coberto por teste de CSS; a
  direção em navegador a 320px fica para o /verify.

## Perguntas em aberto / pendências

- Nenhuma.
