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
var readInterval
var sendInterval
var responses = {}

function readSensors () {
  responses.motor = motor.read('position')
  responses.motor2 = motor2.read('position')
  responses.ir = ir.read('value0')
  responses.sonic = sonic.read('value0')
  responses.touch = touch.read('value0')
  responses.color = color.read('value0')
}

server.on('connection', function (socket) {
  console.log('connected')
  sendInterval = setInterval(function () {
    try {
      socket.send(JSON.stringify(responses))
    } catch (e) {
      console.log('closed')
    }
  }, 100)
  if (!running) {
    running = true
    interval = setInterval(readSensors, 100)
  }
})

server.on('close', function () {
  clearInterval(readInterval)
  clearInterval(sendInterval)
  running = false
})
