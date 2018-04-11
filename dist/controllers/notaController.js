'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.excluirNota = exports.editarNota = exports.cadastrarNota = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _models = require('../models/models');

var _notaExceptions = require('../exceptions/notaExceptions');

var exceptions = _interopRequireWildcard(_notaExceptions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var cadastrarNota = exports.cadastrarNota = function cadastrarNota(req, res) {
    var data = req.body;
    _models.Nota.create(req.body).then(function (nota) {
        res.status(_httpStatusCodes2.default.CREATED).json(nota).send();
    }).catch(function (erro) {
        res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErrorCatch(_httpStatusCodes2.default)).send();
    });
};

/*
export let getAllNotasDoAluno = (req, res) => {
    const nomeAluno = req.params.nome_aluno
    Nota.findOne({where: {nomeAluno}}).then((nota) =>{
        if(nota){
            if(nomeAluno === nota.aluno){
                Nota.findAll().then((nota) => {
                res.status(HttpStatus.OK).json(nota).send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
        }
        }
            
        
    })
}

export let getNotasDoSemestreDoAlunoPorUnidade = (req, res) => {
    const nomeAluno = req.params.nome_aluno
    const semestre = req.params.semestre
    const unidade = req.params.unidade
    Nota.findOne({where: {nomeAluno}}).then((nota) =>{
        if(nomeAluno === nota.aluno){
            Nota.findById(semestre).then(nota => {
                if(nota){
                    Nota.findById(unidade).then(nota => {
                        if(nota){
                            res.status(HttpStatus.OK).json(nota).send()
                        }
                    })
                }
            })
        }
    })
    
} */

var editarNota = exports.editarNota = function editarNota(req, res) {
    var idNota = req.params.nota_id;
    _models.Nota.findById(idNota).then(function (nota) {
        if (nota) {
            var data = req.body;
            nota.update(data).then(function () {
                res.status(_httpStatusCodes2.default.OK).json(nota).send();
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErrorCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundNota()).send();
        }
    });
};

var excluirNota = exports.excluirNota = function excluirNota(req, res) {
    var idNota = req.params.id_nota;
    _models.Nota.findById(idNota).then(function (nota) {
        if (nota) {
            nota.destroy().then(function (nota) {
                res.status(_httpStatusCodes2.default.OK).json(nota.send());
            }).catch(function (erro) {
                res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
            });
        } else {
            res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundNota()).send();
        };
    });
};