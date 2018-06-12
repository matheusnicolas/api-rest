'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var controller = _interopRequireWildcard(_userController);

var _auth = require('../middlewares/auth');

var middleware = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(middleware.auth);

router.route("/").get(controller.getUser).post(controller.cadastrarUser);

router.route('/profile').get(controller.profile);

router.route("/:user_id").get(controller.getUserById).put(controller.editarUser).delete(controller.excluirUser);

exports.default = router;