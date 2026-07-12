import { describe, expect, it } from 'vitest';
import {
  CATEGORIAS,
  PADRAO_TAG,
  esquemaArtigo,
  garantirSlugsUnicos,
} from '../src/lib/conteudo';

// REQ-03 — frontmatter validado (obrigatórios e opcionais)
// REQ-04 / RN-01 — categoria restrita às três da spec
// RN-03 — tags kebab-case minúsculo
// CE-06 — slugs duplicados derrubam o build

const valido = {
  titulo: 'Um artigo',
  descricao: 'Uma descrição',
  data: new Date('2026-07-12'),
  categoria: 'computacao',
  tags: ['astro'],
};

describe('REQ-03 — schema do artigo', () => {
  it('aceita frontmatter completo e aplica rascunho=false por padrão', () => {
    const r = esquemaArtigo.safeParse(valido);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.rascunho).toBe(false);
      expect(r.data.data).toBeInstanceOf(Date);
    }
  });

  it('aceita os opcionais atualizado e rascunho', () => {
    const r = esquemaArtigo.safeParse({
      ...valido,
      atualizado: new Date('2026-07-13'),
      rascunho: true,
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.rascunho).toBe(true);
  });

  it.each(['titulo', 'descricao', 'data', 'categoria', 'tags'])(
    'rejeita frontmatter sem o campo obrigatório %s',
    (campo) => {
      const { [campo as keyof typeof valido]: _omitido, ...resto } = valido;
      expect(esquemaArtigo.safeParse(resto).success).toBe(false);
    },
  );

  it('rejeita data malformada (string inválida do YAML)', () => {
    expect(esquemaArtigo.safeParse({ ...valido, data: '2026-13-45' }).success).toBe(false);
  });

  it('aceita data como string ISO válida (YAML entre aspas)', () => {
    expect(esquemaArtigo.safeParse({ ...valido, data: '2026-07-12' }).success).toBe(true);
  });

  it('rejeita titulo e descricao vazios', () => {
    expect(esquemaArtigo.safeParse({ ...valido, titulo: '' }).success).toBe(false);
    expect(esquemaArtigo.safeParse({ ...valido, descricao: '' }).success).toBe(false);
  });
});

describe('REQ-04 / RN-01 — categoria restrita', () => {
  it.each(['computacao', 'gestao-publica', 'reflexoes'])('aceita a categoria %s', (categoria) => {
    expect(esquemaArtigo.safeParse({ ...valido, categoria }).success).toBe(true);
  });

  it.each(['outra', 'Computação', 'computação', 'gestao_publica', ''])(
    'rejeita a categoria inválida "%s"',
    (categoria) => {
      expect(esquemaArtigo.safeParse({ ...valido, categoria }).success).toBe(false);
    },
  );

  it('RN-01 — mapeia exatamente os três slugs aos nomes de exibição', () => {
    expect(CATEGORIAS).toEqual({
      computacao: 'Computação',
      'gestao-publica': 'Gestão Pública',
      reflexoes: 'Reflexões',
    });
  });
});

describe('RN-03 — formato das tags', () => {
  it.each(['ia', 'gestao-publica', 'c', 'a1-b2', 'jetpack-compose'])(
    'aceita a tag válida "%s"',
    (tag) => {
      expect(PADRAO_TAG.test(tag)).toBe(true);
      expect(esquemaArtigo.safeParse({ ...valido, tags: [tag] }).success).toBe(true);
    },
  );

  it.each(['Gestão', 'gestão-publica', 'IA', 'foo_bar', '-ia', 'ia-', 'a--b', 'com espaço', ''])(
    'rejeita a tag inválida "%s"',
    (tag) => {
      expect(esquemaArtigo.safeParse({ ...valido, tags: [tag] }).success).toBe(false);
    },
  );

  it('rejeita lista de tags vazia (mínimo 1)', () => {
    expect(esquemaArtigo.safeParse({ ...valido, tags: [] }).success).toBe(false);
  });
});

describe('CE-06 — slugs duplicados', () => {
  it('deixa passar slugs únicos', () => {
    expect(() => garantirSlugsUnicos(['a', 'b', 'c'])).not.toThrow();
  });

  it('derruba o build apontando o slug duplicado', () => {
    expect(() => garantirSlugsUnicos(['meu-artigo', 'outro', 'meu-artigo'])).toThrow(
      /meu-artigo/,
    );
  });
});
