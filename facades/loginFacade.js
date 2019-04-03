const Position = require('../models/Position');
const User = require('../models/User');
const gju = require('geojson-utils');
const colors = require('colors');

// needs refactoring
async function login(username, password, lon, lat, radius) {
	var position = {};
	var user = await User.findOne({ userName: username, password }).select({ _id: 1 }).catch((err) => {
		throw new Error('err has occured');
	});
	if (user !== null) {
		var dbPosition = await Position.findOne({ user: user._id }).catch((err) => {
			throw Error(err);
		});
		console.log(dbPosition);
		if (dbPosition === null) {
			var position = new Position({
				user: user._id,
				loc: { type: 'Point', coordinates: [ lon, lat ] }
			});
			await Position.findOneAndUpdate({ user: user._id }, position, {
				upsert: true,
				new: true
			});
		} else {
			await Position.findOneAndUpdate(
				{ user: user._id },
				{ loc: { type: 'Point', coordinates: [ lon, lat ] } },
				{
					new: true
				}
			).catch((err) => {
				console.log(colors.red(err.errmsg));
			});
		}

		var friends = await findNearbyPlayers(lon, lat, radius, { _id: 0 }).catch((err) => {
			console.log(colors.red(err.errmsg));
		});

		return friends;
	}
	return null;
}

async function findNearbyPlayers(lon, lat, dist, fields) {
	console.log("\n\n--------------------")
	console.log(fields)
	return Position.find({
		loc: {
			$near: {
				$geometry: { type: 'Point', coordinates: [ lon, lat ] },
				$minDistance: 0,
				$maxDistance: dist
			}
		}
	}, fields)
		// .populate('user', 'userName') // you can add more variables if you like
		// .select({ created: 0, __v: 0, _id: 0, 'loc.type': 0, 'user._id': 0 });
}

module.exports = {
	login
};
