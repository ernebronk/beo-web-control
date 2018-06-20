
var webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')


const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

module.exports = {
  entry: './src/index.js',
  resolve: {
   alias: {
     'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
   }
},
  module: {
    rules: [
      {test: /\.(jsx|js)$/, exclude: /node_modules/, use: {loader: 'babel-loader'}},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(woff(2)?|ttf|eot|svg|png|otf)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}
  ]
  },
  plugins: [
      htmlPlugin,
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    })
    ]
}
