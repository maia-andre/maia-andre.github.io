# Build report — 2026-07-12 (INC-10)
Spec: docs/spec.md (Versão 1, aprovada)
Incremento: INC-10 — Conteúdo real + qualidade final (v1.0.0)
Rodada: construção
Testes: 150 passando / 150 total — `npm test`

## Requisitos atendidos
- **RNF-02** — Atendido — Lighthouse (mobile, Chrome for Testing headless, preview local do build de produção): **Performance 100** na Home e **100** na página de artigo (meta: ≥95). Sem fontes externas, sem scripts de terceiros; JS mínimo bundlado (busca e tema).
- **RNF-03** — Atendido — Lighthouse **Accessibility 100** na Home e **100** no artigo (meta: ≥95). Complementos desta rodada: `aria-pressed` no botão de tema (nota vinculante do review do INC-08), refletindo o estado efetivo e acompanhando mudança de preferência do sistema; já existiam skip-link, foco visível, aria-live na busca, aria-current na navegação e contraste AA nos dois temas.

## Definição de concluído — itens de conteúdo desta rodada
- **4 projetos reais publicados**: Matrix (destaque do André), Centro Logístico Municipal — SJC, Conferidor de Encargos em COBOL e Observatório de Oportunidades Institucionais — resumos fiéis aos READMEs fornecidos em `docs/material/`; CLM sem link de repositório (privado; decisão registrada na spec). A troca da lista provisória da spec (LicitaDocs/Transporte SJC) pelos projetos reais foi registrada em `docs/spec.md` › Decisões.
- **2 artigos reais publicados**: "Construindo este site como um projeto de software" (computacao) e **"A régua que desbota"** (reflexoes) — o segundo derivado integralmente do material do Matrix (8 notas + FILOSOFIA v1–v3) fornecido pelo André, escrito sob a opção 1 escolhida por ele, sujeito à revisão de voz dele.
- Home destaca exatamente os 4 projetos reais; RN-02 agora observável em produção (2 artigos com a mesma data → desempate alfabético comprovado por teste).

## Casos extremos
Nenhum CE novo pertence ao INC-10 (cobertura do plano). Regressões de CE anteriores verdes na suíte (150/150).

## Ferramentas adicionadas
- `lighthouse` + `puppeteer` (devDependencies) e Chrome for Testing em `~/.cache/puppeteer` — auditorias reproduzíveis localmente; o postinstall do puppeteer é bloqueado pelo allow-scripts (navegador instalado via `npx puppeteer browsers install chrome`).

## Perguntas em aberto / pendências
- André deve revisar a voz do artigo "A régua que desbota" e dos textos de apresentação/Sobre — são Markdown editável, sem código envolvido.
- Foto na Home permanece adiada por decisão registrada (opcional no documento de visão).
