import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

// REQ-15 — push na main ⇒ build ⇒ publicação no GitHub Pages
// CE-08 — build quebrado não publica: o job de deploy depende do job de build,
// e o build roda a suíte inteira antes (portão de qualidade)

const CAMINHO = join(process.cwd(), '.github/workflows/deploy.yml');

function workflow() {
  return parse(readFileSync(CAMINHO, 'utf-8')) as {
    on: { push?: { branches?: string[] } };
    permissions?: Record<string, string>;
    jobs: Record<
      string,
      { needs?: string | string[]; steps?: Array<{ run?: string; uses?: string; with?: Record<string, unknown> }> }
    >;
  };
}

describe('REQ-15 — workflow de deploy', () => {
  it('existe e é YAML válido', () => {
    expect(existsSync(CAMINHO)).toBe(true);
    expect(() => workflow()).not.toThrow();
  });

  it('dispara em push na main', () => {
    expect(workflow().on.push?.branches).toContain('main');
  });

  it('tem as permissões exigidas pelo GitHub Pages', () => {
    const permissoes = workflow().permissions!;
    expect(permissoes.pages).toBe('write');
    expect(permissoes['id-token']).toBe('write');
    expect(permissoes.contents).toBe('read');
  });

  it('constrói o site e sobe o dist/ como artefato do Pages', () => {
    const passos = workflow().jobs.build!.steps!;
    const comandos = passos.map((p) => p.run).filter(Boolean);
    expect(comandos).toContain('npm ci');
    expect(comandos).toContain('npm run build');
    const upload = passos.find((p) => p.uses?.startsWith('actions/upload-pages-artifact'));
    expect(upload?.with?.path).toBe('dist');
  });

  it('publica com actions/deploy-pages', () => {
    const passos = workflow().jobs.deploy!.steps!;
    expect(passos.some((p) => p.uses?.startsWith('actions/deploy-pages'))).toBe(true);
  });
});

describe('CE-08 — build quebrado não publica', () => {
  it('a suíte de testes roda ANTES do build no mesmo job (portão de qualidade)', () => {
    const comandos = workflow()
      .jobs.build!.steps!.map((p) => p.run)
      .filter((c): c is string => Boolean(c));
    const posicaoTeste = comandos.findIndex((c) => c.includes('npm test'));
    const posicaoBuild = comandos.findIndex((c) => c === 'npm run build');
    expect(posicaoTeste).toBeGreaterThanOrEqual(0);
    expect(posicaoTeste).toBeLessThan(posicaoBuild);
  });

  it('o job de deploy só roda se o build inteiro passar (needs: build)', () => {
    const needs = workflow().jobs.deploy!.needs;
    expect(Array.isArray(needs) ? needs : [needs]).toContain('build');
  });
});
