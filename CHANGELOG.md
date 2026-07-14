# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue o [SemVer](https://semver.org/lang/pt-BR/): cada
incremento do [plano](docs/plan.md) entregue gera uma release `v0.x.0`, até a
`v1.0.0` fechar o escopo da primeira versão. Pós-v1, cada incremento da
[direção estética](docs/specs/direcao-estetica.md) gera `v1.x.0`.

## [1.1.0] — 2026-07-14 · INC-11 — Tipografia própria

Review APROVADO em 2026-07-14. Atende REQ-E01, REQ-E02, REQ-E03 e RNF-E02;
cobre CE-E04. Primeiro incremento da direção estética "híbrido código+letra".

### Adicionado

- Identidade tipográfica própria: **Lora** (serifada variável, com itálico)
  no corpo e nos títulos, **IBM Plex Mono** (400/600) na camada de registro —
  datas, categoria, tags, tecnologias e navegação
- Fontes self-hosted em 4 woff2 subsetados para pt-BR (95 KB no total, zero
  serviços de terceiros), com licenças OFL no repositório

### Qualidade

- Troca de fonte sem deslocamento de layout: fallbacks com métricas calibradas
  empiricamente (faces romana, itálica e bold próprias), preload das 3 faces
  acima da dobra e `font-display: swap` — Lighthouse mobile com **CLS 0,0000
  em 12/12 execuções, Performance 100 e Accessibility 100** nas quatro
  páginas auditadas

## [1.0.0] — 2026-07-12 · INC-10 — Conteúdo real e qualidade final

Review APROVADO em 2026-07-12. Atende RNF-02, RNF-03 e fecha a definição de
concluído da spec — **o backlog da v1 está completo**.

### Adicionado

- Os 4 projetos reais: Matrix (mundo procedural com blocos sencientes),
  Centro Logístico Municipal — SJC, Conferidor de Encargos em COBOL e
  Observatório de Oportunidades Institucionais
- Segundo artigo real: "A régua que desbota — o que um mundo de blocos me
  ensinou sobre medir a mente" (derivado das notas de pesquisa do Matrix)
- Botão de tema com estado acessível (`aria-pressed`)

### Qualidade

- Lighthouse (mobile): Performance 100 e Accessibility 100 na Home, artigo,
  projeto e busca — metas da spec eram ≥ 95

## [0.9.0] — 2026-07-12 · INC-09 — Deploy automático

Review APROVADO em 2026-07-12. Atende REQ-15; cobre CE-08.
**O site está no ar: <https://maia-andre.github.io>**

### Adicionado

- Deploy automático: push na `main` roda a suíte inteira, constrói e publica
  no GitHub Pages — build quebrado nunca chega ao ar (o site mantém a versão
  anterior, comprovado com um build de teste quebrado)

## [0.8.0] — 2026-07-12 · INC-08 — Tema claro/escuro

Review APROVADO em 2026-07-12. Atende REQ-14, RNF-01; cobre CE-05.

### Adicionado

- Tema escuro: por padrão o site segue a preferência do sistema; o botão no
  cabeçalho alterna e a escolha persiste entre visitas, sem flash ao carregar
- Sem JavaScript o site continua totalmente legível e navegável — o botão de
  tema só aparece quando há JS, e o tema segue o sistema via CSS puro

## [0.7.0] — 2026-07-12 · INC-07 — Busca

Review APROVADO em 2026-07-12. Atende REQ-13; cobre CE-02.

### Adicionado

- Página `/busca/` com busca instantânea no navegador (Fuse.js, sem serviços
  externos) por título, descrição, tag e categoria de artigos e projetos
- Índice JSON leve gerado no build, sem rascunhos
- Estado vazio para buscas sem resultado e aviso quando JavaScript está
  desabilitado

## [0.6.0] — 2026-07-12 · INC-06 — Tags

Review APROVADO em 2026-07-12. Atende REQ-11; cobre CE-03.

### Adicionado

- Página `/tags/` com todas as tags em uso e contagem de conteúdo
- Páginas `/tags/<tag>/` unindo artigos e projetos da tag
- Tags exibidas em qualquer lugar do site levam à página da tag
- Tags usadas apenas por rascunhos não existem no site publicado

## [0.5.0] — 2026-07-12 · INC-05 — Home e Sobre

