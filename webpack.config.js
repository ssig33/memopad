const path = require('path');

module.exports = {
  entry: "./js/application.js",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          "presets": ["react", "env"]
        }
      }
    ],
  },
  devtool: "inline-source-map"
};
