const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const WebpackObfuscator = require("webpack-obfuscator");

const prod = {
  mode: "production",
  stats: "errors-warnings",
  output: {
    filename: "[name].min.js",
    chunkFilename: "[name].min.chunk.js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: "[name].min.js",
        },
      },
    },
  },

  plugins: [
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
    }),
  ],
};

module.exports = merge(common, prod);
