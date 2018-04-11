import express from 'express'
import HttpStatus from 'http-status-codes'
import * as exceptions from '../exceptions/turmaExceptions'
import {Turma} from '../models/models'

export let getAllTurma = (req, res) => {
    Turma.findAll().then((turma) => {
        res.status(HttpStatus.OK).json(turma).send()
    });
};

export let cadastrarTurma = ((req, res) => {
    const data = req.body
    Turma.create(req.body).then((turma) => {
        res.status(HttpStatus.CREATED).json(turma).send()
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    });
    
});

export let getTurmaById = ((req, res) => {
    const idTurma = req.params.id_turma
    Turma.findById(idTurma).then(turma => {
        if(turma){
            res.status(HttpStatus.OK).json(turma).send();
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundTurma()).send()
        };
    });
});

export let editarTurma = (req, res) => {
    const idTurma = req.params.id_turma
    Turma.findById(idTurma).then((turma) => {
        if(turma){
            const data = req.body
            turma.update(data).then(() => {
                res.status(HttpStatus.OK).json(turma).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(exceptions.responseErrorCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundTurma()).send()
        };
    });
};

export let excluirTurma = ((req, res) => {
    const idTurma = req.params.id_turma
    Turma.findById(idTurma).then(turma => {
        if(turma){
            turma.destroy().then((turma) => {
                res.status(HttpStatus.OK).json(turma).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
                .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundTurma()).send()
        };
    });
});
