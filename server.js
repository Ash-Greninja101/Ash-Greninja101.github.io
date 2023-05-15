const WebSocket = require("ws");
const https = require("https");
const fs = require("fs");

// const server = https.createServer()

// const wss = new WebSocket.Server({port: 8080})
// let data = JSON.parse(fs.readFileSync("data.json"));
// var update = () => fs.writeFileSync("data.json", JSON.stringify(data));
// console.log("server is running");
// wss.on("connection", ws => {
//     console.log("someone connected");
//     ws.on("message", msg => {
//         let parsed = JSON.parse(msg);

//         if (parsed.msgType === "registeration"){
//             console.log(data["registered"]);
//             console.log("someone has registered");
//             update();
//         }
//     })
// })
// import { createServer } from 'https';
// import { readFileSync } from 'fs';
// import { WebSocketServer } from 'ws';

// const server = https.createServer({
//   cert: fs.readFileSync('/path/to/cert.pem'),
//   key: fs.readFileSync('/path/to/key.pem')
// });
const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', ws => {
  ws.on('error', console.error);

  ws.on('message', ms => {
    console.log('received: %s', data);
  });

  ws.send('something');
});

// server.listen(8080);