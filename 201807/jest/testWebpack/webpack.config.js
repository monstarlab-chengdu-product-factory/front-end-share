
var htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    main: __dirname + '/src/index.js',
    a: __dirname + '/src/a.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name]-[chunkhash].js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'webpack test',
      template: __dirname + '/src/index.html',
      filename: 'b.html',
      inject: 'head',
      chunks: ['a'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new htmlWebpackPlugin({
      title: 'webpack test2',
      template: __dirname + '/src/index.html',
      filename: 'c.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
}