import { execSync } from 'node:child_process';

// Constrói o site uma única vez para toda a suíte; os testes leem o dist/.
// O Vitest injeta no process.env variáveis no formato do import.meta.env
// (NODE_ENV=test, PROD="", DEV=1, MODE=test...). Herdá-las faz o Vite do
// build filho tratar produção como falso — PROD="" é falsy — e os rascunhos
// vazariam. O build daqui deve espelhar exatamente o de CI: env limpo.
const VARS_DO_VITEST = ['NODE_ENV', 'PROD', 'DEV', 'MODE', 'BASE_URL', 'TEST', 'VITEST', 'SSR'];

export default function buildSite() {
  const env = { ...process.env };
  for (const variavel of VARS_DO_VITEST) delete env[variavel];
  execSync('npx astro build', { stdio: 'inherit', cwd: process.cwd(), env });
}
