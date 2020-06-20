module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    include: /node_modules/,
    test: /\.mjs$/,
    type: 'javascript/auto',
  },
  {
    parser: { amd: false },
    test: /\.(m?js|node)$/,
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    exclude: /(node_modules|.webpack)/,
    loaders: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
    test: /\.[jt]sx?$/,
  },
  {
    test: /\.(css)$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
    test: /\.(jpg|png|svg|ico|icns)$/,
  },
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/',
    },
    test: /\.(woff|woff2|eot|ttf|svg)$/,
  },
];
