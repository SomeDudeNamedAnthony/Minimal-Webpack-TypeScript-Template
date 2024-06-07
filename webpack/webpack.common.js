const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDir = path.join(__dirname, "..", "app");
const srcDir = path.join(appDir, "src");
const assetsDir = path.join(appDir, "assets");

module.exports = {
  entry: {
    app: path.join(srcDir, "index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx$/i,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          filename: "[name].bundle.js",
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      appName: "Webpack-TypeScript-Template",
      template: path.join(appDir, "views", "index.html"),
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: assetsDir, to: "assets" },
        { from: path.join(assetsDir, "favicon.ico"), to: "" },
      ],
    }),
  ],
};
