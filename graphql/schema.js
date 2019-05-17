const typeDefs = `
  scalar Coordinates
  scalar Date

  type Query {
    getAllUsers: [User]
    getUser(firstName: String!): User
    getAllBlogs: [Blog]
    isUserinArea(areaname: String, username: String): Info
  }

  type Mutation {
    addUser(userName: String!, email: String!, password: String!, firstName: String, lastName: String): User
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    password: String
    email: String
  }

  type Blog {
    likedBy: [User]
    info: String
    pos: [Position]
    author: String
    created: Date
  }

  type Position {
    location: Coordinates
    user: User
  }

  type Info {
    status: String
    msg: String
  }

`;

module.exports = {
	typeDefs
};
