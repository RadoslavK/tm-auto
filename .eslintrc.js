module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:unicorn/recommended',
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
    'simple-import-sort',
    'eslint-comments',
    '@typescript-eslint',
    'tm-auto',
    'sort-keys-fix',
    'sort-destructure-keys',
    'typescript-sort-keys',
    // TODO add prettier
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
        classes: true, functions: false, typedefs: true, variables: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'warn',
    'array-bracket-newline': 'error',
    'array-bracket-spacing': 'error',
    'array-element-newline': ['error', 'consistent'],
    'arrow-parens': 'off',
    'brace-style': 'error',
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'consistent-return': 'off',
    'eol-last': 'off',
    'function-paren-newline': ['error', 'multiline-arguments'],
    'implicit-arrow-linebreak': 'off',
    'import/no-cycle': 'warn',
    'import/no-default-export': 'error',
    'import/no-unresolved': 'error',
    'import/order': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    indent: 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'linebreak-style': ['error', 'windows'],
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'warn',
    'max-len': ['warn', { code: 120 }],
    'new-parens': 'error',
    'no-await-in-loop': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-mixed-operators': ['warn', {
      groups: [
        ['/', '*'],
      ],
    }],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-param-reassign': 'warn',
    'no-plusplus': 'off',
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { args: 'after-used', caughtErrors: 'all', ignoreRestSiblings: true }],
    // Use function hoisting to improve code readability
    'no-use-before-define': [
      'error',
      { classes: true, functions: false, variables: true },
    ],
    'object-curly-newline': [
      'error',
      {
        ExportDeclaration: { consistent: true, minProperties: 2, multiline: true },
        ImportDeclaration: { consistent: true, minProperties: 2, multiline: true },
        ObjectExpression: { consistent: true, minProperties: 4, multiline: true },
        ObjectPattern: { consistent: true, minProperties: 4, multiline: true },
      },
    ],
    'object-curly-spacing': 'error',
    'operator-linebreak': 'error',
    'prefer-destructuring': 'error',
    'quote-props': 'error',
    quotes: 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/button-has-type': 'off',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': 'error',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    semi: 'error',
    'simple-import-sort/sort': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    'tm-auto/single-import-per-line': 'error',
    'tm-auto/single-line-per-single-import': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': ['error', { case: 'camelCase' }],
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'unicorn/prefer-text-content': 'off',
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: 'webpack.renderer.config.js',
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};