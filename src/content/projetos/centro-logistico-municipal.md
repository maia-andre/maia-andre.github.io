---
nome: Centro Logístico Municipal — SJC
descricao: A malha logística das 543 unidades atendidas pelos almoxarifados municipais de São José dos Campos numa planilha-mestre única — e dela, um mapa interativo pronto para apresentar.
tecnologias:
  - Python
  - Leaflet
  - OSRM
  - OpenStreetMap
tags:
  - python
  - gestao-publica
  - logistica
destaque: true
---

## O estudo

A Prefeitura estuda implantar um **centro logístico municipal**: consolidar os
almoxarifados que hoje operam separados — Central, Saúde e Educação — em uma
operação única de recebimento, estoque e distribuição. O insumo básico é saber
**onde estão e quem atende** as 543 unidades consumidoras: escolas, UBSs,
hospitais, CRAS, ginásios, prédios administrativos.

## As entregas

- **Mapa interativo standalone** — abre em qualquer navegador, sem instalar
  nada: busca e filtro por almoxarifado, rota real de rua ao clicar (km e
  minutos via OSRM/OpenStreetMap), vínculos duplos visíveis (152 unidades são
  atendidas por dois almoxarifados) e ficha de materiais por unidade.
- **GeoJSON** das unidades para QGIS/ArcGIS, com vínculos e distâncias.
- **Planilha-mestre editável no Excel** — a única fonte da verdade (SSOT):
  tudo o mais deriva dela por dois scripts Python de biblioteca padrão pura.

## Como a base nasceu

Consolidada automaticamente a partir da planilha de controle do Almoxarifado
Central, da API do CNES (rede própria de saúde), dos microdados do Censo
Escolar INEP 2024 (+ coordenadas IPEA/geobr) e de geocodificação própria — com
um conferidor que compara a mestre com as fontes originais e só reporta
divergências, nunca escreve.

## Estado

Unidades, coordenadas e vínculos mapeados (100%); em andamento: regiões
pendentes e o peso logístico de cada ponto (frequência e volume de entrega),
que transformam um mapa de endereços em insumo de estudo de localização. O
repositório é privado por conter dados operacionais da Prefeitura.
