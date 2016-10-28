'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _DevTools = require('../containers/DevTools');

var _DevTools2 = _interopRequireDefault(_DevTools);

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// reducers
function configureStore(rootReducer, initialState) {
  var middlewares = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];


  rootReducer = (0, _redux.combineReducers)((0, _extends3.default)({}, rootReducer, {
    routing: _reactRouterRedux.routerReducer
  }));

  // enable navigation via redux actions
  // https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions
  // http://stackoverflow.com/questions/32612418/transition-to-another-route-on-successful-async-redux-action/32922381#32922381
  var routerMiddleware = (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory);

  var store = (0, _redux.createStore)(rootReducer, initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default, (0, _reduxLogger2.default)(), routerMiddleware].concat((0, _toConsumableArray3.default)(middlewares))), _DevTools2.default.instrument()));

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store;
}
// middlewares