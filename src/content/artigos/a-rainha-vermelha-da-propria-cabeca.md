---
titulo: A Rainha Vermelha da própria cabeça
descricao: Num mundo simulado onde planejar mais fundo é um traço herdado, pensar mais não ajuda ninguém — e o único freio contra essa corrida não é o preço do pensamento, é a sua própria imprecisão.
data: 2026-07-28
categoria: reflexoes
tags:
  - filosofia
  - c
  - simulacao
---

No [Matrix](/projetos/matrix/), cada bloco carrega dois números herdados que
decidem como ele planeja: quantos ticks à frente enxerga (`horizonte`) e
quanto desconta o futuro distante (`desconto`, a paciência). Os dois evoluem
livremente, com mutação, geração após geração. A pergunta que persegui
durante um bom tempo era ingênua o bastante para eu não desconfiar dela: vale
a pena planejar mais fundo?

## Vantagem individual, ruína coletiva

A resposta óbvia — "claro, quem vê mais longe decide melhor" — é a metade
errada de uma verdade incômoda. Num torneio de todos contra todos, o bloco
que planeja mais fundo sempre vence o duelo contra quem planeja raso. Só que
numa população inteira composta só de planejadores fundos, o resultado é
pior do que numa composta só de planejadores rasos — sobra menos gente, no
fim. É a assinatura de manual de uma corrida armamentista: correr mais rápido
só ajuda enquanto o vizinho ainda corre devagar.

## O horizonte que não produz nada

Achei que essa corrida ainda deixaria algum resíduo positivo — afinal, ver
mais longe deveria, em algum grau, ajudar a colher melhor. Isolei o efeito
rodando populações de um único tipo, sem nenhum rival de horizonte diferente
para competir. Se o horizonte fundo fosse bom por si só, esse isolamento
deveria mostrar isso.

Mostrou o oposto. Cada passo de planejamento além do segundo faz o bloco
colher **pior**, não melhor: uma população só de planejadores com horizonte
doze termina com **vinte unidades a mais de comida abandonada no chão**,
intocada, contra uma população só de planejadores com horizonte um. O
horizonte fundo não produz nada — ele não é usado para colher mais, é usado
para competir pelo que já existe. Tudo o que ele compra, numa corrida
armamentista de verdade, ele toma de um vizinho que planeja menos.

## O freio que não é preço

Se pensar fundo é caro para o grupo e não rende nada sozinho, por que a
corrida não continua para sempre, empurrando o horizonte até o teto que o
código permite? Porque existe um freio — só que ele não é o preço do
pensamento, nem um imposto, nem uma regra de desenho. É a própria imprecisão
do plano, e quem decide quanto essa imprecisão pesa é a paciência do mundo.

Um plano longo é, no fundo, uma previsão — e previsões erram mais quanto mais
longe vão. A paciência (o desconto) determina o peso que a cauda dessa
previsão recebe na decisão final. Num mundo pouco paciente, essa cauda errada
é descartada quase por completo, e planejar fundo demais sai barato: não
ajuda, mas também não atrapalha muito. Num mundo muito paciente, a mesma
cauda entra com quase metade do peso da decisão — e aí planejar fundo deixa
de ser neutro e vira **ativamente ruim**: uma população que só planeja fundo
demais sustenta cinco blocos e meio a menos do que uma que planeja um pouco
menos fundo, e o estrago **mais que triplica** conforme o mundo fica mais
paciente.

Disso sai o resultado que mais me surpreendeu, contra qualquer intuição que
eu tivesse antes de medir: **quanto mais paciente o mundo, mais raso deveria
ser o horizonte ideal.** Dar mais peso ao futuro distante não recompensa quem
olha mais longe — pune quem confia demais numa previsão que, lá na ponta, já
não vale a confiança que recebe.

## Uma corrida que não precisa ser de graça

Fiquei com uma pergunta prática pendurada: dá para parar essa corrida sem
simplesmente destruir a população? A primeira tentativa foi um imposto —
cobrar de cada bloco pelo tanto que ele planeja fundo. Funcionou para alinhar
o incentivo (a profundidade evoluída volta a cair para perto do ideal do
grupo), mas a conta saiu cara demais: a arrecadação simplesmente desaparecia
do mundo, e a população pagava por isso — quase um terço a menos de gente
viva no equilíbrio novo.

A segunda tentativa trocou uma única linha: em vez de queimar a arrecadação,
devolvê-la, dividida igualmente entre quem sobrevive a cada rodada. O
incentivo se alinha do mesmo jeito — mas a população não só se recupera da
perda, termina em **102% do que tinha antes** de qualquer imposto existir.
Alinhar a escolha individual ao bem do grupo não precisa custar nada, se o
que se tira de um lado não some — só muda de mão.

## O que sobra

Não me canso de notar como o resultado mais forte de tudo isso não é o óbvio
(competir demais faz mal), e sim o torto: a coisa que deveria proteger contra
o excesso — dar peso ao futuro, ter paciência — é exatamente o que faz o
excesso doer mais. Toda corrida armamentista movida a previsão carrega,
embutido, o próprio antídoto: em algum ponto a arma passa a mirar para trás.
A pergunta que fica, para qualquer corrida parecida fora de uma simulação de
56 KB, é quem decide o quanto ela pesa a própria imprecisão antes de
continuar correndo.

*O código, as notas de pesquisa e os manifestos de filosofia estão no
[repositório do projeto](https://github.com/maia-andre/matrix).*
