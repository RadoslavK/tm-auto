const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.main.plugins');

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
  plugins,
  output: {
    path: path.join(__dirname, isDevelopment ? '.webpack' : 'dist', 'main'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'electron-main',
};
