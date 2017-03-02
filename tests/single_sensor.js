var _line_sensors = require('../index.js'),
    line_sensors = new _line_sensors();

setInterval(() => {
  console.log("Sensor #1: " + line_sensors.readSensor(1));
},1000);

// setInterval(()=>{ // Proceso en estado ocioso
//   true;
// },10000);

process.on('SIGINT', function () {
  process.exit();
});

process.on('SIGTERM', function () {
  process.exit();
});
