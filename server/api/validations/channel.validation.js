const Joi = require('joi');

module.exports = {
  create: {
    body: {
      body: Joi.string().required(),
      author: Joi.string().required(),
      channel: Joi.string().required(),
    },
  },
};
