# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue o [SemVer](https://semver.org/lang/pt-BR/): cada
incremento do [plano](docs/plan.md) entregue gera uma release `v0.x.0`, até a
`v1.0.0` fechar o escopo da primeira versão.

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
