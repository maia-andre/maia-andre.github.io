# Verify report — 2026-07-14 (INC-15)
Incremento: INC-15 — Auditoria final da direção estética | Build report: 2026-07-14 (INC-15)
Como rodei: `npm run auditoria` de ponta a ponta (build + preview :4390 + Lighthouse ×12 + 320px ×6); sabotagem controlada em `src/styles/global.css` (revertida com `git checkout`); medições manuais com puppeteer para isolar a causa
Suíte de testes: 198 passando / 198 total (`npm test`)

## Fluxos dirigidos

| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| RNF-E01 (caminho feliz) | `npm run auditoria` no site íntegro | "AUDITORIA APROVADA — 100/100, CLS 0 e 320px contidos"; medianas: perf 100 · a11y 100 · CLS 0,0000 nas 4 páginas; exit 0 | FUNCIONA |
| RNF-E01 (robustez) | Porta ocupada por preview órfão (aconteceu de verdade na construção) | script falha alto com "O preview não subiu em :4390 — porta ocupada?" em vez de medir servidor fantasma | FUNCIONA |
| RNF-E04 (o detector reprova quando deve?) | **Sabotagem controlada**: `main { min-width: 400px }` no CSS → `npm run auditoria` | **AUDITORIA APROVADA (exit 0) — falso aprovado.** Medição manual sob a mesma emulação: `docScrollW: 400, innerW: 400` — o `window.innerWidth` infla junto com o conteúdo na emulação mobile, e `scrollWidth > innerWidth` nunca dispara | **FALHA** |

## Falhas encontradas (para o /build)

1. **[RNF-E04]** O verificador de 320px da auditoria executável é um
   falso-aprovador: sob `page.setViewport({width: 320, isMobile: true})`, o
   layout viewport expande com o conteúdo (`innerWidth` vira 400 quando um
   elemento força 400px), então `scrollWidth > viewport(innerWidth)` é sempre
   falso. Comprovado por sabotagem: `main { min-width: 400px }` deveria
   reprovar as 6 páginas e a auditoria aprovou. Correção: comparar
   `document.documentElement.scrollWidth` contra a **largura configurada
   (320, constante)** — não contra `window.innerWidth` — em
   `tools/auditoria.mjs`; o núcleo (`avaliarAuditoria`) já reprova
   corretamente quando recebe números honestos (teste unitário com 348 > 320
   passa). Reproduzir: aplicar a sabotagem, `npm run auditoria`, esperar
   REPROVADA com 6 linhas RNF-E04; depois reverter e esperar APROVADA.

## Não verificável de ponta a ponta

- A conferência da definição de concluído da spec inteira fica para depois da
  correção — sem um detector honesto de RNF-E04, o item não pode ser marcado.
- Ambiente limpo: sabotagem revertida (`git status` limpo em src/), previews
  derrubados.
