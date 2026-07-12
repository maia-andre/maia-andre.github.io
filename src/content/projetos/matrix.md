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
CSVs reproduzíveis bit-a-bit para análise, e uma série de notas de pesquisa em
`papers/notes/`. Pendentes: o custo do pensar (planejar fundo deixar de ser
grátis) e um auto-modelo de verdade — o self dentro da própria simulação.
