import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { distFile, pageExists, parsePage } from './helpers/dist';

// INC-11 — Tipografia própria (REQ-E01/E02/E03, RNF-E02, CE-E04):
// Lora (corpo e títulos) + IBM Plex Mono (camada de registro), self-hosted,
// com font-display: swap, preload do que está acima da dobra, fallback com
// métricas ajustadas e orçamento de no máximo 4 woff2 somando 160 KB.

const FONTES_ESPERADAS = [
  'lora-var.woff2',
  'lora-var-italico.woff2',
  'plex-mono-400.woff2',
  'plex-mono-600.woff2',
].sort();

const ORCAMENTO_BYTES = 160 * 1024;

/** Todo o CSS que uma página de dist enxerga: folhas externas + <style> inline. */
function cssDaPagina(relPath = 'index.html'): string {
  const pagina = parsePage(relPath);
  const externos = pagina
    .querySelectorAll('link[rel="stylesheet"]')
    .map((l) => l.getAttribute('href'))
    .filter((href): href is string => Boolean(href))
    .map((href) => readFileSync(distFile(href.replace(/^\//, '')), 'utf-8'));
  const inline = pagina.querySelectorAll('style').map((s) => s.text);
  return [...externos, ...inline].join('\n');
}

/** Caminhada recursiva por dist coletando arquivos por extensão. */
function arquivosDeDist(extensoes: string[], dir = distFile('')): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = join(dir, entrada.name);
    if (entrada.isDirectory()) return arquivosDeDist(extensoes, caminho);
    return extensoes.some((ext) => entrada.name.endsWith(ext)) ? [caminho] : [];
  });
}

describe('REQ-E01/RNF-E02 — fontes próprias, self-hosted, dentro do orçamento', () => {
  it('todos os woff2 de dist são exatamente os 4 esperados, em /fontes/', () => {
    const woff2 = arquivosDeDist(['.woff2']);
    expect(woff2.map((c) => c.split('/').pop()).sort()).toEqual(FONTES_ESPERADAS);
    for (const caminho of woff2) expect(caminho).toContain('/fontes/');
  });

  it(`a soma dos woff2 respeita o orçamento de ${ORCAMENTO_BYTES / 1024} KB`, () => {
    const soma = arquivosDeDist(['.woff2'])
      .map((c) => statSync(c).size)
      .reduce((a, b) => a + b, 0);
    expect(soma).toBeGreaterThan(0);
    expect(soma).toBeLessThanOrEqual(ORCAMENTO_BYTES);
  });

  it('nenhum HTML ou CSS gerado referencia serviço de fontes de terceiros', () => {
    const proibidos = /fonts\.googleapis|fonts\.gstatic|use\.typekit|fonts\.bunny|fontshare/i;
    for (const caminho of arquivosDeDist(['.html', '.css'])) {
      expect(readFileSync(caminho, 'utf-8'), caminho).not.toMatch(proibidos);
    }
  });
});

describe('REQ-E02 — Lora no corpo e títulos, IBM Plex Mono na camada de registro', () => {
  const css = () => cssDaPagina();

  it('os tokens tipográficos apontam para as famílias próprias', () => {
    expect(css()).toMatch(/--fonte-corpo:\s*['"]?Lora['"]?/);
    expect(css()).toMatch(/--fonte-titulo:\s*['"]?Lora['"]?/);
    expect(css()).toMatch(/--fonte-registro:\s*['"]?IBM Plex Mono['"]?/);
  });

  it('corpo, títulos, registro e navegação consomem os tokens', () => {
    const conteudo = css();
    expect(conteudo).toMatch(/body\s*{[^}]*var\(--fonte-corpo\)/);
    expect(conteudo).toMatch(/h1,\s*h2,\s*h3,\s*h4\s*{[^}]*var\(--fonte-titulo\)/);
    expect(conteudo).toMatch(/\.registro\s*{[^}]*var\(--fonte-registro\)/);
    expect(conteudo).toMatch(/\.navegacao a\s*{[^}]*var\(--fonte-registro\)/);
  });

  it('datas, categoria, tags e tecnologias seguem na camada .registro no HTML', () => {
    const artigo = parsePage('artigos/a-regua-que-desbota/index.html').querySelector('main')!;
    expect(artigo.querySelector('.artigo-meta.registro, .registro.artigo-meta')).not.toBeNull();
    expect(artigo.querySelector('ul.lista-tags.registro, ul.registro.lista-tags')).not.toBeNull();
    const projeto = parsePage('projetos/matrix/index.html').querySelector('main')!;
    expect(projeto.querySelector('.registro.artigo-meta, .artigo-meta.registro')).not.toBeNull();
  });
});

describe('REQ-E03/CE-E04 — swap, preload seletivo e fallback métrico', () => {
  it('toda @font-face servida localmente usa font-display: swap', () => {
    const blocos = cssDaPagina()
      .split('@font-face')
      .slice(1)
      .map((b) => b.slice(0, b.indexOf('}')))
      .filter((b) => b.includes('/fontes/'));
    expect(blocos.length).toBe(4);
    for (const bloco of blocos) expect(bloco).toMatch(/font-display:\s*swap/);
  });

  it('preload das 3 faces acima da dobra (corpo, itálico da apresentação, mono da navegação)', () => {
    const preloads = parsePage('index.html')
      .querySelectorAll('link[rel="preload"]')
      .filter((l) => l.getAttribute('as') === 'font');
    const hrefs = preloads.map((l) => l.getAttribute('href'));
    expect(hrefs.sort()).toEqual([
      '/fontes/lora-var-italico.woff2',
      '/fontes/lora-var.woff2',
      '/fontes/plex-mono-400.woff2',
    ]);
    for (const link of preloads) {
      const href = link.getAttribute('href')!;
      expect(pageExists(href.replace(/^\//, '')), href).toBe(true);
      expect(link.getAttribute('crossorigin'), 'preload de fonte exige crossorigin').not.toBeNull();
    }
  });

  it('fallbacks métricos existem com size-adjust e ascent-override (CLS sem fonte)', () => {
    const conteudo = cssDaPagina();
    for (const familia of ['Lora Fallback', 'IBM Plex Mono Fallback']) {
      const bloco = conteudo
        .split('@font-face')
        .slice(1)
        .find((b) => b.slice(0, b.indexOf('}')).includes(familia));
      expect(bloco, `@font-face de "${familia}" ausente`).toBeDefined();
      expect(bloco).toMatch(/size-adjust:\s*[\d.]+%/);
      expect(bloco).toMatch(/ascent-override:\s*[\d.]+%/);
    }
  });

  it('o fallback tem face itálica própria e candidatos local() multiplataforma', () => {
    const blocos = cssDaPagina()
      .split('@font-face')
      .slice(1)
      .map((b) => b.slice(0, b.indexOf('}')))
      .filter((b) => b.includes('Lora Fallback'));
    expect(blocos.length, 'faces normal e itálica do Lora Fallback').toBe(2);
    expect(blocos.some((b) => /font-style:\s*italic/.test(b))).toBe(true);
    for (const bloco of blocos) {
      const candidatos = bloco.match(/local\(/g) ?? [];
      expect(candidatos.length, 'cada face precisa de 2+ candidatos local()').toBeGreaterThanOrEqual(
        2,
      );
    }
  });

  it('as pilhas terminam em família genérica — texto legível sem as fontes (CE-E04)', () => {
    const conteudo = cssDaPagina();
    expect(conteudo).toMatch(/--fonte-corpo:[^;]*serif\s*[;}]/);
    expect(conteudo).toMatch(/--fonte-titulo:[^;]*serif\s*[;}]/);
    expect(conteudo).toMatch(/--fonte-registro:[^;]*monospace\s*[;}]/);
  });
});
