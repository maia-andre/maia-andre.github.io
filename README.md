# maia-andre.github.io

Site pessoal de André Maia — um arquivo vivo que reúne artigos sobre computação,
gestão pública e reflexões pessoais, além dos projetos de software em andamento.

> Entre código, gestão pública e as coisas que ainda estou tentando entender.

Publicado em <https://maia-andre.github.io>.

## Stack

- [Astro](https://astro.build) — gerador de site estático
- Markdown — todo o conteúdo
- TypeScript (strict) — componentes e testes
- [Vitest](https://vitest.dev) — testes automatizados sobre o build real
- GitHub Actions + GitHub Pages — deploy automático

## Como rodar

```bash
npm install       # dependências
npm run dev       # servidor de desenvolvimento em http://localhost:4321
npm run build     # build estático em dist/
npm run preview   # serve o build local
npm test          # constrói o site e roda a suíte de testes
npm run auditoria # Lighthouse ×3 nas 4 páginas (100/100, CLS 0) + 320px sem scroll
```

## Como o projeto evolui

Este repositório é tratado como um projeto de software: a especificação vive em
[`docs/spec.md`](docs/spec.md), o backlog de incrementos em
[`docs/plan.md`](docs/plan.md), as versões futuras em [`ROADMAP.md`](ROADMAP.md)
e cada release é registrada no [`CHANGELOG.md`](CHANGELOG.md) seguindo SemVer —
incrementos entregues geram releases `v0.x.0` até a `v1.0.0`.

## Estrutura

```
src/
├── layouts/    # layout base compartilhado
├── pages/      # rotas do site
└── styles/     # identidade visual (tokens em CSS custom properties)
tests/          # suíte Vitest que valida o build real em dist/
docs/           # spec e plano de incrementos
```
