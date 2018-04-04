
import {User} from '../models/models'


exports.getUser = (req, res) => {
    User.findAll().then((user) => {
        res.send(user);
    });
};

exports.cadastrarUser = ((req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const cpf = req.body.cpf;
    const username = req.body.username;
    const password = req.body.password;
    const id = req.body.id;
    const matricula = req.body.matricula;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const data = {nome:nome, sobrenome:sobrenome, cpf:cpf, username:username, password:password, id:id, matricula:matricula, sexo:sexo, email:email};
    User.create(data).then((user) => {
        res.json({menssage: user});
    });
});

exports.editarUser = ((req, res) => {
    User.findById(req.params.id).then(user => {
        if(user){
            user.update({
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                cpf: req.body.cpf,
                username: req.body.username,
                password: req.body.password,
                id: req.body.id,
                matricula: req.body.matricula,
                sexo: req.body.sexo,
                email: req.body.email
            }).then(() => {
                res.json(user);
            });
        }else{
            res.json({erro: 'Usuário não existe..'})
        }
    });
});

exports.excluirUser = ((req, res) => {
    User.findById(req.params.id).then(user => {
        if(user){
            user.destroy().then((user) => {
                res.json({message: 'Usuário excluido com sucesso!'})
            });
        }else{
            res.json({erro: 'Usuário não encontrado...'})
        }
    });
});

