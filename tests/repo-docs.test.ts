import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// REQ-16 — README, ROADMAP e CHANGELOG presentes e preenchidos
// RN-06 — versionamento SemVer refletido em package.json e CHANGELOG

function readRepoFile(name: string): string {
  return readFileSync(join(process.cwd(), name), 'utf-8');
}

describe('REQ-16 — repositório como projeto de software', () => {
  it('README.md existe e documenta o que é, a stack e como rodar', () => {
    expect(existsSync(join(process.cwd(), 'README.md'))).toBe(true);
    const readme = readRepoFile('README.md');
    expect(readme).toContain('Astro');
    expect(readme).toContain('npm run dev');
    expect(readme).toContain('npm run build');
    expect(readme).toContain('npm test');
  });

  it('ROADMAP.md existe e lista as versões futuras', () => {
    expect(existsSync(join(process.cwd(), 'ROADMAP.md'))).toBe(true);
    const roadmap = readRepoFile('ROADMAP.md');
    for (const futuro of ['Notas', 'Currículo', 'Laboratório', 'Arquivo', 'RSS']) {
      expect(roadmap, `ROADMAP não menciona "${futuro}"`).toContain(futuro);
    }
  });

  it('CHANGELOG.md segue o formato Keep a Changelog', () => {
    expect(existsSync(join(process.cwd(), 'CHANGELOG.md'))).toBe(true);
    const changelog = readRepoFile('CHANGELOG.md');
    expect(changelog).toContain('keepachangelog.com');
    expect(changelog).toMatch(/^## \[/m);
  });
});

describe('RN-06 — versionamento SemVer', () => {
  it('package.json tem versão SemVer 0.x até a v1.0.0', () => {
    const pkg = JSON.parse(readRepoFile('package.json'));
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('CHANGELOG registra a versão atual ou a seção Unreleased', () => {
    const pkg = JSON.parse(readRepoFile('package.json'));
    const changelog = readRepoFile('CHANGELOG.md');
    const temVersaoAtual = changelog.includes(`## [${pkg.version}]`);
    const temUnreleased = /## \[(Unreleased|Não lançado)\]/.test(changelog);
    expect(temVersaoAtual || temUnreleased).toBe(true);
  });
});
