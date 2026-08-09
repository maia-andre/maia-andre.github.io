# Spec: Site pessoal — arquivo vivo (v1)
Versão: 1 — 2026-07-12 | Status: aprovada

## Objetivo
Construir o site estático pessoal de André Maia — um "arquivo vivo" que reúne artigos (técnicos, de gestão pública e pessoais), projetos de software e a página Sobre — publicado como site de usuário do GitHub Pages (`https://maia-andre.github.io`, repositório `maia-andre.github.io`), com Astro + Markdown + TypeScript. O repositório é tratado como projeto de software: README, ROADMAP, CHANGELOG e releases versionadas. Esta spec cobre exatamente os 8 itens do checklist "Primeira versão (v1)" do documento de visão.

## Escopo

### Requisitos funcionais

**Estrutura e layout**
- **REQ-01** — Layout base compartilhado por todas as páginas com cabeçalho (navegação: Início, Artigos, Projetos, Tags, Sobre, Busca + botão de tema) e rodapé. Existe página 404 customizada.
- **REQ-02** — Home contém: apresentação curta (texto editável em arquivo de conteúdo, com a mensagem principal "Entre código, gestão pública e as coisas que ainda estou tentando entender."), os 5 artigos mais recentes e os projetos em destaque.

**Artigos**
- **REQ-03** — Artigos são arquivos Markdown em coleção de conteúdo do Astro, com frontmatter validado no build (schema zod). Obrigatórios: `titulo`, `descricao`, `data` (YYYY-MM-DD), `categoria`, `tags` (mínimo 1). Opcionais: `atualizado` (data), `rascunho` (bool, default false).
- **REQ-04** — `categoria` aceita exatamente um valor entre `computacao`, `fundamentos`, `gestao-publica`, `reflexoes`. Valor fora da lista ou campo obrigatório ausente ⇒ o build falha apontando o arquivo (RN-01, CE-01).
- **REQ-05** — Página `/artigos/` lista todos os artigos publicados ordenados por RN-02, exibindo título, descrição, data, categoria e tags. Existem páginas por categoria (`/artigos/computacao/` etc.) com a mesma listagem filtrada.
- **REQ-06** — Cada artigo tem página própria em `/artigos/<slug>/` (slug = nome do arquivo), renderizando título, data, categoria, tags (linkadas) e o corpo Markdown.
- **REQ-07** — Artigo com `rascunho: true` não existe no build de produção: sem página própria, fora de todas as listagens, das tags e do índice de busca (RN-05).

**Projetos**
- **REQ-08** — Projetos são arquivos Markdown em coleção própria. Obrigatórios: `nome`, `descricao`, `tecnologias` (lista), `tags` (mínimo 1). Opcionais: `destaque` (bool, default false), `repositorio` (URL), `links` (lista de {rotulo, url}), `imagem` (capa). Corpo Markdown livre para objetivos, roadmap e changelog do projeto.
- **REQ-09** — Página `/projetos/` lista todos os projetos; cada projeto tem página própria em `/projetos/<slug>/`. Seções de campos opcionais ausentes simplesmente não são renderizadas (CE-07).
- **REQ-10** — Projetos com `destaque: true` aparecem na Home (até 4; RN-04).

**Tags**
- **REQ-11** — Toda tag exibida é um link para `/tags/<tag>/`, que lista artigos e projetos que a usam. `/tags/` lista todas as tags em uso com contagem de conteúdo. Só existem páginas para tags efetivamente usadas por conteúdo publicado (CE-03).

**Sobre**
- **REQ-12** — Página `/sobre/` com conteúdo Markdown editável cobrindo: quem sou, por que escrevo, por que desenvolvo software, como entrar em contato.

**Busca**
- **REQ-13** — Página `/busca/` com campo de texto que consulta, via Fuse.js no cliente, um índice JSON gerado no build contendo título, descrição, tags e categoria de todos os artigos e projetos publicados. Resultados linkam para as páginas; sem resultados ⇒ mensagem de estado vazio (CE-02).

**Tema**
- **REQ-14** — Tema claro/escuro: padrão segue `prefers-color-scheme`; botão no cabeçalho alterna e persiste a escolha em `localStorage`; script inline no `<head>` evita flash de tema errado no carregamento.

**Deploy e repositório**
- **REQ-15** — Workflow de GitHub Actions: push na `main` ⇒ build do Astro ⇒ publicação no GitHub Pages. Build com erro não publica (CE-08).
- **REQ-16** — O repositório contém `README.md` (o que é, stack, como rodar e publicar), `ROADMAP.md` (recursos futuros do documento de visão, por versão) e `CHANGELOG.md` no formato Keep a Changelog, mantidos a cada release (RN-06).

### Requisitos não-funcionais
- **RNF-01** — Site 100% estático. Leitura e navegação funcionam sem JavaScript; JS é usado apenas para busca e alternância manual de tema (aprimoramento progressivo).
- **RNF-02** — Performance: Lighthouse Performance ≥ 95 (mobile) na Home e em uma página de artigo; sem fontes ou scripts de terceiros bloqueantes.
- **RNF-03** — Acessibilidade: Lighthouse Accessibility ≥ 95; navegação completa por teclado; contraste AA nos dois temas.
- **RNF-04** — Conteúdo e interface em português do Brasil (`lang="pt-BR"`).
- **RNF-05** — Layout responsivo e legível de 320px a desktop, sem scroll horizontal; design minimalista conforme o documento de visão (tipografia confortável, muito espaço em branco, poucas cores).

