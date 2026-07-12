# Build report — 2026-07-12 (INC-02, rodada 2)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-02 — Coleção de artigos validada + página do artigo
Rodada: correção (review de 2026-07-12)
Testes: 64 passando / 64 total — `npm test`

## Correções do review aplicadas
1. [CE-06] `criarGeradorDeIds()` em `src/lib/conteudo.ts`: `generateId` customizado passado ao `glob()` em `src/content.config.ts` — slugifica (minúsculas, sem acentos, kebab), registra ids emitidos e lança erro nomeando **os dois arquivos** na colisão, antes da deduplicação silenciosa do loader. Idempotente para recargas do mesmo arquivo.
2. [CE-06] Teste de integração `CE-06 — build falha com slugs colidentes` em `tests/artigos-build-invalido.test.ts`: cria `__ce01__colisao a.md` + `__ce01__colisao-a.md`, roda `astro build` real → exit ≠ 0 com os dois nomes na saída.
3. [CE-06] Guarda morta `garantirSlugsUnicos()` removida de `src/pages/artigos/[slug].astro` e da lib; testes antigos substituídos pelos do gerador.

## Requisitos atendidos
- **REQ-03** — Atendido — coleção `artigos` em `src/content.config.ts` com schema zod em `src/lib/conteudo.ts` (obrigatórios: titulo, descricao, data, categoria, tags≥1; opcionais: atualizado, rascunho default false); coberto por `tests/artigos-schema.test.ts` (obrigatórios um a um, datas válidas/inválidas, opcionais).
- **REQ-04** — Atendido — `categoria` como z.enum das três da spec; valores fora da lista rejeitados; coberto por testes de aceite/rejeição por categoria + build real falhando (CE-01).
- **REQ-06** — Atendido — `src/pages/artigos/[slug].astro` gera `/artigos/<slug>/` (slug = id do arquivo) com h1, data pt-BR em `<time datetime>`, nome de exibição da categoria, tags linkadas para `/tags/<tag>/` e corpo Markdown; coberto por `tests/artigos-pagina.test.ts` sobre o HTML real do dist.

## Regras de negócio
- **RN-01** — Atendido — `CATEGORIAS` mapeia exatamente os 3 slugs aos nomes de exibição; teste de igualdade estrita do mapa + exibição na página.
- **RN-03** — Atendido — `PADRAO_TAG` (`^[a-z0-9]+(-[a-z0-9]+)*$`) no schema; testes com 5 tags válidas e 9 inválidas (acentos, maiúsculas, underscore, hífens nas bordas, espaço, vazia).

## Casos extremos cobertos
- **CE-01** — `tests/artigos-build-invalido.test.ts`: escreve um artigo com data impossível + categoria inexistente + tag inválida + descricao ausente, roda `npx astro build` real (outDir isolado) e comprova exit ≠ 0 com o nome do arquivo na saída; try/finally remove o arquivo e o padrão `__ce01__*` está no .gitignore.
- **CE-06** — detecção no `generateId` do loader (ponto anterior à deduplicação); teste unitário do gerador (colisão, idempotência, slugificação) + teste de integração com `astro build` real falhando com os dois arquivos na mensagem.

## Observações da rodada
- Artigo semente real (`construindo-este-site.md`) — conta como 1 dos 2 artigos reais exigidos na definição de concluído; André pode editar à vontade.
- Links de tags apontam para `/tags/<tag>/`, rota que nasce no INC-06 (mesmo padrão da navegação, aprovado no INC-01).
- Comportamento de `rascunho: true` (exclusão de produção) é REQ-07/RN-05 → INC-03, fora desta rodada; o campo já existe no schema com default correto.

## Perguntas em aberto / pendências
- Nenhuma.
