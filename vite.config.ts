import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-preserve-directives';
import { resolve, join, relative, dirname } from 'path';

export default defineConfig({
  plugins: [
    preserveDirectives(),
    react(),
    dts({ include: 'src', exclude: ['**/*.stories.tsx'], insertTypesEntry: true }),
    tsconfigPaths(),
  ],
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion', 'polished'],
      output: {
        preserveModules: true,
        entryFileNames: (entry) => {
          const { name, facadeModuleId } = entry;
          const fileName = `${name}.js`;
          if (!facadeModuleId) {
            return fileName;
          }
          const relativeDir = relative(resolve(__dirname, 'src'), dirname(facadeModuleId));
          return join(relativeDir, fileName);
        },
        globals: {
          react: 'React',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
