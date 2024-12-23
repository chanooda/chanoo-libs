import next from '@next/eslint-plugin-next';
import { reactDefaultConfig } from './react.js';

/**
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  ...reactDefaultConfig,
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
];
