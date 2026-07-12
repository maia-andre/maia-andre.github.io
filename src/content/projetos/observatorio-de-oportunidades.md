---
nome: Observatório de Oportunidades Institucionais
descricao: Plataforma que monitora continuamente prêmios, editais, emendas e programas federais e estaduais, consolidando tudo numa base única com classificação, busca e matching municipal.
tecnologias:
  - Python
  - FastAPI
  - SQLite
  - FTS5
tags:
  - python
  - gestao-publica
  - ia
destaque: true
repositorio: https://github.com/maia-andre/observatorio_oportunidades
---

## A ideia

A administração municipal perde oportunidades por não saber que elas existem:
premiações institucionais, certificações, programas federais e estaduais,
emendas parlamentares, convênios, chamamentos públicos, editais de
financiamento. O Observatório monta um radar proativo: **tudo que é
descoberto, de qualquer fonte, entra numa Inbox Institucional única** — e dela
segue para classificação, enriquecimento e distribuição.

## O pipeline hoje (PoC ponta a ponta)

Coleta de **15 feeds RSS + 3 APIs** (PNCP, FINEP e Portal da
Transparência/emendas) → porta de relevância que filtra ruído de notícia →
classificação ponderada multi-rótulo por regras → extração determinística de
prazos e valores (regex + leitura de PDF, com anti-contaminação) → **curadoria
LLM opcional** (resumo executivo + secretaria sugerida via Gemini free tier;
sem a chave, a pipeline segue 100% determinística) → busca full-text FTS5
acento-insensível → **matching municipal** com score de aderência 0–100
interpretável e ciclo de vida de prazos.

## As fases

Das seis fases evolutivas planejadas, cinco estão entregues em nível de PoC —
descoberta, radar centralizado com deduplicação, curadoria automatizada,
assistente (na variante determinística + LLM opcional) e matching
institucional. A fase final — o centro de inteligência, com monitoramento
legislativo e de indicadores — está em aberto, com os primeiros passos dados
(emendas e o ecossistema de prêmios/selos já mapeados e monitorados).

## A meta

Não perder nenhuma oportunidade relevante — e priorizar as de maior potencial
de sucesso para cada secretaria, reduzindo a dependência de monitoramento
manual.
