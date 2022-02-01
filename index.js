const jayson = require('jayson');
const { PORT } = require('./config');
const { startMining, stopMining } = require('./mine');

// create a server
const server = jayson.server({
	startMining: function (_, callback) {
		startMining();
		callback(null, 'success!');
	},
	stopMining: function (_, callback) {
		stopMining();
		callback(null, 'success!');
	},
});

server.http().listen(PORT);
