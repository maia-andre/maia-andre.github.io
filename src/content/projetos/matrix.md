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
estava lá** (nota 09). Seguem abertos o custo do pensar (planejar fundo deixar
de ser grátis) e as frentes que as notas 08 e 09 deixaram herdadas.

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
