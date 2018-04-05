import express from 'express'
import HttpStatus from 'http-status-codes'
import {Sala} from '../models/models'

let router = express.Router()

export let cadastrarSala = (req, res) => {
    const numero = req.body.numero
    const capacidade = req.body.capacidade
    const data = {numero: numero, capacidade: capacidade}

    Sala.create(data).then((sala) => {
        res.status(HttpStatus.CREATED).json(sala).send()
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    })
}

export let getSala = (req, res) => {
    const idSala = req.params.id_sala
    Sala.findById(idSala).then((sala) => {
        if(sala){
            res.status(HttpStatus.OK).json(sala).send()
        }else{
            res.status(HttpStatus.BAD_REQUEST).json({msg: "Sala não existe"})
        }
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
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
            const numero = req.body.numero
            const capacidade = req.body.capacidade
            const data = {numero: numero, capacidade: capacidade}
            sala.update(data).then(() => {
                res.status(HttpStatus.OK).json(sala).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }
    })
}

export let excluirSala = (req, res) => {
    const idSala = req.params.id_sala
    Sala.findById(idSala).then((sala) => {
        sala.destroy().then((sala) => {
            res.status(HttpStatus.OK).json(sala).send()
        }).catch((erro) => {
            res.status(HttpStatus.BAD_REQUEST)
                    .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
        })
    })
}

function responseErroCatch(code){
    let erro = {msg: HttpStatus.getStatusText(code)}
    return erro
}