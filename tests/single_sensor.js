const LineSensors = require('../index.js');

const lineSensors = new LineSensors();

function sensorStatus(i, sensors) {
  return (sensors >> (i - 1 )) & 0x01;
}

setInterval(() => {
  /* eslint-disable no-console */
  // console.log(`Sensor #1: ${lineSensors.readSensor(1)}`);
  const sensors = lineSensors.readSensors();
  console.log(`Sensor #1: ${sensorStatus(1, sensors)}`);
}, 1000);

process.on('SIGINT', () => {
  process.exit();
});

process.on('SIGTERM', () => {
  process.exit();
});
