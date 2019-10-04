const path = require('path')

module.exports = {
  entry: {
    index: './lib/core.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015,presets[]=stage-0'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: 'RecordComparison',
    libraryTarget: 'commonjs2'
  }
}
