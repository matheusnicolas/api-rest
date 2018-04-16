'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.excluirAtividade = exports.submeterAtividade = exports.getAtividadeById = exports.getAllAtividade = exports.cadastrarAtividade = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _atividadeExceptions = require('../exceptions/atividadeExceptions');

var exceptions = _interopRequireWildcard(_atividadeExceptions);

var _models = require('../models/models');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var cadastrarAtividade = exports.cadastrarAtividade = function cadastrarAtividade(req, res) {
	var descricao = req.body.descricao;
	var pontuacao = req.body.pontuacao;
	var dataEncerramento = req.body.dataEncerramento;
	var arquivoAtividade = req.body.arquivoAtividade;
	var turma = req.body.turma;
	var data = { pontuacao: pontuacao, dataEncerramento: dataEncerramento, descricao: descricao, arquivoAtividade: arquivoAtividade, turma: turma };

	_models.Atividade.create(data).then(function (atividade) {
		res.status(_httpStatusCodes2.default.CREATED).json(atividade).send();
	}).catch(function (erro) {
		res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
	});
};

var getAllAtividade = exports.getAllAtividade = function getAllAtividade(req, res) {
	_models.Atividade.findAll().then(function (atividade) {
		res.status(_httpStatusCodes2.default.OK).json(atividade).send();
	});
};

var getAtividadeById = exports.getAtividadeById = function getAtividadeById(req, res) {
	var id_atividade = req.params.id_atividade;
	_models.Atividade.findById(id_atividade).then(function (atividade) {
		if (atividade) {
			res.status(_httpStatusCodes2.default.OK).json(atividade).send();
		} else {
			res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseNotFoundAtividade()).send();
		}
	});
};

var submeterAtividade = exports.submeterAtividade = function submeterAtividade(req, res) {
	var id_atividade = req.params.id_atividade;
	_models.Atividade.findById(id_atividade).then(function (atividade) {
		if (atividade) {
			var data = req.body;
			atividade.update(data).then(function () {
				res.status(_httpStatusCodes2.default.OK).json(atividade).send();
			}).catch(function (erro) {
				res.status(_httpStatusCodes2.default.BAD_REQUEST).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
			});
		} else {
			res.status(_httpStatusCodes2.default.NOT_FOUND).json(exceptions.responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
		}
	});
};

var excluirAtividade = exports.excluirAtividade = function excluirAtividade(req, res) {
	var id_atividade = req.params.id_atividade;
	_models.Atividade.findById(id_atividade).then(function (atividade) {
		if (atividade) {
			atividade.destroy().then(function (atividade) {
				res.status(_httpStatusCodes2.default.OK).json(atividade).send();
			}).catch(function (erro) {
				res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
			});
		} else {
			res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundAtividade().send());
		}
	});
};

/*export let atualizarPontuacao = (req,res)=>{
	const id_Atividade= req.body.id_Atividade;
	Atividade.findById(id_Atividade).then((atividade)=>{
		if(atividade){
			const pontuacao= req.body.pontuacao;
			const data= {pontuacao:pontuacao}
			atividade.update(data).then(()=>{
				res.status(HttpStatus.OK).json(atividade).send()
			}).catch((erro)=>{
				res.status(HttpStatus.BAD_REQUEST).json(responseErroCatch(HttpStatus.BAD_REQUEST)).send()
			})
		}else{
			res.status(HttpStatus.NOT_FOUND).json(responseNotFoundAtividade()).send()
		}
	})
}*/