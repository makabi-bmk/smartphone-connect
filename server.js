// index.js

const server = require('ws').Server;
const ws = new server({ port: 8081 });
var ID = 0;

ws.on('connection', socket => {
  console.log('connected!');

  socket.on('message', ms => {

    console.log("ms = " + ms);
    var data;
    try {
      data = JSON.parse(ms);
      console.log("data = " + data);
    } catch(e) {
      console.log("e = " + e);
      data = {"code":0,"ID":0};
    }
    
    var res = {};

    // var code = parseInt(data["code"])
    switch(data[code]) {
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