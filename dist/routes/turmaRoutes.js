'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _turmaController = require('../controllers/turmaController');

var controller = _interopRequireWildcard(_turmaController);

var _auth = require('../middlewares/auth');

var middleware = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(middleware.auth);

router.route("/").post(controller.cadastrarTurma).get(controller.getAllTurma);

router.route("/:id_turma").get(controller.getTurmaById).put(controller.editarTurma).delete(controller.excluirTurma);

router.route("/serie/:serie_params").get(controller.getAllTurmasBySerie);

exports.default = router;