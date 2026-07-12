import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// CE-01 — frontmatter inválido faz o `astro build` real falhar com mensagem
// que identifica o arquivo. Usa outDir isolado para não tocar no dist/ da suíte.

const ARQUIVO = join(process.cwd(), 'src/content/artigos', '__ce01__invalido.md');

const CONTEUDO_INVALIDO = `---
titulo: Artigo inválido de teste
data: 2026-13-45
categoria: categoria-que-nao-existe
tags:
  - Tag Inválida
---

Sem descrição, com data impossível, categoria fora da lista e tag fora do padrão.
`;

describe('CE-01 — build falha com frontmatter inválido', () => {
  it('astro build sai com erro e aponta o arquivo problemático', () => {
    const outDir = mkdtempSync(join(tmpdir(), 'dist-ce01-'));
    writeFileSync(ARQUIVO, CONTEUDO_INVALIDO);
    try {
      const r = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 120_000,
      });
      const saida = `${r.stdout}\n${r.stderr}`;
      expect(r.status, 'build deveria falhar com frontmatter inválido').not.toBe(0);
      expect(saida).toContain('__ce01__invalido');
    } finally {
      unlinkSync(ARQUIVO);
      rmSync(outDir, { recursive: true, force: true });
    }
  }, 150_000);
});

// CE-06 — dois arquivos que slugificam para o mesmo endereço derrubam o build
// de verdade (a deduplicação silenciosa do loader não pode engolir a colisão).
const CORPO_VALIDO = (titulo: string) => `---
titulo: ${titulo}
descricao: artigo de teste de colisão
data: 2026-07-12
categoria: computacao
tags:
  - ia
---

corpo
`;

const COLISAO_A = join(process.cwd(), 'src/content/artigos', '__ce01__colisao a.md');
const COLISAO_B = join(process.cwd(), 'src/content/artigos', '__ce01__colisao-a.md');

describe('CE-06 — build falha com slugs colidentes', () => {
  it('astro build sai com erro nomeando os dois arquivos', () => {
    const outDir = mkdtempSync(join(tmpdir(), 'dist-ce06-'));
    writeFileSync(COLISAO_A, CORPO_VALIDO('Colisão A'));
    writeFileSync(COLISAO_B, CORPO_VALIDO('Colisão B'));
    try {
      const r = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 120_000,
      });
      const saida = `${r.stdout}\n${r.stderr}`;
      expect(r.status, 'build deveria falhar com slugs colidentes').not.toBe(0);
      expect(saida).toContain('__ce01__colisao a.md');
      expect(saida).toContain('__ce01__colisao-a.md');
    } finally {
      unlinkSync(COLISAO_A);
      unlinkSync(COLISAO_B);
      rmSync(outDir, { recursive: true, force: true });
    }
  }, 150_000);
});
