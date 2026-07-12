import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

export function distFile(relPath: string): string {
  return join(process.cwd(), 'dist', relPath);
}

export function pageExists(relPath: string): boolean {
  return existsSync(distFile(relPath));
}

export function parsePage(relPath: string): HTMLElement {
  return parse(readFileSync(distFile(relPath), 'utf-8'));
}
