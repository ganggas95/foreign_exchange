const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundled.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            plugins: [
              "transform-decorators-legacy",
              "transform-class-properties"
            ],
            presets: ["es2015", "react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};
