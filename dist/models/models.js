'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sala = exports.Turma = exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('kula_bd', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

var User = exports.User = sequelize.define('user', {
    nome: _sequelize2.default.STRING,
    sobrenome: _sequelize2.default.STRING,
    cpf: _sequelize2.default.STRING,
    username: _sequelize2.default.STRING,
    password: _sequelize2.default.STRING,
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    },
    matricula: _sequelize2.default.STRING,
    sexo: _sequelize2.default.STRING,
    email: _sequelize2.default.STRING
});

var Turma = exports.Turma = sequelize.define('turma', {
    sigla: _sequelize2.default.STRING,
    serie: _sequelize2.default.INTEGER,
    sala: _sequelize2.default.STRING,
    aluno: _sequelize2.default.STRING,
    professor: _sequelize2.default.STRING,
    id: {
        type: _sequelize2.default.INTEGER, autoIncrement: true, primaryKey: true
    }

});

var Sala = exports.Sala = sequelize.define('sala', {
    id: {
        type: _sequelize2.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    },
    capacidade: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    }
});

//Turma.hasMany(User, {foreignKey: 'aluno', sourceKey: 'id'});
//User.belongsTo(Turma, {foreignKey: 'aluno', targetKey: 'id'});

User.sync();
Turma.sync();
Sala.sync();