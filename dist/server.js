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

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/static', _express2.default.static('public'));
//app.use(auth)

app.use('/', _routes2.default);
app.use('/api/salas', _salaRoutes2.default);
app.use('/api/users', _userRoutes2.default);
app.use('/api/disciplina', _disciplinaRoutes2.default);

app.listen(9000, function () {
    console.log('Servidor rodando na porta 9000');
});