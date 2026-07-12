import { execSync } from 'node:child_process';

// Constrói o site uma única vez para toda a suíte; os testes leem o dist/.
export default function buildSite() {
  execSync('npx astro build', { stdio: 'inherit', cwd: process.cwd() });
}
