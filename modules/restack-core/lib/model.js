'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = createModel;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _updateReducer = require('./utils/updateReducer');

var _createAbortableSaga = require('./utils/createAbortableSaga');

var _createAbortableSaga2 = _interopRequireDefault(_createAbortableSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = function () {
  function Model(config) {
    (0, _classCallCheck3.default)(this, Model);

    if (!config.name) throw new Error('must provide a model name.');
    this.config = config;
  }

  (0, _createClass3.default)(Model, [{
    key: 'createSaga',
    value: function createSaga() {
      var _marked = [modelRootSaga].map(_regenerator2.default.mark);

      var _config = this.config,
          name = _config.name,
          reducers = _config.reducers,
          createSaga = _config.createSaga,
          sagas = _config.sagas;

      // redux-saga effects as second parameter, plus update effect

      var enhancedEffects = (0, _extends3.default)({}, _reduxSaga.effects, { update: (0, _updateReducer.createUpdateEffect)(name) });

      if (_lodash2.default.isFunction(createSaga)) return createSaga(enhancedEffects);

      var sagaGenerators = (0, _lodash2.default)(sagas).mapValues(function (v, k) {

        var watcher = _regenerator2.default.mark(function watcher() {
          return _regenerator2.default.wrap(function watcher$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log('takeEvery: ' + name + '/' + k);
                  // yield takeEvery(k, v)
                  // yield takeEvery(k, (action) => v(action, enhancedEffects))
                  _context.next = 3;
                  return (0, _reduxSaga.takeEvery)(name + '/' + k, function (action) {
                    return v(action, enhancedEffects);
                  });

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, watcher, this);
        });

        return (0, _createAbortableSaga2.default)(watcher);
      }).values().value();

      // return a new generator forks all sagas above
      //
      // yield [
      //   fork(g1),
      //   fork(g2)
      // ]
      function modelRootSaga() {
        return _regenerator2.default.wrap(function modelRootSaga$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return sagaGenerators.map(function (s) {
                  return (0, _effects.fork)(s);
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _marked[0], this);
      }

      return modelRootSaga;
    }
  }, {
    key: 'createReducer',
    value: function createReducer() {
      var _config2 = this.config,
          name = _config2.name,
          initialState = _config2.initialState,
          reducers = _config2.reducers,
          reducer = _config2.reducer;

      // custom create function

      if (_lodash2.default.isFunction(reducer)) return reducer;

      var modelReducer = null;

      if (_lodash2.default.isFunction(reducers)) {
        modelReducer = reducers;
      } else if (_lodash2.default.isObject(reducers) && !_lodash2.default.isEmpty(reducers)) {
        modelReducer = (0, _redux.combineReducers)(reducers);
      }

      // update reducer
      var updateReducer = (0, _updateReducer.createUpdateReducer)(name, initialState);

      var modelRootReducer = function modelRootReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        if (_lodash2.default.isFunction(modelReducer)) {
          state = modelReducer(state, action);
        }
        return updateReducer(state, action);
      };

      if (modelRootReducer(undefined, {}) === undefined) {
        throw new Error('Reducer of Model:[' + name + '] returned undefined during initialization. initialState should define in either model.initialState or model.reducers');
      }

      return modelRootReducer;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.config.name;
    }
  }]);
  return Model;
}();

function createModel(model) {
  return new Model(model);
}