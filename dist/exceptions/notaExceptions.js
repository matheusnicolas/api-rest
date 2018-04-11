'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MSG_NOTA_NOT_FOUND = exports.responseNotFoundNota = exports.responseErrorCatch = undefined;

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responseErrorCatch = exports.responseErrorCatch = function responseErrorCatch(code) {
    var erro = { error: _httpStatusCodes2.default.getStatusText(code) };
    return erro;
};

var responseNotFoundNota = exports.responseNotFoundNota = function responseNotFoundNota() {
    return { error: MSG_NOTA_NOT_FOUND };
};

var MSG_NOTA_NOT_FOUND = exports.MSG_NOTA_NOT_FOUND = 'nota não encontrada';