const path = require("path")
const nodeExternals = require("webpack-node-externals")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: "./dist/main.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  target: "node",
  externals: [nodeExternals()],
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
        test: /\.sql$/i,
        use: "raw-loader",
      },
      {
        test: /\.svg$/,
        use: "svg-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: "[name].[ext]",
              outputPath: "img", // output to the public/img directory
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              outputPath: "style",
            },
          },
        ],
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
          from: "src/**/*.css",
          to: "[path][name][ext]",
        },
        { from: "config.json", to: "config.json" },
        { from: "package.json", to: "package.json" },
        {
          from: "src/**/*.html",
          to: "[path][name][ext]",
          force: true,
        },
        {
          from: "src/model/**/*.sql",
          to: "[path][name][ext]",
          force: true,
        },
        {
          from: "src/img/**/*.*",
          to: "img/[path][name][ext]",
          force: true,
        },
      ],
    }),
  ],
}
