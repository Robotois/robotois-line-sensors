const LineSensors = require('../index.js');

const lineSensors = new LineSensors();

lineSensors.enableEvents();

lineSensors.on('reading', (_line, _sensors) => {
  /* eslint-disable no-console */
  console.log(`Linea: ${_line}`);
  /* eslint-disable no-console */
  console.log(`Sensores: ${lineSensors.sensorsToString(_sensors)}`);
});

setInterval(() => {}, 10000);

process.on('SIGINT', () => {
  process.exit();
});

process.on('SIGTERM', () => {
  process.exit();
});
