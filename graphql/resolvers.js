const _ = require("lodash");

/** 
* *****Mongoose******
* *****Models******
* *****Facade******
**/
const mongoose = require('mongoose');
const userFacade = require('../facades/userFacade');
const blogFacade = require('../facades/blogFacade');
const queryFacade = require('../facades/queryFacade');

const resolvers = {
	Query: {
		getAllUsers: async () => {
			return await userFacade.getAllUsers();
		},
		getUserByUsername: async (_, { userName }) => await userFacade.findByUsername(userName),
		getUserByID: async (_, { id }) => await userFacade.findById(id),
		getAllLocationBlogs: async () => await blogFacade.getAllLocationBlogs(),
		getBlogByID: async (_, { id }) => await blogFacade.likeLocationBlog(id),
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
		addUser: async (_, { input }) => {
			return await userFacade.addUser(input.firstName, input.lastName, input.userName, input.password, input.email);
		},
		addLocationBlog: async (_, { input }) => {
			return await blogFacade.addLocationBlog(input.info, input.img, input.pos, input.author);
		},
		likeLocationBlog: async (_, { input }) => {
			return await blogFacade.likeLocationBlog(input.blogID, input.userID);
		},
	}
};

module.exports = {
  resolvers
};
