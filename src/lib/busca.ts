import Fuse from 'fuse.js';

// REQ-13 — item do índice de busca: exatamente os campos da spec + url
export interface ItemDeBusca {
  titulo: string;
  descricao: string;
  tags: string[];
  categoria: string | null;
  url: string;
}

// Mesma lógica usada pela página /busca/ e pelos testes — uma fonte só.
export function criarBusca(indice: ItemDeBusca[]): (termo: string) => ItemDeBusca[] {
  const fuse = new Fuse(indice, {
    keys: ['titulo', 'descricao', 'tags', 'categoria'],
    threshold: 0.35,
    ignoreLocation: true,
  });
  return (termo: string) => {
    const limpo = termo.trim();
    if (!limpo) return [];
    return fuse.search(limpo).map((resultado) => resultado.item);
  };
}
