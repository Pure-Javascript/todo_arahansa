const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

const plugins = [


];
if (devMode) {
  // only enable hot in development
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry:{
    home: ['./src/index.js', './style.css'],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: plugins
};
