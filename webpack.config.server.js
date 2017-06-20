var fs = require('fs');
var path = require('path');
const loaders = require('./webpack/loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: path.resolve(__dirname, './ssrServer.js'),

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    loaders: [
      loaders.jsx,
      loaders.html,
      loaders.css,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
      loaders.png,
      loaders.jpg,
      loaders.json
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.[chunkhash].css',
      allChunks: true
    }),
  ],
};
