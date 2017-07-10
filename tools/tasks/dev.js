var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('../config');
var webpackConfig = require('./../webpack.config.development');

gulp.task('dev', ['clean'], function() {
  var compiler = webpack(webpackConfig);
  var server = new WebpackDevServer(compiler, webpackConfig.devServer);

  server.listen(config.server.port);
})
