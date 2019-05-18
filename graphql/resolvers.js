const _ = require('lodash');

/** 
* *****Mongoose******
* *****Models******
* *****Facade******
**/
const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/LocationBlog');
const queryFacade = require('../facades/queryFacade');

const resolvers = {
	Query: {
		getAllUsers: async () => {
			return await User.find({});
		},
		getUser: async (_, { firstName }) => await User.findOne({ firstName }),
		getAllBlogs: async () => await Blog.find({}).populate('likedBy').populate('author'),
		isUserinArea: async (_, { areaname, username }) => {
			var obj = await queryFacade.isUserinArea(areaname, username).catch((err) => {
				return { msg: err.message };
			});
			if (obj !== undefined) {
				return { status: obj.status, msg: obj.msg };
			}
		}
	},
	Mutation: {
		addUser: (_, { userName, email, password, firstName, lastName }) => {
			var user = new User({
				firstName,
				lastName,
				userName,
				email,
				password
			});
			user.save();
			return user;
		},
		addLocationBlog: async (_, { info, pos, author }) => {
			return await blogFacade.addLocationBlog(info, pos, author);
		}
	}
};

module.exports = {
	resolvers
};
