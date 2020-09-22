const con = new WebSocket('ws://localhost:8081');
con.onmessage = (m) => { console.log(m.data) }; // ここまでは、全てのタブ共通で入力する

con.send('Hello'); // ここは一つのタブでだけ入力する