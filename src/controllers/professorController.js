import express from 'express'
import HttpStatus from 'http-status-codes'
import {Professor} from '../models/models'
import {User} from '../models/models'
import * as exceptions from '../exceptions/professorExceptions'
import bcrypt from 'bcrypt'

const fs = require('fs')
const fileType = require('file-type')

export let getAllProfessor = (req, res) => {
    Professor.findAll().then((professor) => {
        res.status(HttpStatus.CREATED).json(professor).send()
    });
};
export let cadastrarProfessor = ((req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const cpf = req.body.cpf;
    const username = req.body.username;
    const password = req.body.password;
    const matricula = req.body.matricula;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const dataValidacao = {nome:nome, sobrenome:sobrenome, cpf:cpf, username:username, matricula:matricula, sexo:sexo, email:email};
    
    bcrypt.hash(req.body.password, 12).then(result => {
        const data = {nome:nome, sobrenome:sobrenome, cpf:cpf, username:username, password:result, matricula:matricula, sexo:sexo, email:email};
        User.create(data).then((user) => {
            if(req.body.foto){
                console.log("tem foto");   
                let foto = salvarFotoUsuario(req.body.foto, user.username)
                user.update({foto:foto}).then((user) => {
                });
            }
            Professor.create({userId: user.id}).then( prof =>{
                res.status(HttpStatus.CREATED).json(prof).send();
            })
        }).catch (error =>{
            res.status(HttpStatus.BAD_REQUEST).json({error: error});
        });
    });
});

export let editarProfessor = (req, res) => {
    const idProfessor = req.params.id_professor
    Professor.findById(idProfessor).then((professor) => {
        if(professor){
            const nome = req.body.nome
            const sobrenome = req.body.sobrenome
            const cpf = req.body.cpf
            const username = req.body.username
            const password =  req.body.password
            const matricula = req.body.matricula
            const sexo = req.body.sexo
            const email =  req.body.email
            const disciplina = req.body.disciplina
            const foto = req.body.foto
    
            const data = ({
                nome : nome,
                sobrenome : sobrenome,
                cpf : cpf,
                username : username,
                password : password,
                matricula : matricula,
                sexo : sexo,
                email : email,
                disciplina : disciplina,
                foto : foto
                
            })
            professor.update(data).then(() => {
                res.status(HttpStatus.OK).json(professor).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErrorCatch(HttpStatus.BAD_REQUEST))
                .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundProfessor()).send()
        }
    });
};

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

export let getProfessorPeloId = (req, res) => {
    const idProfessor =  req.params.id_professor
    Professor.findById(idProfessor).then((professor) => {
        if(professor){
            res.status(HttpStatus.OK).json(professor).send()
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundProfessor()).send()
        }
    });
};


export let excluirProfessor = (req, res) => {
    const idProfessor =  req.params.id_professor
    Professor.findById(idProfessor).then((professor) => {
        if(professor){
            professor.destroy().then((professor) =>{
                res.status(HttpStatus.OK).json(professor).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                .json(exceptions.responseErrorCatch(HttpStatus.BAD_REQUEST))
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(exceptions.responseNotFoundProfessor()).send()
        }
    });
};

function salvarFotoUsuario(codigoBase64, nomeFoto){
    console.log("teste 1")
    let buffer = new Buffer(codigoBase64, 'base64')
    let extensaoFoto = fileType(buffer).ext
    console.log("teste 2")
    nomeFoto = nomeFoto + '.' + extensaoFoto
    fs.writeFileSync(BASE_URL_SAVE + nomeFoto, buffer)
    return BASE_URL_FOTO_USUARIO + nomeFoto
}

const BASE_URL_FOTO_USUARIO = '/static/images/'
const BASE_URL_SAVE = 'public/images/'