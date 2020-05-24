const path = require('path');
const rules = require('./webpack.rules');

const isDevelopment = process.env.NODE_ENV !== 'production';

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
    __dirname: true,
  },
  output: {
    path: path.join(__dirname, '.webpack', 'main'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'electron-main',
};
