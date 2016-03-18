var motor = require('./motor')

module.exports = moveSteering

function moveSteering (data, cb) {
  var leftMotor = {
    port: data.port[0],
    command: data.command,
    opts: data.opts
  }
  var rightMotor = {
    port: data.port[1],
    command: data.command,
    opts: data.opts
  }
  motor(leftMotor, cb)
  motor(rightMotor, cb)
}
