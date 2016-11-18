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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _updeep = require('updeep');

var _updeep2 = _interopRequireDefault(_updeep);

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _model2 = require('./model');

var _errorMessage = require('./reducers/errorMessage');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

var _modal = require('./reducers/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// core frameworks
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
    key: 'models',
    value: function models(_models) {
      this.app.models = _models;
    }

    // 1. collect reducers from plugins & models (created by framework)
    // 2. collect initialState from app config & plugins
    // 3. collect middlewares from plugins
    // 4. create store

  }, {
    key: 'createStore',
    value: function createStore() {
      var app = this.app;


      var reducers = app.reducers;
      // merge plugin reducers into app reducers
      reducers = app.plugins.reduce(function (all, plugin) {
        return (0, _extends4.default)({}, all, plugin.reducers);
      }, reducers);
      // create a default Reducer for each model
      reducers = app.models.reduce(function (all, model) {
        var modelReducer = (0, _model2.createModelReducer)(model.name, model.initialState);
        return (0, _extends4.default)({}, all, (0, _defineProperty3.default)({}, model.name, modelReducer));
      }, reducers);

      // merge plugin initialState
      var initialState = app.plugins.reduce(function (all, plugin) {
        return (0, _extends4.default)({}, all, plugin.initialState);
      }, app.initialState);

      var middlewares = app.plugins.reduce(function (all, plugin) {
        return [].concat((0, _toConsumableArray3.default)(all), (0, _toConsumableArray3.default)(plugin.middlewares || []));
      }, app.middlewares);

      return (0, _configureStore2.default)(reducers, initialState, middlewares);
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
          // redux-saga effects as second parameter, plus update effect
          var enhancedEffects = (0, _extends4.default)({}, _reduxSaga.effects, { update: (0, _model2.createUpdateEffect)(m.name) });
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

      // run sagas
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


      return this.create().then(function (RootComponent) {
        console.log('[restack] root component created');

        var renderChain = app.plugins.reduce(function (chain, plugin) {
          return chain.then(function (result) {
            return new _promise2.default(function (resolve, reject) {
              plugin.render(resolve);
            });
          });
        }, _promise2.default.resolve());

        return renderChain.then(function () {
          console.log('[restack] render');

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
}();

function createApp(config) {
  return new App(config);
}

exports.default = createApp;