const httpStatus = require('http-status');
const moment = require('moment-timezone');
const Channel = require('../models/channel.model');
const Message = require('../models/message.model');
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

exports.get = async (req, res, next) => {
  try {
    const lastFetchDate = req.query.lastFetchDate ? moment(req.query.lastFetchDate) : moment();
    const newFetchDate = moment(lastFetchDate).subtract(7, 'days').startOf('day');
    const messages = await Message.byChannel(req.locals.channel._id, lastFetchDate, newFetchDate);
    const moreCount = await Message.count({
      channel: req.locals.channel._id,
      createdAt: {
        '$lt': newFetchDate.toDate(),
      },
    }).populate('author').exec();
    const transformedMessages = messages.map(message => message.transform());
    res.json({ messages: transformedMessages, lastFetchDate: newFetchDate, moreCount });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const message = new Message(req.body);
    let savedMessage = await message.save();
    savedMessage = await Message.populate(savedMessage, 'author');
    const transformedMessage = savedMessage.transform();
    const io = req.app.get('socketIO');
    io.sockets.emit('new message', transformedMessage);
    res.status(httpStatus.CREATED);
    res.json(savedMessage.transform());
  } catch (error) {
    next(error);
  }
};
