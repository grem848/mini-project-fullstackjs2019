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
	//console.log(user);
	if (user !== null) {
		var dbPosition = await Position.findOne({ user: user._id }).catch((err) => {
			throw Error(err);
		});
		//	console.log({ findOne: dbPosition });
		if (dbPosition === null) {
			var position = new Position({
				user: user._id,
				loc: { type: 'Point', coordinates: [ lon, lat ] }
			});
			var updatedPosition = await Position.findOneAndUpdate({ user: user._id }, position, {
				upsert: true,
				new: true
			});
			//			console.log({ updatedVersion: updatedPosition });
		} else {
			var updatedPosition = await Position.findOneAndUpdate(
				{ user: user._id },
				{ loc: { type: 'Point', coordinates: [ lon, lat ] } },
				{
					new: true
				}
			).catch((err) => {
				console.log(colors.red(err.errmsg));
			});
		}

		var friends = await findNearbyPlayers(lon, lat, radius, { user: 1, _id: 0 }).catch((err) => {
			console.log(colors.red(err.errmsg));
		});

		return friends;
	}
	return null;
}

async function findNearbyPlayers(lon, lat, dist, fields) {
	return Position.find({
		loc: {
			$near: {
				$geometry: { type: 'Point', coordinates: [ lon, lat ] },
				$minDistance: 0,
				$maxDistance: dist
			}
		}
	});
}

module.exports = {
	login
};
