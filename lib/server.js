var WS = require('ws').Server
var server = new WS({ port: 3000 })
var Device = require('ev3-js-device')
var devices = require('ev3-js-devices')

var motor = new Device(devices('c'))
var motor2 = new Device(devices('b'))
var ir = new Device(devices(1))
var sonic = new Device(devices(2))
var touch = new Device(devices(3))
var color = new Device(devices(4))

var running = false
var interval
var responses = []

function readSensors () {
  responses.push(motor.read('position'))
  responses.push(motor2.read('position'))
  responses.push(ir.read('value0'))
  responses.push(sonic.read('value0'))
  responses.push(touch.read('value0'))
  responses.push(color.read('value0'))
}

server.on('connection', function (socket) {
  console.log('connected')
  setInterval(function () {
    socket.send(responses)
  }, 100)
  if (!running) {
    running = true
    interval = setInterval(readSensors, 100)
  }
})

server.on('close', function () {
  clearInterval(interval)
  running = false
})
