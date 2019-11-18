module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
  },
  module: {
    rules: require("./webpack.rules"),
  },
};
