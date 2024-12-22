import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  source: {
    entry: {
      cli: './src/cli.tsx',
      api: './src/api.ts',
      reporter: './src/reporter.ts',
      runner: './src/runner.ts',
    },
  },
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: true,
    },
    {
      format: 'cjs',
      syntax: 'es2021',
    },
  ],
  output: {
    cleanDistPath: true,
    externals: ['jest-each'],
  },
  plugins: [
    pluginReact(),
  ],
});
