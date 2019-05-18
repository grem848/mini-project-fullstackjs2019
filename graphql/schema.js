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
    addLocationBlog(input: BlogInput): Blog
    likeLocationBlog(input: LikeBlogInput ): Blog
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
    pos: Position
    author: User
    created: Date
  }

  type Position {
    longitude: Int!
    latitude: Int!
  }

  type Info {
    status: String
    msg: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
    email: String!
  }

  input LikeBlogInput {
    blogID: String!
    userID: String! 
  }

  input BlogInput {
    info: String!
    img: String
    pos: PositionInput!
    author: String!
  }

  input PositionInput {
    longitude: Int!
    latitude: Int!
  }

`;

module.exports = {
  typeDefs
};
