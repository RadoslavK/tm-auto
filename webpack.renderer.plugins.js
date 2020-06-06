const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').default;
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const RemovePlugin = require('remove-files-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = [
  isDevelopment && new webpack.HotModuleReplacementPlugin(),
  isDevelopment && new ReactRefreshWebpackPlugin({
    overlay: {
      sockIntegration: 'whm',
    },
  }),
  isDevelopment && new webpack.NoEmitOnErrorsPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new UnusedFilesWebpackPlugin({
    globOptions: {
      ignore: [
        'src/client/main/preload.ts',
        'src/client/main/index.ts',
        'src/server/**/*.ts',
        '**/*.type.ts',
        '**/*.d.ts',
      ],
    },
    patterns: [
      'src/**/*.ts?(x)',
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, 'resources'),
        globOptions: {
          ignore: ['**/*.json'],
        },
        to: isDevelopment
          ? path.join(__dirname, '.webpack/renderer')
          : path.join(__dirname, 'dist/renderer'),
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: './src/client/static/index.html',
  }),
  new RemovePlugin({
    before: {
      root: isDevelopment ? '.webpack/renderer' : '.dist/renderer',
      test: [{
        folder: '.',
        method: () => true,
        recursive: true,
      }],
    },
  }),
].filter(Boolean);
