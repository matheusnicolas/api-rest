"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MSG_SALA_NOT_FOUND = exports.responseNotFoundSala = exports.responseErroCatch = undefined;

var _httpStatusCodes = require("http-status-codes");

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responseErroCatch = exports.responseErroCatch = function responseErroCatch(code) {
    var erro = { error: _httpStatusCodes2.default.getStatusText(code) };
    return erro;
};

var responseNotFoundSala = exports.responseNotFoundSala = function responseNotFoundSala() {
    return { error: MSG_SALA_NOT_FOUND };
};

var MSG_SALA_NOT_FOUND = exports.MSG_SALA_NOT_FOUND = "sala não encontrada";