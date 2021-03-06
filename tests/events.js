const LineSensors = require('../index.js');

const lineSensors = new LineSensors();

lineSensors.enableEvents();

lineSensors.on('medicion', (_line, _sensors) => {
  /* eslint-disable no-console */
  console.log(`Linea: ${_line}, Sensores: ${lineSensors.sensorsToString(_sensors)}`);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('SIGTERM', () => {
  process.exit();
});
