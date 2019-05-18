const typeDefs = `
  scalar Coordinates
  scalar Date
  
  type Query {
    getAllUsers: [User]
    getUserByUsername(userName: String!): User
    getUserByID(id: String!): User
    getAllLocationBlogs: [Blog]
    getBlogByID(id: String!): Blog
    isUserinArea(areaname: String, username: String): Info
  }

  type Mutation {
    addUser(input: UserInput): User
    addUser2(firstName: String! lastName: String! userName: String! password: String! email: String): User
    addLocationBlog(info: String!, img: String!, pos: PositionInput, author: String!): Blog
    likeLocationBlog(blogID: String!, userID: String! ): Blog
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
    author: User
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

  input UserInput {
    id: ID
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
    email: String!
}

  input PositionInput {
    location: Coordinates
    user: UserInput
  }

  input InfoInput {
    status: String
    msg: String
  }

`;

module.exports = {
	typeDefs
};
