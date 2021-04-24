module.exports = {
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    'node_modules',
    'build',
    'build-dev',
    'dist',
    'dist-dev',
    'dist-dev-app',
    '*.json',
    '*.graphql',
    '*.json',
  ],
  plugins: [
    'simple-import-sort',
    'modules-newline',
  ],
  rules: {
    'semi': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'modules-newline/import-declaration-newline': 'error',
    'modules-newline/export-declaration-newline': 'error',
    'indent': ['error', 2, {
      SwitchCase: 1,
    }],
    'object-curly-newline': ['error', {
      ImportDeclaration: { multiline: true, minProperties: 2 },
      ExportDeclaration: { multiline: true, minProperties: 2 },
    }],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};