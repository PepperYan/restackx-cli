'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createUpdeep;

var _redux = require('redux');

var _updeep = require('updeep');

var _updeep2 = _interopRequireDefault(_updeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUpdeep(initialState, reducers) {

  var compose = (0, _redux.combineReducers)(reducers);

  function updateReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    console.log(state);

    if (action.type == '@@update') {
      var path = action.path;
      var updates = action.updates;
      var name = action.name;

      console.log('update state: ' + name + '.' + path + ' -> ' + updates);
      if (path) {
        state = _updeep2.default.updateIn(name + '.' + path, updates, state);
      } else {
        state = _updeep2.default.updateIn('' + name, updates, state);
      }
      return state;
    } else {
      return (0, _extends3.default)({}, state, compose(state, action));
    }
  }

  return updateReducer;
}