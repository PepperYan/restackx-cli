import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './App'
import Index from '../demo/Index'
import Next from '../demo/Next'

const rootRoute = (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path="/next" component={Next}/>
  </Route>
)

export default rootRoute
