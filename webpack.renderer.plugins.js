const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const directory = path.join(
  isDevelopment ? '.webpack' : 'app/dist',
  'renderer',
);

module.exports = [
  isDevelopment && new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, 'resources'),
        globOptions: {
          ignore: ['**/*.json'],
        },
        to: path.join(__dirname, directory),
      },
    ],
  }),
  new HtmlWebpackPlugin({
    title: 'TM Auto',
    templateContent: `
      <div id="app"></div>
      <script>
        if (!window.api.isDev) {
            const tag = document.createElement('meta');
            
            tag.setAttribute("http-equiv", "Content-Security-Policy");
            tag.setAttribute("content", "default-src 'self'; style-src 'self' 'unsafe-inline';");
            document.head.appendChild(tag);
        }
      </script>
    `,
  }),
].filter(Boolean);
