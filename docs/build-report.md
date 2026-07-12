# Build report — 2026-07-12 (INC-07)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-07 — Busca
Rodada: construção
Testes: 122 passando / 122 total — `npm test`

## Requisitos atendidos
- **REQ-13** — Atendido — índice em `src/pages/busca-indice.json.ts` (endpoint estático → `dist/busca-indice.json`) com exatamente os campos da spec (título, descrição, tags, categoria) + url, de artigos e projetos publicados; página `/busca/` (`src/pages/busca.astro`) com campo rotulado que consulta via Fuse.js no cliente. A lógica de busca vive em `src/lib/busca.ts` e é a MESMA importada pela página e pelos testes — comportamento unitariamente testado (por título, tag, categoria; termo vazio; termo inexistente). Resultados renderizados com DOM APIs (`textContent`), sem `innerHTML`, em região `aria-live`.
- Cobertura: `tests/busca.test.ts` — índice real do dist (campos, artigo com categoria, projeto com categoria null, rascunho ausente), comportamento do Fuse, página (input+label, noscript, aria-live).

## Casos extremos cobertos
- **CE-02** — termo inexistente → `[]` (unitário) e mensagem "Nenhum resultado" (código da página); `<noscript>` com aviso de JavaScript e alternativas de navegação (asserção no dist). Falha de rede do índice → mensagem de erro amigável (try/catch).

## Observações
- `fuse.js` entra como dependência bundlada pelo Vite — nenhum CDN externo (RNF-02 preservada).
- Busca em texto completo segue fora de escopo (decisão da spec: índice leve).
- RN-05 re-aplicada na nova superfície: rascunho fora do índice, testado.

## Perguntas em aberto / pendências
- Nenhuma.
