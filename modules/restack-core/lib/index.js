'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.createApp = exports.createReducer = exports.configureStore = undefined;

var _reactRouter = require('react-router');

Object.defineProperty(exports, 'browserHistory', {
  enumerable: true,
  get: function get() {
    return _reactRouter.browserHistory;
  }
});
Object.defineProperty(exports, 'hashHistory', {
  enumerable: true,
  get: function get() {
    return _reactRouter.hashHistory;
  }
});
Object.defineProperty(exports, 'createMemoryHistory', {
  enumerable: true,
  get: function get() {
    return _reactRouter.createMemoryHistory;
  }
});

var _configureStore2 = require('./store/configureStore');

var _configureStore3 = _interopRequireDefault(_configureStore2);

var _createReducer2 = require('./utils/createReducer');

var _createReducer3 = _interopRequireDefault(_createReducer2);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.configureStore = _configureStore3.default;
exports.createReducer = _createReducer3.default;
exports.createApp = _app2.default;