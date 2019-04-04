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

module.exports = {
	getDistanceToUser
};
