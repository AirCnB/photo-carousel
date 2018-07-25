const path = require('path');

module.exports = {
  entry: './src/components/app.jsx',
  output: {
    filename: 'compiled.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react'],
          },
        },
      },
    ],
  },
  watch: true,
};
