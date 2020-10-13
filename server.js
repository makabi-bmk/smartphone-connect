// index.js

const server = require('ws').Server;
const ws = new server({ port: 8081 });

ws.on('connection', socket => {
  console.log('connected!');

  socket.on('message', ms => {
    console.log(ms);
    socket.send(ms);
  });

  socket.on('close', () => {
    console.log('good bye.');
  });

  socket.on('error', e => {
    console.log(e);
  });
});