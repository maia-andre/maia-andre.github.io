---
titulo: O dia em que descobri que documentação também é código
descricao: Documentar é transferir a memória da cabeça para o sistema — o projeto sobrevive ao autor, e o autor dorme em paz enquanto isso.
data: 2026-07-24
categoria: computacao
tags:
  - documentacao
  - engenharia-de-software
  - meta
---

No serviço público, aprendi cedo que o documento não descreve o ato — ele
é o ato. Um empenho não relata uma despesa; autoriza. Uma ata não conta a
reunião; fixa o que dela vale. A assinatura não registra a decisão; é a
decisão, com data e fé pública.

Demorei para perceber que software funciona igual.

Durante anos tratei documentação como o resto do software: o que se
escreve depois, se sobrar tempo, porque alguém cobra. O código era a obra;
o README, a placa de inauguração. Até o dia em que uma regra escrita
resolveu um problema que o código não tinha como resolver.

[Construí este site com uma especificação](/artigos/construindo-este-site/):
dezesseis requisitos, seis regras de negócio, oito casos extremos, tudo
numerado antes da primeira linha. Uma dessas regras decide a ordem dos
textos quando dois são publicados na mesma data — desempate alfabético,
está escrito. Quando a redigi, parecia zelo de burocrata: o caso não
existia, e talvez nunca existisse. Esta semana ele existiu. Publiquei dois
textos no mesmo dia e não precisei decidir nada — a decisão estava tomada
desde antes, escrita, numerada, com teste apontado para ela. O código
ordenou a lista, mas quem resolveu o problema foi um parágrafo.

Foi aí que a ficha caiu por extenso.
**Requisito escrito é decisão que não precisa ser tomada de novo.**
A spec não descreve o sistema; governa. O teste não confere o
comportamento; promete-o. O changelog não resume as
releases; é a certidão de que existiram. Nada disso é papel em volta do
código — é código em outra linguagem, executado por gente.

O que a documentação faz, no fundo, é transferir memória da cabeça para o
sistema. E eu sei exatamente o que estou tirando da cabeça quando faço
isso. [Escrevi uma vez que tenho uma memória que não
desbota](/artigos/a-memoria-que-nao-desbota/) — lembro de requisitos que
ninguém anotou, de decisões de reuniões de três anos atrás. No elogio dos
colegas, isso é um dom. No vocabulário da engenharia, tem outro nome:
ponto único de falha. Um projeto que depende da memória de um homem é um
projeto com uma cópia só — e cópia única não é acervo, é risco.

A linguagem que estou aprendendo agora é mais velha que eu. Os sistemas
COBOL que seguem de pé meio século depois não ficaram em pé por
genialidade — os autores se aposentaram, mudaram, morreram. Ficou de pé o
que estava escrito. E o contrário também é verdade, e eu vi de perto: todo
sistema sem documentação vira, com o tempo, um sistema que ninguém tem
coragem de desligar. A equipe não o mantém; vigia. Ele não presta serviço;
cobra medo. Documentação é a diferença entre herança e assombração.

Há também um motivo menos técnico, e este texto não estaria completo sem
ele. Uma cabeça que guarda tudo parece dispensar o papel. É o contrário:
quem carrega o arquivo inteiro no corpo conhece, melhor do que ninguém, o
preço de ser a única cópia. Documentar virou o meu jeito de largar. O que
está escrito não precisa ser lembrado; o que não precisa ser lembrado não
precisa ser carregado. O projeto ganha continuidade. Eu ganho as noites.

Por isso o backup, que a técnica descreve como redundância, eu prefiro
descrever como descanso. Ninguém faz backup para o dia em que tudo
funciona; faz para poder parar de pensar no dia em que não funcionar. Uma
spec é isso. Um changelog é isso. Uma ata bem lavrada é isso. O sistema
inteiro anotado do lado de fora da cabeça — para que a cabeça possa,
enfim, fazer outra coisa. Dormir, por exemplo.

Documentar é escrever para um leitor que ainda não existe: o colega que
chega no ano que vem, o cidadão que audita daqui a dez, eu mesmo daqui a
dois, tentando lembrar quem era quando escrevi. É apostar que alguém vem
depois — e que merece encontrar a porta destrancada.

Um projeto documentado é um projeto que decidiu sobreviver ao autor.

E um autor que documenta é um autor que se deu, por escrito, a permissão
de descansar.