Review APROVADO em 2026-07-12. Atende REQ-02, REQ-10, REQ-12, RN-04; cobre CE-04.

### Adicionado

- Home real: apresentação editável em Markdown com a mensagem principal,
  os 5 artigos mais recentes e até 4 projetos em destaque — seções somem
  quando não há conteúdo
- Página `/sobre/` com conteúdo Markdown editável (quem sou, por que escrevo,
  por que desenvolvo software, contato)
- Coleção de páginas fixas editáveis (`src/content/paginas/`)

### Segurança

- URLs de repositório e links de projetos restritas a http(s) — esquemas
  `javascript:` e `data:` rejeitados no build

## [0.4.0] — 2026-07-12 · INC-04 — Sistema de projetos

Review APROVADO em 2026-07-12. Atende REQ-08, REQ-09; cobre CE-07.

### Adicionado

- Coleção de projetos em Markdown validada no build: nome, descrição,
  tecnologias e tags obrigatórios; destaque, repositório, links e imagem
  opcionais
- Página `/projetos/` e páginas individuais `/projetos/<slug>/` com corpo
  livre para objetivos, roadmap e changelog; seções de campos ausentes não
  aparecem
- Primeiro projeto registrado: este próprio site

### Corrigido

- Guarda de slugs reservados não consulta mais a cadeia de protótipos
  (`Object.hasOwn`)
- Testes que rodam builds reais consolidados num único arquivo (conteúdo
  temporário de um teste não contamina mais o build de outro)

## [0.3.0] — 2026-07-12 · INC-03 — Listagens de artigos e rascunhos

Review APROVADO em 2026-07-12. Atende REQ-05, REQ-07, RN-02, RN-05.

### Adicionado

- Página `/artigos/` com todos os artigos publicados (título, descrição, data,
  categoria e tags) e navegação por categoria
- Páginas por categoria (`/artigos/computacao/`, `/artigos/gestao-publica/`,
  `/artigos/reflexoes/`) com estado vazio quando não há conteúdo
- Ordenação por data decrescente com desempate alfabético (colação pt-BR)
- Artigos com `rascunho: true` somem por completo do site publicado (sem
  página própria e fora de todas as listagens); no `astro dev` o autor
  continua pré-visualizando
- Rascunho real "Controle patrimonial na prática" (fixture permanente da
  garantia de rascunhos)

### Corrigido

- Suíte de testes não herda mais as variáveis de ambiente do Vitest
  (`PROD=""` falsy vazava rascunhos para o build interno da suíte)

## [0.2.0] — 2026-07-12 · INC-02 — Sistema de artigos

Review APROVADO na 2ª auditoria de 2026-07-12 (1ª reprovou o CE-06, corrigido).
Atende REQ-03, REQ-04, REQ-06, RN-01, RN-03, CE-01, CE-06.

### Adicionado

- Coleção de artigos em Markdown com frontmatter validado no build: título,
  descrição, data, categoria (Computação | Gestão Pública | Reflexões) e tags
  kebab-case obrigatórias; `atualizado` e `rascunho` opcionais
- Página do artigo em `/artigos/<slug>/` com data por extenso, categoria,
  tags linkadas e corpo Markdown com estilos de leitura
- Primeiro artigo real do arquivo: "Construindo este site como um projeto de software"
- Conteúdo inválido derruba o build apontando o arquivo — inclusive dois
  arquivos que gerariam o mesmo endereço (detecção de colisão de slugs no
  carregador, antes da deduplicação silenciosa)

## [0.1.0] — 2026-07-12 · INC-01 — Esqueleto executável

Review APROVADO em 2026-07-12. Atende REQ-01, REQ-16, RNF-04, RNF-05, RN-06.

### Adicionado

- Especificação da v1 (`docs/spec.md`) e plano de 10 incrementos (`docs/plan.md`)
- Projeto Astro com TypeScript estrito e suíte de testes Vitest sobre o build real
- Layout base compartilhado: cabeçalho com navegação, rodapé-carimbo com a
  versão do site e página 404 (INC-01)
- Identidade visual "ficha de registro": tipografia de sistema em três papéis
  (serifa para leitura, sans para títulos, mono para metadados) e accent único
  azul-carimbo, com tokens prontos para o tema escuro
- `README.md`, `ROADMAP.md` e este `CHANGELOG.md`
