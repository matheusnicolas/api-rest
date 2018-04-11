'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.excluirTurma = exports.editarTurma = exports.getTurmaById = exports.cadastrarTurma = exports.getAllTurma = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _turmaExceptions = require('../exceptions/turmaExceptions');

var exceptions = _interopRequireWildcard(_turmaExceptions);

var _models = require('../models/models');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllTurma = exports.getAllTurma = function getAllTurma(req, res) {
    _models.Turma.findAll().then(function (turma) {
        res.status(_httpStatusCodes2.default.OK).json(turma).send();
    });
};

var cadastrarTurma = exports.cadastrarTurma = function cadastrarTurma(req, res) {
    var data = req.body;
    _models.Turma.create(req.body).then(function (turma) {
        res.status(_httpStatusCodes2.default.CREATED).json(turma).send();
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var getTurmaById = exports.getTurmaById = function getTurmaById(req, res) {
    var idTurma = req.params.id_turma;
    _models.Turma.findById(idTurma).then(function (turma) {
        if (turma) {
            res.status(_httpStatusCodes2.default.OK).json(turma).send();
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundTurma()).send();
        };
    });
};

var editarTurma = exports.editarTurma = function editarTurma(req, res) {
    var idTurma = req.params.id_turma;
    _models.Turma.findById(idTurma).then(function (turma) {
        if (turma) {
            var data = req.body;
            turma.update(data).then(function () {
                res.status(_httpStatusCodes2.default.OK).json(turma).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErrorCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundTurma()).send();
        };
    });
};

var excluirTurma = exports.excluirTurma = function excluirTurma(req, res) {
    var idTurma = req.params.id_turma;
    _models.Turma.findById(idTurma).then(function (turma) {
        if (turma) {
            turma.destroy().then(function (turma) {
                res.status(_httpStatusCodes2.default.OK).json(turma).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundTurma()).send();
        };
    });
};