var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var config = require('./config');
var webpackConfigBase = require('./webpack.config.base');

module.exports = webpackMerge(webpackConfigBase, {
  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://0.0.0.0:${config.server.port}`,
      'webpack/hot/dev-server',
      './app.js',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin(),
  ],
  devtool: 'eval',
  devServer: {
    contentBase: config.paths.dist,
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    stats: 'minimal',
    overlay: true,
    disableHostCheck: true,
    proxy: config.server.proxy,
  },
});
