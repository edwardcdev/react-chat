const _ = require('lodash');
const httpStatus = require('http-status');
const slug = require('slug');
const User = require('../models/user.model');
const Channel = require('../models/channel.model');
const Workspace = require('../models/workspace.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.load = async (req, res, next, id) => {
  try {
    const workspace = await Workspace.get(id);
    req.locals = { workspace };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

exports.loadByName = async (req, res, next, name) => {
  try {
    const workspace = await Workspace.getByName(name);
    req.locals = { workspace };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

exports.list = async (req, res, next) => {
  try {
    const workspaces = await Workspace.find();
    const transformedWorkspaces = workspaces.map(workspace => workspace.transform());
    res.json(transformedWorkspaces);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  let workspace;
  try {
    const workspaceParams = _.pick(req.body, ['fullName', 'displayName']);
    workspaceParams.displayName = slug(workspaceParams.displayName);
    workspace = await (new Workspace(workspaceParams)).save();
  } catch (error) {
    return next(Workspace.checkDuplicateName(error));
  }
  try {
    const userParams = {
      email: req.body.adminEmail,
      password: req.body.adminPassword,
      username: req.body.adminEmail.substr(0, req.body.adminEmail.indexOf('@')),
      role: 'admin',
      workspace: workspace._id,
    };
    const admin = await (new User(userParams)).save();
    Channel.createMainChannel(workspace._id, admin._id);
    res.status(httpStatus.CREATED);
    return res.json(workspace);
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

exports.getByName = (req, res) => res.json(req.locals.workspace.transform());
