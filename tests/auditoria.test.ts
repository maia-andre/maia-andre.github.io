import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { avaliarAuditoria, mediana } from '../tools/auditoria-nucleo.mjs';

// INC-15 — RNF-E01/RNF-E04: a auditoria vira verificação executável do ciclo
// (`npm run auditoria`). Aqui testamos o núcleo de decisão; a execução real
// (Lighthouse + 320px) roda no script e é dirigida pelo /verify.

describe('RNF-E01 — mediana e veredito da auditoria', () => {
  it('mediana de 3 execuções absorve um outlier', () => {
    expect(mediana([100, 100, 97])).toBe(100);
    expect(mediana([97, 100, 100])).toBe(100);
    expect(mediana([100, 97, 96])).toBe(97);
    expect(mediana([0, 0.02, 0])).toBe(0);
  });

  it('aprova somente com perf e a11y cravados em 100 e CLS zerado (medianas)', () => {
    const aprovada = avaliarAuditoria({
      paginas: [
        { nome: 'Home', perf: [100, 100, 100], a11y: [100, 100, 100], cls: [0, 0, 0] },
        { nome: 'artigo', perf: [97, 100, 100], a11y: [100, 100, 100], cls: [0, 0.01, 0] },
      ],
      scroll320: [{ nome: 'Home', scrollWidth: 320, viewport: 320 }],
    });
    expect(aprovada.aprovado).toBe(true);
    expect(aprovada.falhas).toEqual([]);
  });

  it('reprova por perf < 100 na mediana, nomeando a página', () => {
    const r = avaliarAuditoria({
      paginas: [{ nome: 'busca', perf: [97, 97, 100], a11y: [100, 100, 100], cls: [0, 0, 0] }],
      scroll320: [],
    });
    expect(r.aprovado).toBe(false);
    expect(r.falhas.join(' ')).toContain('busca');
    expect(r.falhas.join(' ')).toContain('97');
  });

  it('reprova por a11y < 100 e por CLS de mediana não-zero', () => {
    const r = avaliarAuditoria({
      paginas: [
        { nome: 'matrix', perf: [100, 100, 100], a11y: [98, 98, 100], cls: [0, 0, 0] },
        { nome: 'artigo', perf: [100, 100, 100], a11y: [100, 100, 100], cls: [0.02, 0.03, 0.02] },
      ],
      scroll320: [],
    });
    expect(r.aprovado).toBe(false);
    expect(r.falhas.some((f) => f.includes('matrix'))).toBe(true);
    expect(r.falhas.some((f) => f.includes('artigo') && f.includes('CLS'))).toBe(true);
  });
});

describe('RNF-E04 — 320px sem scroll horizontal entra no veredito', () => {
  it('reprova quando alguma página vaza na horizontal a 320px', () => {
    const r = avaliarAuditoria({
      paginas: [],
      scroll320: [
        { nome: '/artigos/', scrollWidth: 320, viewport: 320 },
        { nome: '/projetos/matrix/', scrollWidth: 348, viewport: 320 },
      ],
    });
    expect(r.aprovado).toBe(false);
    expect(r.falhas.join(' ')).toContain('/projetos/matrix/');
    expect(r.falhas.join(' ')).toContain('348');
  });
});

describe('o ciclo tem a auditoria como comando executável', () => {
  it('npm run auditoria existe e o script cobre as 4 páginas e o 320px', () => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
    expect(pkg.scripts.auditoria).toBeDefined();
    const script = readFileSync(join(process.cwd(), 'tools/auditoria.mjs'), 'utf-8');
    for (const pagina of ['artigos/a-regua-que-desbota', 'projetos/matrix', 'busca']) {
      expect(script).toContain(pagina);
    }
    expect(script).toMatch(/320/);
    expect(script).toMatch(/lighthouse/i);
  });
});
