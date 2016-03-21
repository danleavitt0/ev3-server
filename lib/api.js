var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')

var fs = require('fs')
var Emitter = require('wolfy87-eventemitter')
var motor = require('./motor')
var moveSteering = require('./moveSteering')
var foreach = require('@f/foreach')

var sensors = getSensors()
var readingChannels = {}
var reading = false
var interval

exports.sensor_mode = sensorMode
exports.sensor_subscribe = sensorSubscribe,
exports.sensor_unsubscribe = sensorUnsubscribe,
exports.motor_read = motorRead
exports.motor_write = motor
exports.motors_write = moveSteering
exports.ping = ping

var messages = exports.messages = new Emitter()

messages.on('close', function (socketId) {
  sensorUnsubscribe({socketId: socketId})
})

function sensorSubscribe (data, cb) {
  if (!reading) {
    reading = true
    interval = setInterval(sensorRead, 150)
  }
  readingChannels[data.socketId] = true
  cb(null, true)
}

function sensorUnsubscribe (data, cb) {
  delete readingChannels[data.socketId]
  if (!Object.keys(readingChannels).length) {
    reading = false
    clearInterval(interval)
  }
  return cb(null, true)
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
  foreach(function (val, id) {
    console.log('foreach', val, id, sensorData)
    messages.emit(id, sensorData)
  }, readingChannels)
}

function sensorMode (data, cb) {
  var port = data.port
  var value = data.value
  var device = new Device(devices(port))

  device.write('mode', value, cb)
}

function motorRead (data) {
  var port = data.port
  var path = data.path

  var device = new Device(devices(port))

  cb(null, device.read(path, port))
}

function ping (data, cb) {
  cb(null, true)
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
