var lws = require('lws')
var server = new lws.Server({ port: 3000 })
var Device = require('ev3-js-device')
var devices = require('ev3-js-devices')

var motor = new Device(devices('c'))
var motor2 = new Device(devices('b'))
var ir = new Device(devices(1))
var sonic = new Device(devices(2))
var touch = new Device(devices(3))
var color = new Device(devices(4))

var running = false
function readSensors () {
  var responses = []
  responses.push(motor.read('position'))
  responses.push(motor2.read('position'))
  responses.push(ir.read('value0'))
  responses.push(sonic.read('value0'))
  responses.push(touch.read('value0'))
  responses.push(color.read('value0'))
  return responses
}

server.on('connection', function (socket) {
  console.log('connected')
  if (!running) {
    running = true
    setInterval(readSensors, 100)
  }
})

server.on('close', function () {
  running = false
})