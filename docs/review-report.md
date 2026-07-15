# Review report — 2026-07-14 (INC-13)
Spec: docs/specs/direcao-estetica.md (Versão 1, aprovada) | Incremento: INC-13 — Cards de projetos + letra capitular | Build report: 2026-07-14 (INC-13)
## VEREDITO: APROVADO

Suíte rodada pelo auditor: **183/183**. Verify sem FALHAs. Auditor sondou
limites extras de `temCapitular` além dos testados (emoji, cabeçalho markdown,
link, citação e lista no início do corpo): todos recusam a capitular — o
comportamento é **conservador na direção certa**, nunca aplica o efeito onde o
CE-E02 proíbe.

## Verificação requisito a requisito

| Item | Status | Evidência |
|------|--------|-----------|
| REQ-E07 | Atendido | `li.cartao-projeto`/`ol.grade-projetos` nas duas listagens; dados idênticos aos de antes (nome, descrição, tecnologias em `.registro`, tags — testes de campo por card); contorno/fundo por tokens confirmados em navegador nos dois temas pelo verify; grade 2→1 colunas e 320px sem scroll; sem hex nas regras (teste) |
| REQ-E08 | Atendido | Classe `prosa-capitular` aplicada em `artigos/[slug].astro` só para reflexões com corpo abrindo em letra; `::first-letter` computado a 52,7px/float/`--carimbo` na reflexão real; artigo de computação sem classe e sem efeito |
| RN-E03 | Atendido | Markdown-fonte intocado; HTML do parágrafo sem marcação extra (teste anti-`<span>` + texto íntegro servido); efeito invisível à árvore de acessibilidade por ser `::first-letter` |
| CE-E02 | Atendido | Unitário nos limites (letra, ênfases, acentuada, travessão, aspas retas/curvas, número, vazio, whitespace) + build real de fixture com travessão → página sem a classe (suíte e verify, cada um com seu drive) |

Violações de escopo: nenhuma — mudanças restritas às duas listagens, à página
de artigo, ao lib e ao CSS dos itens do incremento.

**Observação registrada (não bloqueante):** a decisão da capitular lê a
primeira linha não-vazia do Markdown; corpo de reflexão que abrisse com
cabeçalho, citação, lista ou link deixaria de ganhar capitular mesmo que o
primeiro `<p>` renderizado comece com letra. É assimetria conservadora (o
CE-E02 nunca é violado), nenhum conteúdo real é afetado, e o custo de cobrir
esses formatos hoje não se justifica. Se um dia uma reflexão abrir assim e a
capitular fizer falta, tratar como refinamento editorial.

## Qualidade dos testes (TDD)

- 6 testes nasceram vermelhos (histórico nos commits); o guarda negativo
  ("artigo fora de reflexões") e o ajuste `::?first-letter` (minificador
  normaliza para a grafia legada) estão documentados.
- Inversão mental: remover a classe do card, o token da borda, a condição de
  categoria, o `temCapitular` ou o seletor do first-letter deixa testes
  vermelhos. O CE-E02 tem cobertura dupla (unitária + build real).

## Segurança

- Nenhuma dependência nova; `npm audit --omit=dev` = 0. `temCapitular` é
  função pura sobre string do próprio repositório; classes estáticas; sem
  novos vetores de entrada. Sem segredos, sem dados pessoais.

## Correções necessárias (para o /build)

Nenhuma. Próximo passo: `/ship` para fechar o INC-13 (release v1.3.0).
