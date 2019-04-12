// get distance to friend
const User = require('../models/User');
const Position = require('../models/Position');
const gju = require('geojson-utils');
const colors = require('colors');

async function getDistanceToUser(lon, lat, username) {
	const user_id = await User.findOne({ userName: username }).select({ _id: 1 });
	if (user_id !== null) {
		return (userPos = await Position.findOne({ user: user_id })
			.catch(() => {
				throw new Error(`${username} doesn't have a Location`);
			})
			.then(async (data) => {
				if (data === null) {
					throw new Error(`${username} doesn't have a Location`);
				} else {
					const point = { type: 'Point', coordinates: [ lon, lat ] };
					const distance = await gju.pointDistance(point, data.loc); // finder distancen mellem point og User
					return { username: username, distance };
				}
			}));
	} else {
		throw new Error(`User: ${username} doesn't Exist`);
	}
}

async function findNearbyPlayers(lon, lat, dist) {
	return Position.find({
		loc: {
			$near: {
				$geometry: { type: 'Point', coordinates: [ lon, lat ] },
				$minDistance: 0.1,
				$maxDistance: dist
			}
		}
	})
		.populate('user', 'userName firstName') // you can add more variables if you like
		.select({ created: 0, __v: 0, _id: 0, 'loc.type': 0, 'user._id': 0 });
}

module.exports = {
	getDistanceToUser,
	findNearbyPlayers
};
