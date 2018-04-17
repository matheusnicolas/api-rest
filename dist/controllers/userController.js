'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.excluirUser = exports.editarUser = exports.getUserById = exports.cadastrarUser = exports.getUser = exports.login = exports.profile = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../middlewares/auth');

var auth = _interopRequireWildcard(_auth);

var _models = require('../models/models');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var fileType = require('file-type');

var router = _express2.default.Router();

var profile = exports.profile = function profile(req, res) {
    res.status(_httpStatusCodes2.default.OK).json(req.user).send();
};

var login = exports.login = function login(req, res) {
    _models.User.findOne({ where: { username: req.body.username } }).then(function (user) {
        if (req.body.password == user.get({ plain: true }).password) {
            var token = _jsonwebtoken2.default.sign(user.get({ plain: true }), auth.SECRET_ENCODING_MESSAGE);
            res.status(_httpStatusCodes2.default.OK).json({ message: 'usuário autenticado', token: token }).send();
        } else {
            console.log('password incorreto');
        }
        console.log('passou pelo if e else');
    });
};

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
    var dataValidacao = { nome: nome, sobrenome: sobrenome, cpf: cpf, username: username, matricula: matricula, sexo: sexo, email: email };

    _bcrypt2.default.hash(req.body.password, 12).then(function (result) {
        var data = { nome: nome, sobrenome: sobrenome, cpf: cpf, username: username, password: result, matricula: matricula, sexo: sexo, email: email };
        _models.User.create(data).then(function (user) {
            if (req.body.foto) {
                console.log("tem foto");
                var foto = salvarFotoUsuario(req.body.foto, user.username);
                user.update({ foto: foto }).then(function (user) {
                    res.status(_httpStatusCodes2.default.OK).json({ user: user });
                });
            } else {
                res.status(_httpStatusCodes2.default.OK).json({ user: user });
            }
        }).catch(function (erro) {
            res.status(250).json({ erro: erro.errors[0].path });
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
            }).catch(function (erro) {
                res.status(250).json({ erro: erro.errors[0].path });
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