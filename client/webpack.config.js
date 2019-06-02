const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",

    mode: env.NODE_ENV,

    output: {
      filename: "app.js",
      publicPath: '/',
      path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

        { test: /\.html$/, loader: "html-loader" },

        {
          test: /\.css$/, use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env),
      })
    ],

    devServer: {
      historyApiFallback: true
    }
  };
};
