---
titulo: Construindo este site como um projeto de software
descricao: Por que o meu site pessoal tem spec, backlog de incrementos, TDD e releases versionadas — e o que isso diz sobre como eu trabalho.
data: 2026-07-12
categoria: computacao
tags:
  - astro
  - engenharia-de-software
  - meta
---

Este site não começou com um tema pronto nem com um "hello world". Começou com
uma especificação: dezesseis requisitos funcionais, seis regras de negócio,
oito casos extremos — tudo numerado, tudo testável. Pode parecer exagero para
um site pessoal. Para mim, é o contrário: é a forma mais honesta de começar.

A ideia deste espaço é ser um **arquivo vivo** da minha trajetória — código,
gestão pública e as coisas que ainda estou tentando entender. Se o conteúdo vai
registrar uma trajetória, o próprio site também deveria: cada incremento vira
uma release (`v0.1.0`, `v0.2.0`...), cada mudança passa por testes que
constroem o site de verdade e inspecionam o HTML final, e o changelog conta a
história completa.

## O ciclo

O fluxo é sempre o mesmo: especificar, planejar, construir com TDD, verificar
de ponta a ponta, revisar contra a spec e só então fechar o incremento. O
mesmo ciclo que uso nos meus outros projetos, aplicado ao lugar que vai
falar sobre eles.

A stack é deliberadamente simples: Astro, Markdown e TypeScript, publicados
como site estático. Performance acima de efeitos visuais, tipografia acima de
decoração — e nenhuma fonte externa.

Este é o primeiro registro do arquivo. Os próximos já estão no backlog.
