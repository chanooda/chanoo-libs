import pluginQuery from '@tanstack/eslint-plugin-query';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { config as baseConfig } from './base.js';

/**
 * @type {import("eslint").Linter.Config}
 * */
export const reactDefaultConfig = [
  ...baseConfig,
  {
    ...react.configs.flat.recommended,
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          multiline: 'last',
          shorthandFirst: false,
        },
      ],
    },
  },
  {
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    plugins: jsxA11y,
  },
  ...pluginQuery.configs['flat/recommended'],
];

export const config = [...reactDefaultConfig, reactRefresh.configs.recommended];
