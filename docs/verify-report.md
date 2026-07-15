# Verify report — 2026-07-14 (INC-14)
Incremento: INC-14 — Linha do tempo em /artigos/ + transições de página | Build report: 2026-07-14 (INC-14)
Como rodei: `npm run build` + `npm run preview -- --port 4339`; puppeteer dirigindo navegação real (scripts descartáveis, removidos); Lighthouse mobile ×3 por página
Suíte de testes: 191 passando / 191 total (`npm test`)

## Fluxos dirigidos

| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-E10 (troca client-side) | Marcador em `window` na Home, clique para /artigos/ | `window.__marcador === 'vivo'` após a navegação — a página não recarregou, o roteador trocou o DOM | FUNCIONA |
| REQ-E10 + REQ-14 v1 (tema) | Alternar tema → navegar → conferir → alternar de novo | tema `escuro` + `aria-pressed="true"` após clique; **persistiu** após a troca de página; segundo clique voltou a `claro` — botão religado | FUNCIONA |
| REQ-E10 + REQ-13 v1 (busca) | /busca/ → buscar "matrix" → sair → voltar → buscar "silêncio" | 1 resultado na primeira visita; 1 resultado após sair e voltar — campo religado por troca | FUNCIONA |
| REQ-E09 | Estilos computados em /artigos/ | linha `::before` de 2px, marcadores `border-radius: 50%`, 5 itens; sem JS a listagem inteira renderiza com a variante presente | FUNCIONA |
| RNF-E03 | `prefers-reduced-motion: reduce` emulado, navegação para /sobre/ | chegou em "Sobre" sem erro; bloco CSS `reduce` anulando `::view-transition-*` presente no dist | FUNCIONA |
| CE-E05 / RNF-01 v1 | Console monitorado na sessão inteira; página com JS desabilitado | nenhum erro causado pelo roteador; sem JS, /artigos/ renderiza 5 títulos e navegação por `<a>` funciona. (Único erro de console: 404 de `/favicon.ico` — pré-existente desde a v1, fora do escopo; ver observações) | FUNCIONA |
| RNF-E01 (regressão) | Lighthouse mobile ×3 em Home, /artigos/ e /busca/ | Home e /artigos/: perf 100, a11y 100, **CLS 0,0000**; **/busca/: CLS 0,0247** (perf 100, a11y 100) | **FALHA** — regressão de CLS na busca |

## Falhas encontradas (para o /build)

1. **[REQ-E10 → regressão de RNF-E01/REQ-E03]** CLS 0,0247 em `/busca/`
   (mediana de 3; era 0,0000 antes do INC-14). Causa rastreada com
   PerformanceObserver: o shift é do `main.pagina` — o botão de tema
   (`hidden`) agora só é revelado no `astro:page-load`, que dispara **após** o
   primeiro paint; quando aparece, o cabeçalho cresce e empurra o `main`.
   Reproduzir: `npx lighthouse http://localhost:4339/busca/` (mobile).
   Pista de correção: reservar o espaço do botão via CSS
   (`.botao-tema[hidden] { display: inline-block; visibility: hidden; }`) —
   o unhide deixa de deslocar layout em qualquer timing, o botão continua
   invisível e não-interativo sem JS (RNF-01), e o religamento por
   `astro:page-load` permanece.

## Não verificável de ponta a ponta

- 404 de `/favicon.ico` no console: pré-existente (o site nunca teve favicon,
  inclusive na v1.0.0 publicada) e sem relação com o roteador. Fora do escopo
  desta spec; fica registrado como possível melhoria editorial futura.
- Ambiente limpo: previews derrubados, scripts descartáveis removidos.
