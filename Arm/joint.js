const io = require('socket.io-client');

module.exports = function(RED) {
    function joint(config) {
        var node = this;
        var i = config.i;
        RED.nodes.createNode(node, config);        
        var joint_socket = io('http://127.0.0.1:1998/api/robots/7bot/devices/joint'+i);
        node.on('input', function(msg){
          joint_socket.emit('angle', msg.payload);       
        })
        node.on('close', function(){
          joint_socket.close()
        })
    }
    RED.nodes.registerType("joint",joint);
}