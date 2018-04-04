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
    var matricula = req.body.matricula;
    var sexo = req.body.sexo;
    var email = req.body.email;
    var data = { nome: nome, sobrenome: sobrenome, cpf: cpf, username: username, password: password, matricula: matricula, sexo: sexo, email: email };
    _models.User.create(data).then(function (user) {
        res.json({ menssage: user });
    });
};

exports.getUserById = function (req, res) {
    _models.User.findById(req.params.user_id).then(function (user) {
        if (user) {
            res.json(user);
        } else {
            res.json({ error: 'Usuário não existe...' });
        }
    });
};

exports.editarUser = function (req, res) {
    _models.User.findById(req.params.user_id).then(function (user) {
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
            res.json({ erro: 'Usuário não existe' });
        }
    });
};

exports.excluirUser = function (req, res) {
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

exports.getTurma = function (req, res) {
    _models.Turma.findAll().then(function (turma) {
        res.send(turma);
    });
};

exports.cadastrarTurma = function (req, res) {
    var sigla = req.body.sigla;
    var serie = req.body.serie;
    var sala = req.body.sala;
    var aluno = req.body.aluno;
    var professor = req.body.professor;
    var data = { sigla: sigla, serie: serie, sala: sala, aluno: aluno, professor: professor };
    _models.Turma.create(data).then(function (turma) {
        res.json({ message: turma });
    });
};

exports.getTurmaById = function (req, res) {
    _models.Turma.findById(req.params.turma_id).then(function (turma) {
        if (turma) {
            res.json(turma);
        } else {
            res.json({ error: 'Turma não encontrada' });
        }
    });
};

exports.editarTurma = function (req, res) {
    _models.Turma.findById(req.params.turma_id).then(function (turma) {
        if (turma) {
            turma.update({
                sigla: req.body.sigla,
                serie: req.body.serie,
                sala: req.body.sala,
                aluno: req.body.aluno,
                professor: req.body.professor
            }).then(function () {
                res.json(turma);
            });
        } else {
            res.json({ erro: 'Usuário não existe' });
        }
    });
};

exports.excluirTurma = function (req, res) {
    _models.Turma.findById(req.params.turma_id).then(function (turma) {
        if (turma) {
            turma.destroy().then(function (turma) {
                res.json({ message: 'Turma excluida com sucesso!' });
            });
        } else {
            res.json({ erro: 'Turma não encontrada...' });
        }
    });
};