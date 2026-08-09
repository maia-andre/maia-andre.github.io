---
titulo: O que realmente acontece quando um programa roda
descricao: O código que você escreveu não roda. Roda uma tradução dele, executada por algo que só sabe duas coisas — onde está e o que a memória contém agora.
data: 2026-08-08
categoria: fundamentos
tags:
  - fundamentos
  - programacao
  - memoria
---

Você escreve uma linha, aperta um botão, e a coisa acontece.

Entre a linha e a coisa existe um vão. Dá para trabalhar a vida inteira sem
olhar dentro dele — muita gente boa faz isso todo dia, e entrega. Mas quem
olha uma vez não programa mais exatamente do mesmo jeito, porque encontra
logo na entrada uma frase incômoda:

**o código que você escreveu não roda.**

O que roda é outra coisa. Uma tradução do que você escreveu, executada por
uma máquina que não faz a menor ideia do que você quis dizer.

Imagine alguém sentado numa sala, com uma folha de instruções e o dedo
apoiado numa linha. Essa pessoa faz três coisas, nesta ordem, para sempre:
lê a linha onde o dedo está, faz o que ela manda, move o dedo para a
próxima.

Ela não sabe o que está construindo. Não sabe se a instrução faz sentido.
Não pergunta. Se a linha quarenta mandar apagar o trabalho das últimas seis
horas, ela apaga — com a mesma disposição tranquila com que somaria dois
números.

Essa pessoa é o processador. E o dedo tem nome técnico: contador de
programa. Não é metáfora nem quase — é um número guardado, e esse número
quer dizer "onde eu estou".

Pergunte à máquina o que ela sabe e a resposta é curta. Ela sabe onde o dedo
está. Sabe o que está escrito na folha, que é a memória. E tem alguns
bolsos, pouquíssimos, para o que está usando agora mesmo — os registradores,
rápidos e contados nos dedos.

Acabou. Não há intenção, não há contexto, não há "ele quis dizer o total do
pedido".

A folha, por sinal, não tem parágrafos. Tem endereços. Memória é uma fileira
enorme de posições numeradas, e cada valor do seu programa mora em uma
delas. Quem já organizou um almoxarifado reconhece o arranjo na hora: não
adianta saber que a caixa existe se ninguém sabe em que prateleira ela está.
Um nome de variável é uma etiqueta que você colou na prateleira para não ter
que decorar o número.

Isso explica por que uma linha inocente como

```
total = total + preco
```

não é uma instrução. São várias. Vá até o endereço do total e traga o valor.
Vá até o endereço do preço e traga o valor. Some. Leve o resultado de volta
ao endereço do total. Quatro gestos, no mínimo, para uma linha que você
escreveu sem pensar.

E quando uma instrução manda "vá executar aquela outra lista e depois
volte"? A máquina precisa lembrar de onde saiu. Ela anota o endereço de
volta numa pilha, e essa pilha é a coisa mais parecida com memória de curto
prazo que um computador tem.

É por isso que a recursão sem freio quebra de um jeito tão característico.
Cada chamada empilha mais um "eu estava aqui". Ninguém desempilha. A pilha
cresce até não caber, e o erro que aparece na tela — *stack overflow* — é a
máquina avisando, do jeito dela, que a mesa acabou.

Nada disso muda quando você troca de linguagem. Muda quem traduz, e quando.

Na simulação em C que mantenho, a tradução acontece antes: o compilador
transforma o texto em instruções e sai de cena, sem deixar recado. No COBOL
que aprendi por causa de um conferidor de encargos, o texto tem outra idade
e outra cara — mas termina no mesmo lugar. Em JavaScript, a tradução
acontece durante a corrida, feita por um interpretador que é, ele mesmo, um
programa sendo executado por alguém com o dedo numa linha.

Três sintaxes, um executor. Troque a linguagem e a pergunta continua sendo a
mesma: onde está o dedo, e o que a memória contém agora?

Uma confissão antes de seguir, porque a imagem tem limite. O processador
moderno não é tão comportado quanto o dedo sugere: ele executa várias
instruções ao mesmo tempo, adianta trabalho que talvez nem precise e começa
pela quinta linha quando a quarta está esperando um dado chegar. Faz tudo
isso — e ainda é obrigado a entregar o resultado como se tivesse feito uma
de cada vez, na ordem.

Ou seja, ele mente para preservar o seu modelo mental. Poucas mentiras foram
tão úteis. O dedo continua sendo o jeito certo de pensar; só não é uma
fotografia do silício.

E aqui a coisa vira.

Se a máquina não sabe o que você quis dizer, então ela nunca entendeu
errado. Ela não tem esse talento. Todo bug que você já caçou na vida foi a
máquina fazendo, com obediência exemplar, exatamente o que estava escrito.

O erro nunca esteve entre o computador e você.
Esteve entre o que você quis dizer e o que você disse.

Isso muda o que é depurar. Você não está discutindo com a máquina, nem
procurando o instante em que ela se confundiu. Está relendo as próprias
instruções com o dedo na linha, perguntando em cada uma: o que este programa
sabe, exatamente aqui? Quase todo bug mora na distância entre a resposta que
você supôs e a resposta verdadeira.

Programar é escrever para o leitor mais literal que existe. Um que nunca
desconfia, nunca completa a frase por você, nunca vai perguntar se era isso
mesmo que você queria.

Não dá para pedir bom senso a ele.

Dá para escrever com cuidado. Uma instrução de cada vez.
