var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')
var fs = require('fs')

var sensors = getSensors()
var reading = false

module.exports = writeAPI

function writeAPI (socket) {
  var interval

  return {
    'sensor_mode': setSensorMode,
    'motor_write': motorWrite,
    'start_sensor_read': startSensorRead,
    'stop_sensor_read': stopSensorRead,
    stopSensorRead: stopSensorRead
  }

  function startSensorRead () {
    if (!reading) {
      reading = true
      interval = setInterval(sensorRead, 150)
      return {
        type: 'started_read',
        value: 'ok'
      }
    }
    return {
      type: 'error',
      value: 'Another computer is already connected to this robot'
    }
  }

  function stopSensorRead () {
    reading = false
    clearInterval(interval)
    return {
      type: 'read_stopped',
      value: 'ok'
    }
  }

  function sensorRead () {
    var sensorData = {}
    for (var port in sensors) {
      var data = sensors[port].device.read('value0')
      sensorData[port] = {
        type: sensors[port].type,
        value: data
      }
    }
    try {
      socket.send(JSON.stringify({
        type: 'sensor_read',
        data: sensorData
      }))
    } catch (e) {
      console.warn('socket closed')
    }
  }
}

function setSensorMode (data) {
  try {
    var port = data.port
    var value = data.value
    var device = new Device(devices(port))
    device.write('mode', value)
    return {
      type: 'mode_changed',
      value: 'ok'
    }
  } catch (e) {
    return {
      type: 'error',
      value: e
    }
  }
}

function motorWrite (data) {
  try {
    var port = data.port
    var value = data.value
    var path = data.path

    var device = new Device(devices(port))
    device.write(path, value, function () {
      return {
        type: 'motor_write',
        value: 'ok'
      }
    })
  } catch (e) {
    return {
      type: 'error',
      value: e
    }
  }
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
