# Spec: Direção estética — identidade tipográfica e frame do Matrix
Versão: 1 — 2026-07-14 | Status: aprovada

> Spec de funcionalidade pós-v1. Complementa a [spec v1](../spec.md) sem alterá-la;
> onde houver conflito, esta spec só **adiciona** — nenhum requisito da v1 é
> relaxado. Códigos desta spec usam o prefixo `E` (REQ-E01, RN-E01…) para não
> colidir com a numeração da v1.

## Objetivo

Dar ao site uma identidade visual própria que materialize sua mensagem — "entre
código, gestão pública e as coisas que escrevo para conseguir carregar" — na
direção **híbrida código+letra**: serifada literária para leitura longa, mono
para os metadados que lembram código. Inclui um elemento visual único: um frame
real da simulação Matrix, em ASCII, como hero da página do projeto. Público: os
mesmos leitores da v1; o que muda é a primeira impressão e o conforto de
leitura. Hoje o site usa apenas as fontes do sistema e listas de texto sem
tratamento visual.

## Escopo

### Requisitos funcionais

**Tipografia (direção híbrida)**
- **REQ-E01** — O site serve duas famílias tipográficas próprias, self-hosted
  em woff2 no próprio domínio: **Lora** (variável, com itálico) para corpo de
  texto e títulos, e **IBM Plex Mono** (regular e um peso de destaque) para
  metadados. Nenhuma fonte é carregada de domínio de terceiros.
- **REQ-E02** — Lora é a família computada do corpo dos artigos, das páginas de
  conteúdo e de todos os títulos (h1–h3). IBM Plex Mono é a família computada
  de: datas, categoria, tags, lista de tecnologias dos projetos, legenda do
  frame do Matrix e navegação do cabeçalho.
- **REQ-E03** — Carregamento sem regressão: `font-display: swap` em todas as
  `@font-face`; preload apenas dos arquivos usados acima da dobra; pilha de
  fallback com métricas ajustadas (`size-adjust`/`ascent-override`) para que a
  troca de fonte não cause deslocamento de layout perceptível (CLS = 0 nas
  auditorias).

**Frame do Matrix**
- **REQ-E04** — A página `/projetos/matrix/` exibe, entre o cabeçalho da página
  e o corpo do texto, um frame ASCII real da simulação, commitado como asset de
  texto no repositório do site (pré-gerado; o build do site não executa nem
  clona o repositório do Matrix).
- **REQ-E05** — O frame é apresentado como `<figure>` com `<figcaption>`; a
  arte ASCII fica em elemento com `aria-hidden="true"` (leitores de tela não a
  soletram) e a legenda registra a proveniência: seed, tick e commit do Matrix
  que o geraram (RN-E02).
- **REQ-E06** — O frame respeita os dois temas: as cores derivam das variáveis
  de tema existentes (claro e escuro), sem valores fixos que quebrem o
  contraste em um dos temas.

**Cards de projetos**
- **REQ-E07** — A listagem `/projetos/` e os destaques da Home apresentam cada
  projeto como card com contorno/relevo sutil, contendo nome, descrição e
  tecnologias (estas em mono, REQ-E02). A informação exibida é a mesma de hoje
  — nenhum campo novo, nenhum campo omitido.

**Letra capitular**
- **REQ-E08** — Artigos da categoria `reflexoes` abrem com letra capitular
  (drop cap) no primeiro parágrafo do corpo, via CSS. Artigos das demais
  categorias não têm capitular.

**Linha do tempo**
- **REQ-E09** — A listagem `/artigos/` apresenta os artigos ao longo de uma
  linha vertical com marcador por item, estilo diário. A ordenação RN-02 da v1
  e os dados exibidos por item permanecem exatamente os mesmos.

**Transições de página**
- **REQ-E10** — Navegação entre páginas usa View Transitions do Astro
  (`<ClientRouter />` no layout base): fade/deslizamento suave entre páginas.
  Com JavaScript desabilitado, a navegação tradicional continua funcionando
  integralmente (aprimoramento progressivo, RNF-01 da v1).

### Requisitos não-funcionais
- **RNF-E01** — Lighthouse (mobile) **Performance = 100 e Accessibility = 100**
  nas quatro páginas já auditadas (Home, artigo, projeto Matrix, busca),
  tomando a **mediana de 3 execuções** por página para absorver variância de
  medição.
