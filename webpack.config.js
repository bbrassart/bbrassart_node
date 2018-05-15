const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/angular/app'
  },
  output: {
    path: __dirname + '/public/js/angular/dist',
    filename: '[name].bundle.js'
  },
  resolve: {
    alias: {
      angular: path.resolve(__dirname, './node_modules/angular'),
      'angular-loading-overlay': path.resolve(__dirname, './node_modules/angular-loading-overlay'),
      'angular-loading-overlay-spinjs': path.resolve(__dirname, './node_modules/angular-loading-overlay-spinjs'),
      'angular-sanitize': path.resolve(__dirname, './node_modules/angular-sanitize'),
      'angular-resource': path.resolve(__dirname, './node_modules/angular-resource'),
      'angular-animate': path.resolve(__dirname, './node_modules/angular-animate')
    }
  },
  loader: {
    test: /\.html$/,
    use: [
      { loader: 'ngtemplate-loader/' },
      { loader: 'html-loader' }
    ]
  }
};
