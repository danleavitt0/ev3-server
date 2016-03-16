var WS = require('ws').Server
var server = new WS({ port: 3000 })
var Device = require('ev3-js-device')
var devices = require('ev3-js-devices')

var sensors = [
  new Device(devices(1)),
  new Device(devices(2)),
  new Device(devices(3)),
  new Device(devices(4))
]

var running = false
var sendInterval

server.on('connection', function (socket) {
  console.log('connected')
  if (!running) {
    running = true
    sendInterval = setInterval(readSensors, 100)
  }
  socket.on('close', function () {
    console.log('close')
    clearInterval(sendInterval)
    running = false
  })

  function readSensors () {
    var responses = []
    sensors.forEach(function (sensor) {
      try {
        responses.push(sensor.read('value0'))
      } catch (e) {
        console.log('no sensor')
      }
    })
    try {
      socket.send(JSON.stringify(responses))
    } catch (e) {
      console.log('closed')
    }
  }
})
