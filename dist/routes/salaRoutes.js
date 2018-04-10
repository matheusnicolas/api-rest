'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _salaController = require('../controllers/salaController');

var controller = _interopRequireWildcard(_salaController);

var _auth = require('../middlewares/auth');

var middleware = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* pode importar também dessa forma
let controller = require('../controllers/controller')
*/

var router = _express2.default.Router();

router.use(middleware.auth);

router.route('/').get(controller.getAllSala).post(controller.cadastrarSala);

router.route('/:id_sala/').get(controller.getSala).put(controller.atualizarSala).delete(controller.excluirSala);

exports.default = router;