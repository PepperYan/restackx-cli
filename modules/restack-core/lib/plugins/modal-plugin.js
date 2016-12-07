"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showModal = showModal;
exports.hideModal = hideModal;
exports.default = modal;
var SHOW_MODAL = exports.SHOW_MODAL = "SHOW_MODAL";
var HIDE_MODAL = exports.HIDE_MODAL = "HIDE_MODAL";

function showModal(modalType, modalProps) {
  return {
    type: SHOW_MODAL,
    modalType: modalType,
    modalProps: modalProps
  };
}

function hideModal() {
  return {
    type: HIDE_MODAL
  };
}

function modal() {

  var initialState = {
    modalType: null,
    modalProps: {}
  };

  var modal = function modal() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
      case SHOW_MODAL:
        return {
          modalType: action.modalType,
          modalProps: action.modalProps
        };
      case HIDE_MODAL:
        return initialState;
      default:
        return state;
    }
  };

  return {
    reducers: {
      modal: modal
    }
  };
}