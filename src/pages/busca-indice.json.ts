import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { ItemDeBusca } from '../lib/busca';
import { ehPublicado } from '../lib/conteudo';

// REQ-13 — índice gerado no build com título, descrição, tags e categoria
// de artigos e projetos publicados (rascunhos fora, RN-05)
export const GET: APIRoute = async () => {
  const artigos: ItemDeBusca[] = (await getCollection('artigos'))
    .filter((artigo) => ehPublicado(artigo.data, import.meta.env.PROD))
    .map((artigo) => ({
      titulo: artigo.data.titulo,
      descricao: artigo.data.descricao,
      tags: artigo.data.tags,
      categoria: artigo.data.categoria,
      url: `/artigos/${artigo.id}/`,
    }));

  const projetos: ItemDeBusca[] = (await getCollection('projetos')).map((projeto) => ({
    titulo: projeto.data.nome,
    descricao: projeto.data.descricao,
    tags: projeto.data.tags,
    categoria: null,
    url: `/projetos/${projeto.id}/`,
  }));

  return new Response(JSON.stringify([...artigos, ...projetos]), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
