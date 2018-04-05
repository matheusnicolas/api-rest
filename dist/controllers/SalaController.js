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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var cadastrarSala = exports.cadastrarSala = function cadastrarSala(req, res) {
    var numero = req.body.numero;
    var capacidade = req.body.capacidade;
    var data = { numero: numero, capacidade: capacidade };

    _models.Sala.create(data).then(function (sala) {
        res.status(_httpStatusCodes2.default.CREATED).json(sala).send();
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var getSala = exports.getSala = function getSala(req, res) {
    var idSala = req.params.id_sala;
    _models.Sala.findById(idSala).then(function (sala) {
        if (sala) {
            res.status(_httpStatusCodes2.default.OK).json(sala).send();
        } else {
            res.status(_httpStatusCodes2.default.BAD_REQUEST).json({ msg: "Sala não existe" });
        }
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
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
            var numero = req.body.numero;
            var capacidade = req.body.capacidade;
            var data = { numero: numero, capacidade: capacidade };
            sala.update(data).then(function () {
                res.status(_httpStatusCodes2.default.OK).json(sala).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        }
    });
};

var excluirSala = exports.excluirSala = function excluirSala(req, res) {
    var idSala = req.params.id_sala;
    _models.Sala.findById(idSala).then(function (sala) {
        sala.destroy().then(function (sala) {
            res.status(_httpStatusCodes2.default.OK).json(sala).send();
        }).catch(function (erro) {
            res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
        });
    });
};

function responseErroCatch(code) {
    var erro = { msg: _httpStatusCodes2.default.getStatusText(code) };
    return erro;
}