const io = require('socket.io-client');

module.exports = function(RED) {
    function pump(config) {
        var node = this;
        RED.nodes.createNode(node, config);        
        var pump_socket = io("http://127.0.0.1:1998/api/robots/7bot");
        
        node.on('input', function(msg){
          checked = msg.payload
          if(checked){
            pump_socket.emit("turn_pump_on");
          }else{
            pump_socket.emit("turn_pump_off");
          }    
        })
        node.on('close', function(){
          pump_socket.close()
        })
    }
    RED.nodes.registerType("pump",pump);
}