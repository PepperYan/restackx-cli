import 'babel-polyfill'

//styles
import '../../../lib/styles/mobiscroll.custom-3.0.0-beta6.min.css'

import _ from 'lodash'
import React                        from 'react';
import { createApp } from 'restack-core'
import router from 'restack-core/lib/plugins/router-plugin'
import i18n from 'restack-core/lib/plugins/i18n-plugin'
import {browserHistory} from 'react-router'

import routes from './routes'
import models from './models'

//choose the history that meet ur need
const app = createApp({
  plugins: [
    router({routes: routes,history:browserHistory}),
    i18n({defaultLocale: null})
  ]
});

_.each(models, (m, index)=>{
  app.model(m);
})


app.render(document.getElementById('react-view'))
