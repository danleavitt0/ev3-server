/**
 * Imports
 */

var inherit = require('component-inherit')
var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')

/**
 * Expose ColorSensor
 */

module.exports = ColorSensor['default'] = ColorSensor

/**
 * ColorSensor Device
 * @param {Number} port number of color sensor port
 */
function ColorSensor (port) {
  try {
    if (!(this instanceof ColorSensor)) {
      return new ColorSensor(port)
    }
    Device.call(this, devices(port))
  } catch (e) {
    throw new Error('Can not find color sensor in port ' + port)
  }
}

inherit(ColorSensor, Device)

Object.defineProperties(ColorSensor.prototype, {
  color: {
    get: getColor
  },
  reflected: {
    get: getReflected
  }
})

/**
 * use color sensor to get a color
 * @return {string} color value between 0 and 7
 */
function getColor () {
  this.write('mode', 'COL-COLOR')
  return Number(this.read('value0'))
}

/**
 * use color sensor to get reflected light intensity
 * @return {string} reflect light intensity value between 0 amd 100
 */
function getReflected () {
  this.write('mode', 'COL-REFLECT')
  return Number(this.read('value0'))
}
