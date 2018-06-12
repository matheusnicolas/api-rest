'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.excluirSala = exports.atualizarSala = exports.getAllSala = exports.getSala = exports.cadastrarSala = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _models = require('../models/models');

var _salaExceptions = require('../exceptions/salaExceptions');

var exceptions = _interopRequireWildcard(_salaExceptions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var cadastrarSala = exports.cadastrarSala = function cadastrarSala(req, res) {
    var data = { numero: req.body.numero, capacidade: req.body.capacidade };
    _models.Sala.create(data).then(function (sala) {
        _models.Turma.findById(req.body.turma).then(function (turma) {
            turma.update({ salaId: sala.numero }).then(function () {
                res.status(_httpStatusCodes2.default.CREATED).json(turma).send();
            });
        });
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var getSala = exports.getSala = function getSala(req, res) {
    var idSala = req.params.id_sala;
    _models.Sala.findById(idSala).then(function (sala) {
        if (sala) {
            res.status(_httpStatusCodes2.default.OK).json(sala).send();
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundSala()).send();
        }
    });
};

var getAllSala = exports.getAllSala = function getAllSala(req, res) {
    _models.Sala.findAll().then(function (salas) {
        res.status(_httpStatusCodes2.default.OK).json(salas).send();
    });
};

var atualizarSala = exports.atualizarSala = function atualizarSala(req, res) {
    var idSala = req.params.id_sala;
    _models.Sala.findById(idSala).then(function (sala) {
        if (sala) {
            var data = req.body;
            sala.update(data).then(function () {
                res.status(_httpStatusCodes2.default.OK).json(sala).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundSala()).send();
        }
    });
};

var excluirSala = exports.excluirSala = function excluirSala(req, res) {
    var idSala = req.params.id_sala;
    _models.Sala.findById(idSala).then(function (sala) {
        if (sala) {
            sala.destroy().then(function (sala) {
                res.status(_httpStatusCodes2.default.OK).json(sala).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundSala()).send();
        }
    });
};