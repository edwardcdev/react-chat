const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const httpStatus = require('http-status');
const config = require('../../config');
const APIError = require('../utils/APIError');

const roles = ['user', 'admin'];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  username: {
    type: String,
    maxlength: 128,
    unique: true,
    index: true,
    trim: true,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  avatar: {
    type: String,
    trim: true,
  },
  workspace: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workspace',
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 16);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'username', 'email', 'picture', 'role', 'createdAt', 'workspace'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const payload = {
      exp: moment().add(config.jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.sign(payload, config.jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

userSchema.statics = {
  roles,

  async findAndGenerateToken(workspace, options) {
    const { email, password, refreshObject } = options;
    if (!email) throw new APIError({ message: 'An email is required to generate a token' });

    const user = await this.findOne({ email, workspace }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (!user) {
        err.message = 'Unregistered email';
      } else if (!await user.passwordMatches(password)) {
        err.message = 'Incorrect password';
      } else {
        return { user, accessToken: user.token() };
      }
    } else if (refreshObject && refreshObject.userEmail === email) {
      return { user, accessToken: user.token() };
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  checkDuplicateEmail(error) {
    if (error.name === 'BulkWriteError' && error.code === 11000) {
      return new APIError({
        message: 'Email or username already exists',
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
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model('User', userSchema);
