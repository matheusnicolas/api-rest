import Sequelize from 'sequelize'

let sequelize = new Sequelize('kula_bd', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

// let sequelize = new Sequelize('kula_bd', 'kula', 'kula123456', {
//     host: 'localhost',
//     port: '5432',
//     dialect: 'postgres',
//     operatorsAliases: false
// });

export let User = sequelize.define('user', {
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    nome : Sequelize.STRING,
    sobrenome : Sequelize.STRING,
    cpf : {type:Sequelize.STRING, unique: true},
    username : {type:Sequelize.STRING, allowNull: false, unique: true},
    password : {type:Sequelize.STRING, allowNull: false },
    matricula : {type:Sequelize.STRING, allowNull: false, unique:true },
    sexo : Sequelize.STRING,
    email: {type:Sequelize.STRING, allowNull: false, unique:true },
    foto: {type:Sequelize.STRING(512), allowNull: true}
});

export let Professor = sequelize.define('professor', {
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    }
});

export let Turma = sequelize.define('turma', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    sigla: Sequelize.STRING,
    serie: Sequelize.INTEGER
});

export let Sala = sequelize.define('sala', {
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export let Disciplina = sequelize.define('disciplina', {
    nome: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    }
});

export let Horario = sequelize.define('horario', {
    profTurma: {type:Sequelize.INTEGER, allowNull: false},
    diaSemana: {type:Sequelize.STRING, allowNull: false},
    ordemAula: {type:Sequelize.STRING, allowNull: false}
});

export let Atividade = sequelize.define('atividade',{
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    dataEncerramento: Sequelize.DATEONLY,
    descricao: Sequelize.STRING,
    arquivoAtividade: Sequelize.STRING
});

export let AtividadeResposta = sequelize.define('atividadeResposta', {
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    arquivoResposta: Sequelize.STRING,
    comentario: Sequelize.STRING
});


export let Nota = sequelize.define('nota', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    nota: Sequelize.DOUBLE,
    unidade: Sequelize.INTEGER,
    bimestre: Sequelize.INTEGER,
});

export let Frequencia = sequelize.define('frequencia', {
    data : Sequelize.DATE,
    presenca : Sequelize.BOOLEAN,
});


export let ProfDisc = sequelize.define('profDisc', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

export let ProfTurma = sequelize.define('profTurma', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

export let TurmaAluno = sequelize.define('turmaAluno', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

User.belongsToMany(Disciplina, { through: 'profDisc' });
Disciplina.belongsToMany(User, { through: 'profDisc'});

ProfDisc.belongsToMany(Turma, { through: 'profTurma' });
Turma.belongsToMany(ProfDisc, { through: 'profTurma'});

User.belongsToMany(ProfTurma, { through: 'turmaAluno' });
ProfTurma.belongsToMany(User, { through: 'turmaAluno'});

Nota.belongsTo(User, {foreignKey: 'alunoId'});
Nota.belongsTo(ProfDisc, {foreignKey: 'profDiscId'});

Frequencia.belongsTo(User, {foreignKey: 'alunoId'});
Frequencia.belongsTo(ProfDisc, {foreignKey: 'profDiscId'});

Atividade.belongsTo(ProfTurma, {foreignKey: 'profTurmaId'});
AtividadeResposta.belongsTo(User, {foreignKey: 'alunoId'});
AtividadeResposta.belongsTo(Atividade, {foreignKey: 'atividadeId'});

Turma.belongsTo(Sala, {foreignKey: 'salaId'});

Professor.belongsTo(User, {foreignKey: 'userId'});

User.sync();
Professor.sync(); 
Turma.sync();
Sala.sync();
Atividade.sync();
AtividadeResposta.sync();
Disciplina.sync(); 
Nota.sync();
ProfDisc.sync();
ProfTurma.sync();
Frequencia.sync();
TurmaAluno.sync();
Horario.sync();
