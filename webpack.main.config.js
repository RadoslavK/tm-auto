module.exports = {
  entry: "./src/client/index.ts",
  // // Put your normal webpack config below here
  node: {
    __dirname: true,
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: require("./webpack.rules"),
  },
};
