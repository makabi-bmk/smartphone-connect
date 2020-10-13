const con = new WebSocket('ws://localhost:8081/');

try {
    const con = new WebSocket('ws://localhost:8081/');
    
    con.onopen = function() {
        console.log('coを開始しました');
        con.send('Hello WebSocket!');
    };

    con.onmessage = function(msg) {
        alert(msg.data);
        console.log(msg.data);
    };
    // con.close();

} catch (error) {
    console.log(error);
}