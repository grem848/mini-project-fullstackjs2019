var mongoose = require('mongoose');
var debug = require('debug')('minidemo:mongo');
const colors = require('colors');

function connect(connectionString) {
	return mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true });
}
mongoose.connection.on('connected', function() {
	console.log(colors.green('Mongoose default connection open '));
});
mongoose.connection.on('disconnected', function() {
	console.log(colors.yellow('Mongoose connection closed '));
});
mongoose.connection.on('error', function(err) {
	console.log(colors.red('Mongoose default connection error: ' + err));
});

module.exports = connect;
