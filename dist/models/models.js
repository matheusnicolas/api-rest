'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

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
    id: { type: _sequelize2.default.INTEGER, primaryKey: true },
    matricula: _sequelize2.default.STRING,
    sexo: _sequelize2.default.STRING,
    email: _sequelize2.default.STRING
});

User.sync();