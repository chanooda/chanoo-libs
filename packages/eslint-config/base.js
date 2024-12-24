import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  {
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      'arrow-body-style': ['error', 'always'],
    },
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ...eslintPluginPrettierRecommended,
    rules: {
      ...eslintPluginPrettierRecommended.rules,
    },
  },
  {
    ...eslintConfigPrettier,
    rules: {
      ...eslintConfigPrettier.rules,
      'arrow-body-style': ['error', 'always'],
    },
  },
];
