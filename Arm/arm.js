const io = require('socket.io-client');

module.exports = function(RED) {
    function createJoints(){
        var joints = []
        for(var i = 0; i<7; i++){
            var joint_socket = io('http://127.0.0.1:1998/api/robots/7bot/devices/joint' + i);
            joints.push(joint_socket);
        }
        return joints;
    }

    function dropConnection(joints){
        for(var i =0; i < 6; i++){
            joints[i].close();
        }
    }

    function togglePump(checked){
        var pump_socket = io("http://127.0.0.1:1998/api/robots/7bot");
        if(checked){
            console.log("on")
            pump_socket.emit("turn_pump_on");
        }else{
            console.log("off")
            pump_socket.emit("turn_pump_off");
        }
    }
    
    function armControl(joints, msg){
        for(var i = 0; i <6; i++){
            var n = parseInt(msg.payload.joints[i]);
            joints[i].emit("angle",n);
        }
        togglePump(msg.payload.pump==="true");
    }

    function configNode(config){
        console.log(config)
        msg = {
            payload: {
                joints: [config.joint1, config.joint2, config.joint3, config.joint4, config.joint5, config.joint6],
                pump: config.pump
            }
        }
        return msg;
    }

    function ARM(config) {
        var node = this;
        RED.nodes.createNode(node, config);
        let msg = configNode(config);
        let joints = createJoints();
        node.on('input', function(){
            armControl(joints, msg);
            console.log(msg)
            node.send(msg);
        })
        node.on('close', function(){
            dropConnection(joints);
        })
    }
    RED.nodes.registerType("arm",ARM);
}