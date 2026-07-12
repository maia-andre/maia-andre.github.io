# Plan: Site pessoal — arquivo vivo (v1)
Spec: docs/spec.md (Versão 1, aprovada) | Gerado: 2026-07-12
Progresso: 2/10 incrementos concluídos

Convenção de release (RN-06): cada incremento concluído via /ship gera a release `v0.<nº do incremento>.0`; o INC-10 fecha a `v1.0.0`.

## Backlog

### INC-01 — Esqueleto executável: Astro + layout base + repositório como projeto
Status: concluído (v0.1.0, 2026-07-12)
Itens da spec: REQ-01, REQ-16 | RNF-04, RNF-05 | RN-06
Depende de: —
Entrega verificável: `npm run dev` sobe o site com layout base (cabeçalho com navegação completa, rodapé, `lang="pt-BR"`, responsivo sem scroll horizontal) e página 404; `npm run build` e a suíte de testes rodam verdes; `README.md`, `ROADMAP.md` e `CHANGELOG.md` presentes e preenchidos.

### INC-02 — Coleção de artigos validada + página do artigo
Status: concluído (v0.2.0, 2026-07-12)
Itens da spec: REQ-03, REQ-04, REQ-06 | RN-01, RN-03 | CE-01, CE-06
Depende de: INC-01
Entrega verificável: um artigo Markdown de exemplo renderiza em `/artigos/<slug>/` com título, data, categoria e tags; testes provam que frontmatter inválido (categoria fora da lista, data malformada, campo ausente, tag fora do padrão kebab-case, slug duplicado) faz o build falhar apontando o arquivo.

### INC-03 — Listagens de artigos + rascunhos
Status: pendente
Itens da spec: REQ-05, REQ-07 | RN-02, RN-05
Depende de: INC-02
Entrega verificável: `/artigos/` e `/artigos/<categoria>/` listam artigos ordenados por data desc (empate por título); artigo com `rascunho: true` não tem página nem aparece em nenhuma listagem de produção.

### INC-04 — Sistema de projetos
Status: pendente
Itens da spec: REQ-08, REQ-09 | CE-07
Depende de: INC-02
Entrega verificável: `/projetos/` lista os projetos e `/projetos/<slug>/` renderiza a página individual; projeto sem `repositorio`, `links` ou `imagem` renderiza sem essas seções, comprovado por teste.

### INC-05 — Home + Sobre
Status: pendente
Itens da spec: REQ-02, REQ-10, REQ-12 | RN-04 | CE-04
Depende de: INC-03, INC-04
Entrega verificável: Home exibe apresentação com a mensagem principal, os 5 artigos mais recentes e até 4 projetos `destaque: true` (seções omitidas quando vazias, provado por teste); `/sobre/` renderiza o conteúdo Markdown editável.

### INC-06 — Tags
Status: pendente
Itens da spec: REQ-11 | CE-03
Depende de: INC-03, INC-04
Entrega verificável: `/tags/` lista as tags em uso com contagem; `/tags/<tag>/` lista artigos e projetos da tag; tags exibidas em artigos/projetos são links; tag usada só por rascunho não gera página (teste).

### INC-07 — Busca
Status: pendente
Itens da spec: REQ-13 | CE-02
Depende de: INC-03, INC-04
Entrega verificável: `/busca/` encontra artigos e projetos por título, descrição, tag e categoria via Fuse.js sobre índice JSON gerado no build (sem rascunhos); termo inexistente mostra estado vazio; com JS desabilitado a página informa que a busca requer JavaScript.

### INC-08 — Tema claro/escuro
Status: pendente
Itens da spec: REQ-14 | RNF-01 | CE-05
Depende de: INC-01
Entrega verificável: tema padrão segue `prefers-color-scheme`; botão no cabeçalho alterna e persiste em `localStorage` sem flash ao recarregar; com `localStorage` indisponível não há erro; com JS desabilitado o site inteiro permanece legível e navegável (aprimoramento progressivo).

### INC-09 — Deploy automático no GitHub Pages
Status: pendente
Itens da spec: REQ-15 | CE-08
Depende de: INC-01
Entrega verificável: push na `main` do repositório `maia-andre.github.io` dispara o workflow que builda e publica em `https://maia-andre.github.io`; um build quebrado marca o workflow como falho e o site mantém a última versão publicada.

### INC-10 — Conteúdo real + qualidade final (v1.0.0)
Status: pendente
Itens da spec: RNF-02, RNF-03
Depende de: INC-01–INC-09
Entrega verificável: 2 artigos reais e as páginas dos 4 projetos reais (LicitaDocs, Matrix, Observatório de Oportunidades, Transporte SJC) publicados em produção; Lighthouse (mobile) ≥ 95 em Performance e Accessibility na Home e em um artigo; navegação completa por teclado e contraste AA nos dois temas. Requer material de conteúdo fornecido pelo André.

## Cobertura
- REQ: 01→INC-01, 02→INC-05, 03→INC-02, 04→INC-02, 05→INC-03, 06→INC-02, 07→INC-03, 08→INC-04, 09→INC-04, 10→INC-05, 11→INC-06, 12→INC-05, 13→INC-07, 14→INC-08, 15→INC-09, 16→INC-01
- RNF: 01→INC-08, 02→INC-10, 03→INC-10, 04→INC-01, 05→INC-01
- RN: 01→INC-02, 02→INC-03, 03→INC-02, 04→INC-05, 05→INC-03, 06→INC-01
- CE: 01→INC-02, 02→INC-07, 03→INC-06, 04→INC-05, 05→INC-08, 06→INC-02, 07→INC-04, 08→INC-09

Todos os 35 itens da spec estão em exatamente um incremento; nenhum item ficou de fora e nenhum aparece duas vezes.
