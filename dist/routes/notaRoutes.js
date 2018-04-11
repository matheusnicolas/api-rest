'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _notaController = require('../controllers/notaController');

var controller = _interopRequireWildcard(_notaController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import * as middleware from '../middlewares/auth'
var controllers = require('../controllers/controllers');

var router = _express2.default.Router();

//router.use(middleware.auth)

router.route("/nota").post(controller.cadastrarNota);

router.route("/nota/:id_nota").get(controller.editarNota).delete(controller.excluirNota);