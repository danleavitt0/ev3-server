var test = require('tape')

var WebSocket = require('ws')
var ws = new WebSocket('ws://192.168.1.221:3000')
var response = []

ws.on('open', function () {
  test('sensor read', function (t) {
    t.plan(1)
    ws.send(sensorSubscribe())
    setTimeout(function () {
      t.equals(response[0].ok, true)
      ws.send(sensorUnsubscribe())
    }, 2000)
  })
})

ws.on('message', function (data) {
  data = JSON.parse(data)
  console.log(data)
  if (data['reply_to'] === 1) {
    response.push(JSON.parse(data))
  }
})

function sensorSubscribe () {
  return JSON.stringify({
    type: 'sensor_subscribe',
    id: 1
  })
}

function sensorUnsubscribe () {
  return JSON.stringify({
    type: 'sensor_unsubscribe',
    id: 2
  })
}
//
// function setSpeed () {
//   return {
//     type: 'motor_write',
//     value: {
//       port: 'b',
//       path: 'duty_cycle_sp',
//       value: '50'
//     }
//   }
// }
//
// function startRun () {
//   return {
//     type: 'motor_write',
//     value: {
//       port: 'b',
//       path: 'command',
//       value: 'run-forever'
//     }
//   }
// }
//
// function stopRun () {
//   return {
//     type: 'motor_write',
//     value: {
//       port: 'b',
//       path: 'command',
//       value: 'reset'
//     }
//   }
// }
