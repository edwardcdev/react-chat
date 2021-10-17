const express = require('express');
const expressValidate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const validation = require('../../validations/auth.validation');

const router = express.Router();

router.route('/register')
  .post(expressValidate(validation.register), controller.register);

router.route('/login')
  .post(expressValidate(validation.login), controller.login);

router.route('/refresh-token')
  .post(expressValidate(validation.refresh), controller.refresh);

router.route('/confirm')
  .post(expressValidate(validation.confirm), controller.confirm);

module.exports = router;
