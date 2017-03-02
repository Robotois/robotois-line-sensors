const LineSensors = require('../index.js');

const lineSensors = new LineSensors();

setInterval(() => {
  /* eslint-disable no-console */
  console.log(`Sensor #1: ${lineSensors.readSensor(1)}`);
}, 1000);

process.on('SIGINT', () => {
  process.exit();
});

process.on('SIGTERM', () => {
  process.exit();
});
