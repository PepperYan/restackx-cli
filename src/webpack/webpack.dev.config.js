var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var makeConfig = require("./base.config.js").makeConfig;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var final = 'webpack-hot-middleware/client' + (project.staticUrl ? `?${project.staticUrl}` : '')
// console.log(`final: ${final}`)


module.exports = function(cwd, project) {
  var entries = _.mapValues(project.entries, function(v, k){
    return path.join(cwd, v)
  })

  var entries = _.mapValues(project.entries, function(v, k){
    const path = (project.staticUrl&&project.staticUrl !== '') ? `path=${project.staticUrl}/__webpack_hmr` : ""
    return [v, `webpack-hot-middleware/client?${path}`, 'webpack/hot/only-dev-server'] //['webpack-dev-server/client?http://localhost:3000/']
  })

  return makeConfig({
    // context: cwd,
    devtool: "eval-source-map",
    //为每个entry增加hot load
    entry: entries,
    output: {
      // 如果webpack-server的端口与app-server的端口不一样，hmr会使用这个路径作为前缀，加载热补丁
      publicPath: `${project.staticUrl}/`
    },
    resolve: {
      alias: {
        config: `${cwd}/config/dev`
      }
    },
    plugins: [
      new ExtractTextPlugin("vendors.css"),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: `vendors.js`,
        // (Modules must be shared between 3 entries)
        minChunks: 2
        // (Only use between these entries)
        // chunks: ["index", "kitchensink"]
      }),
      // new webpack.DllReferencePlugin({
      //   context: '.',
      //   manifest: require('../static/webpack-dll/vendors-manifest.json'),
      // }),
      // new HtmlWebpackPlugin({
      //     title: 'index',
      //     hash:true, //prevent cache
      //     template: 'template.html'
      // }),
    ]
  },cwd)
}
