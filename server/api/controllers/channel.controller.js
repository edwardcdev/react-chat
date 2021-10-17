const Channel = require('../models/channel.model');
const { handler: errorHandler } = require('../middlewares/error');

exports.load = async (req, res, next, id) => {
  try {
    const channel = await Channel.get(id);
    req.locals = { channel };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

exports.list = async (req, res, next) => {
  try {
    const channels = await Channel.list(req.user);
    const transformedChannels = channels.map(channel => channel.transform());
    res.json(transformedChannels);
  } catch (error) {
    next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.channel.transform());