- **RNF-E02** — Orçamento de fontes: no máximo 4 arquivos woff2 somando no
  máximo **160 KB**; subset latino (cobre pt-BR).
- **RNF-E03** — Todas as animações (transições de página e qualquer transição
  CSS nova) são desativadas sob `prefers-reduced-motion: reduce`.
- **RNF-E04** — Em viewport de 320px nada introduz scroll horizontal da página
  (RNF-05 da v1 vale para o frame, os cards e a linha do tempo).

## Regras de negócio
- **RN-E01** — O frame é capturado com **seed 42, tick 3000** (a seed e a
  janela usadas nas notas de pesquisa). Trocar o frame é decisão editorial:
  novo asset, nova legenda — nunca automático.
- **RN-E02** — A legenda do frame declara seed, tick e commit curto do Matrix,
  no espírito `f(seed)`: o mesmo mundo é reproduzível a partir do que a legenda
  registra.
- **RN-E03** — A capitular é um efeito puramente visual: o texto-fonte do
  artigo não muda, e cópia/leitura por leitor de tela recebem o parágrafo
  íntegro, sem marcação extra no Markdown.

## Casos extremos
- **CE-E01** (REQ-E04) — Asset do frame ausente ou vazio no build ⇒ o build
  **falha** apontando o arquivo esperado (mesma filosofia do CE-01 da v1: erro
  de conteúdo nunca chega ao ar silenciosamente).
- **CE-E02** (REQ-E08) — Primeiro parágrafo começando com caractere que não é
  letra (travessão, aspas, número) ⇒ sem capitular nesse artigo; nunca
  capitular em pontuação.
- **CE-E03** (REQ-E04, RNF-E04) — Em telas estreitas o frame escala
  tipograficamente e permanece contido no seu contêiner; se ilegível abaixo de
  480px, exibe recorte central — nunca scroll horizontal da página.
- **CE-E04** (REQ-E01/E03) — Falha no carregamento das fontes (rede, cache) ⇒
  o texto permanece legível na pilha de fallback do sistema; nenhum conteúdo
  fica invisível aguardando fonte.
- **CE-E05** (REQ-E10) — Navegador sem suporte a View Transitions ⇒ navegação
  normal sem erro no console.

## Fora de escopo
- Ilha interativa/canvas do Matrix animado (nível 5 da conversa de origem).
- Imagens de capa, OG images, `astro:assets` e qualquer pipeline de imagem.
- Mudanças de conteúdo, de coleções, de schema ou da busca.
- Alterações no repositório do Matrix (a captura do frame usa o que já existe).
- Refinos visuais fora dos itens listados (404, página de tags etc. herdam a
  tipografia por serem filhas do layout base, mas não ganham tratamento
  específico).

## Definição de concluído
- [ ] `dist/` contém no máximo 4 woff2 (≤ 160 KB somados) servidos localmente; nenhuma referência a fontes de terceiros no HTML/CSS gerado.
- [ ] Família computada confere com REQ-E02 nas páginas de artigo, projeto e Home (verificável por teste que inspeciona o CSS gerado e os seletores).
- [ ] `/projetos/matrix/` contém `<figure>` com frame ASCII `aria-hidden="true"` e `<figcaption>` com seed 42, tick 3000 e commit do Matrix.
- [ ] Build sem o asset do frame falha com mensagem que aponta o arquivo (CE-E01).
- [ ] `/projetos/` e Home renderizam cards com as tecnologias em mono; nenhum teste existente de conteúdo regride.
- [ ] Artigo de `reflexoes` tem regra CSS de capitular aplicada ao primeiro parágrafo; artigo de outra categoria não tem.
- [ ] `/artigos/` tem a estrutura da linha do tempo e a ordem da listagem segue idêntica à RN-02 da v1 (testes atuais passam sem alteração de expectativa de ordem).
- [ ] `<ClientRouter />` presente no layout base; com JS desabilitado a navegação funciona (teste existente de RNF-01 continua verde).
- [ ] Animações desativadas sob `prefers-reduced-motion: reduce` (RNF-E03).
- [ ] Lighthouse mobile: Performance = 100 e Accessibility = 100 (mediana de 3 execuções) na Home, artigo, projeto Matrix e busca.
- [ ] Viewport 320px sem scroll horizontal nas páginas alteradas (RNF-E04).
- [ ] Todos os testes automatizados passam.

## Perguntas em aberto
- Nenhuma.
