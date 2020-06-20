const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const RemovePlugin = require('remove-files-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const directory = path.join(
  isDevelopment ? '.webpack' : path.join('app', 'dist'),
  'server',
);

// Some packages can not be bundled and need to be provided separately in app/packages.json
// https://github.com/berstend/puppeteer-extra/issues/93
const createExternals = (...externalPackages) =>
  externalPackages.reduce(
    (reducedExternals, externalPackage) => ({
      ...reducedExternals,
      [externalPackage]: `require("${externalPackage}")`,
    }),
    {},
  );

module.exports = {
  devtool: 'source-map',
  entry: {
    index: path.join(__dirname, 'src', 'server', 'index.ts'),
  },
  externals: createExternals(
    'puppeteer-core',
    'puppeteer-extra',
    'puppeteer-extra-plugin-stealth',
  ),
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.graphql$/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
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
    path: path.join(__dirname, directory),
    //  in development we have output in folder .webpack/server and on production we want only relative resource path
    //  to hide away folder information :D
    devtoolModuleFilenameTemplate: isDevelopment
      ? '../../[resource-path]'
      : (info) => info.resourcePath.slice(1),
  },
  plugins: [
    new RemovePlugin({
      before: {
        root: directory,
        test: [
          {
            folder: '.',
            method: () => true,
          },
        ],
        ...(isDevelopment ? { exclude: ['.data'] } : undefined),
      },
    }),
  ],
  resolve: {
    alias: {
      '*/serverSchema.graphql': `${__dirname}/src/server/_graphql/schema.graphql`,
    },
    extensions: ['.js', '.ts', '.graphql', '.json'],
  },
  target: 'node',
};
