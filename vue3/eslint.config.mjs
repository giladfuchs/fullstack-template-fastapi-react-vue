import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  { ignores: ['dist', 'node_modules', 'coverage', '.vite', '*.d.ts'] },

  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-useless-assignment': 'off'
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    }
  },

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off',
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  },

  prettier
];
