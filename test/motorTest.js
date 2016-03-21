var test = require('tape')

var WebSocket = require('ws')
var ws = new WebSocket('ws://localhost:3000')
var response = []

ws.on('open', function () {
  test('should run motor', function (t) {
    t.plan(1)
    ws.send(degrees('b', 1))
    ws.send(degrees('c', 2))
    setTimeout(function () {
      t.equals(response[0].ok, true)
      ws.send(moveSteering(3, 400))
    }, 5000)
  })
})

ws.on('message', function (data) {
  data = JSON.parse(data)
  if (data['reply_to']) {
    response.push(data)
  }
})

function moveSteering (id, degrees, speed, turn, ports) {
  ports = ports || ['b', 'c']
  speed = speed || 50
  turn = turn || 50
  var values = turnToDegrees(turn, speed, degrees)

  return JSON.stringify({
    type: 'move_steering',
    ports: ports,
    id: id,
    command: 'run-to-rel-pos',
    opts: {
      left: {
        'position_sp': values.left.degrees,
        'duty_cycle_sp': values.left.speed
      },
      right: {
        'position_sp': values.right.degrees,
        'duty_cycle_sp': values.right.speed
      }
    }
  })
}

function degrees (port, id) {
  return JSON.stringify({
    type: 'motor_write',
    id: id,
    command: 'run-to-rel-pos',
    port: port,
    opts: {
      'position_sp': '1000',
      'duty_cycle_sp': '50'
    }
  })
}


function turnToSpeeds (turn, speed) {
  turn = Math.max(Math.min(turn, 100), -100)

  var reducedSpeed = otherSpeed(turn, speed)

  return {
    left: turn < 0 ? reducedSpeed : speed,
    right: turn > 0 ? reducedSpeed : speed
  }
}

/**
 * Params for degrees based on turn
 * @param  {Number} turn
 * @param  {Number} speed
 * @param  {Number} degrees
 * @return {Object} opts    object of degrees and speed for each motor
 */

function turnToDegrees (turn, speed, degrees) {
  turn = Math.max(Math.min(turn, 100), -100)

  var opts = turnToSpeeds(turn, speed)
  opts.left = { speed: opts.left }
  opts.right = { speed: opts.right }

  var reducedSpeed = otherSpeed(turn, speed)
  var reducedDegrees = Math.round((reducedSpeed / speed) * degrees)
  reducedSpeed = Math.abs(reducedSpeed)

  opts.left.degrees = turn < 0 ? reducedDegrees : degrees
  opts.right.degrees = turn > 0 ? reducedDegrees : degrees

  return opts
}

/**
 * Calculate off wheel speed
 * @param  {Number} turn
 * @param  {Number} speed
 * @return {Number} speed of the off motor
 */

function otherSpeed (turn, speed) {
  return Math.round(speed * ((100 - (Math.abs(turn) * 2)) / 100))
}
