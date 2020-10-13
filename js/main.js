const con = new WebSocket('ws://localhost:8081/');

window.onload = function() {
    try {
        con.onopen = function() {
        console.log('coを開始しました');
        con.send('from_smartphone');
        };
    } catch(error) {
        console.log(error);
    }
};

con.onmessage = function(msg) {
    alert(msg.data);
    console.log(msg.data);
};
    // con.close();
