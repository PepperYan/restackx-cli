"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showModal = showModal;
exports.hideModal = hideModal;
// modal actions
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