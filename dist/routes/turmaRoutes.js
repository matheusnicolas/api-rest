'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _turmaController = require('../controllers/turmaController');

var controller = _interopRequireWildcard(_turmaController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import * as middleware from '../middlewares/auth'

var router = _express2.default.Router();

//router.use(middleware.auth)

router.route("/").get(controller.getAllTurma).post(controller.cadastrarTurma);

router.route("/:id_turma").get(controller.getTurmaById).put(controller.editarTurma).delete(controller.excluirTurma);

exports.default = router;