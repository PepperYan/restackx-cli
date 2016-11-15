'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = require('redux-saga/effects');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _updeep = require('updeep');

var _updeep2 = _interopRequireDefault(_updeep);

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _updeep3 = require('./reducers/updeep');

var _updeep4 = _interopRequireDefault(_updeep3);

var _errorMessage = require('./reducers/errorMessage');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

var _modal = require('./reducers/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function () {
  function App(config) {
    (0, _classCallCheck3.default)(this, App);


    var sagaMiddleware = (0, _reduxSaga2.default)();

    var initialApp = {

      initialState: {},

      middlewares: [sagaMiddleware],

      reducers: {
        errorMessage: _errorMessage2.default,
        modal: _modal2.default
      },

      plugins: [],

      configureStore: _configureStore2.default,

      models: []
    };

    var overrides = _lodash2.default.pick(config, ['initialState', 'configureStore', 'plugins']);

    this.app = (0, _extends4.default)({}, initialApp, overrides);

    var _app = this.app;
    var middlewares = _app.middlewares;
    var reducers = _app.reducers;


    this.app = (0, _extends4.default)({}, this.app, {
      middlewares: _lodash2.default.compact(middlewares.concat(config.middlewares)),
      reducers: (0, _extends4.default)({}, reducers, config.reducers)
    });

    this.app.sagaMiddleware = sagaMiddleware;
  }

  (0, _createClass3.default)(App, [{
    key: 'model',
    value: function model(_model) {
      var app = this.app;

      app.models = [].concat((0, _toConsumableArray3.default)(app.models), [_model]);
    }
  }, {
    key: 'createStore',
    value: function createStore() {
      var app = this.app;

      // merge plugin reducers into app reducers

      var reducers = app.plugins.reduce(function (all, plugin) {
        return (0, _extends4.default)({}, all, plugin.reducers);
      }, app.reducers);

      // merge plugin initialState
      var initialState = app.plugins.reduce(function (all, plugin) {
        return (0, _extends4.default)({}, all, plugin.initialState);
      }, app.initialState);

      var middlewares = app.plugins.reduce(function (all, plugin) {
        return [].concat((0, _toConsumableArray3.default)(all), (0, _toConsumableArray3.default)(plugin.middlewares || []));
      }, app.middlewares);

      // model initialState
      var modelInitialState = app.models.reduce(function (all, model) {
        return (0, _extends4.default)({}, all, (0, _defineProperty3.default)({}, model.name, model.initialState));
      }, {});

      return (0, _configureStore2.default)((0, _updeep4.default)(modelInitialState, reducers), initialState, middlewares);
    }
  }, {
    key: 'createSagas',
    value: function createSagas() {
      var app = this.app;


      var sagas = (0, _lodash2.default)(app.models).filter(function (m) {
        return m.sagas;
      }).reduce(function (all, m) {

        var sagas = (0, _lodash2.default)(m.sagas).mapKeys(function (v, k) {
          return m.name + '/' + k;
        }).mapValues(function (v, k) {
          // update effect creator
          function updateFor(name) {
            return function update(path, updates) {
              if (arguments.length === 1) {
                updates = path;
                path = null;
              }
              return (0, _effects.put)({ type: "@@update", name: name, update: true, updates: updates, path: path });
            };
          }
          // redux-saga effects as second parameter, plus update effect
          var enhancedEffects = (0, _extends4.default)({}, _reduxSaga.effects, { update: updateFor(m.name) });
          return _regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log('takeEvery: ' + k);
                    // yield takeEvery(k, v)
                    _context.next = 3;
                    return (0, _reduxSaga.takeEvery)(k, function (action) {
                      return v(action, enhancedEffects);
                    });

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          });
        }).value();

        return (0, _extends4.default)({}, all, sagas);
      }, {});

      return sagas;
    }
  }, {
    key: 'create',
    value: function create() {
      var app = this.app;


      var store = window.store = app.store = this.createStore();

      var sagas = this.createSagas();

      _lodash2.default.each(sagas, app.sagaMiddleware.run);

      // create chain
      // Promise.resolve() -> plugin1.create -> plugin2.create, ... -> return Root
      return app.plugins.reduce(function (chain, plugin) {
        return chain.then(function (component) {
          return new _promise2.default(function (resolve, reject) {
            plugin.create(resolve, component, app);
          });
        });
      }, _promise2.default.resolve()).then(function (component) {
        return _react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          component
        );
      });
    }
  }, {
    key: 'render',
    value: function render(el) {
      var app = this.app;


      this.create().then(function (RootComponent) {
        console.log('got root component');

        var renderChain = app.plugins.reduce(function (chain, plugin) {
          return chain.then(function (result) {
            return new _promise2.default(function (resolve, reject) {
              plugin.render(resolve);
            });
          });
        }, _promise2.default.resolve());

        renderChain.then(function () {
          console.log('final');

          if (el) {
            _reactDom2.default.render(RootComponent, el);
            // return something?
          } else {
            return RootComponent;
          }
        });
      });
    }
  }]);
  return App;
}(); // core frameworks


function createApp(config) {
  return new App(config);
}

exports.default = createApp;