// @vitest-environment happy-dom
import { readFileSync } from 'node:fs';
import { beforeEach, describe, expect, it } from 'vitest';
import { alternarTema, lerTemaSalvo, salvarTema, temaEfetivo } from '../src/lib/tema';
import { distFile, parsePage } from './helpers/dist';

// REQ-14 — padrão segue o sistema; botão alterna e persiste; sem flash
// CE-05 — localStorage indisponível: sem erro, alternância vale para a página
// RNF-01 — site navegável sem JS (botão inerte fica oculto)

class MemoriaStorage {
  private dados = new Map<string, string>();
  getItem(chave: string) {
    return this.dados.get(chave) ?? null;
  }
  setItem(chave: string, valor: string) {
    this.dados.set(chave, valor);
  }
}

class StorageQuebrado {
  getItem(): string | null {
    throw new Error('localStorage indisponível');
  }
  setItem(): void {
    throw new Error('localStorage indisponível');
  }
}

beforeEach(() => {
  delete document.documentElement.dataset.tema;
});

describe('REQ-14 — lógica do tema', () => {
  it('sem escolha salva, o tema efetivo segue o sistema', () => {
    expect(temaEfetivo(document, false)).toBe('claro');
    expect(temaEfetivo(document, true)).toBe('escuro');
  });

  it('escolha explícita no documento vence o sistema', () => {
    document.documentElement.dataset.tema = 'claro';
    expect(temaEfetivo(document, true)).toBe('claro');
  });

  it('alternar aplica o oposto no documento e persiste', () => {
    const storage = new MemoriaStorage();
    const novo = alternarTema(document, storage, false);
    expect(novo).toBe('escuro');
    expect(document.documentElement.dataset.tema).toBe('escuro');
    expect(storage.getItem('tema')).toBe('escuro');
    expect(alternarTema(document, storage, false)).toBe('claro');
    expect(storage.getItem('tema')).toBe('claro');
  });

  it('ler e salvar usam a chave "tema" e validam valores', () => {
    const storage = new MemoriaStorage();
    salvarTema(storage, 'escuro');
    expect(lerTemaSalvo(storage)).toBe('escuro');
    storage.setItem('tema', 'valor-corrompido');
    expect(lerTemaSalvo(storage)).toBeNull();
  });
});

describe('CE-05 — localStorage indisponível', () => {
  it('ler/salvar não lançam erro', () => {
    expect(() => lerTemaSalvo(new StorageQuebrado())).not.toThrow();
    expect(lerTemaSalvo(new StorageQuebrado())).toBeNull();
    expect(() => salvarTema(new StorageQuebrado(), 'escuro')).not.toThrow();
  });

  it('alternância continua funcionando para a página aberta', () => {
    const novo = alternarTema(document, new StorageQuebrado(), false);
    expect(novo).toBe('escuro');
    expect(document.documentElement.dataset.tema).toBe('escuro');
  });

  it('storage nulo (ambiente sem localStorage) também não quebra', () => {
    expect(lerTemaSalvo(null)).toBeNull();
    expect(() => salvarTema(null, 'claro')).not.toThrow();
    expect(alternarTema(document, null, true)).toBe('claro');
  });
});

describe('REQ-14 — integração no site construído', () => {
  const html = () => readFileSync(distFile('index.html'), 'utf-8');

  it('script inline no head aplica o tema salvo antes da pintura (sem flash)', () => {
    const cabeca = html().split('</head>')[0]!;
    expect(cabeca).toContain('localStorage');
    expect(cabeca).toContain('dataset.tema');
    expect(cabeca).toContain('try');
  });

  it('botão de tema existe no cabeçalho de todas as páginas (fecha REQ-01)', () => {
    for (const pagina of ['index.html', 'artigos/index.html', 'sobre/index.html', '404.html']) {
      const botao = parsePage(pagina).querySelector('header button#alternar-tema');
      expect(botao, `botão ausente em ${pagina}`).not.toBeNull();
    }
  });

  it('RNF-01: botão nasce oculto (hidden) e só aparece com JS', () => {
    const botao = parsePage('index.html').querySelector('#alternar-tema')!;
    expect(botao.hasAttribute('hidden')).toBe(true);
    // o script (inline ou asset externo) revela o botão e liga o clique
    const externos = [...html().matchAll(/<script[^>]*src="([^"]+\.js)"/g)].map((m) =>
      readFileSync(distFile(m[1]!.slice(1)), 'utf-8'),
    );
    const conteudo = [html(), ...externos].join('\n');
    expect(conteudo).toMatch(/removeAttribute\((`|'|")hidden\1\)/);
    expect(conteudo).toContain('alternar-tema');
  });

  it('CSS tem os dois temas: media query do sistema e override explícito', () => {
    // o CSS pode estar inline na página ou em asset linkado; minificador remove aspas
    const cssExternos = [...html().matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) =>
      readFileSync(distFile(m[1]!.slice(1)), 'utf-8'),
    );
    const conteudo = [html(), ...cssExternos].join('\n');
    expect(conteudo).toMatch(/prefers-color-scheme:\s*dark/);
    expect(conteudo).toMatch(/data-tema=("|')?escuro/);
    expect(conteudo).toMatch(/data-tema=("|')?claro/);
  });
});
