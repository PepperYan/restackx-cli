import 'babel-polyfill'

//styles
//import 'react-ionic/assets/css/ionicons.min.css'

import React                        from 'react';
import ReactDOM                     from 'react-dom';
import { Provider }                 from 'react-redux';
import { Router, browserHistory, hashHistory }   from 'react-router';
import fetch                        from 'isomorphic-fetch';
// import cookie                       from 'cookie';

import {configureStore, i18n} from 'restack-core'
import { App } from 'restack-core'
import createSagaMiddleware from 'redux-saga'

import routes from './routes'

function requireAllAsObject(requireContext) {
  return requireContext.keys().reduce(function(all, each){
    var e = requireContext(each).default
    return {...e, ...all}
  }, {})
}

// can't use an expression as first argument to require.context. It must be a compile-time constant string.
var context = require.context("./", true, /\.reducer.js$/)

const DEFAULT_LOCALE = 'zh-cn';
// const locale = cookie.parse(document.cookie).locale || DEFAULT_LOCALE;

const initialState = window.__INITIAL_STATE__ || {};
const reducers = requireAllAsObject(context)
const store = configureStore(requireAllAsObject(context), initialState);
const sagaMiddleware = createSagaMiddleware()


// combine root sagas
function combine(...generators) {

  let result = generators.reduce((all, generator) => {
    const result = generator().next().value
    return all.concat(result);
  }, [])

  return function* generator() {
    yield result;
  }
}
import testSaga from './modules/demo/testSaga'
import rootSaga from './sagas'

const app = new App({defaultLocale:null});
app.routes = routes;
app.reducers = reducers;
app.middlewares = [sagaMiddleware];
app.render(document.getElementById('react-view')).then( ()=>{
  const saga = combine(rootSaga,testSaga)
  sagaMiddleware.run(saga)
})

//  ReactDOM.render(
//   <Provider store={store}>
//     <Router children={routes} history={browserHistory} />
//   </Provider>,
//   document.getElementById('react-view')
// );
