const typeDefs = `
  scalar Coordinates
  scalar Date
  
  type Query {
    getAllUsers: [User]
    getUserByUsername(userName: String!): User
    getUserByID(id: String!): User
    getAllLocationBlogs: [Blog]
    getBlogByID(id: String!): Blog
    isUserinArea(areaname: String!, username: String!): UserInArea
    getDistanceToUser(lon: Int!, lat: Int!, username: String! ): DistanceToUser
  }

  type Mutation {
    addUser(input: UserInput): User
    addLocationBlog(input: BlogInput): Blog
    likeLocationBlog(input: LikeBlogInput ): Blog
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
    email: String!
  }

  type Blog {
    likedBy: [User]
    info: String
    pos: BlogPosition
    author: User
    created: Date
  }

  type BlogPosition {
    longitude: Int!
    latitude: Int!
  }

  type UserInArea {
    status: String
    msg: String
  }

  type DistanceToUser {
    distance: String
    to: String
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
    pos: BlogPositionInput!
    author: String!
  }

  input BlogPositionInput {
    longitude: Int!
    latitude: Int!
  }


`;

module.exports = {
  typeDefs
};
