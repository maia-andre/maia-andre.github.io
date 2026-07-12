import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: './tests/setup/build-site.ts',
    testTimeout: 30_000,
  },
});
