var WS = require('ws').Server
var server = new WS({ port: 3000 })
var api = require('./api')()

server.on('connection', function (socket) {
  socket.on('close', function () {
    api.stopSensorRead()
  })

  socket.on('message', function (data) {
    data = JSON.parse(data)
    console.log(data)
    api[data.type](data.value)
  })
})
