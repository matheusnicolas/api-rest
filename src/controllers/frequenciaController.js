import express from 'express'
import HttpStatus from 'http-status-codes'
import {ProfDisc, Frequencia} from '../models/models'

export let cadastrarFrequencia = (req, res) => {
    const dataAtual = new Date()
    const professorId = req.body.professor
    const disciplinaId = req.body.disciplina
    const alunos = req.body.alunos
    
    ProfDisc.findOne({where: {disciplinaId: disciplinaId, userId: professorId}}).then((profDisc) => {
        if(profDisc){
            alunos.forEach(aluno => {
                Frequencia.create({data:dataAtual, 
                    presenca: aluno.presenca, 
                    alunoId: aluno.id,
                    profDiscId: profDisc.id}).then(frequencia => {
                        console.log('cadastrou frenquencia do aluno ' + aluno.id)
                    })
            });
            res.status(HttpStatus.CREATED).json({message: 'frequencia cadastrada com sucesso'}).send()
        }else{
            res.status(HttpStatus.BAD_REQUEST).json({message: 'disciplina não encontrada'}).send()
        }
        
    }).catch(error => {
        res.status(HttpStatus.BAD_REQUEST).json({message: 'bad request'}).send()        
    })
}