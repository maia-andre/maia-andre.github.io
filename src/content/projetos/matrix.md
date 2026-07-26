---
nome: Matrix — mundo procedural com blocos sencientes
descricao: Um experimento meio filosófico, meio de programação — uma "Matrix" de brinquedo em C puro, no terminal, onde blocos parecem vivos e a população evolui sozinha por seleção natural.
tecnologias:
  - C
tags:
  - c
  - filosofia
  - simulacao
destaque: true
repositorio: https://github.com/maia-andre/matrix
---

## A ideia central: a escada de senciência

Em vez de tentar criar *consciência* (o hard problem — indecidível e
paralisante), o projeto troca a pergunta metafísica por uma **funcional**: que
comportamentos associamos a um ser senciente, e quais conseguimos implementar?
Daí uma escada de 7 degraus, todos implementados: **reatividade, memória,
valência** (energia: viver × morrer), **modelo de mundo** (o bloco simula o
futuro e decide por ele), **agência** (motivos em conflito pesados pelo estado
interno), **auto-modelo** (o bloco lê sinais dos vizinhos e decide contando que
os outros também decidem) e **aprendizado** — os traços de personalidade são
herdados com mutação, e a seleção natural faz o resto.

Tudo roda no terminal, em ASCII, num único `main.c` sem dependências além da
libc. O universo inteiro é `f(seed)`: mesma semente, mundo idêntico, sempre —
determinístico por fora, aberto por dentro.

## A bateria de desbotamento

A parte mais dura do projeto é a **régua**: mostradores que medem se cada
palavra mental ("prevê", "quer", "integra", "diz de si") realmente carrega o
comportamento — por ablação (arranca-se a faculdade: a decisão muda?) e por
calibração (a estrutura interna bate com a realidade?). Os achados surpreendem:

- **A evolução extingue a agência** — num ensaio de invasão, o reflexo fixa
  contra o agente; ter um segundo motivo pesado pelo estado interno é
  individualmente caro.
- A honestidade **evolui sem multa artificial**: quando os blocos passam a
  emitir sinais (em vez de "telepatia"), a estratégia honesta fixa contra o
  silêncio e resiste ao blefe, sobrando ~10% de mentirosos estáveis.
- O primeiro mostrador de modelo de mundo estava **quebrado** — dava nota
  máxima até para blocos sem modelo nenhum. Consertá-lo inverteu a conclusão.

## A pílula vermelha

Durante a animação dá para **descer para dentro de um bloco** e ver o mundo só
como ele percebe — a vizinhança 3×3, o que ele sente e o que ele quer. A
diferença entre a visão de deus e a primeira pessoa é o assunto do
`FILOSOFIA.md` do repositório, o manifesto do projeto.

## Estado

Escada completa (níveis 0–6), bateria de desbotamento medindo ao vivo no HUD,
CSVs reproduzíveis bit-a-bit para análise, e o diário de pesquisa abaixo. Das
duas pendências originais, uma caiu: o self dentro da própria simulação **já
estava lá** (nota 09). A outra, o custo do pensar, virou a espinha dorsal de um
segundo paper: planejar fundo é um **bem posicional** — vantajoso para quem
pensa, ruim para o grupo —, com um ponto de equilíbrio que não é um vencedor
absoluto, mas um convite à convivência entre horizontes diferentes (notas
14–22). Um terceiro eixo nasceu depois: a Matrix como **microscópio**,
detectores que tentam narrar o próprio estado do mundo — colapso, nova
estratégia — sem confabular (notas 24–27).

## Diário de pesquisa

