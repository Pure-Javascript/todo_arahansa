const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    path: '/dist',
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env', {
            targets: { node: 'current' }, // 노드일 경우만
            modules: 'commonjs',
            useBuiltIns: 'usage'
          }
          ],
          '@babel/preset-react', // 리액트를 쓴다면
          '@babel/preset-typescript' // 타입스크립트를 쓴다면
        ],
      },
      exclude: ['/node_modules'],
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // 아래 EnvironmentPlugin처럼 할 수도 있습니다.
    }),
    new webpack.EnvironmentPlugin({ 'NODE_ENV': 'production' }), // 요즘은 DefinePlugin보다 이렇게 하는 추세입니다.
  ],
  optimization: {
    minimize: false,
    splitChunks: {},
    concatenateModules: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
