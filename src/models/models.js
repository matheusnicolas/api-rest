import Sequelize from 'sequelize'

let sequelize = new Sequelize('kula_bd', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './data.sqlite'
});

export let User = sequelize.define('user', {
    nome : Sequelize.STRING,
    sobrenome : Sequelize.STRING,
    cpf : {type:Sequelize.STRING, unique: true},
    username : {type:Sequelize.STRING, allowNull: false, unique: true},
    password : {type:Sequelize.STRING, allowNull: false },
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    matricula : {type:Sequelize.STRING, allowNull: false, unique:true },
    sexo : Sequelize.STRING,
    email: {type:Sequelize.STRING, allowNull: false, unique:true },
    foto: {type:Sequelize.STRING(512), allowNull: true}
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

export let Atividade = sequelize.define('atividade',{
    pontuacao: Sequelize.DOUBLE,
    dataEncerramento: Sequelize.DATEONLY,
    descricao: Sequelize.STRING,
    arquivoAtividade: Sequelize.STRING,
    turma: Sequelize.STRING,
    id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    }
});


//Turma.hasMany(User, {foreignKey: 'aluno', sourceKey: 'id'});
//User.belongsTo(Turma, {foreignKey: 'aluno', targetKey: 'id'});



User.sync();
Turma.sync();
Sala.sync();
Disciplina.sync();
Atividade.sync();