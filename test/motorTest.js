var test = require('tape')

var WebSocket = require('ws')
var ws = new WebSocket('ws://192.168.1.221:3000')
var response = []

ws.on('open', function () {
  test('should run motor', function (t) {
    t.plan(1)
    ws.send(degrees(1))
    setTimeout(function () {
      t.equals(response[0].ok, true)
    }, 500)
  })
})

ws.on('message', function (data) {
  console.log(data)
  data = JSON.parse(data)
  if (data['reply_to']) {
    response.push(data)
  }
})

//
function degrees () {
  return JSON.stringify({
    type: 'motor_write',
    id: 1,
    command: 'run-to-rel-pos',
    opts: {
      'position_sp': '1000',
      'speed_sp': '400'
    }
  })
}
//
// this.write('position_sp', degrees.toString())
  // this.write('speed_sp', speed.toString())
  // this.write('stop_command', braking)
  // this.write('command', 'run-to-rel-pos')
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
