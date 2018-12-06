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
        for(var i =0; i < 7; i++){
            sensors[i].close();
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
        for(var i = 0; i <7; i++){
            joints[i].emit("angle",msg.payload.joints[i]);
        }
        togglePump(msg.payload.pump)
    }

    function ARM(config) {
        var node = this;
        RED.nodes.createNode(node, config);        

        var joints = createJoints();
        var sensors = createSensors();
        node.on('input', function(msg){
            console.log(msg);
            armControl(joints, msg);        
        })
        node.on('close', function(){
        
        })
    }
    RED.nodes.registerType("arm",ARM);
}