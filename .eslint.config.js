import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: __dirname,
    resolvePluginsRelativeTo: __dirname,
})

export default [
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                __DEV__: 'readonly',
            },
        },
        plugins: {
            react: compat.require('eslint-plugin-react'),
            'react-hooks': compat.require('eslint-plugin-react-hooks'),
            'simple-import-sort': compat.require(
                'eslint-plugin-simple-import-sort'
            ),
        },
        rules: {
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'no-unused-vars': 'warn',
            'no-console': 'warn',
            eqeqeq: ['error', 'always'],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: '@typescript-eslint/parser',
            globals: {
                __DEV__: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': compat.require(
                '@typescript-eslint/eslint-plugin'
            ),
            react: compat.require('eslint-plugin-react'),
            'react-hooks': compat.require('eslint-plugin-react-hooks'),
        },
        rules: {
            ...compat.require('@typescript-eslint/eslint-plugin').configs[
                'recommended'
            ].rules,
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]
