const path = require('path');
const plugins = require('./webpack.plugins');
const rules = require('./webpack.rules');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    index: ['webpack-hot-middleware/client', path.join(__dirname, 'src', 'client', 'renderer', 'index.tsx')],
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules,
  },
  output: {
    path: path.join(__dirname, '.webpack', 'renderer'),
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    modules: ['src', 'node_modules'],
  },
  target: 'web',
};
