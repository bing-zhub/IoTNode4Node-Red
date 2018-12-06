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

    function createSensors(){
        var sensors = []
        for(var i = 0; i<7; i++){
            var sensor_socket = io('http://127.0.0.1:1998/api/robots/7bot/devices/joint' + i);
            sensors.push(sensor_socket);
        }
        return sensors;
    }

    function dropConnection(){
        for(var i =0; i < 6; i++){
            joints[i].close();
        }
    }

    function togglePump(checked){
        var pump = io("http://127.0.0.1:3000/api/robots/7bot");
        if(checked){
            pump.emit("turn_pump_on");
        }else{
            pump.emit("turn_pump_off");
        }
    }
    
    function armControl(joints, msg){
        for(var i = 0; i <6; i++){
            var n = parseInt(msg.payload.joints[i])
            joints[i].emit("angle",n);
        }
        pump = msg.payload.pump==="true"?true:false;
        togglePump(pump)
    }

    function ARM(config) {
        var node = this;
        RED.nodes.createNode(node, config);    
        joint1 = config.joint1
        joint2 = config.joint2
        joint3 = config.joint3
        joint4 = config.joint4
        joint5 = config.joint5
        joint6 = config.joint6
        msg = {
            payload: {
                joints: [joint1, joint2, joint3, joint4, joint5, joint6],
                pump: config.pump
            }
        }
        console.log(msg)    
        var joints = createJoints();
        var sensors = createSensors();
        node.on('input', function(){
            armControl(joints, msg);
            node.send(msg)
        })
        node.on('close', function(){
            dropConnection()
        })
    }
    RED.nodes.registerType("arm",ARM);
}