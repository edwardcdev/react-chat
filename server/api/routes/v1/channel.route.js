const express = require('express');
const controller = require('../../controllers/channel.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router.param('channelId', controller.load);

router
  .route('/')
  .get(authorize(), controller.list);

router
  .route('/:channelId')
  .get(authorize(), controller.get);

module.exports = router;
