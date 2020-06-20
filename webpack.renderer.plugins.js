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
const directory = path.join(
  isDevelopment ? '.webpack' : path.join('app', 'dist'),
  'renderer',
);

module.exports = [
  isDevelopment && new webpack.HotModuleReplacementPlugin(),
  isDevelopment &&
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  isDevelopment && new webpack.NoEmitOnErrorsPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new UnusedFilesWebpackPlugin({
    globOptions: {
      ignore: ['**/*.type.ts', '**/*.d.ts'],
    },
    patterns: ['src/client/renderer/**/*.ts?(x)'],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, 'resources'),
        globOptions: {
          ignore: ['**/*.json'],
        },
        to: path.join(__dirname, directory),
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: './src/client/static/index.html',
  }),
  new RemovePlugin({
    before: {
      root: directory,
      test: [
        {
          folder: '.',
          method: () => true,
          recursive: true,
        },
      ],
    },
  }),
].filter(Boolean);
