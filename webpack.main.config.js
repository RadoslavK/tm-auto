const rules = require('./webpack.rules');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/client/index.ts',
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules,
  },
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  target: 'electron-main',
};
