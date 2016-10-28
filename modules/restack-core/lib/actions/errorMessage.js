'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetErrorMessage = resetErrorMessage;
var RESET_ERROR_MESSAGE = exports.RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}