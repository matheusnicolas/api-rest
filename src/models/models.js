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
    id : { type: Sequelize.INTEGER, primaryKey: true },
    matricula : Sequelize.STRING,
    sexo : Sequelize.STRING,
    email: Sequelize.STRING
});

User.sync();