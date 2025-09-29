import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Ignore build and dependencies
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },

  // JS/JSX files
  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      prettier: prettierPlugin
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      // Turn off ESLint rules that conflict with Prettier
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-trailing-spaces': 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'space-before-function-paren': 'off',
      'prettier/prettier': 'error' // enable Prettier
    }
  },

  // TS/TSX files
  {
    files: ['**/*.{ts,tsx}', '**/*.test.tsx', '**/*.spec.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: { ...globals.browser }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': pluginReactHooks,
      prettier: prettierPlugin,
      react: pluginReact
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        { singleQuote: true, trailingComma: 'none' }
      ]
    },
    settings: { react: { version: 'detect' } }
  }
];
