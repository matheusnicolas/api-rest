'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TurmaAluno = exports.ProfTurma = exports.ProfDisc = exports.Frequencia = exports.Nota = exports.AtividadeResposta = exports.Atividade = exports.Horario = exports.Disciplina = exports.Sala = exports.Turma = exports.Professor = exports.User = undefined;

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
        type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    },
    sigla: _sequelize2.default.STRING,
    serie: _sequelize2.default.INTEGER
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

var Horario = exports.Horario = sequelize.define('horario', {
    profTurma: { type: _sequelize2.default.INTEGER, allowNull: false },
    diaSemana: { type: _sequelize2.default.STRING, allowNull: false },
    ordemAula: { type: _sequelize2.default.STRING, allowNull: false }
});

var Atividade = exports.Atividade = sequelize.define('atividade', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    },
    dataEncerramento: _sequelize2.default.DATEONLY,
    descricao: _sequelize2.default.STRING,
    arquivoAtividade: _sequelize2.default.STRING
});

var AtividadeResposta = exports.AtividadeResposta = sequelize.define('atividadeResposta', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true
    },
    arquivoResposta: _sequelize2.default.STRING,
    comentario: _sequelize2.default.STRING
});

var Nota = exports.Nota = sequelize.define('nota', {
    id: {
        type: _sequelize2.default.INTEGER, autoIncrement: true, primaryKey: true
    },
    nota: _sequelize2.default.DOUBLE,
    unidade: _sequelize2.default.INTEGER,
    bimestre: _sequelize2.default.INTEGER
});

var Frequencia = exports.Frequencia = sequelize.define('frequencia', {
    data: _sequelize2.default.DATE,
    presenca: _sequelize2.default.BOOLEAN
});

var ProfDisc = exports.ProfDisc = sequelize.define('profDisc', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true }
});

var ProfTurma = exports.ProfTurma = sequelize.define('profTurma', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true }
});

var TurmaAluno = exports.TurmaAluno = sequelize.define('turmaAluno', {
    id: { type: _sequelize2.default.INTEGER, primaryKey: true, autoIncrement: true }
});

User.belongsToMany(Disciplina, { through: 'profDisc' });
Disciplina.belongsToMany(User, { through: 'profDisc' });

ProfDisc.belongsToMany(Turma, { through: 'profTurma' });
Turma.belongsToMany(ProfDisc, { through: 'profTurma' });

User.belongsToMany(ProfTurma, { through: 'turmaAluno' });
ProfTurma.belongsToMany(User, { through: 'turmaAluno' });

Nota.belongsTo(User, { foreignKey: 'alunoId' });
Nota.belongsTo(ProfDisc, { foreignKey: 'profDiscId' });

Frequencia.belongsTo(User, { foreignKey: 'alunoId' });
Frequencia.belongsTo(ProfDisc, { foreignKey: 'profDiscId' });

Atividade.belongsTo(ProfTurma, { foreignKey: 'profTurmaId' });
AtividadeResposta.belongsTo(User, { foreignKey: 'alunoId' });
AtividadeResposta.belongsTo(Atividade, { foreignKey: 'atividadeId' });

Turma.belongsTo(Sala, { foreignKey: 'salaId' });

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