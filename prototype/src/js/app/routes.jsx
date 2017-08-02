import React from 'react';
import {Route, Switch} from 'react-router-dom'

import App from '../modules/demo/App';
import Page1 from '../modules/demo/Page1'
import PageTwo from '../modules/demo/Page2'

export default (
  <Route path="/">
    <App>
      <Switch>
        <Route exact path="/" component={Page1}/>
        <Route path="/pagetwo" component={PageTwo}/>
      </Switch>
    </App>
  </Route>
);
