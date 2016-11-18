'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE = undefined;
exports.createModelReducer = createModelReducer;
exports.createUpdateEffect = createUpdateEffect;

var _redux = require('redux');

var _updeep = require('updeep');

var _updeep2 = _interopRequireDefault(_updeep);

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE = exports.UPDATE = '@@restack/update';

function createModelReducer(namespace, initialState) {

  return function modelReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];
    var path = action.path;
    var updates = action.updates;


    if (action.type == UPDATE && action.namespace == namespace) {
      console.log('[restack] model update state: ' + namespace + '.' + path + ' -> ' + updates);
      if (path) {
        state = _updeep2.default.updateIn(path, updates, state);
      } else {
        state = (0, _updeep2.default)(updates, state);
      }
      return state;
    } else {
      return state;
    }
  };
}

function createUpdateEffect(namespace) {
  return function update(path, updates) {
    if (arguments.length === 1) {
      updates = path;
      path = null;
    }
    return (0, _effects.put)({ type: UPDATE, namespace: namespace, update: true, updates: updates, path: path });
  };
}