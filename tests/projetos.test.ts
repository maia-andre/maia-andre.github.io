import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { esquemaProjeto } from '../src/lib/conteudo';
import { pageExists, parsePage } from './helpers/dist';

// REQ-08 — coleção de projetos com frontmatter validado
// REQ-09 — /projetos/ e /projetos/<slug>/; seções opcionais ausentes não renderizam
// CE-07 — projeto só com campos obrigatórios renderiza sem as seções opcionais

const valido = {
  nome: 'Projeto X',
  descricao: 'Uma descrição',
  tecnologias: ['python'],
  tags: ['ia'],
};

describe('REQ-08 — schema do projeto', () => {
  it('aceita frontmatter completo e aplica destaque=false por padrão', () => {
    const r = esquemaProjeto.safeParse(valido);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.destaque).toBe(false);
  });

  it('aceita os opcionais destaque, repositorio, links e imagem', () => {
    const r = esquemaProjeto.safeParse({
      ...valido,
      destaque: true,
      repositorio: 'https://github.com/maia-andre/x',
      links: [{ rotulo: 'Demo', url: 'https://exemplo.dev' }],
      imagem: '/imagens/x.png',
    });
    expect(r.success).toBe(true);
  });

  it.each(['nome', 'descricao', 'tecnologias', 'tags'])(
    'rejeita frontmatter sem o campo obrigatório %s',
    (campo) => {
      const { [campo as keyof typeof valido]: _omitido, ...resto } = valido;
      expect(esquemaProjeto.safeParse(resto).success).toBe(false);
    },
  );

  it('rejeita tecnologias e tags vazias (mínimo 1)', () => {
    expect(esquemaProjeto.safeParse({ ...valido, tecnologias: [] }).success).toBe(false);
    expect(esquemaProjeto.safeParse({ ...valido, tags: [] }).success).toBe(false);
  });

  it('rejeita tag fora do padrão kebab-case (RN-03 compartilhada)', () => {
    expect(esquemaProjeto.safeParse({ ...valido, tags: ['Gestão'] }).success).toBe(false);
  });

  it('rejeita repositorio e links com URL inválida', () => {
    expect(esquemaProjeto.safeParse({ ...valido, repositorio: 'não-é-url' }).success).toBe(false);
    expect(
      esquemaProjeto.safeParse({ ...valido, links: [{ rotulo: 'x', url: 'nope' }] }).success,
    ).toBe(false);
  });

  it('rejeita esquemas de URL fora de http(s) — javascript:, data: (hardening)', () => {
    expect(
      esquemaProjeto.safeParse({ ...valido, repositorio: 'javascript:alert(1)' }).success,
    ).toBe(false);
    expect(
      esquemaProjeto.safeParse({ ...valido, links: [{ rotulo: 'x', url: 'data:text/html,oi' }] })
        .success,
    ).toBe(false);
    expect(
      esquemaProjeto.safeParse({ ...valido, repositorio: 'http://exemplo.dev' }).success,
    ).toBe(true);
  });
});

describe('REQ-09 — páginas de projetos', () => {
  const SLUG = 'site-pessoal';
  const PAGINA = `projetos/${SLUG}/index.html`;

  it('gera /projetos/ listando o projeto com nome, descrição e tecnologias', () => {
    expect(pageExists('projetos/index.html')).toBe(true);
    const main = parsePage('projetos/index.html').querySelector('main')!;
    const link = main
      .querySelectorAll('a')
      .find((a) => a.getAttribute('href') === `/projetos/${SLUG}/`);
    expect(link, 'link do projeto ausente').toBeDefined();
    expect(main.text).toContain('Astro');
    expect(main.text).toContain('arquivo vivo');
  });

  it('gera a página individual com nome, descrição, tecnologias e corpo', () => {
    expect(pageExists(PAGINA)).toBe(true);
    const main = parsePage(PAGINA).querySelector('main')!;
    expect(main.querySelector('h1')?.text).toContain('Site pessoal');
    expect(main.text).toContain('TypeScript');
    expect(main.querySelectorAll('p').length).toBeGreaterThan(1);
  });

  it('linka o repositório quando presente e lista as tags', () => {
    const hrefs = parsePage(PAGINA)
      .querySelectorAll('main a')
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/maia-andre/maia-andre.github.io');
    expect(hrefs).toContain('/tags/astro/');
  });

  it('CE-07 (parcial): sem imagem não há <img>; com só repositório, a seção de links tem 1 link', () => {
    const main = parsePage(PAGINA).querySelector('main')!;
    expect(main.querySelector('img')).toBeNull();
    expect(main.querySelectorAll('.links-projeto a')).toHaveLength(1);
  });
});

// O CE-07 de build real (projeto só com campos obrigatórios) vive em
// tests/builds-reais.test.ts junto com os demais testes que spawnam builds —
// arquivos paralelos compartilhariam src/content/ e contaminariam builds.
