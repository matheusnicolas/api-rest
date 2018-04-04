
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

