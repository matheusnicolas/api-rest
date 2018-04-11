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
    nome : Sequelize.STRING,
    sobrenome : Sequelize.STRING,
    cpf : Sequelize.STRING,
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    matricula : Sequelize.STRING,
    sexo : Sequelize.STRING,
    email: Sequelize.STRING,
    disciplina: Sequelize.STRING,
    foto: Sequelize.STRING(512)
});

export let Turma = sequelize.define('turma', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    sigla: Sequelize.STRING,
    serie: Sequelize.INTEGER,
    sala: Sequelize.STRING    
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

export let Nota = sequelize.define('nota', {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    nota: Sequelize.DOUBLE,
    unidade: Sequelize.INTEGER,
    bimestre: Sequelize.INTEGER,
    alunoProfTurmaId : {type:Sequelize.INTEGER, allowNull: false}
});

export let Frequencia = sequelize.define('frequencia', {
    data : Sequelize.DATE,
    presenca : Sequelize.BOOLEAN,
    alunoProfTurmaId :  {type:Sequelize.INTEGER, allowNull: false}
});


export let ProfDisc = sequelize.define('profDisc', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

export let ProfTurma = sequelize.define('profTurma', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

export let AlunoProfTurma = sequelize.define('alunoProfTurma', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
});

User.belongsToMany(Disciplina, { through: 'profDisc' });
Disciplina.belongsToMany(User, {through: 'profDisc'});

User.belongsToMany(Turma, { through: 'profTurma' });
Turma.belongsToMany(User, {through: 'profTurma'});

User.belongsToMany(ProfTurma, { through: 'alunoProfTurma' });
ProfTurma.belongsToMany(User, {through: 'alunoProfTurma'});

Nota.belongsTo(AlunoProfTurma, {foreignKey: 'alunoProfTurmaId'});

Frequencia.belongsTo(AlunoProfTurma, {through: 'alunoProfTurmaId'})

//Turma.hasMany(User, {foreignKey: 'aluno', sourceKey: 'id'});
//User.belongsTo(Turma, {foreignKey: 'aluno', targetKey: 'id'});

User.sync();
Professor.sync();
Turma.sync();
Sala.sync();
Disciplina.sync(); 
Nota.sync();
ProfDisc.sync();
ProfTurma.sync();
AlunoProfTurma.sync();
Frequencia.sync();