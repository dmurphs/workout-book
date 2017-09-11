var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = require('./config');

function jsLoaders(options) {
  var loaders = [
    {
      loader: 'babel-loader',
      options: {
        plugins: ['transform-runtime'],
      },
    },
    'eslint-loader'
  ];

  if (options.hot) {
    return ['react-hot-loader/webpack'].concat(loaders);
  }

  return loaders;
}

function cssLoaders(options) {
  var loaders = [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
      },
    },
    'postcss-loader',
  ];

  if (options.extract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader',
    });
  }

  return ['style-loader'].concat(loaders);
}

function sassLoaders(options) {
  var loaders = [
    'css-loader', {
      loader: 'sass-loader',
      options: {
        includePaths: [],
      },
    },
  ];

  if (options.extract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader',
    });
  }

  return ['style-loader'].concat(loaders);
}

module.exports = {
  context: config.paths.src,
  output: {
    path: config.paths.dist,
    filename: '[name].[hash].bundle.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: jsLoaders({
          hot: config.env === 'development',
        }),
      }, {
        test: /\.css$/,
        use: cssLoaders({
          extract: config.env === 'production',
        }),
      }, {
        test: /\.(scss|sass)$/,
        use: sassLoaders({
          extract: config.env === 'production',
        }),
      },
    ],
  },
  resolve: {
    extensions: [
      '.js', '.jsx',
    ],
    alias: {
      '@': config.paths.src,
    },
    modules: ['node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
      title: 'Workout Book',
      template: path.join(config.paths.public, 'index.html'),
    }),
  ],
};
