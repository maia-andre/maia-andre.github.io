# Verify report — 2026-07-14 (INC-13)
Incremento: INC-13 — Cards de projetos + letra capitular nas reflexões | Build report: 2026-07-14 (INC-13)
Como rodei: `npm run build` + `npm run preview -- --port 4338`; navegador real via puppeteer (script descartável, removido); build real para o CE-E02; Lighthouse mobile ×3 por página
Suíte de testes: 183 passando / 183 total (`npm test`)

## Fluxos dirigidos

| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-E07 (dados) | GET nas duas listagens | `/projetos/` → 5 × `class="cartao-projeto"`; Home → 4; primeiro card com tecnologias (Python·Leaflet·OSRM·OpenStreetMap), nome e descrição | FUNCIONA |
| REQ-E07 (visual) | Chrome: `getComputedStyle` do card alternando `data-tema`; grade em 1024px e 320px | claro: borda `rgb(229,229,224)`/fundo `rgb(242,242,238)`; escuro: `rgb(42,44,51)`/`rgb(31,33,39)` — tokens exatos; 2 colunas no desktop, 1 coluna a 320px, sem scroll horizontal | FUNCIONA |
| REQ-E08 | Chrome: estilo computado do `::first-letter` na reflexão real | first-letter **52,7px** vs parágrafo 17px (3,1em), `float: left`, cor `rgb(41,70,190)` (--carimbo); artigo de computação: classe ausente e first-letter = 17px | FUNCIONA |
| RN-E03 | Integridade do texto servido | `<div class="prosa prosa-capitular"><p>Hoje descobri uma curiosidade sobre as cidades.` — texto íntegro, nenhum `<span>` dentro da prosa | FUNCIONA |
| CE-E02 | Build real com fixture de reflexões começando com travessão | página gerada → `class="prosa"` (sem `prosa-capitular`); build exit 0 | FUNCIONA |
| RNF (regressão) | Lighthouse mobile ×3 na Home, `/projetos/` e na reflexão | mediana: perf 100, a11y 100, CLS 0,0000 nas três páginas | FUNCIONA |

## Falhas encontradas (para o /build)

Nenhuma.

## Não verificável de ponta a ponta

- Nada pendente. Ambiente limpo: preview derrubado, scripts e fixture
  removidos, outDir temporário apagado.
