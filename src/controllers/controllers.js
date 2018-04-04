
import {User, Turma} from '../models/models'


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
    const matricula = req.body.matricula;
    const sexo = req.body.sexo;
    const email = req.body.email;
    const data = {nome:nome, sobrenome:sobrenome, cpf:cpf, username:username, password:password, matricula:matricula, sexo:sexo, email:email};
    User.create(data).then((user) => {
        res.json({menssage: user});
    });
});

exports.getUserById = ((req, res) => {
    User.findById(req.params.user_id).then(user => {
        if(user){
            res.json(user);
        }else{
            res.json({error: 'Usuário não existe...'})
        }
    });
});

exports.editarUser = ((req, res) => {
    User.findById(req.params.user_id).then(user => {
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
            res.json({erro: 'Usuário não existe'})
        }
    });
});


exports.excluirUser = ((req, res) => {
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

exports.getTurma = (req, res) => {
    Turma.findAll().then((turma) => {
        res.send(turma);
    });
};

exports.cadastrarTurma = ((req, res) => {
    const sigla = req.body.sigla;
    const serie = req.body.serie;
    const sala = req.body.sala;
    const aluno = req.body.aluno;
    const professor = req.body.professor;
    const data = {sigla: sigla, serie: serie, sala: sala, aluno: aluno, professor: professor};
    Turma.create(data).then((turma) => {
        res.json({message: turma});
    });
});

exports.getTurmaById = ((req, res) => {
    Turma.findById(req.params.turma_id).then(turma => {
        if(turma){
            res.json(turma);
        }else{
            res.json({error: 'Turma não encontrada'});
        }
    });
});

exports.editarTurma = ((req, res) => {
    Turma.findById(req.params.turma_id).then(turma => {
        if(turma){
            turma.update({
            sigla: req.body.sigla,
            serie: req.body.serie, 
            sala: req.body.sala, 
            aluno: req.body.aluno, 
            professor: req.body.professor
        }).then(() => {
            res.json(turma);
        });
        }else{
            res.json({erro: 'Usuário não existe'})
        }
    });
});

exports.excluirTurma = ((req, res) => {
    Turma.findById(req.params.turma_id).then(turma => {
        if(turma){
            turma.destroy().then((turma) => {
                res.json({message: 'Turma excluida com sucesso!'})
            });
        }else{
            res.json({erro: 'Turma não encontrada...'})
        }
    });
});
