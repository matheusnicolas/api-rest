'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.excluirDisciplina = exports.editarDisciplina = exports.listarDisciplinas = exports.cadastrarDisciplina = exports.getAllDisciplinas = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _models = require('../models/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var getAllDisciplinas = exports.getAllDisciplinas = function getAllDisciplinas(req, res) {
    _models.Disciplina.findAll().then(function (disciplina) {
        res.status(_httpStatusCodes2.default.OK).json(disciplina).send();
    });
};

var cadastrarDisciplina = exports.cadastrarDisciplina = function cadastrarDisciplina(req, res) {
    var nome = req.body.nome;
    var data = { nome: nome };

    _models.Disciplina.create(data).then(function (disciplina) {
        res.status(_httpStatusCodes2.default.CREATED).json(disciplina).send();
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
    });
};

var listarDisciplinas = exports.listarDisciplinas = function listarDisciplinas(req, res) {
    var idDisciplina = req.params.id_disciplina;
    _models.Disciplina.findById(idDisciplina).then(function (disciplina) {
        if (disciplina) {
            res.status(_httpStatusCodes2.default.OK).json(disciplina).send();
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundDisciplina()).send();
        }
    });
};

var editarDisciplina = exports.editarDisciplina = function editarDisciplina(req, res) {
    var idDisciplina = req.params.id_disciplina;
    _models.Disciplina.findById(idDisciplina).then(function (disciplina) {

        if (disciplina) {
            var nome = req.body.nome;
            var data = { nome: nome };
            disciplina.update(data).then(function (disciplina) {
                res.status(_httpStatusCodes2.default.OK).json(disciplina).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundDisciplina()).send();
        }
    });
};

var excluirDisciplina = exports.excluirDisciplina = function excluirDisciplina(req, res) {
    var idDisciplina = req.params.id_disciplina;
    _models.Disciplina.findById(idDisciplina).then(function (disciplina) {

        if (disciplina) {
            disciplina.destroy().then(function (disciplina) {
                res.status(_httpStatusCodes2.default.OK).json(disciplina).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundDisciplina()).send();
        }
    });
};

function responseErroCatch(code) {
    var erro = { msg: _httpStatusCodes2.default.getStatusText(code) };
    return erro;
}

function responseNotFoundDisciplina() {
    return { msg: DISCIPLINA_NOT_FOUND };
}

var DISCIPLINA_NOT_FOUND = "Disciplina não existe";

exports.default = router;