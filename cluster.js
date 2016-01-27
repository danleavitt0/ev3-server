var spawn = require('child_process').spawn

var NUM_NODES = 1

var nodes = []

for (var i = 0; i < NUM_NODES; i++) {
	nodes.push(createSpawn())
}
 
var idx = 0
exports.run = function (file) {
	var node = nodes[idx]
	node.stdin.write(file, 'utf-8')
	nodes[idx] = createSpawn()
	idx = (idx + 1) % NUM_NODES
	return node
}

function createSpawn () {
	return spawn('node', [__dirname + '/run.js'])
}