import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'path';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    preserveDirectives(),
    react(),
    dts({
      include: 'src',
      exclude: ['**/*.stories.tsx'],
      insertTypesEntry: true,
      rollupTypes: true,
      afterBuild: () => {
        copyFileSync('dist/index.d.mts', 'dist/index.d.cts');
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    copyPublicDir: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', '@djeka07/utils'],
      output: {
        preserveModules: true,
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@djeka07/utils': '@djeka07/utils',
        },
      },
    },
  },
});
