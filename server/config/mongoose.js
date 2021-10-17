const mongoose = require('mongoose');
const faker = require('faker');
const moment = require('moment-timezone');
const config = require('./index');
const Channel = require('../api/models/channel.model');
const User = require('../api/models/user.model');
const Message = require('../api/models/message.model');

Promise = require('bluebird'); // eslint-disable-line no-global-assign

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

if (config.env === 'development') {
  mongoose.set('debug', true);
}

exports.connect = async () => {
  const options = {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
  };
  await mongoose.connect(config.mongo.uri, options);

  // let adminUser = await User.findOne({ role: 'admin' }).exec();
  // if (!adminUser) {
  //   const admin = await (new User({
  //     email: 'admin@example.com',
  //     password: 'password',
  //     username: 'admin',
  //     role: 'admin',
  //   })).save();
  //   adminUser = admin;
  // }

  // let generalChannel = await Channel.findOne({ private: false }).exec();
  // if (!generalChannel) {
  //   const channel = await (new Channel({
  //     name: 'general',
  //     purpose: 'Public and main channel',
  //     creator: adminUser._id,
  //     members: [adminUser._id],
  //   })).save();
  //   generalChannel = channel;
  // }

  // const messageCount = await Message.count({});
  // if (messageCount === 0) {
  //   let date = moment().subtract(15, 'days');
  //   for(let i = 0; i < 15 ; i++) {
  //     try {
  //       const message = await (new Message({
  //         body: faker.lorem.sentence(),
  //         author: adminUser._id,
  //         channel: generalChannel._id,
  //         createdAt: date.toDate(),
  //         updatedAt: date.toDate(),
  //       })).save();
  //       date.add(1, 'days');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }
};
