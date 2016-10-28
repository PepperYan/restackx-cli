'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createReducer = function createReducer(initialState, handlers) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else if (handlers.hasOwnProperty('default')) {
      return handlers['default'](state, action);
    } else {
      return state;
    }
  };
};

exports.default = createReducer;