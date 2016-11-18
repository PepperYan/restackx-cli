'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = configureStore;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// reducers
function configureStore(rootReducer, initialState) {
  var middlewares = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];


  rootReducer = (0, _redux.combineReducers)(rootReducer);

  return (0, _redux.createStore)(rootReducer, initialState, _redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middlewares)));
}