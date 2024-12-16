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
    // Rules specific to database operations
    rules: {
      // Ensure async/await consistency for database operations
      '@typescript-eslint/no-floating-promises': 'error',

      // Prevent accidental Prisma Client exposure
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],

      // Strict null checks are crucial for database operations
      '@typescript-eslint/strict-null-checks': 'error',

      // Ensure proper typing of database models
      '@typescript-eslint/no-explicit-any': 'error'
    }
  }
)
