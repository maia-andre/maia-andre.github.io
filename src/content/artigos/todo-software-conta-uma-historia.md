---
titulo: Todo software conta uma história
descricao: Código é o diário de quem não sabia que estava escrevendo um diário — e ler sistemas é, no fundo, ler gente.
data: 2026-07-20
categoria: computacao
tags:
  - engenharia-de-software
  - escrita
  - meta
---

Há uma pergunta que ninguém faz ao abrir um repositório pela primeira vez:
**o que estava acontecendo na vida de quem escreveu isto?**

Perguntamos o que o sistema faz, qual é a stack, se os testes passam. São
boas perguntas. Mas nenhuma delas explica aquele `if` solitário tratando um
caso que parece impossível — até o dia em que você descobre que ele já
aconteceu uma vez, e alguém prometeu que nunca mais.

Código registra muito mais do que instruções. O `if` estranho é uma
cicatriz: marca o lugar exato onde o mundo surpreendeu o sistema. A
gambiarra comentada é um bilhete honesto — *"sei que isto é feio, não tive
tempo, me perdoa"* — deixado para um leitor que o autor nunca vai conhecer.
A mensagem de commit de madrugada diz mais sobre um projeto do que qualquer
documentação. Nada disso foi escrito para contar uma história. Por isso
mesmo conta. **Código é o diário de quem não sabia que estava escrevendo um
diário.**

Deixa eu abrir o meu.

No mapa logístico que mantenho para a Prefeitura, cinquenta e quatro
unidades dividem o mesmo endereço — o Paço Municipal. Num mapa, cinquenta e
quatro pontos no mesmo lugar viram um ponto só; a informação desapareceria.
A decisão foi espalhá-los em espiral na tela, preservando a coordenada real
nos dados. Parece detalhe técnico. É uma posição sobre honestidade: a
verdade mora nos dados, a legibilidade mora na tela, e uma não pode
corromper a outra. Ali perto, uma nota avisa que a rua dos almoxarifados
tem outro nome no OpenStreetMap — um "Professor" a mais. A nota existe
porque um dia as rotas não fecharam até alguém encontrar o professor.
Cicatriz e curativo, na mesma linha.

Na Matrix, minha simulação de vida artificial em C, o README guarda um
aviso constrangedor — de propósito. O primeiro medidor de "modelo de mundo"
dos blocos estava quebrado: comparava o mundo com o próprio mundo e dava
nota máxima até para um bloco sem modelo nenhum, marchando contente para a
extinção. A conclusão que eu defendia com aquele número era falsa. O bug
era técnico; a vontade de acreditar no mostrador, não. A lição ficou
registrada por extenso: um mapa que não pode discordar do território não é
um mapa.

No conferidor de encargos que estou construindo em COBOL — aprendendo a
linguagem pelo caminho —, a linha mais importante não é código. É um
princípio: **o fiscalizado nunca fornece as duas pontas da comparação.** A
terceirizada entrega os fatos; a régua fica com o fiscal. Isso não veio de
livro de arquitetura. Veio do chão da gestão pública, de ver de perto que
conferência feita com a régua do fiscalizado não é conferência. Uma
desconfiança institucional inteira, comprimida numa decisão de design.

E este site, onde você me lê agora, começou com uma especificação:
dezesseis requisitos, seis regras de negócio, oito casos extremos. Cada
texto entra por um par de commits — primeiro o teste, depois a publicação —
e o changelog guarda as releases como quem guarda datas. A série de ensaios
que se fechou ontem existe duas vezes: em palavras, nas páginas; e em
arquitetura, no histórico. Test, feat, test, feat — um batimento por texto.

Aceitar que todo software conta uma história muda três coisas na prática.
Você passa a documentar contexto, não só comportamento — o *porquê* é a
única parte que o código não consegue contar sozinho. Passa a julgar menos
o código dos outros — quase todo código ruim é o registro fiel de um dia
difícil. E passa a escrever sabendo que alguém lê depois — nem que seja
você, daqui a dois anos, tentando lembrar quem era quando escreveu.

Passei os últimos meses publicando ensaios sobre memória, silêncio e
reconstrução, achando que inaugurava um diário. Estava só assumindo um que
já existia. Os repositórios contavam a história o tempo todo — em `if`s, em
notas de README, em mensagens de commit. A diferença é que agora eu sei que
estou escrevendo. E escrevo sabendo que alguém, um dia, lê.
