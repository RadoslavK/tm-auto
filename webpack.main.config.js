const path = require('path');
const rules = require('./webpack.rules');
// eslint-disable-next-line import/no-extraneous-dependencies
const RemovePlugin = require('remove-files-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const directory = path.join(isDevelopment ? '.webpack' : path.join('app', 'dist'), 'main');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: path.join(__dirname, 'src', 'client', 'main', 'index.ts'),
    preload: path.join(__dirname, 'src', 'client', 'main', 'preload.ts'),
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules,
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new RemovePlugin({
      before: {
        root: directory,
        test: [{
          folder: '.',
          method: () => true,
          recursive: true,
        }],
      },
    }),
  ],
  output: {
    path: path.join(__dirname, directory),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'electron-main',
};
