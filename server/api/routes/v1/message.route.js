const express = require('express');
const expressValidate = require('express-validation');
const controller = require('../../controllers/message.controller');
const { authorize } = require('../../middlewares/auth');
const validation = require('../../validations/channel.validation');

const router = express.Router();

router.param('channelId', controller.load);

router
  .route('/:channelId')
  .get(authorize(), controller.get);

router
  .route('/')
  .post(authorize(), expressValidate(validation.create), controller.create);

module.exports = router;
