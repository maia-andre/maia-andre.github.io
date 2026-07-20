---
titulo: Organizar um almoxarifado e organizar software são o mesmo problema
descricao: Inventário é estado, plaqueta é identificador, ficha é log, auditoria é teste — antes de trabalhar com computadores, trabalhamos com informação.
data: 2026-07-20
categoria: gestao-publica
tags:
  - gestao-publica
  - logistica
  - arquitetura
---

Todo almoxarifado tem um corredor onde o sistema acaba. Uma caixa sem
etiqueta em cima do armário, uma prateleira que todo mundo chama de "ali",
um item que consta no estoque mas ninguém sabe onde está — ou que está na
prateleira e não consta em registro nenhum. Quem trabalha com patrimônio
conhece a sensação exata: a coisa e a informação sobre a coisa se
separaram. A partir desse instante o item está perdido, mesmo estando bem
ali, na sua frente.

Demorei para perceber que a engenharia de software passa a vida resolvendo
exatamente esse problema. Depois que percebi, não consegui mais separar os
dois mundos. O paralelo fecha conceito por conceito.

**Inventário é estado.** O inventário não pergunta o que deveria haver;
pergunta o que há. A diferença entre as duas respostas tem nome nos dois
mundos: no depósito é sobra ou falta, no software é inconsistência. E a
causa é sempre a mesma — em algum momento, alguém moveu a coisa sem mover a
informação.

**A plaqueta de tombamento é o identificador.** No mapa logístico que
mantenho para a Prefeitura, cada uma das quinhentas e quarenta e três
unidades carrega um id que começa dizendo de onde veio — `CLM-`, `CNES-`,
`INEP-`. Uma boa etiqueta não diz só o que a coisa é; diz de onde ela veio
e onde conferi-la. O nome disso é rastreabilidade, e vale para um bem
tombado, uma linha de planilha ou uma dependência de software.

**A ficha de movimentação é o log.** Quem levou, quando, para onde, com a
assinatura de quem autorizou. O histórico do git faz pelo código o que a
ficha faz pelo bem: impede que o passado seja reescrito para caber na
versão de quem conta. Nos dois mundos, o registro que pode ser apagado não
protege ninguém.

**A auditoria é o teste.** No estudo do Centro Logístico existe um script
com uma regra que considero sagrada: ele compara a planilha-mestre com as
fontes originais e só reporta divergências — nunca escreve. Auditor que
corrige o que encontra deixa de ser auditor. Um bom teste tem a mesma
ética: acusa, não conserta, e por isso dá para confiar no que ele diz.

**O endereço de prateleira é a arquitetura.** Corredor B, estante três,
nível dois: quem conhece o endereçamento acha o item sem procurar. Um
sistema bem arquitetado dá a mesma sensação — você nunca esteve naquele
módulo, mas sabe onde a coisa deve estar antes de abrir a pasta.

No Centro Logístico, tudo deriva de uma única planilha-mestre: o mapa, o
GeoJSON, as rotas. A engenharia chama isso de fonte única da verdade.
Qualquer almoxarife experiente chama de outra coisa: o caderno. O caderno
certo, aquele que todo mundo sabe qual é, contra o qual todos os outros
papéis se conferem. Mudou o vocabulário; o princípio tem séculos.

E é essa a inversão que este texto quer registrar: o software não ensinou o
almoxarifado a se organizar — foi o contrário. Banco de dados é fichário.
Chave primária é número de tombo. Backup é segunda via. A informática
nasceu automatizando uma disciplina que bibliotecários, arquivistas e
almoxarifes praticavam muito antes da primeira válvula esquentar: a
disciplina de não perder as coisas de vista. Antes de trabalhar com
computadores, trabalhamos com informação.

Hoje transito entre o depósito e o repositório sem sentir que mudo de
assunto. Num e noutro, o trabalho é o mesmo: dar endereço ao que estava
solto — o mesmo gesto, aliás, que os ensaios desta página fazem com o que
eu carregava sem etiqueta. Etiquetar, registrar, conferir. A máquina só
faz mais rápido o que a prateleira bem cuidada já sabia.
