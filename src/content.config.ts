import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { criarGeradorDeIds, esquemaArtigo, esquemaProjeto } from './lib/conteudo';

const artigos = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/artigos',
    generateId: criarGeradorDeIds(),
  }),
  schema: esquemaArtigo,
});

const projetos = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projetos',
    generateId: criarGeradorDeIds(),
  }),
  schema: esquemaProjeto,
});

export const collections = { artigos, projetos };
