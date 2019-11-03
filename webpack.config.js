const path = require('path');
const HtmlWP = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(js)$/, exclude: /node_modules/, use: ['babel-loader'] }
    ]
  },
  plugins: [
    new HtmlWP({
      title: 'Excel',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.html'
    })
  ]
}