'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _notaController = require('../controllers/notaController');

var controller = _interopRequireWildcard(_notaController);

var _auth = require('../middlewares/auth');

var middleware = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
//router.use(middleware.auth)

router.route('/').post(controller.cadastrarNota).get(controller.getAllNotas);

router.route('/bimestre/:bimestre_params').get(controller.getAllNotasBimestre);

router.route('/unidade/:unidade_params').get(controller.getAllNotasUnidade);

router.route('/bimeste/:bimestre_params/unidade/:unidade_params').put(controller.editarNota).delete(controller.excluirNota);

exports.default = router;