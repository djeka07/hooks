import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { defineConfig, Options } from 'tsup';
import { addUseClientDirective } from './build.util';

const DIST_PATH = './dist';

async function addDirectivesToChunkFiles(distPath = DIST_PATH): Promise<void> {
  try {
    const files = await fs.readdir(distPath);

    for (const file of files) {
      if (file.startsWith('chunk-') && (file.endsWith('.mjs') || file.endsWith('.js'))) {
        const filePath = path.join(distPath, file);

        const data = await fs.readFile(filePath, 'utf8');

        const updatedContent = `'use client';\n${data}`;

        await fs.writeFile(filePath, updatedContent, 'utf8');

        console.log(`Directive has been added to ${file}`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: true,
  shims: true,
  splitting: false,
  treeshake: false,
  outDir: 'dist',
  target: 'esnext',
  bundle: true,
  external: ['react'],
  metafile: true,
  tsconfig: './tsconfig.json',
  ...options,
}));
