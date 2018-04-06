'use strict';

var _models = require('../models/models');

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