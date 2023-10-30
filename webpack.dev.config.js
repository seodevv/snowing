const { merge } = require('webpack-merge');
const common = require('./webpack.config');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    https: true,
    port: 5500,
    open: true,
    historyApiFallback: true, // react-router 를 사용할 경우
  },
  output: {
    // path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.js',
    // clean: true,
    //   publicPath: '/',
    //   assetModuleFilename: "asset/[hash][ext][query]",
  }, // 출력 경로을 지정
});
