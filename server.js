// index.js

const server = require('ws').Server;
const ws = new server({ port: 8081 });
//IDは各クライアントでの初期値を0とするため1から始める
var ID = 1;

const SENSOR_FORMAT = {
  alpha : 0,
  beta : 0,
  gamma : 0,
  acceleration_x : 0,
  acceleration_y : 0,
  acceleration_z : 0
};

var sensorDataList = []
for (var i = 0; i < 50; i++) {
  sensorDataList.push(Object.create(SENSOR_FORMAT));
}


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
        var userID = data['ID'];
        sensorDataList[userID].alpha = data['alpha'];
        sensorDataList[userID].beta = data['beta'];
        sensorDataList[userID].gamma = data['gamma'];
        sensorDataList[userID].acceleration_x = data['acceleration_x'];
        sensorDataList[userID].acceleration_y = data['acceleration_y'];
        sensorDataList[userID].acceleration_z = data['acceleration_z'];
        
        console.log('data = ' + sensorDataList[userID].acceleration_x);
        break;
      
      case 3:
        var userID = data['ID'];
        if (0 < userID && userID <= 50) {
          res['alpha'] = sensorDataList[userID].alpha;
        } else {
          res['alpha'] = 0;
        }
        break;
      
      case 4:
        var userID = data['ID'];
        res['text'] = data['text'];
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