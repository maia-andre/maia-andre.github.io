---
titulo: Variáveis não são caixas
descricao: Você duplicou a lista antes de mexer nela e as duas mudaram juntas. Não havia duas listas — havia uma lista e dois nomes.
data: 2026-08-15
categoria: fundamentos
tags:
  - fundamentos
  - programacao
  - memoria
---

Você duplica uma lista antes de mexer nela. Prudência elementar: guarda uma
cópia, faz a bagunça na original, se der ruim volta pelo backup.

Dá ruim. Você vai buscar o backup e ele está exatamente tão bagunçado quanto
o outro.

Não havia dois. Havia uma lista e dois nomes.

Na primeira vez que isso acontece, a gente culpa a linguagem. Na segunda, o
cansaço. Mas o defeito não está em nenhum dos dois — está num desenho que
alguém fez num quadro no seu primeiro semestre, e que você nunca teve motivo
para apagar.

O desenho é um quadradinho com um valor dentro.

**A caixa.**

A caixa dura tanto porque ela funciona. `x = 5`: desenhe o quadrado, escreva
o x embaixo, ponha o 5 dentro. Depois `x = 7`: apague o 5, escreva o 7. Está
explicado o que é uma variável, o que é atribuição e o que significa "o
valor mudou" — três conceitos com um quadrado e um giz.

Uma analogia que aguenta um semestre inteiro é uma boa analogia. E é
exatamente por isso que ela é perigosa: nada nela avisa quando ela deixou de
valer. Ninguém volta ao quadro para dizer "a partir daqui, esqueça a caixa".
Ela sai da sala junto com você, vai para o trabalho, e um dia aparece numa
madrugada de sábado usando o nome de bug.

Ela costuma chegar por três portas.

Copiei uma variável, mexi numa, e as duas mudaram.

Passei um dado para uma função que só ia ler, e o dado voltou diferente.

Declarei uma constante — a linguagem inclusive deixou — e o conteúdo mudou
mesmo assim.

Se a caixa fosse verdade, nada disso seria possível. Duas caixas são duas
caixas: o que está dentro de uma não vaza para a outra, e uma caixa lacrada
continua lacrada. Os três não são três problemas. São o mesmo mal-entendido
com três disfarces.

Volte à fileira de posições numeradas do
[artigo anterior](/artigos/o-que-realmente-acontece-quando-um-programa-roda/).
Cada valor do seu programa mora num endereço. O nome que você escreveu no
código não é a prateleira — é uma etiqueta colada nela, para você não ter
que decorar o número.

Com isso, a linha do backup se lê sozinha:

```
backup = lista
lista.adiciona("erro")
```

A primeira linha não fabricou lista nenhuma. Ela colou uma segunda etiqueta
na mesma prateleira. A segunda linha foi até a prateleira e mexeu no item
que estava lá.

Nenhum almoxarife estranharia a cena. Duas etiquetas, um item. Ele só não
chamaria a segunda etiqueta de cópia.

Porque existem dois gestos aqui, e a caixa não consegue separá-los — na
caixa, o nome e a coisa são a mesma entidade.

Um dos gestos mexe na etiqueta. `backup = outra_lista` descola o nome de
onde ele estava e cola noutro lugar. A prateleira antiga continua ali,
intacta, com o item de sempre.

O outro mexe no item. `backup.adiciona("erro")` não move etiqueta nenhuma.
Quem mudou foi a coisa apontada — e ela mudou para todo mundo que aponta
para ela.

Os nomes técnicos são reatribuição e mutação, e essa é uma das poucas vezes
em que o jargão é mais claro que o português.

Com a distinção na mão, a constante que mudou deixa de ser pegadinha. A
palavra que a sua linguagem usa para constante — `const`, `final`, `val` —
costuma prometer uma coisa só: que aquela etiqueta não vai ser descolada.
Ela nunca prometeu nada sobre o item da prateleira. A linguagem estava sendo
precisa numa distinção que o seu modelo mental não tinha.

O mesmo vale para a função que alterou o que não devia.

Quando você passa uma variável para uma função, você não entrega a
prateleira. Entrega uma cópia da etiqueta. Lá dentro, a função ganha um nome
próprio apontando para o mesmo item — e daí saem as duas metades da
confusão. Se a função mexer no item, você vê a mudança do lado de fora: é a
mesma prateleira. Se a função recolar a própria etiqueta noutro item, do
lado de fora não acontece nada: a sua etiqueta nunca se moveu.

É por isso que a discussão eterna sobre a linguagem ser "por valor ou por
referência" quase sempre termina mal. Na maioria delas o que viaja é o valor
da referência: copia-se a etiqueta, nunca o item. As duas respostas do
debate conseguem estar erradas ao mesmo tempo, o que não é pouca coisa.

Uma confissão antes de fechar, porque toda analogia tem borda.

A caixa não é mentira em todo lugar. Em C, uma variável local é mesmo um
pedaço de memória com tamanho e endereço — está mais perto do quadradinho do
que da etiqueta. E o COBOL acredita em caixas com uma fé que nenhuma
linguagem moderna teria coragem de ter: você declara o tamanho do campo
antes de qualquer coisa acontecer, e o que não couber não cabe. Num
conferidor de encargos, um campo de cinco dígitos é uma caixa de cinco
dígitos até a última linha do programa.

Então a pergunta útil nunca foi "caixa ou etiqueta?". É outra: esta
linguagem me deu a prateleira, ou me deu só a etiqueta?

As de baixo nível entregam as duas e cobram atenção. As de alto nível
guardam a prateleira e deixam você com o nome na mão. Em nenhuma das duas o
nome chegou a ser a coisa.

E o ponteiro, que costuma ser anunciado como o assunto difícil da história,
é só isto dito em voz alta: um valor que é um endereço. Uma etiqueta que
você pode segurar, olhar, guardar numa gaveta e passar adiante. Difícil não
é o ponteiro. Difícil é descobrir que ele já estava ali o tempo todo,
escondido atrás do sinal de igual.

No lugar da caixa ficam duas perguntas.

Este nome aponta para quê?

E quantos outros nomes apontam para a mesma coisa?

A segunda é a que salva o sábado. Um valor com um nome só é um valor que só
você pode estragar. A partir do segundo nome existe um combinado implícito
entre partes do programa que talvez nunca tenham sido apresentadas uma à
outra.

A caixa dizia que a variável guarda um valor. Guardar é um verbo
confortável: dá ideia de posse, de dentro, de lacre.

Não é o que acontece. O nome não guarda nada.

Um nome não é uma coisa. É um caminho até ela.

E caminhos se cruzam.
