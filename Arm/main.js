var Cylon = require('cylon');

Cylon.robot({
  name: '7bot',
  connections: {
    arduino: {
      adaptor: 'firmata', port: '/dev/cu.usbmodem144301'
    }
  },

  devices: {
    joint0: { driver: 'servo', pin: 2 },
    joint1: { driver: 'servo', pin: 3 },
    joint2: { driver: 'servo', pin: 4 },
    joint3: { driver: 'servo', pin: 5 },
    joint4: { driver: 'servo', pin: 6 },
    joint5: { driver: 'servo', pin: 7 },
    joint6: { driver: 'servo', pin: 8 },
    jointsensor0: { driver: 'analogSensor', pin: 0, lowerLimit: 100, upperLimit: 900 },
    jointsensor1: { driver: 'analogSensor', pin: 1, lowerLimit: 100, upperLimit: 900 },
    jointsensor2: { driver: 'analogSensor', pin: 2, lowerLimit: 100, upperLimit: 900 },
    jointsensor3: { driver: 'analogSensor', pin: 3, lowerLimit: 100, upperLimit: 900 },
    jointsensor4: { driver: 'analogSensor', pin: 4, lowerLimit: 100, upperLimit: 900 },
    jointsensor5: { driver: 'analogSensor', pin: 5, lowerLimit: 100, upperLimit: 900 },
    pumpvalve: { driver: 'led', pin: 10 },
    pumpmotor: { driver: 'led', pin: 11 }
  },

  work: function (my) {
    this.joint0.angle(90);
    this.joint1.angle(150);
    this.joint2.angle(120);
    this.joint3.angle(90);
    this.joint4.angle(90);
    this.joint5.angle(90);
    this.pumpmotor.turnOff();
  },
  commands: function () {
    return {
      turn_pump_on: this.turnPumpOn,
      turn_pump_off: this.turnPumpOff,
    };
  },

  turnPumpOn: function () {
    this.pumpmotor.turnOn();
    this.pumpvalve.turnOff();
  },

  turnPumpOff: function () {
    this.pumpmotor.turnOff();
    this.pumpvalve.turnOn();
  }
});

Cylon.api('socketio',
  {
    host: '0.0.0.0',
    port: '1998'
  });

Cylon.start();
