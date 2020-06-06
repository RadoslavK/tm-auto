const path = require('path');
const rules = require('./webpack.rules');
// eslint-disable-next-line import/no-extraneous-dependencies
const RemovePlugin = require('remove-files-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: isDevelopment ? 'source-map' : undefined,
  entry: {
    index: path.join(__dirname, 'src', 'client', 'main', 'index.ts'),
    preload: path.join(__dirname, 'src', 'client', 'main', 'preload.ts'),
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules,
  },
  plugins: [
    new RemovePlugin({
      before: {
        root: isDevelopment ? '.webpack/main' : '.dist/main',
        test: [{
          folder: '.',
          method: () => true,
          recursive: true,
        }],
      },
    }),
  ],
  output: {
    path: path.join(__dirname, isDevelopment ? '.webpack' : 'dist', 'main'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'electron-main',
};
