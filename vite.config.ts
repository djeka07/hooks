import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-preserve-directives';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    preserveDirectives(),
    react(),
    dts({ include: 'src', exclude: ['**/*.stories.tsx'], insertTypesEntry: true }),
    tsconfigPaths(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion', 'polished'],
      output: {
        preserveModules: true,
        inlineDynamicImports: false,
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
