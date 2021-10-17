const express = require('express');
const controller = require('../../controllers/user.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router.param('userId', controller.load);

router
  .route('/profile')
  .get(authorize(), controller.loggedIn);

module.exports = router;
