const path = require('path');
const plugins = require('./webpack.renderer.plugins');

const isDevelopment = process.env.NODE_ENV !== 'production';

const directory = path.join(
  isDevelopment ? '.webpack' : 'app/dist',
  'renderer',
);

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/renderer/index.tsx'),
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node-modules/,
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
        test: /\.(woff|woff2|eot|ttf|svg)$/,
      },
      {
        //  the Popper.js file from @material-ui/core collides with the popper.js package name and it's located in the same folder as usage
        test: /node_modules\\@material-ui\\core\\esm\\Popper\\Popper\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: 'import PopperJs from \'popper.js\';',
            //  navigate to node_modules/popper.js/...
            replace: 'import PopperJS from "../../../../popper.js/dist/esm/popper";',
          }
        }
      },
    ],
  },
  output: {
    path: path.join(__dirname, directory),
    filename: 'index.js',
  },
  plugins,
  node: {
    global: true,
  },
  resolve: {
    fallback: {
      crypto: false,
      fs: false,
      module: false,
      os: false,
      path: false,
      util: false,
    },
    extensions: ['.ts', '.tsx', '.js'],
    preferRelative: true, // needed for resolution of __generate__ relay artifacts that are not in the same folder as the file importing
  },
  target: isDevelopment ? 'web' : 'electron-renderer',
};
