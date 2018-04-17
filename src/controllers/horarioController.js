import express from 'express'
import HttpStatus from 'http-status-codes'
import {Disciplina, Horario, ProfTurma} from '../models/models'

export let getAllHorarios = (req, res) => {
    Horario.findAll().then((horario) => {
        res.status(HttpStatus.OK).json(horario).send()
    })
};

export let cadastrarHorario = (req, res) => {
    const professorId = req.body.professorId;
    const turmaId = req.body.turmaId;
    const diaSemana = req.body.diaSemana;
    const ordemAula = req.body.ordemAula;
    //let profTurma = ProfTurma.findOne({where: {professorId: professorId, turmaId: turmaId}}).then( profTurma => {
    let profTurma = User.findOne({where: {username: 'oguiraw'}}).then( user => {
        console.log(user);
        const data = {profTurma: 1, diaSemana:diaSemana, ordemAula:ordemAula}
        Horario.create(data).then(horario => {
            res.status(HttpStatus.CREATED).json(horario).send();
        });
    }).catch(erro => {
        res.status(HttpStatus.BAD_REQUEST).json("profTurma não encontrado!").send();
    });
}