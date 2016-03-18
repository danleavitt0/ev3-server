var WS = require('ws').Server
var server = new WS({ port: 3000 })
var attachAPI = require('./api')

server.on('connection', function (socket) {
  var api = attachAPI(socket)
  socket.on('close', function () {
    api.sensorUnsubscribe('close')
  })

  socket.on('message', function (data) {
    data = JSON.parse(data)
    try {
      api[data.type](data, function () {
        socket.send(JSON.stringify({
          'ok': true,
          'reply_to': data.id
        }))
      })
    } catch (e) {
      socket.send(JSON.stringify({
        'ok': false,
        'id': data.id,
        'value': e
      }))
    }
  })
})
