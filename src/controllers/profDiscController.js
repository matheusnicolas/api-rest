import express from 'express'
import HttpStatus from 'http-status-codes'
import {ProfDisc} from '../models/models'

export let getAllProfDisc = (req, res) => {
    ProfDisc.findAll().then((profDisc) => {
        res.status(HttpStatus.OK).json(profDisc).send()
    });
};

export let cadastrarProfDisc = (req, res) => {
    const disciplinaId = req.body.disciplina;
    const professorId = req.body.professor;
    let data = {userId: professorId, disciplinaId: disciplinaId};
    ProfDisc.create(data).then(profDisc => {
        res.status(HttpStatus.CREATED).json(profDisc).send();
    }).catch(erro => {
        res.status(HttpStatus.BAD_REQUEST).json()
    })
}