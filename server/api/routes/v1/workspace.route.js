const express = require('express');
const expressValidate = require('express-validation');
const controller = require('../../controllers/workspace.controller');
const validation = require('../../validations/workspace.validation');

const router = express.Router();

router.param('workspaceId', controller.load);
router.param('workspaceName', controller.loadByName);

router.route('/')
  .get(controller.list);

router
  .route('/byName/:workspaceName')
  .get(controller.getByName);

router.route('/')
  .post(expressValidate(validation.create), controller.create);

module.exports = router;
