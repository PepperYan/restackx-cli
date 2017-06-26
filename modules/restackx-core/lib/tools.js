"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleModels = handleModels;
function handleModels(context) {
  var models = {};
  var preHandle = context.keys().map(function (key) {
    var array = key.split("/");
    var fullName = array[array.length - 1];
    var name = array[array.length - 1].slice(0, fullName.length - 9);
    var modelCls = context(key).default;
    return models[name] = new modelCls();
  });
  return models;
}