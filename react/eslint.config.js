import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        rules: {
            ...(reactHooks.configs.recommended.rules ?? {}),

            'react-refresh/only-export-components': 'off',

            'react-hooks/refs': 'off',
            'react-hooks/set-state-in-effect': 'off'
        }
    }
]);
