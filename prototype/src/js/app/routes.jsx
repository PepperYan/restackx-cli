import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './App';
import NewComponent from '../demo/newcomponent'
import Demo from './demo'
import PageTwo from '../demo/page2'

export default (
  <Route path="/" component={App}>
    <Route component={Demo}>
      <IndexRoute component={NewComponent}/>
      <Route path="pagetwo" component={PageTwo}/>
    </Route>
  </Route>
);
