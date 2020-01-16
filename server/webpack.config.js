/* # ---------------------------------------------
# ---------------------------------------------
# Author: Richie Roldan
# Date:   Saturday January 11th 2020
# Last Modified by: Richie Roldan - <roldan.rv@achealth.com.ph>
# Last Modified time: January 11th 2020, 7:02:38 pm
# ---------------------------------------------
# --------------------------------------------- */

/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// let nodeModules = {};
// fs.readdirSync('node_modules')
//   .filter(function(x) {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach(function(mod) {
//     nodeModules[mod] = 'commonjs ' + mod;
//   });


module.exports = () => ({
  mode: 'production',
  entry: [path.join(process.cwd(),'src/index.js')],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  target: 'node',
  // externals: nodeModules,
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});
