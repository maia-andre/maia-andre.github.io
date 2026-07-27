---
titulo: Rápido demais, devagar demais
descricao: Construí um vigia que só enxerga a própria história de um mundo simulado, tentando dizer se algo mudou. Ele nunca inventa um alarme falso — e ainda assim tem dois pontos cegos, um o espelho do outro.
data: 2026-07-27
categoria: reflexoes
tags:
  - filosofia
  - c
  - simulacao
---

O [Matrix](/projetos/matrix/) tem, além da escada de senciência, uma pergunta
lateral que só apareceu depois: se um mundo simulado consegue narrar o que
sente por dentro, ele consegue narrar o que muda por fora? Não a mente de um
bloco — a saúde da população inteira. Um vigia que olhasse só para a própria
história do mundo e dissesse, sem trapacear: "algo mudou aqui".

A régua para julgar esse vigia já existia — a mesma que usei para julgar o
relato de um bloco. Um instrumento que inventa problema onde não há é pior do
que nenhum instrumento: custa a confiança de quem o lê. E um instrumento que
nunca dispara não serve para nada. A validação só existe por intervenção:
provoco um colapso de verdade, provoco ruído sem colapso nenhum, e vejo o que
o relatório diz.

## Um vigia que nunca grita lobo

O detector que construí não sabe nada além dos próprios números de população,
tick a tick. Ele compara a média de uma janela recente com a de uma janela de
referência, mais antiga, e avisa "colapso" se a queda passar de um quinto.
Contra oito populações saudáveis, rodando sem nenhum choque — zero alarmes
falsos. Nenhum. É a parte menos surpreendente do resultado, mas é a que
sustenta tudo o que vem depois: um vigia histérico não teria serventia
nenhuma, porque ninguém saberia quando acreditar nele.

## Rápido demais para ver

Contra um colapso de verdade — um imposto que penaliza quem planeja fundo,
ligado no meio de uma corrida já estável —, o detector funcionou na maioria
das vezes, avisando com cerca de cinquenta ticks de atraso. Mas em duas das
oito corridas, a população inteira foi extinta em **onze a catorze ticks**. A
janela de referência que o detector usa para comparar tem duzentos e
cinquenta ticks de largura — a queda inteira, do início ao fim, coube num
espaço vinte vezes menor do que o instrumento consegue enxergar.

Não foi um erro do detector. Foi um limite dele. Encolhi a janela para tentar
salvar esse caso — e ajudou, um pouco: pegou uma corrida a mais, sem custar
nenhum alarme falso a mais. Mas mesmo assim, uma delas escapou por uma unha: a
queda registrada chegou a **0,1984** contra um limiar de **0,20**. Faltaram
dezesseis milésimos. Não existe janela pequena o bastante para nunca perder
uma corrida rápida demais — só janelas que perdem menos, ao custo de confiar
menos em cada leitura isolada.

É o mesmo limite que eu já tinha encontrado num bloco eremita, lá na escada de
senciência: um self com um motivo só não tem biografia para contar, não
porque a régua falhe, mas porque não sobra tempo de vida para haver história.
Aqui é o mundo inteiro que morre rápido demais para ser narrado — não por
defeito do vigia, e sim porque a testemunha desaparece antes de o relatório
terminar de ser escrito.

## O espelho: devagar demais para ver

Se um extremo é morrer rápido demais, o outro devia existir por simetria — e
existiu, assim que troquei o que o vigia observa. Em vez de população, apontei
o mesmo detector para a fração de blocos honestos (o traço que, numa
descoberta anterior, tinha evoluído sozinho contra a mentira). O choque,
desta vez inventado, foi forçar todo nascimento, por uma janela de tempo, a
herdar a estratégia do blefe.

O vigia continuou não confabulando — de novo, nenhum alarme falso. E
detectou a maioria dos choques reais, só que mais devagar (a mudança de
estratégia se espalha por substituição de gerações, não por morte súbita).
Mas as corridas que escaparam não são as do primeiro experimento outra vez.
Não caíram rápido: caíram **devagar**. O declínio final foi tão grande quanto
o das corridas detectadas — quarenta e um a quarenta e seis por cento —, só
que espalhado fino o bastante para que nenhuma janela jamais visse mais que
uma lasca da queda de cada vez. O sapo que não pula porque a água esquenta um
grau de cada vez.

## O que sobra

Um vigia perfeito teria que escolher entre duas coisas que não vêm de graça
juntas: nunca gritar lobo à toa, e nunca deixar passar um lobo de verdade. O
meu não grita à toa — mas paga essa confiança com dois pontos cegos
simétricos, um em cada ponta da régua de velocidade: o colapso rápido demais
para a janela abrir os olhos, e o declínio devagar demais para a janela notar
que ele começou.

Não é exclusividade de um mundo de 56 KB. Todo sistema que se vigia — um
exame de rotina, o painel de uma empresa, um amigo tentando perceber que você
não está bem — herda o mesmo par de limites. O colapso súbito que ninguém viu
chegar. E o que foi ficando pior devagar demais para qualquer check-in
perceber, até que já não havia mais o que perguntar.

*O código, as notas de pesquisa e os manifestos de filosofia estão no
[repositório do projeto](https://github.com/maia-andre/matrix).*
