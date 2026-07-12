import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { esquemaArtigo } from './lib/conteudo';

const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: esquemaArtigo,
});

export const collections = { artigos };
