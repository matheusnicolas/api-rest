import express from 'express'
import HttpStatus from 'http-status-codes'
import * as exceptions from '../exceptions/turmaExceptions'
import {Turma} from '../models/models'

export let getAllTurma = (req, res) => {
    Turma.findAll().then((turma) => {
        res.status(HttpStatus.OK).json(turma).send()
    });
};

export let getTurmaById = (req, res) => {
    const idTurma = req.params.id_turma
    Turma.findById(idTurma).then((turma) => {
        if(turma){
            res.status(HttpStatus.OK).json(turma).send();
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundTurma()).send()
        };
    });
};

export let getAllTurmasBySerie = (req, res) => {
    Turma.findAll({where: {serie: req.params.serie_params}}).then((turma) => {
        if(turma){
            res.status(HttpStatus.OK).json(turma).send()
        }else{
            res.status(HttpStatus.OK).json(exceptions.responseNotFoundTurma()).send()
        }
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST).json(exceptions.responseErrorCatch(HttpStatus.BAD_REQUEST)).send()
    })
}

export let cadastrarTurma = (req, res) => {
    const sigla = req.body.sigla
    const serie = req.body.serie
    const data = {sigla: sigla, serie: serie}
    Turma.create(data).then((turma) => {
        res.status(HttpStatus.CREATED).json(turma).send()
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    });
    
};

export let editarTurma = (req, res) => {
    const idTurma = req.params.id_turma
    Turma.findById(idTurma).then((turma) => {
        if(turma){
            const sigla = req.body.sigla
            const serie = req.body.serie
            const data = {sigla: sigla, serie: serie}
            turma.update(data).then((turma) => {
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
