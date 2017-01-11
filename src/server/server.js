import path         from 'path';
import _            from 'lodash';
import express      from 'express';
import cookieParser from 'cookie-parser';
var bodyParser = require('body-parser');
var program = require('./program');
var fs = require('fs');

// init express instance
var app = new express();
var cwd = program.cwd;
var env = program.env;
console.log(`[RAS]: Project directory: ${cwd}, mode: ${env}`);

const bootServer = () => {

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  if (process.env.NODE_ENV !== 'production' || env !== 'production') {
    require('./app')(app,cwd,env)
  }

  // default port 3000
  var port = process.env.PORT || 3000;

  app.listen(port, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
  });

}

app.use(cookieParser());

// serve web resources
if (process.env.NODE_ENV == 'production' || env == 'prod') {
  // run in production mode
  console.log("start production mode");
  app.use('/', express.static(`${cwd}/dist`));
  app.get("/", function(req, res) {
    res.sendFile(`${cwd}/dist/index.html`);
  })

  var projectConfig = require(`${cwd}/config/${env}`);
  if(projectConfig.proxies && projectConfig.proxies.length != 0){
    require('./proxy')(app,projectConfig.proxies);
  }

  bootServer();
} else {
  // run in dev mode with webpack
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var projectConfig = require(`${cwd}/config/${env}`);

  //正在使用deprecated api,6.9.1LTS后使用fs.access
  fs.exists(`${cwd}/webpack`, (exists) => {
    var config;
    if (exists) {
      console.error('custom webpack config exists');
      config = require(`${cwd}/webpack/webpack.${env}.config`);
    } else {
      config = require(`../webpack/webpack.${env}.config`)(cwd, projectConfig);
    }

    if(projectConfig.proxies && projectConfig.proxies.length != 0){
      require('./proxy')(app,projectConfig.proxies);
    }
    console.error('using custom webpack config for devserver');
    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: "/",
      stats: { colors: true }
    }));
    app.use(webpackHotMiddleware(compiler, {
      hot: true
    }));
    bootServer();

  });


  // 在node 6.9.1LTS后才能用
  // fs.access(`${cwd}/webpack`, fs.constants.R_OK | fs.constants.W_OK, (err) => {
  //   console.log(err ? 'no access!' : 'can read/write');
  //   var config;
  //   if(!err){
  //     console.log('using custom webpack config')
  //     config = require(`${cwd}/webpack/webpack.${env}.config`);
  //   }else{
  //     config = require(`../webpack/webpack.${env}.config`)(cwd, projectConfig);
  //   }
  //
  //   if(projectConfig.proxies && projectConfig.proxies.length != 0){
  //     require('./proxy')(app,projectConfig.proxies);
  //   }
  //
  //   var compiler = webpack(config);
  //   app.use(webpackDevMiddleware(compiler, {
  //     noInfo: true,
  //     publicPath: "/",
  //     stats: { colors: true }
  //   }));
  //   app.use(webpackHotMiddleware(compiler, {
  //     hot: true
  //   }));
  //
  // });

}
