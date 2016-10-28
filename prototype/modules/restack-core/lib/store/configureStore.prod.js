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

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// reducers
function configureStore(rootReducer, initialState) {
  var middlewares = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];


  rootReducer = (0, _redux.combineReducers)((0, _extends3.default)({}, rootReducer, {
    routing: _reactRouterRedux.routerReducer
  }));

  var routerMiddleware = (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory);

  return (0, _redux.createStore)(rootReducer, initialState, _redux.applyMiddleware.apply(undefined, [_reduxThunk2.default, routerMiddleware].concat((0, _toConsumableArray3.default)(middlewares))));
}
// middlewares