var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var makeConfig = require("./base.config.js").makeConfig;
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var plugins = [];

// 这里不用program的原因是 webpack命令带args 执行到.parse(process.argv);时会发生错误
var cwd = process.cwd();
const prjectPath = cwd + "/config/prod"
var project = require(prjectPath)

const keys = _.keys(project.entries);

plugins.push(new HtmlWebpackPlugin({
  chunks: keys,
  filename:`index.html`,//分模块文件夹
  template: `${cwd}/template.html`
}));
plugins.push(new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
}))

plugins.push(new ExtractTextPlugin("[name].[hash].css"))
// plugins.push(new UglifyJsPlugin({
//   sourceMap: false
// }));
plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
plugins.push(new webpack.optimize.UglifyJsPlugin({
   compress: { warnings: false },
   output: { comments: false }
}))


var config = makeConfig({
  entry: project.entries,
  output: {
    path: `${cwd}/dist`,
    publicPath: './',
    filename:'[name].[hash].js'
  },
  mode:'production',

  plugins: plugins
}, cwd, project, "production")

module.exports =  config
