'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AlunoProfTurma = exports.ProfTurma = exports.ProfDisc = exports.Frequencia = exports.Nota = exports.Atividade = exports.Disciplina = exports.Sala = exports.Turma = exports.Professor = exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('kula_bd', null, null, {
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

var User = exports.User = sequelize.define('user', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    },
    nome: _sequelize2.default.STRING,
    sobrenome: _sequelize2.default.STRING,
    cpf: { type: _sequelize2.default.STRING, unique: true },
    username: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
    password: { type: _sequelize2.default.STRING, allowNull: false },
    matricula: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
    sexo: _sequelize2.default.STRING,
    email: { type: _sequelize2.default.STRING, allowNull: false, unique: true },
    foto: { type: _sequelize2.default.STRING(512), allowNull: true }
});

var Professor = exports.Professor = sequelize.define('professor', {
    nome: _sequelize2.default.STRING,
    sobrenome: _sequelize2.default.STRING,
    cpf: _sequelize2.default.STRING,
    username: _sequelize2.default.STRING,
    password: _sequelize2.default.STRING,
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    },
    matricula: _sequelize2.default.STRING,
    sexo: _sequelize2.default.STRING,
    email: _sequelize2.default.STRING,
    disciplina: _sequelize2.default.STRING,
    foto: _sequelize2.default.STRING(512)
});

var Turma = exports.Turma = sequelize.define('turma', {
    id: {
        type: _sequelize2.default.INTEGER, autoIncrement: true, primaryKey: true
    },
    sigla: _sequelize2.default.STRING,
    serie: _sequelize2.default.INTEGER,
    sala: _sequelize2.default.STRING
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
/*
 AtividadeAluno seria um model que teria todos esses atributos:
    aluno
    observacaoAluno
    arquivoAluno
*/

var Atividade = exports.Atividade = sequelize.define('atividade', {
    pontuacao: _sequelize2.default.DOUBLE,
    dataEncerramento: _sequelize2.default.DATEONLY,
    descricao: _sequelize2.default.STRING,
    arquivoAtividade: _sequelize2.default.STRING,
    turma: _sequelize2.default.STRING,
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    }
});

var Nota = exports.Nota = sequelize.define('nota', {
    id: {
        type: _sequelize2.default.INTEGER, autoIncrement: true, primaryKey: true
    },
    nota: _sequelize2.default.DOUBLE,
    unidade: _sequelize2.default.INTEGER,
    bimestre: _sequelize2.default.INTEGER,
    alunoProfTurmaId: { type: _sequelize2.default.INTEGER, allowNull: false }
});

var Frequencia = exports.Frequencia = sequelize.define('frequencia', {
    data: _sequelize2.default.DATE,
    presenca: _sequelize2.default.BOOLEAN,
    alunoProfTurmaId: { type: _sequelize2.default.INTEGER, allowNull: false }
});

var ProfDisc = exports.ProfDisc = sequelize.define('profDisc', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true }
});

var ProfTurma = exports.ProfTurma = sequelize.define('profTurma', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true }
});

var AlunoProfTurma = exports.AlunoProfTurma = sequelize.define('alunoProfTurma', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true }
});

/*export let AtividadeAluno= sequelize.define('alunoAtividade',{
    id:{type: Sequelize.INTEGER,primaryKey:true}
});*/

User.belongsToMany(Disciplina, { through: 'profDisc' });
Disciplina.belongsToMany(User, { through: 'profDisc' });

User.belongsToMany(Turma, { through: 'profTurma' });
Turma.belongsToMany(User, { through: 'profTurma' });

User.belongsToMany(ProfTurma, { through: 'alunoProfTurma' });
ProfTurma.belongsToMany(User, { through: 'alunoProfTurma' });

Nota.belongsTo(AlunoProfTurma, { foreignKey: 'alunoProfTurmaId' });

Frequencia.belongsTo(AlunoProfTurma, { through: 'alunoProfTurmaId' });

//Turma.hasMany(User, {foreignKey: 'aluno', sourceKey: 'id'});
//User.belongsTo(Turma, {foreignKey: 'aluno', targetKey: 'id'});

//Atividade.belongsTo (AtividadeAluno, {foreignKey: 'atividadeAluno'});
//Atividade.belongsToMany
//

User.sync();
Professor.sync();
Turma.sync();
Sala.sync();
Atividade.sync();

Disciplina.sync();
Nota.sync();
ProfDisc.sync();
ProfTurma.sync();
AlunoProfTurma.sync();
Frequencia.sync();