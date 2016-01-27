var fs = require('fs')

module.exports = Device

function Device (path) {
  this.path = path
}

Device.prototype.write = function (prefix, cmd) {
  return fs.writeFileSync(this.path + '/' + prefix, cmd)
}

Device.prototype.read = function (prop) {
  return fs.readFileSync(this.path + '/' + prop, 'utf-8')
}
