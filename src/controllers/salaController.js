import express from 'express'
import HttpStatus from 'http-status-codes'
import {Sala} from '../models/models'
import * as exceptions from '../exceptions/salaExceptions'

let router = express.Router()

export let cadastrarSala = (req, res) => {
    const data = req.body
    Sala.create(req.body).then((sala) => {
        res.status(HttpStatus.CREATED).json(sala).send()
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    })
    
}

export let getSala = (req, res) => {
    const idSala = req.params.id_sala
    Sala.findById(idSala).then((sala) => {
        if(sala){
            res.status(HttpStatus.OK).json(sala).send()
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundSala()).send()
        }
    })
}

export let getAllSala = (req, res) => {
    Sala.findAll().then((salas) => {
        res.status(HttpStatus.OK).json(salas).send()
    })
}

export let atualizarSala = (req, res) => {
    const idSala = req.params.id_sala
    Sala.findById(idSala).then((sala) => {
        if(sala){
            const data = req.body
            sala.update(data).then(() => {
                res.status(HttpStatus.OK).json(sala).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundSala()).send()
        }
    })
}

export let excluirSala = (req, res) => {
    const idSala = req.params.id_sala
    Sala.findById(idSala).then((sala) => {
        if(sala){
            sala.destroy().then((sala) => {
                res.status(HttpStatus.OK).json(sala).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                        .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
                        .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundSala()).send()
        }
    })
}