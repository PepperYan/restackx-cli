import 'babel-polyfill'

//styles
//import 'react-ionic/assets/css/ionicons.min.css'
import '../../lib/styles/mobiscroll.custom-3.0.0-beta6.min.css'

import _ from 'lodash'
import React                        from 'react';
import { createApp } from 'restack-core'
import router from 'restack-core/lib/plugins/router-plugin'
import i18n from 'restack-core/lib/plugins/i18n-plugin'

import routes from './routes'
import models from './modules/models'

// const app = new App({defaultLocale:null});
const app = createApp({
  plugins: [
    router({routes: routes}),
    i18n({defaultLocale: null})
  ]
});

_.each(models, (m, index)=>{
  app.model(m);
})

// app.routes = routes;
// app.middlewares = [];
// app.model = models;

app.render(document.getElementById('react-view'))
