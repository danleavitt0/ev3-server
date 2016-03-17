var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')
var fs = require('fs')

var sensors = getSensors()
var reading = false

module.exports = writeAPI

function writeAPI (socket) {
  var interval

  return {
    'sensor_mode': sensorMode,
    'motor_write': motorWrite,
    'motor_read': motorRead,
    'sensor_subscribe': sensorSubscribe,
    'sensor_unsubscribe': sensorUnsubscribe,
    sensorUnsubscribe: sensorUnsubscribe
  }

  function sensorSubscribe (data) {
    var id = data.id

    if (!reading) {
      reading = true
      interval = setInterval(sensorRead, 150)
      return socket.send(success(id))
    }
    return socket.send(error(id, 'Already reading data'))
  }

  function sensorUnsubscribe (data) {
    var id = data.id
    reading = false

    clearInterval(interval)
    return socket.send(success(id))
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
        'type': 'sensor_read',
        'value': sensorData
      }))
    } catch (e) {
      console.warn('socket closed')
    }
  }

  function motorWrite (data) {
    try {
      var port = data.port
      var value = data.value
      var path = data.path
      var id = data.id

      var device = new Device(devices(port))
      device.write(path, value, function (err) {
        if (err) {
          return socket.send(error(id, err))
        }
        socket.send(success(id))
      })
    } catch (e) {
      return socket.send(error(id, e))
    }
  }

  function sensorMode (data) {
    try {
      var port = data.port
      var value = data.value
      var id = data.id

      var device = new Device(devices(port))
      device.write('mode', value, function (err) {
        if (err) {
          return socket.send(error(id, err))
        }
        socket.send(success(id))
      })
    } catch (e) {
      return socket.send(error(id, e))
    }
  }

  function motorRead (data) {
    var port = data.port
    var path = data.path
    var id = data.id

    var device = new Device(devices(port))

    var value = device.read(path, port)
    return socket.send(success(id, value))
  }
}

function success (id, value) {
  value = value || ''
  return JSON.stringify({
    'ok': true,
    'reply_to': id,
    'value': value
  })
}

function error (id, err) {
  return JSON.stringify({
    'ok': false,
    'reply_to': id,
    'value': err
  })
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
