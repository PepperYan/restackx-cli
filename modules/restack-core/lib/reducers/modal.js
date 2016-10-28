'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('../actions/modal');

var initialState = {
  modalType: null,
  modalProps: {}
};

var modal = function modal() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _modal.SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case _modal.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

exports.default = modal;