const webpack = require('webpack');
const path = require('path')

module.exports = {
  entry: './client/app.js',
  output: {
    filename: 'compiled.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  watch: true,
}
