var del = require('del');
var gulp = require('gulp');

var config = require('../config');

gulp.task('clean', function(cb) {
  del.sync(config.paths.dist);
  cb();
});
