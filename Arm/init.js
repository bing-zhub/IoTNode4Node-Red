
module.exports = function(RED) {
  function init(config) {
    var node = this;
    RED.nodes.createNode(node, config);
    
    var msg = {
        payload: {
            joints: [90,150,120,90,90,90],
            pump: false
        },
        topic: ""
    }

    node.on("close", function(){
        node.log("关闭节点链接");
    })

    node.on("input", function(){
        node.send(msg);
    })
  }
  RED.nodes.registerType("init",init);
}