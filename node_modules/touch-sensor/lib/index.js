/**
 * Imports
 */

var inherit = require('component-inherit')
var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')

/**
 * Expose ColorSensor
 */

module.exports = TouchSensor['default'] = TouchSensor

/**
 * TouchSensor Device
 * @param {Number} port number of touch sensor port
 */
function TouchSensor (port) {
  try {
    if (!(this instanceof TouchSensor)) {
      return new TouchSensor(port)
    }
    Device.call(this, devices(port))
  } catch (e) {
    throw new Error('Can not find touch sensor in port ' + port)
  }
}

inherit(TouchSensor, Device)

Object.defineProperties(TouchSensor.prototype, {
  value: {
    get: getValue
  }
})

/**
 * use touch sensor to get a value
 * @return {string} state value of 0 or 1
 */
function getValue () {
  this.write('mode', 'TOUCH')
  return Number(this.read('value0'))
}
