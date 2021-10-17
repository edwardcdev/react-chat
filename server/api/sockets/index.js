const socketIO = require('socket.io');

exports.initSocket = (app, server) => {
  const io = socketIO.listen(server, { path: '/api/chat' });
  app.set('socketIO', io);
  io.on('connection', (socket) => {
  });
};
