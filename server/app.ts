const ws = require('nodejs-websocket');
const arr = {};
ws.createServer((socket) => {
  socket.on('text', (arr) => {
    console.log('========');
    console.log(arr);
    const data = JSON.parse(arr);
    if (arr[data.username]) {
      for (const item in arr) {
        arr[item].sendText(
          JSON.stringify({
            username: data.username,
            text: data.mes,
          })
        );
      }
    } else {
      arr[data.username] = socket;
    }
  });
}).listen(4000);
