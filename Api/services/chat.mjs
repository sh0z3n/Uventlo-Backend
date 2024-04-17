


import http from 'http'
import Socket from 'socket.io'


const server = http.createServer(app);

const io = new Socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const users = [];

io.on('connection', (socket) => {
  socket.on('adduser', (username) => {
    socket.user = username;
    users.push(username);
    io.sockets.emit('users', users);

    io.to(socket.id).emit('private', {
      id: socket.id,
      name: socket.user,
      msg: 'secret message',
    });
  });

  socket.on('message', (message) => {
    io.sockets.emit('message', {
      message,
      user: socket.user,
      id: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.user} is disconnected`);
    if (socket.user) {
      users.splice(users.indexOf(socket.user), 1);
      io.sockets.emit('user', users);
      console.log('remaining users:', users);
    }
  });
});



server.listen(5000, () => {
  console.log(`listening on PORT: , 5000}`);
});