## Regras de negócio
- **RN-01** — Categorias válidas (slugs exatos): `computacao`, `fundamentos`, `gestao-publica`, `reflexoes` — exibidas como "Computação", "Fundamentos", "Gestão Pública", "Reflexões". Um artigo tem exatamente uma categoria; subtópicos do documento de visão são tags livres. `fundamentos` entrou em 2026-08-08 (v1.6.0), para a série que explica os conceitos que sustentam software — o lado didático de `computacao`.
- **RN-02** — Ordenação de listagens de artigos: `data` decrescente; empate resolvido por título em ordem alfabética.
- **RN-03** — Tags são kebab-case minúsculo (`^[a-z0-9]+(-[a-z0-9]+)*$`, acentos não permitidos); tag fora do padrão ⇒ build falha apontando o arquivo.
- **RN-04** — Home exibe no máximo 5 artigos recentes e no máximo 4 projetos em destaque; havendo menos, exibe os existentes; havendo zero, a seção é omitida (CE-04).
- **RN-05** — `rascunho: true` remove o conteúdo de produção por completo: página, listagens, categoria, tags e índice de busca.
- **RN-06** — Versionamento do site em SemVer: incrementos entregues geram releases `v0.x.0`; quando os 8 itens do escopo estiverem publicados com o conteúdo real mínimo, tag `v1.0.0`.

## Casos extremos
- **CE-01** (REQ-03/04) — Frontmatter inválido (categoria fora da lista, data malformada, campo obrigatório ausente, tag fora do padrão) ⇒ build falha com erro que identifica o arquivo.
- **CE-02** (REQ-13) — Busca sem resultados ⇒ mensagem "nenhum resultado", sem erro no console. Com JS desabilitado, a página informa que a busca requer JavaScript.
- **CE-03** (REQ-11) — Tag usada apenas por rascunhos ⇒ não gera página nem aparece em `/tags/`.
- **CE-04** (REQ-02/10) — Menos conteúdo que os limites da Home ⇒ exibe o que existe; zero ⇒ seção omitida.
- **CE-05** (REQ-14) — `localStorage` indisponível ⇒ tema segue o sistema e a alternância vale apenas para a página aberta, sem erro.
- **CE-06** (REQ-06/09) — Dois arquivos que resultem no mesmo slug na mesma coleção ⇒ build falha.
- **CE-07** (REQ-09) — Projeto sem `repositorio`, `links` ou `imagem` ⇒ página renderiza normalmente sem essas seções.
- **CE-08** (REQ-15) — Build falha na `main` ⇒ GitHub Pages mantém a última versão publicada e o workflow acusa falha.

## Fora de escopo
Notas, Currículo, Laboratório, Arquivo, RSS, sitemap, SEO avançado, índice automático, tempo estimado de leitura, artigos relacionados, busca instantânea/em texto completo, compartilhamento, estatísticas, comentários, newsletter e internacionalização. Tudo isso vai para o `ROADMAP.md` como versões futuras.

## Definição de concluído
- [ ] Site publicado em `https://maia-andre.github.io` pelo workflow do GitHub Actions a partir da `main`
- [ ] 2 artigos reais publicados e as páginas dos 4 projetos reais (Matrix, Centro Logístico Municipal, Conferidor de Encargos em COBOL, Observatório de Oportunidades) no ar
- [ ] Dado um novo artigo Markdown válido commitado na `main`, após o deploy ele aparece na Home, em `/artigos/`, na página da sua categoria, nas páginas das suas tags e na busca
- [ ] Dado um artigo com `rascunho: true`, nada dele existe no site publicado
- [ ] Alternar o tema e recarregar a página mantém o tema escolhido
- [ ] Buscar uma tag existente em `/busca/` retorna o conteúdo esperado; buscar termo inexistente mostra o estado vazio
- [ ] Um arquivo com frontmatter inválido faz o build falhar (coberto por teste automatizado)
- [ ] Lighthouse Performance ≥ 95 e Accessibility ≥ 95 na Home e em um artigo (mobile)
- [ ] `README.md`, `ROADMAP.md` e `CHANGELOG.md` presentes e preenchidos
- [ ] Todos os testes automatizados passam

## Perguntas em aberto
- Foto na Home (o documento de visão diz "opcional") — decisão adiada para quando o conteúdo real for escrito (definido em 2026-07-12).

## Specs de funcionalidades pós-v1
- [Direção estética — identidade tipográfica e frame do Matrix](specs/direcao-estetica.md) (2026-07-14, aprovada) — não altera nenhum requisito desta spec; códigos com prefixo `E`.

## Decisões registradas
- Usuário do GitHub: `maia-andre` ⇒ repositório `maia-andre.github.io`, publicado em `https://maia-andre.github.io` (2026-07-12).
- Os 4 projetos da v1 são os do material real fornecido pelo André em 2026-07-12: Matrix, Centro Logístico Municipal (SJC), Conferidor de Encargos em COBOL (frank_cobol) e Observatório de Oportunidades — substituindo a lista provisória do documento de visão (LicitaDocs e Transporte SJC ficam para depois, como conteúdo novo sem mudança de código).
- O repositório do Centro Logístico é privado ⇒ a página do projeto não exibe link de repositório (campo opcional, CE-07).
