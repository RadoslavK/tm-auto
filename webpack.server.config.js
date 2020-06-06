const path = require('path');
const plugins = require('./webpack.main.plugins');
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: isDevelopment ? 'source-map' : undefined,
  entry: {
    index: path.join(__dirname, 'src', 'server', 'index.ts'),
  },
  externals: [nodeExternals({})],
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.graphql$/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.server.build.json',
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'server', '_graphql', 'schema.graphql'),
          to: path.join(__dirname, 'dist/server/'),
        },
      ],
    }),
  ],
  output: {
    path: path.join(__dirname, isDevelopment ? '.webpack' : 'dist', 'server'),
  },
  resolve: {
    alias: {
      '*/serverSchema.graphql': `${__dirname}/src/server/_graphql/schema.graphql`,
    },
    extensions: ['.js', '.ts', '.graphql'],
  },
  target: 'node',
};
