'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Provider = require('./Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _Tools = require('./Tools');

var _Tools2 = _interopRequireDefault(_Tools);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserLocale(defaultLocale) {
  if (process.env.BROWSER) {
    return sessionStorage['locale'] || defaultLocale;
  } else {
    return defaultLocale;
  }
}

function fetchLocaleData(locale) {

  // format like this :
  // "": { "domain": "messages", "lang": "" }
  return (0, _isomorphicFetch2.default)('/lang/' + locale + '.json').then(function (res) {
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }

    return res.json();
  });
}

exports.default = {
  Provider: _Provider2.default,
  Tools: _Tools2.default,
  getUserLocale: getUserLocale,
  fetchLocaleData: fetchLocaleData
};