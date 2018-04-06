
import {User, Turma} from '../models/models'

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
