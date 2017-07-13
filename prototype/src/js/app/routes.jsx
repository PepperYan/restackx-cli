import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from '../modules/demo/App';
import NewComponent from '../modules/demo/newcomponent'
import PageTwo from '../modules/demo/page2'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={NewComponent}/>
    <Route path="pagetwo" component={PageTwo}/>
  </Route>
);
