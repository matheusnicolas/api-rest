import express from 'express'
import HttpStatus from 'http-status-codes'
import {Nota} from '../models/models'
import * as exceptions from '../exceptions/notaExceptions.js'

export let getAllNotas = (req, res) => {
    Nota.findAll().then((nota) => {
        res.status(HttpStatus.OK).json(nota).send()
    })
}

export let cadastrarNota = (req, res) => {
    const data = req.body
    Nota.create(data).then((nota) => {
        res.status(HttpStatus.CREATED).json(nota).send()
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(exceptions.responseErrorCatch(HttpStatus.BAD_REQUEST)).send()
    })
}

export let getAllNotasBimestre = (req, res) => {
    const bimestre = req.params.id_bimestre
    Nota.findAll({where: {bimestre: bimestre}}).then((nota) => {
    if(nota){
        res.status(HttpStatus.OK).json(nota).send()
    }else{
        res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
    }
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST).json(exceptions.responseErrorCatch)(HttpStatus.BAD_REQUEST).send()
    })
}

export let getAllNotasUnidade = (req, res) => {
    const unidade = req.params.id_unidade
    Nota.findAll({where: {unidade: unidade}}).then((nota) => {
    if(nota){
        res.status(HttpStatus.OK).json(nota).send()
    }else{
        res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
    }
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST).json(exceptions.responseErrorCatch)(HttpStatus.BAD_REQUEST).send()
    })
}

export let editarNota = (req, res) => {
    const idNota = req.params.id_nota
    Nota.findById(idNota).then((nota) => {
        if(nota){
            const nota = req.body.nota
            const data = {nota: nota}
            nota.update(data).then((nota) => {
                res.status(HttpStatus.OK).json(nota).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST).send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
        }
    })
}

export let excluirNota = (req, res) => {
    const idNota = req.params.id_nota
    Nota.findById(idNota).then((nota) => {
        if(nota){
            nota.destroy().then((nota) => {
                res.status(HttpStatus.OK).json(nota).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                        .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                        .send()
            })

        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
        }
    });
    

}