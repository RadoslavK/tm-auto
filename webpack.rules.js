module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: [
      "babel-loader"
    ],
  },
  {
    test: /\.(css)$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.(jpg|png|svg|ico|icns)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
    },
  },
  {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader'
  }
];
