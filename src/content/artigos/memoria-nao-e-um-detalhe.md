---
titulo: Memória não é um detalhe
descricao: Dois programas fazem a mesma conta e um é mil vezes mais lento. A diferença não está no que eles fazem — está em onde vão buscar.
data: 2026-09-28
categoria: fundamentos
tags:
  - fundamentos
  - programacao
  - memoria
---

Dois programas fazem exatamente a mesma conta. Mesmos dados, mesmo
resultado, mesmo algoritmo — daqueles que qualquer revisor aprovaria. Um
termina em um segundo. O outro, em vinte minutos.

Você lê os dois lado a lado procurando a diferença e não acha, porque ela
não está no que os programas fazem. Está em onde eles vão buscar o que usam.

O primeiro lê os dados uma vez e trabalha em cima deles. O segundo, a cada
item, vai buscar o item de novo — no disco, no banco, do outro lado da rede.
No texto, as duas versões parecem a mesma frase. Na máquina, uma atravessa a
sala e a outra atravessa a cidade. Mil vezes.

Até aqui, esta série tratou a memória com uma cortesia que ela não merece. O
[primeiro artigo](/artigos/o-que-realmente-acontece-quando-um-programa-roda/)
disse que a máquina sabe duas coisas: onde está e o que a memória contém
agora. O [segundo](/artigos/variaveis-nao-sao-caixas/) colou etiquetas em
prateleiras. O [terceiro](/artigos/estado-o-problema-que-voce-criou-sem-perceber/)
mostrou que tudo o que o programa lembra mora ali. Em nenhum momento
perguntamos onde ficam essas prateleiras, de que tamanho são, quanto custa
ir até elas. Era de propósito. Agora não é mais.

A imagem que eu quero deixar é a de um almoxarifado.

Quem já trabalhou num sabe: não existe "o estoque". Existe a mesa, com as
três coisas que você está usando agora. A prateleira atrás da cadeira, com o
que você usa todo dia. O corredor dos fundos. O galpão do outro lado da
cidade, onde fica o que quase nunca sai. Tudo é estoque. Nada está à mesma
distância.

Memória de computador é organizada exatamente assim — e pelo mesmo motivo.
Perto é caro e pequeno; longe é barato e enorme. Nenhum orçamento compra uma
mesa do tamanho do galpão.

Lá dentro, a mesa se chama registrador: um punhado de lugares dentro do
próprio processador, onde a conta acontece de fato. A prateleira atrás da
cadeira são os caches: pequenos, rapidíssimos, colados no processador. O
corredor é a memória principal, a RAM — a dos gigabytes da ficha técnica. O
galpão é o disco. E existe ainda o galpão de outra empresa, em outro país: a
rede.

As distâncias são difíceis de sentir, porque os números são todos pequenos
demais. Então vale um truque antigo: esticar o tempo até ele caber numa
vida. Se pegar um item na prateleira do lado — o cache — levasse um segundo,
ir até a RAM levaria um minuto e pouco. Ler de um SSD, perto de um dia. De
um disco mecânico, alguns meses. E uma ida e volta pela internet até outro
continente, uns quatro ou cinco anos.

A mesma instrução — "traz esse valor" — pode custar um segundo ou uma
faculdade inteira. O código não diz qual. O código diz só "traz".

É por isso que o segundo programa do começo não tem defeito nenhum que um
leitor de código enxergue. Cada linha dele está certa. Ele só manda buscar
no galpão, um parafuso por viagem, uma coisa que caberia na mesa.

Essa é a primeira pergunta que a série vinha adiando: quanto custa. A
segunda é de que tamanho — e a resposta curta é que a mesa lota.

Um programa que só empilha, sem nunca devolver nada, uma hora não tem mais
onde apoiar o cotovelo. Quando a memória principal lota, o sistema
operacional passa a usar o galpão como se fosse corredor: manda para o disco
o que não cabe e vai buscar de volta quando precisa. Tudo continua
funcionando. Só que cada "traz esse valor" virou viagem de meses. É aquele
momento em que a máquina inteira parece andar na lama, e o ponteiro do mouse
chega na tela depois de você.

E quem devolve as coisas à prateleira?

Em algumas linguagens, você. Pede espaço, usa, devolve — com a mão,
explicitamente. Esquecer de devolver tem nome: vazamento de memória. Não
vaza nada para fora; o espaço fica reservado para uma coisa que ninguém mais
vai pedir. Devolver cedo demais é pior: é liberar uma caixa que ainda tem
etiqueta apontando para ela. Alguém segue a etiqueta mais tarde e encontra,
na mesma prateleira, a caixa de outra pessoa.

Em outras linguagens, alguém passa recolhendo por você — o coletor de lixo.
E aqui o segundo artigo volta a render: o coletor não pergunta se você ainda
precisa de uma coisa. Ele pergunta se ainda existe alguma etiqueta levando
até ela. Caixa sem etiqueta vai embora. Caixa com etiqueta fica — mesmo que
a etiqueta esteja esquecida numa lista que só cresce, num cache que nunca
esquece nada. É por isso que programa com coletor de lixo também vaza. O
coletor não lê pensamento; lê etiquetas.

Lembra do servidor no ar há três meses do artigo anterior, cheio de
lembranças que ninguém sabe mais por que estão lá? Muitas vezes é isso:
três meses de caixas com etiqueta, ocupando a mesa, e ninguém com coragem de
jogar fora.

A terceira pergunta — o que acontece quando lota — tem uma resposta que
todo programador acaba sentindo na pele: nada avisa antes. O programa roda
liso no teste, com cem registros, e cai em produção com um milhão. Não
porque a lógica mudou, mas porque o almoxarifado não cresceu junto.

A confissão de sempre, porque toda imagem tem borda — e esta tem duas.

No almoxarifado de verdade, você decide o que vai para a mesa. No
computador, quase nunca. Os caches se enchem sozinhos, e o hardware tenta
adivinhar o que você vai pedir e traz antes. Adivinha bem quando você lê as
coisas em ordem, uma depois da outra; adivinha mal quando você pula de um
canto para o outro. Você não controla a prateleira. Controla o quanto é
previsível.

E os números lá de cima são ordens de grandeza, não medidas. Mudam de
máquina para máquina e de ano para ano. O que não muda é a proporção. Medida
em tempo de processador, a distância entre a mesa e o galpão só aumentou nas
últimas décadas: o processador acelerou muito mais depressa do que a memória
conseguiu acompanhar.

Na prática, o que muda é a pergunta que você faz ao ler código. Não só "o
que isto faz?", mas "de onde isto busca, e quantas vezes?". Um laço que pede
ao banco, a cada volta, uma coisa que poderia ter pedido uma vez só. Um
arquivo relido inteiro para achar uma linha. Uma lista que cresce e ninguém
esvazia. Nenhum desses é bug no sentido de dar resposta errada. Todos dão a
resposta certa. Só que tarde.

Ficou uma coisa de fora, de propósito. Toda prateleira desse almoxarifado
tem um número — é assim que a máquina a encontra. A etiqueta do segundo
artigo, lá embaixo, nunca foi um barbante: é um número de prateleira anotado
em algum lugar. E números de prateleira também podem ser guardados em
prateleiras.

O que acontece quando o que você guarda é o endereço de outra coisa fica
para o próximo.

Memória não é onde o programa guarda as coisas.

É de onde ele vai buscá-las.

E buscar tem distância.
