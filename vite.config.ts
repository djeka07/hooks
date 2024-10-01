import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

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
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : format}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion', 'polished'],
      output: {
        preserveModules: true,
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
