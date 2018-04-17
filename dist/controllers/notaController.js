'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.excluirNota = exports.editarNota = exports.getAllNotasUnidade = exports.getAllNotasBimestre = exports.cadastrarNota = exports.getAllNotas = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _models = require('../models/models');

var _notaExceptions = require('../exceptions/notaExceptions.js');

var exceptions = _interopRequireWildcard(_notaExceptions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllNotas = exports.getAllNotas = function getAllNotas(req, res) {
    _models.Nota.findAll().then(function (nota) {
        res.status(_httpStatusCodes2.default.OK).json(nota).send();
    });
};

var cadastrarNota = exports.cadastrarNota = function cadastrarNota(req, res) {
    var nota = req.body.nota;
    var unidade = req.body.unidade;
    var bimestre = req.body.bimestre;
    var data = { nota: nota, unidade: unidade, bimestre: bimestre };
    _models.Nota.create(data).then(function (nota) {
        res.status(_httpStatusCodes2.default.CREATED).json(nota).send();
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErrorCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var getAllNotasBimestre = exports.getAllNotasBimestre = function getAllNotasBimestre(req, res) {
    var bimestre = req.params.bimestre_params;
    _models.Nota.findAll({ where: { bimestre: bimestre } }).then(function (nota) {
        if (nota) {
            res.status(_httpStatusCodes2.default.OK).json(nota).send();
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundNota()).send();
        }
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErrorCatch)(_httpStatusCodes2.default.BAD_REQUEST).send();
    });
};

var getAllNotasUnidade = exports.getAllNotasUnidade = function getAllNotasUnidade(req, res) {
    var unidade = req.params.unidade_params;
    _models.Nota.findAll({ where: { unidade: unidade } }).then(function (nota) {
        if (nota) {
            res.status(_httpStatusCodes2.default.OK).json(nota).send();
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundNota()).send();
        }
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErrorCatch)(_httpStatusCodes2.default.BAD_REQUEST).send();
    });
};

var editarNota = exports.editarNota = function editarNota(req, res) {
    var bimestre = req.body.bimestre_params;
    var unidade = req.body.unidade_params;
    _models.Nota.findOne({ where: { bimestre: bimestre, unidade: unidade } }).then(function (nota) {
        if (nota) {
            var _nota = req.body.nota;
            var data = { nota: _nota };
            _nota.update(data).then(function (nota) {
                res.status(_httpStatusCodes2.default.OK).json(nota).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundNota()).send();
        }
    });
};

var excluirNota = exports.excluirNota = function excluirNota(req, res) {
    var bimestre = req.body.bimestre;
    var unidade = req.body.unidade;
    _models.Nota.findOne({ where: { bimestre: bimestre, unidade: unidade } }).then(function (nota) {
        if (nota) {
            nota.destroy().then(function (nota) {
                res.status(_httpStatusCodes2.default.OK).json(nota).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundNota()).send();
        }
    });
};