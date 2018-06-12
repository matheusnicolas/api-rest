import express from 'express'
import HttpStatus from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as auth from '../middlewares/auth'
import {User} from '../models/models'

const fs = require('fs')
const fileType = require('file-type')

let router = express.Router()

export let profile = (req, res) => {
    res.status(HttpStatus.OK).json(req.user).send()
}

export let login = (req, res) => {
    User.findOne({where: {username: req.body.username}}).then((user) => {
        if(user){
            console.log(user.get({plain: true}))
            bcrypt.compare(req.body.password, user.get({plain:true}).password).then((result) => {
                console.log(result)
                if(result){
                    const token = jwt.sign(user.get({plain:true}), auth.SECRET_ENCODING_MESSAGE)
                    res.status(HttpStatus.OK).json({message: 'usuário autenticado', token: token}).send()    
                }else{
                    res.status(HttpStatus.BAD_REQUEST).json({message: 'username ou senha incorreto(s)'}).send()    
                }
            })
        }
        console.log('passou pelo if e else')
    })
}

export let getUser = (req, res) => {
    User.findAll().then((user) => {
        res.send(user);
    });
};

export let cadastrarUser = ((req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const cpf = req.body.cpf;
    const username = req.body.username;
    const password = req.body.password;
    const matricula = req.body.matricula;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const dataValidacao = {nome:nome, 
                            sobrenome:sobrenome, 
                            cpf:cpf, 
                            username:username, 
                            matricula:matricula, 
                            sexo:sexo, 
                            email:email};
    
    bcrypt.hash(req.body.password, 12).then(result => {
        const data = {nome:nome, sobrenome:sobrenome, cpf:cpf, username:username, password:result, matricula:matricula, sexo:sexo, email:email};
        User.create(data).then((user) => {
            if(req.body.foto){
                console.log("tem foto");   
                let foto = salvarFotoUsuario(req.body.foto, user.username)
                user.update({foto:foto}).then((user) => {
                    res.status(HttpStatus.OK).json({user: user});
                });
            }else{
                res.status(HttpStatus.OK).json({user: user});
            }
        }).catch (erro =>{
            res.status(250).json({erro: erro.errors[0].path});
        });
    });
});

export let getUserById = ((req, res) => {
    User.findById(req.params.user_id).then(user => {
        if(user){
            res.json(user);
        }else{
            res.json({error: 'Usuário não existe...'})
        }
    });
});

export let editarUser = ((req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const cpf = req.body.cpf;
    const username = req.body.username;
    const password = req.body.password;
    const matricula = req.body.matricula;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const dataValidacao = {nome:nome, 
                            sobrenome:sobrenome, 
                            cpf:cpf, 
                            username:username, 
                            matricula:matricula, 
                            sexo:sexo, 
                            email:email};
    
    bcrypt.hash(req.body.password, 12).then(result => {
        const data = {nome:nome, sobrenome:sobrenome, cpf:cpf, username:username, password:result, matricula:matricula, sexo:sexo, email:email};
        User.findById(req.params.user_id).then((user) => {
            if(user){
                user.update(data).then(user => {
                    const token = jwt.sign(user.get({plain:true}), auth.SECRET_ENCODING_MESSAGE)
                    if(req.body.foto){
                        console.log("tem foto");   
                        let foto = salvarFotoUsuario(req.body.foto, user.username)
                        user.update({foto:foto}).then((user) => {
                            res.status(HttpStatus.OK).json({user: user, token: token});
                        });
                    }else{
                        res.status(HttpStatus.OK).json({user: user, token: token});
                    }
                })
            }
        }).catch (erro =>{
            res.status(HttpStatus.BAD_REQUEST).json({erro: erro});
        });
    });
});


export let excluirUser = ((req, res) => {
    User.findById(req.params.user_id).then(user => {
        if(user){
            user.destroy().then((user) => {
                res.json({message: 'Usuário excluido com sucesso!'})
            });
        }else{
            res.json({erro: 'Usuário não encontrado...'})
        }
    });
});

/*
    função responsável por salvar a foto de perfil de um usuário
    em um diretório no sistema operacional
*/
function salvarFotoUsuario(codigoBase64, nomeFoto){
    let buffer = new Buffer(codigoBase64, 'base64')
    let extensaoFoto = fileType(buffer).ext
    nomeFoto = nomeFoto + '.' + extensaoFoto
    fs.writeFileSync(BASE_URL_SAVE + nomeFoto, buffer)
    return BASE_URL_FOTO_USUARIO + nomeFoto
}

const BASE_URL_FOTO_USUARIO = '/static/images/'
const BASE_URL_SAVE = 'public/images/'

export default router