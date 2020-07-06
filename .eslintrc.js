module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:unicorn/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/*.jsx', '**/*.tsx'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
      },
    },
    {
      files: ['**/index.jsx', '**/index.tsx'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'camelCase' }],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  // Specifies the ESLint parser
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'promise',
    'react-hooks',
    'unicorn',
    '@typescript-eslint',
    'sort-destructure-keys',
    'prettier',
    'import',
  ],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        classes: true,
        functions: false,
        typedefs: true,
        variables: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'warn',
    'consistent-return': 'off',
    'import/no-cycle': 'error',
    'import/no-unresolved': 'error',
    'import/order': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'warn',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-mixed-operators': [
      'warn',
      {
        groups: [['/', '*']],
      },
    ],
    'no-param-reassign': 'warn',
    'no-plusplus': 'off',
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-unused-vars': [
      'error',
      { args: 'after-used', caughtErrors: 'all', ignoreRestSiblings: true },
    ],
    // Use function hoisting to improve code readability
    'no-use-before-define': [
      'error',
      { classes: true, functions: false, variables: true },
    ],
    'prefer-destructuring': 'warn',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': ['error', { case: 'camelCase' }],
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/prefer-text-content': 'off',
    'unicorn/no-useless-undefined': 'off',
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      webpack: {
        config: 'webpack.server.config.js',
      },
    },
    'react': {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
