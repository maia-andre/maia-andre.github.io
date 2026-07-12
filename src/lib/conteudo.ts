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

const esquemaTags = z
  .array(z.string().regex(PADRAO_TAG, 'tag deve ser kebab-case minúsculo, sem acentos'))
  .min(1, 'informe ao menos uma tag');

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
  tags: esquemaTags,
  atualizado: z.coerce.date().optional(),
  rascunho: z.boolean().default(false),
});

// REQ-08 — frontmatter do projeto; corpo Markdown livre (objetivos, roadmap, changelog)
export const esquemaProjeto = z.object({
  nome: z.string().min(1, 'nome é obrigatório'),
  descricao: z.string().min(1, 'descricao é obrigatória'),
  tecnologias: z.array(z.string().min(1)).min(1, 'informe ao menos uma tecnologia'),
  tags: esquemaTags,
  destaque: z.boolean().default(false),
  repositorio: urlHttp('repositorio').optional(),
  links: z
    .array(
      z.object({
        rotulo: z.string().min(1),
        url: urlHttp('url do link'),
      }),
    )
    .optional(),
  imagem: z.string().min(1).optional(),
});

// Hardening: só http(s) — bloqueia javascript:, data: etc.
function urlHttp(campo: string) {
  return z
    .string()
    .url(`${campo} deve ser uma URL válida`)
    .regex(/^https?:\/\//, `${campo} deve usar http ou https`);
}

// Conteúdo editável de páginas fixas (apresentação da Home, Sobre)
export const esquemaPagina = z.object({
  titulo: z.string().min(1),
});

// RN-04 — limites da Home; menos que o limite mostra os existentes,
// zero omite a seção (CE-04, condicional no template)
export const LIMITE_ARTIGOS_HOME = 5;
export const LIMITE_PROJETOS_HOME = 4;

export function artigosRecentes<E extends { data: { rascunho: boolean; data: Date; titulo: string } }>(
  entradas: E[],
  ehProducao: boolean,
): E[] {
  return prepararListagem(entradas, ehProducao).slice(0, LIMITE_ARTIGOS_HOME);
}

export function projetosEmDestaque<E extends { data: { nome: string; destaque: boolean } }>(
  entradas: E[],
): E[] {
  return entradas
    .filter((entrada) => entrada.data.destaque)
    .sort((a, b) => a.data.nome.localeCompare(b.data.nome, 'pt-BR', { sensitivity: 'base' }))
    .slice(0, LIMITE_PROJETOS_HOME);
}

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

// RN-05 — rascunho some de produção por completo; no dev o autor pré-visualiza
export function ehPublicado(item: { rascunho: boolean }, ehProducao: boolean): boolean {
  return !ehProducao || !item.rascunho;
}

export function filtrarPublicados<T extends { rascunho: boolean }>(
  itens: T[],
  ehProducao: boolean,
): T[] {
  return itens.filter((item) => ehPublicado(item, ehProducao));
}

// RN-02 — data decrescente; empate pela ordem alfabética do título
function compararArtigos(
  a: { data: Date; titulo: string },
  b: { data: Date; titulo: string },
): number {
  return (
    b.data.getTime() - a.data.getTime() ||
    a.titulo.localeCompare(b.titulo, 'pt-BR', { sensitivity: 'base' })
  );
}

export function ordenarArtigos<T extends { data: Date; titulo: string }>(itens: T[]): T[] {
  return [...itens].sort(compararArtigos);
}

// Listagens de páginas: filtra rascunhos e ordena entradas da coleção
export function prepararListagem<E extends { data: { rascunho: boolean; data: Date; titulo: string } }>(
  entradas: E[],
  ehProducao: boolean,
): E[] {
  return entradas
    .filter((entrada) => ehPublicado(entrada.data, ehProducao))
    .sort((a, b) => compararArtigos(a.data, b.data));
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
