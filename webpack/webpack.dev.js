const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    compress: true, //개발환경에서 압축하여 보여준다. 빠른 실행에 좋다.
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
  },
});
