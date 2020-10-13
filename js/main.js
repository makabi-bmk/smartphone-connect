const con = new WebSocket('ws://172.20.10.5:8081/');
var ID;

try {
    const con = new WebSocket('ws://172.20.10.5:8081/');
    
    con.onopen = function() {
        console.log('coを開始しました');
        con.send('Hello WebSocket!');
    };
    // con.close();

} catch (error) {
    console.log(error);
}

con.onmessage = function(msg) {
    
    alert(msg.data);
    console.log(msg.data);
};


