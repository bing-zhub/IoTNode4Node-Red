var mqtt = require('mqtt')

module.exports = function(RED) {
  function LowerCaseNode(config) {
    var node = this;
    RED.nodes.createNode(node, config);
    var msg = {
        payload: ""
    }
    var client  = mqtt.connect('mqtt://115.159.98.171:1883')

    client.on("connect", function(){
        node.log("尝试连接到服务器")
        client.subscribe("hello", function(err){
            if(err){
                node.log("sth went wrong!", err)
                console.log(err)
                client.end()
            }else{
                node.log("已连接到服务器")
            }
        })
    })

    client.on("message", function(topic, message){
        msg.payload = message.toString()
        node.send(msg);
    })

    node.on("close", function(){
        node.log("onClose")
        client.end()
    })
  }
  RED.nodes.registerType("温湿度",LowerCaseNode);
}