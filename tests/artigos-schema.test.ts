import { describe, expect, it } from 'vitest';
import {
  CATEGORIAS,
  PADRAO_TAG,
  criarGeradorDeIds,
  esquemaArtigo,
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
  it.each(['computacao', 'fundamentos', 'gestao-publica', 'reflexoes'])(
    'aceita a categoria %s',
    (categoria) => {
      expect(esquemaArtigo.safeParse({ ...valido, categoria }).success).toBe(true);
    },
  );

  it.each(['outra', 'Computação', 'computação', 'gestao_publica', 'Fundamentos', ''])(
    'rejeita a categoria inválida "%s"',
    (categoria) => {
      expect(esquemaArtigo.safeParse({ ...valido, categoria }).success).toBe(false);
    },
  );

  it('RN-01 — mapeia exatamente os quatro slugs aos nomes de exibição', () => {
    expect(CATEGORIAS).toEqual({
      computacao: 'Computação',
      fundamentos: 'Fundamentos',
      'gestao-publica': 'Gestão Pública',
      reflexoes: 'Reflexões',
    });
  });

  // A mensagem de erro é o que o autor vê quando o build cai (CE-01): ela
  // precisa listar as categorias que existem hoje, não as de 2026-07.
  it('CE-01 — a mensagem de erro nomeia as quatro categorias válidas', () => {
    const erro = esquemaArtigo.safeParse({ ...valido, categoria: 'inexistente' });
    const mensagem = erro.success ? '' : erro.error.issues[0].message;
    for (const slug of Object.keys(CATEGORIAS)) {
      expect(mensagem, `a mensagem omite "${slug}"`).toContain(slug);
    }
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

describe('CE-06 — gerador de ids detecta colisão antes da deduplicação do loader', () => {
  it('slugifica o nome do arquivo (minúsculas, sem acentos, kebab)', () => {
    const gerarId = criarGeradorDeIds();
    expect(gerarId({ entry: 'construindo-este-site.md' })).toBe('construindo-este-site');
    expect(gerarId({ entry: 'Meu Artigo Ção.md' })).toBe('meu-artigo-cao');
  });

  it('é idempotente para o mesmo arquivo (recarga do dev server)', () => {
    const gerarId = criarGeradorDeIds();
    expect(gerarId({ entry: 'a.md' })).toBe('a');
    expect(() => gerarId({ entry: 'a.md' })).not.toThrow();
  });

  it('lança erro nomeando os dois arquivos quando slugs colidem', () => {
    const gerarId = criarGeradorDeIds();
    gerarId({ entry: 'meu artigo.md' });
    expect(() => gerarId({ entry: 'meu-artigo.md' })).toThrow(
      /meu artigo\.md.*meu-artigo\.md|meu-artigo\.md.*meu artigo\.md/s,
    );
  });

  it('não confunde arquivos diferentes com slugs diferentes', () => {
    const gerarId = criarGeradorDeIds();
    gerarId({ entry: 'primeiro.md' });
    expect(() => gerarId({ entry: 'segundo.md' })).not.toThrow();
  });
});
