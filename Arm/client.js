const io = require('socket.io-client');
var client = io.connect("http://127.0.0.1:3000/api/robots/7bot/devices/joint0");
client.emit("angle",120);