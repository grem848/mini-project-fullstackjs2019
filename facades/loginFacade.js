const Position = require('../models/Position');
const User = require('../models/User');
const gju = require('geojson-utils');
const colors = require('colors');

// latitaude, longitude, distance Must be added
async function login(username, password) {
	var user = await User.findOne().then((data) => console.log(colors.blue(data))).catch((err) => {
		if (err === null) {
			console.log(colors.red('err = NULL'));
		} else {
			console.log(colors.red(err));
		}
	});
	if (user !== null) {
		console.log(colors.green(user));
	} else {
		console.log(colors.red("User doesn't exist"));
	}
	return user;
}

module.exports = {
	login
};
