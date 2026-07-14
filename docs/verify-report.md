# Verify report — 2026-07-14 (INC-12)
Incremento: INC-12 — Frame do Matrix como hero da página do projeto | Build report: 2026-07-14 (INC-12)
Como rodei: `npm run build` + `npm run preview -- --port 4337`; navegador real via puppeteer (script descartável, removido); build real spawnado para o CE-E01; Lighthouse mobile ×3 com Chrome for Testing headless
Suíte de testes: 175 passando / 175 total (`npm test`)

## Fluxos dirigidos

| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-E04 | GET em `/projetos/matrix/` e num segundo projeto | ordem no HTML: `artigo-cabecalho` → `figure class="frame-matrix"` → `pre aria-hidden` → `class="prosa"`; página do Conferidor COBOL → `grep -c frame-matrix` = 0 | FUNCIONA |
| REQ-E05 | Extração da legenda renderizada | `<figcaption class="registro">` → "seed 42 · tick 3000 · matrix@e8b93ac — f(seed): a mesma semente reproduz este mundo, sempre"; arte em `<pre aria-hidden="true">` | FUNCIONA |
| REQ-E06 | Chrome headless: `getComputedStyle` do frame, alternando `data-tema` | claro: cor `rgb(41,70,190)` (--carimbo) sobre `rgb(242,242,238)` (--superficie); escuro: `rgb(143,163,255)` sobre `rgb(31,33,39)` — valores exatos dos tokens dos dois temas | FUNCIONA |
| RN-E01/RN-E02 | Conferência da proveniência de ponta a ponta | 1ª linha do asset: `# seed=42 tick=3000 commit=e8b93ac`; legenda declara os três; o mostrador interno do frame (capturado do binário real) exibe `tick 3000` | FUNCIONA |
| CE-E01 | Build real com o asset renomeado para fora | `npx astro build` → exit 1, erro aponta `'../assets/matrix-frame.txt?raw'` (asset restaurado em seguida) | FUNCIONA |
| CE-E03 | Chrome a 320×700 na página do Matrix | `scrollWidth` da página = 320 = viewport (sem scroll horizontal); frame visível (altura > 50px), contido no contêiner, fonte auto-escalada a 5,85px | FUNCIONA |
| RNF (regressão) | Lighthouse mobile ×3 em `/projetos/matrix/` com o frame novo | perf 100, a11y 100, CLS 0,0000 nas 3 execuções | FUNCIONA |

## Falhas encontradas (para o /build)

Nenhuma.

## Não verificável de ponta a ponta

- Nada pendente. Observação de honestidade: a 320px a arte fica minúscula
  (5,85px) — legível só em zoom, mas é elemento decorativo (`aria-hidden`),
  permanece contida e o CE-E03 pede exatamente contenção sem scroll da página.
- Ambiente limpo: preview derrubado, script descartável removido, asset
  restaurado após o drive do CE-E01.
