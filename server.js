// index.js

const header = require("./js/header.js");
const server = require('ws').Server;
const ws = new server({ port: 8081 });
const MAX_ACCESS_NUM = 50;
const DATA_NAME = header.DATA_NAME;
const TYPE = header.TYPE;
const REQUEST = header.REQUEST;

//IDは各クライアントでの初期値を0とするため1から始める
var smartphoneID = 1;
var scratchID = 1;
var smartphoneSockets = {};
var scratchSockets = {};

/*
for (var i = 0; i < MAX_ACCESS_NUM; i++) {
  smartphoneSockets.push(null);
  scratchSockets.push(null);
}
*/

ws.on('connection', socket => {
  
  console.log('connected!');

  socket.on('message', ms => {

    console.log("受け取ったデータ = " + ms);
    var receivedData = JSON.parse(ms);

    var request_num = receivedData[DATA_NAME.request_num];
    var type = receivedData[DATA_NAME.type];

    //スマホからのリクエスト
    if (type == TYPE.smartphone) {
      console.log("送信者:スマホ");
      switch(request_num) {
        case REQUEST.none:
          console.log("スマホからの接続きれた");
          //これブロードキャスト通信できる
          /*
          ws.clients.forEach(client => {
            client.send(ms);
          });
        */
            //clientSockets[clientID].send(JSON.stringify(res));
          break;

        // スマホにIDを割り振る
        case REQUEST.getID:
          var newID = smartphoneID;
          var res = {smartphone_ID : newID, request_num : header.REQUEST.getID};
          if (isAccessOK(newID)) {
            res["status"] = 200;
            smartphoneSockets[newID.toString()] = socket;
            smartphoneID++;
          } else {
            var errorMessage = "アクセス数が上限に達しています。時間をおいて再度お試しください。";
            res["status"] = 500;
            res["message"] = errorMessage;
          }
          socket.send(JSON.stringify(res));
          break;

        // scratchにスマホのデータを送る
        case REQUEST.connect:
          sendData(TYPE.scratch, receivedData[DATA_NAME.scratch_ID], getSensorData(receivedData));
          break;
        
        case REQUEST.close:

      }
    }

    //scratchからのリクエスト
    else if (type == TYPE.scratch) {
      console.log("送信者:scratch");
      switch(request_num) {
        case REQUEST.none:
          break;
        case REQUEST.getID:
          // scratchにIDを割り振る
          var newID = scratchID;
          var res = {scratch_ID : newID, request_num : header.REQUEST.getID};
          if (isAccessOK(newID)) {
            scratchSockets[newID.toString()] =  socket;
            scratchID++;
          } else {
            var errorMessage = "アクセス数が上限に達しています。時間をおいて再度お試しください。";
            res["status"] = 500;
            res["message"] = errorMessage;
          }
          socket.send(JSON.stringify(res));
          break;
        case REQUEST.connect:
          // スマホへ命令するデータを送る
          if (!sendData(TYPE.smartphone, receivedData[DATA_NAME.smartphone_ID], getOrderData(receivedData))) {
            socket.send(JSON.stringify(header.sensorData));
          }
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
  if (existSocket(type, ID)) {
    switch(type) {
      case TYPE.smartphone:
        console.log("スマホに送るデータ:" + JSON.stringify(data));
        smartphoneSockets[ID.toString()].send(JSON.stringify(data));
        break;
      
      case TYPE.scratch:
        console.log("scratchに送るデータ:" + JSON.stringify(data));
        scratchSockets[ID.toString()].send(JSON.stringify(data));
        break;
    }
    return true;
  } else {
    console.log("通信相手が存在しません");
    return false;
  }
}

function isAccessOK(ID) {
  if (0 < ID && ID < MAX_ACCESS_NUM) return true;
  else false;
}

function existSocket(type, ID) {
  switch(type) {
    case TYPE.smartphone:
      if (smartphoneSockets[ID.toString()] != null) return true;
      else return false;
      break;
    
    case TYPE.scratch:
      if (scratchSockets[ID.toString()] != null) return true;
      else return false;
      break;
  }
  return false;
}

function getSensorData(data) {
  var sensorData = header.sensorData;
  var DATA_NAME = header.DATA_NAME;
  sensorData.request_num      = data[DATA_NAME.request_num];
  sensorData.smartphone_ID    = data[DATA_NAME.smartphone_ID];
  sensorData.scratch_ID       = data[DATA_NAME.scratch_ID];
  sensorData.alpha            = data[DATA_NAME.alpha];
  sensorData.beta             = data[DATA_NAME.beta];
  sensorData.gamma            = data[DATA_NAME.gamma];
  sensorData.angle            = data[DATA_NAME.angle];
  sensorData.size             = data[DATA_NAME.size];
  sensorData.position_x       = data[DATA_NAME.position_x];
  sensorData.position_y       = data[DATA_NAME.position_y];
  sensorData.acceleration_x   = data[DATA_NAME.acceleration_x];
  sensorData.acceleration_y   = data[DATA_NAME.acceleration_y];
  sensorData.acceleration_z   = data[DATA_NAME.acceleration_z];
  sensorData.image_num        = data[DATA_NAME.image_num];
  sensorData.input_text       = data[DATA_NAME.input_text];
  sensorData.voice_message    = data[DATA_NAME.voice_message];
  sensorData.tap_position_x   = data[DATA_NAME.tap_position_x];
  sensorData.tap_position_y   = data[DATA_NAME.tap_position_y];
  sensorData.screen_height    = data[DATA_NAME.screen_height];
  sensorData.screen_width     = data[DATA_NAME.screen_width];
  sensorData.button_click     = data[DATA_NAME.button_click];
  sensorData.image_touch      = data[DATA_NAME.image_touch];
  sensorData.swipe_vertical   = data[DATA_NAME.swipe_vertical];
  sensorData.swipe_horizontal = data[DATA_NAME.swipe_horizontal];

  return sensorData;
}

function getOrderData(data) {
  var orderData         = header.orderData;
  orderData.request_num = header.REQUEST.connect;
  orderData.scratch_ID  = data[DATA_NAME.scratch_ID];
  var flag              = data[DATA_NAME.flag];
  orderData.flag        = flag;

  if (flag & 1)    return orderData;
  if (flag & 2)    orderData.back_image_num = data[DATA_NAME.back_image_num];
  if (flag & 4)    orderData.image_num      = data[DATA_NAME.image_num];
  if (flag & 8)    orderData.message        = data[DATA_NAME.message];
  if (flag & 16)   orderData.alert_message  = data[DATA_NAME.alert_message];
  if (flag & 32)   orderData.audio_num      = data[DATA_NAME.audio_num];
  if (flag & 64)   {
      orderData.position_x = data[DATA_NAME.position_x];
      orderData.position_y = data[DATA_NAME.position_y];
  }
  if (flag & 128)  orderData.size           = data[DATA_NAME.size];
  if (flag & 256)  orderData.angle          = data[DATA_NAME.angle];
  if (flag & 512)  orderData.button_text    = data[DATA_NAME.button_text];
  if (flag & 1024) orderData.view           = data[DATA_NAME.view];

  return orderData;
}