As notas de laboratório vivem no repositório, em
[`papers/notes/`](https://github.com/maia-andre/matrix/tree/main/papers/notes)
— datadas, amarradas aos commits que medem e reproduzíveis por script. São o
material bruto dos papers em preparação, e de vez em quando uma amadurece em
artigo, como [A régua que desbota](/artigos/a-regua-que-desbota/):

1. [Quatro réguas da mente, quatro modos de
   errar](https://github.com/maia-andre/matrix/blob/main/papers/notes/01-quatro-modos-de-errar.md)
   — submetidos a ablação, os quatro mostradores falham, cada um de um jeito;
   `modelo` dava nota máxima a um agente sem modelo nenhum.
2. [O teto de
   nascimentos](https://github.com/maia-andre/matrix/blob/main/papers/notes/02-o-teto-de-nascimentos.md)
   — um bug silencioso congelava a evolução por volta do tick 10.000; o
   conserto revelou uma regra de senioridade que ninguém escreveu.
3. [A evolução extingue a
   agência](https://github.com/maia-andre/matrix/blob/main/papers/notes/03-a-evolucao-extingue-a-agencia.md)
   — a suspeita contra a régua estava errada: é a agência que desaba; num
   ensaio de invasão, o reflexo fixa contra o agente.
4. [O `automodelo` era um modelo do
   outro](https://github.com/maia-andre/matrix/blob/main/papers/notes/04-o-automodelo-era-um-modelo-do-outro.md)
   — o teste do eremita mostra o mostrador identicamente zero sem rivais: ele
   media o outro, nunca o si.
5. [`phi` não media integração: media o segundo
   motivo](https://github.com/maia-andre/matrix/blob/main/papers/notes/05-phi-media-o-segundo-motivo.md)
   — a correlação com a profundidade de planejamento era co-tendência, e a
   `phi` velha era infalseável.
6. [O intérprete
   leigo](https://github.com/maia-andre/matrix/blob/main/papers/notes/06-o-interprete-leigo.md)
   — o primeiro mostrador pré-registrado antes do código: o relato que só vê o
   que um vizinho veria é falível mas informativo — e confabula selvagemente
   sob intervenção.
7. [O dedo do
   espectador](https://github.com/maia-andre/matrix/blob/main/papers/notes/07-o-dedo-do-espectador.md)
   — um dedo de fora do mundo sobrescreve escolhas e três introspecções
   relatam a mesma vida: quem lê a ação confabula, quem lê o plano detecta.
8. [O sinal e a
   mentira](https://github.com/maia-andre/matrix/blob/main/papers/notes/08-o-sinal-e-a-mentira.md)
   — a telepatia vira comunicação e a honestidade evolui sem multa artificial:
   fixa contra o silêncio e resiste ao blefe.
9. [O self já estava
   lá](https://github.com/maia-andre/matrix/blob/main/papers/notes/09-o-self-ja-estava-la.md)
   — a edição do auto-modelo já estava feita, numa linha que ninguém tinha
   lido assim; `autocausa` é o primeiro mostrador que o eremita tem.
10. [O zero
    estrutural](https://github.com/maia-andre/matrix/blob/main/papers/notes/10-o-zero-estrutural.md)
    — a dívida da nota anterior foi paga: os três zeros seguem zeros em
    precisão dupla, e o piso de arredondamento ganha explicação — float32 não
    inverte decisões, só cria empates.
11. [A
    replicação](https://github.com/maia-andre/matrix/blob/main/papers/notes/11-a-replicacao.md)
    — uma semente não é um resultado: repetir tudo com cinquenta confirma
    quase todos os achados anteriores, e expõe, sem esconder, um erro no
    próprio pré-registro.
12. [A janela
    longa](https://github.com/maia-andre/matrix/blob/main/papers/notes/12-a-janela-longa.md)
    — numa corrida dez vezes mais longa quase tudo se confirma, e o motor do
    crescimento do self muda de nome: não é o horizonte que empurra, é o
    motivo que se estreita.
13. [O
    fatorial](https://github.com/maia-andre/matrix/blob/main/papers/notes/13-o-fatorial.md)
    — travar os dois motores ao mesmo tempo trava o crescimento do self quase
    por completo: a prova final de que é um motor só, não dois disputando o
    crédito.
14. [O
    torneio](https://github.com/maia-andre/matrix/blob/main/papers/notes/14-o-torneio.md)
    — num torneio de todos contra todos, o mais fundo sempre vence o duelo;
    sem embate, o horizonte cresceria até o teto do próprio código (corrigido
    a seguir pela nota 16).
15. [O
    imposto](https://github.com/maia-andre/matrix/blob/main/papers/notes/15-o-imposto.md)
    — taxar o pensamento devolve a população ao ótimo do grupo, mas a conta é
    queimada: alinhar a escolha custa quase um terço da população.
16. [A varredura do
    desconto](https://github.com/maia-andre/matrix/blob/main/papers/notes/16-a-varredura-do-desconto.md)
    — variar a paciência do mundo derruba a conclusão do torneio anterior: em
    mundos mais pacientes a escada se inverte, e o mais fundo pode perder.
17. [Ruído ou
    teimosia](https://github.com/maia-andre/matrix/blob/main/papers/notes/17-ruido-ou-teimosia.md)
    — populações de um único tipo confirmam que a perda por planejar fundo
    demais é real, não artefato de comparação; e o pico de colheita nem fica
    no topo do horizonte.
18. [O erro do
    plano](https://github.com/maia-andre/matrix/blob/main/papers/notes/18-o-erro-do-plano.md)
    — o plano de um bloco só enxerga um passo à frente: a partir daí, a
    previsão perde toda relação com o que realmente vai acontecer.
19. [A grade
    fina](https://github.com/maia-andre/matrix/blob/main/papers/notes/19-a-grade-fina.md)
    — com uma régua mais fina de paciência, o ótimo não cai em degrau, tomba
    devagar, entre dois pontos bem próximos.
20. [O invasor
    raro](https://github.com/maia-andre/matrix/blob/main/papers/notes/20-o-invasor-raro.md)
    — o suposto campeão do torneio não é um vencedor absoluto: é um ponto de
    equilíbrio onde tipos raros dos dois lados conseguem crescer — mais
    convite à convivência do que resistência a invasão.
21. [O imposto que
    recicla](https://github.com/maia-andre/matrix/blob/main/papers/notes/21-o-imposto-que-recicla.md)
    — devolver a arrecadação do imposto cognitivo em vez de queimá-la resolve
    o dilema anterior: a população não só se recupera, termina um pouco melhor
    que antes do imposto.
22. [A sonda
    ordinal](https://github.com/maia-andre/matrix/blob/main/papers/notes/22-a-sonda-ordinal.md)
    — o plano erra o valor absoluto do que vai colher, mas acerta bem a ordem
    entre as opções — o suficiente para explicar por que planejar um pouco
    sempre ajuda.
23. [O teste de
    bimodalidade](https://github.com/maia-andre/matrix/blob/main/papers/notes/23-o-teste-de-bimodalidade.md)
    — no mesmo terreno da nota anterior, duas linhagens convivem lado a lado;
    mas na evolução completa e livre cada população converge para um pico só
    — o ponto de equilíbrio não desaparece, só fica invisível.
24. [O detector de
    colapso](https://github.com/maia-andre/matrix/blob/main/papers/notes/24-o-detector-de-colapso.md)
    — um detector que só observa a própria história da população nunca
    inventa um colapso que não existe, mas fica mudo quando o colapso de
    verdade é rápido demais para a própria janela de observação.
25. [A dose-resposta do
    detector](https://github.com/maia-andre/matrix/blob/main/papers/notes/25-a-dose-resposta-do-detector.md)
    — o limiar entre sobreviver e ser rápido demais para o detector notar não
    é gradual: é uma transição estreita, quase uma linha.
26. [Duas linhagens sem `h*`
    conhecido](https://github.com/maia-andre/matrix/blob/main/papers/notes/26-duas-linhagens-sem-h-conhecido.md)
    — um algoritmo que descobre sozinho se existem duas linhagens, sem saber
    de antemão onde procurar, confirma o achado anterior nos casos claros e
    desempata a favor de "apenas ruído de mutação" onde a nota anterior tinha
    deixado a dúvida em aberto.
27. [O detector de nova
    estratégia](https://github.com/maia-andre/matrix/blob/main/papers/notes/27-o-detector-de-nova-estrategia.md)
    — o mesmo detector, agora vigiando a honestidade em vez da população, acha
    o espelho do achado anterior: fica mudo não pelo colapso rápido demais,
    mas pelo devagar demais — o sapo fervendo.
28. [Mutação ou ramificação em
    δ=0,80](https://github.com/maia-andre/matrix/blob/main/papers/notes/28-mutacao-ou-ramificacao-em-delta-080.md)
    — desligar a mutação no ponto de equilíbrio dá uma resposta dividida: a
    maioria das populações volta a ser de um tipo só, mas algumas sustentam as
    duas linhagens mesmo sem reforço externo.
