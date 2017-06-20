'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const util = require('./util');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: util.isDevelopment,
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([
    {
      from: 'src/assets',
      to: 'assets'
    },
  ]),
  new ExtractTextPlugin("styles.css"),
];

const shouldSourceMap = process.env.TEST || util.isDevelopment;

const sourceMapPlugins = [
  new webpack.SourceMapDevToolPlugin({filename: null, test: /\.jsx?$/})
];

const shouldOptimize = util.isProduction;

const optimizePlugins = [
  new UglifyJSPlugin(),
  new CompressionPlugin({
           asset: "static/[path].gz[query]",
           algorithm: "gzip",
           test: /\.(js|html)$/,
           threshold: 10240,
           minRatio: 0.8
       })
];

module.exports = basePlugins
  .concat(shouldSourceMap ? sourceMapPlugins : [])
  .concat(shouldOptimize ? optimizePlugins : []);
