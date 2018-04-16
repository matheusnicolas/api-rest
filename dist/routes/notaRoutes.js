'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _notaController = require('../controllers/notaController');

var controller = _interopRequireWildcard(_notaController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post(controller.cadastrarNota).get(controller.getAllNotas);

router.route('/:id_nota').put(controller.editarNota).delete(controller.excluirNota);

router.route('/:id_bimestre').get(controller.getAllNotasBimestre);

router.route('/:id_unidade').get(controller.getAllNotasUnidade);

exports.default = router;