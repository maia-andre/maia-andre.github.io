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

function slugificar(caminho: string): string {
  return caminho
    .replace(/\.(md|mdx)$/i, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// CE-06 — a colisão precisa ser detectada AQUI, no generateId do loader:
// depois disso o content layer deduplica por id em silêncio e um artigo
// desapareceria do site sem erro.
export function criarGeradorDeIds(): (opcoes: { entry: string }) => string {
  const vistos = new Map<string, string>();
  return ({ entry }) => {
    const slug = slugificar(entry);
    const existente = vistos.get(slug);
    if (existente !== undefined && existente !== entry) {
      throw new Error(
        `Slug duplicado "${slug}": os arquivos "${existente}" e "${entry}" geram o mesmo endereço. Renomeie um deles.`,
      );
    }
    vistos.set(slug, entry);
    return slug;
  };
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
