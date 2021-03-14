const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

const directory = path.join(
  isDevelopment ? '.webpack' : 'app/dist',
  'main',
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
  entry: path.join(__dirname, 'src/main/server/index.ts'),
  externals: createExternals(
    'puppeteer-core',
    'puppeteer-extra',
    'puppeteer-extra-plugin-stealth',
    'jsdom',
    'nexus',
    'graphql',
  ),
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'src/main/tsconfig.json',
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
    filename: 'server.js',
    //  in development we have output in folder .webpack/server and on production we want only relative resource path
    //  to hide away folder information :D
    devtoolModuleFilenameTemplate: isDevelopment
      ? '../../[resource-path]'
      : (info) => info.resourcePath.slice(1),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  target: 'node',
};
