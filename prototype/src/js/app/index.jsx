import React,{Component} from 'react'
import { render } from 'react-dom'
import { Router} from 'react-router'
import routes from './routes'
import { browserHistory } from 'react-router'
import Store from './store'
import {App} from 'restackx-core'

const container = document.getElementById('react-view');
render(
  <App store={Store} history={browserHistory} routes={routes}/>,
  container
)
