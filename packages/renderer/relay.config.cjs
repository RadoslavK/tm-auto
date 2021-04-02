const typescript = require('relay-compiler-language-typescript');

//  Will not work until is solved https://github.com/facebook/relay/issues/3030
//  It somehow does not recognize .cjs extension and we can not specify the --config option
module.exports = {
  src: './src',
  schema: '../server/src/_api/schema.graphql',
  language: typescript,
  exclude: ['**/__generated__/**'],
  artifactDirectory: './src/_graphql/__generated__',
  eagerESModules: true,
  noFutureProofEnums: true,
};