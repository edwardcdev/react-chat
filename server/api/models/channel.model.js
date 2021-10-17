const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    maxlength: 128,
    unique: true,
    index: true,
    trim: true,
    required: true,
  },
  purpose: {
    type: String,
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  private: {
    type: Boolean,
    default: false,
  },
  direct: {
    type: Boolean,
    default: false,
  },
  members: {
    type: [Schema.ObjectId],
  },
  workspace: {
    type: Schema.ObjectId,
    ref: 'Workspace',
    required: true,
  },
}, {
  timestamps: true,
});

channelSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'purpose', 'creator', 'private', 'createdAt', 'direct', 'members'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

channelSchema.statics = {
  async joinMainChannel(workspace, user) {
    const { _id } = user;
    if (!_id) throw new APIError({ message: 'An user is required to join a channel' });

    const channel = await this.findOne({ workspace, private: false, direct: false }).sort({ createdAt: -1 }).exec();
    if (channel.members.indexOf(_id) === -1) {
      channel.members.push(_id);
    }
    await channel.save();
  },

  list(user) {
    return this.find({ members: user._id }).exec();
  },

  async get(id) {
    try {
      let channel;

      if (mongoose.Types.ObjectId.isValid(id)) {
        channel = await this.findById(id).exec();
      }
      if (channel) {
        return channel;
      }

      throw new APIError({
        message: 'Channel does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  async createMainChannel(workspace, admin) {
    const channel = await this.findOne({
      workspace, private: false, direct: false,
    }).exec();
    if (channel) {
      return channel;
    }
    if (!admin) throw new APIError({ message: 'An admin is required to create a channel' });

    const channelObject = new Channel({
      name: 'general',
      purpose: 'Public main channel',
      creator: admin,
      members: [admin],
      workspace: workspace,
    });
    channelObject.save();
    return channelObject;
  },
};

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;
