import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import { default as jsLint } from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import importRecommendedConfig from 'eslint-plugin-import/config/recommended.js';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsLint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import importRecommented from 'eslint-plugin-import/config/recommended.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const flatCompat = new FlatCompat();

export default [
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', './.storybook/main.ts'] },
  eslintPluginPrettierRecommended,
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs'],
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    rules: {
      ...importRecommented.rules,
      'import/no-named-as-default-member': 'off',
      'import/namespace': 'off',
      'import/named': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintReact,
    },
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
];
