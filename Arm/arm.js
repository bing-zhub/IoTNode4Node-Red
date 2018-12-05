module.exports = function(RED) {
  function ARM(config) {
    var node = this;
    RED.nodes.createNode(node, config);
    // var a = config.a;
    // var b = config.b;
    // var d = config.c;
    // var e = config.e;
    var msg = {
        payload: "",
        topic: ""
    }

    node.on("close", function(){
        node.log("关闭节点链接")
    })

    node.on("message", function(){
        // msg.payload.a = a;
        // msg.payload.b = b;
        // msg.payload.c = c;
        // msg.payload.d = d;
        // msg.payload.e = e;
        node.send(msg)
    })
  }
  RED.nodes.registerType("arm",ARM);
}