const path = require('path');
const plugins = require('./webpack.plugins');
const rules = require('./webpack.rules');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, '.webpack', 'renderer'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8080,
    publicPath: '/',
    stats: {
      children: false,
      chunks: false,
      colors: true,
    },
  },
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
    alias: {
      '*/graphql_operations': `${__dirname}/src/client/renderer/_graphql/operations`,
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.graphql'],
    modules: ['src', 'node_modules'],
  },
  target: 'web',
};
