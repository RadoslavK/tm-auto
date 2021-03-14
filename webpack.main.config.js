const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

const mainFolder = path.join(__dirname, 'src/main');
const directory = path.join(
  isDevelopment ? '.webpack' : 'app/dist',
  'main',
);

module.exports = {
  devtool: 'source-map',
  entry: {
    index: path.join(mainFolder, 'index.ts'),
    preload: path.join(mainFolder, 'preload.ts'),
  },
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
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'electron-main',
};
