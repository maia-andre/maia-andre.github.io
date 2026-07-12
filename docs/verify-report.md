# Verify report — 2026-07-12 (INC-02, rodada de correção)
Incremento: INC-02 — Coleção de artigos validada + página do artigo | Build report: 2026-07-12 (INC-02, rodada 2)
Como rodei: `npx astro build --outDir <scratch>` com arquivos colidentes temporários; `npm run build` para regressão do build válido
Suíte de testes: 64 passando / 64 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| CE-06 | Recriado o cenário exato da reprovação: `__ce01__colisao ce06.md` + `__ce01__colisao-ce06.md` (slugificam igual), `astro build` real | `exit: 1` + `Slug duplicado "ce01-colisao-ce06": os arquivos "__ce01__colisao ce06.md" e "__ce01__colisao-ce06.md" geram o mesmo endereço. Renomeie um deles.` — os **dois** arquivos nomeados | FUNCIONA |
| Regressão REQ-06 | Build válido com o artigo real após a troca do generateId | `npm run build` → `3 page(s) built`, `Complete!`; slug `construindo-este-site` inalterado (suíte de página verde) | FUNCIONA |
| Regressão CE-01 | Frontmatter inválido continua derrubando o build | teste de integração `CE-01` verde na suíte (build real, exit ≠ 0, arquivo na saída) | FUNCIONA |
| Regressão INC-01 | Layout/404/docs | suíte completa 64/64 | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- Nada nesta rodada — a colisão, antes não verificável, agora é dirigida de verdade pelo build.

Ambiente limpo: arquivos temporários removidos (restou apenas `construindo-este-site.md`), outDirs de scratch apagados.
