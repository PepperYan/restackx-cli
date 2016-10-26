import fs       from 'fs'
import path     from 'path'
import traverse from 'fs-tree-traverse'

import _                         from 'lodash'
import express                   from 'express'
import exphbs                    from 'express-handlebars'


import React                     from 'react'

import { Provider }              from 'react-redux';
import { RouterContext, match }  from 'react-router';

import {i18n, configureStore}    from 'restack-core'

// import "css-modules-require-hook/preset"
// import routes from '../src/js/routes'

// 动态编译css和less
// var hook = require("css-modules-require-hook")
// const lessParser = require('postcss-less').parse;
// hook({
//   extensions: ['.less','.css'],
//   processorOpts: {parser: lessParser},
// });
// const routes = require('../src/js/routes').default

// console.log(`load i18n scripts...`)
//
// const i18nToolsRegistry =
// fs.readdirSync(`${__dirname}/../static/lang`)
// .reduce((all, each) => {
//   var lang = each.replace('.json', '')
//   all[lang] = new i18n.Tools({ localeData: require(`../static/lang/${each}`), locale: lang })
//   return all
// }, {})


module.exports = function(app, cwd, env){

  app.set('views', `${cwd}/src`);
  app.engine('hbs', exphbs({
    defaultLayout: null
  }));
  app.set('view engine', 'hbs');


  app.use('/images',express.static(`${cwd}/src/images`))
  app.use('/lang', express.static(`${cwd}/static/lang`))
  // app.use('/vendors.bundle.js', express.static(`${cwd}/static/webpack-dll/vendors.bundle.js`))
  var project = require(`${cwd}/config/${env}`);
  _.each(project.routes, function(v, path) {

    app.get([path], function(req, res) {
      // scripts = v.scripts.map(function(each){return `${each}.${req.params.lang}`})
      console.log(v.scripts)
      res.render(`${v.view}`, {layout: false, scripts: v.scripts,csses:v.csses});
    });
  });


}
