import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import react from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [...compat.extends('eslint:recommended', 'next/core-web-vitals', 'next/typescript', 'airbnb'), {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  ignores: ['**/*.test.jsx'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      React: true,
    },
  },
  plugins: {
    react,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',

    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    'react/jsx-props-no-spreading': ['error', {
      html: 'ignore',
      custom: 'ignore',
      explicitSpread: 'ignore',
      exceptions: ['_app'],
    }],

    'react/no-danger': 'off',

    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx', 'ts', 'tsx'],
    }],

    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
  },
}, {
  files: ['src/__tests__/*'],

  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
}];
