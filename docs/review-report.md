# Review report — 2026-07-12
Spec: docs/spec.md (Versão 1, aprovada) | Incremento: INC-01 — Esqueleto executável | Build report: 2026-07-12
## VEREDITO: APROVADO

Suíte rodada pelo auditor: 18/18 passando (`npm test`). Verify-report sem FALHAs em aberto. Regressão: não se aplica (primeiro incremento); commits de docs anteriores intactos.

## Verificação requisito a requisito
| Item | Status | Evidência / Falha |
|------|--------|-------------------|
| REQ-01 | Atendido | `src/layouts/Base.astro` (nav com os 6 itens exatos, header/footer compartilhados, skip-link), `src/pages/404.astro`; dirigido no preview real (HTTP 200 na home, HTTP 404 com página customizada em rota inexistente); `tests/layout.test.ts` com asserções exatas de rótulo+href. **Observação vinculante**: o "botão de tema" citado no texto do REQ-01 foi adiado para o INC-08, onde o REQ-14 o exige explicitamente ("botão no cabeçalho alterna e persiste") — a revisão do INC-08 deve confirmá-lo; um botão inerte agora seria defeito de UX, e a matriz de cobertura do plano aprovado aloca o tema inteiro no INC-08. |
| REQ-16 | Atendido | `README.md` (o que é, stack, como rodar), `ROADMAP.md` (todas as seções futuras da spec), `CHANGELOG.md` (link keepachangelog.com + seção `## [Unreleased]`); `tests/repo-docs.test.ts` cobre conteúdo, não só existência. |
| RNF-04 | Atendido | `<html lang="pt-BR">` em `src/layouts/Base.astro`; asserção em ambas as páginas geradas. |
| RNF-05 | Atendido | Meta viewport testada; CSS sem nenhuma largura fixa em px (verificado por grep), container fluido `min(100% - 2*var(--espaco-pagina), 44rem)`, nav com `flex-wrap` — servidos de verdade (conferido no /verify). Checagem visual plena em 320px fica garantida pelo gate Lighthouse do INC-10 (RNF-02/03). |
| RN-06 | Atendido | `package.json` em `0.1.0` (SemVer testado), CHANGELOG documenta a convenção `v0.x.0 → v1.0.0`, rodapé exibe a versão lida do `package.json`. A tag da release é responsabilidade do `/ship`. |

## Qualidade dos testes (TDD)
- Ciclo vermelho→verde real e documentado: commit `test(inc-01)` com 16 falhas antes do `feat(layout)`; histórico prova o RED.
- Testes fazem asserções sobre o **HTML real do build** (globalSetup roda `astro build`), não sobre mocks — quebras de layout, rótulo, href, lang ou viewport ficariam vermelhas.
- Testes de docs verificam conteúdo obrigatório (stack, comandos, seções do roadmap, formato do changelog), não apenas existência de arquivo.
- Lacuna menor (não bloqueante): a exibição da versão no rodapé não tem asserção automatizada — coberta manualmente no /verify; sugerido absorver num teste quando o rodapé ganhar mais responsabilidade.
- Dois testes nasceram verdes (semver do package.json, index existe) por dependerem do scaffold pré-existente — aceitável, testam estado real.

## Segurança
- Nenhum achado. Site estático sem entrada de usuário nesta fase; Astro escapa interpolações por padrão e não há `set:html`/`innerHTML` (grep limpo).
- `npm audit`: 0 vulnerabilidades (astro 7.0.7, vitest 4).
- Sem segredos em código ou histórico git (hits do grep eram o nome da dependência `@azure/keyvault-secrets` no lockfile).
- Postura positiva: npm com allow-scripts bloqueou o postinstall do esbuild e o build funciona mesmo assim — manter.

## Correções necessárias (para o /build)
Nenhuma.
