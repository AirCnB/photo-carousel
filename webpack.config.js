const path = require('path');

module.exports = {
  entry: './src/components/index.jsx',
  output: {
    filename: 'compiled.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
