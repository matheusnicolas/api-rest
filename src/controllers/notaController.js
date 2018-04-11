import express from 'express'
import HttpStatus from 'http-status-codes'
import {Nota} from '../models/models'
import * as exceptions from '../exceptions/notaExceptions'

let router = express.Router()

export let cadastrarNota = (req, res) => {
    const data = req.body
    Nota.create(req.body).then((nota) => {
        res.status(HttpStatus.CREATED).json(nota).send()
    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(exceptions.responseErrorCatch(HttpStatus))
                .send()
    })
};

/*
export let getAllNotasDoAluno = (req, res) => {
    const nomeAluno = req.params.nome_aluno
    Nota.findOne({where: {nomeAluno}}).then((nota) =>{
        if(nota){
            if(nomeAluno === nota.aluno){
                Nota.findAll().then((nota) => {
                res.status(HttpStatus.OK).json(nota).send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
        }
        }
            
        
    })
}

export let getNotasDoSemestreDoAlunoPorUnidade = (req, res) => {
    const nomeAluno = req.params.nome_aluno
    const semestre = req.params.semestre
    const unidade = req.params.unidade
    Nota.findOne({where: {nomeAluno}}).then((nota) =>{
        if(nomeAluno === nota.aluno){
            Nota.findById(semestre).then(nota => {
                if(nota){
                    Nota.findById(unidade).then(nota => {
                        if(nota){
                            res.status(HttpStatus.OK).json(nota).send()
                        }
                    })
                }
            })
        }
    })
    
} */

export let editarNota = ((req, res) => {
    const idNota = req.params.nota_id
    Nota.findById(idNota).then(nota => {
        if(nota){
            const data = req.body
            nota.update(data).then(() => {
                res.status(HttpStatus.OK).json(nota).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErrorCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
        }
    })
})

export let excluirNota = ((req, res) => {
    const idNota = req.params.id_nota
    Nota.findById(idNota).then(nota=> {
        if(nota){
            nota.destroy().then((nota) => {
                res.status(HttpStatus.OK).json(nota.send())
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErroCatch(HttpStatus.BAD_REQUEST))
                .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundNota()).send()
        };
    });
});
