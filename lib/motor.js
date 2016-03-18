var Device = require('ev3-js-device')
var devices = require('ev3-js-devices')

var motorDefaults = {
  speed: 300,
  braking: 'brake',
  wait: true
}

module.exports = motor

function motor (data, cb) {
  var port = data.port
  var command = data.command
  var opts = data.opts
  var responses = []
  for (var opt in opts) {
    motorWrite(port, opt, opts[opt], writeCommand)
  }
  function writeCommand (response) {
    responses.push(response)
    if (responses.length === Object.keys(opts).length) {
      motorWrite(port, 'command', command, cb)
    }
  }
}

function motorWrite (port, path, value, cb) {
  try {
    var device = new Device(devices(port))
    device.write(path, value, function (err) {
      if (err) {
        console.log(err)
      }
      cb(value)
    })
  } catch (e) {
    console.log(e)
  }
}
