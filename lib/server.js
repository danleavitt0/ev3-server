var server = require('rtm-server')
var api = require('./api')
var PORT = 5000

server(api, PORT)
