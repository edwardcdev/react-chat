const config = require('./config');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const server = require('http').createServer(app);

mongoose.connect();

server.listen(config.port, config.host, () => {
  console.log('--');
  console.info('Chatting App');
  console.log();
  console.info(`Environment:       ${config.env}`);
  console.info(`Server:            ${config.host}:${config.port}`);
  console.log('--');
});

require('./api/sockets').initSocket(app, server);

module.exports = app;
