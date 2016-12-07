'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CANCEL_SAGAS = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CANCEL_SAGAS = exports.CANCEL_SAGAS = "CANCEL_SAGAS";

var createAbortableSaga = function currySaga() {
  if (process.env.NODE_ENV !== 'development') {
    return function (watcher) {
      return watcher;
    };
  } else {
    return function (watcher) {
      return _regenerator2.default.mark(function main() {
        var sagaTask;
        return _regenerator2.default.wrap(function main$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _reduxSaga.effects.fork(watcher);

              case 2:
                sagaTask = _context.sent;
                _context.next = 5;
                return _reduxSaga.effects.take(CANCEL_SAGAS);

              case 5:
                _context.next = 7;
                return _reduxSaga.effects.cancel(sagaTask);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, main, this);
      });
    };
  }
}();

exports.default = createAbortableSaga;