const LineSensors = require('bindings')('LineSensorsModule');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;
/**
 * Creates an instance of LineSensorsModule.
 * @param {int} add The second argument.
 * @returns {LineSensorsModule} LineSensorsModule object.
 */
function LineSensorsModule(add = 0) {
  const self = this;
  EventEmitter.call(this);

  this.line = new LineSensors(add);

  process.on('SIGINT', () => {
    self.line.release();
  });

  process.on('SIGTERM', () => {
    self.line.release();
  });
}

LineSensorsModule.prototype.readSensors = function readSensors() {
  return this.line.readSensors();
};

LineSensorsModule.prototype.readSensor = function readSensor(sensor) {
  return this.line.readSensor(sensor);
};

LineSensorsModule.prototype.readLine = function readLine() {
  return this.line.readLine();
};

LineSensorsModule.prototype.setBackground = function setBackground(str) {
  this.line.setBackground(str);
};

LineSensorsModule.prototype.enableEvents = function enableEvents() {
  let line;
  let sensors;
  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => { // Medicionies cada 100ms
      sensors = this.readSensors();
      line = this.readLine();
      this.emit('reading', line, sensors);
    }, 100);
  }
};

LineSensorsModule.prototype.sensorsToString = function sensorsToString(sensors) {
  return (`00000${sensors.toString(2)}`).slice(-5);
};

LineSensorsModule.prototype.lineToString = function lineToString(line) {
  return (`     ${line.toFixed(1).toString()}`).slice(-5);
};

LineSensorsModule.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.line.release();
};

inherits(LineSensorsModule, EventEmitter);

module.exports = LineSensorsModule;
