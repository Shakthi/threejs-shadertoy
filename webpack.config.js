var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    

    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: "/build/",
    libraryTarget: 'var',
    library: 'THREE'

  }
};

