const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // }
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.PORT": JSON.stringify(process.env.PORT),
    }),
  ],
};
