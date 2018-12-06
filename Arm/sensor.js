const io = require('socket.io-client');

module.exports = function(RED) {

    function sensor(config) {
    var node = this;
    RED.nodes.createNode(node, config);
        var client = io('http://127.0.0.1:1998/api/robots/7bot/devices/jointsensor'+config.i)
        var msg = {
            payload: 0
        }
        client.on("analogRead", function(value){
            msg.payload = value/4 -38
            node.send(msg)
        })

        node.on("close", function(){
            client.close()
            node.log("关闭节点链接");
        })
    }
    RED.nodes.registerType("sensor",sensor);
}