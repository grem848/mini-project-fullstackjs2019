var mongoose = require("mongoose");
var LocationBlog = require("../models/LocationBlog");

function getAllLocationBlogs() {
    return LocationBlog.find({}).exec();
}

async function addLocationBlog(info, img, pos, author) {
    var locationBlog = new LocationBlog({info, img, pos, author})
    await locationBlog.save();
    return locationBlog;
}

function likeLocationBlog() {

}

function findById(id) {
    return LocationBlog.findById({ _id: id }).exec();
}

module.exports = {
    getAllLocationBlogs,
    addLocationBlog,
    likeLocationBlog,
    findById
}