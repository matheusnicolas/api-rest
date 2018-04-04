'use strict';

var _models = require('../models/models');

exports.getUser = function (req, res) {
    _models.User.findAll().then(function (user) {
        res.send(user);
    });
};

exports.cadastrarUser = function (req, res) {
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var cpf = req.body.cpf;
    var username = req.body.username;
    var password = req.body.password;
    var id = req.body.id;
    var matricula = req.body.matricula;
    var sexo = req.body.sexo;
    var email = req.body.email;
    var data = { nome: nome, sobrenome: sobrenome, cpf: cpf, username: username, password: password, id: id, matricula: matricula, sexo: sexo, email: email };
    _models.User.create(data).then(function (user) {
        res.json({ menssage: user });
    });
};

exports.editarUser = function (req, res) {
    _models.User.findById(req.params.id).then(function (user) {
        if (user) {
            user.update({
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                cpf: req.body.cpf,
                username: req.body.username,
                password: req.body.password,
                id: req.body.id,
                matricula: req.body.matricula,
                sexo: req.body.sexo,
                email: req.body.email
            }).then(function () {
                res.json(user);
            });
        } else {
            res.json({ erro: 'Usuário não existe..' });
        }
    });
};