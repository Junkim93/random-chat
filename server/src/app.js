import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import user from './api/router';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const httpServer = http.Server(app);
const io = socketIO(httpServer);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', user);

const queue = [];
const rooms = {};
const names = {};
const allUsers = {};

const findPeerForLoneSocket = socket => {
  if (queue.length > 0) {
    const peer = queue.pop();
    const room = socket.id + '+' + peer.id;

    peer.join(room);
    socket.join(room);

    rooms[peer.id] = room;
    rooms[socket.id] = room;

    peer.emit('chat start', { name: names[socket.id], room: room });
    socket.emit('chat start', { name: names[peer.id], room: room });
  } else {
    queue.push(socket);
  }
};

io.of('/chat').on('connection', socket => {
  socket.emit('connections', Object.keys(io.sockets.connected).length);

  socket.on('randomChat', data => {
    names[socket.id] = data.username;
    allUsers[socket.id] = socket;
    findPeerForLoneSocket(socket);
  });

  socket.on('newMessage', data => {
    const room = rooms[socket.id];
    socket.broadcast.to(room).emit('message', data);
  });

  socket.on('typing', data => {
    const room = rooms[socket.id];
    socket.broadcast.to(room).emit('typing', data);
  });

  socket.on('stopTyping', () => {
    const room = rooms[socket.id];
    socket.broadcast.to(room).emit('stopTyping');
  });

  socket.on('leaveRoom', () => {
    const room = rooms[socket.id];
    socket.broadcast.to(room).emit('chatEnd');
    const peerID = room.split('+');
    peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
    findPeerForLoneSocket(allUsers[peerID]);
  });
});

export default { app, httpServer };
