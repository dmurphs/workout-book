var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var webpackConfigBase = require('./webpack.config.base');

module.exports = webpackMerge(webpackConfigBase, {
  entry: {
    app: './app.js'
  },
  plugins: [
    new UglifyJsPlugin({sourceMap: true}),
    new ExtractTextPlugin('styles.css'),
    new BundleAnalyzerPlugin()
  ],
  devtool: 'source-map'
})
