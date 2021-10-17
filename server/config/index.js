require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'chatting_app',
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES || 15,
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/chatting_app_develop',
  },
};

module.exports = config;
