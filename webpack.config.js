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
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.sql$/i,
        use: "raw-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "client", "index.html"),
          to: path.resolve(__dirname, "dist", "public"),
        },
        { from: "config.json", to: "config.json" },
        { from: "package.json", to: "package.json" },
        {
          from: "src/**/*.html",
          to: "[path][name][ext]",
        },
        {
          from: "src/**/*.sql",
          to: "[path][name][ext]",
        },
      ],
    }),
  ],
}
