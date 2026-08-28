---
titulo: "Estado: o problema que você criou sem perceber"
descricao: Você roda o programa e ele funciona. Roda de novo e ele quebra. O código não mudou — mudou o que o programa lembra.
data: 2026-08-27
categoria: fundamentos
tags:
  - fundamentos
  - programacao
  - memoria
---

Você roda o programa e ele funciona. Roda de novo — mesmo código, mesma
máquina, mesma cadeira — e ele quebra.

Você chama alguém para ver. Roda pela terceira vez. Funciona. A pessoa vai
embora com aquele olhar educado de quem não vai falar nada, mas anotou.

"Não consigo reproduzir" talvez seja a frase mais honesta da profissão. Ela
confessa uma coisa enorme sem querer: que existe um segundo programa dentro
do primeiro. Um que não está no arquivo, que ninguém escreveu de propósito,
e que muda entre uma execução e outra.

Porque alguma coisa mudou. Não foi o código — você conferiu, caractere por
caractere. Mudou algo que não aparece no texto.

O [primeiro artigo desta série](/artigos/o-que-realmente-acontece-quando-um-programa-roda/)
terminou com a máquina sabendo só duas coisas: onde está, e o que a memória
contém agora. Dois artigos depois, ainda estávamos na primeira metade e nas
etiquetas. Este é sobre a segunda — porque é nela que o segundo programa
mora.

"O que a memória contém agora" tem um nome mais curto: estado. Estado é tudo
o que o programa precisa lembrar para responder à próxima pergunta.

Olhe esta função:

```
função próxima_senha()
    contador = contador + 1
    devolve contador
```

Chame duas vezes. Mesma pergunta, nenhum argumento, duas respostas
diferentes. A resposta não estava na função — estava no contador. A função é
só o guichê; quem sabe onde a fila parou é o papelzinho.

E ninguém acharia isso um defeito. É para isso que o guichê existe: se
`próxima_senha()` devolvesse sempre 1, a fila não andava.

Vale desfazer o mal-entendido antes que ele se instale: estado não é vilão.
Estado é o produto. Um programa que não lembra nada responde para sempre a
mesma coisa — ótimo para uma calculadora, inútil para quase todo o resto. O
saldo da conta é estado. O carrinho de compras é estado. O cursor piscando
exatamente onde você parou de digitar é estado. Software existe, na maior
parte do tempo, para lembrar coisas em nosso lugar.

O problema nunca foi o estado que você criou. É o que você criou sem
perceber.

A imagem que eu quero deixar é a da partida interrompida.

Duas pessoas jogam um jogo de tabuleiro, o jogo é longo, precisam parar.
Para continuar amanhã, ninguém precisa da história dos lances. A narração
inteira é dispensável: basta uma foto do tabuleiro. A posição das peças
resume tudo o que o passado fez de relevante — e o que ela não resume, o
passado fez em vão.

Estado é isso. A foto que dispensa a história. O programa não lembra o que
aconteceu; lembra o que sobrou do que aconteceu.

Agora experimente retomar a partida de verdade, só com a foto. Falta uma
informação — e ela não sai em fotografia nenhuma: de quem é a vez.

Todo tabuleiro tem peças que não saem na foto. E é nelas que o título deste
artigo estava mirando desde o começo.

Porque o executor do primeiro artigo continua lá embaixo, literal,
obediente, sem entender nada. Dado o mesmo texto e o mesmo tabuleiro — todas
as peças, inclusive as que não saem na foto —, ele faz a mesma coisa. Todas
as vezes.

Logo, nenhum bug acontece "às vezes".

Todo bug acontece sempre: sempre que as peças estão naquela posição.
"Às vezes" não é uma propriedade do bug.
É o nome que a gente dá às peças que não fotografou.

Com esse modelo na mão, um punhado de mistérios do cotidiano se resolve de
uma vez.

Desligar e ligar de novo — a única técnica de suporte que a humanidade
inteira adotou sem treinamento — funciona porque despeja o tabuleiro e arma
a posição inicial. Repare que ela não conserta nada: o programa sai da
reinicialização idêntico ao que entrou. O que morreu foi o estado que
alimentava o problema. Por isso o problema costuma voltar. E por isso
reiniciar não ressuscita arquivo corrompido: parte do tabuleiro é gravada em
pedra, e sobrevive ao despejo.

O teste que passa sozinho e falha no meio dos outros não é intermitente nem
azarado: o teste anterior deixou peças no tabuleiro.

E "na minha máquina funciona" é uma frase tecnicamente exata. Funciona. Na
sua máquina o tabuleiro tem outras peças — outra versão instalada, outro
arquivo de configuração, outro relógio. Vocês nunca rodaram o mesmo
programa. Rodaram o mesmo texto.

O [artigo anterior](/artigos/variaveis-nao-sao-caixas/) terminou num aviso:
a partir do segundo nome colado na mesma prateleira, existe um combinado
implícito entre partes do programa que talvez nunca tenham sido apresentadas
uma à outra. Agora dá para dizer o que o combinado combina. Estado.

Enquanto um trecho só do código enxerga o contador, o contador é lembrança.
Quando dois enxergam, vira acordo — um acordo cujos termos ninguém assinou.
Cada parte confia que a peça está onde a deixou. A variável global, o cache,
o arquivo temporário, o campo reaproveitado "só por enquanto": os grandes
fornecedores de bug "às vezes" têm isso em comum. São tabuleiros públicos
com cara de rascunho particular.

Os dois programas que costumam visitar esta série envelhecem de jeitos
opostos aqui. O conferidor de encargos roda, imprime e morre: o estado dele
vive minutos, e cada execução arma o tabuleiro do zero. Programas assim têm
uma paz que os outros não conhecem. Um servidor no ar há três meses é a
criatura oposta — três meses de lembranças acumuladas, algumas das quais
ninguém sabe mais por que estão lá. Quem sugere reiniciá-lo está sugerindo
apagar essa memória inteira, e apostando que nada importante morava só nela.

A confissão de sempre, porque toda imagem tem borda — e esta tem duas.

A foto sugere que o estado cabe num retrato: mesa, tabuleiro, clique. Num
sistema de verdade ele se espalha — variáveis, arquivos, banco de dados, a
hora no relógio (estado que ninguém declarou e todo mundo usa), a resposta
que a rede prometeu e ainda não entregou. Fotografar tudo no mesmo instante
não é difícil; em geral é impossível. E a foto sugere que as peças esperam
você voltar. Nem sempre: em muitos sistemas, outros dedos mexem no tabuleiro
enquanto você pensa. Esse assunto tem nome, é dos mais difíceis da
profissão, e esta série vai chegar nele com o respeito que ele exige. Por
ora, basta a honestidade: a foto envelhece.

Na prática, o que muda é a pergunta que você faz ao depurar. O primeiro
artigo dizia que quase todo bug mora na distância entre o que você supôs que
o programa sabia e o que ele sabia de fato. Aquela pergunta — o que este
programa sabe, exatamente aqui? — era, desde o começo, uma pergunta sobre
estado. Este artigo só trouxe o vocabulário dela: o que ele lembra agora?
Quem mais escreve nisso? De quem é a vez?

E tudo o que o programa lembra mora em algum lugar. Até aqui, esse lugar foi
uma fileira de prateleiras que aceitamos sem perguntar de que tamanho é,
quanto custa, o que acontece quando lota — como se memória fosse um detalhe.

O código diz o que pode acontecer.

O estado decide o que acontece agora.

E agora é a única hora em que programas vivem.
