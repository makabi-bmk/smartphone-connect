// index.js

const server = require('ws').Server;
const ws = new server({ port: 8081 });
var ID = 0;

ws.on('connection', socket => {
  console.log('connected!');

  socket.on('message', ms => {

    var data = JSON.parse(ms);
    console.log("data = " + data);
    console.log("code = " + data["code"]);
    var res = {};

    // var code = parseInt(data["code"])
    switch(code) {
      case '0':
        res['code'] = 0;
        socket.send(res);
        break;
      case '1':
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