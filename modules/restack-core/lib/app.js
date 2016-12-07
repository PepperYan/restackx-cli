'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _model2 = require('./model');

var _model3 = _interopRequireDefault(_model2);

var _createAbortableSaga = require('./utils/createAbortableSaga');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

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

    var _app = this.app,
        middlewares = _app.middlewares,
        reducers = _app.reducers;


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

      app.models = [].concat((0, _toConsumableArray3.default)(app.models), [(0, _model3.default)(_model)]);
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
        var modelReducer = model.createReducer();
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
      var models = this.app.models;


      return (0, _lodash2.default)(models).map(function (m) {
        return m.createSaga();
      }).compact().value();
    }

    //hmr for sagas modules

  }, {
    key: 'replaceSagas',
    value: function replaceSagas(models) {
      var _this = this;

      var app = this.app;

      app.models = models.map(function (m) {
        return (0, _model3.default)(m);
      });
      app.store.dispatch({ type: _createAbortableSaga.CANCEL_SAGAS });
      setTimeout(function () {
        var sagas = _this.createSagas();
        _lodash2.default.each(sagas, app.sagaMiddleware.run);
      });
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
          component || _react2.default.createElement('div', null)
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
            //TODO: return something?
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