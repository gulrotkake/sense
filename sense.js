/*global require*/
var SerialPort = require('serialport').SerialPort;

var serialPort = new SerialPort('/dev/tty.usbserial-A9005fnO', {
    baudrate: 9600
});

function writeTemperature(buffer) {
    console.log("Value is "+buffer.join(''));
}

serialPort.on('open', function () {
    var buffer = [];
    var state = 0;
    serialPort.on('data', function (data) {
        for (var i = 0; i<data.length; ++i) {
            var c = data[i];
            switch(state) {
            case 0:
                if (c===10) state = 1;
                break;
            case 1:
                if (c===10) {
                    writeTemperature(buffer);
                    buffer = [];
                } else {
                    buffer.push(String.fromCharCode(c));
                }
                break;
            }
        }
    });
});