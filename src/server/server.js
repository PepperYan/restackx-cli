import path         from 'path';
import _            from 'lodash';
import express      from 'express';
import cookieParser from 'cookie-parser';
var bodyParser = require('body-parser');
var program = require('./program');


// init express instance
var app = new express();
var cwd = program.cwd;
var env = program.env;
console.log(`[RAS]: Project directory: ${cwd}, mode: ${env}`);

// http proxy for dev env
// if (process.env.NODE_ENV != 'production') {
//   require('./proxy')(app,"138.68.41.35");
// }

app.use(cookieParser());

// serve web resources
if (process.env.NODE_ENV == 'production' || env == 'prod') {
  // run in production mode
  console.log("start production mode");
  app.use('/', express.static(`${cwd}/dist`));
  app.get("/", function(req, res) {
    res.sendFile(`${cwd}/dist/index.html`);
  })
} else {
  // run in dev mode with webpack
  var webpack = require('webpack');
  var browserSync = require('browser-sync');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var projectConfig = require(`${cwd}/config/${env}`)
  var config = require(`../webpack/webpack.${env}.config`)(cwd, projectConfig);
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: "/",
    stats: { colors: true }
  }));
  app.use(webpackHotMiddleware(compiler, {
    hot: true
  }));
}

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
