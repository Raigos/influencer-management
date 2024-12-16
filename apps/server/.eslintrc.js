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
    // Server-specific rules
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
)
