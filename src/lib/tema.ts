// REQ-14 — tema claro/escuro; CE-05 — localStorage indisponível nunca lança.
// O storage é injetável para os testes cobrirem o CE-05 de verdade.

export type Tema = 'claro' | 'escuro';

type StorageMinimo = {
  getItem(chave: string): string | null;
  setItem(chave: string, valor: string): void;
};

const CHAVE = 'tema';

export function lerTemaSalvo(storage: StorageMinimo | null): Tema | null {
  try {
    const valor = storage?.getItem(CHAVE);
    return valor === 'claro' || valor === 'escuro' ? valor : null;
  } catch {
    return null;
  }
}

export function salvarTema(storage: StorageMinimo | null, tema: Tema): void {
  try {
    storage?.setItem(CHAVE, tema);
  } catch {
    // CE-05: sem persistência, a escolha vale só para a página aberta
  }
}

export function temaEfetivo(doc: Document, sistemaPrefereEscuro: boolean): Tema {
  const explicito = doc.documentElement.dataset.tema;
  if (explicito === 'claro' || explicito === 'escuro') return explicito;
  return sistemaPrefereEscuro ? 'escuro' : 'claro';
}

export function alternarTema(
  doc: Document,
  storage: StorageMinimo | null,
  sistemaPrefereEscuro: boolean,
): Tema {
  const novo: Tema = temaEfetivo(doc, sistemaPrefereEscuro) === 'escuro' ? 'claro' : 'escuro';
  doc.documentElement.dataset.tema = novo;
  salvarTema(storage, novo);
  return novo;
}
