// index.js

const header = require("./js/header.js");
const server = require('ws').Server;
const ws = new server({ port: 8081 });

var data = {
  ID : 0,
  type : 0,
  request_num : 0,
  alpha : 0,
  beta : 0,
  gamma : 0,
  acceleration_x : 0,
  acceleration_y : 0,
  acceleration_z : 0,
  image_num  : 0,
  voice_message : "",
  tap_x : 0,
  tap_y : 0,
  image_touch : false,
  swipe_vertical : false,
  swipe_horizontal : false
};

//IDは各クライアントでの初期値を0とするため1から始める
var ID = 1;
var clientList = []
var sockets = [];
for (var i = 0; i < 50; i++) {
  clientList.push(Object.create(data));
  sockets.push(null);
}


//var naita = null;

ws.on('connection', socket => {
  
  console.log('connected!');

  socket.on('message', ms => {

    console.log("ms = " + ms);
    var data = JSON.parse(ms);
    var res = {};

    console.log("request_num = " + data["request_num"]);

    var request_num = data["request_num"];
    res["request_num"] = request_num;
    var clientID = data["ID"];
    var type = data["type"];

    //スマホからのリクエスト
    if (type == 0) {
      switch(request_num) {
        case 0:
          /*
          ws.clients.forEach(client => {
            console.log("typeof(client) = " + typeof(client));
            client.send(ms);
          });
        */
          //if (naita != null) {
            res["tanaka"] = "tanaka";
            console.log("sockets[" + clientID + "] = " + sockets[clientID]);
            sockets[clientID].send(JSON.stringify(res));
          //}        
          
          break;

        case 1:
          var newID = ID;
          res["ID"] = newID;
          sockets[newID] = socket;
          naita = socket;
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

    res["tanaka"] = "hoshino";
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