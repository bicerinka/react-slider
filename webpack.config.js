const HtmlWebPackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MinifyPlugin({})
  ],
  devtool: 'eval-source-map',
  devServer: {
    port: 8081,
    proxy: {
      '/asip-api': {
        target: 'http://try.axxonsoft.com:8000',
        headers: {
          Authorization: 'Basic cm9vdDpyb290',
        },
      },
    },
  },
};