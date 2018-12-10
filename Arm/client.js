var TWEEN = require("@tweenjs/tween.js")
var position = [0,0,0,0];
var target = [100,200,100,1000];
var tween = new TWEEN.Tween(position).to(target, 2000);
var motion = eval("TWEEN.Easing.Quadratic.Out");
tween.onUpdate(function(){
  console.log(position)
});
tween.easing(motion);
tween.start();

// while(!(target.x==position.x && target.y == position.y)){
  while(target!==position){
  TWEEN.update();
}