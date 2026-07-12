# Verify report — 2026-07-12
Incremento: INC-01 — Esqueleto executável: Astro + layout base + repositório como projeto | Build report: 2026-07-12
Como rodei: `npm run build` + `npx astro preview --port 4399 --host 127.0.0.1` (porta isolada; sem env vars relevantes)
Suíte de testes: 18 passando / 18 total (`npm test`)

## Fluxos dirigidos
| Item | Fluxo exercitado | Evidência (comando → saída) | Resultado |
|------|------------------|-----------------------------|-----------|
| REQ-01 | Abrir a home no servidor de preview e inspecionar cabeçalho/navegação | `curl -w "%{http_code}" /` → `HTTP 200`; nav com os 6 links exatos: `<a href="/" aria-current="page">Início</a>`, `/artigos/`, `/projetos/`, `/tags/`, `/sobre/`, `/busca/` | FUNCIONA |
| REQ-01 | Layout compartilhado nas duas páginas | `grep -o '<header'\|'<footer'\|'<main'` → home: 1/1/1; 404: 1/1/1 | FUNCIONA |
| REQ-01 | Rota inexistente cai na 404 customizada | `curl -w "%{http_code}" /rota-que-nao-existe/` → `HTTP 404` + `<h1>Página não encontrada</h1>` com layout completo | FUNCIONA |
| REQ-16 | Conferir docs do repositório | `head README.md` → título e descrição corretos; `grep -c keepachangelog.com CHANGELOG.md` → 1; ROADMAP menciona Notas/RSS | FUNCIONA |
| RNF-04 | Idioma da página servida | `grep '<html lang'` → `<html lang="pt-BR"` | FUNCIONA |
| RNF-05 | Meta viewport e CSS responsivo realmente servidos | `name="viewport" content="width=device-width, initial-scale=1"`; CSS inline na página contém `width:min(100% - 2 * var(--espaco-pagina)` e `flex-wrap:wrap` | FUNCIONA |
| RN-06 | Versão SemVer visível no rodapé-carimbo | `grep -oE 'v0\.1\.0'` na home servida → `v0.1.0` | FUNCIONA |
| Acessibilidade (RNF-03, parcial) | Skip-link presente no HTML servido | `salto-conteudo" href="#conteudo"` | FUNCIONA |

## Falhas encontradas (para o /build)
Nenhuma.

## Não verificável de ponta a ponta
- **Renderização visual em 320px (RNF-05)**: sem navegador headless instalado na máquina; verifiquei o CSS servido (container fluido `min()`, `flex-wrap`, `clamp()`) e a meta viewport. A checagem visual plena fica para o INC-10 (auditoria Lighthouse), que exigirá navegador.
- **Botão de tema do REQ-01**: adiado para o INC-08 junto com REQ-14, conforme nota registrada no build-report e cobertura do plano.

Ambiente limpo: servidor de preview derrubado, arquivos de scratch removidos.
