var WS = require('ws').Server
var server = new WS({ port: 3000 })
var attachAPI = require('./api')

server.on('connection', function (socket) {
  var api = attachAPI(socket)
  socket.on('close', function () {
    api.stopSensorRead()
  })

  socket.on('message', function (data) {
    data = JSON.parse(data)
    try {
      socket.send(JSON.stringify(api[data.type](data.value)))
    } catch (e) {
      socket.send(JSON.stringify({
        type: 'error',
        value: e
      }))
    }
  })
})
