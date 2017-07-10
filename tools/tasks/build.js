var gulp = require('gulp');
var webpack = require('webpack');

var webpackConfig = require('../webpack.config.production');

gulp.task('build', ['clean'], function(cb) {
  var compiler = webpack(webpackConfig);

  compiler.run(function(err, stats) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(stats.toString({chunks: false, colors: true}))
  });
});
