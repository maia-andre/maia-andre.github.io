import { z } from 'astro/zod';

// RN-01 — categorias válidas (slug exato → nome de exibição)
export const CATEGORIAS = {
  computacao: 'Computação',
  'gestao-publica': 'Gestão Pública',
  reflexoes: 'Reflexões',
} as const;

export type CategoriaSlug = keyof typeof CATEGORIAS;

// RN-03 — tags em kebab-case minúsculo, sem acentos
export const PADRAO_TAG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// REQ-03/REQ-04 — frontmatter do artigo; erro de validação derruba o build (CE-01)
export const esquemaArtigo = z.object({
  titulo: z.string().min(1, 'titulo é obrigatório'),
  descricao: z.string().min(1, 'descricao é obrigatória'),
  data: z.coerce.date({
    errorMap: () => ({ message: 'data deve ser uma data válida no formato YYYY-MM-DD' }),
  }),
  categoria: z.enum(
    Object.keys(CATEGORIAS) as [CategoriaSlug, ...CategoriaSlug[]],
    { errorMap: () => ({ message: 'categoria deve ser computacao, gestao-publica ou reflexoes' }) },
  ),
  tags: z
    .array(
      z.string().regex(PADRAO_TAG, 'tag deve ser kebab-case minúsculo, sem acentos'),
    )
    .min(1, 'informe ao menos uma tag'),
  atualizado: z.coerce.date().optional(),
  rascunho: z.boolean().default(false),
});

// CE-06 — dois arquivos que resultem no mesmo slug derrubam o build
export function garantirSlugsUnicos(slugs: string[]): void {
  const vistos = new Set<string>();
  const duplicados = new Set<string>();
  for (const slug of slugs) {
    if (vistos.has(slug)) duplicados.add(slug);
    vistos.add(slug);
  }
  if (duplicados.size > 0) {
    throw new Error(
      `Slugs duplicados na coleção: ${[...duplicados].join(', ')} — cada arquivo deve gerar um slug único.`,
    );
  }
}

const formatoDataLonga = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export function formatarData(data: Date): string {
  return formatoDataLonga.format(data);
}

export function dataISO(data: Date): string {
  return data.toISOString().slice(0, 10);
}
