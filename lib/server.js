var WS = require('ws').Server
var server = new WS({ port: 3000 })
var Device = require('ev3-js-device')
var devices = require('ev3-js-devices')
var fs = require('fs')

var sensors = getSensors()

var running = false
var sendInterval

server.on('connection', function (socket) {
  console.log('connected')
  if (!running) {
    running = true
    sendInterval = setInterval(readSensors, 150)
  }
  socket.on('close', function () {
    console.log('close')
    clearInterval(sendInterval)
    running = false
  })

  function readSensors () {
    for (var port in sensors) {
      socket.send(JSON.stringify({
        type: sensors[port].type,
        data: sensors[port].read('value0')
      }))
    }
  }
})

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
