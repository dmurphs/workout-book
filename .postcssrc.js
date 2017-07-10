var path = require('path');

var config = require('./tools/config');

module.exports = {
  plugins: {
    'postcss-import': {
      path: [path.join(config.paths.src, 'styles')],
    },
    'postcss-mixins': {},
    'postcss-nested': {},
    lost: {
      flexbox: 'flex'
    },
    'postcss-cssnext': {}
  }
}
