module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    'relay',
  ],
  extends: [
    '../../.eslintrc.js',
    'plugin:react-hooks/recommended',
    'plugin:relay/recommended',
  ],
  ignorePatterns: [
    '*.graphql',
  ],
  rules: {
    'relay/generated-flow-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', {
      'additionalHooks': 'useRecoilCallback',
    }],
  },
};