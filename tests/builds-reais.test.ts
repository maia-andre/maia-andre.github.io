import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';

// Todos os testes que spawnam `astro build` REAL vivem neste único arquivo:
// dentro de um arquivo o Vitest roda sequencial, então o conteúdo temporário
// de um teste não contamina o build de outro (arquivos de teste paralelos
// compartilham o mesmo src/content/).
//
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

// CE-E01 (INC-12) — o frame do Matrix é asset obrigatório: build sem ele (ou
// com ele vazio) falha apontando o arquivo. Usa renomeio temporário + restore.
const FRAME = join(process.cwd(), 'src/assets', 'matrix-frame.txt');
const FRAME_GUARDADO = `${FRAME}.guardado`;

describe('CE-E01 — build falha sem o asset do frame do Matrix', () => {
  it('asset ausente: astro build sai com erro que aponta matrix-frame', () => {
    mkdirSync(join(process.cwd(), '.astro'), { recursive: true });
    const outDir = mkdtempSync(join(process.cwd(), '.astro', 'dist-cee01a-'));
    renameSync(FRAME, FRAME_GUARDADO);
    try {
      const r = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 120_000,
      });
      expect(r.status, 'build deveria falhar sem o asset').not.toBe(0);
      expect(`${r.stdout}\n${r.stderr}`).toContain('matrix-frame');
    } finally {
      renameSync(FRAME_GUARDADO, FRAME);
      rmSync(outDir, { recursive: true, force: true });
    }
  }, 150_000);

  it('asset vazio: astro build sai com erro que aponta matrix-frame', () => {
    const outDir = mkdtempSync(join(process.cwd(), '.astro', 'dist-cee01b-'));
    renameSync(FRAME, FRAME_GUARDADO);
    writeFileSync(FRAME, '\n\n');
    try {
      const r = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 120_000,
      });
      expect(r.status, 'build deveria falhar com o asset vazio').not.toBe(0);
      expect(`${r.stdout}\n${r.stderr}`).toContain('matrix-frame');
    } finally {
      unlinkSync(FRAME);
      renameSync(FRAME_GUARDADO, FRAME);
      rmSync(outDir, { recursive: true, force: true });
    }
  }, 150_000);
});

// CE-E02 (INC-13) — reflexões cujo primeiro parágrafo começa com não-letra
// renderiza SEM a capitular (build real, fixture temporária).
const ARTIGO_TRAVESSAO = join(process.cwd(), 'src/content/artigos', '__cee02__travessao.md');

describe('CE-E02 — reflexões começando com travessão renderiza sem capitular', () => {
  it('build real gera a página sem a classe prosa-capitular', () => {
    mkdirSync(join(process.cwd(), '.astro'), { recursive: true });
    const outDir = mkdtempSync(join(process.cwd(), '.astro', 'dist-cee02-'));
    writeFileSync(
      ARTIGO_TRAVESSAO,
      `---
titulo: Travessão de teste
descricao: fixture do CE-E02 — primeiro parágrafo começa com travessão
data: 2026-07-14
categoria: reflexoes
tags:
  - escrita
---

— Primeiro veio o travessão, depois a fala.
`,
    );
    try {
      const env = { ...process.env };
      for (const k of ['NODE_ENV', 'PROD', 'DEV', 'MODE', 'BASE_URL', 'TEST', 'VITEST', 'SSR'])
        delete env[k];
      const r = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 120_000,
        env,
      });
      expect(r.status, `build deveria passar: ${r.stdout}\n${r.stderr}`).toBe(0);
      const html = readFileSync(join(outDir, 'artigos/cee02-travessao/index.html'), 'utf-8');
      expect(html).toContain('class="prosa"');
      expect(html).not.toContain('prosa-capitular');
    } finally {
      unlinkSync(ARTIGO_TRAVESSAO);
      rmSync(outDir, { recursive: true, force: true });
    }
  }, 150_000);
});

// CE-07 — projeto só com campos obrigatórios renderiza sem seções opcionais
const PROJETO_MINIMO = join(process.cwd(), 'src/content/projetos', '__ce01__minimo.md');

describe('CE-07 — projeto só com campos obrigatórios renderiza sem seções opcionais', () => {
  it('build real gera a página sem repositório, links ou imagem', () => {
    mkdirSync(join(process.cwd(), '.astro'), { recursive: true });
    const outDir = mkdtempSync(join(process.cwd(), '.astro', 'dist-ce07-'));
    writeFileSync(
      PROJETO_MINIMO,
      `---
nome: Projeto Mínimo
descricao: só o obrigatório
tecnologias:
  - c
tags:
  - c
---

corpo do projeto mínimo
`,
    );
    try {
      const env = { ...process.env };
      for (const k of ['NODE_ENV', 'PROD', 'DEV', 'MODE', 'BASE_URL', 'TEST', 'VITEST', 'SSR'])
        delete env[k];
      const r = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 120_000,
        env,
      });
      expect(r.status, `build deveria passar: ${r.stdout}\n${r.stderr}`).toBe(0);
      // __ce01__minimo.md slugifica para ce01-minimo (underscores viram separadores)
      const html = parse(readFileSync(join(outDir, 'projetos/ce01-minimo/index.html'), 'utf-8'));
      const main = html.querySelector('main')!;
      expect(main.querySelector('h1')?.text).toContain('Projeto Mínimo');
      expect(main.querySelector('img')).toBeNull();
      expect(main.querySelector('.links-projeto')).toBeNull();
    } finally {
      unlinkSync(PROJETO_MINIMO);
      rmSync(outDir, { recursive: true, force: true });
    }
  }, 150_000);
});
