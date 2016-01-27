/**
 * Imports
 */

var inherit = require('component-inherit')
var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')

/**
 * Expose ColorSensor
 */

module.exports = IRSensor['default'] = IRSensor

/**
 * IRSensor Device
 * @param {Number} port number of ir sensor port
 */
function IRSensor (port) {
  try {
    if (!(this instanceof IRSensor)) {
      return new IRSensor(port)
    }
    Device.call(this, devices(port))
  } catch (e) {
    throw new Error('Can not find IR sensor in port ' + port)
  }
}

inherit(IRSensor, Device)

Object.defineProperties(IRSensor.prototype, {
  proximity: {
    get: getProximity
  }
})

function getProximity () {
  this.write('mode', 'IR-PROX')
  return Number(this.read('value0'))
}

IRSensor.prototype.beacon = function (channel) {
  this.write('mode', 'IR-SEEK')
  return {
    heading: Number(this.read('value' + (channel * 2 - 2))),
    distance: Number(this.read('value' + (channel * 2 - 1)))
  }
}

IRSensor.prototype.remote = function (channel) {
  this.write('mode', 'IR-REMOTE')
  return Number(this.read('value' + (channel - 1)))
}
