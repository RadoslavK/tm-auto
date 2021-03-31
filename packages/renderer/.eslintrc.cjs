module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'relay',
    'simple-import-sort',
    'modules-newline',
  ],
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:relay/recommended',
  ],
  ignorePatterns: [
    '*.graphql',
  ],
  rules: {
    'relay/generated-flow-types': 'off',
    'semi': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'modules-newline/import-declaration-newline': 'error',
    'modules-newline/export-declaration-newline': 'error',
    'indent': ['error', 2, {
      SwitchCase: 1,
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', {
      'additionalHooks': 'useRecoilCallback',
    }],
    'object-curly-newline': ['error', {
      ImportDeclaration: { multiline: true, minProperties: 2 },
      ExportDeclaration: { multiline: true, minProperties: 2 },
    }],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};