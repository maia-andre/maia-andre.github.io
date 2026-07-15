// Núcleo de decisão da auditoria estética (RNF-E01/RNF-E04) — funções puras,
// testadas em tests/auditoria.test.ts. O script tools/auditoria.mjs coleta os
// números reais (Lighthouse + viewport 320px) e delega o veredito para cá.

export function mediana(valores) {
  const ordenados = [...valores].sort((a, b) => a - b);
  return ordenados[Math.floor(ordenados.length / 2)];
}

/**
 * @param {{paginas: Array<{nome: string, perf: number[], a11y: number[], cls: number[]}>,
 *          scroll320: Array<{nome: string, scrollWidth: number, viewport: number}>}} coleta
 * @returns {{aprovado: boolean, falhas: string[]}}
 */
export function avaliarAuditoria({ paginas, scroll320 }) {
  const falhas = [];

  for (const pagina of paginas) {
    const perf = mediana(pagina.perf);
    const a11y = mediana(pagina.a11y);
    const cls = mediana(pagina.cls);
    if (perf !== 100) {
      falhas.push(`${pagina.nome}: Performance mediana ${perf} (exigido 100) — RNF-E01`);
    }
    if (a11y !== 100) {
      falhas.push(`${pagina.nome}: Accessibility mediana ${a11y} (exigido 100) — RNF-E01`);
    }
    if (cls !== 0) {
      falhas.push(`${pagina.nome}: CLS mediana ${cls} (exigido 0) — REQ-E03/RNF-E01`);
    }
  }

  for (const pagina of scroll320) {
    if (pagina.scrollWidth > pagina.viewport) {
      falhas.push(
        `${pagina.nome}: scroll horizontal a 320px (scrollWidth ${pagina.scrollWidth} > viewport ${pagina.viewport}) — RNF-E04`,
      );
    }
  }

  return { aprovado: falhas.length === 0, falhas };
}
