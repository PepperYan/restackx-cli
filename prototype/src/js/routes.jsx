import React from 'react';
import {Route, Switch} from 'react-router-dom'

import App from './demo/App';
import Page1 from './demo/Page1'
import PageTwo from './demo/Page2'
import Home from './home'

export default (
  <Route path="/">
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/pagetwo" component={PageTwo}/>
      </Switch>
    </App>
  </Route>
);
