# Build report — 2026-07-12 (INC-08)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-08 — Tema claro/escuro
Rodada: construção
Testes: 133 passando / 133 total — `npm test`

## Requisitos atendidos
- **REQ-14** — Atendido — lógica em `src/lib/tema.ts` (storage injetável, testada com happy-dom): padrão segue `prefers-color-scheme`; escolha explícita vence; botão no cabeçalho (`Base.astro`) alterna e persiste na chave `tema` do localStorage; script `is:inline` no `<head>` aplica o tema salvo antes da pintura (sem flash). Tokens escuros no CSS em dois caminhos: `@media (prefers-color-scheme: dark)` quando não há escolha, e `[data-tema=escuro]`/`[data-tema=claro]` para escolha explícita — inclusive `color-scheme`. Fecha também o botão de tema do texto do REQ-01 (nota vinculante do review do INC-01), presente em todas as páginas.
- **RNF-01** — Atendido — leitura e navegação 100% sem JS; os dois únicos usos de JS são a busca (INC-07, com noscript) e a alternância manual de tema; o botão nasce `hidden` e só é revelado pelo script — sem controle morto quando JS está desabilitado; sem JS o tema segue o sistema via media query pura (CSS).

## Casos extremos cobertos
- **CE-05** — testes com storage lançando exceção e storage nulo: `lerTemaSalvo`/`salvarTema` não lançam; `alternarTema` continua aplicando o tema no documento (vale para a página aberta). Valor corrompido no storage é ignorado.

## Observações
- happy-dom adicionado como devDependency para testar a lógica real de DOM do tema (não mocks).
- Asserções de integração calibradas para o build minificado (aspas removidas em seletores, template literals no JS, CSS em asset externo) — lidas do HTML e dos assets reais do dist.

## Perguntas em aberto / pendências
- Nenhuma.
