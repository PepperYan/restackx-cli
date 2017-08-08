var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var makeConfig = require("./base.config.js").makeConfig;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// var final = 'webpack-hot-middleware/client' + (project.staticUrl ? `?${project.staticUrl}` : '')
// console.log(`final: ${final}`)


module.exports = function (cwd, project) {

  var entries = _.mapValues(project.entries, function (v, k) {
    var path = project.staticUrl && project.staticUrl !== '' ? '?path=' + project.staticUrl + '/__webpack_hmr' : "";
    //这个v必须放最后,不然热部署会有问题
    return ['webpack-hot-middleware/client' + path, 'webpack/hot/dev-server',  v]; //['webpack-dev-server/client?http://localhost:3000/']
  });

  var keys = _.keys(project.entries);
  keys.push('vendors');

  return makeConfig({
    // context: cwd,
    devtool: "eval-source-map",
    //为每个entry增加hot load
    entry: entries,
    output: {
      // 如果webpack-server的端口与app-server的端口不一样，hmr会使用这个路径作为前缀，加载热补丁
      publicPath: project.staticUrl + '/'
    },
    resolve: {
      alias: {
        '@': path.resolve(cwd,'/src')
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js',
        // (Modules must be shared between 3 entries)
        minChunks: 2
        // (Only use between these entries)
        // chunks: ["index", "kitchensink"]
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        chunks:keys,
        hash:true,
        filename:cwd+'/.temp/index.html',//分模块文件夹
        template: cwd+'/template.html'
      }),
      new HtmlWebpackHarddiskPlugin()
    ]
  }, cwd);
};
