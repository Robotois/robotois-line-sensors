const LineSensors = require('../index.js');

const lineSensors = new LineSensors();

setInterval(() => {
  /* eslint-disable no-console */
  // console.log(`Sensores: ${lineSensors.sensorsToString(lineSensors.readSensors())}`);
  console.log(`Sensores: ${lineSensors.readLine()}`);
}, 500);

process.on('SIGINT', () => {
  process.exit();
});

process.on('SIGTERM', () => {
  process.exit();
});
