# Verify report — 2026-07-14
Incremento: INC-11 — Tipografia própria: Lora + IBM Plex Mono self-hosted | Build report: 2026-07-14
Como rodei: `npm run build` + `npm run preview -- --port 4333`; navegador real via puppeteer (script descartável, removido); Lighthouse mobile com Chrome for Testing headless (`CHROME_PATH=~/.cache/puppeteer/chrome/linux-150.0.7871.24/chrome-linux64/chrome`)
Suíte de testes: 165 passando / 165 total (`npm test`)

## Fluxos dirigidos

| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-E01 | GET de cada um dos 4 woff2 servidos pelo preview | `curl -sI /fontes/lora-var.woff2` (e demais) → `HTTP/1.1 200 OK` nos 4 | FUNCIONA |
| REQ-E01 | Procura por serviços de fonte de terceiros no HTML e CSS servidos | `curl / e /_astro/Base.CpKaQQJ_.css \| grep -ciE "googleapis\|gstatic\|typekit"` → `0 referências` | FUNCIONA |
| REQ-E02 | Página real de artigo aberta em Chrome headless; `getComputedStyle` de body, h1, navegação, meta e tags; `document.fonts.check` | body/h1 → `Lora, "Lora Fallback", Georgia, serif`; navegação/meta/tags → `"IBM Plex Mono", …, monospace`; `loraCarregada: true`, `plexCarregada: true` | FUNCIONA |
| REQ-E03 (swap/preload) | Inspeção do CSS e do HTML servidos | `grep -o "font-display:swap" \| wc -l` → `4`; Home tem exatamente 2 `<link rel="preload" as="font" … crossorigin>` (lora-var + plex-mono-400) | FUNCIONA |
| REQ-E03 (CLS = 0) | Lighthouse mobile na Home e no artigo | Home: perf 100, a11y 100, **CLS 0,0325**; artigo: **perf 97**, a11y 100, **CLS 0,1025**; audit `layout-shifts`: maior shift (0,070) é um `<p>` com causa **"Web font loaded"** | **FALHA** — spec exige troca sem deslocamento perceptível (CLS = 0) |
| RNF-E02 | Contagem e soma dos woff2 no dist servido | `du -cb public/fontes/*.woff2` → `108888 total` (≈106 KB ≤ 160 KB), 4 arquivos | FUNCIONA |
| CE-E04 | Chrome com interceptação abortando `/fontes/*`; página carregada sem nenhuma fonte própria | `loraCarregada: false`, `caracteresVisiveis: 2865`, `alturaH1: 43.2px` — texto integral legível na pilha de fallback | FUNCIONA |

## Falhas encontradas (para o /build)

1. **[REQ-E03]** CLS diferente de zero causado pela chegada da webfont: artigo
   `a-regua-que-desbota` com CLS **0,1025** (shift de 0,070 num `<p>` com causa
   "Web font loaded" + 0,0325 no `<main>`) e Home com CLS **0,0325** — a spec
   pede "troca sem deslocamento de layout perceptível (CLS = 0 nas auditorias)",
   e o Performance do artigo caiu para **97** (a v1.0.0 tinha 100, e a RNF-E01
   exigirá 100). Reproduzir: `npm run build && npm run preview -- --port 4333`,
   depois `CHROME_PATH=<chrome do puppeteer> npx lighthouse
   http://localhost:4333/artigos/a-regua-que-desbota/
   --only-categories=performance,accessibility --chrome-flags="--headless=new"`.
   Pistas colhidas (não implementadas, papel do /build): o itálico da Lora
   aparece acima da dobra na Home (parágrafo de apresentação) e não é
   pré-carregado; o match métrico médio do `size-adjust` não segura cada quebra
   de linha — o par swap+fallback precisa ficar mais justo (ou o preload mais
   completo) até o CLS zerar nas duas páginas.

## Não verificável de ponta a ponta

- Nada. Todos os itens do incremento foram dirigidos em navegador ou HTTP reais.
- Ambiente: servidor de preview derrubado ao final; script puppeteer descartável
  removido; JSONs do Lighthouse ficaram no scratchpad da sessão (fora do repo).
