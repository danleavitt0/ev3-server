var test = require('tape')

var ws = new WebSocket('ws://192.168.1.221:3000')
var response

ws.onopen = function () {
  test('sensor read', function (t) {
    t.plan(1)
    ws.send(sensorSubscribe())
    setTimeout(function () {
      t.equals(response.ok, true)
    })
  })
}


ws.onmessage = function (evt) {
  response = JSON.parse(evt.data)
}

// function sensorSubscribe () {
//   return JSON.stringify({
//     type: 'sensor_subscribe',
//     id: 1
//   })
// }
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
