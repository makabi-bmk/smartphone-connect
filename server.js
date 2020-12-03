// index.js

const header = require("./js/header.js");
const server = require('ws').Server;
const ws = new server({ port: 8081 });

//IDは各クライアントでの初期値を0とするため1から始める
var ID = 1;
var clientList = []
for (var i = 0; i < 50; i++) {
  clientList.push(Object.create(data));
}

ws.on('connection', socket => {
  console.log('connected!');

  socket.on('message', ms => {

    console.log("ms = " + ms);
    var data = JSON.parse(ms);
    var res = {};
    var sockets = {};

    console.log("request_num = " + data["request_num"]);

    var request_num = data["request_num"];
    res["request_num"] = request_num;
    var clientID = data["ID"];
    var type = data["type"];

    //スマホからのリクエスト
    if (type == 0) {
      switch(request_num) {
        case 0:
          sockets[clientID].send(ms);
          break;

        case 1:
          res["ID"] = ID;
          sockets[ID] = socket;
          ID++;
          break;

        case 2:
          setData(clientID, data);
          res = Object.create(header.response);

          break;
      }
    }

    //scratchからのリクエスト
    else if (type == 1) {
      switch(request_num) {
        case 3:
          if (0 < clientID && clientID <= 50) {
            res['alpha'] = clientList[clientID].alpha;
          } else {
            res['alpha'] = 0;
          }
          break;
        
        case 4:
          clientList[clientID].message = data['message'];
          break;
      }
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

function setData(clientID, data) {
  clientList[clientID].alpha            = data["alpha"];
  clientList[clientID].beta             = data["beta"];
  clientList[clientID].gamma            = data["gamma"];
  clientList[clientID].acceleration_x   = data["acceleration_x"];
  clientList[clientID].acceleration_y   = data["acceleration_y"];
  clientList[clientID].acceleration_z   = data["acceleration_z"];
  clientList[clientID].image_num        = data["image_num"];
  clientList[clientID].voice_message    = data["voice_message"];
  clientList[clientID].tap_x            = data["tap_x"];
  clientList[clientID].tap_y            = data["tap_y"];
  clientList[clientID].image_touch      = data["image_touch"]
  clientList[clientID].swipe_vertical   = data["swipe_vertical"];
  clientList[clientID].swipe_horizontal = data["swipe_horizontal"];
}