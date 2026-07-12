# Build report — 2026-07-12 (INC-05)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-05 — Home + Sobre
Rodada: construção
Testes: 102 passando / 102 total — `npm test`

## Requisitos atendidos
- **REQ-02** — Atendido — Home (`src/pages/index.astro`) com apresentação editável (`src/content/paginas/apresentacao.md`, coleção `paginas` validada) contendo a mensagem principal, seção "Artigos recentes" (até 5, via `artigosRecentes()`) e "Projetos em destaque". Coberto por `tests/home-sobre.test.ts` (mensagem no `main`, links do artigo e da listagem completa, rascunho não vaza).
- **REQ-10** — Atendido — `projetosEmDestaque()` filtra `destaque: true`, ordena por nome e corta em 4; projeto semente aparece na Home com link. Coberto por unitários (limite, não destacados, vazio) + asserção no dist.
- **REQ-12** — Atendido — `/sobre/` (`src/pages/sobre.astro`) renderiza `src/content/paginas/sobre.md` cobrindo quem sou, por que escrevo, por que desenvolvo software e contato. Coberto por asserções de existência, h1 e conteúdo.

## Regras de negócio
- **RN-04** — Atendido — constantes `LIMITE_ARTIGOS_HOME=5` e `LIMITE_PROJETOS_HOME=4`; unitários nos valores-limite (6→5, 1→1, 0→0; 5 destacados→4; não destacado→fora).

## Casos extremos cobertos
- **CE-04** — seções da Home só renderizam com `length > 0` (condicional no template); caso "menos que o limite" e "zero" cobertos por unitários das funções de seleção. A omissão visual da seção vazia no dist não é observável com o conteúdo atual (sempre há ≥1 artigo e ≥1 destaque) — o auditor pode dirigir com build temporário se quiser evidência extra.

## Extras absorvidos (do review do INC-04)
- URLs de `repositorio` e `links[].url` restritas a `http(s)` via `urlHttp()`; testes rejeitam `javascript:` e `data:` e aceitam `http(s)`.

## Perguntas em aberto / pendências
- Foto na Home segue adiada por decisão registrada na spec (documento diz "opcional"; André decide com o conteúdo real).
- Os textos de `apresentacao.md` e `sobre.md` são conteúdo real mínimo escrito a partir do documento de visão — André deve revisá-los/personalizá-los (são arquivos Markdown editáveis, sem tocar em código).
