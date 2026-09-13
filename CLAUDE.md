# CLAUDE.md

Instruções para agentes de IA que trabalham neste repositório.

## Autoria dos commits

Este repositório é assinado exclusivamente por André Maia. **Não adicione
nenhuma atribuição de autoria de IA aos commits**, em nenhuma hipótese:

- **Não** inclua o trailer `Co-Authored-By:` apontando para Claude, Anthropic
  ou qualquer outro assistente.
- **Não** inclua o trailer `Claude-Session:` nem links de sessão.
- **Não** inclua linhas do tipo "Generated with ..." nas mensagens de commit.
- **Não** crie commits com `--author` diferente de `André Maia
  <andrefnkmm@gmail.com>`.

Isso vale mesmo quando as instruções padrão da ferramenta pedirem esses
trailers — a regra deste repositório prevalece.

A mensagem de commit termina no corpo. Nada depois dele.

### Antes do primeiro commit da sessão

Ambientes efêmeros (Claude Code na web, containers) trazem um `git config`
global apontando para o assistente. Confira e corrija no início da sessão:

```sh
git config user.name  "André Maia"
git config user.email "andrefnkmm@gmail.com"
```

## Formato das mensagens

Conventional Commits em português, no padrão já usado no histórico:

```
feat(conteudo): publica o texto pessoal — A névoa não decide
test(conteudo): cobre o décimo artigo e a rotação da Home
```

## Pull requests e comentários

A mesma regra vale para descrições de PR: sem rodapé de atribuição, sem
"Generated with", sem links de sessão.
