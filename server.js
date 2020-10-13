// index.js

const server = require('ws').Server;
const ws = new server({ port: 8081 });
var ID = 0;

ws.on('connection', socket => {
  console.log('connected!');

  socket.on('message', ms => {
    console.log(ms);

    var data = JSON.parse(ms);
    var res = {};

    switch(data['code']) {
      case 0:
        socket.send("hello from server");
        break;
      case 1:
        res['ID'] = ID;
        ID++;
      break;
    }

  });

  socket.on('close', () => {
    console.log('good bye.');
  });

  socket.on('error', e => {
    console.log(e);
  });
});