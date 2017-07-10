var path = require('path');


// paths
var root = path.dirname(path.resolve(__dirname));
var src = path.join(root, 'src');
var public = path.join(root, 'public');
var dist = path.join(root, 'dist');

var paths = {
  root: root,
  src: src,
  public: public,
  dist: dist,
}
// end paths

// env
var env = process.env.NODE_ENV;

if (!env) {
  throw new Error('You must set NODE_ENV');
}
// end env

// globals
var globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(env),
  },
  __DEV__: env === 'development',
  __PROD__: env === 'production',
};
// end globals

// dev server
var server = {
  port: 3000,
  proxy: {
    '/api': {
      target: `http://localhost:8000`, // eslint-disable-line no-underscore-dangle
      pathRewrite: { '^/api': '' },
      logLevel: 'info',
      changeOrigin: true,
    },
  }
}
// end dev server

module.exports = {
  paths: paths,
  env: env,
  globals: globals,
  server: server,
}
