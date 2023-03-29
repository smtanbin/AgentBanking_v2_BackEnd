const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: "./client/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "svg-inline-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: { limit: 8192, name: "[name].[hash:8].[ext]" },
          },
        ],
      },
    ],
  },
  // mode: "production",
  mode: "development",

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist", "public"),
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
      ],
    }),
  ],
}
