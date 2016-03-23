var WebSocket = require('ws')
var test = require('tape')
var ws = new WebSocket('ws://192.168.1.6:5000')

ws.on('open', function () {
  ws.send(JSON.stringify({
    type: 'sensor_subscribe',
    id: 1
  }))
})

ws.on('message', function (data) {
  console.log(JSON.parse(data))
  test('first test', function (t) {
    t.equals(true, true)
  })
})
