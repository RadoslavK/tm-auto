const path = require('path');
const plugins = require('./webpack.renderer.plugins');
const rules = require('./webpack.rules');

const isDevelopment = process.env.NODE_ENV !== 'production';
const directory = path.join(isDevelopment ? '.webpack' : path.join('app', 'dist'), 'renderer');
const entry = path.join(__dirname, 'src', 'client', 'renderer', 'index.tsx');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: isDevelopment
      ? ['webpack-hot-middleware/client', entry]
      : entry,
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules,
  },
  output: {
    path: path.join(__dirname, directory),
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.mjs'],
    modules: ['src', 'node_modules'],
  },
  target: 'web',
};
