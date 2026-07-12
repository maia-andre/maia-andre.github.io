# Verify report — 2026-07-12 (INC-10)
Incremento: INC-10 — Conteúdo real + qualidade final (v1.0.0) | Build report: 2026-07-12 (INC-10)
Como rodei: `npm run build` + `npx astro preview --port 4399`; Lighthouse com Chrome for Testing headless (`CHROME_PATH` do cache do puppeteer), perfil mobile
Suíte de testes: 150 passando / 150 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| RNF-02 | Lighthouse Performance (mobile) em 3 páginas | home **100**, artigo novo **100**, página do Matrix **100** (meta ≥95) | FUNCIONA |
| RNF-03 | Lighthouse Accessibility (mobile) em 3 páginas | home **100**, artigo **100**, projeto **100** (meta ≥95) | FUNCIONA |
| RNF-03 | `aria-pressed` servido | asset JS da página contém a atualização de `aria-pressed` (1 ocorrência no bundle) | FUNCIONA |
| Def. concluído | 2 artigos reais publicados | `/artigos/` lista exatamente 2: "A régua que desbota…" e "Construindo este site…"; artigo novo `HTTP 200` | FUNCIONA |
| RN-02 (agora observável) | Ordem no HTML servido | Mesma data (2026-07-12) → desempate alfabético pt-BR: "A régua…" antes de "Construindo…" | FUNCIONA |
| Def. concluído | 4 projetos reais | `/projetos/matrix/`, `/centro-logistico-municipal/`, `/conferidor-de-encargos-cobol/`, `/observatorio-de-oportunidades/` → todos `200` | FUNCIONA |
| REQ-10 | Destaques da Home | exatamente os 4 projetos reais linkados (site-pessoal fora) | FUNCIONA |
| REQ-13 (regressão) | Busca com o conteúdo novo | índice servido contém `/artigos/a-regua-que-desbota/` e `/projetos/matrix/` | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- A produção em `maia-andre.github.io` só recebe o conteúdo novo após o push (que acontece no `/ship`); o pipeline de deploy foi integralmente verificado no INC-09 e o portão de testes roda no CI.

Ambiente limpo: preview derrubado, relatórios Lighthouse de scratch removidos.
