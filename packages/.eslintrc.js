import importPlugin from 'eslint-plugin-import'

// These are our company-wide standards that apply everywhere
export default {
  plugins: {
    import: importPlugin
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        'newlines-between': 'always'
      }
    ]
  }
}
