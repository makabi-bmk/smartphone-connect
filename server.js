// index.js

const header = require("./js/header.js");
const server = require('ws').Server;
const ws = new server({ port: 8081 });

//IDは各クライアントでの初期値を0とするため1から始める
var smartphoneID = 1;
var scratchID = 1;
var clientSockets = [];
var scratchSockets = [];
for (var i = 0; i < 50; i++) {
  clientSockets.push(null);
  scratchSockets.push(null);
}

ws.on('connection', socket => {
  
  console.log('connected!');

  socket.on('message', ms => {

    console.log("ms = " + ms);
    var receivedData = JSON.parse(ms);

    console.log("request_num = " + receivedData["request_num"]);

    var request_num = receivedData["request_num"];
    res["request_num"] = request_num;
    var type = receivedData["type"];

    //スマホからのリクエスト
    if (type == 0) {
      switch(request_num) {
        case 0:
          //これブロードキャスト通信できる
          /*
          ws.clients.forEach(client => {
            console.log("typeof(client) = " + typeof(client));
            client.send(ms);
          });
        */
            //clientSockets[clientID].send(JSON.stringify(res)); 
            sendData(0, receivedData["smartphone_ID"], res);
          break;

        // スマホにIDを割り振る
        case 1:
          var newID = smartphoneID;
          var res = {ID : newID};
          clientSockets[newID] = socket;
          smartphoneID++;
          sendData(0, newID, res);
          break;

        // scratchにスマホのデータを送る
        case 2:
          var orderData = getSensorData(receivedData);
          sendData(1, receivedData["scratch_ID"], orderData);
          break;
      }
    }

    //scratchからのリクエスト
    else if (type == 1) {
      switch(request_num) {
        case 0:
          break;
        case 1:
          // scratchにIDを割り振る
          var newScratchID = scratchID;
          var res = {ID : newScratchID};
          scratchSockets[newScratchID] =  socket;
          scratchID++;
          sendData(1, newScratchID, res);
          break;
        case 2:
          // スマホへ命令するデータを送る
          sendData(0, clientID, getOrderData(receivedData));
        break;
      }  
    }
    //socket.send(JSON.stringify(res));
  });

  socket.on('close', () => {
    console.log('good bye.');
  });

  socket.on('error', e => {
    console.log(e);
  });
});

function sendData(type, ID, data) {
  if (type == 0) {
    clientSockets[ID].send(JSON.stringify(data));   
  } else {
    scratchSockets[ID].send(JSON.stringify(data));
  }
}

function getSensorData(data) {
  var sensorData = header.sensorData;
  sensorData.smartphone_ID    = data["smartphone_ID"];
  sensorData.scratch_ID       = data["scratch_ID"];
  sensorData.alpha            = data["alpha"];
  sensorData.beta             = data["beta"];
  sensorData.gamma            = data["gamma"];
  sensorData.acceleration_x   = data["acceleration_x"];
  sensorData.acceleration_y   = data["acceleration_y"];
  sensorData.acceleration_z   = data["acceleration_z"];
  sensorData.image_num        = data["image_num"];
  sensorData.voice_message    = data["voice_message"];
  sensorData.tap_x            = data["tap_x"];
  sensorData.tap_y            = data["tap_y"];
  sensorData.image_touch      = data["image_touch"]
  sensorData.swipe_vertical   = data["swipe_vertical"];
  sensorData.swipe_horizontal = data["swipe_horizontal"];

  return sensorData;
}

function getOrderData(data) {
  var orderData = header.orderData;
  var flag = data["flag"];
  orderData.flag = flag;
  if (flag & 1) return orderData;
  if (flag & 2) orderData.back_image_num = data["back_image_num"];
  if (flag & 4) orderData.image_num = data["image_num"];
  if (flag & 8) orderData.message = data["message"];
  if (flag & 16) orderData.alert_message = data["alert_message"];
  if (flag & 32) orderData.bgm_num = data["bgm_num"];
  if (flag & 64) {
      orderData.pos_x = data["pos_x"];
      orderData.pos_y = data["pos_y"];
  }
  if (flag & 128) orderData.size = data["size"];

  return orderData;
}