// index.js

const server = require('ws').Server;
const ws = new server({ port: 8081 });
//IDは各クライアントでの初期値を0とするため1から始める
var ID = 1;

ws.on('connection', socket => {
  console.log('connected!');

  socket.on('message', ms => {

    console.log("ms = " + ms);
    var data = JSON.parse(ms);
    var res = {};

    console.log("code = " + data["code"]);

    var code = data["code"];
    res["code"] = code;
    switch(data["code"]) {
      case 0:
        break;
      case 1:
        res['ID'] = ID;
        ID++;
      break;
      case 2:
        console.log('data = ' + data['acceleration_x']);
        break;
    }
    socket.send(JSON.stringify(res));

  });

  socket.on('close', () => {
    console.log('good bye.');
  });

  socket.on('error', e => {
    console.log(e);
  });
});