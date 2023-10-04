const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'react',
  // mode: 'development', // development production
  devtool: 'hidden-source-map', // eval hidden-source-map
  resolve: {
    // extensions: ['.js', '.jsx'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  entry: {
    app: ['./src/index'],
  }, // 입력

  module: {
    rules: [
      // babel 설정
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR'], // babel browserslist 참고
                },
                debug: true,
              },
            ],
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
          // plugins: ['react-refresh/babel'], // 바벨이 동작할 때 hot 리로딩 기능(react-refresh)을 추가해줌
        },
      },
      // ts loader 설정
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // css loader 설정
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // image loader 설정 (webpack 5)
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // font loader 설정 (webpack 5)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  }, // 입력과 출력 사이의 실행할 모듈을 설정(babel-loader)

  // plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  plugins: [
    new RefreshWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new Dotenv({
      path: '.env',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: false, // do not remove type="text"
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};
