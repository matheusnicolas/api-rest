'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _atividadeController = require('../controllers/atividadeController');

var controller = _interopRequireWildcard(_atividadeController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post(controller.cadastrarAtividade) //ok
.get(controller.getAllAtividade); //ok

router.route('/:id_atividade').get(controller.getAtividadeById) //n funciona
.put(controller.submeterAtividade) //da erro
.delete(controller.excluirAtividade); //vou testar aindja . FALTA A RELAÇÃO DO BANCO

exports.default = router;