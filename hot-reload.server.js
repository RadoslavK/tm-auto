// eslint-disable-next-line unicorn/filename-case,import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackDevMiddleware = require('webpack-dev-middleware');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackHotMiddleware = require('webpack-hot-middleware');
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const path = require('path');
const config = require('./webpack.renderer.config');

const compiler = webpack(config);

const app = express();

const port = 8080;

app.use(express.static('public'));

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    writeToDisk: true,
  }),
);

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './src/client/static/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
