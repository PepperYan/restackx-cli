import React,{Component} from 'react'
import { render } from 'react-dom'
import routes from './routes'
import Store from './store'
import {App} from 'restackx-core'


const container = document.getElementById('container');
render(
  <App store={Store} routes={routes}/>,
  container
)

if(module.hot){
  module.hot.accept('./routes', () => {
    render(
      <App store={Store} routes={routes}/>,
      container
    )
  });
}
