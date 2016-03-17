var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')
var fs = require('fs')

var sensors = getSensors()

module.exports = writeAPI

function writeAPI () {
  var interval
  var reading = true

  return {
    'sensor_mode': setSensorMode,
    'motor_write': motorWrite,
    'start_sensor_read': startSensorRead,
    'stop_sensor_read': stopSensorRead
  }

  function startSensorRead () {
    if (!reading) {
      reading = true
      interval = setInterval(sensorRead, 150)
    }
  }

  function stopSensorRead () {
    clearInterval(interval)
  }
}

function sensorRead () {
  var sensorData = {}
  for (var port in sensors) {
    var data = sensors[port].device.read('value0')
    sensorsData[port] = {
      type: sensors[port].type,
      value: data
    }
  }
  return {
    type: 'sensor_read',
    data: sensorData
  }
}

function setSensorMode (data) {
  var port = data.port
  var value = data.value
  var device = new Device(devices(port))
  device.write('mode', value)
}

function motorWrite (data) {
  var port = data.port
  var value = data.value
  var device = new Device(devices(port))
  device.write('command', value)
}

function getSensors () {
  return [1, 2, 3, 4].reduce(function (obj, port) {
    try {
      var path = devices(port)
      obj[port] = {
        type: fs.readFileSync(path + '/driver_name', 'utf-8').trim(),
        device: new Device(path)
      }
    } catch (e) {}
    return obj
  }, {})
}
