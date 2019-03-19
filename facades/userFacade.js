var mongoose = require("mongoose");
var User = require("../models/User");

function getAllUsers() {
  return User.find({}).exec();
}

function getAllUsersJSON() {
  return User.find().lean().exec();
}

async function addUser(firstName, lastName, userName, password, email) {
  var user = new User({ firstName, lastName, userName, password, email });
  await user.save();
  return user;
}

function findByUsername(userName) {
  return User.findOne({ userName }).exec();
}

function findById(id) {
  return User.findById({ _id: id }).exec();
}

module.exports = {
  getAllUsers,
  getAllUsersJSON,
  addUser,
  findByUsername,
  findById
}