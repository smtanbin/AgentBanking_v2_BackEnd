const path = require("path")
const nodeExternals = require("webpack-node-externals")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: "./dist/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js",
  },
  target: "node",
  externals: [nodeExternals()],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "config.json"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "client", "index.html"),
          to: path.resolve(__dirname, "dist", "public"),
        },
        {
          from: path.resolve(__dirname, "package.json"),
          to: path.resolve(__dirname, "dist", "package.json"),
        },
      ],
    }),
  ],
}
