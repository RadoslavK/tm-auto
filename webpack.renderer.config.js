const path = require('path');
const rules = require('./webpack.rules');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const plugins = require('./webpack.plugins');

module.exports = {
  devtool: 'source-map',
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'resources'),
          globOptions: {
            ignore: ['*.json'],
          },
          to: path.join(__dirname, '.webpack/renderer'),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '*/graphql_operations': `${__dirname}/src/client/graphql/operations`,
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.graphql'],
  },
  target: 'electron-renderer',
};
