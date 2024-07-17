const { override, disableEsLint, addWebpackPlugin } = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = override(
  disableEsLint(),
  addWebpackPlugin(
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
        },
        output: {
          comments: false,
        },
      },
      extractComments: false,
    })
  )
);
