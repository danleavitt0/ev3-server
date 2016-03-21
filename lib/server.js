var server = require('realtime-api-server')
var api = require('./api')
var PORT = 5000

server(api, PORT, function () {
  console.log('server running on port: ' + PORT)
})
