'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = configureStore;

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _DevTools = require('../containers/DevTools');

var _DevTools2 = _interopRequireDefault(_DevTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// middlewares
function configureStore(rootReducer, initialState) {
  var middlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


  rootReducer = (0, _redux.combineReducers)(rootReducer);

  var store = (0, _redux.createStore)(rootReducer, initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middlewares)), _DevTools2.default.instrument()));

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store;
}