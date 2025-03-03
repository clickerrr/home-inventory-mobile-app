import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': ts,
            react,
            'react-hooks': reactHooks,
            prettier,
        },
        rules: {
            'prettier/prettier': 'error', // Enforce Prettier formatting
            'react/jsx-uses-react': 'off', // Not needed in React 17+
            'react/react-in-jsx-scope': 'off', // Not needed in React 17+
            'react-hooks/rules-of-hooks': 'error', // Enforce Hooks rules
            'react-hooks/exhaustive-deps': 'warn', // Warn about missing deps in useEffect
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
