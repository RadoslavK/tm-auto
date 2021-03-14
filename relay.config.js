const typescript = require('relay-compiler-language-typescript');

module.exports = {
  src: './src/renderer',
  schema: './src/main/server/_api/schema.graphql',
  language: typescript,
  exclude: ['**/__generated__/**'],
  artifactDirectory: './src/renderer/_graphql/__generated__',
};