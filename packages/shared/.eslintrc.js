import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    extends: [
      '../../.eslintrc.js',
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked
    ],
    parserOptions: {
      project: './tsconfig.json'
    },
    // Rules specific to shared types and utilities
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error'
    }
  }
)
