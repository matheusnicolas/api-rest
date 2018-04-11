'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.atualizarPontuacao = exports.excluirAtividade = exports.submeterAtividade = exports.getAtividade = exports.getAllAtividade = exports.cadastrarAtividade = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _models = require('../models/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
	});
};

var getAllAtividade = exports.getAllAtividade = function getAllAtividade(req, res) {
	_models.Atividade.findAll().then(function (atividades) {
		res.status(_httpStatusCodes2.default.OK).json(atividade).send();
	});
};

var getAtividade = exports.getAtividade = function getAtividade(req, res) {
	var id_Atividade = req.params.id_Atividade;
	_models.Atividade.findById(id_Atividade).then(function (atividade) {
		if (atividade) {
			res.status(_httpStatusCodes2.default.OK).json(atividade).send();
		} else {
			res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundAtividade()).send();
		}
	});
};

var submeterAtividade = exports.submeterAtividade = function submeterAtividade(req, res) {
	var id_Atividade = req.body.id_Atividade;
	_models.Atividade.findById(id_Atividade).then(function (atividade) {
		if (atividade) {
			var arquivoAtividade = req.body.arquivoAtividade;
			var data = { arquivoAtividade: arquivoAtividade };
			atividade.update(data).then(function (atividade) {
				res.status(_httpStatusCodes2.default.OK).json(atividade).send();
			}).catch(function (erro) {
				res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
			});
		} else {
			res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundAtividade()).send();
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

var atualizarPontuacao = exports.atualizarPontuacao = function atualizarPontuacao(req, res) {
	var id_Atividade = req.body.id_Atividade;
	_models.Atividade.findById(id_Atividade).then(function (atividade) {
		if (atividade) {
			var pontuacao = req.body.pontuacao;
			var data = { pontuacao: pontuacao };
			atividade.update(data).then(function () {
				res.status(_httpStatusCodes2.default.OK).json(atividade).send();
			}).catch(function (erro) {
				res.status(_httpStatusCodes2.default.BAD_REQUEST).json(responseErroCatch(_httpStatusCodes2.default.BAD_REQUEST)).send();
			});
		} else {
			res.status(_httpStatusCodes2.default.NOT_FOUND).json(responseNotFoundAtividade()).send();
		}
	});
};

function responseErroCatch(code) {
	var erro = { msg: _httpStatusCodes2.default.getStatusText(code) };
	return erro;
}

function responseNotFoundAtividade() {
	return { msg: ATIVIDADE_NOT_FOUND };
}

var ATIVIDADE_NOT_FOUND = "Atividade não cadastrada.";