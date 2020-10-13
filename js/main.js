const con = new WebSocket('ws://localhost:8081/');
var ID;

try {
    
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


