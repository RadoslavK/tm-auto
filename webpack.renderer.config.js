const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".graphql"],
    alias: {
      '*/graphql_operations': __dirname + '/src/client/graphql/operations'
    },
  },
  module: {
    rules: require("./webpack.rules"),
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'resources'),
      to: path.join(__dirname, '.webpack/renderer'),
      ignore: ['*.json'],
      cache: true,
    }]),
  ],
};
