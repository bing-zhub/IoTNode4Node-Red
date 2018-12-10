var TWEEN = require("@tweenjs/tween.js")

module.exports = function(RED) {
    function easy(config) {
        var node = this;
        RED.nodes.createNode(node, config);        
        var msg = {
          payload: {
            oldValue:{
              x:0,
              y:0
            },
            newValue:{
              x:0,
              y:0
            },
            duration:1000
          },
          topic:""
        }
        node.on('input', function(msg){
          position = msg.payload.oldValue;
          target = msg.payload.newValue;
          var tween = new TWEEN.Tween(position).to(target, msg.payload.duration);
          tween.onUpdate(function(){
            let msg = {
              payload:position
            }
            node.send(msg)
          });

          let easing = eval(config.graphic);
          tween.easing(easing);
          tween.start();
          while(!(target.x==position.x && target.y == position.y)){
            TWEEN.update();
          }
        })
    }
    RED.nodes.registerType("easy",easy);
}