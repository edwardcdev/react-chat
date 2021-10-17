const mongoose = require('mongoose');
const moment = require('moment-timezone');
const httpStatus = require('http-status');
const config = require('../../config');
const APIError = require('../utils/APIError');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  body: {
    type: String,
    trim: true,
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  channel: {
    type: Schema.ObjectId,
    ref: 'Channel',
  },
  edited: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

messageSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'body', 'author', 'channel', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

messageSchema.statics = {
  byChannel(channelId, lastFetchDate, newFetchDate) {
    return this.find({
      channel: channelId,
      createdAt: {
        '$gte': newFetchDate.toDate(),
        '$lt': lastFetchDate.toDate(),
      },
    }).populate('author').exec();
  },
};

module.exports = mongoose.model('Message', messageSchema);
