const con = new WebSocket('ws://localhost:8081/');

window.onload = function() {
    try {
        con.onopen = function() {
            console.log('coを開始しました');
        };
    } catch (error) {
        console.log(error);
    }
    sendData(1);
    setInterval(sendSensorData, 3000);
};

con.onmessage = function(res) {
    var resList = JSON.parse(res.data);
    console.log("res = " + res.data);

    var request_num = resList["request_num"];
    switch(request_num) {
        case 0:
            console.log("res = " + res.data);
            break;
        case 1:
            data.ID = resList['ID'];
            alert("IDは" + data.ID + "です");
            console.log('ID = ' + data.ID);
            
            var IDtext = document.getElementById("ID");
            IDtext.innerHTML = "ID : " + data.ID;

            break;
        case 2:
            console.log("res = " + res);
            //var messageText = document.getElementById('message');
            //messageText.innerHTML = resList['message'];
            break;
        
    }
};

var sendSensorData = function() {
    sendData(2);
};

function sendData(code) {

    if (data.ID == 0) {
        data.request_num = 1;
    } else {
        data.request_num = code;
    }
    console.log('送るデータ:' + JSON.stringify(data));

    try {
        con.send(JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

window.onbeforeunload = function(e) {
    e.returnValue = "ページを離れようとしています。よろしいですか？";
    con.close();
}