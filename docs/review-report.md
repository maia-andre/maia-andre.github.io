# Review report — 2026-07-12 (INC-04)
Spec: docs/spec.md (Versão 1, aprovada) | Incremento: INC-04 — Sistema de projetos | Build report: 2026-07-12 (INC-04)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: 91/91. Verify sem FALHAs. Regressão limpa (layout, artigos, listagens, rascunhos e builds inválidos todos verdes).

## Verificação requisito a requisito
| Item | Status | Evidência / Falha |
|------|--------|-------------------|
| REQ-08 | Atendido | `esquemaProjeto` em `src/lib/conteudo.ts` com exatamente os campos da spec (obrigatórios e opcionais com defaults corretos); regra de tags compartilhada com artigos (RN-03); 14 testes campo a campo incluindo URLs inválidas e listas vazias. |
| REQ-09 | Atendido | `/projetos/` e `/projetos/site-pessoal/` dirigidas no preview real (HTTP 200, h1, tecnologias, repositório e tags linkadas); seções de opcionais ausentes não renderizam. |
| CE-07 | Atendido | Dois níveis de evidência: página servida sem `<img>` e com exatamente 1 link (só repositório); build real com projeto mínimo (só obrigatórios) gera página sem nenhuma seção opcional. |
| Regressão INC-01/02/03 | Limpa | 91/91 na rodada do auditor; rotas anteriores dirigidas no verify (200/404 corretos). |

## Qualidade dos testes (TDD)
- Vermelho documentado (14 falhas antes da implementação). Dois defeitos estavam nos próprios testes (asserção contra seção legítima; caminho sem slugificação) — corrigidos ANTES da implementação mudar, mantendo o contrato honesto.
- Achado de estabilidade correto: consolidação dos testes de build real em um único arquivo elimina contaminação de `src/content/` entre workers paralelos — flake real observado e eliminado nesta rodada.
- Extras absorvidos verificados: `Object.hasOwn` aplicado; guarda de colisão de slugs instanciada por coleção (instâncias separadas, sem falso positivo entre artigo e projeto com mesmo slug).

## Segurança
- **Baixa**: `esquemaProjeto` aceita URLs com esquema `javascript:` e `data:` em `repositorio` e `links[].url` (verificado pelo auditor: `safeParse` retorna sucesso). O conteúdo é exclusivamente autoral — sem vetor de terceiros hoje —, mas é hardening barato: restringir a `http(s)` no schema. **Correção indicada para a rodada de build do INC-05** (não bloqueia).
- `npm audit`: 0 vulnerabilidades. Sem segredos. Astro escapa interpolações; sem `set:html`.

## Correções necessárias (para o /build)
Nenhuma bloqueante. Próximo passo: `/ship`. (A rodada do INC-05 deve absorver: restringir esquemas de URL a http/https em `repositorio` e `links[].url`, com teste rejeitando `javascript:` e `data:`.)
