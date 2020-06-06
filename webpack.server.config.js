const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line import/no-extraneous-dependencies
const RemovePlugin = require('remove-files-webpack-plugin');

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
  node: {
    __dirname: false,
  },
  output: {
    path: path.join(__dirname, isDevelopment ? '.webpack' : 'dist', 'server'),
  },
  plugins: [
    new RemovePlugin({
      before: {
        root: isDevelopment ? '.webpack/server' : 'dist/server',
        test: [{
          folder: '.',
          method: () => true,
        }],
        exclude: ['.data'],
      },
    }),
  ],
  resolve: {
    alias: {
      '*/serverSchema.graphql': `${__dirname}/src/server/_graphql/schema.graphql`,
      // '*/building-infos.json': `${__dirname}/resources/building-infos.json`,
      // '*/unit-infos.json': `${__dirname}/resources/unit-infos.json`,
    },
    extensions: ['.js', '.ts', '.graphql', '.json'],
  },
  target: 'node',
};
