module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "relay",
  ],
  rules: {
    'relay/generated-flow-types': 'off',
  },
  extends: [
    "plugin:react-hooks/recommended",
    "plugin:relay/recommended"
  ],
};