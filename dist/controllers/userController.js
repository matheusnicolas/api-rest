'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.excluirUser = exports.editarUser = exports.getUserById = exports.cadastrarUser = exports.getUser = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _models = require('../models/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var fileType = require('file-type');

var router = _express2.default.Router();

var getUser = exports.getUser = function getUser(req, res) {
    _models.User.findAll().then(function (user) {
        res.send(user);
    });
};

var cadastrarUser = exports.cadastrarUser = function cadastrarUser(req, res) {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var cpf = req.body.cpf;
    var username = req.body.username;
    var password = req.body.password;
    var matricula = req.body.matricula;
    var sexo = req.body.sexo;
    var email = req.body.email;
    var data = { nome: nome, sobrenome: sobrenome, cpf: cpf, username: username, password: password, matricula: matricula, sexo: sexo, email: email };
    _models.User.create(data).then(function (user) {
        var foto = salvarFotoUsuario(req.body.foto, user.username);
        user.update({ foto: foto }).then(function (user) {
            res.json({ menssage: user });
        });
    });
};

var getUserById = exports.getUserById = function getUserById(req, res) {
    _models.User.findById(req.params.user_id).then(function (user) {
        if (user) {
            res.json(user);
        } else {
            res.json({ error: 'Usuário não existe...' });
        }
    });
};

var editarUser = exports.editarUser = function editarUser(req, res) {
    _models.User.findById(req.params.user_id).then(function (user) {
        if (user) {
            var foto = salvarFotoUsuario(req.body.foto, user.username);
            user.update({
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                cpf: req.body.cpf,
                username: req.body.username,
                password: req.body.password,
                id: req.body.id,
                matricula: req.body.matricula,
                sexo: req.body.sexo,
                email: req.body.email,
                foto: foto
            }).then(function () {
                res.json(user);
            });
        } else {
            res.json({ erro: 'Usuário não existe' });
        }
    });
};

var excluirUser = exports.excluirUser = function excluirUser(req, res) {
    _models.User.findById(req.params.user_id).then(function (user) {
        if (user) {
            user.destroy().then(function (user) {
                res.json({ message: 'Usuário excluido com sucesso!' });
            });
        } else {
            res.json({ erro: 'Usuário não encontrado...' });
        }
    });
};

/*
    função responsável por salvar a foto de perfil de um usuário
    em um diretório no sistema operacional
*/
function salvarFotoUsuario(codigoBase64, nomeFoto) {
    var buffer = new Buffer(codigoBase64, 'base64');
    var extensaoFoto = fileType(buffer).ext;
    nomeFoto = nomeFoto + '.' + extensaoFoto;
    fs.writeFileSync(BASE_URL_SAVE + nomeFoto, buffer);
    return BASE_URL_FOTO_USUARIO + nomeFoto;
}

var BASE_URL_FOTO_USUARIO = '/static/images/';
var BASE_URL_SAVE = 'public/images/';

exports.default = router;