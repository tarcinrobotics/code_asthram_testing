const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // Other configurations...
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
        },
        output: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  },
  devtool: false, // Disable source maps
};
