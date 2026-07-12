# Verify report — 2026-07-12 (INC-07)
Incremento: INC-07 — Busca | Build report: 2026-07-12 (INC-07)
Como rodei: `npm run build` + `npx astro preview --port 4399`; lógica de busca dirigida com `node` importando `src/lib/busca.ts` contra o índice REAL servido
Suíte de testes: 122 passando / 122 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-13 | Índice JSON servido | `curl /busca-indice.json` → `HTTP 200`, JSON com artigo (categoria `computacao`) e projeto; campos exatos da spec | FUNCIONA |
| RN-05 | Rascunho fora do índice | 0 ocorrências de "Controle patrimonial" no JSON servido | FUNCIONA |
| REQ-13 | Busca real (mesma lib da página) sobre o índice servido | `buscar('astro')` → artigo E projeto; união entre coleções confirmada | FUNCIONA |
| CE-02 | Termo inexistente | `buscar('qwzxinexistente')` → 0 resultados (a página renderiza "Nenhum resultado" nesse caso, mesma condição `length === 0`) | FUNCIONA |
| CE-02 | Sem JavaScript | `/busca/` servida contém `<noscript>` com aviso e alternativas de navegação | FUNCIONA |
| REQ-13 | Página com campo rotulado e região viva | `<label for="campo-busca">`, `<input type="search" id="campo-busca"`, `aria-live="polite"` no HTML servido | FUNCIONA |
| Regressão | Suíte completa | 122/122 | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- **Interação digitar→ver resultados no navegador**: sem navegador headless na máquina. Mitigação: a função `criarBusca` importada pela página é exatamente a que foi dirigida acima com o índice real; o wiring do evento `input` e a renderização são código declarativo curto, revisáveis. Verificação visual plena fica para o INC-10 (auditoria com navegador).

Ambiente limpo: preview derrubado, scratch removido.
