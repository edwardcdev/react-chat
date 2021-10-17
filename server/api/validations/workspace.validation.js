const Joi = require('joi');

module.exports = {
  create: {
    body: {
      fullName: Joi.string().required(),
      displayName: Joi.string().required(),
      adminEmail: Joi.string().required(),
      adminPassword: Joi.string().required().min(6).max(128),
    },
  },
};
