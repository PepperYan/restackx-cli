"use strict";
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HappyPack = require('happypack');


//改成func是因为要指定happypack的缓存路径到项目目录
function config(cwd,env){
  var less
  var css
  var scss
  if(env === 'production'){
    less = {test: /\.less$/, loader:ExtractTextPlugin.extract({fallback:"style-loader",use:['css-loader', 'less-loader']})}
    css = {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback:"style-loader",use:'css-loader'})}
    scss = {test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback:"style-loader",use:['css-loader', 'sass-loader']})}
  }else{
    less = {test: /\.less$/, use:[ 'style-loader','css-loader','less-loader']};
    css = {test: /\.css$/, use:[ 'style-loader','css-loader']};
    scss = {test: /\.scss$/, use:[ 'style-loader','css-loader','sass-loader']};
  }

  
  // less = {test: /\.less$/, use:[ 'style-loader','css-loader','less-loader']};
  // css = {test: /\.css$/, use:[ 'style-loader','css-loader']};
  // scss = {test: /\.scss$/, use:[ 'style-loader','css-loader','sass-loader']};


  return {
    cache:true,
    context: cwd,
    entry: {
    },
    output: {
      // path: relative to cwd(current working directory), not work with path.resolve(__dirname, xxxx)
      path: '/static',
      publicPath: "/",
      filename: '[name].js'
    },
    module: {
      rules: [
        // 使用原生babel-loader
        // {
        //   test: /\.js[x]?$/,
        //   loader: 'babel-loader?cacheDirectory=true&id=jsx',
        //   exclude: /(node_modules|bower_components)/,
        //   options: {
        //     "presets": [
        //       [
        //         "es2015", {"modules":false }
        //       ],
        //       "stage-1",
        //       "react"
        //     ],
        //     "plugins": [
        //       "transform-decorators-legacy",
        //       "transform-class-properties",
        //       "transform-object-rest-spread",
        //       "transform-decorators",
        //       "transform-runtime",
        //       "syntax-async-functions",
        //       "transform-regenerator",
        //       "transform-object-assign"
        //     ],
        //     "env": {
        //       "development": {
        //         "presets": ["react-hmre"]
        //       }
        //     }
        //   }
        // },

        //替换happypack loader
        {
          test: /\.js[x]?$/,
          loaders: [ 'happypack/loader?id=js' ],
          exclude: /(node_modules|bower_components)/,
        },

        less,
        css,
        scss,

        { 
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/, 
          loader: 'url-loader?limit=10000' 
        },
      ],
    },
    resolve: {
      modules: ['node_modules', 'bower_components'],
      extensions: [".js", '.jsx',".json"],
      alias: {

      }
    },
    plugins: [
      new ExtractTextPlugin("[name].[hash].css"),
      new webpack.DefinePlugin({
        "process.env": {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify( env || 'development' )
        }
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      
      new HappyPack({
        id:"js",
        loaders:[
          {
            path:'babel-loader',
            query:{
              "presets": [
                [
                  "es2015", {"modules":false }
                ],
                "stage-1",
                "react"
              ],
              "plugins": [
                "transform-decorators-legacy",
                "transform-class-properties",
                "transform-object-rest-spread",
                "transform-decorators",
                "transform-runtime",
                "syntax-async-functions",
                "transform-regenerator",
                "transform-object-assign"
              ],
              "env": {
                "development": {
                  "presets": ["react-hmre"]
                }
              },
              "cacheDirectory":true
            }
          }
        ],
        threads:13
      })
    ]
  };
}

// merge webpack config options
function merge(target, source) {
  // base props
  target = Object.assign( {}, target, _.pick(source, ['devtool']) )

  target.entry = Object.assign({}, target.entry, source.entry)
  target.output = Object.assign({}, target.output, source.output)
  target.plugins = target.plugins.concat( source.plugins )

  return target
}

module.exports.makeConfig = function(newConfig,cwd, env) {
  return merge(_.cloneDeep(config(cwd, env)), newConfig);
}
