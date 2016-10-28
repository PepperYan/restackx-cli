'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = exports.i18n = exports.createReducer = exports.configureStore = undefined;

var _configureStore2 = require('./store/configureStore');

var _configureStore3 = _interopRequireDefault(_configureStore2);

var _createReducer2 = require('./utils/createReducer');

var _createReducer3 = _interopRequireDefault(_createReducer2);

var _i18n2 = require('./i18n');

var _i18n3 = _interopRequireDefault(_i18n2);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.configureStore = _configureStore3.default;
exports.createReducer = _createReducer3.default;
exports.i18n = _i18n3.default;
exports.App = _app2.default;