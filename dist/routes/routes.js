'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = require('../controllers/controllers');

var router = _express2.default.Router();

router.route("/").get(controllers.getUser).post(controllers.cadastrarUser);

exports.default = router;