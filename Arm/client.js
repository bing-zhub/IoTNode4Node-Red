// const io = require('socket.io-client');

// var arm = io('http://127.0.0.1:1998/api/robots/7bot/devices/joint0')
// var armPos = io('http://127.0.0.1:1998/api/robots/7bot/devices/jointsensor0')
// armP = 0;
// armPos.on("analogRead", function(value){
//   armP = value/4 - 30;
// })

// setTimeout(function(){
//   console.log(armP)
//   for(var i = armP; i < 120; i++){
//     setTimeout(function(i){

//       arm.emit("angle",i);
//     }, 100)
//   }
// }, 100);

// for(var i = 0; i < 120; i++){
//   setTimeout(function(i){
//     // arm.emit("angle",i);
//     console.log(i)
//   }, 1000)
// }

// const TWEEN = require()
const TWEEN = require('./Tween') 
var position = { x: 100, y: 0 }
var tween = new TWEEN.Tween(position);
tween.to({ x: 200 }, 10000);
tween.onUpdate(function(object) {
	console.log(object.x);
});
tween.start();
