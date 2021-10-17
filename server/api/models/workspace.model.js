const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    trim: true,
    unique: true,
  },
}, {
  timestamps: true,
});

workspaceSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'fullName', 'displayName', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

workspaceSchema.statics = {
  checkDuplicateName(error) {
    console.log(error);
    if (error.name === 'BulkWriteError' && error.code === 11000) {
      return new APIError({
        message: 'Workspace already exists',
        errors: [],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  async get(id) {
    try {
      let workspace;

      if (mongoose.Types.ObjectId.isValid(id)) {
        workspace = await this.findById(id).exec();
      }
      if (workspace) {
        return workspace;
      }

      throw new APIError({
        message: 'Workspace does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  async getByName(name) {
    try {
      const workspace = await this.findOne({ displayName: name }).exec();
      if (workspace) {
        return workspace;
      }

      throw new APIError({
        message: 'Workspace does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model('Workspace', workspaceSchema);
