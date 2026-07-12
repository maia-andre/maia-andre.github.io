# Verify report — 2026-07-12 (INC-03)
Incremento: INC-03 — Listagens de artigos + rascunhos | Build report: 2026-07-12 (INC-03)
Como rodei: `npm run build` (produção limpa) + `npx astro preview --port 4399 --host 127.0.0.1`
Suíte de testes: 77 passando / 77 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-05 | Abrir `/artigos/` no preview real | `HTTP 200`; item com `<h2 class="item-titulo"><a href="/artigos/construindo-este-site/">…</a></h2>`; links das 3 categorias presentes | FUNCIONA |
| REQ-05 | Página de categoria com conteúdo | `/artigos/computacao/` contém "Construindo este site" (1 ocorrência) | FUNCIONA |
| REQ-05 | Categoria vazia — estado vazio sem vazamento | `/artigos/reflexoes/` → `Nenhum artigo nesta categoria ainda.` e 0 ocorrências de artigos de outras categorias | FUNCIONA |
| REQ-07 / RN-05 | Rota do rascunho em produção | `curl /artigos/controle-patrimonial-na-pratica/` → `HTTP 404` | FUNCIONA |
| REQ-07 / RN-05 | Rascunho fora das listagens | `/artigos/gestao-publica/` → 0 menções a "Controle patrimonial" | FUNCIONA |
| RN-02 | Ordenação | Só há 1 artigo publicado — ordenação dirigida via testes unitários da função usada pelas páginas (datas desc, empate alfabético pt-BR, imutabilidade); observável no dist quando houver ≥2 artigos | FUNCIONA (unitário) |
| Regressão INC-01/02 | Home, 404, página do artigo | Suíte completa 77/77 inclui todos os testes anteriores | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- **RN-02 no HTML servido**: exige ≥2 artigos publicados; hoje há 1 real + 1 rascunho. A função pura `ordenarArtigos()` é a única fonte de ordenação das páginas e está coberta por unitários com valores-limite. Fica naturalmente observável no INC-10 (2 artigos reais).

Ambiente limpo: preview derrubado, arquivos de scratch removidos.
