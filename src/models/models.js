import Sequelize from 'sequelize'

let sequelize = new Sequelize('kula_bd', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

export let User = sequelize.define('user', {
    nome : Sequelize.STRING,
    sobrenome : Sequelize.STRING,
    cpf : Sequelize.STRING,
    username : Sequelize.STRING,
    password : Sequelize.STRING,
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    matricula : Sequelize.STRING,
    sexo : Sequelize.STRING,
    email: Sequelize.STRING
});

export let Turma = sequelize.define('turma', {
    sigla: Sequelize.STRING,
    serie: Sequelize.INTEGER,
    sala: Sequelize.STRING,
    aluno: Sequelize.STRING,
    professor: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    }

});

export let Sala = sequelize.define('sala', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//Turma.hasMany(User, {foreignKey: 'aluno', sourceKey: 'id'});
//User.belongsTo(Turma, {foreignKey: 'aluno', targetKey: 'id'});

User.sync();
Turma.sync();
Sala.sync();