'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

var _salaRoutes = require('./routes/salaRoutes');

var _salaRoutes2 = _interopRequireDefault(_salaRoutes);

var _userRoutes = require('./routes/userRoutes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _disciplinaRoutes = require('./routes/disciplinaRoutes');

var _disciplinaRoutes2 = _interopRequireDefault(_disciplinaRoutes);

var _atividadeRoutes = require('./routes/atividadeRoutes');

var _atividadeRoutes2 = _interopRequireDefault(_atividadeRoutes);

var _turmaRoutes = require('./routes/turmaRoutes');

var _turmaRoutes2 = _interopRequireDefault(_turmaRoutes);

var _professorRoutes = require('./routes/professorRoutes');

var _professorRoutes2 = _interopRequireDefault(_professorRoutes);

var _notaRoutes = require('./routes/notaRoutes');

var _notaRoutes2 = _interopRequireDefault(_notaRoutes);

var _horarioRoutes = require('./routes/horarioRoutes');

var _horarioRoutes2 = _interopRequireDefault(_horarioRoutes);

var _profDiscRoutes = require('./routes/profDiscRoutes');

var _profDiscRoutes2 = _interopRequireDefault(_profDiscRoutes);

var _frequenciaRoutes = require('./routes/frequenciaRoutes');

var _frequenciaRoutes2 = _interopRequireDefault(_frequenciaRoutes);

var _authRoutes = require('./routes/authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/static', _express2.default.static('public'));
//app.use(auth)

app.use('/', _routes2.default);
app.use('/api/salas', _salaRoutes2.default);
app.use('/api/login', _authRoutes2.default);
app.use('/api/users', _userRoutes2.default);
app.use('/api/disciplina', _disciplinaRoutes2.default);
app.use('/api/atividades', _atividadeRoutes2.default);
app.use('/api/turma', _turmaRoutes2.default);
app.use('/api/professor', _professorRoutes2.default);
app.use('/api/nota', _notaRoutes2.default);
app.use('/api/horario', _horarioRoutes2.default);
app.use('/api/profdisc', _profDiscRoutes2.default);
app.use('/api/frequencia', _frequenciaRoutes2.default);

app.use(_expressValidator2.default);

app.listen(9000, function () {
    console.log('Servidor rodando na porta 9000');
});