const ws = require('nodejs-websocket');
let arrS = {};
ws.createServer((socket) => {
  socket.on('text', (info) => {
    if (typeof info === 'string' && info == 'pingqc') return;
    const data = JSON.parse(info);
    if (arrS[data.id]) {
      for (const item in arrS) {
        arrS[item].sendText(
          JSON.stringify({
            id: data.id,
            res: data.msg,
            time: new Date().getTime(),
          })
        );
      }
    } else {
      arrS[data.id] = socket;
    }
    console.log(arrS);
  });

  socket.on('connection', (code) => {
    console.log('开启链接', code);
  });
  socket.on('close', (close) => {
    console.log('关闭连接', close);
    arrS = {};
  });
  socket.on('error', (err) => {
    console.log(err);
  });
}).listen(4000);
