'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Nota = exports.Disciplina = exports.Sala = exports.Turma = exports.User = undefined;

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
    cpf: { type: _sequelize2.default.STRING, unique: true },
    username: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
    password: { type: _sequelize2.default.STRING, allowNull: false },
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    },
    matricula: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
    sexo: _sequelize2.default.STRING,
    email: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
    foto: { type: _sequelize2.default.STRING(512), allowNull: true }
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
    numero: {
        type: _sequelize2.default.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    capacidade: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    }
});

var Disciplina = exports.Disciplina = sequelize.define('disciplina', {
    nome: _sequelize2.default.STRING,
    id: {
        type: _sequelize2.default.INTEGER, autoIncrement: true, primaryKey: true
    }

});

var Nota = exports.Nota = sequelize.define('nota', {
    aluno: _sequelize2.default.STRING,
    nota: _sequelize2.default.DOUBLE,
    unidade: _sequelize2.default.INTEGER,
    bimestre: _sequelize2.default.INTEGER,
    professor: _sequelize2.default.STRING,
    id: {
        type: _sequelize2.default.INTEGER, autoIncrement: true, primaryKey: true
    }
});

//Turma.hasMany(User, {foreignKey: 'aluno', sourceKey: 'id'});
//User.belongsTo(Turma, {foreignKey: 'aluno', targetKey: 'id'});

User.sync();
Turma.sync();
Sala.sync();
Disciplina.sync();
Nota.sync();