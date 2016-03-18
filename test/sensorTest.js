var test = require('tape')

var WebSocket = require('ws')
var ws = new WebSocket('ws://192.168.1.6:3000')
var response = []
var id = 0

ws.on('open', function () {
  console.log('connected')
  setInterval(function () {
    console.time(id)
    ws.send(JSON.stringify({
      type: 'ping',
      id: ++id
    }))
  }, 500)
  // test('should read sensors', function (t) {
  //   t.plan(1)
  //   console.time('start')
  //   ws.send(sensorSubscribe(1))
  //   setTimeout(function () {
  //     t.equals(response[0].ok, true)
  //   }, 500)
  // })
  // test('should block second read', function (t) {
  //   t.plan(1)
  //   ws.send(sensorSubscribe(2))
  //   setTimeout(function () {
  //     console.log(response[1].value)
  //     t.equals(response[1].ok, false)
  //   }, 500)
  // })
  // test('should stop read', function (t) {
  //   t.plan(1)
  //   ws.send(sensorUnsubscribe(3))
  //   setTimeout(function () {
  //     t.equals(response[2].ok, true)
  //   }, 500)
  // })
  // test('should start read again', function (t) {
  //   t.plan(1)
  //   ws.send(sensorSubscribe(4))
  //   setTimeout(function () {
  //     t.equals(response[3].ok, true)
  //     ws.send(sensorUnsubscribe(5))
  //   }, 500)
  // })
})

ws.on('message', function (data) {
  data = JSON.parse(data)
  console.log(data)
  if (data['reply_to']) {
    console.timeEnd(data.reply_to)
    response.push(data)
  }
})

function sensorSubscribe (id) {
  return JSON.stringify({
    type: 'sensor_subscribe',
    id: id
  })
}

function sensorUnsubscribe (id) {
  return JSON.stringify({
    type: 'sensor_unsubscribe',
    id: id
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
