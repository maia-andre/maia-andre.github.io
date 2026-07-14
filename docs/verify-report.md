# Verify report — 2026-07-14 (re-verificação pós-correção)
Incremento: INC-11 — Tipografia própria: Lora + IBM Plex Mono self-hosted | Build report: 2026-07-14 (correção)
Como rodei: `npm run build` + `npm run preview -- --port 4336`; navegador real via puppeteer (script descartável, removido); Lighthouse mobile ×3 por página com Chrome for Testing headless (`CHROME_PATH` do cache do puppeteer)
Suíte de testes: 166 passando / 166 total (`npm test`)

## Fluxos dirigidos

| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-E01 | GET dos 4 woff2 subsetados | `curl -w "%{http_code} %{size_download}B"` → 200 nos 4: 33.104 + 35.996 + 12.516 + 13.468 = 95.084 B | FUNCIONA |
| REQ-E02 | `getComputedStyle` + `document.fonts.check` em página real de artigo, incluindo as variantes | body/h1 → `Lora`; nav/meta → `IBM Plex Mono`; check: `lora: true, loraItalico: true, lora650: true, plex: true` | FUNCIONA |
| REQ-E03 (swap/preload) | Inspeção do HTML/CSS servidos | 3 preloads `as="font"` (lora-var, lora-var-italico, plex-mono-400); `font-display:swap` ×4; 3 faces `Lora Fallback` (normal/itálica/bold) + 1 `IBM Plex Mono Fallback` | FUNCIONA |
| REQ-E03 (CLS = 0) | Lighthouse mobile, 3 execuções em cada uma das 4 páginas auditadas | **CLS 0,0000 nas 12 execuções**; Performance 100 e Accessibility 100 em todas (Home, artigo, projeto Matrix, busca) | FUNCIONA |
| RNF-E02 | Soma dos woff2 servidos | 95.084 B ≈ 93 KB ≤ 160 KB, 4 arquivos | FUNCIONA |
| CE-E04 | Chrome com `/fontes/*` abortado por interceptação | `lora: false`, `caracteresVisiveis: 2865`, h2 renderizado a 28,8px — página íntegra no fallback | FUNCIONA |

## Falhas encontradas (para o /build)

Nenhuma. A FALHA da rodada anterior (REQ-E03, CLS 0,1025 no artigo) está
corrigida no instrumento definido pela spec.

## Não verificável de ponta a ponta

- Sob throttling **real** de rede/CPU (mais duro que o modo simulado do
  Lighthouse), o build-report registra residual possível de ~1 linha no h1
  longo do artigo se a fonte perder a corrida do primeiro paint. Não é
  mensurável pelo instrumento do contrato (RNF-E01 = Lighthouse), que mede 0;
  fica registrado como observação honesta para o review.
- Ambiente limpo: preview derrubado, script descartável removido.
