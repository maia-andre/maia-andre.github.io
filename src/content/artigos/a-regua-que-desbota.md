---
titulo: A régua que desbota — o que um mundo de blocos me ensinou sobre medir a mente
descricao: Construí uma simulação em C onde blocos parecem vivos e uma bateria de mostradores para medir quanto cada palavra mental se aplica a eles. As réguas quebraram — e as quebras foram os achados.
data: 2026-07-12
categoria: reflexoes
tags:
  - filosofia
  - c
  - simulacao
---

O [Matrix](/projetos/matrix/) começou com uma pergunta impossível — *podemos
criar um bloco senciente?* — e uma aposta metodológica: trocar a pergunta
metafísica por uma funcional. Em vez de "tem experiência?", perguntar **que
capacidades associamos a um ser senciente, e quais conseguimos implementar**.
Disso saiu uma escada de sete degraus (reatividade, memória, valência, modelo
de mundo, agência, auto-modelo, aprendizado), toda implementada num único
arquivo C, em ASCII, no terminal.

Subir a escada foi a parte fácil. O que este texto registra é o que veio
depois: a tentativa de **medir** — e como cada régua que construí quebrou de
um jeito diferente, ensinando mais na quebra do que teria ensinado
funcionando.

## Um mapa que não pode errar não é um mapa

O primeiro mostrador, `modelo`, deveria medir se o bloco "sabe" o que vai
colher. Ele dava nota **1,000** — perfeita — para um agente sem modelo de
mundo nenhum, marchando para a extinção. O defeito: a sonda lia o array do
mundo, não o mapa do bloco. Os dois lados da comparação eram a mesma fórmula.

A lição vale para qualquer métrica de calibração, em qualquer área: **um mapa
que é fotocópia do território não pode discordar dele — e um mapa que não pode
errar não é um mapa**. A marca da representação é a possibilidade da
des-representação. Desde então, todo mostrador do projeto nasce com uma
condição de falseamento declarada antes do código: *que ablação teria de
derrubá-lo a zero?* Se nenhuma, ele não mede nada.

## Quando a régua está certa e ninguém quer acreditar

Consertadas as réguas, elas começaram a dizer coisas incômodas — e por duas
vezes minha primeira reação foi acusar o instrumento.

O mostrador de agência desabava ao longo de 30 mil ticks. Suspeitei de
contaminação; congelei o traço que ele parecia rastrear e a leitura ficou
plana. A régua era estável. **O objeto é que estava morrendo**: num ensaio de
invasão, a política-reflexo (que ignora o próprio estado interno) fixa contra
a política-agente em ~6 mil ticks. Neste mundo, pesar um segundo motivo pelo
que se sente é individualmente caro — e a seleção natural extingue a agência.
O mesmo aconteceu, um andar acima, com a integração: quando o segundo motivo
morre, a decisão vira redutível a um módulo só.

A consequência filosófica não me deixou alternativa: **a escada de senciência
é reversível sob seleção**. Os degraus não são aquisições permanentes; são
posições num jogo que pode desmontá-las.

## O eremita mudo e o dedo do espectador

Dois experimentos fecharam o arco. No primeiro, um bloco "eremita" — que não
percebe os outros — zerou quase todos os mostradores mentais. O relato dele
não falhou por defeito: falhou porque **um self com um único motivo não tem
biografia** — nada a dizer acima do acaso. Boa parte do que a escada chama de
mente não é uma posse do bloco; é uma relação entre blocos.

No segundo, um dedo de fora do mundo sobrescreveu ~25% das escolhas, e três
arquiteturas de introspecção relataram a mesma vida: quem lê a ação
**confabula** (nomeia, convicto, motivos para atos que não escolheu — Gazzaniga
rodando em C); quem lê o plano não percebe; quem monitora os dois detecta
quase tudo — mas o teto epistêmico é este: a melhor introspecção possível
relata *"algo me moveu"*, nunca ***quem***. De dentro, física e espectador
entram pelo mesmo barramento.

## O que sobra

Sobrou até uma moral emergente: quando troquei a telepatia embutida por
comunicação de verdade, a honestidade **evoluiu sozinha** — fixou contra o
silêncio e venceu o blefe, sem nenhuma multa programada, restando ~10% de
mentirosos estáveis, o crime que nenhuma sociedade de sinais elimina de todo.

E o hard problem? Intocado — por construção. Tenho acesso total a esse mundo:
o código-fonte, a semente, o relógio, a vista de dentro. E saber *tudo* não
decide se há alguém lá. O acesso total não dissolve a pergunta; ele mostra que
**ela não é do tipo que o acesso responde**. Toda ferramenta que tenho é de
terceira pessoa; a pergunta é de primeira.

O que o projeto entrega, no fim, não é um veredito sobre consciência. É um
instrumento reprodutível que filma **até onde cada palavra mental estica antes
de desbotar** — sabendo, e dizendo, que o último centímetro não se mede. Esse
centímetro era o assunto desde o começo.

*O código, as notas de pesquisa e os manifestos de filosofia estão no
[repositório do projeto](https://github.com/maia-andre/matrix).*
