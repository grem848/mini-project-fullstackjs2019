const _ = require('lodash');

/** 
* *****Mongoose******
* *****Models******
* *****Facade******
**/
const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/LocationBlog');
const userFacade = require('../facades/userFacade');
const blogFacade = require('../facades/blogFacade');
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
		addUser: async (_, { firstName, lastName, userName, password, email }) => {
			return await userFacade.addUser(firstName, lastName, userName, password, email);
		},
		addLocationBlog: async (_, { info, img, pos, author }) => {
			return await blogFacade.addLocationBlog(info, img, pos, author);
		}
	}
};

module.exports = {
	resolvers
};
