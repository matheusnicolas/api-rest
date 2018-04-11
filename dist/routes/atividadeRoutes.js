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

//let controller = require('../controllers/atividadeController')


var router = _express2.default.Router();

router.route('/').post(controller.cadastrarAtividade).get(controller.getAllAtividade);

router.route('/:id_atividade').get(controller.getAtividade).put(controller.submeterAtividade).delete(controller.excluirAtividade);

/*router.route('/pontuacao')
	.put(controller.atualizarPontuacao)*/

exports.default = router;