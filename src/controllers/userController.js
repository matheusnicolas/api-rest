import express from 'express'
import HttpStatus from 'http-status-codes'
import {User} from '../models/models'
const fs = require('fs')
const fileType = require('file-type')

let router = express.Router()

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
    const data = {nome:nome, sobrenome:sobrenome, cpf:cpf, username:username, password:password, matricula:matricula, sexo:sexo, email:email};
    User.create(data).then((user) => {
        let foto = salvarFotoUsuario(req.body.foto, user.username)
        user.update({foto:foto}).then((user) => {
            res.json({menssage: user});
        })
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
    User.findById(req.params.user_id).then(user => {
        if(user){
            let foto = salvarFotoUsuario(req.body.foto, user.username)
            user.update({
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                cpf: req.body.cpf,
                username: req.body.username,
                password: req.body.password,
                id: req.body.id,
                matricula: req.body.matricula,
                sexo: req.body.sexo,
                email: req.body.email,
                foto: foto
            }).then(() => {
                res.json(user);
            });
        }else{
            res.json({erro: 'Usuário não existe'})
        }
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